import { WALLET_OPTION_RPC } from './env';

export const APY_SCALE = 100000;

export const CHAINS = {
  '0x1': 'mainnet',
  1: 'mainnet',
  '0x3': 'ropsten',
  '0x4': 'rinkeby',
  '0x5': 'goerli',
  '0x2a': 'kovan',
  '0x61': 'bsctestnet',
  '0x38': 'bsc',
};

export const INFURA_ENDPOINT = {
  '0x1': 'https://mainnet.infura.io/v3/e399e7df7f9149d08b2e91939e056007',
  1: 'https://mainnet.infura.io/v3/e399e7df7f9149d08b2e91939e056007',
  '0x2a': 'https://kovan.infura.io/v3/e399e7df7f9149d08b2e91939e056007',
  '0x61': 'https://data-seed-prebsc-1-s1.binance.org:8545',
  '0x38': 'https://bsc-dataseed.binance.org/',
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ADJ_CONSTANT = 1000000000000000000; // 10^18

export const ERC20_TOKEN = 1; // normal token
export const ERC721_TOKEN = 2; // NFT
export const UNISWAP_PAIR = 3; // Liquidity pair tokens
export const NATIVE_ETHEREUM = 4; // bnb
export const BAD_TOKEN = 99;

export const BAD_DEPOSIT_PROFILE_ID = 9999999;
export const BAD_DEPOSIT_ID = 9999999;
export const NONE_FAMER_ID = 9999999;

const WalletConnectProvider = window.WalletConnectProvider.default;

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: WALLET_OPTION_RPC,
    },
  },
};
