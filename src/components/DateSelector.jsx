import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { startOfWeek, endOfWeek } from 'date-fns'

function DateSelector({ startDate, endDate, onChange }) {
  const handleChange = (dates) => {
    const [start] = dates
    if (start) {
      const weekStart = startOfWeek(start, { weekStartsOn: 1 })
      const weekEnd = endOfWeek(start, { weekStartsOn: 1 })
      onChange(weekStart, weekEnd)
    }
  }

  return (
    <div className="date-selector">
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={2}
        calendarStartDay={1}
        dateFormat="MMM d, yyyy"
        placeholderText="Select a week"
        aria-label="Select a week"
      />
    </div>
  )
}

export default DateSelector
