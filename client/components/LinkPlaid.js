import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Message } from "semantic-ui-react";

import {
  fetchAcessToken,
  fetchLinkToken,
  fetchTransactions,
} from "../store/transactions";
// import Transactions from "./Transactions";

class LinkPlaid extends Component {
  constructor() {
    super();

    this.state = {
      link_token: "",
      access_token: "",
      render: "",
      didRender: false,
    };

    this.getLinkToken = this.getLinkToken.bind(this);
    this.handleOnExit = this.handleOnExit.bind(this);
  }

  componentDidMount() {
    this.props.fetchLinkToken();
  }

  handleOnSuccess() {
    // send token to client server
  }

  async getLinkToken() {
    const { data } = await axios.get("/link/token/create");
    this.setState({ link_token: data.link_token });
  }

  async handleOnExit() {
    // handle the case when your user exits Link
    // For the sake of this tutorial, we're not going to be doing anything here.
  }

  render() {
    return (
      <div className="plaidLink">
        <Grid container style={{ padding: "5em 0em" }}>
          {this.props.link_token ? (
            <div>
              <PlaidLink
                clientName="React Plaid Setup"
                env="sandbox"
                product={["auth", "transactions"]}
                token={this.props.link_token}
                onExit={this.handleOnExit}
                onSuccess={(public_token) => {
                  this.props.fetchAcessToken(public_token, this.props.user);
                  setTimeout(
                    () => this.props.history.push("/transactions"),
                    500
                  );
                }}
                className="test"
              >
                <Message positive>Open Link and connect your bank!</Message>
              </PlaidLink>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
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
    fetchTransactions: (access_token) =>
      dispatch(fetchTransactions(access_token)),
    fetchAcessToken: (public_token) => dispatch(fetchAcessToken(public_token)),
    fetchLinkToken: () => dispatch(fetchLinkToken()),
  };
};

export default connect(mapState, mapDispatch)(LinkPlaid);
