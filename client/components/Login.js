import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../store/user";
import { Redirect } from "react-router-dom";

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
    this.props.history.push("/plaid");
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleLogin}>
          <label htmlFor="email">Email: </label>
          <input
            onChange={this.handleChange}
            type="email"
            name="email"
            autoComplete="email"
            value={this.state.email}
          />
          <label htmlFor="password">Password: </label>
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            autoComplete="password"
            value={this.state.password}
          />
          <button type="submit">Submit</button>
        </form>
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
