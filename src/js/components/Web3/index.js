/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import { walletButton } from '../..';
import { INFURA_ENDPOINT } from '../../constants';
import {
  CHAIN_ID,
  RPC_LIST,
  WALLET_OPTION_RPC,
  WEB3_MODAL_NETWORK,
} from '../../constants/env';
import { checkAdminButton } from '../../pages/admin';
import { getCreditsDashboard } from '../../pages/credit';
import { getOurDashbord } from '../../pages/dashboard';
import { getDepositsDashboard } from '../../pages/deposit';
import { getLiquidityDashboard } from '../../pages/liquidity';
import { userObject } from '../../store/userObject';
import { isMetaMaskInstalled } from '../../utils';
import {
  postWalletCallback,
  safeSetInnerHTMLBySelector,
  safeSetValueBySelector,
  setNetInfo,
} from '../../utils/dom';
import {
  errorEmptyMetamaskMsg,
  errorEmptyMsg,
  resetMsg,
} from '../InfoMessages';
import { setLdBar } from '../Loader';
import { closeAllModals } from '../Modal/utils';
import {
  initCreditContract,
  initCreditContractReader,
  initCyclopsNFTContract,
  initLiqLevContract,
  initLiqLevContractReader,
  initStakingContract,
  initStakingContractReader,
} from './contracts';

export const web3jsReadersList = {
  rpc_list: RPC_LIST,
  web3js_list: [],
  index: 0,

  async init() {
    const await_array = [];
    for (let i = 0; i < this.rpc_list.length; i++) {
      await_array.push(
        new Web3(new Web3.providers.HttpProvider(this.rpc_list[i]))
      );
    }
    this.web3js_list = await Promise.all(await_array);
  },

  get() {
    const ret_val = this.web3js_list[this.index];
    this.index++;
    if (this.index > this.rpc_list.length - 1) this.index = 0;
    return ret_val;
  },
};

export async function initWeb3jsReader(callback = null) {
  if (!window.web3js_reader) {
    window.web3js_reader = await new Web3(
      new Web3.providers.HttpProvider(INFURA_ENDPOINT[CHAIN_ID])
    );
    window.BN = window.web3js_reader.utils.BN;
  }
  // and in any case
  if (callback) callback(window.web3js_reader);
}

export async function getAccount() {
  resetMsg();
  closeAllModals();
  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    window.web3js = await new Web3(window.ethereum);

    userObject.account = accounts[0];

    setLdBar(10);

    safeSetValueBySelector('.current-wallet', userObject.account);
    safeSetInnerHTMLBySelector(
      '.current-wallet',
      userObject.account,
      ' inline'
    );

    checkAdminButton();

    await Promise.all([
      initStakingContract(),
      initStakingContractReader(),
      initCreditContract(),
      initCreditContractReader(),
      initLiqLevContract(),
      initLiqLevContractReader(),
      initCyclopsNFTContract(),
    ]);

    setLdBar(15);
    setNetInfo();

    await userObject.load();

    setLdBar(25);

    await updateData();

    window.gp = await window.web3js.eth.getGasPrice();
    window.gp *= 2;
  } catch (error) {
    errorEmptyMsg('Cannot access wallet. Reload your page, please.');
  }
}

export async function getAccountWalletConnect() {
  resetMsg();
  closeAllModals();
  try {
    errorEmptyMetamaskMsg(false);

    window.web3js = await new Web3(window.provider);

    const accounts = await window.web3js.eth.getAccounts();

    userObject.account = accounts[0];

    setLdBar(10);

    safeSetValueBySelector('.current-wallet', userObject.account);
    safeSetInnerHTMLBySelector('.current-wallet', userObject.account, 'inline');

    // checkAdminButton();

    await Promise.all([
      initStakingContract(),
      initStakingContractReader(),
      initCreditContract(),
      initCreditContractReader(),
      initLiqLevContract(),
      initLiqLevContractReader(),
      initCyclopsNFTContract(),
    ]);

    setLdBar(15);
    setNetInfo();

    await userObject.load();

    setLdBar(25);

    await updateData();

    window.gp = await window.web3js.eth.getGasPrice();
    window.gp *= 2;

    await postWalletCallback();
  } catch (error) {
    errorEmptyMsg('Cannot access wallet. Reload your page, please.');
  }
}

