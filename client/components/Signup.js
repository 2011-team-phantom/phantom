import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../store/user";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

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
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Sign up to continue
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
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
                <Form.Input
                  fluid
                  icon="calendar alternate"
                  iconPosition="left"
                  placeholder="Date Of Birth"
                  name="dateOfBirth"
                  type="string"
                  onChange={this.handleChange}
                  value={this.state.dateOfBirth}
                />
                <Form.Input
                  fluid
                  icon="money"
                  iconPosition="left"
                  placeholder="Monthly Income"
                  name="monthlyIncome"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.monthlyIncome}
                />
                <Form.Input
                  fluid
                  icon="home"
                  iconPosition="left"
                  placeholder="Housing Cost"
                  name="housingCost"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.housingCost}
                />

                <Button color="teal" fluid size="large" type="submit">
                  Sign Up
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        {/* <form onSubmit={this.handleSubmit}>
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
        </form> */}
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
