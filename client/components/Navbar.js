import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

class Navbar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="navBar">
        {this.props.isLoggedIn ? (
          <Menu>
            <Link to="/transactions" font="Open Sans">
              <Menu.Item className="navItem" name="transactions">
                Transactions
              </Menu.Item>
            </Link>
            <Link to="/budget" font="Open Sans">
              <Menu.Item className="navItem" name="budget">
                Budget
              </Menu.Item>
            </Link>
            <Link to="/plaid" font="Open Sans">
              <Menu.Item className="navItem" name="plaid">
                Plaid Sync
              </Menu.Item>
            </Link>
            <Link to="/glance" font="Open Sans">
              <Menu.Item className="navItem" name="glance">
                At-a-Glance
              </Menu.Item>
            </Link>
          </Menu>
        ) : (
          <Menu>
            <Link to="/login" font="Open Sans">
              <Menu.Item className="navItem" name="login">
                Login
              </Menu.Item>
            </Link>
            <Link to="/join" font="Open Sans">
              <Menu.Item className="navItem" name="join">
                Join
              </Menu.Item>
            </Link>
          </Menu>
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user._id,
  };
};

export default connect(mapState, null)(Navbar);
