import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import LinkPlaid from "./components/LinkPlaid";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddBudget from "./components/AddBudget";
import Budget from "./components/Budget";
import Transactions from "./components/Transactions";
import Glance from "./components/Glance";
import me from "./store/user";
// import PropTypes from 'prop-types'
class Routes extends Component {
  // componentDidMount(){
  //   // this.props.onLoad()
  // }
  render() {
    const {loggedIn, budget} = this.props;
    console.log(budget)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/join" component={Signup} />
        { loggedIn && (<Switch>
          <Route exact path="/plaid" component={LinkPlaid} />
          <Route exact path="/addbudget" component={AddBudget} />
          
          {/* {budget && (<Switch> */}
  
          <Route exact path="/budget" component={Budget} />
          <Route exact path="/transactions" component={Transactions} />
          <Route exact path="/glance" component={Glance} />
          {/* </Switch>)} */}
        </Switch>
          )
          
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

const mapState = (state) => {
  return {
    loggedIn: !!state.user._id,
    // gotBank: !!state.user.access_token,
    budget: !!state.user.budget
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     onLoad() {
//       dispatch(me());
//     },
//   };
// };

export default withRouter(connect(mapState, null)(Routes));

// Routes.propTypes = {
//   onLoad: PropTypes.func.isRequired,
//   loggedIn: PropTypes.bool.isRequired
// }