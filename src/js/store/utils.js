/* eslint-disable camelcase */
import { userObject } from '.';
import { errorMsg, resetMsg } from '../components/InfoMessages';
import { LIQ_PAIRS, WALLETS_API_URL } from '../constants/env';
import { tokenNameByDepositTokenId } from '../utils';
import { CRYPTO_ICONS } from './constants';

export const createCellWithIcon = (iconSrc) => {
  if (typeof iconSrc === 'string') {
    const iconName = iconSrc.toLowerCase();
    const iconObj = CRYPTO_ICONS.find((icon) => iconName === icon.name);

    return `<span class="crypto-icon-no-spaces"><img src="/images/crypto-icons/icon-${
      iconObj ? iconObj.icon || iconObj.name : 'b'
    }.svg"></span>`;
  }

  return `<span class="crypto-icon-no-spaces"><img src="/images/crypto-icons/icon-b.svg"></span>`;
};

export const createTableBtnWithIcon = (icon, text, callback) => {
  return `<span class="table-btn" onclick="${callback};">
  <i class="icon-cell">
    <img src="/images/${icon}.svg" class="w-full h-full" alt="#">
  </i>
  ${text}
</span>`;
};

export function getLiqTerms() {
  const lterms = [];

  const terms = [
    {
      text: '1 week',
      code: '1W',
    },
    {
      text: '2 weeks',
      code: '2W',
    },
    {
      text: '1 month',
      code: '1M',
    },
  ];

  for (let i = 0; i < terms?.length ?? 0; i++) {
    const option = {};
    option.text = terms[i].text;
    option.code = terms[i].code;

    option.value = i + 1;
    option.selected = false;
    option.description = '';
    option.imageSrc = '';

    lterms.push(option);
  }

  return lterms;
}

export function getLiqPairs() {
  const lpairs = [];

  const pairs = LIQ_PAIRS;

  for (let i = 0; i < pairs?.length ?? 0; i++) {
    const option = {};
    option.text = pairs[i].text;
    option.addr = pairs[i].addr;

    option.value = i + 1;
    option.selected = false;
    option.description = '';
    option.imageSrc = '';

    lpairs.push(option);
  }

  return lpairs;
}

export async function calcUSDValueOfDeposit(wei_amount, dep_id) {
  const usd_val = await window.usage_calc_smartcontract_reader.methods
    .calcUSDValue(userObject.account, dep_id, wei_amount)
    .call({
      from: userObject.account,
    });
  return usd_val.est_usd;
}

export async function calcUSDValueByProfileNonNFT(wei_amount, profile_id) {
  if (tokenNameByDepositTokenId(profile_id) === 'nft') return 0;
  const usd_val = await window.usage_calc_smartcontract_reader.methods
    .calcUSDValueByProfileNonNFT(profile_id, wei_amount)
    .call({
      from: userObject.account,
    });
  return usd_val;
}

export async function getAllProfiles() {
  let profiles;
  await getBackendParameter('DEPPROFILES_UI_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

export async function getAllProfilesWithUniswap() {
  let profiles;
  await getBackendParameter('ASSETS_UI_FULL_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

export async function getAllProfilesUniswap() {
  let profiles;
  await getBackendParameter('ASSETS_UI_LIQ_PAIRS', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

export async function getAllCreditProfiles() {
  let profiles;
  await getBackendParameter('CREDIT_PROFILES_UI_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

export async function getBackendParameter(var_name, callback = null) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  await fetch(`${WALLETS_API_URL}/get_var/${var_name}`, requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }
    })
    .then((respJson) => {
      if (respJson.type === 'success') {
        resetMsg();
        if (callback) callback(respJson.var);
      } else {
        errorMsg('API error');
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}
