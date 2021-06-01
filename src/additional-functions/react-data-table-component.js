/*********************************************
 *
 * @param:      row object in a native, react-data-table-component format
 * @returns     row object in a format expected by DynamicTabs component
 *********************************************/
export const normalizeRowObjectFormat = (row, columns) => {
  // *** normalize row to be in expected format for tabs
  row.cells = [];
  let counter = 0;

  for (let i in row) {
    if (row.hasOwnProperty(i)) {
      const cellObject = {
        value: row[i],
        column: counter++,
      };
      row.cells.push(cellObject);
    }
  }
  return row;
};
