import logo from "../../logo.svg";

function Popup() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/Popup.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://github.com/j-acks0n/chrome-extension-boilerplate-react-with-hmr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </header>
    </div>
  );
}

export default Popup;
