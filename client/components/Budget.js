import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchTransactions,
  fetchBudget,
  updateBudget,
} from '../store/transactions';

class Budget extends Component {
  constructor() {
    super();
    this.state = {
      src:
        'https://assets.justinmind.com/wp-content/uploads/2018/09/green-progress-bar.png',
      categoryAmount: {},
      categories: '',
      goalBudget: 0,
    };
    this.parseTransactionData = this.parseTransactionData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.props.updateBudget({
      [this.state.categories]: this.state.goalBudget,
    });
  }

  componentDidMount() {
    this.props.fetchBudget();
    this.parseTransactionData();
  }

  parseTransactionData() {
    let categories = {};
    let total = 0;
    this.props.transactions.forEach((transaction) => {
      total += transaction.amount;
      if (!categories[transaction.category[0]]) {
        categories[transaction.category[0]] = transaction.amount;
      } else {
        categories[transaction.category[0]] += transaction.amount;
      }
    });
    this.setState({ categoryAmount: { ...categories, Total: total } });
  }

  render() {
    const categories = Object.keys(this.state.categoryAmount);
    const budget = Object.keys(this.props.budget) || [];
    return (
      <div className="budgets">
        <div className="editBudget">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="categories">Choose a category:</label>
            <select onChange={this.handleChange} name="categories">
              <option disabled selected value="pickOne">
                --Select Category--
              </option>
              <option value="Travel">Travel</option>
              <option value="Food and Drink">Food and Drink</option>
              <option value="Payment">Payment</option>
              <option value="Shops">Shops</option>
              <option value="Transfer">Transfer</option>
              <option value="Recreation">Recreation</option>
              <option value="Bank Fees">Bank Fees</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Service">Service</option>
              <option value="Tax">Tax</option>
              <option value="Other">Other</option>
              <option value="Total">Total</option>
            </select>
            <label htmlFor="goalBudget">Goal Budget:</label>
            <input
              onChange={this.handleChange}
              type="number"
              name="goalBudget"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          {budget.length ? (
            budget
              .filter((cat) => this.props.budget[cat] > 0)
              .map((category, index) => (
                <div key={index}>
                  {category} : {this.state.categoryAmount[category] || '0'} /{' '}
                  {this.props.budget[category]}
                  <img src={this.state.src} style={{ height: '60px' }} />
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
    updateBudget: (budget) => dispatch(updateBudget(budget)),
  };
};

export default connect(mapState, mapDispatch)(Budget);

// categories: travel, food and drink, payment, shops, transfer, recreation
