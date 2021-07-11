/* eslint-disable camelcase */
import { modalAddDeposit } from '../../..';
import { ERC721_TOKEN, NATIVE_ETHEREUM } from '../../../constants';
import { userObject } from '../../../store/userObject';
import {
  getNftPrice,
  getPriceOfTokens,
  isTokenBnb,
  isTokenNft,
  setState,
  tokenIdByTokenName,
  toNumber,
} from '../../../utils';
import { safeSetValueById } from '../../../utils/dom';
import { nftAssetsSelect } from '../../Dropdown/nft';
import { initVotesCalcContractReader } from '../../Web3/contracts';

export async function getDepositProfilesList() {
  const plist = [];

  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    const option = {};

    option.text = userObject.deposit_profiles[i].p_name; // name
    option.p_id = userObject.deposit_profiles[i].p_id; // profile id
    option.d_type = userObject.deposit_profiles[i].p_dep_type; // dep type
    option.d_tok_addr = userObject.deposit_profiles[i].p_tok_addr;
    const json_details = {};
    json_details.id = userObject.deposit_profiles[i].p_id;
    json_details.name = userObject.deposit_profiles[i].p_name;
    json_details.deposit_type = userObject.deposit_profiles[i].p_dep_type;
    json_details.deposit_token_address =
      userObject.deposit_profiles[i].p_tok_addr;
    json_details.init_apy = userObject.deposit_profiles[i].init_apy;
    json_details.rate = userObject.deposit_profiles[i].rate;
    json_details.reward_per_day = userObject.deposit_profiles[i].reward_per_day;
    json_details.min_lock_time = userObject.deposit_profiles[i].min_lock_time;

    option.value = JSON.stringify(json_details);
    option.selected = false;
    option.description = '';
    option.imageSrc = '';

    plist.push(option);
  }
  return plist;
}

export async function depositModalUpdateNftDropdown() {
  const nftAssetsDropdownRow =
    modalAddDeposit.modal.querySelector('#assets-dropdown');

  nftAssetsDropdownRow.classList.add('loading');
  const nftData = await getNFTAssets();
  await updateAssetsDropdown(nftData);

  if (userObject.state.selected_depprofile_name === 'nft') {
    await updUSDValue('-', 'usd_value');
  }
  nftAssetsDropdownRow.classList.remove('loading');
}

export async function depositModalRebuild() {
  if (modalAddDeposit.isLoading) return;
  const ddData = await getDepositProfilesList();

  const depprofilesDropdown = modalAddDeposit.modal.querySelector(
    '#depprofiles-dropdown'
  );
  const nftAssetsDropdownRow =
    modalAddDeposit.modal.querySelector('#assets-dropdown');
  const assetsAmountRow =
    modalAddDeposit.modal.querySelector('#tokens_amount').parentNode;
  const depositSelectedAsset = depprofilesDropdown.value;

  const currentDepProfile = ddData.find(
    (item) => item.text.toLowerCase() === depositSelectedAsset.toLowerCase()
  );

  if (!currentDepProfile) return;

  setState({
    selected_depprofile: currentDepProfile.p_id,
    selected_depprofile_name: currentDepProfile.text,
    selected_depprofile_type: currentDepProfile.d_type,
    selected_depprofile_token_address: currentDepProfile.d_tok_addr,
  });

  if (isTokenBnb(currentDepProfile.p_id)) {
    modalAddDeposit.nextStep();
  } else {
    modalAddDeposit.prevStep();
  }

  if (isTokenNft(currentDepProfile.p_id)) {
    nftAssetsDropdownRow.classList.remove('hidden');
    assetsAmountRow.classList.add('hidden');
    updUSDValue('-', 'usd_value');
  } else {
    nftAssetsDropdownRow.classList.add('hidden');
    assetsAmountRow.classList.remove('hidden');
    updUSDValue('tokens_amount', 'usd_value');
  }
}

