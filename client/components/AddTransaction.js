import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactions, updateTransactions } from '../store/transactions';
import { Dropdown, Button, Input } from 'semantic-ui-react';
import { me } from '../store/user';

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
];
const categoryOptions = categories.map((category) => {
  return { key: category, value: category, text: category };
});

const defaultState = {
  date: '',
  merchant_name: '',
  amount: '',
  category: '',
};

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.toggleAddTransaction = this.toggleAddTransaction.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUpdatedUser();
    this.props.fetchTransactions();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDropdownChange(event, data) {
    const { name, value } = data;
    this.setState({ [name]: value });
  }

  toggleAddTransaction() {
    this.setState({ addTransactionForm: !this.state.addTransactionForm });
  }

  handleSubmit(event) {
    console.log('handle submit', this.state);
    const { amount, category } = this.state;
    event.preventDefault();
    this.props.updateTransactions({
      ...this.state,
      category: [category],
      amount: Number(amount),
    });
    this.setState(defaultState);
  }

  render() {
    console.log(this.state);

    return (
      <div className="add-transaction-form-container">
        <form className="add-transaction-form">
          <div className="add-transaction-form-input">
            <Input
              onChange={this.handleChange}
              type="date"
              name="date"
              placeholder="Date"
              value={this.state.date}
            />
            <Input
              onChange={this.handleChange}
              type="string"
              name="merchant_name"
              placeholder="Merchant"
              value={this.state.merchant_name}
            />
            <Input
              onChange={this.handleChange}
              label={{ basic: true, content: '$' }}
              labelPosition="left"
              type="number"
              name="amount"
              placeholder="Amount"
              value={this.state.amount}
            />
            <Dropdown
              onChange={this.handleDropdownChange}
              name="category"
              placeholder="Select Category"
              fluid
              search
              selection
              options={categoryOptions}
              value={this.state.category}
            />
          </div>
          <br />
          <Button type="submit" onClick={this.handleSubmit}>
            Save
          </Button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    transactions: state.transactions,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchUpdatedUser: () => dispatch(me()),
    updateTransactions: (transaction) =>
      dispatch(updateTransactions(transaction)),
  };
};

export default connect(mapState, mapDispatch)(AddTransaction);
