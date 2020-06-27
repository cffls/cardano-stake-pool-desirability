import React, { Component } from "react";
import "./App.css";
import StakeSpecs from "./model/StakeSpecs.js";

function costInADA(costPerEpochInUSD, usdToADA) {
  return ADARound(costPerEpochInUSD / usdToADA);
}

function ADARound(amount) {
  // Round to 6 decimals
  return Math.round(amount * 1000000) / 1000000;
}

function USDRound(amount) {
  // Round to 6 decimals
  return Math.round(amount * 100) / 100;
}

class App extends Component {
  updateAll() {
    var z0 = StakeSpecs.z0(this.state.targetNumPools);
    var sigma = StakeSpecs.sigma(
      this.state.totalStakeInCurrentPool,
      this.state.currentTotalSupply
    );
    var s = StakeSpecs.s(
      this.state.totalStakeFromPoolLeaders,
      this.state.currentTotalSupply
    );
    var nonmyopicSigma = StakeSpecs.nonmyopicSigma(
      s,
      sigma,
      this.state.r,
      z0,
      this.state.targetNumPools
    );
    var t = StakeSpecs.t(
      this.state.totalStakeInCurrentPool,
      this.state.totalStakeFromPoolLeaders,
      this.state.currentTotalSupply
    );
    var c = costInADA(this.state.costPerEpochInUSD, this.state.usdToADA);
    var R = StakeSpecs.R(
      this.state.currentTotalSupply,
      this.state.rho,
    );
    var myopicTotalPoolReward = ADARound(
      StakeSpecs.totalPoolReward(R, s, sigma, this.state.a0, z0)
    );
    var myopicPoolLeaderReward = ADARound(
      StakeSpecs.poolLeaderReward(
        myopicTotalPoolReward,
        c,
        this.state.m / 100,
        s,
        sigma
      )
    );
    var myopicMemberReward = ADARound(
      StakeSpecs.memberReward(
        myopicTotalPoolReward,
        c,
        this.state.m / 100,
        t,
        sigma
      )
    );

    var myopicIndividualReward = ADARound(
      (myopicMemberReward * this.state.yourTotalStake) /
        (this.state.totalStakeInCurrentPool -
          this.state.totalStakeFromPoolLeaders)
    );

    var myopicDesirability = ADARound(
      StakeSpecs.desirability(
        myopicTotalPoolReward,
        c,
        this.state.m / 100,
        sigma
      )
    );

    var nonmyopicTotalPoolReward = ADARound(
      StakeSpecs.totalPoolReward(R, s, nonmyopicSigma, this.state.a0, z0)
    );

    var nonmyopicPoolLeaderReward = ADARound(
      StakeSpecs.poolLeaderReward(
        nonmyopicTotalPoolReward,
        c,
        this.state.m / 100,
        s,
        nonmyopicSigma
      )
    );

    var nonmyopicMemberReward = ADARound(
      StakeSpecs.memberReward(
        nonmyopicTotalPoolReward,
        c,
        this.state.m / 100,
        t,
        nonmyopicSigma
      )
    );

    var nonmyopicIndividualReward = ADARound(
      (nonmyopicMemberReward * this.state.yourTotalStake) /
        (this.state.totalStakeInCurrentPool -
          this.state.totalStakeFromPoolLeaders)
    );

    var nonmyopicDesirability = ADARound(
      StakeSpecs.desirability(
        nonmyopicTotalPoolReward,
        c,
        this.state.m / 100,
        z0
      )
    );

    this.setState({
      z0: z0,
      sigma: sigma,
      nonmyopicSigma: nonmyopicSigma,
      s: s,
      t: t,
      c: c,
      R: R,
      myopicTotalPoolReward: myopicTotalPoolReward,
      myopicPoolLeaderReward: myopicPoolLeaderReward,
      myopicMemberReward: myopicMemberReward,
      myopicIndividualReward: myopicIndividualReward,
      myopicDesirability: myopicDesirability,
      nonmyopicTotalPoolReward: nonmyopicTotalPoolReward,
      nonmyopicPoolLeaderReward: nonmyopicPoolLeaderReward,
      nonmyopicMemberReward: nonmyopicMemberReward,
      nonmyopicIndividualReward: nonmyopicIndividualReward,
      nonmyopicDesirability: nonmyopicDesirability
    });
  }

  constructor(props) {
    super(props);
    var currentTotalSupply = 31000000000;
    var a0 = 0.3; // Pool leader influence factor
    var targetNumPools = 150;
    var r = 20; //Rank of the pool
    var totalStakeInCurrentPool = USDRound(currentTotalSupply / targetNumPools);
    var totalStakeFromPoolLeaders = 1000000;
    var yourTotalStake = 100000;
    var usdToADA = 0.1;
    var costPerEpochInUSD = 5;
    var m = 5; // Pool fee %
    var rho = 0.22; // Monetary expansion rate
    var daysPerEpoch = 5;
    this.state = {
      currentTotalSupply: currentTotalSupply,
      targetNumPools: targetNumPools,
      totalStakeInCurrentPool: totalStakeInCurrentPool,
      totalStakeFromPoolLeaders: totalStakeFromPoolLeaders,
      yourTotalStake: yourTotalStake,
      a0: a0,
      r: r,
      usdToADA: usdToADA,
      costPerEpochInUSD: costPerEpochInUSD,
      m: m,
      rho: rho,
      daysPerEpoch : daysPerEpoch
    };
  }

  handleChange(key, e) {
    this.setState({ [key]: parseFloat(e.target.value) }, () => {
      this.updateAll();
    });
  }

