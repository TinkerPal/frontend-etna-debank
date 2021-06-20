const CRYPTO_ICONS = [
  {
    name: 'bnb',
  },
  {
    name: 'st1',
  },
  {
    name: 'cytr',
  },
  {
    name: 'etna',
  },
  {
    name: 'eth',
  },
  {
    name: 'btcb',
  },
  {
    name: 'dai',
  },
  {
    name: 'busd',
  },
  {
    name: 'usdt',
  },
  {
    name: 'usdc',
  },
  {
    name: 'btc',
  },
  {
    name: 'link',
  },
  {
    name: 'ada',
  },
  {
    name: 'xpr',
  },
  {
    name: 'dot',
  },
  {
    name: 'ltc',
  },
  {
    name: 'bnb-st1-2w',
    icon: 'pancake',
  },
  {
    name: 'bnb-st1-1w',
    icon: 'pancake',
  },
  {
    name: 'bnb-st1-1m',
    icon: 'pancake',
  },
  {
    name: 'bnb-st2-1m',
    icon: 'pancake',
  },
  {
    name: 'bnb-st2-2w',
    icon: 'pancake',
  },
  {
    name: 'bnb-st2-1w',
    icon: 'pancake',
  },
  {
    name: 'bnb-st2',
    icon: 'pancake',
  },
];

const apy_scale = 100000;
const CACHE_TIME = 30000;

const chains = [];
chains['0x1'] = 'mainnet';
chains['1'] = 'mainnet'; // for opera
chains['0x3'] = 'ropsten';
chains['0x4'] = 'rinkeby';
chains['0x5'] = 'goerli';
chains['0x2a'] = 'kovan';
chains['0x61'] = 'bsctestnet';
chains['0x38'] = 'bsc';

const dep_types = [];
dep_types.ERC20 = 1;
dep_types.ERC721 = 2;
dep_types['Uniswap pair'] = 3;
dep_types.Ether = 4;

const rev_dep_types = [];
rev_dep_types[1] = 'ERC20';
rev_dep_types[2] = 'ERC721';
rev_dep_types[3] = 'Uniswap pair';
rev_dep_types[4] = 'Ether';

const period_name_from_code = [];
period_name_from_code['1W'] = '1 week';
period_name_from_code['2W'] = '2 weeks';
period_name_from_code['1M'] = '1 month';

const period_len_from_code = [];
period_len_from_code['1W'] = 7;
period_len_from_code['2W'] = 14;
period_len_from_code['1M'] = 30;

const to_bool = [];
to_bool.Yes = true;
to_bool.No = false;

const rev_to_bool = [];
rev_to_bool.true = 'Yes';
rev_to_bool.false = 'No';

const infura_endpoint = [];
infura_endpoint['0x1'] =
  'https://mainnet.infura.io/v3/e399e7df7f9149d08b2e91939e056007';
infura_endpoint['1'] =
  'https://mainnet.infura.io/v3/e399e7df7f9149d08b2e91939e056007'; // for opera
infura_endpoint['0x2a'] =
  'https://kovan.infura.io/v3/e399e7df7f9149d08b2e91939e056007';
infura_endpoint['0x61'] = 'https://data-seed-prebsc-1-s1.binance.org:8545';
infura_endpoint['0x38'] = 'https://bsc-dataseed.binance.org/';

const zero_address = '0x0000000000000000000000000000000000000000';
const ADJ_CONSTANT = 1000000000000000000; // 10^18

const MAX_ETH_AMOUNT = 20;
const MAX_TOKENS_AMOUNT = 200;

// *** for price chart
const MAX_PRICE_DATA_LEN = 90;
const INIT_SELL_PRICE = 0.1; // ether
const INIT_BUYOUT_PRICE = 0.08; // ether
const INIT_PRICE_DATE = Date.parse('2021-01-01');
const FORECAST_TOKENS_PER_DAY = 5;
const PRICE_CHANGE = 1.0015;

const ERC20_TOKEN = 1; // normal token
const ERC721_TOKEN = 2; // NFT
const UNISWAP_PAIR = 3; // Liquidity pair tokens
const NATIVE_ETHEREUM = 4; // bnb
const BAD_TOKEN = 99;

const BAD_DEPOSIT_PROFILE_ID = 9999999;
const BAD_DEPOSIT_ID = 9999999;
const NONE_FAMER_ID = 9999999;
window.famer = NONE_FAMER_ID;

// *** wallet connect variables

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

const forwardedOrigin = 'https://debank.etna.network';
