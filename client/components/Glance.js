import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTransactions } from "../store/transactions";
import { me } from "../store/user";
import { Doughnut } from "react-chartjs-2";
import { Table, Dropdown } from "semantic-ui-react";
import { sub, parseISO, isAfter } from "date-fns";

const timeframe = ["3 Months", "6 Months", "1 Year"];
const timeframeOptions = timeframe.map((t) => {
  return { key: t, value: t, text: t };
});

class Glance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeframe: "6 Months",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchUpdatedUser();
    this.props.fetchTransactions();
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDropdownChange(event, data) {
    const { name, value } = data;
    this.setState({ [name]: value });
  }

  sortTransactions(transactions) {
    return transactions
      .slice()
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }
  parseTransactions(transactions, timeframe) {
    let beforeDate;
    const today = new Date();
    if (timeframe === "1 Year") {
      beforeDate = sub(today, {
        years: 1,
      });
    }
    if (timeframe === "6 Months") {
      beforeDate = sub(today, {
        months: 6,
      });
    }
    if (timeframe === "3 Months") {
      beforeDate = sub(today, {
        months: 3,
      });
    }

    return this.sortTransactions(
      transactions.filter((t) => {
        if (isAfter(parseISO(t.date), beforeDate)) {
          return t;
        }
      })
    );
  }

  render() {
    let totals = {};
    const labels = this.props.transactions.transactions.map((item) => {
      return item.category[item.category.length - 1];
    });
    let allTransactions = this.props.transactions.transactions || [];
    let transactions = [];
    if (allTransactions.length > 0) {
      transactions = this.parseTransactions(
        allTransactions,
        this.state.timeframe
      );
    }
    transactions.map((t) => {
      if (totals[t.category[t.category.length - 1]]) {
        totals[t.category[t.category.length - 1]] += Math.round(t.amount);
      } else {
        totals[t.category[t.category.length - 1]] = Math.round(t.amount);
      }
      return t.amount;
    });
    let newData = {
      labels: [...new Set(labels)],
      datasets: [
        {
          label: "Spending",
          backgroundColor: [
            "#f4f1de",
            "#e07a5f",
            "#8f5d5d",
            "#3d405b",
            "#5f797b",
            "#81b29a",
            "#babf95",
            "#f2cc8f",
            "#caa997",
            "#a1869e",
            "#3A5A40",
            "#2A7FA6",
          ],
          hoverBackgroundColor: [
            "#81B29A",
            "#81B29A",
            "#81B29A",
            "#81B29A",
            "#81B29A",
            "#81B29A",
            "#81B29A",
            "#81B29A",
            "#81B29A",
            "#81B29A",
            "#81B29A",
            "#81B29A",
          ],
          data: Object.values(totals),
        },
      ],
    };

    return (
      <div className="glanceContainer">
        <form className="timeframe-dropdown">
          <Dropdown
            onChange={this.handleDropdownChange}
            name="timeframe"
            placeholder="Select Timeframe"
            fluid
            selection
            options={timeframeOptions}
          />
        </form>

        <div>
          <Doughnut
            data={newData}
            options={{
              title: {
                display: true,
                text: `Spending by Category for ${this.state.timeframe}`,
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "left",
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

export default connect(mapState, mapDispatch)(Glance);
