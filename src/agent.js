// import {
//   AnonymousIdentity,
//   HttpAgent,
//   makeExpiryTransform,
//   makeNonceTransform,
// } from '@dfinity/agent'


// import { Ed25519KeyIdentity } from "@dfinity/authentication";

// const LOCAL_KEY_ID = "testaKey";

// var keyIdentity = undefined;
// var keyMaybe = window.localStorage.getItem(LOCAL_KEY_ID);

// if (!keyMaybe) {
//   const createRandomSeed = () => crypto.getRandomValues(new Uint8Array(32));
//   keyIdentity = Ed25519KeyIdentity.generate(createRandomSeed());
//   window.localStorage.setItem(LOCAL_KEY_ID, JSON.stringify(keyIdentity.toJSON()));
// } else {
//   keyIdentity = Ed25519KeyIdentity.fromJSON(keyMaybe);
// }

// const agentOptions = {
//   host: 'http://localhost:8000',
//   identity: keyIdentity,
// }
// let agent = new HttpAgent(agentOptions);

// agent.addTransform(makeNonceTransform());
// agent.addTransform(makeExpiryTransform(5 * 60 * 1000));

// const ic = { ...window.ic, agent };

// if (!(window.ic && window.ic.agent)) {
//   window.ic = ic
// }

// export { ic }



import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as btest_idl, canisterId as btest_id } from 'dfx-generated/btest';


const agentOptions = {
    host: 'http://localhost:8000',
  }

const agent = new HttpAgent(agentOptions);
const btest = Actor.createActor(btest_idl, { agent, canisterId: btest_id });

export { btest };