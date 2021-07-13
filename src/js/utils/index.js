/* eslint-disable camelcase */
import numeral from 'numeral';
import SimpleBar from 'simplebar';
import {
  ADJ_CONSTANT,
  APY_SCALE,
  BAD_DEPOSIT_ID,
  BAD_DEPOSIT_PROFILE_ID,
  ERC721_TOKEN,
  NATIVE_ETHEREUM,
  UNISWAP_PAIR,
  ZERO_ADDRESS,
} from '../constants';
import { isMobile, LEVERAGE_TOKEN } from '../constants/env';
import { erc20TokenContractAbi } from '../constants/web3ContractAbi';
import { userObject } from '../store/userObject';
import { getAllProfiles } from '../store/utils';
import { isEmptyTable } from './dom';

export function toNormalUSDView(data) {
  return numeral(data).format('$ 0,0.00');
}

export function formatDataForMobile(data) {
  if (!data) return;
  return data.replace(/<td class="table-cell">(.*)<\/td>/, '$1');
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
export function htmlToElement(html) {
  const template = document.createElement('template');
  const draftHtml = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = draftHtml;
  return template.content.firstChild;
}

export function safeFloatToWei(num) {
  // as string
  let num_s = num.toString();

  // calc digits after 'dot'
  let n = num_s.indexOf(',');
  if (n === -1) n = num_s.indexOf('.');
  if (n === -1) {
    num_s += '.0';
    n = num_s.indexOf('.');
  }
  const num_dig = num_s.length - n - 1;

  // float as integer in string form
  num_s = num_s.substr(n + 1);
  if (num >= 1) {
    num_s = toNumber(num).toString() + num_s;
  }

  // divide adj constant on 10**[num digits after dot]
  let bn_adj = new window.BN(ADJ_CONSTANT.toString());

  bn_adj = bn_adj.div(new window.BN(10).pow(new window.BN(num_dig)));

  // bn based on float as integer in string form
  let bn_num = new window.BN(num_s);

  // adjust with adj constant
  bn_num = bn_num.mul(bn_adj);

  // and return in BN form
  return bn_num;
}

export function setState(state) {
  userObject.state = {
    ...userObject.state,
    ...state,
  };
}

export function safeSetTableData(id, value, className) {
  const el = document.getElementById(id);
  if (el) {
    if (value !== '') {
      el.innerHTML = value;
    }
    if (!isMobile) {
      new SimpleBar(el);
    }
    if (isEmptyTable(id)) {
      el.closest('.page').classList.add(className);
    } else {
      el.closest('.page').classList.remove(className);
    }
  }
}

export function getDepositByTokenId(p_id) {
  if ((userObject.deposits.am_arr?.length ?? 0) === 0) return;

  const index = userObject.deposits.am_arr[0].findIndex(
    (item) => toNumber(item) === toNumber(p_id)
  );

  if (index === -1) return;

  const deposit = userObject.deposits.am_arr[1][index];

  return isTokenNft(p_id) ? deposit : toTokens(deposit, 4);
}

export function isMetaMaskInstalled() {
  if (typeof window.ethereum !== 'undefined') {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }
}

export function depAmountByProfileId(profile_id) {
  if (toNumber(profile_id) !== -1) {
    for (let i = 0; i < userObject?.deposits?.am_arr[0]?.length ?? 0; i++) {
      if (toNumber(userObject.deposits.am_arr[0][i]) === toNumber(profile_id)) {
        let am = userObject.deposits.am_arr[1][i];
        if (toNumber(depTypeByDepositTokenId(profile_id)) !== ERC721_TOKEN) {
          am = window.web3js_reader.utils.fromWei(am.toString(), 'ether');
        }
        return [i, am];
      }
    }
  }
  return [BAD_DEPOSIT_ID, 0];
}

export function toNumber(number) {
  return parseInt(number, 10);
}

export function depAmountByProfileIdReal(profile_id) {
  for (let i = 0; i < userObject.deposits.am_arr[0].length; i++) {
    if (toNumber(userObject.deposits.am_arr[0][i]) === toNumber(profile_id)) {
      const am = userObject.deposits.am_arr[1][i];

      return [i, am];
    }
  }
  return [BAD_DEPOSIT_ID, 0];
}

export function toTokens(wei_am, digs) {
  if (wei_am === 0 || !wei_am || wei_am === '0') return 0;

  const n_tokens = floorDecimals(
    window.web3js_reader.utils.fromWei(wei_am.toString(), 'ether'),
    digs
  );
  return parseFloat(n_tokens).toFixed(digs).toString();
}

export function floorDecimals(value, decimals) {
  return Number(`${Math.floor(`${value}e${decimals}`)}e-${decimals}`);
}

export function depTypeByDepositTokenId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles.length; i++) {
    if (
      toNumber(userObject.deposit_profiles[i].p_id) === toNumber(profile_id)
    ) {
      return toNumber(userObject.deposit_profiles[i].p_dep_type);
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

export function isTokenNft(tokenId) {
  return toNumber(depTypeByDepositTokenId(tokenId)) === ERC721_TOKEN;
}

export function isTokenLiqPairs(tokenId) {
  const depType = depTypeByLiqpairsTokenId(tokenId);
  return toNumber(depType) === UNISWAP_PAIR;
}

export function isTokenBnb(tokenId) {
  return toNumber(depTypeByDepositTokenId(tokenId)) === NATIVE_ETHEREUM;
}

export function tokenAddressByLiqTokenId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles_liqpairs.length; i++) {
    if (
      toNumber(userObject.deposit_profiles_liqpairs[i].p_id) ===
      toNumber(profile_id)
    ) {
      return userObject.deposit_profiles_liqpairs[i].p_tok_addr;
    }
  }
  return ZERO_ADDRESS;
}

