/* eslint-disable camelcase */
import EtnaChart from './components/Chart';
import { initPancakeSwapDropdown } from './components/Dropdown/pancakeswap';
import { errorEmptyMsg, resetMsg } from './components/InfoMessages';
import { createInfoPopup } from './components/InfoPopup';
import { Modal } from './components/Modal';
import {
  collateralDropdownBuild,
  creditDropdownBuild,
  creditModalDataUpdate,
  initCollateralDropdown,
  initCreditDropdown,
  updUSDValueCollateral,
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
import {
  full_collateral_btn,
  getCredit,
  part_collateral_btn,
  return_credit,
  return_fee,
  set_fixed_credit,
  set_var_credit,
} from './pages/credit';
import {
  approve_deposit,
  deposit,
  withdraw_deposit,
  withdraw_reward,
} from './pages/deposit';
import { approve_stake_liq, stake_liq } from './pages/liquidity';
import { initContractAdress } from './store/contracts';
import { userObject } from './store/userObject';
import { depAmountByProfileId, isMetaMaskInstalled } from './utils';
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
  }
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

// Todo need to remove global functions
window.Web3Modal = window.Web3Modal.default;
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
window.full_collateral_btn = full_collateral_btn;
window.part_collateral_btn = part_collateral_btn;
window.set_fixed_credit = set_fixed_credit;
window.set_var_credit = set_var_credit;
window.depAmountByProfileId = depAmountByProfileId;
window.updUSDValueCollateral = updUSDValueCollateral;
window.approve_stake_liq = approve_stake_liq;
window.stake_liq = stake_liq;
window.getCredit = getCredit;
window.approve_deposit = approve_deposit;
window.deposit = deposit;
window.resetMsg = resetMsg;

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
  } else {
    walletButton.style.display = 'block';
    await initWeb3Modal();
    walletButton.addEventListener('click', toggleWeb3Connect);
  }

  createInfoPopup();
  createNotifications();
  initPancakeSwapDropdown();

  if (isMobile) {
    customElements.define('etna-chart', EtnaChart);
  }
});
