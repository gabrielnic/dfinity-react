# echo PATH = $PATH
# echo vessel @ `which vessel`

echo
echo == Create.
echo

dfx canister create --all


echo
echo == Generate.
echo

dfx generate test

echo
echo == Build.
echo

dfx build test

echo
echo == Install.
echo

dfx canister install test --mode=reinstall

dfx canister call test generateRandom
echo
echo == Deploy.
echo

# yarn start
# dfx deploy