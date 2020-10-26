import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Tabs from "../Common/Tabs/Tabs";
import TabPane from "../Common/Tabs/TabPane";
import Units from "./Units/Units";
import MonitoringPlanDataTable from "./MonitoringPlan/MonitoringPlanDataTable";
import ContactsData from "./Contacts/ContactsData";
import * as fs from "../../utils/selectors/facilities";

const DetailTabs = ({ facilities, orisCode }) => {
  const [facility, setFacility] = useState(
    fs.getSelectedFacility(orisCode, facilities)
  );
  useEffect(() => {
    setFacility(fs.getSelectedFacility(orisCode, facilities));
  }, [facilities, orisCode]);

  return (
    <div>
      <div alt="Facility name" id="facilityName">
        <h3>Selected Facility: {facility ? facility.name : ""}</h3>
        <h4>ORIS Code: {orisCode}</h4>
      </div>
      <Tabs initTab="Location">
        <TabPane title="Location">Location Content</TabPane>
        <TabPane title="Contacts">
        <ContactsData facility={facility} />
        </TabPane>
        <TabPane title="Units">
          <Units facility={facility} />
        </TabPane>
        <TabPane title="Monitoring Plans">
          <MonitoringPlanDataTable facility={facility} />
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
  };
};

export default connect(mapStateToProps)(DetailTabs);
