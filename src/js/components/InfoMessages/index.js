/* eslint-disable camelcase */
import { TRANSACTION_LINK } from '../../constants/env';
import { safeSetInnerHTMLById } from '../../utils/dom';

export function output_transaction(txnHash) {
  infoMsg(
    `<a target="_blank" href="https://${TRANSACTION_LINK}/tx/${txnHash}">last transaction:${txnHash}</a>`
  );
}

export function successMsg(msg) {
  safeSetInnerHTMLById('info_pane_message', msg);
  document
    .getElementById('info_pane')
    .classList.remove('info_pane_error', 'info_pane_info', 'info_pane_success');
  document.getElementById('info_pane').classList.add('info_pane_success');
}

export function infoMsg(msg) {
  safeSetInnerHTMLById('info_pane_message', msg);
  document
    .getElementById('info_pane')
    .classList.remove('info_pane_error', 'info_pane_info', 'info_pane_success');
  document.getElementById('info_pane').classList.add('info_pane_info');
}

export function errorMsg(msg) {
  safeSetInnerHTMLById('info_pane_message', msg);
  document.getElementById('info_pane') &&
    document
      .getElementById('info_pane')
      .classList.remove(
        'info_pane_error',
        'info_pane_info',
        'info_pane_success'
      );
  document.getElementById('info_pane') &&
    document.getElementById('info_pane').classList.add('info_pane_error');
}

export function errorEmptyMsg(msg) {
  safeSetInnerHTMLById('empty-error__msg', msg);

  document.querySelector('.empty-access') &&
    document.querySelector('.empty-access').classList.remove('hidden');
}

export function errorEmptyMetamaskMsg(state = true) {
  if (state) {
    document.querySelector('.empty-metamask') &&
      document.querySelector('.empty-metamask').classList.remove('hidden');
  } else {
    document.querySelector('.empty-metamask') &&
      document.querySelector('.empty-metamask').classList.add('hidden');
  }
}

export function resetMsg() {
  const infoPane = document.getElementById('info_pane');
  if (infoPane) {
    infoPane.classList.remove(
      'info_pane_error',
      'info_pane_info',
      'info_pane_success'
    );
  }

  safeSetInnerHTMLById('info_pane_message', '');
}
