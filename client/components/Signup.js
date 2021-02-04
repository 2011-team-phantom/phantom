import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../store/user";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      dateOfBirth: "",
      monthlyIncome: 0,
      housingCost: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    await this.props.signUP(this.state);
    this.props.history.push("/addbudget");
  }

  render() {
    return (
      <div className="signup">
        <form onSubmit={this.handleSubmit}>
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
          <label htmlFor="dateOfBirth">Date of Birth: </label>
          <input
            onChange={this.handleChange}
            type="string"
            name="dateOfBirth"
            value={this.state.dateOfBirth}
          />
          <label htmlFor="monthlyIncome">Monthly Income: </label>
          <input
            onChange={this.handleChange}
            type="number"
            name="monthlyIncome"
            value={this.state.monthlyIncome}
          />
          <label htmlFor="housingCost">Cost of Housing: </label>
          <input
            onChange={this.handleChange}
            type="number"
            name="housingCost"
            value={this.state.housingCost}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    signUP: (obj) => {
      dispatch(signUp(obj));
    },
  };
};

export default connect(null, mapDispatch)(Signup);
