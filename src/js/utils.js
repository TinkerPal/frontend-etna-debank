const isToken = (
  dep_id,
  tokenName = 'nft',
  profiles = 'deposit_profiles',
  table = 'deposits',
  collumnName = 'am_arr',
  keyId_InTableArray = 'p_id',
  keyOfName = 'p_name'
) => {
  const assetPID = userObject[table][collumnName][0][dep_id];
  const asset = userObject[profiles].find(
    (profile) => toNumber(profile[keyId_InTableArray]) === toNumber(assetPID)
  );

  if (!asset) return;

  return asset[keyOfName] === tokenName;
};

const isEmptyTable = (idContainer) => {
  return document.querySelector(`#${idContainer} table tbody`).innerHTML === '';
};

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

const setLdBar = (value, part = 'null') => {
  const { ldBar } = document.getElementById('debank_load_bar');
  const ldBarWrapper = document.getElementById('load_bar_cover');
  const body = document.querySelector('body');

  if (!value) {
    value = Number(ldBar.value) + Number(part);
  }

  if (Number(value) > 100) value = 100;

  ldBar.set(value);

  if (ldBar.value === 100) {
    setTimeout(() => {
      ldBarWrapper.style.display = 'none';
      body.classList.remove('page-loading');
    }, 1000);
  } else {
    ldBarWrapper.style.display = 'block';
    body.classList.add('page-loading');
  }
};

function openTab(event, tabid) {
  safeRemoveClassBySelector('.nav-link', 'active');
  safeAddClassBySelector('.page', 'hide');

  if (event.srcElement) {
    event.srcElement.classList.add('active');
    document.getElementById(tabid).classList.remove('hide');
    userObject.state.current_page_id = tabid;
  } else {
    openTab(
      {
        srcElement: document.getElementById('total-dashboard-tab-menu'),
      },
      'total-dashboard-tab'
    );
  }
}

const setOptionsToSelect = (data, select) => {
  data.forEach((asset) => {
    const option = document.createElement('option');
    option.value = asset.text;
    option.innerHTML = asset.text;
    select.appendChild(option);
  });
};

const setState = (state) => {
  userObject.state = {
    ...userObject.state,
    ...state,
  };
};

const safeSetTableData = (id, value, className) => {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = value;
    const tableWithScroll = new SimpleBar(el);
    if (isEmptyTable(id)) {
      el.closest('.page').classList.add(className);
    } else {
      el.closest('.page').classList.remove(className);
    }
  }
};

const getDepositByTokenId = (p_id) => {
  if ((userObject.deposits.am_arr?.length ?? 0) === 0) return;

  const index = userObject.deposits.am_arr[0].findIndex(
    (item) => toNumber(item) === toNumber(p_id)
  );

  if (index === -1) return;

  const deposit = userObject.deposits.am_arr[1][index];

  return isToken(index) ? deposit : toTokens(deposit, 4);
};

const isMetaMaskInstalled = () => {
  if (typeof window.ethereum !== 'undefined') {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }
};

function depAmountByProfileId(profile_id) {
  if (toNumber(profile_id) !== -1) {
    for (let i = 0; i < userObject?.deposits?.am_arr[0]?.length ?? 0; i++) {
      if (toNumber(userObject.deposits.am_arr[0][i]) === toNumber(profile_id)) {
        let am = userObject.deposits.am_arr[1][i];
        if (toNumber(depTypeByProfileId(profile_id)) !== ERC721_TOKEN) {
          am = window.web3js_reader.utils.fromWei(am, 'ether');
        }
        return [i, am];
      }
    }
  }
  return [BAD_DEPOSIT_ID, 0];
}

function toNumber(number) {
  return parseInt(number, 10);
}

function depAmountByProfileIdReal(profile_id) {
  for (let i = 0; i < userObject?.deposits?.am_arr[0]?.length ?? 0; i++) {
    if (toNumber(userObject.deposits.am_arr[0][i]) === toNumber(profile_id)) {
      const am = userObject.deposits.am_arr[1][i];

      return [i, am];
    }
  }
  return [BAD_DEPOSIT_ID, 0];
}

function toTokens(wei_am, digs) {
  const n_tokens = floorDecimals(
    window.web3js_reader.utils.fromWei(wei_am, 'ether'),
    digs
  );
  return parseFloat(n_tokens).toFixed(digs).toString();
}

function floorDecimals(value, decimals) {
  return Number(`${Math.floor(`${value}e${decimals}`)}e-${decimals}`);
}
