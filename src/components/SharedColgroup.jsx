const COL_WIDTHS = [
  '140px', // date column
  '60px',  // empty column
  '90px',  // Label 1
  '90px',  // Label 2
  '90px',  // Label 3
  '90px',  // Label 4
  '90px',  // Label 5
  '90px',  // Label 6
  '90px',  // Label 7
  '90px',  // Label 8
  '90px',  // Label 9
];

const SharedColgroup = () => (
  <colgroup>
    {COL_WIDTHS.map((w, i) => (
      <col key={i} style={{ width: w }} />
    ))}
  </colgroup>
);

export { COL_WIDTHS };
export default SharedColgroup;
