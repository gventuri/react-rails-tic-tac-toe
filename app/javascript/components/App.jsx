import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Room from "./Room";
import CreateRoom from "./CreateRoom";

const App = () => (
  <Router>
    <Switch>
      <Route path="/rooms/:roomId">
        <Room />
      </Route>
      <Route path="/">
        <CreateRoom />
      </Route>
    </Switch>
  </Router>
);

export default App;
