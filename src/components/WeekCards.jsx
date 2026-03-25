import { forwardRef } from 'react'
import { format, isSameDay } from 'date-fns'
import Card from './Card'

const WeekCards = forwardRef(function WeekCards(
  { weekDays, selectedDay, onSelectDay },
  ref
) {
  return (
    <div
      className="week-cards"
      role="list"
      aria-label="Days of the selected week"
      ref={ref}
    >
      {weekDays.map((date) => (
        <Card
          key={date.toISOString()}
          date={date}
          dayName={format(date, 'EEEE')}
          dayNumber={format(date, 'd')}
          monthName={format(date, 'MMMM')}
          isSelected={selectedDay && isSameDay(date, selectedDay)}
          onSelect={onSelectDay}
        />
      ))}
    </div>
  )
})

export default WeekCards
