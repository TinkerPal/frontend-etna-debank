/* eslint-disable camelcase */
import { modalAddLeverage, modalAddLiquidity, modalUnfreeze } from '../../..';
import { getCYTRProfileId } from '../../../pages/credit';
import { userObject } from '../../../store/userObject';
import {
  APYStrByLiqpairsTokenName,
  depAmountByProfileIdReal,
  getWalletBalance,
  getWalletBalanceStr,
  setState,
  tokenIdByLiqTokenAdress,
  toNumber,
} from '../../../utils';
import { safeHtmlById } from '../../../utils/dom';
import { liqpairsDropdown } from '../../Dropdown/liqpairs';
import { liqtermsDropdown } from '../../Dropdown/liqterms';
import {
  errorMsg,
  infoMsg,
  output_transaction,
  resetMsg,
} from '../../InfoMessages';
import { updateData } from '../../Web3';
import { initLiqLevContract } from '../../Web3/contracts';

/* eslint-disable camelcase */
export const setApyStr = async (asset) => {
  setState({
    liq_pair_fullcode: `${userObject.state.liq_pair_name}-${asset.code}`,
  });

  const apy_str = await APYStrByLiqpairsTokenName(
    userObject.state.liq_pair_fullcode
  );

  if (!apy_str) {
    errorMsg('Cannot find APY for pair');
    return;
  }
  safeHtmlById('liq_pair_apy', `${apy_str} APY`);
};

export async function initLiqTermsDropdown() {
  const liqTermsSelect =
    modalAddLiquidity.modal.querySelector('#liqterms-dropdown');
  const liqTermsData = userObject.liq_terms;

  if (liqTermsData.length === 0) return;

  const dropdownOptions = liqTermsData.map((item) => ({
    value: item.text,
    label: item.text,
  }));

  liqtermsDropdown.removeActiveItems();
  liqtermsDropdown.setChoices(dropdownOptions, 'value', 'label', true);
  liqtermsDropdown.setChoiceByValue(liqTermsData[0].text);

  setApyStr(liqTermsData[0]);

  liqTermsSelect.onchange = (e) => {
    const { value } = e.target;
    const currentOption = liqTermsData.find((item) => item.text === value);
    setApyStr(currentOption);
  };
}

export async function initLiqPairsDropdown() {
  const setBal = async (asset) => {
    setState({
      liq_pair_name: asset.text,
      liq_pair_address: asset.addr,
    });
    const bal = await getWalletBalance(
      tokenIdByLiqTokenAdress(userObject.state.liq_pair_address)
    );
    safeHtmlById('liq_pair_in_wallet', bal);
  };

  const liqPairsAssets =
    modalAddLiquidity.modal.querySelector('#liqpairs-dropdown');
  const liqPairsAssetsOptions = userObject.liq_pairs;

  if (liqPairsAssetsOptions.length === 0) return;

  const dropdownOptions = liqPairsAssetsOptions.map((item) => ({
    value: item.text,
    label: item.text,
  }));

  liqpairsDropdown.removeActiveItems();
  liqpairsDropdown.setChoices(dropdownOptions, 'value', 'label', true);
  liqpairsDropdown.setChoiceByValue(liqPairsAssetsOptions[0].text);

  setBal(liqPairsAssetsOptions[0]);
  liqPairsAssets.addEventListener(
    'change',
    (e) => {
      const { value } = e.target;
      const currentOption = liqPairsAssetsOptions.find(
        (item) => item.text === value
      );
      setBal(currentOption);

      const liqTermsValue =
        modalAddLiquidity.modal.querySelector('#liqterms-dropdown').value;
      const currentLiqTerm = userObject.liq_terms.find(
        (item) => item.text === liqTermsValue
      );
      setApyStr(currentLiqTerm);
    },
    false
  );
}

export async function liqModalBuild() {
  if (modalAddLiquidity.isLoading) return;

  const setBal = async (asset) => {
    setState({
      liq_pair_name: asset.text,
      liq_pair_address: asset.addr,
    });
    const bal = await getWalletBalance(
      tokenIdByLiqTokenAdress(userObject.state.liq_pair_address)
    );
    safeHtmlById('liq_pair_in_wallet', bal);
  };

  const liqPairsAssetsOptions = userObject.liq_pairs;

  if (liqPairsAssetsOptions.length === 0) return;

  setBal(liqPairsAssetsOptions[0]);

  modalAddLiquidity.prevStep();
}

export function show_modal_unfreeze(cread_id) {
  const { confirm } = modalUnfreeze;
  confirm.onclick = () => unfreeze_leverage(cread_id);

  modalUnfreeze.show();
}

export async function set_leverage_confirm(ratio, cred_id) {
  modalAddLeverage.isLoadingAfterConfirm();
  if (toNumber(userObject.credits.cred_arr[1][cred_id]) === 0) {
    modalAddLeverage.isLoadedAfterConfirm(false);
    infoMsg('No active credit');
    return;
  }

  initLiqLevContract(async (contractInstance) => {
    const lev = await contractInstance.methods
      .viewCustomerLeverageByCredId(userObject.account, cred_id)
      .call({
        from: userObject.account,
      });

    if (toNumber(lev.lev_amount) > 0) {
      modalAddLeverage.isLoadedAfterConfirm(false);
      infoMsg('You need to unfreeze current leverage first');
      return;
    }

    const cytr_profile_id = await getCYTRProfileId();
    const res_arr = depAmountByProfileIdReal(cytr_profile_id);
    const dep_id = res_arr[0];
    const cytr_am = res_arr[1];

    const cytr_am_bn = new window.BN(cytr_am.toString());

    if (toNumber(window.lev_size_wei.cmp(cytr_am_bn)) === 1) {
      modalAddLeverage.isLoadedAfterConfirm(false);
      infoMsg('Not enough ETNA on deposit');
      return;
    }

    contractInstance.methods
      .freezeLeverageForCredit(userObject.account, dep_id, cred_id, ratio)
      .send(
        {
          from: userObject.account,
          gasPrice: window.gp,
        },
        (error, txnHash) => {
          if (error) {
            modalAddLeverage.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async (confirmationNumber) => {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('set_leverage');
          modalAddLeverage.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        errorMsg('Smartcontract communication error');
        modalAddLeverage.isLoadedAfterConfirm(false);
        throw new Error(error);
      });
  });
  return true;
}

export async function unfreeze_leverage(cred_id) {
  modalUnfreeze.isLoadingAfterConfirm();
  initLiqLevContract(async (contractInstance) => {
    contractInstance.methods
      .unfreezeLeverageForCredit(userObject.account, cred_id)
      .send(
        {
          from: userObject.account,
          gasPrice: window.gp,
        },
        (error, txnHash) => {
          if (error) {
            modalUnfreeze.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async (confirmationNumber) => {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('unfreeze_leverage');
          modalUnfreeze.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        errorMsg('Smartcontract communication error');
        modalUnfreeze.isLoadedAfterConfirm(false);
        throw new Error(error);
      });
  });
  return true;
}
