import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@trussworks/react-uswds";

import DataTable from "react-data-table-component";
import { FilterComponent } from "../ReactDataTablesFilter/ReactDataTablesFilter";
import { Preloader } from "../Preloader/Preloader";

/*** scss ***/

const DataTableRender = ({
  sectionTitle,
  tableTitle,
  button,
  columns,
  data,
  user,
  selectedRowHandler,
  pagination,
  filter,
  expandableRowComp,
  defaultSort,
  expandableRows,
  headerStyling,
  tableStyling,
  componentStyling,
}) => {
  const [searchText, setSearchText] = useState("");

  const colsFilter = (currentElement, index, array) => {
    for (var prop in currentElement) {
      // filters out any boolean properties in the data since it does
      // not work with toLowercase and includes
      if (typeof currentElement[prop] === "string") {
        if (
          currentElement[prop].toLowerCase().includes(searchText.toLowerCase())
        ) {
          return currentElement;
        }
      }
    }
  };
  const filteredItems = data.filter(colsFilter);
  const subHeaderComponentMemo = useMemo(() => {
    const handleSearch = () => {
      setSearchText(document.querySelector("#txtSearchData").value);
    };

    return (
      <FilterComponent
        onSearch={handleSearch}
        tableTitle={tableTitle ? tableTitle : ""}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${componentStyling}`}>
      <div className={`${headerStyling}`}>
        <h2 className="padding-0">
          {sectionTitle ? (
            <div>
              {sectionTitle}

              {/* <hr
                width="100%"
                align="center"
                className="height-1px bg-base-light"
              /> */}
            </div>
          ) : (
            ""
          )}
          {button ? (
            <div>
              {
                <Button
                  type="button"
                  test-id={`btnAdd${tableTitle.split(" ").join("")}`}
                  className="float-right clearfix margin-right-3"
                  outline="true"
                >
                  Add {tableTitle}
                </Button>
              }

              {/* <hr
                width="100%"
                align="center"
                className="height-1px bg-base-light"
              /> */}
            </div>
          ) : (
            ""
          )}
        </h2>
      </div>
      <div aria-live="polite" className={`${tableStyling}`}>
        {data.length >= 1 ? (
          <DataTable
            className="data-display-table react-transition fade-in"
            sortIcon={
              <FontAwesomeIcon
                icon={faCaretDown}
                className="margin-left-2 text-indigo"
              />
            }
            // props
            defaultSortField={defaultSort ? defaultSort : "col1"}
            expandableRows={expandableRows}
            pagination={pagination}
            columns={columns}
            data={filteredItems}
            subHeader={filter}
            ////
            fixedHeader={true}
            noHeader={true}
            highlightOnHover={true}
            selectableRows={false}
            responsive={true}
            striped={true}
            persistTableHead={false}
            // based on props
            expandableRowExpanded={(row) => row.expanded}
            subHeaderComponent={subHeaderComponentMemo}
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100, 200, 500]}
            paginationComponentOptions={{ rangeSeparatorText: "out of" }}
            expandableRowDisabled={(row) => row.disabled}
            expandableRowsComponent={expandableRowComp}
          />
        ) : (
          <div className="margin-y-9 padding-y-9 react-transition fade-in">
            <Preloader />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTableRender;
