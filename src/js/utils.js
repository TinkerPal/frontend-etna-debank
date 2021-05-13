const isToken = (dep_id, tokenName = 'nft', profiles = 'deposit_profiles', table = 'deposits', collumnName = 'am_arr', keyId_InTableArray = 'p_id', keyOfName = 'p_name') => {
  const assetPID = userObject[table][collumnName][0][dep_id];
  const asset = userObject[profiles].find(profile => profile[keyId_InTableArray] === assetPID);

  if (!asset) return;

  return asset[keyOfName] === tokenName;
}

const isEmptyTable = (idContainer) => {
  return document.querySelector(`#${idContainer} table tbody`).innerHTML === '';
}

const setLdBar = (value, part = 'null') => {
  const ldBar = document.getElementById('debank_load_bar').ldBar;
  const ldBarWrapper = document.getElementById('load_bar_cover');

  if (!value) {
    value = Number(ldBar.value) + Number(part);
  }

  if (Number(value) > 100) value = 100;

  ldBar.set(value);

  if (ldBar.value === 100) {
    setTimeout(() => {
      ldBarWrapper.style.display = 'none';
    }, 1000);
  } else {
    ldBarWrapper.style.display = 'block';
  }
}

const safeSetTableData = (id, value, className) => {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = value;
    new SimpleBar(el);
    if (isEmptyTable(id)) {
      el.closest('.page').classList.add(className)
    } else {
      el.closest('.page').classList.remove(className)
    }
  }
}

const getDepositByTokenId = (p_id) => {

  if(userObject.deposits.am_arr.length === 0) return;

  const index = userObject.deposits.am_arr[0].findIndex((item) =>
    item === p_id
  );

  if(index === -1) return;

  const deposit = userObject.deposits.am_arr[2][index];

  return isToken(index) ? deposit : toTokens(deposit, 4);
}

const isMetaMaskInstalled = () => {
  if (typeof window.ethereum != undefined) {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }
}
