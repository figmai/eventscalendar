import { useCallback } from 'react'
import { format } from 'date-fns'
import DayTable from './DayTable'

function DayTablesSection({ weekDays, tableRefsMap }) {
  const setRef = useCallback(
    (date, el) => {
      const key = format(date, 'yyyy-MM-dd')
      if (el) {
        tableRefsMap.current[key] = el
      } else {
        delete tableRefsMap.current[key]
      }
    },
    [tableRefsMap]
  )

  return (
    <div className="day-tables-section">
      {weekDays.map((date) => (
        <DayTable
          key={date.toISOString()}
          date={date}
          ref={(el) => setRef(date, el)}
        />
      ))}
    </div>
  )
}

export default DayTablesSection
