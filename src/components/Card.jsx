import { useRef, useEffect } from 'react'

function Card({ date, dayName, dayNumber, monthName, isSelected, onSelect }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.focus({ preventScroll: true })
    }
  }, [isSelected])

  return (
    <div
      ref={ref}
      className={`card${isSelected ? ' card--selected' : ''}`}
      role="listitem"
      aria-label={`${dayName}, ${monthName} ${dayNumber}${isSelected ? ' (Selected)' : ''}`}
      aria-current={isSelected ? 'true' : undefined}
      onClick={() => onSelect(date)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(date)
        }
      }}
      tabIndex={0}
    >
      <span className="card__day-name">{dayName}</span>
      <span className="card__day-number">{dayNumber}</span>
      <span className="card__month">{monthName}</span>
    </div>
  )
}

export default Card
