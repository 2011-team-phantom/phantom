import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactions } from '../store/transactions';
import { Line } from 'react-chartjs-2';
import { Table, Loader, Dimmer, Dropdown, Button } from 'semantic-ui-react';
import { sub, parseISO, isAfter } from 'date-fns';
import { me } from '../store/user';

const timeframe = ['3 Months', '6 Months', '1 Year'];
const timeframeOptions = timeframe.map((t) => {
  return { key: t, value: t, text: t };
});

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeframe: '6 Months',
    };
    this.handleTimeframeChange = this.handleTimeframeChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchUpdatedUser();
    this.props.fetchTransactions();
  }

  handleTimeframeChange(event, data) {
    const { name, value } = data;
    this.setState({ [name]: value });
  }

  parseTransactions(transactions, timeframe) {
    let beforeDate;
    const today = new Date();
    if (timeframe === '1 Year') {
      beforeDate = sub(today, {
        years: 1,
      });
    }
    if (timeframe === '6 Months') {
      beforeDate = sub(today, {
        months: 6,
      });
    }
    if (timeframe === '3 Months') {
      beforeDate = sub(today, {
        months: 3,
      });
    }

    return transactions.filter((t) => {
      if (isAfter(parseISO(t.date), beforeDate)) {
        return t;
      }
    });
  }

  render() {
    let allTransactions = this.props.transactions.transactions || [];
    let transactions = [];
    if (allTransactions.length > 0) {
      transactions = this.parseTransactions(
        allTransactions,
        this.state.timeframe
      );
    }
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
          label: 'spending',
          fill: true,
          lineTension: 0.5,
          backgroundColor: '#81B29A', //color of the dots
          borderColor: '#81B29A', //border of the dots
          borderWidth: 2,
          data: spending,
        },
      ],
    };

    return (
      <div className="transactionsContainer">
        <form className="timeframe-dropdown">
          <Dropdown
            onChange={this.handleTimeframeChange}
            name="timeframe"
            placeholder="Select Timeframe"
            fluid
            selection
            options={timeframeOptions}
          />
        </form>
        <div id="transactions_spending">
          <Line
            data={newData}
            width={400}
            height={250}
            options={{
              title: {
                display: true,
                text: 'Monthly Spending',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
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
                <Table.Cell>
                  <Dimmer active>
                    <Loader content="Loading" size="huge" />
                  </Dimmer>
                </Table.Cell>
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
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchUpdatedUser: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(Transactions);
