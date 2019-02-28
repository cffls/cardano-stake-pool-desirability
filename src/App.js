import React, { Component } from 'react';
import './App.css';

function _z0(numPools) {
  return 1 / numPools;
}

function _sigma(totalStakeInCurrentPool, currentTotalSupply, z0) {
  return Math.min(totalStakeInCurrentPool / currentTotalSupply, z0);
}

function _nonmyopicSigma(totalStakeInCurrentPool, currentTotalSupply, z0) {
  return Math.max(totalStakeInCurrentPool / currentTotalSupply, z0);
}

function _s(totalStakeFromPoolLeaders, currentTotalSupply, z0) {
  return Math.min(totalStakeFromPoolLeaders / currentTotalSupply, z0);
}

function _t(totalStakeFromPoolLeaders, currentTotalSupply, totalStakeInCurrentPool, z0) {
  if(totalStakeFromPoolLeaders / currentTotalSupply > z0) {
    return 0;
  } else {
    return (totalStakeInCurrentPool - totalStakeFromPoolLeaders) / currentTotalSupply;
  }
}

function _costInADA(costPerEpochInUSD, usdToADA) {
  return ADARound(costPerEpochInUSD / usdToADA);
}

function _R(currentTotalSupply, inflationRate) {
  return ADARound(currentTotalSupply * (Math.pow(1+inflationRate/100, 1/73)) - currentTotalSupply);
}

function calculateTotalPoolReward(R, s, sigma, a0, z0) {
  return ADARound(R/(1+a0) * (sigma + s*a0*(sigma-s*(z0-sigma)/z0)/z0));
}

function calculatePoolLeaderReward(totalPoolReward, c, m, s, sigma) {
  if (totalPoolReward < c){
    return totalPoolReward;
  } else {
    return ADARound(c + (totalPoolReward - c) * (m + (1 - m) * s / sigma));
  }
}

function calculateMemberReward(totalPoolReward, c, m, t, sigma) {
  if (totalPoolReward < c) {
    return 0;
  } else {
    return ADARound((totalPoolReward - c) * (1 - m) * t / sigma);
  }
}

function calculateDesirability(totalPoolReward, c, m) {
  if (totalPoolReward <= c) {
    return 0;
  } else {
    return ADARound((totalPoolReward - c) * (1 - m));
  }
}

function ADARound(amount) {
  // Round to 6 decimals
  return Math.round(amount*1000000)/1000000;
}


class App extends Component {
  updateAll() {
    this.setState({
                    z0: _z0(this.state.desiredPools),
                    sigma: _sigma(this.state.totalStakeInCurrentPool, this.state.currentTotalSupply, _z0(this.state.desiredPools),),
                    nonmyopicSigma: _nonmyopicSigma(this.state.totalStakeInCurrentPool, this.state.currentTotalSupply, _z0(this.state.desiredPools),),
                    s: _s(this.state.totalStakeFromPoolLeaders, this.state.currentTotalSupply, _z0(this.state.desiredPools),),
                    t: _t(this.state.totalStakeFromPoolLeaders, this.state.currentTotalSupply, this.state.totalStakeInCurrentPool, _z0(this.state.desiredPools),),
                    c: _costInADA(this.state.costPerEpochInUSD, this.state.usdToADA),
                    R : _R(this.state.currentTotalSupply, this.state.inflationRate)
                  }, ()=>{
                            this.setState({
                                            myopicTotalPoolReward: calculateTotalPoolReward(this.state.R,
                                                                      this.state.s,
                                                                      this.state.sigma,
                                                                      this.state.a0,
                                                                      this.state.z0)
                                          }, ()=>{
                                                    this.setState({myopicPoolLeaderReward: calculatePoolLeaderReward(this.state.myopicTotalPoolReward,
                                                                                                               this.state.c,
                                                                                                               this.state.m,
                                                                                                               this.state.s,
                                                                                                               this.state.sigma)});
                                                    this.setState({myopicMemberReward: calculateMemberReward(this.state.myopicTotalPoolReward,
                                                                                                       this.state.c,
                                                                                                       this.state.m,
                                                                                                       this.state.t,
                                                                                                       this.state.sigma)});
                                                    this.setState({myopicDesirability: calculateDesirability(this.state.myopicTotalPoolReward,
                                                                                                             this.state.c,
                                                                                                             this.state.m,
                                                                                                             this.state.sigma)});
                                                });
                            this.setState({
                                            nonmyopicTotalPoolReward: calculateTotalPoolReward(this.state.R,
                                                                      this.state.s,
                                                                      this.state.z0,
                                                                      this.state.a0,
                                                                      this.state.z0)
                                          }, ()=>{
                                                    this.setState({nonmyopicPoolLeaderReward: calculatePoolLeaderReward(this.state.nonmyopicTotalPoolReward,
                                                                                                               this.state.c,
                                                                                                               this.state.m,
                                                                                                               this.state.s,
                                                                                                               this.state.nonmyopicSigma)});
                                                    this.setState({nonmyopicMemberReward: calculateMemberReward(this.state.nonmyopicTotalPoolReward,
                                                                                                       this.state.c,
                                                                                                       this.state.m,
                                                                                                       this.state.t,
                                                                                                       this.state.nonmyopicSigma)});
                                                    this.setState({nonmyopicDesirability: calculateDesirability(this.state.nonmyopicTotalPoolReward,
                                                                                                               this.state.c,
                                                                                                               this.state.m,
                                                                                                               this.state.z0)});
                                                  });
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
                <span className="input-group-text">ADA</span>
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
                <span className="input-group-text">ADA</span>
              </div>
              <input className="form-control" onChange={(e) => this.handleChange('totalStakeInCurrentPool', e)} defaultValue={this.state.totalStakeInCurrentPool}/>
            </div>
            <div>Total stake from pool leader</div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">ADA</span>
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
              <div className="input-group-append">
                <span className="input-group-text">{this.state.c} ADA</span>
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
                <div>Myopic total pool reward per epoch</div>
                <div>{this.state.myopicTotalPoolReward}</div>
              </li>
              <li className="list-group-item">
                <div>Pool leader reward per epoch</div>
                <div>{this.state.myopicPoolLeaderReward}</div>
              </li>
              <li className="list-group-item">
                <div>Myopic member reward per epoch</div>
                <div>{this.state.myopicMemberReward}</div>
              </li>
              <li className="list-group-item">
                <div>Myopic Desirability</div>
                <div>{this.state.myopicDesirability}</div>
              </li>
            </ul>
            <ul className="list-group dependent-variable-panel">
              <li className="list-group-item list-group-item-action active">
                <div>Non-myopic estimation (When the pool is saturated)</div>
              </li>
              <li className="list-group-item">
                <div>Non-myopic total pool reward per epoch</div>
                <div>{this.state.nonmyopicTotalPoolReward}</div>
              </li>
              <li className="list-group-item">
                <div>Non-myopic pool leader reward per epoch</div>
                <div>{this.state.nonmyopicPoolLeaderReward}</div>
              </li>
              <li className="list-group-item">
                <div>Non-myopic member reward per epoch</div>
                <div>{this.state.nonmyopicMemberReward}</div>
              </li>
              <li className="list-group-item">
                <div>Non-myopic Desirability</div>
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
