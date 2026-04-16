import { forwardRef } from 'react';
import { format } from 'date-fns';
import CollapsibleRow from './CollapsibleRow';
import SharedColgroup from './SharedColgroup';
import './DayTable.css';

const COLUMNS = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9'];

const MOCK_PRODUCTS = [
  { name: 'Product A', data: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'] },
  { name: 'Product B', data: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'] },
  { name: 'Product C', data: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'] },
];

const DayTable = forwardRef(({ date, isFirst, isActive }, ref) => {
  return (
    <>
      <div className="day-table" ref={ref}>
      <div className="day-table-scroll-wrapper">
        <table className="day-table-table">
          <SharedColgroup />
          <thead className={isActive ? 'day-table-thead--hidden' : ''}>
            <tr>
              <th className="day-table-th day-table-date-col">{format(date, 'EEEE, MMMM d')}</th>
              <th className="day-table-th"></th>
              {COLUMNS.map((col) => (
                <th key={col} className="day-table-th">
                  {isFirst ? col : ''}
                </th>
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
    </div>
    </>
  );
});

export default DayTable;
