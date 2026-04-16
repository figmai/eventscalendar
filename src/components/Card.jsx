import { useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { isToday } from '../utils/weekUtils';
import './Card.css';

const Card = ({ date, isSelected, onClick }) => {
  const cardRef = useRef(null);
  const dayName = format(date, 'EEEE');
  const dayNumber = format(date, 'd');
  const monthName = format(date, 'MMMM');
  const isTodayDate = isToday(date);

  useEffect(() => {
    if (isSelected) {
      cardRef.current?.focus({ preventScroll: true });
    } else {
      cardRef.current?.blur();
    }
  }, [isSelected]);

  const handleClick = () => {
    onClick?.();
  };

  return (
    <div
      ref={cardRef}
      className={`card ${isTodayDate ? 'card-today' : ''} ${isSelected ? 'card-selected' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`${dayName}, ${monthName} ${dayNumber}`}
      aria-pressed={isSelected}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="card-day-name">{dayName}</div>
      <div className="card-day-number">{dayNumber}</div>
      <div className="card-month-name">{monthName}</div>
    </div>
  );
};

export default Card;
