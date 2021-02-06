import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress, Button, Icon, Input, Dropdown } from 'semantic-ui-react';
import {
  fetchTransactions,
  fetchBudget,
  updateBudget,
} from '../store/transactions';

class Budget extends Component {
  constructor() {
    super();
    this.state = {
      categoryAmount: {},
      categories: '',
      goalBudget: '',
      addBudgetForm: false,
    };
    this.parseTransactionData = this.parseTransactionData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  handleCategoryChange(event) {
    const { name, value } = event;
    this.setState({ [name]: value });
  }

  handleChange(event) {
    console.log('event name:', event.target.name);
    console.log('event value:', event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.props.updateBudget({
      [this.state.categories]: this.state.goalBudget,
    });
  }

  handleDelete(category) {
    this.props.updateBudget({ [category]: 0 });
  }

  toggleAdd() {
    this.setState({ addBudgetForm: !this.state.addBudgetForm });
  }

  componentDidMount() {
    this.props.fetchBudget();
    this.parseTransactionData();
  }

  parseTransactionData() {
    let categories = {};
    let total = 0;
    this.props.transactions.forEach((transaction) => {
      total += transaction.amount * 100;
      if (!categories[transaction.category[0]]) {
        categories[transaction.category[0]] = transaction.amount * 100;
      } else {
        categories[transaction.category[0]] += transaction.amount * 100;
      }
    });
    for (let key in categories) {
      categories[key] = categories[key] / 100;
    }
    this.setState({ categoryAmount: { ...categories, Total: total / 100 } });
  }

  render() {
    console.log(this.state);
    const categories = Object.keys(this.state.categoryAmount);
    const budget = Object.keys(this.props.budget) || [];
    const categoryOptions = [
      { key: 'Travel', value: 'Travel', text: 'Travel' },
      {
        key: 'Food and Drink',
        value: 'Food and Drink',
        text: 'Food and Drink',
      },
      { key: 'Payment', value: 'Payment', text: 'Payment' },
      { key: 'Shops', value: 'Shops', text: 'Shops' },
      { key: 'Transfer', value: 'Transfer', text: 'Transfer' },
      { key: 'Recreation', value: 'Recreation', text: 'Recreation' },
      { key: 'Bank Fees', value: 'Bank Fees', text: 'Bank Fees' },
      { key: 'Healthcare', value: 'Healthcare', text: 'Healthcare' },
      { key: 'Service', value: 'Service', text: 'Service' },
      { key: 'Tax', value: 'Tax', text: 'Tax' },
      { key: 'Other', value: 'Other', text: 'Other' },
      { key: 'Total', value: 'Total', text: 'Total' },
    ];
    return (
      <div className="budget-container">
        <h3>Budget</h3>
        <div className="editBudget">
          <h4>Edit Budget</h4>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="categories">Choose a category: </label>
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
            <br />
            <label htmlFor="goalBudget">Goal Budget: </label>
            <Input
              onChange={this.handleChange}
              type="number"
              name="goalBudget"
            />
            <Button type="submit">Save</Button>
          </form>
        </div>
        <div className="budget-category-container">
          <h4>Your Spending vs Budget</h4>
          {budget.length ? (
            budget
              .filter((cat) => this.props.budget[cat] > 0)
              .map((category, index) => (
                <div className="single-budget-category" key={index}>
                  <div className="budget-progress-bar-container">
                    <div className="budget-category-title">{category}</div>
                    <div className="budget-progress-bar">
                      ${this.state.categoryAmount[category] || '0'} / $
                      {this.props.budget[category]}
                      {(this.state.categoryAmount[category] || '0') >
                        this.props.budget[category] && (
                        <div style={{ color: 'red' }}>OVERBUDGET!</div>
                      )}
                      <Progress
                        value={this.state.categoryAmount[category] || '0'}
                        total={this.props.budget[category]}
                        progress="ratio"
                        color={
                          this.state.categoryAmount[category] /
                            this.props.budget[category] >
                          0.85
                            ? 'red'
                            : 'green'
                        }
                        size="medium"
                      />
                    </div>
                    <Button
                      className="delete-budget-btn"
                      onClick={() => {
                        this.handleDelete(category);
                      }}
                    >
                      <Icon name="trash alternate" />
                    </Button>
                  </div>
                </div>
              ))
          ) : (
            <span>Nope</span>
          )}
          <Button onClick={this.toggleAdd}>
            <Icon name="add" />
          </Button>
          {this.state.addBudgetForm && (
            <div className="add-budget-container">
              <h4 style={{ textAlign: 'center' }}>Add Budget</h4>
              <form className="add-budget-form" onSubmit={this.handleSubmit}>
                <label htmlFor="categories">Budget Category: </label>
                <Dropdown
                  onChange={this.handleCategoryChange}
                  name="categories"
                  placeholder="Select Category"
                  fluid
                  search
                  selection
                  options={categoryOptions}
                />
                <br />
                <label htmlFor="goalBudget">Budget Goal: </label>
                <Input
                  onChange={this.handleChange}
                  type="number"
                  name="goalBudget"
                />
                <br />
                <Button className="add-budget-btn" type="submit">
                  Save
                </Button>
              </form>
            </div>
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
