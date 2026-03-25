import { useState, useRef, useCallback, useEffect } from 'react'
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns'
import Header from './components/Header'
import WeekCards from './components/WeekCards'
import DayTablesSection from './components/DayTablesSection'
import './App.css'

function getWeekRange(date) {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  const end = endOfWeek(date, { weekStartsOn: 1 })
  return { start, end }
}

function App() {
  const { start: initialStart, end: initialEnd } = getWeekRange(new Date())

  const [startDate, setStartDate] = useState(initialStart)
  const [endDate, setEndDate] = useState(initialEnd)
  const [selectedDay, setSelectedDay] = useState(null)
  const [headerStuck, setHeaderStuck] = useState(false)

  const appRef = useRef(null)
  const headerRef = useRef(null)
  const weekCardsRef = useRef(null)
  const tableRefsMap = useRef({})
  const stickyOffset = useRef(0)

  const weekDays = eachDayOfInterval({ start: startDate, end: endDate })

  const updateHeights = useCallback(() => {
    const header = headerRef.current
    const weekCards = weekCardsRef.current
    const app = appRef.current
    if (!header || !weekCards || !app) return

    const headerHeight = header.offsetHeight
    const weekCardsHeight = weekCards.offsetHeight
    const totalOffset = headerHeight + weekCardsHeight
    const titleEl = app.querySelector('.day-table__title')
    const titleHeight = titleEl ? titleEl.offsetHeight : 43
    app.style.setProperty('--header-height', `${headerHeight}px`)
    app.style.setProperty('--sticky-offset', `${totalOffset}px`)
    app.style.setProperty('--sticky-offset-thead', `${totalOffset + titleHeight}px`)
    stickyOffset.current = totalOffset
  }, [])

  // Measure sticky offsets and set up observers
  useEffect(() => {
    const header = headerRef.current
    const weekCards = weekCardsRef.current
    const app = appRef.current
    if (!header || !weekCards || !app) return

    updateHeights()

    const resizeObserver = new ResizeObserver(updateHeights)
    resizeObserver.observe(header)
    resizeObserver.observe(weekCards)

    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;top:0;left:0;height:1px;width:1px;pointer-events:none;'
    app.style.position = 'relative'
    app.prepend(sentinel)

    const observer = new IntersectionObserver(
      ([entry]) => setHeaderStuck(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)

    return () => {
      resizeObserver.disconnect()
      observer.disconnect()
      sentinel.remove()
    }
  }, [updateHeights])

  // Re-measure when tables appear/disappear
  useEffect(() => {
    if (selectedDay) {
      requestAnimationFrame(updateHeights)
    }
  }, [selectedDay, updateHeights])

  const handleTodayClick = () => {
    const today = new Date()
    const { start, end } = getWeekRange(today)
    setStartDate(start)
    setEndDate(end)
    handleSelectDay(today)
  }

  const handleDateChange = (start, end) => {
    setStartDate(start)
    setEndDate(end)
    setSelectedDay(null)
  }

  const handleSelectDay = useCallback((date) => {
    setSelectedDay(date)
    const key = format(date, 'yyyy-MM-dd')
    requestAnimationFrame(() => {
      const el = tableRefsMap.current[key]
      if (el) {
        const top =
          el.getBoundingClientRect().top +
          window.scrollY -
          stickyOffset.current -
          16
        window.scrollTo({ top, behavior: 'smooth' })
      }
    })
  }, [])

  return (
    <div className="app" ref={appRef}>
      <div
        ref={headerRef}
        className={`header${headerStuck ? ' header--stuck' : ''}`}
      >
        <Header
          startDate={startDate}
          endDate={endDate}
          onTodayClick={handleTodayClick}
          onDateChange={handleDateChange}
        />
      </div>
      <WeekCards
        ref={weekCardsRef}
        weekDays={weekDays}
        selectedDay={selectedDay}
        onSelectDay={handleSelectDay}
      />
      {selectedDay && (
        <DayTablesSection weekDays={weekDays} tableRefsMap={tableRefsMap} />
      )}
    </div>
  )
}

export default App