export async function initWeb3Modal() {
  if (window.web3Modal) return;

  const providerOptions = {
    walletconnect: {
      package: window.WalletConnectProvider.default, // WalletConnectProvider,
      options: {
        rpc: WALLET_OPTION_RPC,
      },
    },
  };

  window.web3Modal = new Web3Modal({
    ...WEB3_MODAL_NETWORK,
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: true, // optional. For MetaMask / Brave / Opera.
  });
}

export async function onUniversalConnect() {
  try {
    window.provider = await window.Web3Modal.default.connectTo('walletconnect');
    getAccountWalletConnect();
  } catch (e) {
    return;
  }

  window.provider.on('accountsChanged', () => {
    getAccountWalletConnect();
  });

  // Subscribe to chainId change
  window.provider.on('chainChanged', () => {
    getAccountWalletConnect();
  });

  // Subscribe to networkId change
  window.provider.on('networkChanged', () => {
    getAccountWalletConnect();
  });
}

export function isWeb3Connected() {
  if (isMetaMaskInstalled()) {
    return true;
  }
  return !!window.provider;
}

export async function connectWeb3() {
  if (isMetaMaskInstalled()) {
    window.ethereum.autoRefreshOnNetworkChange = false;
    getAccount();

    window.ethereum.on('accountsChanged', () => {
      getAccount();
    });

    window.ethereum.on('chainChanged', () => {
      getAccount();
    });
  } else {
    // try to connect with something built-in, like Opera
    try {
      await initWeb3Modal();
      await window.web3js.currentProvider.enable();
      if (window.web3js.currentProvider.isConnected()) {
        window.provider = window.web3js.currentProvider;
        await getAccountWalletConnect();
        return;
      }
    } catch (error) {
      throw new Error(error);
    }

    await onUniversalConnect();
  }
}

export async function onUniversalDisconnect() {
  // TODO: Which providers have close method?
  if (window.provider.close) {
    await window.provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await window.Web3Modal.default.clearCachedProvider();
    window.provider = null;
  }

  window.account = null;
  window.location.reload();
}

export async function toggleWeb3Connect() {
  if (isMetaMaskInstalled()) {
    return; // do nothing, we just use metamask
  }

  if (!isWeb3Connected()) {
    // connect to mobile wallet

    await connectWeb3();
    if (isWeb3Connected()) {
      walletButton.classList.remove('web3-disconnected');
      walletButton.classList.add('web3-connected');
    }
  } else {
    // disconnect from mobile wallet
    await onUniversalDisconnect();
    if (!isWeb3Connected()) {
      walletButton.classList.remove('web3-connected');
      walletButton.classList.add('web3-disconnected');
    }
  }
}

export async function updateData(action = null) {
  await userObject.load();

  if (!action) {
    // only when loaded
    await getDepositsDashboard(() => {
      setLdBar(null, '25');
    });

    getLiquidityDashboard(() => {
      setLdBar(null, '25');
    });

    getCreditsDashboard(() => {
      setLdBar(null, '25');
    });

    getOurDashbord();
  } else if (action === 'make_deposit') {
    await getDepositsDashboard();
  } else if (action === 'withdraw_deposit') {
    await getDepositsDashboard();
    await getLiquidityDashboard();
  } else if (action === 'withdraw_deposit_reward') {
    await getDepositsDashboard();
    await getLiquidityDashboard();
  } else if (action === 'get_credit') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action === 'set_leverage') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action === 'unfreeze_leverage') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action === 'return_credit') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action === 'return_fee') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action === 'stake_liq') {
    await getLiquidityDashboard();
  }
}
