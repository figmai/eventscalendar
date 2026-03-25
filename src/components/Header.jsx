import DateSelector from './DateSelector'

function Header({ startDate, endDate, onTodayClick, onDateChange }) {
  return (
    <>
      <button className="header__today-btn" onClick={onTodayClick}>
        Today
      </button>
      <DateSelector
        startDate={startDate}
        endDate={endDate}
        onChange={onDateChange}
      />
    </>
  )
}

export default Header