  componentDidMount() {
    this.updateAll();
  }

  render() {
    return (
      <div className="container">
        <div className="row title">
          <div
            className="alert alert-primary col-sm-9 offset-sm-2"
            role="alert"
          >
            <h4 className="alert-heading">
              Cardano Stake Pool Desirability Estimation
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 offset-sm-2 card">
            <div>Total ADA Supply</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">₳</span>
              </div>
              <input
                className="form-control"
                onChange={e => this.handleChange("currentTotalSupply", e)}
                defaultValue={this.state.currentTotalSupply}
              />
            </div>
            <div>Monetary expansion rate (ρ)</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">%</span>
              </div>
              <input
                className="form-control"
                onChange={e => this.handleChange("rho", e)}
                defaultValue={this.state.rho}
              />
            </div>
            <div>Pool leader influence factor</div>
            <div className="input-group mb-3">
              <input
                className="form-control"
                onChange={e => this.handleChange("a0", e)}
                defaultValue={this.state.a0}
              />
            </div>
            <div>Number of desired pools</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">#</span>
              </div>
              <input
                className="form-control"
                onChange={e => this.handleChange("targetNumPools", e)}
                defaultValue={this.state.targetNumPools}
              />
            </div>
            <div>Current rank of the pool</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">#</span>
              </div>
              <input
                className="form-control"
                onChange={e => this.handleChange("r", e)}
                defaultValue={this.state.r}
              />
            </div>
            <div>Total stake in current pool</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">₳</span>
              </div>
              <input
                className="form-control"
                onChange={e => this.handleChange("totalStakeInCurrentPool", e)}
                defaultValue={this.state.totalStakeInCurrentPool}
              />
            </div>
            <div>Total stake from pool leader</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">₳</span>
              </div>
              <input
                className="form-control"
                onChange={e =>
                  this.handleChange("totalStakeFromPoolLeaders", e)
                }
                defaultValue={this.state.totalStakeFromPoolLeaders}
              />
            </div>
            <div>Your total stake</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">₳</span>
              </div>
              <input
                className="form-control"
                onChange={e => this.handleChange("yourTotalStake", e)}
                defaultValue={this.state.yourTotalStake}
              />
            </div>
            <div>Exchange rate</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">USD/ADA</span>
              </div>
              <input
                className="form-control"
                onChange={e => this.handleChange("usdToADA", e)}
                defaultValue={this.state.usdToADA}
              />
            </div>
            <div>Days per epoch</div>
            <div className="input-group mb-3">
              <input
                className="form-control"
                onChange={e => this.handleChange("daysPerEpoch", e)}
                defaultValue={this.state.daysPerEpoch}
              />
            </div>
            <div>Cost per epoch</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                className="form-control"
                onChange={e => this.handleChange("costPerEpochInUSD", e)}
                defaultValue={this.state.costPerEpochInUSD}
              />
              <div className="input-group-prepend">
                <span className="input-group-text">₳ {this.state.c}</span>
              </div>
            </div>
            <div>Pool fee</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">%</span>
              </div>
              <input
                className="form-control"
                onChange={e => this.handleChange("m", e)}
                defaultValue={this.state.m}
              />
            </div>
          </div>
          <div className="col-sm-5 offset-sm-1">
            <ul className="list-group dependent-variable-panel">
              <li className="list-group-item list-group-item-action active">
                <div>Myopic estimation</div>
              </li>
              <li className="list-group-item">
                <div>Total pool reward per epoch</div>
                <div>{this.state.myopicTotalPoolReward}</div>
              </li>
              <li className="list-group-item">
                <div>Pool leader reward per epoch</div>
                <div>{this.state.myopicPoolLeaderReward}</div>
              </li>
              <li className="list-group-item">
                <div>Total stake member reward per epoch</div>
                <div>{this.state.myopicMemberReward}</div>
              </li>
              <li className="list-group-item">
                <div>Your reward per epoch</div>
                <div>{this.state.myopicIndividualReward}</div>
              </li>
              <li className="list-group-item">
                <div>Desirability</div>
                <div>{this.state.myopicDesirability}</div>
              </li>
            </ul>
            <ul className="list-group dependent-variable-panel">
              <li className="list-group-item list-group-item-action active">
                <div>Non-myopic estimation</div>
              </li>
              <li className="list-group-item">
                <div>Total pool reward per epoch when pool is saturated</div>
                <div>{this.state.nonmyopicTotalPoolReward}</div>
              </li>
              <li className="list-group-item">
                <div>Pool leader reward per epoch</div>
                <div>{this.state.nonmyopicPoolLeaderReward} (${USDRound(this.state.nonmyopicPoolLeaderReward * this.state.usdToADA)})</div>
              </li>
              <li className="list-group-item">
                <div>Total stake member reward per epoch</div>
                <div>{this.state.nonmyopicMemberReward} (${USDRound(this.state.nonmyopicMemberReward * this.state.usdToADA)})</div>
              </li>
              <li className="list-group-item">
                <div>Your reward per epoch</div>
                <div>{this.state.nonmyopicIndividualReward} (${USDRound(this.state.nonmyopicIndividualReward * this.state.usdToADA)})</div>
              </li>
              <li className="list-group-item">
                <div>Desirability</div>
                <div>{this.state.nonmyopicDesirability}</div>
              </li>
            </ul>
            <a
              id="githublink"
              href="https://github.com/cffls/cardano-stake-pool-desirability"
            >
              <span>Github </span>
              <em className="fa fa-github" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
