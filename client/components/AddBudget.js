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

    return (
      <div className="addbudgets">
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Set your budget
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: '50%' }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Food | 10%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      type="number"
                      icon="money"
                      iconPosition="left"
                      name="Food and Drink"
                      placeholder="Food and Drink"
                      onChange={this.handleChange}
                      value={Math.round(this.state['Food and Drink'])}
                      max={this.props.user.budget.monthlyIncome}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: '50%' }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Travel | 10%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Travel"
                      placeholder="Travel"
                      onChange={this.handleChange}
                      value={Math.round(this.state.Travel)}
                      max={this.props.user.budget.monthlyIncome}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: '50%' }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Bills | 10%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Payment"
                      placeholder="Payment"
                      onChange={this.handleChange}
                      value={Math.round(this.state.Payment)}
                      max={this.props.user.budget.monthlyIncome}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: '50%' }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Shops | 5%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Shops"
                      placeholder="Shops"
                      onChange={this.handleChange}
                      value={Math.round(this.state.Shops)}
                      max={this.props.user.budget.monthlyIncome}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: '50%' }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Recreation | 5%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Recreation"
                      placeholder="Recreation"
                      onChange={this.handleChange}
                      value={Math.round(this.state.Recreation)}
                      max={this.props.user.budget.monthlyIncome}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: '50%' }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Health | 10%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Healthcare"
                      placeholder="Healthcare"
                      onChange={this.handleChange}
                      value={Math.round(this.state.Healthcare)}
                      max={this.props.user.budget.monthlyIncome}
                    />
                  </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                  <Segment
                    style={{ width: '50%' }}
                    inverted
                    color="teal"
                    attached="top"
                  >
                    Other | 5%
                  </Segment>
                  <Segment attached="bottom">
                    <Form.Input
                      fluid
                      icon="money"
                      type="number"
                      iconPosition="left"
                      name="Other"
                      placeholder="Other"
                      onChange={this.handleChange}
                      value={Math.round(this.state.Other)}
                      max={this.props.user.budget.monthlyIncome}
                    />
                  </Segment>
                </Segment.Group>
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
