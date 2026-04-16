import { useState } from 'react';
import './CollapsibleRow.css';

const COLUMNS = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9'];

const CollapsibleRow = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr
        className="collapsible-row-header"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
      >
        <td colSpan={11} className="collapsible-row-title">
          <span className={`collapsible-row-icon ${isExpanded ? 'collapsible-row-icon--open' : ''}`}>▶</span>
          {product.name}
        </td>
      </tr>
      {isExpanded && (
        <tr className="collapsible-row-data">
          <td className="collapsible-row-cell"></td>
          <td className="collapsible-row-cell"></td>
          {COLUMNS.map((_, i) => (
            <td key={i} className="collapsible-row-cell">
              {product.data[i] ?? '—'}
            </td>
          ))}
        </tr>
      )}
    </>
  );
};

export default CollapsibleRow;
