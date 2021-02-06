import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTransactions } from "../store/transactions";
import { me } from "../store/user";
import { Pie, Doughnut } from "react-chartjs-2";

class Glance extends Component {
  constructor(props) {
    super(props);
    const state = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Rainfall",
          backgroundColor: [
            "#B21F00",
            "#C9DE00",
            "#2FDE00",
            "#00A6B4",
            "#6800B4",
          ],
          hoverBackgroundColor: [
            "#501800",
            "#4B5000",
            "#175000",
            "#003350",
            "#35014F",
          ],
          data: [65, 59, 80, 81, 56],
        },
      ],
    };
  }

  componentDidMount() {
    this.props.fetchUpdatedUser();
    this.setState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.user.access_token &&
      this.props.transactions.transactions.length <= 0
    ) {
      this.props.fetchTransactions(this.props.user.access_token[0]);
    }
    // console.log(this.state);
  }

  render() {
    const labels = this.props.transactions.transactions.map((item) => {
      return item.category[0];
    });
    // this.setState({
    //   labels: [...new Set(labels)],
    // });
    let transactions = this.props.transactions.transactions || [];
    let spending = transactions.map((t) => {
      return t.amount;
    });
    // console.log(spending, "spending");
    //need two arrays, one with labels
    //one with corresponding totals
    //totals must be in order of labels
    let newData = {
      labels: [...new Set(labels)],
      datasets: [
        {
          label: "Rainfall",
          backgroundColor: [
            "#B21F00",
            "#C9DE00",
            "#2FDE00",
            "#00A6B4",
            "#6800B4",
          ],
          hoverBackgroundColor: [
            "#501800",
            "#4B5000",
            "#175000",
            "#003350",
            "#35014F",
          ],
          data: spending,
        },
      ],
    };
    // console.log(labels, newData.datasets[0].data);
    return (
      <div>
        <Doughnut
          data={newData}
          height={300}
          options={{
            title: {
              display: true,
              text: "Spending by Category",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
            maintainAspectRatio: false,
          }}
        />
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

Glance.propTypes = {};

export default connect(mapState, mapDispatch)(Glance);
