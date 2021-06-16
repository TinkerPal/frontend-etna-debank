const isMobile = () => {
  const width = window.innerWidth;
  if (width <= 1024) {
    document.querySelector('body').classList.add('_mobile');
  }
  return width <= 1024;
};

function checkVersion() {
  const isMob = isMobile();
  if (
    isMob &&
    window.location.pathname !== '/mobile.html' &&
    window.location.pathname !== '/mobile'
  ) {
    window.location.replace('/mobile.html');
  } else if (
    !isMob &&
    (window.location.pathname === '/mobile.html' ||
      window.location.pathname === '/mobile')
  ) {
    window.location.replace('/');
  }
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
  if (isMobile())
    return document.querySelector(`#${idContainer}`).innerHTML === '';
  return document.querySelector(`#${idContainer} table tbody`).innerHTML === '';
};

function toggleElement(elementId) {
  const element = document.querySelector(`#${elementId}`);
  element.classList.toggle('show');
}

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

const openTabHistory = {};

function openTab(event, tabid, callback, pageName) {
  callback && callback();

  safeRemoveClassBySelector('.nav-link', 'active');
  safeAddClassBySelector('.page', 'hide');

  if (!openTabHistory.cur) {
    openTabHistory.cur = {
      click: () => openTab(event, tabid, callback),
      pageName,
    };
  } else {
    openTabHistory.prev = { ...openTabHistory.cur };
    openTabHistory.cur = {
      click: () => openTab(event, tabid, callback),
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

  if (isMobile()) {
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
    if (openTabHistory?.prev?.pageName) {
      const tab = document.querySelector('[data-tab="with-page-name"]');
      tab.classList.remove('hidden');
      tab.innerHTML = openTabHistory.prev.pageName;
      tab.onclick = openTabHistory.prev.click;
    }
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
    if (value !== '') {
      el.innerHTML = value;
    }
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
