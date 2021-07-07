import { ERC721_TOKEN, NATIVE_ETHEREUM, UNISWAP_PAIR } from '../constants';

function toNormalUSDView(data) {
  return numeral(data).format('$ 0,0.00');
}

function formatDataForMobile(data) {
  if (!data) return;
  return data.replace(/<td class="table-cell">(.*)<\/td>/, '$1');
}

function throttle(func, delay) {
  let timeout = null;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.call(this, ...args);
        timeout = null;
      }, delay);
    }
  };
}

function isEmptyTable(idContainer) {
  if (isMobile) {
    return document.querySelector(`#${idContainer}`).innerHTML === '';
  }

  return document.querySelector(`#${idContainer} table tbody`).innerHTML === '';
}

function toggleElement(elementId, event) {
  const target = event.target;
  const element = document.querySelector(`#${elementId}`);
  element.classList.toggle('show');
  target.classList.toggle('show');
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
export function htmlToElement(html) {
  const template = document.createElement('template');
  const draftHtml = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = draftHtml;
  return template.content.firstChild;
}

function setLdBar(value, part = 0) {
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
}

export const routeHistory = {};

function openTab(event, tabid, callback, pageName) {
  if (callback) {
    const callbackState = callback();

    if (!callbackState) return;
  }

  safeRemoveClassBySelector('.nav-link', 'active');
  safeAddClassBySelector('.page', 'hide');

  if (!routeHistory.cur) {
    routeHistory.cur = {
      click: () => openTab(event, tabid, callback, pageName),
      pageName,
    };
  } else {
    routeHistory.prev = { ...routeHistory.cur };
    routeHistory.cur = {
      click: () => openTab(event, tabid, callback, pageName),
      pageName,
    };
  }

  if (event.srcElement) {
    event.srcElement.classList.add('active');
    const activeButton = document.getElementById(`${tabid}-menu`);
    activeButton?.classList.add('active');

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

  if (isMobile) {
    const tabs = document.querySelector('#control-tabs');
    const tabsElements = document.querySelectorAll(`[data-tab]`);
    const breadcrumbs = document.querySelector('.header-breadcrumbs');
    const logo = document.querySelector('#header-logo');

    if (
      tabid !== 'dashboard-tab' &&
      tabid !== 'borrow-tab' &&
      tabid !== 'liq-earn-tab'
    ) {
      tabs.classList.add('hidden');
      breadcrumbs.classList.remove('hidden');
      logo.classList.add('hidden');
    } else {
      tabs.classList.remove('hidden');
      breadcrumbs.classList.add('hidden');
      logo.classList.remove('hidden');
    }

    tabsElements.forEach((item) => {
      if (item.dataset.tab === tabid) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });

    // Todo: переписать все табы на единый формат истории
    if (routeHistory?.prev?.pageName) {
      const tab = document.querySelector('[data-tab="with-page-name"]');
      tab.classList.remove('hidden');
      tab.innerHTML = routeHistory.prev.pageName;
      tab.onclick = routeHistory.prev.click;
    }
  }
}

function setOptionsToSelect(data, select) {
  data.forEach((asset) => {
    const option = document.createElement('option');
    option.value = asset.text;
    option.innerHTML = asset.text;
    select.appendChild(option);
  });
}

function setState(state) {
  userObject.state = {
    ...userObject.state,
    ...state,
  };
}

function safeSetTableData(id, value, className) {
  const el = document.getElementById(id);
  if (el) {
    if (value !== '') {
      el.innerHTML = value;
    }
    if (!isMobile) {
      const tableWithScroll = new SimpleBar(el);
    }
    if (isEmptyTable(id)) {
      el.closest('.page').classList.add(className);
    } else {
      el.closest('.page').classList.remove(className);
    }
  }
}

function getDepositByTokenId(p_id) {
  if ((userObject.deposits.am_arr?.length ?? 0) === 0) return;

  const index = userObject.deposits.am_arr[0].findIndex(
    (item) => toNumber(item) === toNumber(p_id)
  );

  if (index === -1) return;

  const deposit = userObject.deposits.am_arr[1][index];

  return isTokenNft(p_id) ? deposit : toTokens(deposit, 4);
}

function isMetaMaskInstalled() {
  if (typeof window.ethereum !== 'undefined') {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }
}

function depAmountByProfileId(profile_id) {
  if (toNumber(profile_id) !== -1) {
    for (let i = 0; i < userObject?.deposits?.am_arr[0]?.length ?? 0; i++) {
      if (toNumber(userObject.deposits.am_arr[0][i]) === toNumber(profile_id)) {
        let am = userObject.deposits.am_arr[1][i];
        if (toNumber(depTypeByDepositTokenId(profile_id)) !== ERC721_TOKEN) {
          am = window.web3js_reader.utils.fromWei(am, 'ether');
        }
        return [i, am];
      }
    }
  }
  return [BAD_DEPOSIT_ID, 0];
}

export function toNumber(number) {
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

export function toTokens(wei_am, digs) {
  if (wei_am === 0) return 0;

  const n_tokens = floorDecimals(
    window.web3js_reader.utils.fromWei(wei_am, 'ether'),
    digs
  );
  return parseFloat(n_tokens).toFixed(digs).toString();
}

function floorDecimals(value, decimals) {
  return Number(`${Math.floor(`${value}e${decimals}`)}e-${decimals}`);
}

async function getAllProfiles() {
  let profiles;
  await getBackendParameter('DEPPROFILES_UI_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

async function getAllProfilesWithUniswap() {
  let profiles;
  await getBackendParameter('ASSETS_UI_FULL_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

async function getAllProfilesUniswap() {
  let profiles;
  await getBackendParameter('ASSETS_UI_LIQ_PAIRS', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

async function getAllCreditProfiles() {
  let profiles;
  await getBackendParameter('CREDIT_PROFILES_UI_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

export function depTypeByDepositTokenId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles[i].p_id) === toNumber(profile_id)
    ) {
      return toNumber(userObject.deposit_profiles[i].p_dep_type);
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

export function isTokenNft(tokenId) {
  return toNumber(depTypeByDepositTokenId(tokenId)) === ERC721_TOKEN;
}

export function isTokenLiqPairs(tokenId) {
  return toNumber(depTypeByLiqpairsTokenId(tokenId)) === UNISWAP_PAIR;
}

export function isTokenBnb(tokenId) {
  return toNumber(depTypeByDepositTokenId(tokenId)) === NATIVE_ETHEREUM;
}

export function tokenNameByCreditCredId(credId) {
  const assetPID = userObject.credits.cred_arr[0][credId];
  const asset = userObject.credit_profiles.find(
    (profile) => toNumber(profile.id) === toNumber(assetPID)
  );

  if (!asset) return;

  return asset.name;
}

export function tokenAddressByDepositTokenId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles[i].p_id) === toNumber(profile_id)
    ) {
      return userObject.deposit_profiles[i].p_tok_addr;
    }
  }
  return ZERO_ADDRESS;
}

export function tokenNameByDepositTokenId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles[i].p_id) === toNumber(profile_id)
    ) {
      return userObject.deposit_profiles[i].p_name;
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

export function tokenIdByTokenName(tokenName) {
  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    if (
      userObject.deposit_profiles[i].p_name.toLowerCase() ===
      tokenName.toLowerCase()
    ) {
      return userObject.deposit_profiles[i].p_id;
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

export function APYStrByLiqpairsTokenName(profile_name) {
  for (let i = 0; i < userObject.deposit_profiles_liqpairs?.length ?? 0; i++) {
    if (userObject.deposit_profiles_liqpairs[i].p_name === profile_name) {
      const apy = toNumber(userObject.deposit_profiles_liqpairs[i].init_apy);
      const apy_real = apy / APY_SCALE;
      const apy_str = `${(apy_real * 100).toFixed(1).toString()}%`;
      return apy_str;
    }
  }
  return null;
}

export function tokenIdByLiqpairsTokenName(profile_name) {
  for (let i = 0; i < userObject.deposit_profiles_liqpairs?.length ?? 0; i++) {
    if (userObject.deposit_profiles_liqpairs[i].p_name === profile_name) {
      return toNumber(userObject.deposit_profiles_liqpairs[i].p_id);
    }
  }
  return null;
}

export function tokenNameByLiqpairsTokenId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles_liqpairs?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles_liqpairs[i].p_id) ===
      toNumber(profile_id)
    ) {
      return userObject.deposit_profiles_liqpairs[i].p_name;
    }
  }
  return null;
}

async function depTypeByLiqpairsTokenId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles_liqpairs?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles_liqpairs[i].p_id) ===
      toNumber(profile_id)
    ) {
      return toNumber(userObject.deposit_profiles_liqpairs[i].p_dep_type);
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

export async function getPriceOfTokens(
  tokenAmount,
  tokenId,
  isSafeAmount = false
) {
  const contract = window.data_provider_smartcontract_reader;
  const tokenName = tokenNameByDepositTokenId(tokenId);

  const token =
    (isTokenBnb(tokenId) && 'BNBUSD') ||
    (isTokenNft(tokenId) && LEVERAGE_TOKEN) ||
    tokenName;

  const { BN } = window;
  const wei_amount = isSafeAmount
    ? new BN(tokenAmount)
    : safeFloatToWei(tokenAmount); // BN

  const [data, dec] = await Promise.all([
    contract.methods.getData(token).call({
      from: userObject.account,
    }),
    contract.methods.getDecimals(token).call({
      from: userObject.account,
    }),
  ]);

  const usd_bn = new BN(wei_amount.mul(new BN(data)));

  const base = new BN(10);
  const div_dec = new BN(base.pow(new BN(dec)));
  const usd_adj = new BN(usd_bn.div(div_dec));

  return parseFloat(window.web3js_reader.utils.fromWei(usd_adj, 'ether'));
}

export async function getAPY(profile_id) {
  if (!userObject.deposit_profiles) {
    userObject.deposit_profiles = await getAllProfiles();
  }

  if (!window.dep_apys) {
    window.dep_apys = [];
    for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
      window.dep_apys[toNumber(userObject.deposit_profiles[i].p_id)] = null;
    }
  }

  if (window.dep_apys[profile_id]) {
    return window.dep_apys[profile_id];
  }
  const apy = await window.usage_calc_smartcontract_reader.methods
    .calcDepApy(profile_id)
    .call({
      from: userObject.account,
    });
  window.dep_apys[profile_id] = apy;
  return window.dep_apys[profile_id];
}
