import { TabPane } from "react-bootstrap";
import { Switch } from "react-router";
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState.monitoringMethods, action) => {
  if (action.type === types.LOAD_MONITORING_METHODS_SUCCESS) {
      return Object.assign({}, state, { methods: action.monitoringMethods});
  }else{
      return state;
    }
};

export default reducer;