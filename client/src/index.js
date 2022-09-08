import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CarStore from "./store/CarStore";
import UserStore from "./store/UserStore";

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new CarStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
