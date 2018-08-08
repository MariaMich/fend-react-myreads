import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ReadsApp from "./ReadsApp.js";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <ReadsApp />
  </BrowserRouter>,
  document.getElementById("root")
);
