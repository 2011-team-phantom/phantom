import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTransactions } from "../store/transactions";
import { Line } from "react-chartjs-2";
import { Table } from "semantic-ui-react";
import { me } from "../store/user";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // labels: ["January", "February", "March", "April", "May"],
      // datasets: [
      //   {
      //     label: "Rainfall",
      //     fill: false,
      //     lineTension: 0.5,
      //     backgroundColor: "rgba(75,192,192,1)",
      //     borderColor: "rgba(0,0,0,1)",
      //     borderWidth: 2,
      //     data: [65, 59, 80, 81, 56],
      //   },
      // ],
      counter: 0,
    };
    console.log("in constructor", this.props.user, "before fetch");
    this.props.fetchUpdatedUser();
  }

  componentDidMount() {
    if (this.props.user.access_token) {
      this.props.fetchTransactions(
        this.props.user.access_token[0] || this.props.transactions.access_token
      );
    }

    this.setState();
  }
  componentDidUpdate() {}

  render() {
    this.props.user.access_token && this.state.counter < 3
      ? this.props.fetchTransactions(
          this.props.user.access_token[0] ||
            this.props.transactions.access_token
        ) && this.state.counter++
      : console.log("hi");
    let transactions = this.props.transactions.transactions || [];
    let spending = transactions
      .map((t) => {
        return t.amount;
      })
      .reverse();
    let labels = transactions
      .map((t) => {
        return t.date;
      })
      .reverse();
    let newData = {
      labels: labels,
      datasets: [
        {
          label: "spending",
          fill: true,
          lineTension: 0.5,
          backgroundColor: "#81B29A", //color of the dots
          borderColor: "#81B29A", //border of the dots
          borderWidth: 2,
          data: spending,
        },
      ],
    };

    return (
      <div className="transactionsContainer">
        <div id="transactions_spending">
          <Line
            data={newData}
            width={400}
            height={250}
            options={{
              title: {
                display: true,
                text: "Monthly Spending",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Merchant</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {transactions.length ? (
              transactions.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{item.date}</Table.Cell>
                    <Table.Cell>
                      {item.merchant_name !== null
                        ? item.merchant_name
                        : item.name}
                    </Table.Cell>
                    <Table.Cell>${item.amount.toFixed(2)}</Table.Cell>
                    <Table.Cell>{item.category[0]}</Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell>No Transactions</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
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
    fetchTransactions: (access_token) =>
      dispatch(fetchTransactions(access_token)),
    fetchUpdatedUser: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Transactions);
