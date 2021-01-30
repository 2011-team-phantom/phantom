import React, { Component } from "react";
import {PlaidLink} from "react-plaid-link";
import axios from "axios";

class LinkPlaid extends Component {
  constructor() {
    super();

    this.state = {
      transactions: [],
      link_token: "",
      access_token: "",
    };

    this.getLinkToken = this.getLinkToken.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
  }

  componentDidMount(){
    this.getLinkToken()
  }
  
  async handleOnSuccess(public_token, metadata) {
    // send token to client server
    const {data} = await axios.post("/plaid_token_exchange", {
      public_token: public_token,
    });
    console.log('DATA-LINK-PLAID',data)
    this.setState({access_token: data})
  }

  async getLinkToken() {
    const {data} = await axios.get("/link/token/create");
    this.setState({ link_token: data.link_token });
  }
  // handler = plaid.create({
  //   token: "GENERATED",
  //   onSuccess: (publicToken, metadata) => {},
  //   onLoad: () => {},
  //   onExit: (err, metadata) => {},
  //   onEvent: (eventName, metadata) => {},
  //   receivedRedirectUri: null,
  // });

  handleOnExit() {
    // handle the case when your user exits Link
    // For the sake of this tutorial, we're not going to be doing anything here.
    // console.log('localSTORAGE',window.localStorage)
  }

  handleClick(res) {
    axios.get("/transactions").then((res) => {
      this.setState({ transactions: res.data });
    });
  }

  render() {
    console.log('sdfjkdsjkdf',this.state)
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
      </div>
    );
  }
}

export default LinkPlaid;
