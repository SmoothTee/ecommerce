import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { AppProviders } from "./context";
import { Profiler } from "./components/Profiler";

ReactDOM.render(
  <React.StrictMode>
    <Profiler id="App Root" phases={["mount"]}>
      <AppProviders>
        <App />
      </AppProviders>
    </Profiler>
  </React.StrictMode>,
  document.getElementById("root")
);
