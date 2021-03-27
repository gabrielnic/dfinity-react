import * as default_ic from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/authentication";

const { HttpAgent } = default_ic;

const LOCAL_KEY_ID = "testaKey";

// const createAgent = (host: string | undefined) => {
  var keyIdentity = undefined;
  var keyMaybe = window.localStorage.getItem(LOCAL_KEY_ID);

  if (!keyMaybe) {
    const createRandomSeed = () => crypto.getRandomValues(new Uint8Array(32));
    keyIdentity = Ed25519KeyIdentity.generate(createRandomSeed());
    window.localStorage.setItem(LOCAL_KEY_ID, JSON.stringify(keyIdentity.toJSON()));
  } else {
    keyIdentity = Ed25519KeyIdentity.fromJSON(keyMaybe);
  }
  let agent = new HttpAgent({
    identity: keyIdentity,
  });

  agent.addTransform(default_ic.makeNonceTransform());
  agent.addTransform(default_ic.makeExpiryTransform(5 * 60 * 1000));

  // return agent;
// };
const ic = { ...default_ic, agent };

window.ic = ic;

export { ic }
