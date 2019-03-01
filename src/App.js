import React, { Component } from 'react';
import './App.css';
import StakeSpecs from './lib/StakeSpecs.js'

function costInADA(costPerEpochInUSD, usdToADA) {
  return ADARound(costPerEpochInUSD / usdToADA);
}

function ADARound(amount) {
  // Round to 6 decimals
  return Math.round(amount*1000000)/1000000;
}


class App extends Component {
  updateAll() {
    var z0 = StakeSpecs.z0(this.state.desiredPools);
    var sigma = StakeSpecs.sigma(this.state.totalStakeInCurrentPool, this.state.currentTotalSupply, z0);
    var nonmyopicSigma = StakeSpecs.nonmyopicSigma(this.state.totalStakeInCurrentPool, this.state.currentTotalSupply, z0);
    var s = StakeSpecs.s(this.state.totalStakeFromPoolLeaders, this.state.currentTotalSupply, z0);
    var t = StakeSpecs.t(this.state.totalStakeFromPoolLeaders, this.state.currentTotalSupply, this.state.totalStakeInCurrentPool, z0);
    var c = costInADA(this.state.costPerEpochInUSD, this.state.usdToADA);
    var R  = StakeSpecs.R(this.state.currentTotalSupply, this.state.inflationRate);
    var myopicTotalPoolReward = ADARound(StakeSpecs.totalPoolReward(R,
                                                          s,
                                                          sigma,
                                                          this.state.a0,
                                                          z0));
    var myopicPoolLeaderReward = ADARound(StakeSpecs.poolLeaderReward(myopicTotalPoolReward,
                                                          c,
                                                          this.state.m,
                                                          s,
                                                          sigma));
    var myopicMemberReward = ADARound(StakeSpecs.memberReward(myopicTotalPoolReward,
                                                  c,
                                                  this.state.m,
                                                  t,
                                                  sigma));

    var myopicDesirability = ADARound(StakeSpecs.desirability(myopicTotalPoolReward,
                                              c,
                                              this.state.m,
                                              sigma));

    var nonmyopicTotalPoolReward = ADARound(StakeSpecs.totalPoolReward(R,
                                                        s,
                                                        z0,
                                                        this.state.a0,
                                                        z0));

    var nonmyopicPoolLeaderReward = ADARound(StakeSpecs.poolLeaderReward(nonmyopicTotalPoolReward,
                                                         c,
                                                         this.state.m,
                                                         s,
                                                         nonmyopicSigma));

    var nonmyopicMemberReward = ADARound(StakeSpecs.memberReward(nonmyopicTotalPoolReward,
                                                     c,
                                                     this.state.m,
                                                     t,
                                                     nonmyopicSigma));

    var nonmyopicDesirability = ADARound(StakeSpecs.desirability(nonmyopicTotalPoolReward,
                                                 c,
                                                 this.state.m,
                                                 z0));

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
                    myopicDesirability: myopicDesirability,
                    nonmyopicTotalPoolReward: nonmyopicTotalPoolReward,
                    nonmyopicPoolLeaderReward: nonmyopicPoolLeaderReward,
                    nonmyopicMemberReward: nonmyopicMemberReward,
                    nonmyopicDesirability: nonmyopicDesirability
                  });
  }

  constructor(props) {
    super(props);
    var currentTotalSupply = 31000000000;
    var a0 = 0.02;
    var desiredPools = 100;
    var totalStakeInCurrentPool = 5000000;
    var totalStakeFromPoolLeaders = 1000000;
    var usdToADA = 0.05;
    var costPerEpochInUSD = 50;
    var m = 0.01
    var inflationRate = 0.05 // Inflation rate in percent
    this.state = {
      currentTotalSupply: currentTotalSupply,
      desiredPools: desiredPools,
      totalStakeInCurrentPool: totalStakeInCurrentPool,
      totalStakeFromPoolLeaders: totalStakeFromPoolLeaders,
      a0: a0,
      usdToADA: usdToADA,
      costPerEpochInUSD: costPerEpochInUSD,
      m: m,
      inflationRate: inflationRate
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, e) {
    this.setState({[key]: parseFloat(e.target.value)}, ()=>{this.updateAll()})
  }

  componentDidMount(){
    this.updateAll();
  }



  render() {
    return (
      <div className="container" >
        <div className="row title">
          <div className="alert alert-primary col-9 offset-md-2" role="alert">
            <h4 className="alert-heading">Cardano Stake Pool Desirability Estimation</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-3 offset-md-2 card">
            <div>Total ADA Supply</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">₳</span>
              </div>
              <input className="form-control" onChange={(e) => this.handleChange('currentTotalSupply', e)} defaultValue={this.state.currentTotalSupply}/>
            </div>
            <div>Inflation rate per epoch ρ</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">%</span>
              </div>
              <input className="form-control" onChange={(e) => this.handleChange('inflationRate', e)} defaultValue={this.state.inflationRate}/>
            </div>
            <div>Number of desired pools</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">#</span>
              </div>
              <input className="form-control" onChange={(e) => this.handleChange('desiredPools', e)} defaultValue={this.state.desiredPools}/>
            </div>
            <div>Total stake in current pool</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">₳</span>
              </div>
              <input className="form-control" onChange={(e) => this.handleChange('totalStakeInCurrentPool', e)} defaultValue={this.state.totalStakeInCurrentPool}/>
            </div>
            <div>Total stake from pool leader</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">₳</span>
              </div>
              <input className="form-control" onChange={(e) => this.handleChange('totalStakeFromPoolLeaders', e)} defaultValue={this.state.totalStakeFromPoolLeaders}/>
            </div>
            <div>Exchange rate</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">USD/ADA</span>
              </div>
              <input className="form-control" onChange={(e) => this.handleChange('usdToADA', e)} defaultValue={this.state.usdToADA}/>
            </div>
            <div>Cost per epoch</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input className="form-control" onChange={(e) => this.handleChange('costPerEpochInUSD', e)} defaultValue={this.state.costPerEpochInUSD}/>
              <div className="input-group-prepend">
                <span className="input-group-text">₳ {this.state.c}</span>
              </div>
            </div>
            <div>Margin taken by pool leader</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">(0,1)</span>
              </div>
              <input className="form-control" onChange={(e) => this.handleChange('m', e)} defaultValue={this.state.m}/>
            </div>
            <div>Pool leader influence factor</div>
            <div className="input-group mb-3">
              <input className="form-control" onChange={(e) => this.handleChange('a0', e)} defaultValue={this.state.a0}/>
            </div>
          </div>
          <div className="col-5 offset-md-1">
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
                <div>Member reward per epoch</div>
                <div>{this.state.myopicMemberReward}</div>
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
                <div>Total pool reward per epoch</div>
                <div>{this.state.nonmyopicTotalPoolReward}</div>
              </li>
              <li className="list-group-item">
                <div>Pool leader reward per epoch</div>
                <div>{this.state.nonmyopicPoolLeaderReward}</div>
              </li>
              <li className="list-group-item">
                <div>Member reward per epoch</div>
                <div>{this.state.nonmyopicMemberReward}</div>
              </li>
              <li className="list-group-item">
                <div>Desirability</div>
                <div>{this.state.nonmyopicDesirability}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
