import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../store/user";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleLogin(event) {
    event.preventDefault();
    await this.props.login(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className="login">
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Login to your account
            </Header>
            <Form size="large" onSubmit={this.handleLogin}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  name="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />

                <Button color="teal" fluid size="large" type="submit">
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(auth(email, password));
    },
  };
};

export default connect(null, mapDispatch)(Login);
