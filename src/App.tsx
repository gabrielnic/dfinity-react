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

const b64toUint8 = (b64Data: string): Uint8Array => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays[i] = byteCharacters.charCodeAt(i);
  }
  return new Uint8Array(byteArrays);
}


const uploadBlob = async (e: React.FormEvent<HTMLButtonElement>) => {
  e.preventDefault();
  // test blob
  const base64Blob = 'H4sIAAAAAAAACo2W2W7qSBCG61m4nUEYDAaONBfsELIBIRBG0VHYtwSchDWad5+v6mAgcyZSZLndSy1//V1d7Q8JSU8WPK/SlzdGP+RvCUtU/jy0jjzShuRdJjKXwVEmJB2Zyq34ciMpiUlSCsg+yQO9uGylJZdSlaw0+GaQVhsLcU1mLCNpyg7ZpjzLCzamsqYdYWsqJeY2B42w3GG7hL0sVtPoNCXHaEC7ZJxhfAWKK3R/aVSlje8FfnvILfA+o/+E7Jx+i9FYitjfSe2g0SF2n9UeGIqg8bA5kBWed3jxsLIFaQ0vAaqalLGUQeYJeZengIWF3IOiQPxTubbZyyOqOfgTjG5BHZU8ejO0y2CtYanIdwv/e2INuPJZKcB526T2YJuBx2PuAj7uka6B08NWoFFHLmM+ajCYkyHrPhZ9RtegK2NtBLbhUSOLxAbGxiY7AlEBZBX4GoJ2iO0hMzvYCDTyeOljawLmO/ayDapnZrKstPA7QLsCutaRKx9LJaJekUFx7Cm7VTjKI73D5wCektj5eeRqZ4xMyaocXE15NFdK7EEGFmLMF/i+ne2Hy/oaZB28ZNCagyzG3AvoNqa1hbUX4gr2fMrePIPnJ5762O+hUULmynJ0jVxbuuTM6IyrPn73MNnCUp0Vh2x10epiZYHFDdm6xWoQxxKGctj0QeGiE+eru+KzEx4ei4x22O8dUe2Id285uiU6j36T/Ugy20ArB+Y7xlHkA1QFvDvMdsC3oH9j7HbwEkaqAUsP2KqBOvDxgr89thLEE8eL7nkYyzX0qqyW7CQk0AvY3dg5GMFIg926ZW3GV/Nogu1XrKSw79huBue8iezMzqHmbZ13gu0OsRR5mvQneOgf47jn8fEQ5lshnjEyE1BVsJqwLFiZ/PMxjixW88z3YOTeMrRgZ3qFlyfQJCzyWzwGqNbI5ZF8AUEZT1PL9hzxdYk8Y98xPkbHyFcg8OC0y/eCSNPYbTDeYF1PsAcHV4xPubsh4rRlRA9PDzDt4GGPzzmyNcu3GF4mR40ZM1E8DcB0h3bf8spBXquXD7MJLA6s3gS15AYsLjNv2I4xnjFTsNOXssrrwZPuYRBHgmj3vAP0ruCtC7u6Ny3OpEvsr1axL3lP1WcJj2M7NVHalVXRNV70bE3ZFx8d5TrQiGG9jVetdCO8PSOrVTqL5IB+A19j2ymN/PFwQl5BsbR6+M6rN8sH7RORvSH5fnbbrLCtlX1LNC2rjHpi+8xP4U3zyoPBLFIBIg90P43HgeX62HK0AYYi7QXWk0gU8HGqI00i29gJv0SqZH56SFT4XjBfZ74NY5vfYmhYBO9nN+TH2WoFBDobgs0kfjzaJG2aftxOUJoVhzZGfM4Bz4mHQN+x+a31w+i5dkdr5TjN6Hh/kP6H0f/jSJluHAx6ezv0tbImaBWdPg69r3BEP+GIGfpzHBpL6ptINGLvwEESybixoK/OKRLl6HtIEr+hcL6JImoM6J4kDMMvJDpyjQnX7pSvUMQ+oXDB/ZmPxGF8wvFoWELon3Jf87yMV823zH+eHJnukukrcrDKqEauZ8lRx6r8ym4qreBxIkvCXgSPfbI2b/8U+mdyj06HlQZW1qzlecbI6m27tJNVwPbX75AaMKSipgzFwPZnC6YhT4dal7K6UuPUaAV/I9Y052iDpypyeyTzll11pJbUhwcQqr0tZ1Rva/336vJcI5u0KqUYH+zOb2BjxtmL4NlBZ4GO7lgEvR3SOXzpjaZ/ixHbrTI4RiCsozG3KjZi5RZr+t81Y6w6envr7ebauY0RxwSpNSt/2G3cIAOUxx4+uvYn2GdlYX9qejtk7a7uo+HZ302ENkON9YyryGHngj38iydkO/8vfGMxh3gLAAA=';
  const ba = await BackendActor.getBackendActor();
  const append = await ba.appendData('1', { name: 'test1', data: b64toUint8(base64Blob) });
  console.log(append);

}




  return (
    <div className="App">
      <header className="App-header">
      <button onClick={uploadBlob}>Append</button>
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
