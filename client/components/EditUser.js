import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileAnimation from "./ProfileAnimation";
import CoinAnimation from "./CoinAnimation";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Container,
  Icon,
  Image,
  Modal,
} from "semantic-ui-react";
import { updateBudget } from "../store/transactions";

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      monthlyIncome: 0,
      housingCost: 0,
      finished: false,
      open: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }

  setOpen(openState) {
    this.setState({ open: openState });
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.monthlyIncome < 1) {
      this.setState({
        errorMessage: "Please enter a new income greater than 0",
      });
    } else if (this.state.housingCost < 1) {
      this.setState({
        errorMessage: "Please enter a housing cost greater than 0",
      });
    } else {
      this.setState({
        errorMessage: "",
        finished: true,
      });

      this.props.updateBudget(this.state);
      this.setOpen(false);
    }
  }

  render() {
    return (
      <div className="editUser">
        <Segment
          inverted
          vertical
          style={{
            marginTop: "60px",
            width: "100%",
          }}
        >
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Container text>
                  <Header
                    as="h1"
                    content="Profile"
                    inverted
                    style={{
                      fontSize: "4em",
                      fontWeight: "normal",
                      marginBottom: 0,
                      marginTop: "3em",
                    }}
                  />
                  <Header
                    as="h2"
                    content="Set your subscriptions, bills, and notifications"
                    inverted
                    style={{
                      fontSize: "1.7em",
                      fontWeight: "normal",
                      marginTop: "1.5em",
                      paddingBottom: "1em",
                    }}
                  />
                </Container>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  circular
                  size="medium"
                  src="https://img.pngio.com/cartoon-ghost-png-images-vector-and-psd-files-free-download-on-cartoon-ghost-png-360_360.png"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  We Help People Set and Maintain their Budget Goals
                </Header>
                <br />
                <br />
                <p style={{ fontSize: "1.33em" }}>
                  We can encourage saving habits by providing budgeting
                  recommendation based on income levels and monitoring spending
                  from automatic bank transaction visualizations.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <ProfileAnimation />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Modal
                  onClose={() => this.setOpen(false)}
                  onOpen={() => this.setOpen(true)}
                  open={this.state.open}
                  trigger={<Button>Update Account</Button>}
                >
                  <Modal.Header>Update your settings</Modal.Header>
                  <Modal.Content image>
                    <Modal.Description>
                      <Header as="h2" color="teal" textAlign="center">
                        Edit your account
                      </Header>
                      <Grid textAlign="center" verticalAlign="middle">
                        <Grid.Column style={{ maxWidth: 200 }}>
                          {this.state.finished && (
                            <Header as="h1" color="green" textAlign="center">
                              UPDATED
                            </Header>
                          )}

                          <Form size="large" onSubmit={this.handleSubmit}>
                            <Segment stacked>
                              <h3>Income</h3>
                              <Form.Input
                                fluid
                                name="monthlyIncome"
                                type="number"
                                placeholder="New Income"
                                onChange={this.handleChange}
                                defaultValue={
                                  this.props.user.budget.monthlyIncome
                                }
                              />
                              <h3>Housing Cost</h3>
                              <Form.Input
                                fluid
                                name="housingCost"
                                type="number"
                                placeholder="New Housing Cost"
                                onChange={this.handleChange}
                                defaultValue={
                                  this.props.user.budget.housingCost
                                }
                              />
                              <h3>Bills</h3>
                              <Form.Input
                                fluid
                                name="Bills"
                                type="number"
                                placeholder="Bills"
                              />
                            </Segment>
                          </Form>
                        </Grid.Column>
                      </Grid>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="black" onClick={() => this.setOpen(false)}>
                      Close
                    </Button>
                    <Button
                      color="teal"
                      type="submit"
                      content="Update My Account"
                      labelPosition="right"
                      icon="checkmark"
                      onClick={(e) => this.handleSubmit(e)}
                    />

                    {this.state.errorMessage !== "" && (
                      <div>{this.state.errorMessage}</div>
                    )}
                  </Modal.Actions>
                </Modal>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: "0em" }} vertical>
          <Grid celled="internally" columns={2} stackable>
            <Grid.Row textAlign="center">
              <Grid.Column
                style={{
                  paddingBottom: "5em",
                  paddingTop: "5em",
                  width: "33%",
                }}
              >
                <Header as="h3" style={{ fontSize: "2em" }}>
                  Your Achievements
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  See your savings over the months
                </p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                <Grid columns={3}>
                  <Grid.Column>
                    <CoinAnimation />
                  </Grid.Column>
                  <Grid.Column>
                    <CoinAnimation />
                  </Grid.Column>
                  <Grid.Column>
                    <CoinAnimation />
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateBudget: (budget) => dispatch(updateBudget(budget)),
  };
};
export default connect(mapState, mapDispatch)(EditUser);
