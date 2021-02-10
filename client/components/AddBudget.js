import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBudget } from '../store/transactions';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Travel: 0,
      'Food and Drink': 0,
      Payment: 0,
      Shops: 0,
      Transfer: 0,
      Recreation: 0,
      'Bank Fees': 0,
      Healthcare: 0,
      Service: 0,
      Tax: 0,
      Other: 0,
      Total: 0,
      errorMessage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (
      Number(this.state['Travel']) === 0 &&
      Number(this.state['Food and Drink']) === 0 &&
      Number(this.state['Payment']) === 0 &&
      Number(this.state['Shops']) === 0 &&
      Number(this.state['Transfer']) === 0 &&
      Number(this.state['Recreation']) === 0 &&
      Number(this.state['Bank Fees']) === 0 &&
      Number(this.state['Healthcare']) === 0 &&
      Number(this.state['Service']) === 0 &&
      Number(this.state['Tax']) === 0 &&
      Number(this.state['Other']) === 0 &&
      Number(this.state['Total']) === 0
    ) {
      this.setState({
        errorMessage: 'Please set a budget for at least one category.',
      });
    } else {
      this.setState({ errorMessage: '' });
      await this.props.createBudget(this.state);
      this.props.history.push('/transactions');
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="addbudgets">
        <Grid
          textAlign="center"
          style={{ height: '100vh' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Set your budget
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  type="number"
                  icon="money"
                  iconPosition="left"
                  name="Food and Drink"
                  placeholder="Food and Drink"
                  onChange={this.handleChange}
                  //value={this.state["Food and Drink"]}
                />
                <Form.Input
                  fluid
                  icon="money"
                  type="number"
                  iconPosition="left"
                  name="Travel"
                  placeholder="Travel"
                  onChange={this.handleChange}
                  //value={this.state.Travel}
                />
                <Form.Input
                  fluid
                  icon="money"
                  type="number"
                  iconPosition="left"
                  name="Payment"
                  placeholder="Payment"
                  onChange={this.handleChange}
                  //value={this.state.Payment}
                />
                <Form.Input
                  fluid
                  icon="money"
                  type="number"
                  iconPosition="left"
                  name="Shops"
                  placeholder="Shops"
                  onChange={this.handleChange}
                  //value={this.state.Shops}
                />
                <Form.Input
                  fluid
                  icon="money"
                  type="number"
                  iconPosition="left"
                  name="Transfer"
                  placeholder="Transfer"
                  onChange={this.handleChange}
                  //value={this.state.Transfer}
                />
                <Form.Input
                  fluid
                  icon="money"
                  type="number"
                  iconPosition="left"
                  name="Recreation"
                  placeholder="Recreation"
                  onChange={this.handleChange}
                  //value={this.state.Recreation}
                />
                <Form.Input
                  fluid
                  icon="money"
                  type="number"
                  iconPosition="left"
                  name="Bank Fees"
                  placeholder="Bank Fees"
                  onChange={this.handleChange}
                  //value={this.state["Bank Fees"]}
                />
                <Form.Input
                  fluid
                  icon="money"
                  type="number"
                  iconPosition="left"
                  name="Healthcare"
                  placeholder="Healthcare"
                  onChange={this.handleChange}
                  //value={this.state.Healthcare}
                />
                <Form.Input
                  fluid
                  icon="money"
                  type="number"
                  iconPosition="left"
                  name="Service"
                  placeholder="Service"
                  onChange={this.handleChange}
                  //value={this.state.Service}
                />
                <Form.Input
                  fluid
                  icon="money"
                  type="number"
                  iconPosition="left"
                  name="Tax"
                  placeholder="Tax"
                  onChange={this.handleChange}
                  //value={this.state.Tax}
                />
                <Form.Input
                  fluid
                  icon="money"
                  type="number"
                  iconPosition="left"
                  name="Other"
                  placeholder="Other"
                  onChange={this.handleChange}
                  //value={this.state.Other}
                />
                <Form.Input
                  fluid
                  icon="money"
                  type="number"
                  iconPosition="left"
                  name="Total"
                  placeholder="Total"
                  onChange={this.handleChange}
                  // value={this.state.Total}
                />
                <Button color="teal" fluid size="large" type="submit">
                  Submit
                </Button>
                {this.state.errorMessage !== '' && (
                  <div>{this.state.errorMessage}</div>
                )}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => {
  return { budget: state.transactions.budget };
};

const mapDispatch = (dispatch) => {
  return {
    createBudget: (budget) => dispatch(createBudget(budget)),
  };
};

export default connect(mapState, mapDispatch)(AddBudget);
