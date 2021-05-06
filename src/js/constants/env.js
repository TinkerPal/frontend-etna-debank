const GLOBAL_VARIABLES = {
  production: {
    WALLETS_API_URL: 'https://prod-debank-wallet-api.etna.network',
    cyclops_nft_contract_address: '0x83C454FF387cebbC3CbAa5a7a44F412F4FA63c0E',
    chainId: '0x38',
    WALLET_OPTION_RPC: {
      '56': 'https://bsc-dataseed.binance.org/',
    },
    WEB3_MODAL_NETWORK: { network: "binance" },
    RPC_LIST: [
      'https://bsc-dataseed.binance.org/',
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
    ],
    LIQ_PAIRS: [
      {
        text: 'ETNA-BNB',
        addr: '0xa2facc7286e621c63a81a817dba57a3c4dcc5ff2',
      },
      {
        text: 'ETNA-BUSD',
        addr: '0xa1a1dc3a23882e33f41943ec620a2f68a6703fcc',
      },
    ],
  },
  development: {
    WALLETS_API_URL: 'https://bsc-debank-wallet-api.etna.network',
    cyclops_nft_contract_address: '0x6ab7E5B00a6e4A7E56160FAc1BCcAcEad1614554',
    chainId: '0x61',
    WALLET_OPTION_RPC: {
      '97': 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
    WEB3_MODAL_NETWORK: { network: "" },
    RPC_LIST: [
      'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'https://data-seed-prebsc-2-s1.binance.org:8545/',
      'https://data-seed-prebsc-1-s2.binance.org:8545/',
      'https://data-seed-prebsc-2-s2.binance.org:8545/',
      'https://data-seed-prebsc-1-s3.binance.org:8545/',
      'https://data-seed-prebsc-2-s3.binance.org:8545/',
    ],
    LIQ_PAIRS: [
      {
        text: 'BNB-ST1',
        addr: '0xc5b5b56e9ba3b43a3960d8b48ac7fcdc535dc80e',
      },
      {
        text: 'BNB-ST2',
        addr: '0xf5f7ac1821beaba18e690298fe9c681d4a1971a4',
      },
    ],
  },
};

const env = process.env.NODE_ENV;

const WEB3_MODAL_NETWORK =  GLOBAL_VARIABLES[env].WEB3_MODAL_NETWORK
const WALLETS_API_URL = GLOBAL_VARIABLES[env].WALLETS_API_URL;
const WALLET_OPTION_RPC = GLOBAL_VARIABLES[env].WALLET_OPTION_RPC;
const RPC_LIST = GLOBAL_VARIABLES[env].RPC_LIST;
const LIQ_PAIRS = GLOBAL_VARIABLES[env].LIQ_PAIRS
window.cyclops_nft_contract_address =
  GLOBAL_VARIABLES[env].cyclops_nft_contract_address;
window.chainId = GLOBAL_VARIABLES[env].chainId;
