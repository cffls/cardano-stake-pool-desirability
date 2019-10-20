(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(3),o=a.n(r),i=(a(15),a(4)),s=a(5),c=a(7),m=a(6),u=a(1),p=a(8);a(16);var d={z0:function(e){return 1/e},sigma:function(e,t){return e/t},nonmyopicSigma:function(e,t,a,n,l){return a<=l?Math.max(t,n):e},s:function(e,t){return e/t},t:function(e,t,a){return(e-t)/a},R:function(e,t){return e*Math.pow(1+t/100,1/73)-e},totalPoolReward:function(e,t,a,n,l){var r=Math.min(t,l),o=Math.min(a,l);return e/(1+n)*(o+r*n*(o-r*(l-o)/l)/l)},poolLeaderReward:function(e,t,a,n,l){return e<t?e:t+(e-t)*(a+(1-a)*n/l)},memberReward:function(e,t,a,n,l){return e<t?0:(e-t)*(1-a)*n/l},desirability:function(e,t,a){return e<=t?0:(e-t)*(1-a)}};function h(e){return Math.round(1e6*e)/1e6}var E=function(e){function t(e){var a;Object(s.a)(this,t);return(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={currentTotalSupply:31e9,targetNumPools:1e3,totalStakeInCurrentPool:31e6,totalStakeFromPoolLeaders:1e6,yourTotalStake:1e5,a0:.02,r:20,usdToADA:.05,costPerEpochInUSD:5,m:5,inflationRate:6},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"updateAll",value:function(){var e,t,a=d.z0(this.state.targetNumPools),n=d.sigma(this.state.totalStakeInCurrentPool,this.state.currentTotalSupply),l=d.s(this.state.totalStakeFromPoolLeaders,this.state.currentTotalSupply),r=d.nonmyopicSigma(l,n,this.state.r,a,this.state.targetNumPools),o=d.t(this.state.totalStakeInCurrentPool,this.state.totalStakeFromPoolLeaders,this.state.currentTotalSupply),i=(e=this.state.costPerEpochInUSD,t=this.state.usdToADA,h(e/t)),s=d.R(this.state.currentTotalSupply,this.state.inflationRate),c=h(d.totalPoolReward(s,l,n,this.state.a0,a)),m=h(d.poolLeaderReward(c,i,this.state.m/100,l,n)),u=h(d.memberReward(c,i,this.state.m/100,o,n)),p=h(u*this.state.yourTotalStake/(this.state.totalStakeInCurrentPool-this.state.totalStakeFromPoolLeaders)),E=h(d.desirability(c,i,this.state.m/100,n)),g=h(d.totalPoolReward(s,l,r,this.state.a0,a)),v=h(d.poolLeaderReward(g,i,this.state.m/100,l,r)),f=h(d.memberReward(g,i,this.state.m/100,o,r)),N=h(f*this.state.yourTotalStake/(this.state.totalStakeInCurrentPool-this.state.totalStakeFromPoolLeaders)),y=h(d.desirability(g,i,this.state.m/100,a));this.setState({z0:a,sigma:n,nonmyopicSigma:r,s:l,t:o,c:i,R:s,myopicTotalPoolReward:c,myopicPoolLeaderReward:m,myopicMemberReward:u,myopicIndividualReward:p,myopicDesirability:E,nonmyopicTotalPoolReward:g,nonmyopicPoolLeaderReward:v,nonmyopicMemberReward:f,nonmyopicIndividualReward:N,nonmyopicDesirability:y})}}]),Object(u.a)(t,[{key:"handleChange",value:function(e,t){var a=this;this.setState(Object(i.a)({},e,parseFloat(t.target.value)),function(){a.updateAll()})}},{key:"componentDidMount",value:function(){this.updateAll()}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row title"},l.a.createElement("div",{className:"alert alert-primary col-sm-9 offset-sm-2",role:"alert"},l.a.createElement("h4",{className:"alert-heading"},"Cardano Stake Pool Desirability Estimation"))),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-sm-3 offset-sm-2 card"},l.a.createElement("div",null,"Total ADA Supply"),l.a.createElement("div",{className:"input-group mb-3"},l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"\u20b3")),l.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleChange("currentTotalSupply",t)},defaultValue:this.state.currentTotalSupply})),l.a.createElement("div",null,"Inflation rate per year"),l.a.createElement("div",{className:"input-group mb-3"},l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"%")),l.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleChange("inflationRate",t)},defaultValue:this.state.inflationRate})),l.a.createElement("div",null,"Pool leader influence factor"),l.a.createElement("div",{className:"input-group mb-3"},l.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleChange("a0",t)},defaultValue:this.state.a0})),l.a.createElement("div",null,"Number of desired pools"),l.a.createElement("div",{className:"input-group mb-3"},l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"#")),l.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleChange("targetNumPools",t)},defaultValue:this.state.targetNumPools})),l.a.createElement("div",null,"Current rank of the pool"),l.a.createElement("div",{className:"input-group mb-3"},l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"#")),l.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleChange("r",t)},defaultValue:this.state.r})),l.a.createElement("div",null,"Total stake in current pool"),l.a.createElement("div",{className:"input-group mb-3"},l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"\u20b3")),l.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleChange("totalStakeInCurrentPool",t)},defaultValue:this.state.totalStakeInCurrentPool})),l.a.createElement("div",null,"Total stake from pool leader"),l.a.createElement("div",{className:"input-group mb-3"},l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"\u20b3")),l.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleChange("totalStakeFromPoolLeaders",t)},defaultValue:this.state.totalStakeFromPoolLeaders})),l.a.createElement("div",null,"Your total stake"),l.a.createElement("div",{className:"input-group mb-3"},l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"\u20b3")),l.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleChange("yourTotalStake",t)},defaultValue:this.state.yourTotalStake})),l.a.createElement("div",null,"Exchange rate"),l.a.createElement("div",{className:"input-group mb-3"},l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"USD/ADA")),l.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleChange("usdToADA",t)},defaultValue:this.state.usdToADA})),l.a.createElement("div",null,"Cost per epoch"),l.a.createElement("div",{className:"input-group mb-3"},l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"$")),l.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleChange("costPerEpochInUSD",t)},defaultValue:this.state.costPerEpochInUSD}),l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"\u20b3 ",this.state.c))),l.a.createElement("div",null,"Pool fee"),l.a.createElement("div",{className:"input-group mb-3"},l.a.createElement("div",{className:"input-group-prepend"},l.a.createElement("span",{className:"input-group-text"},"%")),l.a.createElement("input",{className:"form-control",onChange:function(t){return e.handleChange("m",t)},defaultValue:this.state.m}))),l.a.createElement("div",{className:"col-sm-5 offset-sm-1"},l.a.createElement("ul",{className:"list-group dependent-variable-panel"},l.a.createElement("li",{className:"list-group-item list-group-item-action active"},l.a.createElement("div",null,"Myopic estimation")),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",null,"Total pool reward per epoch"),l.a.createElement("div",null,this.state.myopicTotalPoolReward)),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",null,"Pool leader reward per epoch"),l.a.createElement("div",null,this.state.myopicPoolLeaderReward)),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",null,"Total stake member reward per epoch"),l.a.createElement("div",null,this.state.myopicMemberReward)),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",null,"Your reward per epoch"),l.a.createElement("div",null,this.state.myopicIndividualReward)),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",null,"Desirability"),l.a.createElement("div",null,this.state.myopicDesirability))),l.a.createElement("ul",{className:"list-group dependent-variable-panel"},l.a.createElement("li",{className:"list-group-item list-group-item-action active"},l.a.createElement("div",null,"Non-myopic estimation")),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",null,"Total pool reward per epoch when pool is saturated"),l.a.createElement("div",null,this.state.nonmyopicTotalPoolReward)),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",null,"Pool leader reward per epoch"),l.a.createElement("div",null,this.state.nonmyopicPoolLeaderReward)),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",null,"Total stake member reward per epoch"),l.a.createElement("div",null,this.state.nonmyopicMemberReward)),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",null,"Your reward per epoch"),l.a.createElement("div",null,this.state.nonmyopicIndividualReward)),l.a.createElement("li",{className:"list-group-item"},l.a.createElement("div",null,"Desirability"),l.a.createElement("div",null,this.state.nonmyopicDesirability))),l.a.createElement("a",{id:"githublink",href:"https://github.com/cffls/cardano-stake-pool-desirability"},l.a.createElement("span",null,"Github "),l.a.createElement("em",{className:"fa fa-github"})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){e.exports=a(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.fe7cda49.chunk.js.map