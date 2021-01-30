import React from "react";
import ReactDOM from "react-dom";
import LinkPlaid from "./components/LinkPlaid";

ReactDOM.render(
  <div>

  <div>Hello, world!
  </div>
  <LinkPlaid />
  </div>,
  
  document.getElementById("app") // make sure this is the same as the id of the div in your index.html
);
