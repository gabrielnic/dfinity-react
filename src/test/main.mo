import Principal "mo:base/Principal";


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