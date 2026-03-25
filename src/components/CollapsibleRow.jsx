import { useState } from 'react'

function CollapsibleRow({ product }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <tr
        className={`collapsible-row__toggle${expanded ? ' collapsible-row__toggle--expanded' : ''}`}
        onClick={() => setExpanded((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setExpanded((prev) => !prev)
          }
        }}
      >
        <td colSpan={9}>
          <span className="collapsible-row__icon">{expanded ? '▾' : '▸'}</span>
          {product.name}
        </td>
      </tr>
      {expanded && (
        <tr className="collapsible-row__data">
          {product.data.map((value, i) => (
            <td key={i}>{value}</td>
          ))}
        </tr>
      )}
    </>
  )
}

export default CollapsibleRow
