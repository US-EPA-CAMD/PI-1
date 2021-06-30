import React, { useState, useEffect } from "react";
import HeaderInfo from "../HeaderInfo/HeaderInfo";
import "../MonitoringPlanTab/MonitoringPlanTab.scss";
import DataTableMethod from "../datatablesContainer/DataTableMethod/DataTableMethod";
import DataTableMats from "../datatablesContainer/DataTableMats/DataTableMats";
import DataTableSystems from "../datatablesContainer/DataTableSystems/DataTableSystems";
import InactivityTracker from "../InactivityTracker/InactivityTracker";
import * as mpApi from "../../utils/api/monitoringPlansApi";
import "./MonitoringPlanTabRender.scss";
import CustomAccordion from "../CustomAccordion/CustomAccordion";

export const MonitoringPlanTabRender = ({
  title,
  user,
  locations,
  selectedConfig,
  setSectionSelect,
  setLocationSelect,
  sectionSelect,
  locationSelect,
  orisCode,
  configID,
  checkout,
  setCheckout,
  setInactive,
  inactive
}) => {
  const [matsTableFlag, setMatsTableFlag] = useState(false);
  // // MONITORING METHODS
  const matsTableHandler = (flag) => {
    setMatsTableFlag(flag);
  };

  // checks mats table
  useEffect(() => {
    if (matsTableFlag) {
      setTableState(
        tableState.map((element, index) =>
          index === 3
            ? [
                [<DataTableMethod
                  matsTableHandler={matsTableHandler}
                  locationSelectValue={parseInt(locationSelect[1])}
                  checkout={checkout}
                  user={user}
                  inactive={inactive}
                />,'Methods'],
                [<DataTableMats locationSelect={locationSelect[1]} inactive={inactive} />,'Supplemental Methods']
              ]
            : element
        )
      );
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matsTableFlag]);

  // updates all tables whenever a location is changed
  useEffect(() => {
    setTableState([
      [],
      [],
      [],
      [[
        <DataTableMethod
          matsTableHandler={matsTableHandler}
          locationSelectValue={parseInt(locationSelect[1])}
          checkout={checkout}
          user={user}
          inactive={inactive}
          // showActiveOnly={!showInactive}
        />,'Methods']
      ],
      [],
      [],
      [],
      [],    
      [],
      [[<DataTableSystems locationSelect={parseInt(locationSelect[1])} inactive={inactive} />,'Systems']],
      [],
  
    ]);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelect]);

  // sets initial state
  const [tableState, setTableState] = useState([
    [],
    [],
    [],
    [[
      <DataTableMethod
        matsTableHandler={matsTableHandler}
        locationSelectValue={parseInt(locationSelect[1])}
        checkout={checkout}
        user={user}
        inactive={inactive}
        // showActiveOnly={!showInactive}
      />,'Methods']
    ],
    [],
    [],
    [],
    [],    
    [],
    [[<DataTableSystems locationSelect={locationSelect[1]} />,'Systems']],
    [],
  ]);

  const resetInactivityTimerApiCall = () => {
    console.log(mpApi.putLockTimerUpdateConfiguration(configID), "api called");
  };

  const checkoutAPI = (direction) =>{
    
  }
  return (
    <div className=" padding-top-4">
      {user && checkout ? (
        <InactivityTracker apiCall={resetInactivityTimerApiCall} />
      ) : (
        ""
      )}
<hr />
      {/* on change of select box, it should modify the accordion items */}
      {/* pass back the values to send to the datatable, current is sending back index  */}
      <div className="grid-row">
        <HeaderInfo
          facility={title}
          selectedConfig={selectedConfig}
          orisCode={orisCode}
          sectionSelect={sectionSelect}
          setSectionSelect={setSectionSelect}
          setLocationSelect={setLocationSelect}
          locationSelect={locationSelect}
          locations={locations}
          checkout={checkout}
          user={user}
          checkoutAPI={checkoutAPI}
          setCheckout ={setCheckout}
          setInactive={setInactive}
          inactive={inactive}
        />
         
      </div>
      <hr />
      <div className="grid-row">
        <CustomAccordion
          title={sectionSelect[1]}
          table={tableState[sectionSelect[0]]}
        />
      </div>
    </div>
  );
};

export default MonitoringPlanTabRender;
