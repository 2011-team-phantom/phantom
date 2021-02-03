import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactions } from '../store/transactions';

class Budget extends Component {
  constructor() {
    super();
    this.state = {
      src:
        'https://assets.justinmind.com/wp-content/uploads/2018/09/green-progress-bar.png',
      budgetCategory: {},
    };
    this.parseTransactionData = this.parseTransactionData.bind(this);
  }

  componentDidMount() {
    this.parseTransactionData();
    console.log("WE'RE HEERE IN BUDGETTT");
  }

  // handleChange(event) {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  // async handleLogin(event) {
  //   event.preventDefault();
  //   await this.props.login(this.state.email, this.state.password);
  //   this.props.history.push('/plaid');
  // }

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
          {categories.map((category) => (
            <div>
              {category} : {this.state.budgetCategory[category]}
              <img src={this.state.src} style={{ height: '40px' }} />
            </div>
          ))}
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

export default connect(mapState, mapDispatch)(Budget);

// categories: travel, food and drink, payment, shops, transfer, recreation
