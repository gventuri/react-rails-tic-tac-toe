import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ActionCableProvider } from "react-actioncable-provider";

// Components
import Room from "./Room";
import CreateRoom from "./CreateRoom";

const App = () => (
  <ActionCableProvider>
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
  </ActionCableProvider>
);

export default App;
