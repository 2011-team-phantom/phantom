import React, { Component } from 'react';
import { logout } from '../store/user';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Image, Menu } from 'semantic-ui-react';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: '',
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
    return (
      <div className="navBar">
        {this.props.isLoggedIn ? (
          <Menu fixed="top" inverted>
            <Menu.Item name="phantom">
              <Image
                size="mini"
                src="https://s3.amazonaws.com/DesignStudio/Website/images/plogo.png"
                style={{ marginRight: '1.5em' }}
              />
            </Menu.Item>

            {hasBudget && (
              <Menu.Menu>
                <Menu.Item
                  as={Link}
                  to="/transactions"
                  className="navItem"
                  name="transactions"
                  active={activeItem === 'transactions'}
                  onClick={this.handleItemClick}
                >
                  Transactions
                </Menu.Item>

                <Menu.Item
                  as={Link}
                  to="/budget"
                  className="navItem"
                  name="budget"
                  style={{ marginTop: '1em' }}
                  active={activeItem === 'budget'}
                  onClick={this.handleItemClick}
                >
                  Budget
                </Menu.Item>

                <Menu.Item
                  as={Link}
                  to="/plaid"
                  className="navItem"
                  name="plaid"
                  style={{ marginTop: '1em' }}
                  active={activeItem === 'plaid'}
                  onClick={this.handleItemClick}
                >
                  Plaid Sync
                </Menu.Item>

                <Menu.Item
                  as={Link}
                  to="/glance"
                  className="navItem"
                  name="glance"
                  style={{ marginTop: '1em' }}
                  active={activeItem === 'glance'}
                  onClick={this.handleItemClick}
                >
                  At-a-Glance
                </Menu.Item>

                <Menu.Item
                  as={Link}
                  to="/edituser"
                  className="navItem"
                  name="edituser"
                  style={{ marginTop: '1em' }}
                  active={activeItem === 'edituser'}
                  onClick={this.handleItemClick}
                >
                  Edit-User
                </Menu.Item>
              </Menu.Menu>
            )}

            <Menu.Item position="right" font="Open Sans">
              <Button
                onClick={this.props.logout}
                content={email}
                label={{ basic: true, content: 'Logout' }}
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
                style={{ marginRight: '1.5em' }}
              />
            </Menu.Item>
            <Link to="/login" font="Open Sans">
              <Menu.Item
                className="navItem"
                name="login"
                style={{ marginTop: '1em' }}
                onClick={this.handleItemClick}
              >
                Login
              </Menu.Item>
            </Link>
            <Link to="/join" font="Open Sans">
              <Menu.Item
                className="navItem"
                name="join"
                style={{ marginTop: '1em' }}
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
    hasBudget: !!state.user.budget,
  };
};
const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
