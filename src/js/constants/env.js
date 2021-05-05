const GLOBAL_VARIABLES = {
  production: {
    WALLETS_API_URL: 'https://prod-debank-wallet-api.etna.network',
    cyclops_nft_contract_address: '0x83C454FF387cebbC3CbAa5a7a44F412F4FA63c0E',
    chainId: '0x38',
    WALLET_OPTION_RPC: {
      '56': 'https://bsc-dataseed.binance.org/',
    },
    RPC_LIST: [
      'https://bsc-dataseed.binance.org/',
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
    ],
  },
  development: {
    WALLETS_API_URL: 'https://bsc-debank-wallet-api.etna.network',
    cyclops_nft_contract_address: '0x6ab7E5B00a6e4A7E56160FAc1BCcAcEad1614554',
    chainId: '0x61',
    WALLET_OPTION_RPC: {
      '97': 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
    RPC_LIST: [
      'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'https://data-seed-prebsc-2-s1.binance.org:8545/',
      'https://data-seed-prebsc-1-s2.binance.org:8545/',
      'https://data-seed-prebsc-2-s2.binance.org:8545/',
      'https://data-seed-prebsc-1-s3.binance.org:8545/',
      'https://data-seed-prebsc-2-s3.binance.org:8545/',
    ],
  },
};

const env = process.env.NODE_ENV;

const WALLETS_API_URL = GLOBAL_VARIABLES[env].WALLETS_API_URL;
const WALLET_OPTION_RPC = GLOBAL_VARIABLES[env].WALLET_OPTION_RPC;
const RPC_LIST = GLOBAL_VARIABLES[env].RPC_LIST;

window.cyclops_nft_contract_address =
  GLOBAL_VARIABLES[env].cyclops_nft_contract_address;
window.chainId = GLOBAL_VARIABLES[env].chainId;
