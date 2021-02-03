import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../store/user";
import { Redirect } from "react-router-dom";

class Budget extends Component {
  constructor() {
    super();
    this.state = {
      src="https://cdn.kastatic.org/ka-perseus-graphie/42532907ceb2fa2f9a747335c53fa61daa0c30d8.svg"
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleLogin(event) {
    event.preventDefault();
    await this.props.login(this.state.email, this.state.password);
    this.props.history.push("/plaid");
  }

  render() {
    return (
      <div className="budgets">
        <img src={this.state.src}/>
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

export default connect(mapState, mapDispatch)(Budget);

// categories: travel, food and drink, payment, shops, transfer, recreation