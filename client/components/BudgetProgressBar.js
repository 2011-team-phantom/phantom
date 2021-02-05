import { Component } from 'react';
import { connect } from 'react-redux';
import { Progress } from 'semantic-ui-react';
import {
  fetchTransactions,
  fetchBudget,
  updateBudget,
} from '../store/transactions';

class BudgetProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryAmount: this.props.categoryAmount,
    };
  }

  render() {
    const budget = Object.keys(this.props.budget) || [];
    const budgetTracked = budget.filter((cat) => this.props.budget[cat] > 0);

    const data = {
      labels: [...Object.keys(this.props.budget)],
      datasets: [
        {
          label: 'Actual Spending',
          data: [...Object.values(this.props.categoryAmount)],
          backgroundColor: 'rgb(255, 99, 132)', // red
        },
        {
          label: 'Budgeted Spending',
          data: [],
          backgroundColor: 'rgb(75, 192, 192)', // green
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            stacked: true,
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            stacked: true,
          },
        ],
      },
    };
    return <Bar data={data} options={options} />;
  }
}

const mapState = (state) => {
  return {
    transactions: state.transactions.transactions,
    budget: state.transactions.budget,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTransactions: (access_token) =>
      dispatch(fetchTransactions(access_token)),
    fetchBudget: () => dispatch(fetchBudget()),
    updateBudget: (budget) => dispatch(updateBudget(budget)),
  };
};

export default connect(mapState, mapDispatch)(BudgetProgressBar);
