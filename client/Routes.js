import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import LinkPlaid from './components/LinkPlaid';
import Login from './components/Login';
import Signup from './components/Signup';
import AddBudget from './components/AddBudget';
import Budget from './components/Budget';
import Transactions from './components/Transactions';
import Glance from './components/Glance';
import EditUser from './components/EditUser'

class Routes extends Component {
  render() {
    const { loggedIn } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/join" component={Signup} />
        {loggedIn && (
          <Switch>
            <Route exact path="/plaid" component={LinkPlaid} />
            <Route exact path="/addbudget" component={AddBudget} />

            <Route exact path="/budget" component={Budget} />
            <Route exact path="/transactions" component={Transactions} />
            <Route exact path="/glance" component={Glance} />
            <Route exact path="/edituser" component={EditUser} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

const mapState = (state) => {
  return {
    loggedIn: !!state.user._id,
  };
};

export default withRouter(connect(mapState, null)(Routes));
