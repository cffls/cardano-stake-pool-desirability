function z0(numPools) {
  return 1 / numPools;
}

function sigma(totalStakeInCurrentPool, currentTotalSupply, z0) {
  return Math.min(totalStakeInCurrentPool / currentTotalSupply, z0);
}

function nonmyopicSigma(totalStakeInCurrentPool, currentTotalSupply, z0) {
  return Math.max(totalStakeInCurrentPool / currentTotalSupply, z0);
}

function s(totalStakeFromPoolLeaders, currentTotalSupply, z0) {
  return Math.min(totalStakeFromPoolLeaders / currentTotalSupply, z0);
}

function t(totalStakeFromPoolLeaders, currentTotalSupply, totalStakeInCurrentPool, z0) {
  if(totalStakeFromPoolLeaders / currentTotalSupply > z0) {
    return 0;
  } else {
    return (totalStakeInCurrentPool - totalStakeFromPoolLeaders) / currentTotalSupply;
  }
}

function R(currentTotalSupply, inflationRate) {
  return currentTotalSupply * (Math.pow(1+inflationRate/100, 1/73)) - currentTotalSupply;
}

function totalPoolReward(R, s, sigma, a0, z0) {
  return R/(1+a0) * (sigma + s*a0*(sigma-s*(z0-sigma)/z0)/z0);
}

function poolLeaderReward(totalPoolReward, c, m, s, sigma) {
  if (totalPoolReward < c){
    return totalPoolReward;
  } else {
    return c + (totalPoolReward - c) * (m + (1 - m) * s / sigma);
  }
}

function memberReward(totalPoolReward, c, m, t, sigma) {
  if (totalPoolReward < c) {
    return 0;
  } else {
    return (totalPoolReward - c) * (1 - m) * t / sigma;
  }
}

function desirability(totalPoolReward, c, m) {
  if (totalPoolReward <= c) {
    return 0;
  } else {
    return (totalPoolReward - c) * (1 - m);
  }
}

export default {z0, sigma, nonmyopicSigma, s, t, R, totalPoolReward,
                poolLeaderReward, memberReward, desirability}
