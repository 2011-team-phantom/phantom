import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress, Button, Icon, Input, Dropdown } from 'semantic-ui-react';
import moment from 'moment';

import {
  fetchTransactions,
  fetchBudget,
  updateBudget,
} from '../store/transactions';

const categories = [
  'Travel',
  'Food and Drink',
  'Payment',
  'Shops',
  'Transfer',
  'Recreation',
  'Bank Fees',
  'Healthcare',
  'Service',
  'Tax',
  'Other',
  'Total',
];
const categoryOptions = categories.map((category) => {
  return { key: category, value: category, text: category };
});

class Budget extends Component {
  constructor() {
    super();
    this.state = {
      categoryAmount: {},
      addBudgetForm: false,
      editBudgetForm: false,
      categories: '',
      goalBudget: '',
    };
    this.parseTransactionData = this.parseTransactionData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  handleCategoryChange(event, data) {
    const { name, value } = data;
    this.setState({ [name]: value });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateBudget({
      [this.state.categories]: this.state.goalBudget,
    });
  }

  handleDelete(category) {
    this.props.updateBudget({ [category]: 0 });
  }

  toggleAdd() {
    this.setState({ addBudgetForm: !this.state.addBudgetForm });
  }

  toggleEdit() {
    this.setState({ editBudgetForm: !this.state.editBudgetForm });
  }

  componentDidMount() {
    this.props.fetchBudget();
    this.parseTransactionData();
  }

  parseTransactionData() {
    let categories = {};
    let total = 0;
    this.props.transactions.forEach((transaction) => {
      if (transaction.date.slice(0, 7) === moment().format().slice(0, 7)) {
        total += transaction.amount * 100;
        if (!categories[transaction.category[0]]) {
          categories[transaction.category[0]] = transaction.amount * 100;
        } else {
          categories[transaction.category[0]] += transaction.amount * 100;
        }
      }
    });
    for (let key in categories) {
      categories[key] = categories[key] / 100;
    }
    this.setState({ categoryAmount: { ...categories, Total: total / 100 } });
  }

  render() {
    const budget =
      Object.keys(this.props.budget).filter(
        (name) => name !== 'monthlyIncome' && name !== 'housingCost'
      ) || [];

    return (
      <div className="budget-container">
        <div className="budget-category-container">
          <h3>My Monthly Spending vs Budget</h3>
          {budget.length &&
            budget
              .filter((cat) => this.props.budget[cat] > 0)
              .map((category, index) => (
                <div className="single-budget-category" key={index}>
                  <div className="budget-progress-bar-container">
                    <div className="budget-category-title">{category}</div>
                    <div className="budget-progress-bar">
                      $
                      {this.state.categoryAmount[category]
                        ? Number(this.state.categoryAmount[category]).toFixed(2)
                        : '0'}
                      / ${Math.round(this.props.budget[category])}
                      {(this.state.categoryAmount[category] || '0') >
                        this.props.budget[category] && (
                        <div style={{ color: 'red' }}>OVERBUDGET!</div>
                      )}
                      <Progress
                        value={this.state.categoryAmount[category] || '0'}
                        total={this.props.budget[category]}
                        precision={0}
                        progress="percent"
                        color={
                          this.state.categoryAmount[category] /
                            this.props.budget[category] >
                          0
                            ? this.state.categoryAmount[category] /
                                this.props.budget[category] >
                              0.85
                              ? this.state.categoryAmount[category] /
                                  this.props.budget[category] >
                                1
                                ? 'red'
                                : 'yellow'
                              : 'green'
                            : 'grey'
                        }
                        size="medium"
                      />
                    </div>
                    <div className="delete-budget-btn-container">
                      <Button
                        onClick={() => {
                          this.handleDelete(category);
                        }}
                      >
                        <Icon name="trash alternate" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          <Button className="icon-btn" onClick={this.toggleAdd}>
            <Icon name="edit" />
          </Button>
          {this.state.addBudgetForm && (
            <div className="add-budget-container">
              <h4 style={{ textAlign: 'center' }}>Add/Edit Budget</h4>
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
                <Button type="submit">Save</Button>
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
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchBudget: () => dispatch(fetchBudget()),
    updateBudget: (budget) => dispatch(updateBudget(budget)),
  };
};

export default connect(mapState, mapDispatch)(Budget);
