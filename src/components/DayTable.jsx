import { forwardRef } from 'react'
import { format } from 'date-fns'
import CollapsibleRow from './CollapsibleRow'

const COLUMNS = Array.from({ length: 9 }, (_, i) => `Label ${i + 1}`)

const MOCK_PRODUCTS = [
  { name: 'Product A', data: [120, 85, 43, 67, 92, 31, 78, 56, 104] },
  { name: 'Product B', data: [45, 112, 89, 23, 67, 145, 34, 91, 58] },
  { name: 'Product C', data: [78, 34, 156, 45, 88, 12, 99, 63, 41] },
]

const DayTable = forwardRef(function DayTable({ date }, ref) {
  const dayName = format(date, 'EEEE')
  const formattedDate = format(date, 'MMM d')

  return (
    <div className="day-table" ref={ref}>
      <h3 className="day-table__title">
        {dayName} <span className="day-table__date">{formattedDate}</span>
      </h3>
      <table className="day-table__table">
        <thead>
          <tr>
            {COLUMNS.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MOCK_PRODUCTS.map((product) => (
            <CollapsibleRow key={product.name} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  )
})

export default DayTable
