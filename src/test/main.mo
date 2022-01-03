import Principal "mo:base/Principal";
import Random "mo:base/Random";
import Hash "mo:base/Hash";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";
import Char "mo:base/Char";
import Nat32 "mo:base/Nat32";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Prim "mo:prim";

shared ({caller = owner}) actor class Test() = this {
  stable var currentValue: Nat = 1;

  public shared (msg) func increment(): async Nat {
    currentValue += 1;

    currentValue
  };

  public query func getValue(): async Nat {
    currentValue;
  };

  public func whoami() : async Principal {
    return Principal.fromActor(this);
  };
 
}