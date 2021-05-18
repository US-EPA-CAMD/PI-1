import React, { useEffect, useState } from "react";
import "./HeaderInfo.css";
import SelectBox from "../SelectBox/SelectBox";
import {
  getActiveConfigurations,
  getInActiveConfigurations,
} from "../../utils/selectors/monitoringConfigurations";
import {
  setConfigurationSelectionState,
  setSectionSelectionState,
  setLocationSelectionState,
  setInactiveToggle,
} from "../../store/actions/dynamicFacilityTab";
import {
  setActiveTab,
} from "../../store/actions/activeTab";
import { Button, Checkbox } from "@trussworks/react-uswds";
import ConfigurationsDrop from "../ConfigurationsDrop/ConfigurationsDrop";
import LocationDrop from "../LocationsDrop/LocationsDrop";
import { connect } from "react-redux";
const HeaderInfo = ({
  facility,
  sectionHandler,
  monitoringPlans,
  // locationHandler,
  configurationHandler,
  showInactiveHandler,

  hasActiveConfigs,

  // selectedLocation,
  selectedSection,
  selectedConfiguration,
  // inactiveCheck,


  setConfiguration,
  setInactive,
  tabs,
  activeTab
}) => {


  // possiblely adding showinactive to redux state will fix this issue
  const [configurations, setConfigurations] = useState(
    hasActiveConfigs
      ? monitoringPlans
      : getInActiveConfigurations(monitoringPlans)
  );
  const[inactiveCheck,setInactiveCheck] = useState(tabs[activeTab].inactive)

  const setInactiveToggle = (val) => {
    setInactiveCheck(val);
    setInactive(tabs[activeTab].orisCode,val)
  }
  // useEffect(() => {
  //   if (configurations.length > 1 && selectedConfiguration < configurations.length) {
  //     locationHandler([
  //       0,
  //       monitoringPlans[selectedConfiguration].locations[selectedLocation[0]]["id"],
  //     ]);
  //   } else if (configurations.length === 1) {
  //     locationHandler([0, monitoringPlans[0].locations[0]["id"]]);
  //   }
  // }, []);

  // by default is there are no active configs, show inactive (need to disable and check the 
  //show inactive checkbox )
  useEffect(() => {
    if (!hasActiveConfigs) {
      setConfigurations(getInActiveConfigurations(monitoringPlans));
      showInactiveHandler(false);
    }
  }, [hasActiveConfigs, monitoringPlans]);

  // by default only show active configs first 
  // useEffect(() => {
  //   setConfigurations(
  //     inactiveCheck ? monitoringPlans : getActiveConfigurations(monitoringPlans)
  //   );
  // }, [monitoringPlans, inactiveCheck]);

  useEffect(() => {
    setConfigurations(
      tabs[activeTab].inactive ? monitoringPlans : getActiveConfigurations(monitoringPlans)
    );
  }, [monitoringPlans, tabs[activeTab].inactive]);


  // configuration is lagging behind one
  const mpHandler = (index) => {
    configurationHandler(index);

    // if(index < monitoringPlans.length) {
    // locationHandler([0, monitoringPlans[index].locations[0]["id"]]);
    // }
  };
  // const mplHandler = (index) => {
  //   // locationHandler(configurations[configSelect].locations[index]["id"]);
    
  //   if(selectedConfiguration < monitoringPlans.length){
  //   locationHandler([
  //     index,
  //     monitoringPlans[selectedConfiguration].locations[index]["id"],
  //   ]);}
  // };
  const mpsHandler = (index) => {
    // sectionHandler(sections[index].name);
    sectionHandler(index);
  };

  return (
    <div className="header">
      <div className="display-inline-block">
        <h2>{facility.name}</h2>
      </div>
      <div className="float-right">
        <a href="#/">Comments</a>
        <a href="#/">Reports</a>|<Button className="ovalBTN">Evaluate</Button>
        <Button className="ovalBTN">Submit</Button>
      </div>
      {configurations.length !== 0 ? (
        <div className="row">
          <div className="selects column">
            <div className="configurations-container">
              <ConfigurationsDrop 
               caption="Configurations"
               options={configurations}
               selectionHandler={mpHandler}
               selectKey="name"
               showInactive={inactiveCheck}
               initialSelection={selectedConfiguration}
               monitoringPlans={monitoringPlans}
               inactiveCheck={inactiveCheck}
               showInactiveHandler={setInactiveToggle}
               configurationHandler={configurationHandler}
               hasActiveConfigs={hasActiveConfigs}
              />
            </div>
            {/* <LocationDrop
              caption="Locations"
              options={
                monitoringPlans[selectedConfiguration]
                  ? monitoringPlans[selectedConfiguration].locations
                  : monitoringPlans[0].locations
              }
              selectionHandler={mplHandler}
              selectKey="name"
              initialSelection={selectedLocation[0]}   
            /> */}
            <SelectBox
              caption="Sections"
              selectionHandler={mpsHandler}
              selectKey="name"
              initialSelection={selectedSection}
            />
          </div>
          <div className="statuses column">
            <div className="eval">Evaluation Status: </div>
            <div className="font-body-2xs display-inline-block padding-105">
              {" Passed with no errors "}{" "}
            </div>
            <br />
            <div className="submission"> Submission Status: </div>
            <div className="font-body-2xs display-inline-block padding-105">
              {" Resubmission required "}{" "}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {

    tabs: state.openedFacilityTabs,

    activeTab:state.activeTab
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConfiguration: (configuration, orisCode) =>
      dispatch(setConfigurationSelectionState(configuration, orisCode)),
    setLocation: (location, orisCode) =>
      dispatch(setLocationSelectionState(location, orisCode)),
    setSection: (section, orisCode) =>
      dispatch(setSectionSelectionState(section, orisCode)),
    setInactive: (orisCode,value ) =>
      dispatch(setInactiveToggle(orisCode, value)),
      setActiveTab:(orisCode, value) =>
      dispatch(setActiveTab(orisCode, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderInfo);
