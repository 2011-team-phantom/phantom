import React, { Component } from "react";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="login">
        <nav></nav>
      </div>
    );
  }
}

export default connect(null, null)(Navbar);
