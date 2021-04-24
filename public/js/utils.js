const isNFT = (dep_id) => {
  const assetPID = userObject.deposits.am_arr[0][dep_id];
  const asset = userObject.deposit_profiles.find(profile => profile.p_id === assetPID);

  if (!asset) return;

  return asset.p_name === 'nft';
}

const isMetaMaskInstalled = () => {
  if (typeof window.ethereum != undefined) {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }
}
