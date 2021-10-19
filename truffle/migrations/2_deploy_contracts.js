const SMToken = artifacts.require("../contracts/SMToken.sol");
const SMTokenSale = artifacts.require("../contracts/SMTokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(SMToken, 1000000).then(function() {

    var tokenPrice = 1000000000000000;
    return deployer.deploy(SMTokenSale, SMToken.address, tokenPrice)
  });
};
