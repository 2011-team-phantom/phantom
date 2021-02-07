import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Image, Menu } from "semantic-ui-react";

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
      <div className="navBar">
        {this.props.isLoggedIn ? (
          <Menu fixed="top" inverted>
            <Container>
              <Menu.Item header as="a" className="navItem" name="phantom">
                <Image
                  size="mini"
                  src="https://s3.amazonaws.com/DesignStudio/Website/images/plogo.png"
                  style={{ marginRight: "1.5em" }}
                />
              </Menu.Item>

              <Menu.Item header as="a" className="navItem" name="transactions">
                <Link to="/transactions" font="Open Sans">
                  Transactions
                </Link>
              </Menu.Item>

              <Menu.Item header as="a" className="navItem" name="budget">
                <Link to="/budget" font="Open Sans">
                  {" "}
                  Budget{" "}
                </Link>
              </Menu.Item>

              <Menu.Item header as="a" className="navItem" name="plaid">
                <Link to="/plaid" font="Open Sans">
                  Plaid Sync
                </Link>
              </Menu.Item>

              <Menu.Item header as="a" className="navItem" name="glance">
                <Link to="/glance" font="Open Sans">
                  At-a-Glance
                </Link>
              </Menu.Item>
      <Menu.Item position="right">{email}</Menu.Item>
            </Container>
          </Menu>
        ) : (
          <Menu fixed="top" inverted>
            <Container>
              <Menu.Item header as="a" className="navItem" name="phantom">
                <Image
                  size="mini"
                  src="https://s3.amazonaws.com/DesignStudio/Website/images/plogo.png"
                  style={{ marginRight: "1.5em" }}
                />
              </Menu.Item>
              <Menu.Item header as="a" className="navItem" name="login">
                <Link to="/login" font="Open Sans">
                  Login
                </Link>
              </Menu.Item>
              <Menu.Item header as="a" className="navItem" name="join">
                <Link to="/join" font="Open Sans">
                  Join
                </Link>

              </Menu.Item>
            </Container>
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
