import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Image, Menu } from "semantic-ui-react";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "",
    };
  }
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { email } = this.props.meRn;
    const { hasBudget } = this.props;
    const { activeItem } = this.state
    return (
      <div className="navBar">
        {/* <Menu fixed="top" inverted> */}
        {this.props.isLoggedIn ? (
          <Menu fixed="top" inverted>
            
              <Menu.Item name="phantom">
                <Image
                  size="mini"
                  src="https://s3.amazonaws.com/DesignStudio/Website/images/plogo.png"
                  style={{ marginRight: "1.5em" }}
                />
              </Menu.Item>

              {hasBudget && (
                <Menu.Menu>
                  <Link to="/transactions" font="Open Sans">
                    <Menu.Item
                      className="navItem"
                      name="transactions"
                      style={{ marginTop: "1em" }}
                      active={activeItem === 'transactions'}
                      onClick={this.handleItemClick}
                      >
                      Transactions
                    </Menu.Item>
                  </Link>

                  <Link to="/budget" font="Open Sans">
                    <Menu.Item
                      className="navItem"
                      name="budget"
                      style={{ marginTop: "1em" }}
                      active={activeItem === 'budget'}
                      onClick={this.handleItemClick}
                      >
                      Budget
                    </Menu.Item>
                  </Link>

                  <Link to="/plaid" font="Open Sans">
                    <Menu.Item
                      className="navItem"
                      name="plaid"
                      style={{ marginTop: "1em" }}
                      active={activeItem === 'plaid'}
                      onClick={this.handleItemClick}
                      >
                      Plaid Sync
                    </Menu.Item>
                  </Link>

                  <Link to="/glance" font="Open Sans">
                    <Menu.Item
                      className="navItem"
                      name="glance"
                      style={{ marginTop: "1em" }}
                      active={activeItem === 'glance'}
                      onClick={this.handleItemClick}
                      >
                      At-a-Glance
                    </Menu.Item>
                  </Link>
                </Menu.Menu>
              )}
            

            <Menu.Item position="right" font="Open Sans">
              {email}
            </Menu.Item>
          </Menu>
        ) : (
          <Menu fixed="top" inverted>
            
              <Menu.Item name="phantom">
                <Image
                  size="mini"
                  src="https://s3.amazonaws.com/DesignStudio/Website/images/plogo.png"
                  style={{ marginRight: "1.5em" }}
                  />
              </Menu.Item>
              <Link to="/login" font="Open Sans">
                <Menu.Item
                  className="navItem"
                  name="login"
                  style={{ marginTop: "1em" }}
                  onClick={this.handleItemClick}
                  >
                  Login
                </Menu.Item>
              </Link>
              <Link to="/join" font="Open Sans">
                <Menu.Item
                  className="navItem"
                  name="join"
                  style={{ marginTop: "1em" }}
                  onClick={this.handleItemClick}
                  >
                  Join
                </Menu.Item>
              </Link>
          </Menu>
        )}
        {/* </Menu> */}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user._id,
    meRn: state.user,
    hasBudget: !!state.user.budget,
  };
};

export default connect(mapState, null)(Navbar);
