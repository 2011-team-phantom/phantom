import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LinkPlaid from "./components/LinkPlaid";
import Login from "./components/Login";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          {
            <Switch>
              {/* Routes placed here are only available after logging in */}
              {/*<Route path="/plaid" component={LinkPlaid} />*/}
            </Switch>
          }
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
