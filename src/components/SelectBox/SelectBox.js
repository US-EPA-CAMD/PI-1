import React, { useState, useEffect } from "react";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../utils/selectors/monitoringConfigurations";
import { Label, Dropdown, FormGroup } from "@trussworks/react-uswds";

const SelectBox = ({
  caption,
  selectKey,
  selectionHandler,
  showInactive = false,
  initialSelection,
  viewOnly,
  required,
  monitoringPlans,
}) => {
  const getIndex = (val) => {
    return sections.findIndex((obj) => obj.name === val);
  };

  const sections = [
    { name: "Loads" },
    { name: "Location Attributes" },
    { name: "Monitoring Defaults" },
    { name: "Monitoring Methods" },
    { name: "Monitoring Systems" },
    { name: "Qualifications" },
    { name: "Rectangular Duct WAFs" },
    { name: "Reporting Frequency" },
    { name: "Span, Range, and Formulas" },
    { name: "Unit Information" },
    { name: "Stack/Pipe Information" },
  ];
  const getMPIndex = (val) => {
    if (monitoringPlans) {
      // console.log('this is mpindex function',monitoringPlans.findIndex((obj) => obj.id === val) )
      return monitoringPlans.findIndex((obj) => obj.id === val);
    }
  };

  const [selectionState, setSelectionState] = useState(
    initialSelection ? initialSelection : 0
  );

  const handleChange = (val) => {
    setSelectionState(getIndex(val.target.value));

    selectionHandler(getIndex(val.target.value));
  };
  // useEffect(() => {
  //   console.log("changed", options[selectionState].id);
  // }, [selectionState]);
  const populateOptions = (optionsList) => {
    // console.log('this is options',optionsList)
    return optionsList.map((info, index) => {
      return (
        <option key={info.id} value={info.name}>
          {info[selectKey]}
        </option>
      );
    });
  };

  useEffect(() => {
    if (initialSelection >= 0) {
      console.log('THIS IS INTIAL SELECTION',initialSelection)
      setSelectionState(initialSelection);
      selectionHandler(initialSelection);
    } else {
      setSelectionState(0);
      selectionHandler(0);
    }
  }, [initialSelection]);

  return (
    <div>
      <div>
        <FormGroup className="margin-right-2 margin-bottom-1">
          <Label htmlFor={caption + initialSelection}>{caption}</Label>
          <Dropdown
            id="optionList"
            name="optionList"
            // weird bug without this
            defaultValue={
              sections[selectionState] !== undefined
                ? caption === "Configurations"
                  ? sections[selectionState].id
                  : sections[selectionState][selectKey]
                : sections[0].id
            }
            disabled={viewOnly}
            id={selectionState}
            onChange={(e) => handleChange(e)}
          >
            {populateOptions(sections)}
          </Dropdown>
        </FormGroup>
      </div>
    </div>
  );
};

export default SelectBox;
