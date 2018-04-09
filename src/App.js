import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./layouts/Home";

const App = () => (
  <Router>
      <Route component={Home} />
  </Router>
);

export default App;
