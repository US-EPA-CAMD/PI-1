import React, { useEffect } from "react";
import "./TableBody.css";
const TableBody = ({
  getTableBodyProps,
  rows,
  page,
  prepareRow,
  selectedRowHandler,
  dataSelector,
  defaultSelect,
  viewDataColumn,
  viewDataHandler
}) => {
  // just turns on react-table row selected to handle future css
  const defaultSelector = () => {
    const selected = page.find((r) => r.isSelected);
    if (!selected && defaultSelect && page.length > 0) {
      page[0].isSelected = true;
      selectedRowHandler(page[0].original.col1);
    }
  };
  useEffect(() => {
    defaultSelector();
  }, []);

  const rowSelection = (row) => {
    const selected = page.find((r) => r.isSelected);
    if (selected) {
      selected.isSelected = false;
    }
    row.isSelected = true;
  };
  const handleDataSelector = (data) => {
    if (!selectedRowHandler) return;
    if (!dataSelector) {
      return selectedRowHandler(data[0].value);
    }
    data.forEach((element) => {
      if (element.column.Header == dataSelector) {
        return selectedRowHandler(element.value);
      }
    });
  };
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      console.log("enter was pressed");
    }
  };
  return (
    <tbody {...getTableBodyProps()}>
      {(page.length > 0 &&
        page.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              tabIndex={1}
              key={row.id}
              {...row.getRowProps()}
              onClick={() => {
                rowSelection(row);
                handleDataSelector(row.cells);
              }}
              onKeyDown={onKeyDownHandler}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    width={cell.column.width}
                    {...cell.getCellProps()}
                    className={`${
                      row.isSelected ? "selected hovered" : "hovered"
                    }`}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
              {/* additional cell for viewing ( not related to incoming data) */}
              {viewDataColumn ? (
                <td
                  className={`${
                    row.isSelected ? "selected hovered" : "hovered"
                  }`}
                >
                  {" "}
                  <button onClick={() => viewDataHandler(row)}>ⓘ</button>
                </td>
              ) : (
                ""
              )}
            </tr>
          );
        })) || (
        <tr className="centerBox">
          <td>No data found</td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
