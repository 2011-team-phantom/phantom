import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchTransactions} from "../store/transactions"

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state= {didRender: false}
        console.log('constructor transactions.js comp')
    }

    render() {

        let transactions = this.props.transactions || []
        return (
            <div>
            {transactions.length ? (
              transactions.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="transactions">
                      Date: {item.date}
                      {":  "}
                      Merchant:{" "}
                      {item.merchant_name !== null
                        ? item.merchant_name
                        : item.name}
                      {":  "}
                      Amount: {item.amount}
                      {":  "}
                      Category: {item.category[0]}
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No Transactions</h1>
            )}
          </div>
        );
    }
}

const mapState = (state) => {
    return {
      transactions: state.transactions.transactions,
      user: state.user,
    };
  };

const mapDispatch = (dispatch) => {
    return {
        fetchTransactions: (access_token) =>
      dispatch(fetchTransactions(access_token)),
    }
}

export default connect(mapState, mapDispatch)(Transactions);