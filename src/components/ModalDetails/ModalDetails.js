import React from "react";
import {
  Label,
  FormGroup,
  DatePicker,
  TextInput,
  Radio,
  Fieldset,
  Button,
} from "@trussworks/react-uswds";

import { ArrowBackSharp } from "@material-ui/icons";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";
// value in data => [0] api label, [1] our UI label, [2] value, [3] control form type
const ModalDetails = ({ modalData, data, cols, title, viewOnly, backBtn }) => {
  const makeViewOnlyComp = (value) => {
    return (
      <div key={`${value[1]}`} className="grid-col">
        <FormGroup className="margin-top-0">
          <Label className="text-bold" htmlFor={`${value[1]}`}>
            {value[1]}
          </Label>
          <div tabIndex="0" id={`${value[1]}`}>
            {value[2] ? value[2] : ""}
          </div>
        </FormGroup>
      </div>
    );
  };
  const timeOptions = [
    { time: null },
    { time: 0 },
    { time: 1 },
    { time: 2 },
    { time: 3 },
    { time: 4 },
    { time: 5 },
    { time: 6 },
    { time: 7 },
    { time: 8 },
    { time: 9 },
    { time: 10 },
    { time: 11 },
    { time: 12 },
    { time: 13 },
    { time: 14 },
    { time: 15 },
    { time: 16 },
    { time: 17 },
    { time: 18 },
    { time: 19 },
    { time: 20 },
    { time: 21 },
    { time: 22 },
    { time: 23 },
  ];
  const makeEditComp = (value) => {
    let comp = null;
    switch (value[3]) {
      case "dropdown":
        comp = (
          <SelectBox
            className="modalUserInput"
            epadataname={value[0]}
            options={value[5] !== null ? value[5] : [{}]}
            initialSelection={value[4]}
            selectKey="code"
            id={value[0]}
            epa-testid={value[0]}
            name={value[1]}
            secondOption="name"
          />
        );
        break;
      case "date":
        let [year, month, day] = [];
        if (value[4] || value[4] !== null) {
          [year, month, day] = value[4].split("-");
        }

        const datePickerValue = `${year}-${month}-${day}`;
        comp = (
          <div>
            <DatePicker
              className="margin-0 modalUserInput"
              id={value[0]}
              name={value[1]}
              epadataname={value[0]}
              epa-testid={value[0]}
              defaultValue={datePickerValue}
              onChange={() => void 0}
            />
          </div>
        );
        break;
      case "time":
        comp = (
          <SelectBox
            className="modalUserInput"
            epadataname={value[0]}
            options={timeOptions}
            initialSelection={value[2] ? value[2] : ""}
            selectKey="time"
            id={value[0]}
            epa-testid={value[0]}
            name={value[1]}
          />
        );
        break;

      case "input":
        comp = (
          <TextInput
            className="modalUserInput"
            id="modalUserInput"
            name="modalUserInput"
            type="text"
            defaultValue={value[2] ? value[2] : ""}
          />
        );
        break;

      case "radio":
        comp = (
          <Fieldset
            className=" display-inline-flex"
            id={`${value[1].split(" ").join("")}`}
          >
            <Radio
              id={`${value[1].split(" ").join("")}-1`}
              name={`${value[1].split(" ").join("-")}`}
              label="Yes"
              value="Yes"
              className="padding-right-1"
              defaultChecked={value[2] ? true : null}
            />
            <Radio
              id={`${value[1].split(" ").join("")}-2`}
              name={`${value[1].split(" ").join("-")}`}
              label="No"
              value="No"
              className="padding-left-1"
              defaultChecked={!value[2] ? true : null}
            />
          </Fieldset>
        );
        break;

      default:
        comp = "";
    }

    return (
      <div className="grid-col">
        <FormGroup className="margin-top-0">
          <Label className="text-bold" htmlFor={`${value[1]}`}>
            {value[1]}
          </Label>
          <div tabIndex="0" id={`${value[1]}`}>
            {comp}
          </div>
        </FormGroup>
      </div>
    );
  };
  const items = [];
  let row = [];
  for (const value of data) {
    if (row.length < cols) {
      if (viewOnly) {
        row.push(makeViewOnlyComp(value));
      } else {
        row.push(makeEditComp(value));
      }
    } else {
      items.push(row);
      row = [];
      if (viewOnly) {
        row.push(makeViewOnlyComp(value));
      } else {
        row.push(makeEditComp(value));
      }
    }
  }
  items.push(row);
  return (
    <div className="systemsCompTable">
      <div className="grid-container margin-bottom-2">
        <div className="display-inline-flex padding-top-1 padding-bottom-3">
          {backBtn ? (
            <Button
              type="button"
              aria-label="go back to systems details"
              onClick={() => backBtn(false)}
            >
              <ArrowBackSharp className=" font-body-sm" />
            </Button>
          ) : (
            ""
          )}
          <h3 className="text-bold">{title}</h3>
          <input
            type="hidden"
            epadataname="id"
            id="id"
            name="id"
            className="modalUserInput"
            value={modalData["id"]}
          />
        </div>
        <div>
          {items.map((item, index) => {
            return (
              <div key={index} className="grid-row padding-top-2">
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalDetails;
