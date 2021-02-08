import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTransactions } from '../store/transactions';
import { me } from '../store/user';
import { Pie, Doughnut } from 'react-chartjs-2';
import { table, Segment, Progress } from 'semantic-ui-react';

class Glance extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.user.access_token &&
      this.props.transactions.transactions.length <= 0
    ) {
      this.props.fetchTransactions(this.props.user.access_token[0]);
    }
  }

  render() {
    let totals = {};
    const labels = this.props.transactions.transactions.map((item) => {
      return item.category[0];
    });
    let transactions = this.props.transactions.transactions || [];
    let spending = transactions.map((t) => {
      if (totals[t.category[0]]) {
        totals[t.category[0]] += Math.round(t.amount);
      } else {
        totals[t.category[0]] = Math.round(t.amount);
      }
      return t.amount;
    });
    //need two arrays, one with labels
    //one with corresponding totals
    //totals must be in order of labels
    let newData = {
      labels: [...new Set(labels)],
      datasets: [
        {
          label: 'Spending',
          backgroundColor: [
            '#F4F1DE',
            '#E07A5F',
            '#3D405B',
            '#81B29A',
            '#F2CC8F',
          ],
          hoverBackgroundColor: [
            '#dbd9c8',
            '#c46b52',
            '#555a80',
            '#6a917e',
            '#c7a877',
          ],
          data: Object.values(totals),
        },
      ],
    };
    // console.log(newData.labels);
    const totalSpending = Object.values(totals).reduce((accum, cur) => {
      return accum + cur;
    }, 0);
    const percent = totalSpending / (this.props.user.budget.Total * 6);
    //{`${totalSpending}/${this.props.user.budget.Total}`}
    return (
      <div className="glanceContainer">
        <Segment>
          <Progress
            value={totalSpending}
            total={this.props.user.budget.Total * 6}
            progress="percent"
            precision={0}
            color={percent > 0.85 ? 'red' : percent > 0.4 ? 'yellow' : 'green'}
          />
        </Segment>

        <div>
          <Doughnut
            data={newData}
            options={{
              title: {
                display: true,
                text: 'Spending by Category',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'left',
              },
              maintainAspectRatio: false,
              responsive: true,
            }}
            height={300}
          />
        </div>

        <table className="center">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(totals).map((cat, idx) => {
              return (
                <tr key={idx}>
                  <td>{cat}</td>
                  <td>${totals[cat]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
