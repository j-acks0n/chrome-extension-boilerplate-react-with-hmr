import React from "react";
import ReactDOM from "react-dom/client";

import Newtab from "./Newtab";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Newtab />
  </React.StrictMode>
);
