import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTransactions } from "../store/transactions";

class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categorys,
    };
    this.parseTransactionData = this.parseTransactionData.bind(this);
  }

  componentDidMount() {
    this.parseTransactionData();
  }

  parseTransactionData() {
    let categories = {};
    this.props.transactions.forEach((transaction) => {
      if (!categories[transaction.category[0]]) {
        categories[transaction.category[0]] = transaction.amount;
      } else {
        categories[transaction.category[0]] += transaction.amount;
      }
    });
    this.setState({ budgetCategory: categories });
  }

  render() {
    const categories = Object.keys(this.state.budgetCategory);
    return (
      <div className="budgets">
        <div>
          <form>
            <label for="categories">Choose a category:</label>
            <select name="categories">
              <option value="Travel">Travel</option>
              <option value="Food and Drink">Food and Drink</option>
              <option value="Payment">Payment</option>
              <option value="Shops">Shops</option>
              <option value="Transfer">Transfer</option>
              <option value="Recreation">Recreation</option>
            </select>
            <label for="goalTotal">Goal Total:</label>
            <input type="number" name="goalTotal" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return { transactions: state.transactions.transactions };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTransactions: (access_token) =>
      dispatch(fetchTransactions(access_token)),
  };
};

export default connect(mapState, mapDispatch)(AddBudget);
