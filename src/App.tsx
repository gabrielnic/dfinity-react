import React, { useEffect, useState, useCallback } from 'react';
import logo from './assets/logo.svg';
import './App.css';
import btest from "ic:canisters/btest";


function App() {

  const [val, setVal] = useState(0);

  useEffect(() => {
    // Call a public function defined in the canister
    btest.getValue().then((response: any) => {
      // Since the response is a BigNumber we need to stringify it
      setVal(response.toString());
    });
    // setVal(1);
  }, []);

  const onIncrement = useCallback(async () => {
    // Call another public function
    await btest.increment();
    // Get latest value from canister again
    setVal(2);
    // setVal((await backend.getValue()).toString());
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <h2>Value received from Dfinity: {val}</h2>
        <button onClick={onIncrement}>Increment</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