export async function initDepositProfilesDropdown() {
  const ddData = await getDepositProfilesList();
  const nftData = await getNFTAssets();

  if (ddData.length === 0) return;

  if (nftData.length > 0) {
    initAssetsDropdown(nftData);
  }

  const depprofilesDropdown = modalAddDeposit.modal.querySelector(
    '#depprofiles-dropdown'
  );
  const assetsAmmountValue =
    modalAddDeposit.modal.querySelector('#tokens_amount');

  // todo переделать на чойз
  // setOptionsToSelect(ddData, depprofilesDropdown);

  // new CustomSelect({
  //   elem: depprofilesDropdown,
  // });

  assetsAmmountValue.oninput = depositModalRebuild;
  depprofilesDropdown.onchange = depositModalRebuild;
}

export async function getNFTAssets() {
  const contract = window.data_provider_smartcontract_reader;

  let vc_contract;
  await initVotesCalcContractReader(async (c) => {
    vc_contract = c;
  });

  const flist = [];

  const balansOfNft = await window.cyclops_nft_smartcontract_reader.methods
    .balanceOf(userObject.account)
    .call({
      from: userObject.account,
    });

  if (balansOfNft === '0') return [];

  const tokenIdPromise = [];
  balansOfNft.forEach((nft, i) => {
    tokenIdPromise.push(
      window.cyclops_nft_smartcontract_reader.methods
        .tokenOfOwnerByIndex(userObject.account, i)
        .call({
          from: userObject.account,
        })
    );
  });
  const tokenIdArray = await Promise.all(tokenIdPromise);

  const tokenPricePromise = [];
  tokenIdPromise.forEach((id) => {
    tokenPricePromise.push(getNftPrice(contract, vc_contract, [id]));
  });
  const tokenPriceArray = await Promise.all(tokenPricePromise);

  const tokenUriPromise = [];
  tokenIdArray.forEach((tokenId) => {
    tokenUriPromise.push(
      window.cyclops_nft_smartcontract_reader.methods.tokenURI(tokenId).call({
        from: userObject.account,
      })
    );
  });
  const tokenUriArray = await Promise.all(tokenUriPromise);

  const tokenContenPromise = [];
  tokenUriArray.forEach((uri) => {
    tokenContenPromise.push(fetch(uri).then((res) => res.json()));
  });
  const tokenContenArray = await Promise.all(tokenContenPromise);

  tokenContenArray.forEach((content, i) => {
    flist.push({
      text: content.name,
      t_id: tokenIdArray[i],
      value: i + 1,
      selected: false,
      description: tokenIdArray[i],
      imageSrc: content.image,
      price: tokenPriceArray[i],
    });
  });
  return flist;
}

export function initAssetsDropdown(data) {
  updateAssetsDropdown(data);

  nftAssetsSelect.passedElement.element.addEventListener(
    'change',
    () => {
      const values = nftAssetsSelect.getValue(true);
      userObject.state.selectedNFTAssets = values;
      depositModalRebuild();
    },
    false
  );
}

export function updateAssetsDropdown(data) {
  const assetSelectOptions = data.map((dataItem) => ({
    value: {
      ...dataItem,
    },
    label: `${dataItem.text}[${dataItem.t_id}]`,
  }));

  nftAssetsSelect.removeActiveItems();
  userObject.state.selectedNFTAssets = [];
  nftAssetsSelect.setChoices(assetSelectOptions, 'value', 'label', true);
}

export async function updUSDValue(tokens_amount_elem, usd_val_elem) {
  const contract = window.data_provider_smartcontract_reader;

  if (toNumber(userObject.state.selected_depprofile_type) === ERC721_TOKEN) {
    let vc_contract;
    await initVotesCalcContractReader(async (c) => {
      vc_contract = c;
    });

    const token_ids = [];
    for (let i = 0; i < userObject.state.selectedNFTAssets?.length ?? 0; i++) {
      token_ids.push(toNumber(userObject.state.selectedNFTAssets[i].t_id));
    }

    const nftPrice = await getNftPrice(contract, vc_contract, token_ids);

    return safeSetValueById(usd_val_elem, nftPrice, 'inline');
  }

  const tokens_amount = document.getElementById(tokens_amount_elem).value;
  const usd_float = await getPriceOfTokens(
    tokens_amount,
    tokenIdByTokenName(userObject.state.selected_depprofile_name)
  );
  safeSetValueById(usd_val_elem, usd_float.toFixed(3), 'inline');
}
