import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "./Routes";

export const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}
export default App;
