import React, { Component } from 'react';
import { PlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchAcessToken,
  fetchLinkToken,
  fetchTransactions,
} from '../store/transactions';

class LinkPlaid extends Component {
  constructor() {
    super();

    this.state = {
      link_token: '',
      access_token: '',
      render: '',
      didRender: false,
    };

    this.getLinkToken = this.getLinkToken.bind(this);
    //this.handleClick = this.handleClick.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
    this.handleOnExit = this.handleOnExit.bind(this);
  }

  componentDidMount() {
    this.props.fetchLinkToken();
  }

  async handleOnSuccess(public_token, metadata) {
    // send token to client server
    const { data } = await axios.post('/plaid_token_exchange', {
      public_token: public_token,
    });
    console.log('DATA-LINK-PLAID', data);
    this.setState({ access_token: data });
  }

  async getLinkToken() {
    const { data } = await axios.get('/link/token/create');
    this.setState({ link_token: data.link_token });
  }

  async handleOnExit() {
    // handle the case when your user exits Link
    // For the sake of this tutorial, we're not going to be doing anything here.
    // console.log('localSTORAGE',window.localStorage)
    await this.props.fetchTransactions(this.props.access_token);
    this.setState({ render: 'yo' });
  }

  // async handleClick() {
  //   //this.setState({ transactions: this.props.transactions });
  // }

  render() {
    if (this.props.access_token && !this.state.didRender) {
      this.props.fetchTransactions(this.props.access_token);
      this.setState({ didRender: true });
    }
    let transactions = this.props.transactions || [];
    console.log('linktokenplz', this.props.link_token);
    return (
      <div>
        {this.props.link_token ? (
          <PlaidLink
            clientName="React Plaid Setup"
            env="sandbox"
            product={['auth', 'transactions']}
            token={this.props.link_token}
            onExit={this.handleOnExit}
            onSuccess={(public_token) => {
              this.props.fetchAcessToken(public_token);
              this.setState({ didRender: false });
            }}
            className="test"
          >
            Open Link and connect your bank!
          </PlaidLink>
        ) : (
          <h3>Link Loading</h3>
        )}

        <div>
          {transactions.length ? (
            transactions.map((item, index) => {
              // console.log(item);
              return (
                <div key={index}>
                  <div className="transactions">
                    Merchant:{' '}
                    {item.merchant_name !== null
                      ? item.merchant_name
                      : item.name}
                    {':  '}
                    Amount: {item.amount}
                    {':  '}
                    Category: {item.category[0]}
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Transactions</h1>
          )}
        </div>
        <Link to="/budget">
          <button>BUDGET</button>
        </Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    transactions: state.transactions.transactions,
    access_token: state.transactions.access_token,
    link_token: state.transactions.link_token,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTransactions: (access_token) =>
      dispatch(fetchTransactions(access_token)),
    fetchAcessToken: (public_token) => dispatch(fetchAcessToken(public_token)),
    fetchLinkToken: () => dispatch(fetchLinkToken()),
  };
};

export default connect(mapState, mapDispatch)(LinkPlaid);
