import Principal "mo:base/Principal";
import Random "mo:base/Random";
import Hash "mo:base/Hash";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";
import Char "mo:base/Char";
import Nat32 "mo:base/Nat32";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import TrieMap "mo:base/TrieMap";
import Debug "mo:base/Debug";
import Prim "mo:prim";

shared ({caller = owner}) actor class Test() = this {
  stable var currentValue: Nat = 1;

  type BlobTest = {
    data : Blob;
    name : Text;
  };
  let data = TrieMap.TrieMap<Text, BlobTest>(Text.equal, Text.hash);


  public shared ({ caller }) func appendData(key: Text, bt: BlobTest) : async () {
    Debug.print("append key" # key);
    let _ = data.put(key, bt);

  };

  public shared query ({ caller })  func getData(key: Text) : async ?Blob {
    let d = data.get(key);
    switch(d) {
      case null { return null; };
      case (?d) {
        Debug.print(debug_show(d.data));
        return ?d.data;
      };
    };
    return null;
  };

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