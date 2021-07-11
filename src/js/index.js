/* eslint-disable camelcase */
import EtnaChart from './components/Chart';
import { createInfoPopup } from './components/InfoPopup';
import { Modal } from './components/Modal';
import {
  collateralDropdownBuild,
  creditDropdownBuild,
  creditModalDataUpdate,
  initCollateralDropdown,
  initCreditDropdown,
} from './components/Modal/credit';
import {
  depositModalRebuild,
  depositModalUpdateNftDropdown,
  initDepositProfilesDropdown,
} from './components/Modal/deposit';
import {
  initLiqPairsDropdown,
  initLiqTermsDropdown,
  liqModalBuild,
  show_modal_unfreeze,
} from './components/Modal/liquidity';
import { openTab, setWalletPref } from './components/Navigation';
import { createNotifications } from './components/Notification';
import {
  getAccount,
  initWeb3jsReader,
  initWeb3Modal,
  toggleWeb3Connect,
  web3jsReadersList,
} from './components/Web3';
import {
  initCyclopsNFTContractReader,
  initDataProviderContractReader,
  initUsageCalcContractReader,
  initVotesCalcContractReader,
} from './components/Web3/contracts';
import { isMobile } from './constants/env';
import { return_credit, return_fee } from './pages/credit';
import { withdraw_deposit, withdraw_reward } from './pages/deposit';
import { initContractAdress } from './store/contracts';
import { userObject } from './store/userObject';
import { isMetaMaskInstalled } from './utils';
import { postWalletCallback } from './utils/dom';

export const walletButton = document.getElementById('enableEthereumButton');

export const modalWithdrawDeposit = new Modal('modal-withdraw-deposit');
export const modalWithdrawYield = new Modal('modal-withdraw-reward');

export const modalReturnFee = new Modal('modal-return-fee');
export const modalReturnCredit = new Modal('modal-return-credit');
export const modalAddLeverage = new Modal('modal-set-leverage');
export const modalUnfreeze = new Modal('modal-unfreeze');

export const modalAddLiquidity = new Modal(
  'modal-add-liquidity',
  () => {
    initLiqPairsDropdown();
    initLiqTermsDropdown();
  },
  liqModalBuild
);
export const modalAddDeposit = new Modal(
  'modal-new-deposit',
  initDepositProfilesDropdown,
  () => {
    depositModalRebuild();
    depositModalUpdateNftDropdown();
  },
  null,
  depositModalUpdateNftDropdown
);
export const modalAddCredit = new Modal(
  'modal-open-new-credit',
  async () => {
    await initCollateralDropdown();
    await initCreditDropdown();
  },
  async () => {
    await collateralDropdownBuild();
    await creditDropdownBuild();
    await creditModalDataUpdate();
  }
);

window.userObject = userObject;
window.openTab = openTab;
window.modal_add_deposit = modalAddDeposit;
window.modal_add_credit = modalAddCredit;
window.modal_add_lliquidity = modalAddLiquidity;
window.withdraw_deposit = withdraw_deposit;
window.withdraw_reward = withdraw_reward;
window.return_credit = return_credit;
window.return_fee = return_fee;
window.show_modal_unfreeze = show_modal_unfreeze;

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    setWalletPref({
      page_id: userObject.state.current_page_id,
    });
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  await initContractAdress();

  await initWeb3jsReader();

  await web3jsReadersList.init();

  await Promise.all([
    initDataProviderContractReader(),
    initVotesCalcContractReader(),
    initUsageCalcContractReader(),
    initCyclopsNFTContractReader(),
  ]);

  if (isMetaMaskInstalled()) {
    window.ethereum.autoRefreshOnNetworkChange = false;
    await getAccount();

    window.ethereum.on('accountsChanged', async () => {
      await getAccount();
    });

    window.ethereum.on('chainChanged', async () => {
      window.location.reload();
    });

    await postWalletCallback();
  } else {
    walletButton.style.display = 'block';
    await initWeb3Modal();
    walletButton.addEventListener('click', toggleWeb3Connect);
    web3jsReadersList();
  }

  createInfoPopup();
  createNotifications();

  if (isMobile) {
    customElements.define('etna-chart', EtnaChart);
  }
});
