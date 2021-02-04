import React, { Component } from "react";
import { connect } from "react-redux";
import { createBudget } from "../store/transactions";

class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Travel: 0,
      "Food and Drink": 0,
      Payment: 0,
      Shops: 0,
      Transfer: 0,
      Recreation: 0,
      "Bank Fees": 0,
      Healthcare: 0,
      Service: 0,
      Tax: 0,
      Other: 0,
      Total: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    await this.props.createBudget(this.state);
    this.props.history.push("/plaid");
  }

  render() {
    //const categories = Object.keys(this.state.budgetCategory);
    return (
      <div className="budgets">
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="Food and Drink">Food and Drink: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Food and Drink"
              value={this.state["Food and Drink"]}
            />
            <label htmlFor="Travel">Travel: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Travel"
              value={this.state.Travel}
            />
            <label htmlFor="Payment">Payment: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Payment"
              value={this.state.Payment}
            />
            <label htmlFor="Shops">Shops: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Shops"
              value={this.state.Shops}
            />
            <label htmlFor="Transfer">Transfer: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Transfer"
              value={this.state.Transfer}
            />
            <label htmlFor="Recreation">Recreation: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Recreation"
              value={this.state.Recreation}
            />
            <label htmlFor="Bank Fees">Bank Fees: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Bank Fees"
              value={this.state["Bank Fees"]}
            />
            <label htmlFor="Healthcare">Healthcare: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Healthcare"
              value={this.state.Healthcare}
            />
            <label htmlFor="Service">Service: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Service"
              value={this.state.Service}
            />
            <label htmlFor="Tax">Tax: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Tax"
              value={this.state.Tax}
            />
            <label htmlFor="Other">Other: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Other"
              value={this.state.Other}
            />
            <label htmlFor="Total">Total: </label>
            <input
              onChange={this.handleChange}
              type="number"
              name="Total"
              value={this.state.Total}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return { budget: state.transactions.budget };
};

const mapDispatch = (dispatch) => {
  return {
    createBudget: (budget) => dispatch(createBudget(budget)),
  };
};

export default connect(mapState, mapDispatch)(AddBudget);
