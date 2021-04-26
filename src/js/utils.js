const isToken = (dep_id, tokenName = 'nft', profiles = 'deposit_profiles', table = 'deposits', collumnName = 'am_arr', keyId_InTableArray = 'p_id', keyOfName = 'p_name') => {
  console.log(userObject)
  console.log(dep_id)
  const assetPID = userObject[table][collumnName][0][dep_id];
  const asset = userObject[profiles].find(profile => profile[keyId_InTableArray] === assetPID);
console.log(asset)
  if (!asset) return;

  return asset[keyOfName] === tokenName;
}

const isMetaMaskInstalled = () => {
  if (typeof window.ethereum != undefined) {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }
}
