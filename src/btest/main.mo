actor Test {
    stable var currentValue : Text = "a";

    public func increment(): async () {
        currentValue #= "a";
    };

    public query func getValue(): async Text {
        currentValue;
    };
}