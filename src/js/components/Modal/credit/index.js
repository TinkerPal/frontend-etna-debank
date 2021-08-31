/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import { modalAddCredit } from '../../..';
import { APY_SCALE, ERC721_TOKEN } from '../../../constants';
import { full_collateral_btn } from '../../../pages/credit';
import { userObject } from '../../../store/userObject';
import {
  calcTokensFromUSD,
  depAmountByProfileId,
  getDepositByTokenId,
  isTokenNft,
  safeFloatToWei,
  setState,
  toNumber,
  tryCallFunction,
} from '../../../utils';
import { safeSetValueById } from '../../../utils/dom';
import { collateralDropdown } from '../../Dropdown/collateral';
import { creditDropdown } from '../../Dropdown/credit';

export async function initCollateralDropdown() {
  const dropdown = modalAddCredit.modal.querySelector('#credprofiles-dropdown');

  await collateralDropdownBuild();

  dropdown.addEventListener('change', handleCollateralDropdown, false);
}

export async function handleCollateralDropdown(e) {
  const fullCollateral = modalAddCredit.modal.querySelector('#full_collateral');
  const partCollateral = modalAddCredit.modal.querySelector('#part_collateral');
  const ddData = await getCollateralAvailableTokens();

  const { value } = e.target;
  const selectedData = ddData.find((item) => item.text === value);

  if (value === 'nft') {
    fullCollateral.checked = true;
    partCollateral.parentNode.classList.add('hidden');
  } else {
    partCollateral.parentNode.classList.remove('hidden');
  }

  setState({
    selected_credprofile: selectedData.p_id,
    selected_credprofile_name: selectedData.text,
    selected_credprofile_type: selectedData.c_type,
    selected_credprofile_token_address: selectedData.c_tok_addr,
  });

  await creditDropdownBuild(false);
  await creditModalDataUpdate();
}

export async function initCreditDropdown() {
  const ddData = await getCreditProfilesListCredit();

  if (ddData.length === 0) return;

  const dropdown = modalAddCredit.modal.querySelector('#getcredit-dropdown');

  await creditDropdownBuild();
  await creditModalDataUpdate();

  dropdown.addEventListener('change', handleCreditDropdown, false);
}

async function handleCreditDropdown(e) {
  const ddData = await getCreditProfilesListCredit();

  const { value } = e.target;
  const selectedData = ddData.find((item) => item.text === value);

  setState({
    getcredit_profile: selectedData.p_id,
  });

  await collateralDropdownBuild(false);
  await creditModalDataUpdate();
}

export async function collateralDropdownBuild(clear = true) {
  const fullCollateral = modalAddCredit.modal.querySelector('#full_collateral');

  let ddData = await getCollateralAvailableTokens();

  if (ddData.length === 0) return;

  ddData = ddData.filter(
    (item) => item.p_id !== userObject.state.getcredit_profile
  );

  const collateralDropdownOptions = ddData.map((item) => ({
    value: item.text,
    label: item.text,
    p_id: item.p_id,
  }));

  const selectedChoise = collateralDropdown.getValue();
  collateralDropdown.removeActiveItems();
  collateralDropdown.setChoices(
    collateralDropdownOptions,
    'value',
    'label',
    true
  );

  if (ddData.length === 0) return;

  if (clear) {
    setState({
      selected_credprofile: ddData[0].p_id,
      selected_credprofile_name: ddData[0].text,
      selected_credprofile_type: ddData[0].c_type,
      selected_credprofile_token_address: ddData[0].c_tok_addr,
    });
    collateralDropdown.setChoiceByValue(ddData[0].text);

    fullCollateral.checked = true;
    full_collateral_btn(
      depAmountByProfileId(userObject.state.selected_credprofile)[0]
    );
  } else {
    collateralDropdown.setChoiceByValue(selectedChoise.value);
  }
}

export async function creditDropdownBuild(setDefaultValue = true) {
  let ddData = await getCreditProfilesListCredit();

  if (ddData.length === 0) return;

  ddData = ddData.filter(
    (item) => item.p_id !== userObject.state.selected_credprofile
  );

  const creditDropdownOptions = ddData.map((item) => ({
    value: item.text,
    label: item.text,
    p_id: item.p_id,
  }));

  const selectedChoise = creditDropdown.getValue();
  creditDropdown.removeActiveItems();
  creditDropdown.setChoices(creditDropdownOptions, 'value', 'label', true);

  if (setDefaultValue) {
    setState({
      getcredit_profile: ddData[0].p_id,
    });
    creditDropdown.setChoiceByValue(ddData[0].text);
  } else {
    creditDropdown.setChoiceByValue(selectedChoise.value);
  }
}

