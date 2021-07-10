/* eslint-disable no-param-reassign */
import { modalAddCredit, modalAddDeposit, modalAddLiquidity } from '..';
import { getWalletPref, openTab } from '../components/Navigation';
import { CHAINS } from '../constants';
import { CHAIN_ID, isMobile } from '../constants/env';
import { userObject } from '../store';

export function safeSetValueById(id, value, disp = 'block') {
  const el = document.getElementById(id);
  if (el) {
    el.value = value;
    if (value === '') el.style.display = 'none';
    else el.style.display = disp;
  }
}

export function safeHtmlById(id, html = '-') {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = html;
  }
}

export function isEmptyTable(idContainer) {
  if (isMobile) {
    return document.querySelector(`#${idContainer}`).innerHTML === '';
  }

  return document.querySelector(`#${idContainer} table tbody`).innerHTML === '';
}

export function toggleElement(elementId, event) {
  const { target } = event;
  const element = document.querySelector(`#${elementId}`);
  element.classList.toggle('show');
  target.classList.toggle('show');
}

export function safeSetInnerHTMLById(
  id,
  value,
  disp = 'block',
  className = null
) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = value;
    if (value === '') {
      if (!className) {
        el.style.display = 'none';
      } else {
        el.classList.add(className);
      }
    } else if (!className) {
      el.style.display = disp;
    } else {
      el.classList.remove(className);
    }
  }
}

export function safeSetValueBySelector(selector, value) {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach((item) => {
      item.value = value;
    });
  }
}

export function safeHideBySelector(selector) {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach((item) => {
      item.style.display = 'none';
    });
  }
}

export function safeShowBySelector(selector, disp = 'block') {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach((item) => {
      item.style.display = disp;
    });
  }
}

export function safeSetInnerHTMLBySelector(selector, value, disp = 'block') {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach((el) => {
      el.innerHTML = value;
      el.style.display = value === '' ? 'none' : disp;
    });
  }
}

export function safeAddClassBySelector(selector, aclass) {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach((item) => {
      item.classList.add(aclass);
    });
  }
}

export function safeRemoveClassBySelector(selector, aclass) {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach((item) => {
      item.classList.remove(aclass);
    });
  }
}

export function setOptionsToSelect(data, select) {
  data.forEach((asset) => {
    const option = document.createElement('option');
    option.value = asset.text;
    option.innerHTML = asset.text;
    select.appendChild(option);
  });
}

export async function setNetInfo() {
  const chanId = await window.web3js.eth.getChainId();
  const chainIdHex = chanId && `0x${chanId.toString(16)}`;

  const netName = document.getElementById('net_name');
  const netInfo = document.getElementById('net_info');
  const netIcon = document.getElementById('net_icon');
  const netTxt = document.getElementById('net_txt');
  if (netName && netInfo && netIcon && netTxt) {
    if (chainIdHex === undefined) {
      netName.innerHTML = 'unknown net';
      netInfo.style.display = 'flex';
      netIcon.style.color = 'red';
      netTxt.innerHTML = ' wrong network, connect to BSC';
    } else if (chainIdHex !== CHAIN_ID) {
      netName.innerHTML = CHAINS[CHAIN_ID];
      netInfo.style.display = 'flex';
      netIcon.style.color = 'red';
      netTxt.innerHTML = ' wrong network, connect to BSC';
    } else {
      netIcon.style.color = '#48A68E';
      netInfo.style.display = 'flex';
      netName.innerHTML = ' BSC';
    }
  }
}

export async function postWalletCallback() {
  await getWalletPref();
  const element =
    document.getElementById(`${userObject.state.current_page_id}-menu`) ||
    document.getElementById(`dashboard-tab-menu`);

  openTab(
    {
      srcElement: element,
    },
    document.getElementById(`${userObject.state.current_page_id}-menu`)
      ? userObject.state.current_page_id
      : 'dashboard-tab'
  );

  modalAddCredit.modal && modalAddCredit.onInitCallback();
  modalAddLiquidity.modal && modalAddLiquidity.onInitCallback();
  modalAddDeposit.modal && modalAddDeposit.onInitCallback();
}
