import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="container">
      <h1>Develop Navigation</h1>
      <ul>
        <li>
          <a href="/popup.html">popup</a>
        </li>
        <li>
          <a href="/newtab.html">newtab</a>
        </li>
        <li>
          <a href="/options.html">options</a>
        </li>
        <li>
          <a href="/panel.html">panel</a>
        </li>
      </ul>
    </div>
  </React.StrictMode>
);
