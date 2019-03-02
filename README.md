## What is this project?

This project estimates desirabilities of cardano stack pools, as well as rewards for stack pool leaders and stack pool members. <br>
The calculation is based on the cardano delegation design specification, available [here](https://github.com/input-output-hk/fm-ledger-rules/tree/master/docs/delegation_design_spec).

### What is desirability?

Desirability of a stake pool shows how desirable it is for participants to delegate their stakes to. More desirable a pool is, more ADA rewards people will get by delegating to the pool.

### Why should I care about desirabilities?

After Cardano enters Shelley (decentralization), people will be able to delegate their stake or run their own stake pools. Stake pools will be ranked by their desirabilities and be shown on Daedalus. Participants will delegate their stakes to pools with higher desirabilities. Therefore, you might be interested in desirability if you want to:
* know if it is profitable to run your own stake pools
* experiment your choice of cost and margin for your pools
* calculate your rewards if you delegate to a specific pool 

## Available Scripts

In the project directory, you can run:

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

