import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "email-validator";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { updateBudget } from "../store/transactions";

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      // password: '',
      Income: 0,
      HousingCost: 0,
      finished: false,
      // errorMessageEdit: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.Income < 1) {
      this.setState({
        errorMessage: "Please enter a new income greater than 0",
      });
    } else if (this.state.HousingCost < 1) {
      this.setState({
        errorMessage: "Please enter a housing cost greater than 0",
      });
    } else {
      this.setState({
        errorMessage: "",
        finished: true,
      });
      this.props.updateBudget(this.state);
      //   this.props.history.push('transactions');
    }
  }

  render() {
    return (
      <div className="editUser">
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 200 }}>
            {this.state.finished && (
              <Header as="h1" color="green" textAlign="center">
                UPDATED
              </Header>
            )}
            <Header as="h2" color="teal" textAlign="center">
              Edit your account
            </Header>
            <Form size="small" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <h3>Income</h3>
                <Form.Input
                  fluid
                  name="Income"
                  type="number"
                  placeholder="New Income"
                  onChange={this.handleChange}
                  defaultValue={this.props.user.budget.Income}
                />
                <h3>Housing Cost</h3>
                <Form.Input
                  fluid
                  name="HousingCost"
                  type="number"
                  placeholder="New Housing Cost"
                  onChange={this.handleChange}
                  defaultValue={this.props.user.budget.HousingCost}
                />

                <Button color="teal" fluid size="large" type="submit">
                  Update My Account
                </Button>
                {this.state.errorMessage !== '' && (<div>{this.state.errorMessage}</div>)}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateBudget: (budget) => dispatch(updateBudget(budget)),
  };
};
export default connect(mapState, mapDispatch)(EditUser);
