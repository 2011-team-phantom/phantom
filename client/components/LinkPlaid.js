import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchTransactions } from "../store/transactions";

class LinkPlaid extends Component {
  constructor() {
    super();

    this.state = {
      link_token: "",
      access_token: "",
    };

    this.getLinkToken = this.getLinkToken.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
  }

  componentDidMount() {
    this.getLinkToken();
  }

  async handleOnSuccess(public_token, metadata) {
    // send token to client server
    const { data } = await axios.post("/plaid_token_exchange", {
      public_token: public_token,
    });
    console.log("DATA-LINK-PLAID", data);
    this.setState({ access_token: data });
  }

  async getLinkToken() {
    const { data } = await axios.get("/link/token/create");
    this.setState({ link_token: data.link_token });
  }

  handleOnExit() {
    // handle the case when your user exits Link
    // For the sake of this tutorial, we're not going to be doing anything here.
    // console.log('localSTORAGE',window.localStorage)
  }

  async handleClick() {
    await this.props.fetchTransactions(this.state.access_token);
    //this.setState({ transactions: this.props.transactions });
  }

  render() {
    let transactions = this.props.transactions || [];

    return (
      <div>
        <PlaidLink
          clientName="React Plaid Setup"
          env="sandbox"
          product={["auth", "transactions"]}
          token={this.state.link_token}
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          className="test"
        >
          Open Link and connect your bank!
        </PlaidLink>
        <div>
          <button onClick={this.handleClick}>Get Transactions</button>
        </div>
        <div>
          {transactions.length ? (
            transactions.map((item, index) => {
              // console.log(item);
              return (
                <div key={index}>
                  <div className="transactions">
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
      </div>
    );
  }
}

const mapState = (state) => {
  return { transactions: state.transactions };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTransactions: (access_token) =>
      dispatch(fetchTransactions(access_token)),
  };
};

export default connect(mapState, mapDispatch)(LinkPlaid);
