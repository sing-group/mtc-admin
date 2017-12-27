import React from "react";
import {Route} from "react-router-dom";

import Configuration from "./components/Configuration";

export default [
  <Route key="configurationRoute" exact path="/configuration" component={Configuration} />
];