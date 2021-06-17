import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Tabs from "../../Tabs/Tabs";
import TabPane from "../../TabPane/TabPane";
import Units from "../Units/Units";
import MonitoringPlanDataTable from "../MonitoringPlanDataTable/MonitoringPlanDataTable";
import Location from "../Location/Location";
import ContactsData from "../ContactsData/ContactsData";
import * as fs from "../../../utils/selectors/facilities";

import "./DetailTabs.scss";

export const DetailTabs = ({ facilities, orisCode, showTabs=true }) => {
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
      {showTabs?
      <Tabs initTab="Location">
        <TabPane title="Location">
          <Location facility={facility} />
        </TabPane>
        <TabPane title="Contacts">
          <ContactsData facility={facility} />
        </TabPane>
        <TabPane title="Units">
          <Units facility={facility} />
        </TabPane>
        <TabPane title="Monitoring Plans">
          <MonitoringPlanDataTable facility={facility} />
        </TabPane>
      </Tabs>:null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities,
  };
};

export default connect(mapStateToProps)(DetailTabs);
