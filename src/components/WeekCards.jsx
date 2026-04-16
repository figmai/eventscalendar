import { forwardRef } from 'react';
import { getWeekDays } from '../utils/weekUtils';
import { isSameDay } from 'date-fns';
import Card from './Card';
import './WeekCards.css';

const WeekCards = forwardRef(({ selectedWeek, selectedDay, onDaySelect }, ref) => {
  const weekDays = getWeekDays(selectedWeek.start);

  return (
    <div className="week-cards-container" ref={ref}>
      <div className="week-cards-grid">
        {weekDays.map((date, index) => (
          <Card
            key={index}
            date={date}
            isSelected={selectedDay ? isSameDay(date, selectedDay) : false}
            onClick={() => onDaySelect(date, index)}
          />
        ))}
      </div>
    </div>
  );
});

export default WeekCards;
