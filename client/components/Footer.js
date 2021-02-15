import React, { Component } from "react";
import { Container, Image, List, Segment, Icon } from "semantic-ui-react";

class Footer extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="footer">
        <Segment
          inverted
          vertical
          style={{
            margin: "5em 0em 0em",
            padding: "5em 0em",
            bottom: "0",
            width: "100%",
          }}
        >
          <Container textAlign="center">
            <Image centered size="mini" src={`../favicon/navbarlogo.png`} />
            <List horizontal inverted divided link size="small">
              <br />
              <List.Item
                as="a"
                href="https://www.linkedin.com/in/teofilocallanaupa/"
              >
                Teofilo Callañaupa
              </List.Item>
              <List.Item as="a" href="https://www.linkedin.com/in/comfort-o/">
                Comfort Olowo
              </List.Item>
              <List.Item
                as="a"
                href="https://www.linkedin.com/in/janetlam3933/"
              >
                Janet Lam
              </List.Item>
              <List.Item
                as="a"
                href="https://www.linkedin.com/in/kaitlin-browne/"
              >
                Kaitlin Browne
              </List.Item>
              <br />

              <List.Item as="a" href="https://www.fullstackacademy.com/">
                Thanks to Fullstack Academy Web Development Fellowship
              </List.Item>
              <br />
              <List.Item
                as="a"
                href="https://github.com/2011-team-phantom/phantom"
              >
                <Icon name="github" size="large" />
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Footer;
