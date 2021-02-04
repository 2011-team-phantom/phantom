import React, { Component } from "react";

import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { Menu, Segment } from "semantic-ui-react";

class Navbar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <Menu>
          <Link to="/plaid" font="Open Sans">
            <Menu.Item
              className="navItem"
              name="plaid"
            >
              Plaid
            </Menu.Item>
          </Link>
          <Link to="/budget" font="Open Sans">
            <Menu.Item
              className="navItem"
              name="budget"
            >
              Budget
            </Menu.Item>
          </Link>
          <Link to="/login" font="Open Sans">
            <Menu.Item
              className="navItem"
              name="login"
            >
              Login
            </Menu.Item>
          </Link>
          <Link to="/join" font="Open Sans">
            <Menu.Item
              className="navItem"
              name="join"
            >
              Join
            </Menu.Item>
          </Link>
          <Link to="/transactions" font="Open Sans">
            <Menu.Item
              className="navItem"
              name="transactions"
            >
              Transactions
            </Menu.Item>
          </Link>
        </Menu>

    );
  }
}


export default connect(null, null)(Navbar);
