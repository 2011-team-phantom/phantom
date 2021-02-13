import React, { Component } from 'react';
import { PlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid, Message } from 'semantic-ui-react';

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
  }

  componentDidMount() {
    this.props.fetchLinkToken();
  }

  render() {
    return (
      <div className="plaidLink">
        <Grid container style={{ padding: '5em 0em' }}>
          {this.props.link_token ? (
            <div>
              <PlaidLink
                clientName="Plutus"
                env="sandbox"
                product={['auth', 'transactions']}
                token={this.props.link_token}
                onExit={this.handleOnExit}
                onSuccess={(publicToken) => {
                  this.props.fetchAcessToken(publicToken, this.props.user);
                  this.props.history.push('/addbudget');
                }}
                className="test"
              >
                <Message positive>Open Link and connect your bank!</Message>
              </PlaidLink>
            </div>
          ) : (
            <h3>Link Loading...</h3>
          )}
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    transactions: state.transactions.transactions,
    access_token: state.transactions.access_token,
    link_token: state.transactions.link_token,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchAcessToken: (publicToken) => dispatch(fetchAcessToken(publicToken)),
    fetchLinkToken: () => dispatch(fetchLinkToken()),
  };
};

export default connect(mapState, mapDispatch)(LinkPlaid);
