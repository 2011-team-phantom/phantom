import React, { Component } from 'react';
import { Container, Image, List, Segment } from 'semantic-ui-react';

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
            margin: '5em 0em 0em',
            padding: '5em 0em',
            bottom: '0',
            width: '100%',
          }}
        >
          <Container textAlign="center">
            <Image
              centered
              size="mini"
              src="https://s3.amazonaws.com/DesignStudio/Website/images/plogo.png"
            />
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                FAQ
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Footer;
