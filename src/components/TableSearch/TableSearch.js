import React, { useState } from "react";
import "./TableSearch.scss";
import { Button, Form, Label } from "@trussworks/react-uswds";
const TableSearch = ({ setGlobalFilter, title }) => {
  const [searchState, setSearchState] = useState("");

  const searchHandler = (val) => {
    setSearchState(val);
  };

  const updateSearchHandler = () => {
    setGlobalFilter(searchState || undefined);
  };
  const checkingfc = (e) =>{
    console.log(e.keyCode);
  }
  return (
    <div>
      <Label className="filterLabel" htmlFor="input-search">
        Filter by keyword:
      </Label>
      <div className="filterSearch">
        <Form
          children={
            <input
              id="input-search"
              name="input-search"
              className="searchBox"
              type="text"
              value={searchState}
              placeholder={"Keyword"}
              onChange={(e) => {
                searchHandler(e.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  updateSearchHandler();
                }
          }}
            />
          }
        />
        <Button
          className="filterBTN"
          id="input-button-search"
          onClick={updateSearchHandler}
        >
          Filter
        </Button>
      </div>
    </div>
  );
};

export default TableSearch;
