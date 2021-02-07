import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "",
    }
  }
  handleItemClick (e, { name }) {this.setState({ activeItem: name })}

  render() {
    const { email } = this.props.meRn;
    const { activeItem } = this.state
    return (
      <div>
        {this.props.isLoggedIn ? (
          <Menu secondary>
            <Link to="/transactions" font="Open Sans">
              <Menu.Item className="navItem" name="transactions"
                active={activeItem === "transactions"}
                onClick={this.handleItemClick}
              >
                Transactions
              </Menu.Item>
            </Link>
            <Link to="/budget" font="Open Sans">
              <Menu.Item className="navItem" name="budget"
                active={activeItem === "budget"}
                onClick={this.handleItemClick}
              >
                Budget
              </Menu.Item>
            </Link>
            <Link to="/plaid" font="Open Sans">
              <Menu.Item className="navItem" name="plaid"
              active={activeItem === "plaid"}
              onClick={this.handleItemClick}
              >
                Plaid Sync
              </Menu.Item>
            </Link>
            <Menu.Item position="right">{email}</Menu.Item>
          </Menu>
        ) : (
          <Menu secondary>
            <Link to="/login" font="Open Sans">
              <Menu.Item className="navItem" name="login"
                active={activeItem === "login"}
                onClick={this.handleItemClick}
                >
                Login
              </Menu.Item>
            </Link>
            <Link to="/join" font="Open Sans">
              <Menu.Item className="navItem" name="join"
                active={activeItem === "join"}
                onClick={this.handleItemClick}
              >
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
    meRn: state.user,
    // activeItem: 'join'
  };
};

export default connect(mapState, null)(Navbar);
