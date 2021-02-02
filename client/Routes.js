import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import LinkPlaid from "./components/LinkPlaid";
import Login from "./components/Login";
import Signup from "./components/Signup";

class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/plaid" component={LinkPlaid} />
        <Route exact path="/join" component={Signup} />
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    );
  }
}

export default withRouter(connect(null, null)(Routes));
