import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.openedFacilityTabs, action) => {
  if (action.type === types.ADD_FACILITY_TAB) {
    return (state = [...state, action.facility]);
  } else if (action.type === types.REMOVE_FACILITY_TAB) {
    return state.filter(
      (facility) => state.indexOf(facility) !== action.facility - 1
    );
  } else if (action.type === types.SET_LOCATION_SELECTION_STATE) {
    if (state && state.length > 0) {
      return state.map((x, i) =>
        x.name === action.title
          ? {
              ...x,
              location: action.location,
            }
          : x
      );
    }
  } else if (action.type === types.SET_LOCATIONS_STATE) {
    if (state && state.length > 0) {
      return state.map((x, i) =>
        x.orisCode === action.orisCode
          ? {
              ...x,
              locations: action.locations,
            }
          : x
      );
    }
  } else if (action.type === types.SET_SECTION_SELECTION_STATE) {
    if (state && state.length > 0) {
      return state.map((x, i) =>
        x.name === action.title
          ? {
              ...x,
              section: action.section,
            }
          : x
      );
    }
  } else if (action.type === types.SET_CHECKOUT_STATE) {
    if (state && state.length > 0) {
      console.log('test')
      return state.map((x, i) =>
        x.name === action.title
          ? {
              ...x,
              checkout: action.checkout,
            }
          : x
      );
    }
  } else {
    return state;
  }
};

export default reducer;
