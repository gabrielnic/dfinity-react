import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as btest_idl, canisterId as btest_id } from 'dfx-generated/btest';


const agentOptions = {
    host: 'http://localhost:8000',
  }

const agent = new HttpAgent(agentOptions);
const btest = Actor.createActor(btest_idl, { agent, canisterId: btest_id });

export { btest };