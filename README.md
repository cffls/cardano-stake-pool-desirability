## What is this project?

This project estimates desirabilities of Cardano stack pools, as well as rewards for stack pool leaders and stack pool members. <br>
The calculation is based on [cardano delegation design specification](https://github.com/input-output-hk/fm-ledger-rules/tree/master/docs/delegation_design_spec). A compiled pdf version is available [here](https://github.com/cffls/cardano-stake-pool-desirability/blob/master/delegation_design_spec.pdf).

### What is desirability?

Desirability of a stake pool shows how desirable it is for participants to delegate their stakes to. More desirable a pool is, more ADA rewards people will get by delegating to the pool.

### Why should I care about desirabilities?

After Cardano enters Shelley (decentralization), people will be able to delegate their stake or run their own stake pools. Stake pools will be ranked by their desirabilities and be shown on Daedalus. Participants will be delegating their stakes to pools that have higher desirabilities for more rewards. Desirability is important if you are interested in:
* running your own stake pools
* experimenting your choices of cost and fee(margin) for your pools

### What are "Myopic desirability" and "Non-Myopic desirability"?

Myopic desirability is proportional to immediate stake member rewards in the current epoch. In contrast, non-myopic desirability is proportional to long-term stake member rewards when a pool is saturated. Myopic desirability will be equal to non-myopic desirability in a saturated pool.

### What is pool leader influence factor?

Pool leader influence factor is the degree of influence a pool operator’s pledged stake has on pool rewards. This factor is used in reward calculation to prevent sybil attacks, where malicious attackers can possibly create dozens or even hundreds of small pools to produce majority of blocks. For more details, please read this blog ([Preventing Sybil Attacks](https://iohk.io/blog/preventing-sybil-attacks/)) from IOHK.

## Getting started

The webapp is available [here](https://cffls.github.io/cardano-stake-pool-desirability/).

If you want to build your own version, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

