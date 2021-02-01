import axios from "axios";
import React, { Component } from "react";

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
    const res = await axios.post("/auth/login/", this.state);
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
            value={this.state.email}
          />
          <label htmlFor="password">Password: </label>
          <input
            onChange={this.handleChange}
            type="password"
            name="password"
            value={this.state.password}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
