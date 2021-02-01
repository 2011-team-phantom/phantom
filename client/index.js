import React from "react";
import ReactDOM from "react-dom";
import LinkPlaid from "./components/LinkPlaid";
import Routes from "./Routes";

ReactDOM.render(
  <div>
    Hello, world!
    <Routes />
  </div>,

  document.getElementById("app") // make sure this is the same as the id of the div in your index.html
);
