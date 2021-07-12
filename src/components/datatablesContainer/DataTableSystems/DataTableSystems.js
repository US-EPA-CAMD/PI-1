import React, { useEffect, useMemo, useState } from "react";

import * as fs from "../../../utils/selectors/monitoringPlanSystems";
import Modal from "../../Modal/Modal";
import Details from "../../Details/Details";
import DataTableSystemsComponents from "../DataTableSystemsComponents/DataTableSystemsComponents";
import DataTableRender from "../../DataTableRender/DataTableRender";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
import ModalDetails from "../../ModalDetails/ModalDetails";
import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";

import { types, fuels, designations } from "../../Details/SystemDescriptions";
import {
  findValue,
  adjustDate,
} from "../../../additional-functions/find-values-in-array";

export const DataTableSystems = ({
  locationSelectValue,
  inactive,
  user,
  checkout,
  settingInactiveCheckBox,
}) => {
  const [show, setShow] = useState(false);
  const [monitoringSystems, setMonitoringSystems] = useState([]);
  const [secondLevel, setSecondLevel] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    mpApi.getMonitoringSystems(locationSelectValue).then((res) => {
      setDataLoaded(true);
      setMonitoringSystems(res.data);
      console.log("systems", res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue]);

  const closeModalHandler = () => setShow(false);

  const [modalData, setModalData] = useState([
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: "05/04/2009 0" },
    { value: "05/04/2009 0" },
  ]);
  const [selected, setSelected] = useState([]);
  const [selectedModalData, setSelectedModalData] = useState(null);

  // object property,Label Name, value
  const modalViewData = (selected, label, time) => {
    const arr = [];
    const codeList = {
      systemTypeCode: types,
      fuelCode: fuels,
      systemDesignationCode: designations,
    };

    for (let y in label) {
      if (label[y][1] === "dropdown") {
        const labels = findValue(codeList[y], selected[y], "description");
        arr.push([y, label[y][0], labels, "dropdown"]);
      } else if (label[y][1] === "input") {
        arr.push([y, label[y][0], selected[y], "input"]);
      }
    }

    for (let y in time) {
      if (y === "endDate" || y === "beginDate") {
        const formattedDate = adjustDate("mm/dd/yyyy", selected[y]);
        arr.push([y, time[y][0], formattedDate, "date"]);
      }
      if (y === "endHour" || y === "beginHour") {
        arr.push([y, time[y][0], selected[y], "dropdown"]);
      }
    }
    return arr;
  };

  // *** row handler onclick event listener
  const selectedRowHandler = (row, bool) => {
    const selectSystem = monitoringSystems.filter(
      (element) => element.id === row.col7
    )[0];
    setSelected(row.cells);
    setSelectedModalData(
      modalViewData(
        selectSystem,
        {
          systemIdentifier: ["System ID", "input"],
          systemTypeCode: ["System Type", "dropdown"],
          fuelCode: ["System Fuel", "dropdown"],
          systemDesignationCode: ["System Designation", "dropdown"],
        },
        {
          beginDate: ["Start Date", "date"],
          beginHour: ["Start Time", "dropdown"],
          endDate: ["End Date", "date"],
          endHour: ["End Time", "dropdown"],
        }
      )
    );
    setShow(true);
  };

  useEffect(() => {
    setModalData(
      selected.map((info) => {
        return {
          header: info.column,
          value: info.value,
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "System ID",
    "System Type",
    "System Designation",
    "Fuel Type",
    "Begin Date and Time",
    "End Date and Time",
  ];

  // *** memoize data
  const data = useMemo(() => {
    if (monitoringSystems.length > 0) {
      const activeOnly = getActiveData(monitoringSystems);
      const inactiveOnly = getInactiveData(monitoringSystems);

      // only active data >  disable checkbox and unchecks it
      if (activeOnly.length === monitoringSystems.length) {
        // uncheck it and disable checkbox
        //function parameters ( check flag, disable flag )
        settingInactiveCheckBox(false, true);
        return fs.getMonitoringPlansSystemsTableRecords(monitoringSystems);
      }

      // only inactive data > disables checkbox and checks it
      if (inactiveOnly.length === monitoringSystems.length) {
        //check it and disable checkbox
        settingInactiveCheckBox(true, true);
        return fs.getMonitoringPlansSystemsTableRecords(monitoringSystems);
      }

      // resets checkbox
      settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansSystemsTableRecords(
        !inactive[0] ? getActiveData(monitoringSystems) : monitoringSystems
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitoringSystems, inactive]);
  const viewOnly = true;
  return (
    <>
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />
      <div className="methodTable">
        <DataTableRender
          dataLoaded={dataLoaded}
          pagination
          filter
          data={data}
          columnNames={columnNames}
          openHandler={selectedRowHandler}
          actionsBtn="View"
        />
      </div>
      {show ? (
        <Modal
          secondLevel={true}
          show={show}
          close={closeModalHandler}
          showCancel
          showSave
          children={
            <div>
              {secondLevel ? (
                ""
              ) : !(user && checkout) ? (
                <ModalDetails
                  modalData={modalData}
                  data={selectedModalData}
                  cols={2}
                  title={"Component: Monitoring Systems"}
                  // viewOnly={!(user && checkout)}
                />
              ) : (
                <Details viewOnly={viewOnly} modalData={modalData} />
              )}
              <DataTableSystemsComponents
                secondLevel={secondLevel}
                setSecondLevel={setSecondLevel}
                viewOnly={viewOnly}
                locationSelectValue={locationSelectValue}
                systemID={modalData.length > 1 ? modalData[0].value : 0}
              />
            </div>
          }
        />
      ) : null}
    </>
  );
};

export default DataTableSystems;
