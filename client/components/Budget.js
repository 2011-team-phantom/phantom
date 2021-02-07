import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress, Button, Icon, Input, Dropdown } from 'semantic-ui-react';
import moment from 'moment';
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
      addBudgetForm: false,
      editBudgetForm: false,
      categories: '',
      goalBudget: '',
      // Travel: '',
      // 'Food and Drink': '',
      // Payment: '',
      // Shops: '',
      // Transfer: '',
      // Recreation: '',
      // 'Bank Fees': '',
      // Healthcare: '',
      // Service: '',
      // Tax: '',
      // Other: '',
      // Total: '',
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

  async handleSubmit(event) {
    event.preventDefault();
    await this.props.updateBudget({
      [this.state.categories]: this.state.goalBudget,
    });
    console.log('form submitted');
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
        <div className="budget-category-container">
          {/* <h3>Budget</h3> */}
          <h3>My Spending vs Budget</h3>
          {/* {this.state.editBudgetForm ? (
            <Button
              className="icon-btn"
              onClick={(event) => {
                this.toggleEdit();
                this.handleSubmit(event);
              }}
            >
              <Icon name="save" />
            </Button>
          ) : (
            <Button className="icon-btn" onClick={this.toggleEdit}>
              <Icon name="edit" />
            </Button>
          )} */}
          {budget.length ? (
            budget
              .filter((cat) => this.props.budget[cat] > 0)
              .map((category, index) => (
                <div className="single-budget-category" key={index}>
                  <div className="budget-progress-bar-container">
                    <div className="budget-category-title">
                      {category}
                      {/* {this.state.editBudgetForm && (
                        <Input
                          style={{ width: '80px' }}
                          onChange={this.handleChange}
                          type="number"
                          name={category}
                          value={this.state[category]}
                        />
                      )} */}
                    </div>
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
                            ? this.state.categoryAmount[category] /
                                this.props.budget[category] >
                              1
                              ? 'red'
                              : 'yellow'
                            : 'green'
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
              ))
          ) : (
            <span>Nope</span>
          )}
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
    fetchTransactions: (access_token) =>
      dispatch(fetchTransactions(access_token)),
    fetchBudget: () => dispatch(fetchBudget()),
    updateBudget: (budget) => dispatch(updateBudget(budget)),
  };
};

export default connect(mapState, mapDispatch)(Budget);

// categories: travel, food and drink, payment, shops, transfer, recreation
