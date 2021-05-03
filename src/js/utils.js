const isToken = (dep_id, tokenName = 'nft', profiles = 'deposit_profiles', table = 'deposits', collumnName = 'am_arr', keyId_InTableArray = 'p_id', keyOfName = 'p_name') => {
  const assetPID = userObject[table][collumnName][0][dep_id];
  const asset = userObject[profiles].find(profile => profile[keyId_InTableArray] === assetPID);

  if (!asset) return;

  return asset[keyOfName] === tokenName;
}

const isEmptyTable = (idContainer) => {
  console.log()
  return document.querySelector(`#${idContainer} table tbody`).innerHTML === '';
}

const safeSetTableData = (id, value, className) => {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = value;
    if (isEmptyTable(id)) {
      el.closest('.page').classList.add(className)
    } else {
      el.closest('.page').classList.remove(className)
    }
  }
}

const getDepositByTokenId = (p_id) => {
  const index = userObject.deposits.am_arr[0].findIndex((item) =>
    item === p_id
  );

  if (index === -1) return

  const deposit = userObject.deposits.am_arr[2][index];

  return isToken(index) ? deposit : toTokens(deposit, 4);
}

const isMetaMaskInstalled = () => {
  if (typeof window.ethereum != undefined) {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }
}
