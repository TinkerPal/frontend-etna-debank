const CRYPTO_ICONS = [{
  name: 'bnb'
}, {
  name: 'st1'
}, {
  name: 'cytr'
}, {
  name: 'etna'
}, {
  name: 'bnb-st1-2w',
  icon: 'pancake'
},{
  name: 'bnb-st2',
  icon: 'pancake'
}];

const WALLETS_API_URL = "https://bsc-debank-wallet-api.etna.network";
//const NFT_PUB_API_URL = "https://bsc-debank-pub-api.etna.network";
//const NFT_ROOT_URL = "https://debank.etna.network/nft";

window.cyclops_nft_contract_address = '0x6ab7E5B00a6e4A7E56160FAc1BCcAcEad1614554'; //kovan

window.cyclops_nft_contract_address = '0x6ab7E5B00a6e4A7E56160FAc1BCcAcEad1614554'; //kovan

const apy_scale = 100000;
const CACHE_TIME = 30000; //ms, i.e 30 sec.

const chains = new Array();
chains['0x1'] = "mainnet";
chains['1'] = "mainnet"; //for opera
chains['0x3'] = "ropsten";
chains['0x4'] = "rinkeby";
chains['0x5'] = "goerli";
chains["0x2a"] = "kovan";
chains["0x61"] = 'bsctestnet'
chains["0x38"] = 'bsc';

const dep_types = new Array();
dep_types["ERC20"] = 1;
dep_types["ERC721"] = 2;
dep_types["Uniswap pair"] = 3;
dep_types["Ether"] = 4;

const rev_dep_types = new Array();
rev_dep_types[1] = "ERC20";
rev_dep_types[2] = "ERC721";
rev_dep_types[3] = "Uniswap pair";
rev_dep_types[4] = "Ether";

const period_name_from_code = new Array();
period_name_from_code['1W'] = "1 week";
period_name_from_code['2W'] = "2 weeks";
period_name_from_code['1M'] = "1 month";

const period_len_from_code = new Array();
period_len_from_code['1W'] = 7;
period_len_from_code['2W'] = 14;
period_len_from_code['1M'] = 30;

const to_bool = new Array();
to_bool["Yes"] = true;
to_bool["No"] = false;

const rev_to_bool = new Array();
rev_to_bool[true] = "Yes";
rev_to_bool[false] = "No";

const infura_endpoint = new Array();
infura_endpoint['0x1'] = "https://mainnet.infura.io/v3/e399e7df7f9149d08b2e91939e056007";
infura_endpoint['1'] = "https://mainnet.infura.io/v3/e399e7df7f9149d08b2e91939e056007"; //for opera
infura_endpoint["0x2a"] = "https://kovan.infura.io/v3/e399e7df7f9149d08b2e91939e056007";
infura_endpoint["0x61"] = "https://data-seed-prebsc-1-s1.binance.org:8545";


const zero_address = '0x0000000000000000000000000000000000000000';
const ADJ_CONSTANT = 1000000000000000000; //10^18
//window.chainId = "0x1"; //prod
window.chainId = "0x61"; //testnet bsc

const MAX_ETH_AMOUNT = 20;
const MAX_TOKENS_AMOUNT = 200;

// *** for price chart
const MAX_PRICE_DATA_LEN = 90;
const INIT_SELL_PRICE = 0.1; //ether
const INIT_BUYOUT_PRICE = 0.08; //ether
const INIT_PRICE_DATE = Date.parse('2021-01-01');
const FORECAST_TOKENS_PER_DAY = 5;
const PRICE_CHANGE = 1.0015;

const ERC20_TOKEN = 1;
const ERC721_TOKEN = 2;
const UNISWAP_PAIR = 3;
const NATIVE_ETHEREUM = 4;
const BAD_TOKEN = 99;

const BAD_DEPOSIT_PROFILE_ID = 9999999;
const BAD_DEPOSIT_ID = 9999999;
const NONE_FAMER_ID = 9999999;
window.famer = NONE_FAMER_ID;

// *** wallet connect variables

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      }
    }
  }
};

const forwardedOrigin = "https://debank.etna.network";