export async function creditModalDataUpdate() {
  const tokensAmmountCollateral = modalAddCredit.modal.querySelector(
    '#tokens_amount_collateral'
  );
  const tokensAmmountGetCredit = modalAddCredit.modal.querySelector(
    '#tokens_amount_getcredit'
  );
  const usdValueCollateral = modalAddCredit.modal.querySelector(
    '#usd_value_collateral'
  );

  const fullCollaterlBtn =
    modalAddCredit.modal.querySelector('#full_collateral');
  const creditPerc = modalAddCredit.modal.querySelector('#credit_perc');

  if (
    toNumber(userObject.state.selected_credprofile) === -1 ||
    toNumber(userObject.state.getcredit_profile) === -1
  )
    return;

  if (fullCollaterlBtn.checked === true) {
    tokensAmmountCollateral.value = depAmountByProfileId(
      userObject.state.selected_credprofile
    )[1];
  }

  await updUSDValueCollateral(
    'tokens_amount_collateral',
    'usd_value_collateral',
    depAmountByProfileId(userObject.state.selected_credprofile)[0]
  );

  tokensAmmountGetCredit.innerText = await calcTokensFromUSD(
    userObject.state.getcredit_profile,
    usdValueCollateral.value
  );

  const apy = await window.usage_calc_smartcontract_reader.methods
    .calcVarApy(
      userObject.state.getcredit_profile,
      userObject.state.selected_credprofile
    )
    .call({
      from: userObject.account,
    });
  const apy_adj = (apy / APY_SCALE) * 100;
  creditPerc.value = parseFloat(apy_adj).toFixed(2).toString();
}

export const getCollateralAvailableTokens = async () => {
  const ddData = await getCreditProfilesList();

  if (ddData.length === 0) return [];

  return ddData
    .map((item) => {
      const deposit = getDepositByTokenId(item.p_id);

      if (toNumber(deposit) > 0) {
        return {
          ...item,
        };
      }
      return undefined;
    })
    .filter((item) => !!item);
};

export async function getCreditProfilesListCredit() {
  const full_list = await getCreditProfilesList();

  const plist = [];

  full_list.forEach((item) => {
    !isTokenNft(item.p_id) && plist.push(item);
  });

  return plist;
}

function getCreditProfilesList() {
  const plist = [];

  for (let i = 0; i < userObject.credit_profiles?.length ?? 0; i++) {
    const option = {};

    option.text = userObject.credit_profiles[i].name;
    option.p_id = userObject.credit_profiles[i].id;
    option.c_type = userObject.credit_profiles[i]._type;
    option.c_tok_addr = userObject.credit_profiles[i]._token_address;
    const json_details = {};
    json_details.id = userObject.credit_profiles[i].id;
    json_details.name = userObject.credit_profiles[i].name;
    json_details._type = userObject.credit_profiles[i]._type;
    json_details._token_address = userObject.credit_profiles[i]._token_address;
    json_details.valuation_percent =
      userObject.credit_profiles[i].valuation_percent;
    json_details.init_apy = userObject.credit_profiles[i].init_apy;
    json_details.rate = userObject.credit_profiles[i].rate;

    option.value = JSON.stringify(json_details);
    option.selected = false;
    option.description = '';
    option.imageSrc = '';

    plist.push(option);
  }
  return plist;
}

export async function updUSDValueCollateral(
  tokens_amount_elem,
  usd_val_elem,
  dep_id
) {
  if (toNumber(dep_id) === 9999999) return;

  const { am_arr } = userObject.deposits;

  const tokens_amount = document.getElementById(tokens_amount_elem).value;

  let wei_amount = 0;
  if (toNumber(userObject.state.selected_credprofile_type) !== ERC721_TOKEN) {
    wei_amount = safeFloatToWei(tokens_amount); // BN
  } else {
    wei_amount = new window.web3js_reader.utils.BN(tokens_amount.toString());
  }

  const dep_am = new window.web3js_reader.utils.BN(
    am_arr[1][dep_id].toString()
  );

  if (toNumber(wei_amount.cmp(dep_am)) === 1) {
    let tok_float = 0;
    if (toNumber(userObject.state.selected_credprofile_type) !== ERC721_TOKEN) {
      tok_float = parseFloat(
        window.web3js_reader.utils.fromWei(
          am_arr[1][dep_id].toString(),
          'ether'
        )
      );
    } else {
      tok_float = parseFloat(am_arr[1][dep_id]);
    }
    safeSetValueById(tokens_amount_elem, tok_float.toFixed(3), 'inline');
    wei_amount = am_arr[1][dep_id];
  }

  const functions = [
    () =>
      window.usage_calc_smartcontract_reader.methods
        .calcUSDValueCollateral(
          userObject.account,
          dep_id,
          wei_amount,
          userObject.state.selected_credprofile
        )
        .call({
          from: userObject.account,
        }),
    async () => {
      return '0';
    },
  ];

  const usd_val = await tryCallFunction(functions);
  safeSetValueById(usd_val_elem, usd_val, 'inline');

  if (toNumber(userObject.state.getcredit_profile) !== -1) {
    document.getElementById('tokens_amount_getcredit').innerText =
      await calcTokensFromUSD(
        userObject.state.getcredit_profile,
        document.getElementById('usd_value_collateral').value
      );
  }
}
