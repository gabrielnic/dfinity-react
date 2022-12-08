[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
 <a href="https://circleci.com/gh/badges/shields/tree/master">
        <img src="https://img.shields.io/circleci/project/github/badges/shields/master" alt="build status"></a>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)




<!-- PROJECT LOGO -->
<br />
<p align="center">
  
  <h3 align="center">ReactJS Typescript Motoko Boilerplate + Authentication</h3>
  <br />
  <strong>Node version: v16.18.1 </strong>
  <strong>Updated for dfx 0.12.1 and @dfinity packages: 0.14.0 </strong>

</p>

## About The Project
Boilerplate ReactJS/Typescript with authentication to a local II 

![screen-capture](https://user-images.githubusercontent.com/6564200/125112118-a9bc8d00-e0de-11eb-9b6b-c17bd9d18272.gif)
<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation
1. Install Internet Identity locally from: https://github.com/dfinity/internet-identity
2. Clone the repo
   ```sh
   git clone https://github.com/gabrielnic/dfinity-react
   ```
3. Install NPM packages
   ```sh
   yarn
   ```
4. Start dfx
   ```sh
   dfx start
   ```
5. Update `.env` with the II canister id eg: `Installing code for canister internet_identity, with the canister_id from internet-identity/.dfx/local/canister_ids.json -> local:  eg: rwlgt-iiaaa-aaaaa-aaaaa-cai
  `   

6. Deploy
   ```sh
   dfx deploy
   ```
7. Manual Deploy (replaces point 6)
  ```
  dfx canister create --all
  dfx generate 
  dfx build
  dfx canister install --all
  ```
<!-- USAGE EXAMPLES -->
## Usage
Copy front-end canister id from .dfx/local/canister_ids.json and replace in the url below
 

Navigate to http://<frontend_canister_id>.localhost:8000/


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.
