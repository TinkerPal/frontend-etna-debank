/* eslint-disable camelcase */
import { APY_SCALE } from '../../constants';
import userObject from '../../store';
import {
  getDepositByTokenId,
  isTokenNft,
  setState,
  toNumber,
} from '../../utils';
import { Modal } from '../Modal';

export const modalAddCredit = new Modal(
  'modal-open-new-credit',
  async () => {
    await initCollateralDropdown();
    await initCreditDropdown();
  },
  async () => {
    await collateralDropdownBuild();
    await creditDropdownBuild();
    await creditModalDataUpdate();
  }
);

async function initCollateralDropdown() {
  const dropdown = modalAddCredit.modal.querySelector('#credprofiles-dropdown');

  await collateralDropdownBuild();

  dropdown.addEventListener('change', handleCollateralDropdown, false);
}

async function handleCollateralDropdown(e) {
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

async function initCreditDropdown() {
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

async function collateralDropdownBuild(clear = true) {
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

async function creditDropdownBuild(clear = true) {
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

  if (clear) {
    setState({
      getcredit_profile: ddData[0].p_id,
    });
    creditDropdown.setChoiceByValue(ddData[0].text);
  } else {
    creditDropdown.setChoiceByValue(selectedChoise.value);
  }
}

async function creditModalDataUpdate() {
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

const getCollateralAvailableTokens = async () => {
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

async function getCreditProfilesListCredit() {
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
