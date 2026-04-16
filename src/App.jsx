import { useState, useRef, useEffect, useCallback } from 'react';
import DateSelector from './components/DateSelector';
import WeekCards from './components/WeekCards';
import DayTablesSection from './components/DayTablesSection';
import { getCurrentWeek } from './utils/weekUtils';
import './App.css';

function App() {
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [selectedDay, setSelectedDay] = useState(null);
  // Array of 7 real React refs, one per weekday (index 0 = Monday, 6 = Sunday)
  const dayRefs = useRef(Array.from({ length: 7 }, () => ({ current: null })));
  const headerRef = useRef(null);
  const weekCardsRef = useRef(null);
  const stickyOffsetRef = useRef(0);

  const updateStickyOffset = useCallback(() => {
    const headerHeight = headerRef.current?.offsetHeight || 0;
    const weekCardsHeight = weekCardsRef.current?.offsetHeight || 0;
    const totalOffset = headerHeight + weekCardsHeight;
    stickyOffsetRef.current = totalOffset;
    document.documentElement.style.setProperty('--sticky-offset-header', `${headerHeight}px`);
    document.documentElement.style.setProperty('--sticky-offset-thead', `${totalOffset}px`);
  }, []);

  useEffect(() => {
    updateStickyOffset();
    window.addEventListener('resize', updateStickyOffset);
    return () => window.removeEventListener('resize', updateStickyOffset);
  }, [updateStickyOffset]);

  const handleWeekChange = (newWeek, selectToday = false) => {
    setSelectedWeek(newWeek);
    if (selectToday) {
      const today = new Date();
      const todayIndex = (today.getDay() + 6) % 7; // Mon=0 … Sun=6
      setSelectedDay(today);
      // Scroll after state settles — refs are already mounted
      requestAnimationFrame(() => {
        const ref = dayRefs.current[todayIndex];
        if (ref?.current) {
          const top = ref.current.getBoundingClientRect().top + window.scrollY - stickyOffsetRef.current;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    } else {
      setSelectedDay(null);
    }
  };

  const handleDaySelect = (date, index) => {
    setSelectedDay(date);

    // Tables are always mounted — ref is already populated
    const ref = dayRefs.current[index];
    if (ref?.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY - stickyOffsetRef.current;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <DateSelector ref={headerRef} selectedWeek={selectedWeek} onWeekChange={handleWeekChange} />
      <WeekCards
        ref={weekCardsRef}
        selectedWeek={selectedWeek}
        selectedDay={selectedDay}
        onDaySelect={handleDaySelect}
      />
      {/* Always mounted so refs are ready; hidden via CSS until a day is selected */}
      <DayTablesSection
        selectedWeek={selectedWeek}
        dayRefs={dayRefs.current}
        hidden={!selectedDay}
      />
    </div>
  );
}

export default App;
