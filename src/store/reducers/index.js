import { combineReducers } from "redux";
import facilitiesReducer from "./facilities";
import monitoringPlansReducer from "./monitoringPlans";
import monitoringMethodsReducer from "./monitoringMethods";
import monitoringSystemsReducer from "./monitoringSystems";
import apiStatusReducer from "./apiStatusReducer";
import dynamicFacilityTabReducer from "./dynamicFacilityTab";
import activeTabReducer from "./activeTab";
const rootReducer = combineReducers({
  facilities: facilitiesReducer,
  apiCallsInProgress: apiStatusReducer,
  monitoringPlans: monitoringPlansReducer,
  monitoringMethods: monitoringMethodsReducer,
  monitoringSystems: monitoringSystemsReducer,
  openedFacilityTabs:dynamicFacilityTabReducer,
  activeTab: activeTabReducer,
});

export default rootReducer;
