import React, { useEffect, useState, useCallback } from 'react';
import logo from './assets/logo.svg';
import './App.css';

import { btest }  from './agent';

function App() {

  const [val, setVal] = useState('0');

  useEffect(() => {
    // @ts-ignore
    btest.getValue().then((response: any) => {
      setVal(response.toString());
    });

  }, []);

  const onIncrement = useCallback(async () => {
    // @ts-ignore
    await btest.increment();
    // @ts-ignore
    setVal((await btest.getValue()).toString());


    // setVal(1);
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
