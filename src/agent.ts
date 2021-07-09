import { Actor, HttpAgent, ActorSubclass, HttpAgentOptions } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { idlFactory, canisterId } from 'dfx-generated/test';
import type { Principal } from "@dfinity/principal";

// copy this from .dfx/local/canisters/test/test.d.ts
export interface Test {
  'getValue' : () => Promise<bigint>,
  'increment' : () => Promise<bigint>,
  'whoami' : () => Promise<Principal>,
};

let agentOptions = {};
if (process.env.NODE_ENV === 'development') {
  agentOptions = { ...agentOptions,  host: 'http://localhost:8000' };
}

export async function getBackendActor(authClient: AuthClient | null): Promise<ActorSubclass<Test>> {
  if (authClient instanceof AuthClient) {
    const identity = authClient.getIdentity();
    agentOptions = { ...agentOptions, identity: identity as any }
  }
  const agent = new HttpAgent(agentOptions);
  // for local development only, this must not be used for production
  if (process.env.NODE_ENV === 'development') {
    await agent.fetchRootKey();
  }

  const backend = Actor.createActor<Test>(idlFactory, { agent, canisterId: canisterId });

  return backend;
};
