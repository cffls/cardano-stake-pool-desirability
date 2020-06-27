const totalSupply = 45000000000;

function z0(numPools) {
  return 1 / numPools;
}

function sigma(totalStakeInCurrentPool, currentTotalSupply) {
  return totalStakeInCurrentPool / currentTotalSupply;
}

function nonmyopicSigma(s, sigma, r, z0, k) {
  if (r <= k) {
    return Math.max(sigma, z0);
  } else {
    return s;
  }
}

function s(totalStakeFromPoolLeaders, currentTotalSupply) {
  return totalStakeFromPoolLeaders / currentTotalSupply;
}

function t(
  totalStakeInCurrentPool,
  totalStakeFromPoolLeaders,
  currentTotalSupply
) {
  return (
    (totalStakeInCurrentPool - totalStakeFromPoolLeaders) / currentTotalSupply
  );
}

function R(currentTotalSupply, rho) {
  return (
    (totalSupply - currentTotalSupply) * rho / 100
  );
}

function totalPoolReward(R, s, sigma, a0, z0) {
  var sP = Math.min(s, z0);
  var sigmaP = Math.min(sigma, z0);
  return (
    (R / (1 + a0)) *
    (sigmaP + (sP * a0 * (sigmaP - (sP * (z0 - sigmaP)) / z0)) / z0)
  );
}

function poolLeaderReward(totalPoolReward, c, m, s, sigma) {
  if (totalPoolReward < c) {
    return totalPoolReward;
  } else {
    return c + (totalPoolReward - c) * (m + ((1 - m) * s) / sigma);
  }
}

function memberReward(totalPoolReward, c, m, t, sigma) {
  if (totalPoolReward < c) {
    return 0;
  } else {
    return ((totalPoolReward - c) * (1 - m) * t) / sigma;
  }
}

function desirability(totalPoolReward, c, m) {
  if (totalPoolReward <= c) {
    return 0;
  } else {
    return (totalPoolReward - c) * (1 - m);
  }
}

export default {
  z0,
  sigma,
  nonmyopicSigma,
  s,
  t,
  R,
  totalPoolReward,
  poolLeaderReward,
  memberReward,
  desirability
};
