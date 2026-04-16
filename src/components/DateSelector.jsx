import { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getWeekStart, getWeekEnd, getCurrentWeek } from '../utils/weekUtils';
import { format } from 'date-fns';
import './DateSelector.css';

const DateSelector = forwardRef(({ selectedWeek, onWeekChange }, ref) => {
  const [dateRange, setDateRange] = useState([selectedWeek.start, selectedWeek.end]);

  useEffect(() => {
    setDateRange([selectedWeek.start, selectedWeek.end]);
  }, [selectedWeek]);

  const handleTodayClick = () => {
    const currentWeek = getCurrentWeek();
    onWeekChange(currentWeek, true);
  };

  const handleDateChange = (dates) => {
    if (dates && dates[0]) {
      // When user selects any date, auto-adjust to full week
      const selectedDate = dates[0];
      const weekStart = getWeekStart(selectedDate);
      const weekEnd = getWeekEnd(selectedDate);

      const newWeek = { start: weekStart, end: weekEnd };
      onWeekChange(newWeek);
      setDateRange([weekStart, weekEnd]);
    }
  };

  const formatDateRange = () => {
    if (dateRange[0] && dateRange[1]) {
      return `${format(dateRange[0], 'MMM d, yyyy')} - ${format(dateRange[1], 'MMM d, yyyy')}`;
    }
    return 'Select a week';
  };

  return (
    <div className="date-selector-container" ref={ref}>
      <button
        className="today-button"
        onClick={handleTodayClick}
        aria-label="Select current week"
      >
        Today
      </button>

      <div className="date-picker-wrapper">
        <DatePicker
          selectsRange
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={handleDateChange}
          monthsShown={2}
          dateFormat="MMM d, yyyy"
          customInput={
            <button className="date-picker-button" aria-label="Select week">
              {formatDateRange()}
            </button>
          }
          calendarStartDay={1} // Monday
        />
      </div>
    </div>
  );
});

export default DateSelector;
