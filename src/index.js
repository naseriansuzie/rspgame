import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { configure } from "mobx"; 
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import RootStore from "./stores";

configure({ enforceActions : "always"});

const root = new RootStore();

ReactDOM.render(
  <Provider {...root}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
