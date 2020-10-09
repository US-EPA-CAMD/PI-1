import React, { useMemo } from "react";
import UswdsTable from "../UswdsTable";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("testing generic uswds table component", () => {
  let columns = [],
    columnsGrouping = [],
    data = [];

  const UswdsTableTest = ({ grouping, search}) => {
    data = useMemo(
      () => [
        {
          col1: "4",
          col2: "World",
          col3: "Again",
        },
        {
          col1: "1",
          col2: "table",
          col3: "rocks",
        },
        {
          col1: "8",
          col2: "you want",
          col3: "in here",
        },
      ],
      []
    );
    columns = useMemo(
      () => [
        {
          Header: "Column 1",
          accessor: "col1",
        },
        {
          Header: "Column 2",
          accessor: "col2",
        },
        {
          Header: "Column 3",
          accessor: "col3",
        },
      ],
      []
    );
    columnsGrouping = useMemo(
      () => [
        {
          Header: "Column 1",
          accessor: "col1",
        },
        {
          Header: "Column 2",
          columns: [
            {
              Header: "Column 2:1",
              accessor: "col2",
            },
            {
              Header: "Column 2:2",
              accessor: "col3",
            },
          ],
        },
      ],
      []
    );
    return (
      <UswdsTable
        columns={grouping ? columnsGrouping : columns}
        data={data}
        search={search}
      />
    );
  };

  test("table renders search function", () => {
    const { container } = render(<UswdsTableTest grouping={false} search/>);
    const searchBox = container.querySelectorAll("form .searchBox");
    expect(searchBox.length).toEqual(1);
  });

  test("table doesnt renders search function", () => {
    const { container } = render(<UswdsTableTest grouping={false} />);
    const searchBox = container.querySelectorAll("form .searchBox");
    expect(searchBox.length).toEqual(0);
  });
});