export function tokenIdByLiqTokenAdress(tokenAddress) {
  for (let i = 0; i < userObject.deposit_profiles_liqpairs.length; i++) {
    if (
      toNumber(userObject.deposit_profiles_liqpairs[i].p_tok_addr) ===
      toNumber(tokenAddress)
    ) {
      return userObject.deposit_profiles_liqpairs[i].p_id;
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

export function tokenNameByCreditCredId(credId) {
  const assetPID = userObject.credits.cred_arr[0][credId];
  const asset = userObject.credit_profiles.find(
    (profile) => toNumber(profile.id) === toNumber(assetPID)
  );

  if (!asset) return;

  return asset.name;
}

export function tokenAddressByDepositTokenId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles[i].p_id) === toNumber(profile_id)
    ) {
      return userObject.deposit_profiles[i].p_tok_addr;
    }
  }
  return ZERO_ADDRESS;
}

export function tokenNameByDepositTokenId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles[i].p_id) === toNumber(profile_id)
    ) {
      return userObject.deposit_profiles[i].p_name;
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

export function tokenIdByTokenName(tokenName) {
  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    if (
      userObject.deposit_profiles[i].p_name.toLowerCase() ===
      tokenName.toLowerCase()
    ) {
      return userObject.deposit_profiles[i].p_id;
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

export function APYStrByLiqpairsTokenName(profile_name) {
  for (let i = 0; i < userObject.deposit_profiles_liqpairs?.length ?? 0; i++) {
    if (userObject.deposit_profiles_liqpairs[i].p_name === profile_name) {
      const apy = toNumber(userObject.deposit_profiles_liqpairs[i].init_apy);
      const apy_real = apy / APY_SCALE;
      const apy_str = `${(apy_real * 100).toFixed(1).toString()}%`;
      return apy_str;
    }
  }
  return null;
}

export function tokenIdByLiqpairsTokenName(profile_name) {
  for (let i = 0; i < userObject.deposit_profiles_liqpairs?.length ?? 0; i++) {
    if (userObject.deposit_profiles_liqpairs[i].p_name === profile_name) {
      return toNumber(userObject.deposit_profiles_liqpairs[i].p_id);
    }
  }
  return null;
}

export function tokenNameByLiqpairsTokenId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles_liqpairs?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles_liqpairs[i].p_id) ===
      toNumber(profile_id)
    ) {
      return userObject.deposit_profiles_liqpairs[i].p_name;
    }
  }
  return null;
}

export function depTypeByLiqpairsTokenId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles_liqpairs.length; i++) {
    if (
      toNumber(userObject.deposit_profiles_liqpairs[i].p_id) ===
      toNumber(profile_id)
    ) {
      return userObject.deposit_profiles_liqpairs[i].p_dep_type;
    }
  }

  return BAD_DEPOSIT_PROFILE_ID;
}

