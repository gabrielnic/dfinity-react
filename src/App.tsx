import React, { useEffect, useState, useCallback, MouseEventHandler } from 'react';
import dfn from './assets/dfn.svg';
import './App.css';

import { BackendActor }  from './agent';
import { AuthClient } from "@dfinity/auth-client";


function App() {

  const [val, setVal] = useState(0);
  const [logged, setLogged] = useState(false);
  const [identity, setIdentity] = useState('');
  
  useEffect(() => {
    getValue();
    isAuth();
  }, [identity]);

  const onIncrement = useCallback(async () => {
    const ba = await BackendActor.getBackendActor();
    const value = await ba.increment();
    setVal(Number(value));

  }, []);

  const isAuth = async () => {
    const authClient = await AuthClient.create();
    const isAuth =  await authClient.isAuthenticated();
    if (isAuth) {
      setLogged(true);
    }
  }

  const whoami = async() => {
    const ba = await BackendActor.getBackendActor();
    const value = await ba.whoami();
    setIdentity(value.toText());
  }

  const getValue = async() => {
    if (logged) {
      whoami();
    }
    const ba = await BackendActor.getBackendActor();
    const val = await ba.getValue();
    setVal(Number(val));
  }
  
  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const daysToAdd = 7;
    const expiry =  Date.now() + (daysToAdd * 86400000);
    const authClient = await AuthClient.create();
    await authClient.login({
        onSuccess: async () => {
            BackendActor.setAuthClient(authClient);
            const ba = await BackendActor.getBackendActor();
            const principal = await ba.whoami();
            setIdentity(principal.toText());
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        },
        identityProvider: "http://localhost:4943?canisterId=" + process.env.REACT_APP_CANISTER_ID,
        maxTimeToLive: BigInt(expiry * 1000000)
    });
}


  return (
    <div className="App">
      <header className="App-header">
        <h2>Value received from Dfinity: {val}</h2>
        {!logged && 
          <div>
            <h5>In order to increase the counter you need to be logged in</h5>
            <p>Log in with</p>
            <button 
            onClick={handleLogin} 
            className="login-logo">
            <img src={dfn}  alt="dfinity-login" />
          </button>
          </div>
        }
        {logged &&
        <div>
          <h5>Hi {identity}, you're logged in now!</h5>
          <button onClick={onIncrement}>Increment</button>
        </div> 
          
        }
      </header>
    </div>
  );
}

export default App;
