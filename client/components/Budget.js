import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTransactions, fetchBudget } from "../store/transactions";

class Budget extends Component {
  constructor() {
    super();
    this.state = {
      src:
        "https://assets.justinmind.com/wp-content/uploads/2018/09/green-progress-bar.png",
      categoryAmount: {},
    };
    this.parseTransactionData = this.parseTransactionData.bind(this);
  }

  componentDidMount() {
    this.props.fetchBudget();
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
    this.setState({ categoryAmount: categories });
  }

  render() {
    const categories = Object.keys(this.state.categoryAmount);
    const budget = Object.keys(this.props.budget) || [];
    console.log("budgetcategories", budget);
    return (
      <div className="budgets">
        <div className="editBudget">
          <form>
            <label htmlFor="categories">Choose a category:</label>
            <select name="categories">
              <option value="Travel">Travel</option>
              <option value="Food and Drink">Food and Drink</option>
              <option value="Payment">Payment</option>
              <option value="Shops">Shops</option>
              <option value="Transfer">Transfer</option>
              <option value="Recreation">Recreation</option>
            </select>
            <label htmlFor="goalTotal">Goal Total:</label>
            <input type="number" name="goalTotal" />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          {budget.length ? (
            budget
              .filter((cat) => this.props.budget[cat] > 0)
              .map((category) => (
                <div>
                  {category} : {this.state.categoryAmount[category] || "0"} /{" "}
                  {this.props.budget[category]}
                  <img src={this.state.src} style={{ height: "60px" }} />
                </div>
              ))
          ) : (
            <span>Nope</span>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    transactions: state.transactions.transactions,
    budget: state.transactions.budget,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTransactions: (access_token) =>
      dispatch(fetchTransactions(access_token)),
    fetchBudget: () => dispatch(fetchBudget()),
  };
};

export default connect(mapState, mapDispatch)(Budget);

// categories: travel, food and drink, payment, shops, transfer, recreation