export async function getPriceOfTokens(
  tokenAmount,
  tokenId,
  isSafeAmount = false
) {
  const contract = window.data_provider_smartcontract_reader;
  const tokenName = tokenNameByDepositTokenId(tokenId);

  const token =
    (isTokenBnb(tokenId) && 'BNBUSD') ||
    (isTokenNft(tokenId) && LEVERAGE_TOKEN) ||
    tokenName;

  const wei_amount = isSafeAmount
    ? new window.BN(tokenAmount.toString())
    : safeFloatToWei(tokenAmount); // BN

  const [data, dec] = await Promise.all([
    contract.methods.getData(token).call({
      from: userObject.account,
    }),
    contract.methods.getDecimals(token).call({
      from: userObject.account,
    }),
  ]);

  const usd_bn = new window.BN(wei_amount.mul(new window.BN(data)));

  const base = new window.BN(10);
  const div_dec = new window.BN(base.pow(new window.BN(dec)));
  const usd_adj = new window.BN(usd_bn.div(div_dec));

  return parseFloat(
    window.web3js_reader.utils.fromWei(usd_adj.toString(), 'ether')
  );
}

export async function getAPY(profile_id) {
  if (!userObject.deposit_profiles) {
    userObject.deposit_profiles = await getAllProfiles();
  }

  if (!window.dep_apys) {
    window.dep_apys = [];
    for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
      window.dep_apys[toNumber(userObject.deposit_profiles[i].p_id)] = null;
    }
  }

  if (window.dep_apys[profile_id]) {
    return window.dep_apys[profile_id];
  }
  const apy = await window.usage_calc_smartcontract_reader.methods
    .calcDepApy(profile_id)
    .call({
      from: userObject.account,
    });
  window.dep_apys[profile_id] = apy;
  return window.dep_apys[profile_id];
}

export async function calcTokensFromUSD(cred_profile_id, amount_usd) {
  if (!amount_usd) return 0;

  const tokens = await window.usage_calc_smartcontract_reader.methods
    .calcFromUSDValue(amount_usd, cred_profile_id)
    .call({
      from: userObject.account,
    });
  const n_tokens = window.web3js_reader.utils.fromWei(
    tokens.toString(),
    'ether'
  );
  return parseFloat(n_tokens).toFixed(4).toString();
}

export async function getNftPrice(contract, vc_contract, token_ids) {
  const wei_am = await vc_contract.methods.calcNFTTokensValue(token_ids).call({
    from: userObject.account,
  });
  const wei_amount = new window.BN(wei_am.toString());

  const [data, dec] = await Promise.all([
    contract.methods.getData('ETNAUSD').call({
      from: userObject.account,
    }),
    contract.methods.getDecimals('ETNAUSD').call({
      from: userObject.account,
    }),
  ]);

  const usd_bn = new window.BN(wei_amount.mul(new window.BN(data)));

  const base = new window.BN(10);
  const div_dec = new window.BN(base.pow(new window.BN(dec)));
  const usd_adj = new window.BN(usd_bn.div(div_dec));

  const usd_float = parseFloat(
    window.web3js_reader.utils.fromWei(usd_adj.toString(), 'ether')
  );
  return usd_float.toFixed(3);
}

export async function getWalletBalance(tokenId) {
  if (isTokenNft(tokenId)) {
    const balance = await window.cyclops_nft_smartcontract_reader.methods
      .balanceOf(userObject.account)
      .call({
        from: userObject.account,
      });

    return balance;
  }

  if (isTokenBnb(tokenId)) {
    const wb = await window.web3js_reader.eth.getBalance(userObject.account);

    return toTokens(wb, 4);
  }

  const isliqPairs = isTokenLiqPairs(tokenId);

  const token_address = isliqPairs
    ? tokenAddressByLiqTokenId(tokenId)
    : tokenAddressByDepositTokenId(tokenId);

  const erc20contract = await new window.web3js_reader.eth.Contract(
    erc20TokenContractAbi,
    token_address
  );
  const erc20_count = await erc20contract.methods
    .balanceOf(userObject.account)
    .call({
      from: userObject.account,
    });

  return toTokens(erc20_count, 4);
}

export function getIndexOfTokenInAmArr(tokenId) {
  for (let i = 0; i < userObject.deposits.am_arr[0].length; i++) {
    if (toNumber(userObject.deposits.am_arr[0][i]) === toNumber(tokenId)) {
      return i;
    }
  }
  return null;
}
