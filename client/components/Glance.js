import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactions } from '../store/transactions';
import { me } from '../store/user';
import { Doughnut } from 'react-chartjs-2';
import { Table, Segment, Progress } from 'semantic-ui-react';

class Glance extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUpdatedUser();
    this.props.fetchTransactions();
  }

  render() {
    let totals = {};
    const labels = this.props.transactions.transactions.map((item) => {
      return item.category[item.category.length - 1];
    });
    let transactions = this.props.transactions.transactions || [];
    let spending = transactions.map((t) => {
      if (totals[t.category[t.category.length - 1]]) {
        totals[t.category[t.category.length - 1]] += Math.round(t.amount);
      } else {
        totals[t.category[t.category.length - 1]] = Math.round(t.amount);
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
            '#f4f1de',
            '#e07a5f',
            '#8f5d5d',
            '#3d405b',
            '#5f797b',
            '#81b29a',
            '#babf95',
            '#f2cc8f',
            '#caa997',
            '#a1869e',
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

        <Table className="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Spending</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.keys(totals).map((cat, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell>{cat}</Table.Cell>
                  <Table.Cell>${totals[cat]}</Table.Cell>
                </Table.Row>
              );
            })}
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
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchUpdatedUser: () => dispatch(me()),
  };
};

Glance.propTypes = {};

export default connect(mapState, mapDispatch)(Glance);
