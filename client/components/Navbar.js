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
    // const { activeItem } = this.state
    return (
      <div className="navBar">
        {/* <Menu fixed="top" inverted></Menu> */}
        {this.props.isLoggedIn ? (
          <Menu fixed="top" inverted >
            <Container>
              <Menu.Item header as="a" className="navItem" name="phantom">
                <Image
                  size="mini"
                  src="https://s3.amazonaws.com/DesignStudio/Website/images/plogo.png"
                  style={{ marginRight: "1.5em" }}
                />
              </Menu.Item>

                <Link to="/transactions" font="Open Sans">
              <Menu.Item header as="a" className="navItem" name="transactions" style={{ marginTop: "1em" }}>
                  Transactions
              </Menu.Item>
                </Link>

                <Link to="/budget" font="Open Sans">
              <Menu.Item header as="a" className="navItem" name="budget" style={{ marginTop: "1em" }}>
                  Budget
              </Menu.Item>
                </Link>

                <Link to="/plaid" font="Open Sans">
              <Menu.Item header as="a" className="navItem" name="plaid" style={{ marginTop: "1em" }}>
                  Plaid Sync
              </Menu.Item>
                </Link>

                <Link to="/glance" font="Open Sans">
              <Menu.Item header as="a" className="navItem" name="glance" style={{ marginTop: "1em" }}>
                  At-a-Glance
              </Menu.Item>
                </Link>
            </Container>
      
      <Menu.Item position="right" font="Open Sans">{email}</Menu.Item>
      
          </Menu>
        ) : (
          <Menu fixed="top" inverted >
            <Container>
              <Menu.Item name="phantom">
                <Image
                  size="mini"
                  src="https://s3.amazonaws.com/DesignStudio/Website/images/plogo.png"
                  style={{ marginRight: "1.5em" }
                }
                />
              </Menu.Item>
                <Link to="/login" font="Open Sans">
              <Menu.Item header as="a" className="navItem" name="login" style={{ marginTop: "1em" }}>
                  Login
              </Menu.Item>
                </Link>
                <Link to="/join" font="Open Sans">
              <Menu.Item header as="a" className="navItem" name="join" style={{ marginTop: "1em" }}>
                  Join
              </Menu.Item>
                </Link>
            </Container>
          </Menu>
        )}
        {/* <Menu fixed="top" inverted></Menu> */}
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
