import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBudget } from '../store/transactions';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Travel: this.props.user.budget.monthlyIncome * 0.1,
      'Food and Drink': this.props.user.budget.monthlyIncome * 0.1,
      Payment: this.props.user.budget.monthlyIncome * 0.1,
      Shops: this.props.user.budget.monthlyIncome * 0.05,
      Transfer: 0,
      Recreation: this.props.user.budget.monthlyIncome * 0.05,
      'Bank Fees': 0,
      Healthcare: this.props.user.budget.monthlyIncome * 0.1,
      Service: 0,
      Tax: 0,
      Other: this.props.user.budget.monthlyIncome * 0.05,
      Total: this.props.user.budget.monthlyIncome,
      errorMessage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value || 0 });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (
      Number(this.state.Total) === 0
    ) {
      this.setState({
        errorMessage: 'Please set a budget for at least one category.',
      });
    } else {
      this.setState({ errorMessage: '' });
      await this.props.updateBudget(this.state);
      this.props.history.push('/transactions');
    }
  }

  render() {
    let saving =
      Object.keys(this.state)
        .filter((key) => {
          return key !== 'Total' && key !== 'errorMessage';
        })
        .reduce((acc, item) => {
          return parseInt(acc, 10) + parseInt(this.state[item], 10);
        }, 0) + parseInt(this.props.user.budget.housingCost, 10);


    const categoryLabels = ["Food and Drink", "Travel", "Payment", "Shops", "Recreation", "Healthcare", "Other"]
    const categoryNumber = ["Food | 10%", "Travel | 10%", "Bills | 10%", "Shops | 5%", "Recreation | 5%", "Health | 10%", "Other | 5%"]

    return (
      <div className="addbudgets">
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Set your budget
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment.Group>
                {categoryLabels.map((cat, idx) => {
                  return (
                    <Segment.Group key={idx} horizontal>
                      <Segment
                        style={{ width: '50%' }}
                        inverted
                        color="teal"
                        attached="top"
                      >
                        {categoryNumber[idx]}
                      </Segment>
                      <Segment attached="bottom">
                        <Form.Input
                          fluid
                          type="number"
                          icon="money"
                          iconPosition="left"
                          name={cat}
                          placeholder={cat}
                          onChange={this.handleChange}
                          value={Math.round(this.state[cat])}
                          max={this.props.user.budget.monthlyIncome}
                        />
                      </Segment>
                    </Segment.Group>
                  )
                })}               
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: '50%' }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Housing | 30%
                  </Segment>
                  <Segment attached="bottom">
                    ${Math.round(parseInt(this.props.user.budget.housingCost, 10))}
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: '50%' }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Savings | 15%
                  </Segment>
                  <Segment attached="bottom">
                    ${Math.round(parseInt(this.state.Total, 10) - saving)}
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: '50%' }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Total | 100%
                  </Segment>
                  <Segment attached="bottom">
                    ${Math.round(this.state.Total)}
                  </Segment>
                </Segment.Group>
                <Button color="teal" fluid size="large" type="submit">
                  Submit
                </Button>
                {this.state.errorMessage !== '' && (
                  <div>{this.state.errorMessage}</div>
                )}
              </Segment.Group>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => {
  return { budget: state.transactions.budget, user: state.user };
};

const mapDispatch = (dispatch) => {
  return {
    updateBudget: (budget) => dispatch(updateBudget(budget)),
  };
};

export default connect(mapState, mapDispatch)(AddBudget);
