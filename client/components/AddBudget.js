import React, { Component } from "react";
import { connect } from "react-redux";
import { createBudget } from "../store/transactions";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Label,
  Input,
  SegmentGroup,
} from "semantic-ui-react";

const recommendedBudget = {
  Savings: 15,
  Other: 5,
  Housing: 30,
  Bills: 10,
  "Food and Drink": 10,
  Travel: 10,
  Shops: 5,
  Healthcare: 10,
  Recreation: 5,
};

class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Travel: this.props.user.budget.monthlyIncome * 0.1,
      "Food and Drink": this.props.user.budget.monthlyIncome * 0.1,
      Payment: this.props.user.budget.monthlyIncome * 0.1,
      Shops: this.props.user.budget.monthlyIncome * 0.05,
      Transfer: 0,
      Recreation: this.props.user.budget.monthlyIncome * 0.05,
      "Bank Fees": 0,
      Healthcare: this.props.user.budget.monthlyIncome * 0.1,
      Service: 0,
      Tax: 0,
      Other: this.props.user.budget.monthlyIncome * 0.05,
      Total: this.props.user.budget.monthlyIncome,
      errorMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (
      Number(this.state["Travel"]) === 0 &&
      Number(this.state["Food and Drink"]) === 0 &&
      Number(this.state["Payment"]) === 0 &&
      Number(this.state["Shops"]) === 0 &&
      Number(this.state["Transfer"]) === 0 &&
      Number(this.state["Recreation"]) === 0 &&
      Number(this.state["Bank Fees"]) === 0 &&
      Number(this.state["Healthcare"]) === 0 &&
      Number(this.state["Service"]) === 0 &&
      Number(this.state["Tax"]) === 0 &&
      Number(this.state["Other"]) === 0 &&
      Number(this.state["Total"]) === 0
    ) {
      this.setState({
        errorMessage: "Please set a budget for at least one category.",
      });
    } else {
      this.setState({ errorMessage: "" });
      await this.props.createBudget(this.state);
      this.props.history.push("/transactions");
    }
  }

  render() {

    console.log(this.state);
    let saving =
      Object.keys(this.state)
        .filter((key) => {
          return key !== "Total" && key !== "errorMessage";
        })
        .reduce((acc, item) => {
          return Number(acc) + Number(this.state[item]);
        }, 0) + this.props.user.budget.housingCost;
    console.log("saving", saving);

    return (
      <div className="addbudgets">
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Set your budget
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Food | 10%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      type="number"
                      icon="money"
                      iconPosition="left"
                      name="Food and Drink"
                      placeholder="Food and Drink"
                      onChange={this.handleChange}
                      value={this.state["Food and Drink"]}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Travel | 10%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Travel"
                      placeholder="Travel"
                      onChange={this.handleChange}
                      value={this.state.Travel}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Bills | 10%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Payment"
                      placeholder="Payment"
                      onChange={this.handleChange}
                      value={this.state.Payment}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Shops | 5%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Shops"
                      placeholder="Shops"
                      onChange={this.handleChange}
                      value={this.state.Shops}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Transfer | 0%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Transfer"
                      placeholder="Transfer"
                      onChange={this.handleChange}
                      value={this.state.Transfer}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Recreation | 5%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Recreation"
                      placeholder="Recreation"
                      onChange={this.handleChange}
                      value={this.state.Recreation}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Bank Fees | 0%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Bank Fees"
                      placeholder="Bank Fees"
                      onChange={this.handleChange}
                      value={this.state["Bank Fees"]}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Health | 10%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Healthcare"
                      placeholder="Healthcare"
                      onChange={this.handleChange}
                      value={this.state.Healthcare}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Service | 0%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Service"
                      placeholder="Service"
                      onChange={this.handleChange}
                      value={this.state.Service}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Taxes | 0%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Tax"
                      placeholder="Tax"
                      onChange={this.handleChange}
                      value={this.state.Tax}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Other | 5%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Other"
                      placeholder="Other"
                      onChange={this.handleChange}
                      value={this.state.Other}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Housing | 30%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Housing"
                      placeholder="Housing"
                      value={this.props.user.budget.housingCost}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Savings | 15%
                  </Segment>
                  <Segment attached="bottom">{saving}</Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: "50%" }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Total | 100%
                  </Segment>
                  <Segment attached="bottom">{this.state.Total}</Segment>
                </Segment.Group>
                <Button color="teal" fluid size="large" type="submit">
                  Submit
                </Button>
                {this.state.errorMessage !== "" && (
                  <div>{this.state.errorMessage}</div>
                )}
              </Segment.Group>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => {
  return { budget: state.transactions.budget, user: state.user };
};

const mapDispatch = (dispatch) => {
  return {
    createBudget: (budget) => dispatch(createBudget(budget)),
  };
};

export default connect(mapState, mapDispatch)(AddBudget);
