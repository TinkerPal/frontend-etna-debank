const GLOBAL_VARIABLES = {
  production: {
    WALLETS_API_URL: 'https://prod-debank-wallet-api.etna.network',
    cyclops_nft_contract_address: '0x83C454FF387cebbC3CbAa5a7a44F412F4FA63c0E',
    marketplace_contract_address: '0x7F3854eBDD3f01C8Cb94B4564196042b95BaE3bD',
    chainId: '0x38',
    WALLET_OPTION_RPC: {
      56: 'https://bsc-dataseed.binance.org/',
    },
    WEB3_MODAL_NETWORK: { network: 'binance' },
    RPC_LIST: [
      'https://proud-patient-forest.bsc.quiknode.pro/8fffb4d84f42ec02686c35631b566c819138e876/',
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
      {
        text: 'ETNA-ETH',
        addr: '0x645A56649E8B8B14F5738f9388Be363AA4d8BbEA',
      },
      {
        text: 'ETNA-BTC',
        addr: '0x0EAF6AADca3356b558091B76555De801ea837932',
      },
    ],
    LEVERAGE_TOKEN: 'ETNA',
    TRANSACTION_LINK: 'bscscan.com',
    NFT_TOKEN_ID: '7',
  },
  development: {
    WALLETS_API_URL: 'https://bsc-debank-wallet-api.etna.network',
    cyclops_nft_contract_address: '0x6ab7E5B00a6e4A7E56160FAc1BCcAcEad1614554',
    marketplace_contract_address: '0x7F3854eBDD3f01C8Cb94B4564196042b95BaE3bD',
    chainId: '0x61',
    WALLET_OPTION_RPC: {
      97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
    WEB3_MODAL_NETWORK: { network: '' },
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
    LEVERAGE_TOKEN: 'CYTR',
    TRANSACTION_LINK: 'testnet.bscscan.com',
    NFT_TOKEN_ID: '6',
  },
};

const env = process.env.NODE_ENV;
export const isMobile = process.env.SITE_VERSION === 'mobile';

export const {
  WEB3_MODAL_NETWORK,
  WALLETS_API_URL,
  WALLET_OPTION_RPC,
  RPC_LIST,
  LIQ_PAIRS,
  LEVERAGE_TOKEN,
  TRANSACTION_LINK,
  NFT_TOKEN_ID,
} = GLOBAL_VARIABLES[env];

export const CYCLOPS_NFT_CONTRACT_ADDRESS =
  GLOBAL_VARIABLES[env].cyclops_nft_contract_address;

export const MARKETPLACE_CONTRACT_ADDRESS =
  GLOBAL_VARIABLES[env].marketplace_contract_address;

export const CHAIN_ID = GLOBAL_VARIABLES[env].chainId;
