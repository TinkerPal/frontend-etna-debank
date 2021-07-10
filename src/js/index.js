import { Modal } from './components/Modal';
import {
  initLiqPairsDropdown,
  initLiqTermsDropdown,
  liqModalBuild,
} from './components/Modal/liquidity';

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

document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    setWalletPref({
      page_id: userObject.state.current_page_id,
    });
  }
});

window.addEventListener('DOMContentLoaded', async function () {
  await initContractAdrress();

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

    window.ethereum.on('accountsChanged', async function (accounts) {
      await getAccount();
    });

    window.ethereum.on('chainChanged', async (chainId) => {
      window.location.reload();
    });

    await postWalletCallback();
  } else {
    const walletButton = document.getElementById('enableEthereumButton');
    walletButton.style.display = 'block';
    await initWeb3Modal();
    walletButton.addEventListener('click', toggleWeb3Connect);
    errorEmptyMetamaskMsg();
  }

  createInfoPopup();
  createNotifications();

  if (isMobile) {
    customElements.define('etna-chart', EtnaChart);
  }
});
