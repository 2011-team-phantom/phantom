import React, { Component } from "react";
import { logout } from "../store/user";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Image, Menu } from "semantic-ui-react";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "",
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { email } = this.props.meRn;
    const { hasBudget } = this.props;
    const { activeItem } = this.state;
    const navItems = ["transactions", "budget", "plaid", "glance", "edituser"];
    const navItemTags = [
      "Transactions",
      "Budget",
      "Plaid Sync",
      "At A Glance",
      "Edit User",
    ];
    const loginNav = ["login", "join"];
    return (
      <div className="navBar">
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
                {navItems.map((value, idx) => {
                  return (
                    <Menu.Item
                      key={idx}
                      as={Link}
                      to={value}
                      className="navItem"
                      name={value}
                      active={activeItem === { value }}
                      onClick={this.handleItemClick}
                    >
                      {navItemTags[idx]}
                    </Menu.Item>
                  );
                })}
              </Menu.Menu>
            )}

            <Menu.Item position="right" font="Open Sans">
              <Button
                onClick={this.props.logout}
                content={email}
                label={{ basic: true, content: "Logout" }}
                labelPosition="right"
              />
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
            {loginNav.map((label, idx) => {
              return (
                <Menu.Item
                  key={idx}
                  as={Link}
                  to={label}
                  className="navItem"
                  name={label}
                  active={activeItem === { label }}
                  onClick={this.handleItemClick}
                >
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </Menu.Item>
              );
            })}
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
    hasBudget: !!state.user.budget,
  };
};
const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
