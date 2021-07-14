/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { modalAddCredit, modalReturnCredit, modalReturnFee } from '../..';
import { cryptoInfoBuild } from '../../components/CryptoInfo';
import {
  errorMsg,
  infoMsg,
  output_transaction,
  resetMsg,
} from '../../components/InfoMessages';
import { updUSDValueCollateral } from '../../components/Modal/credit';
import { openTab } from '../../components/Navigation';
import { updateData } from '../../components/Web3';
import { initCreditContract } from '../../components/Web3/contracts';
import {
  APY_SCALE,
  BAD_DEPOSIT_PROFILE_ID,
  ERC721_TOKEN,
  NATIVE_ETHEREUM,
} from '../../constants';
import { isMobile, LEVERAGE_TOKEN } from '../../constants/env';
import { erc20TokenContractAbi } from '../../constants/web3ContractAbi';
import { userObject } from '../../store/userObject';
import { getAllProfiles } from '../../store/utils';
import {
  depAmountByProfileId,
  depTypeByDepositTokenId,
  formatDataForMobile,
  htmlToElement,
  isTokenBnb,
  safeFloatToWei,
  safeSetTableData,
  tokenAddressByDepositTokenId,
  toNormalUSDView,
  toNumber,
  toTokens,
} from '../../utils';
import { approveTokenMove } from '../utils';

export async function getCredit() {
  modalAddCredit.isLoadingAfterConfirm();

  if (
    toNumber(userObject.state.selected_credprofile) === -1 ||
    !userObject.state.selected_credprofile
  ) {
    modalAddCredit.isLoadedAfterConfirm(false);
    errorMsg('You need to select collateral asset');
    return;
  }

  if (
    toNumber(userObject.state.getcredit_profile) === -1 ||
    !userObject.state.getcredit_profile
  ) {
    modalAddCredit.isLoadedAfterConfirm(false);
    errorMsg('You need to select credit asset');
    return;
  }

  if (
    toNumber(userObject.state.getcredit_profile) ===
    toNumber(userObject.state.selected_credprofile)
  ) {
    modalAddCredit.isLoadedAfterConfirm(false);
    errorMsg('Assets for collateral and credit should be different');
    return;
  }

  const cred_amount = safeFloatToWei(
    document.getElementById('tokens_amount_getcredit').innerText
  ).toString(); // wei

  const collateral_dep_id = depAmountByProfileId(
    userObject.state.selected_credprofile
  )[0];

  const isFullCallateral = document.getElementById('full_collateral').checked;

  const is_fixed_credit = document.getElementById('set_fixed_credit').checked;

  initCreditContract(async (contract) => {
    contract.methods
      .getCredit(
        userObject.account,
        collateral_dep_id,
        cred_amount,
        userObject.state.getcredit_profile,
        isFullCallateral,
        is_fixed_credit
      )
      .send(
        {
          from: userObject.account,
          gasPrice: window.gp,
        },
        (error, txnHash) => {
          if (error) {
            modalAddCredit.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async (confirmationNumber) => {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('get_credit');
          modalAddCredit.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modalAddCredit.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
      });
  });
}

export async function getCreditsDashboard(callback = null) {
  // let profiles = userObject.deposit_profiles;

  const [am_arr, cred_arr, clt_arr] = await Promise.all([
    userObject.deposits.getAmArr(),
    userObject.credits.getCredArr(),
    userObject.credits.getCltArr(),
  ]);

  const [lev_arr] = await userObject.credits.getLevArr();

  const [
    [icon_column, asset_column],
    apr_column,
    in_wallet_column,
    dep_column,
    cred_column,
    clt_column,
    usd_val_column,
    duration_col,
    fee_col,
    leverage_column,
    set_leverage_column,
    return_credit_col,
    return_leverage_visible,
  ] = await Promise.all([
    userObject.credits.getIconAssetsCols(),
    userObject.credits.getAPRCol(),
    userObject.credits.getInWalletCol(),
    userObject.credits.getDepCol(),
    userObject.credits.getCredCol(),
    userObject.credits.getCltCol(),
    userObject.credits.getUsdValCol(),
    userObject.credits.getDurationCol(),
    userObject.credits.getFeeCol(),
    userObject.credits.getLevCol(),
    userObject.credits.getSetLevCol(),
    userObject.credits.getReturnCreditCol(),
    userObject.credits.returnLeverageVisible(),
  ]);

  let html = `
  <table class="min-w-full">
  <thead>
  <tr>
  <th class="table-title" colspan = "2" scope = "colgroup">Asset</th> 
  <th class="table-title">Borrowed amount</th> 
  <th class="table-title">USD value</th> 
  <th class="table-title">Collateral</th> 
  <th class="table-title">Duration days</th> 
  <th class="table-title">Curent APR<sup>*</sup></th> 
  <th class="table-title">Fee</th> 
  ${
    return_leverage_visible
      ? `
    <th class="table-title table-title-right">Leverage Level</th> 
    <th class="table-title" colspan = "2" scope = "colgroup">Cover Fees with ETNA Leverage</th>
    <th class="table-title table-title-empty"></th>
    `
      : `
    <th class="table-title pl-0">Repay</th> 
    <th class="table-title table-title-empty"></th>
    `
  }
  <th class="table-title">In wallet</th> 
  <th class="table-title">Deposit</th> 
  </tr> 
  </thead> 
  <tbody>`;

  const wrapper = document.querySelector('#my_credits');
  if (isMobile) {
    wrapper.innerHTML = '';
  }
  userObject.state.currentCredits = [];

  for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
    if (
      toNumber(cred_arr[1][i]) > 0 ||
      toNumber(cred_arr[2][i]) > 0 ||
      toNumber(lev_arr[i]) > 0
    ) {
      if (isMobile) {
        const options = {
          icon_column: formatDataForMobile(icon_column[i]),
          asset_column: formatDataForMobile(asset_column[i]),
          list: {
            cred_column: {
              data: formatDataForMobile(cred_column[i]),
              name: 'Borrowed amount',
            },
            usd_val_column: {
              data: formatDataForMobile(usd_val_column[i]),
              name: 'USD value',
            },
            clt_column: {
              data: formatDataForMobile(clt_column[i]),
              name: 'Collateral',
            },
            duration_col: {
              data: formatDataForMobile(duration_col[i]),
              name: 'Duration days',
            },
            apr_column: {
              data: formatDataForMobile(apr_column[i]),
              name: 'Curent APR*',
            },
            fee_col: {
              data: formatDataForMobile(fee_col[i]),
              name: 'Fee',
            },
            leverage_column: {
              data: formatDataForMobile(
                return_leverage_visible ? leverage_column[i] : undefined
              ),
              name: 'Leverage',
            },
            in_wallet_column: {
              data: formatDataForMobile(in_wallet_column[i]),
              name: 'In wallet',
            },
            dep_column: {
              data: formatDataForMobile(dep_column[i]),
              name: 'Deposit',
            },
            set_leverage_column: {
              data: formatDataForMobile(
                return_leverage_visible ? set_leverage_column[i] : undefined
              ),
              name: 'btn',
            },
            return_credit_col: {
              data: formatDataForMobile(return_credit_col[i]),
              name: 'btn',
            },
          },
        };

        const mobileListEl = htmlToElement(/* html */ `
         <div class="stat-row stat-row__blue">
          <div class="w-2/12">
            <div class="stat-row__icon">${options.icon_column}</div>
          </div>
          <div class="w-3/12">
            <div class="flex flex-col ml-5 h-full">
              <div class="crypto-name crypto-style">${
                options.asset_column
              }</div>
              <div class="crypto-stat crypto-stat__name">
              ${options.list.cred_column.data}
              </div>
            </div>
          </div>
          <div class="w-4/12">
            <etna-chart class="crypto-chart" coin="${options.asset_column.toLowerCase()}"></etna-chart>
          </div>
          <div class="w-3/12">
            <div class="flex flex-col h-full text-right">
              ${
                options.list.usd_val_column.data !== '-'
                  ? `
              <div class="crypto-amount crypto-style">${toNormalUSDView(
                options.list.usd_val_column.data
              )}</div>`
                  : ''
              }
              ${
                options.list.cred_column.data !== '-'
                  ? `<div class="crypto-collateral crypto-stat__name">
              ${options.list.cred_column.data} ${options.asset_column}
              </div>`
                  : ''
              }
            </div>
          </div>
        </div>`);

        userObject.state.currentCredits = [
          ...userObject.state.currentCredits,
          options,
        ];

        /* eslint no-loop-func: "off" */
        mobileListEl.onclick = (e) => {
          openTab(
            e,
            'crypto-info',
            () =>
              cryptoInfoBuild(
                i,
                {
                  link: 'borrow-tab',
                  text: 'Borrow',
                },
                'currentCredits'
              ),
            options.asset_column
          );
        };

        wrapper.appendChild(mobileListEl);
      } else {
        html += '<tr class="table-row">';

        html += icon_column[i];

        html += asset_column[i];

        html += cred_column[i];

        html += usd_val_column[i];

        html += clt_column[i];

        html += duration_col[i];

        html += apr_column[i];

        html += fee_col[i];

        html += return_leverage_visible ? leverage_column[i] : '';

        html += return_leverage_visible ? set_leverage_column[i] : '';

        html += return_credit_col[i];

        html += '<td class="table-cell table-cell-empty"></td>';

        html += in_wallet_column[i];

        html += dep_column[i];
      }
    } else if (isMobile) {
      userObject.state.currentCredits = [
        ...userObject.state.currentCredits,
        {},
      ];
    }

    html += '</tr>';
  }

  html += '</tbody></table>';

  safeSetTableData('my_credits', isMobile ? '' : html, 'empty');

  if (callback) callback();
}

export function return_credit(cred_id) {
  modalReturnCredit.show();
  if (modalReturnCredit.isLoading) return;
  const modalElement = modalReturnCredit.modal;
  const allCreditReturnBtn = modalElement.querySelector('#return_credit_all');
  const partCreditReturnBtn = modalElement.querySelector('#return_credit_part');
  const creditReturnInput = modalElement.querySelector('#credit_return_input');

  const creditTokenId = userObject.credits.cred_arr[0][cred_id];

  allCreditReturnBtn.onchange = () => return_credit_all_btn(cred_id);
  partCreditReturnBtn.onchange = () => return_credit_part_btn(cred_id);
  modalReturnCredit.approve.onclick = () => return_credit_mvtokens(cred_id);
  modalReturnCredit.confirm.onclick = () => return_credit_confirm(cred_id);

  allCreditReturnBtn.checked = true;
  creditReturnInput.value = toTokens(
    userObject.credits.cred_arr[1][cred_id],
    4
  );

  if (isTokenBnb(creditTokenId)) {
    modalReturnCredit.nextStep();
  } else {
    modalReturnCredit.prevStep();
  }
  return true;
}

export function return_fee(cred_id) {
  modalReturnFee.show();
  if (modalReturnFee.isLoading) return;

  modalReturnFee.approve.onclick = () => return_fee_mvtokens(cred_id);
  modalReturnFee.confirm.onclick = () => return_fee_confirm(cred_id);

  if (isTokenBnb(userObject.credits.cred_arr[0][cred_id])) {
    modalReturnFee.nextStep();
  } else {
    modalReturnFee.prevStep();
  }
  return true;
}

export async function return_credit_mvtokens(cred_id) {
  modalReturnCredit.isLoadingAfterApprove();
  if (toNumber(userObject.credits.cred_arr[1][cred_id]) === 0) {
    modalReturnCredit.isLoadedAfterApprove(false);
    infoMsg('No active credit');
    return;
  }

  const isReturnAllCredit =
    document.getElementById('return_credit_all').checked;
  const returnCreditValue = document.getElementById(
    'credit_return_input'
  ).value;

  const return_amount = isReturnAllCredit
    ? userObject.credits.cred_arr[1][cred_id]
    : safeFloatToWei(returnCreditValue);

  const returned_asset_token_address = tokenAddressByDepositTokenId(
    userObject.credits.cred_arr[0][cred_id]
  );
  approveTokenMove(
    returned_asset_token_address,
    return_amount,
    window.credit_contract_address,
    modalReturnCredit
  );
}

export async function return_fee_mvtokens(cred_id) {
  modalReturnFee.isLoadingAfterApprove();

  if (toNumber(userObject.credits.cred_arr[2][cred_id]) === 0) {
    modalReturnFee.isLoadedAfterApprove(false);
    infoMsg('No active credit');
    return;
  }

  const return_amount = userObject.credits.cred_arr[2][cred_id];

  const returned_asset_token_address = tokenAddressByDepositTokenId(
    userObject.credits.cred_arr[0][cred_id]
  );
  approveTokenMove(
    returned_asset_token_address,
    return_amount,
    window.credit_contract_address,
    modalReturnFee
  );
}

export async function return_credit_confirm(cred_id) {
  modalReturnCredit.isLoadingAfterConfirm();
  if (toNumber(userObject.credits.cred_arr[1][cred_id]) === 0) {
    modalReturnCredit.isLoadedAfterConfirm(false);
    infoMsg('No active credit');
    return;
  }

  const isReturnAllCredit =
    document.getElementById('return_credit_all').checked;
  const returnCreditValue = document.getElementById(
    'credit_return_input'
  ).value;

  const return_amount = isReturnAllCredit
    ? userObject.credits.cred_arr[1][cred_id]
    : safeFloatToWei(returnCreditValue);

  // alert(return_amount); return;
  const returned_asset_type = depTypeByDepositTokenId(
    userObject.credits.cred_arr[0][cred_id]
  );
  const returned_asset_token_address = tokenAddressByDepositTokenId(
    userObject.credits.cred_arr[0][cred_id]
  );

  let return_val = 0;
  if (toNumber(returned_asset_type) === NATIVE_ETHEREUM) {
    return_val = return_amount;
    // do nothing
  } else if (toNumber(returned_asset_type) === ERC721_TOKEN) {
    modalReturnCredit.isLoadedAfterConfirm(false);
    errorMsg('Error: ERC721 is not possible type for credit');
    return;
  } else {
    // ERC20 - check approval

    const token_contract = await new window.web3js.eth.Contract(
      erc20TokenContractAbi,
      returned_asset_token_address
    );
    const allow = new window.BN(
      await token_contract.methods
        .allowance(userObject.account, window.credit_contract_address)
        .call({
          from: userObject.account,
        })
    );

    const tokenAmountToApprove = new window.BN(return_amount.toString());

    // amount is already adjusted *10**18
    const calculatedApproveValue = tokenAmountToApprove;

    if (allow < calculatedApproveValue) {
      modalReturnCredit.isLoadedAfterConfirm(false, false);
      errorMsg(
        'Please approve tokens move / wait for approval transaction to finish'
      );
      return;
    }

    const erc20_count = await token_contract.methods
      .balanceOf(userObject.account)
      .call({
        from: userObject.account,
      });
    const erc20_count_bn = new window.BN(erc20_count.toString());
    const return_amount_bn = new window.BN(return_amount.toString());

    if (toNumber(erc20_count_bn.cmp(return_amount_bn)) === -1) {
      modalReturnCredit.isLoadedAfterConfirm(false);
      errorMsg('You do not have enough tokens in your wallet');
      return;
    }
  }

  initCreditContract(async (creditContractInstance) => {
    creditContractInstance.methods
      .returnCredit(userObject.account, cred_id, return_amount)
      .send(
        {
          from: userObject.account,
          value: return_val,
          gasPrice: window.gp,
        },
        (error, txnHash) => {
          if (error) {
            modalReturnCredit.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async (confirmationNumber) => {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('return_credit');
          modalReturnCredit.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modalReturnCredit.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
        throw new Error(error);
      });
  });
}

export async function return_fee_confirm(cred_id) {
  modalReturnFee.isLoadingAfterConfirm();
  if (toNumber(userObject.credits.cred_arr[2][cred_id]) === 0) {
    modalReturnFee.isLoadedAfterConfirm(false);
    infoMsg('No active credit');
    return;
  }

  const return_amount = userObject.credits.cred_arr[2][cred_id];

  // alert(return_amount); return;
  const returned_asset_type = depTypeByDepositTokenId(
    userObject.credits.cred_arr[0][cred_id]
  );
  const returned_asset_token_address = tokenAddressByDepositTokenId(
    userObject.credits.cred_arr[0][cred_id]
  );
  let return_val = 0;

  if (toNumber(returned_asset_type) === NATIVE_ETHEREUM) {
    return_val = return_amount;
    // do nothing
  } else if (toNumber(returned_asset_type) === ERC721_TOKEN) {
    modalReturnFee.isLoadedAfterConfirm(false);
    errorMsg('Error: ERC721 is not possible type for credit');
    return;
  } else {
    // ERC20 - check approval

    const token_contract = await new window.web3js.eth.Contract(
      erc20TokenContractAbi,
      returned_asset_token_address
    );
    const allow = new window.BN(
      await token_contract.methods
        .allowance(userObject.account, window.credit_contract_address)
        .call({
          from: userObject.account,
        })
    );

    const tokenAmountToApprove = new window.BN(return_amount.toString());

    const calculatedApproveValue = tokenAmountToApprove;

    if (allow < calculatedApproveValue) {
      modalReturnFee.isLoadedAfterConfirm(false, false);
      errorMsg(
        'Please approve tokens move / wait for approval transaction to finish'
      );
      return;
    }

    const erc20_count = await token_contract.methods
      .balanceOf(userObject.account)
      .call({
        from: userObject.account,
      });
    const erc20_count_bn = new window.BN(erc20_count.toString());
    const return_amount_bn = new window.BN(return_amount.toString());

    if (toNumber(erc20_count_bn.cmp(return_amount_bn)) === -1) {
      modalReturnFee.isLoadedAfterConfirm(false);
      errorMsg('You do not have enough tokens in your wallet');
      return;
    }
  }

  initCreditContract(async (creditContractInstance) => {
    creditContractInstance.methods
      .returnFee(userObject.account, cred_id, return_amount)
      .send(
        {
          from: userObject.account,
          value: return_val,
          gasPrice: window.gp,
        },
        (error, txnHash) => {
          if (error) {
            modalReturnFee.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async (confirmationNumber) => {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('return_fee');
          modalReturnFee.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modalReturnFee.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
        throw new Error(error);
      });
  });
}

export function full_collateral_btn(dep_id) {
  const fullCollateralBtn = document.getElementById('tokens_amount_collateral');
  const { selected_credprofile } = userObject.state;

  fullCollateralBtn.value = depAmountByProfileId(selected_credprofile)[1];

  updUSDValueCollateral(
    'tokens_amount_collateral',
    'usd_value_collateral',
    dep_id
  );
  document.getElementById('tokens_amount_collateral').readOnly = true;
}

export function part_collateral_btn(dep_id) {
  document.getElementById('tokens_amount_collateral').value = 0;
  updUSDValueCollateral(
    'tokens_amount_collateral',
    'usd_value_collateral',
    dep_id
  );
  document.getElementById('tokens_amount_collateral').readOnly = false;
}

export function return_credit_all_btn(dep_id) {
  const adj_am = toTokens(userObject.credits.cred_arr[1][dep_id], 4);
  document.getElementById('credit_return_input').value = adj_am;
  document.getElementById('credit_return_input').readOnly = true;
}

export function return_credit_part_btn() {
  document.getElementById('credit_return_input').value = 0;
  document.getElementById('credit_return_input').readOnly = false;
}

export async function set_fixed_credit() {
  document
    .getElementById('set_fixed_credit')
    .classList.add('transparent_button_pressed');
  document
    .getElementById('set_var_credit')
    .classList.remove('transparent_button_pressed');

  if (
    toNumber(userObject.state.getcredit_profile) === -1 ||
    toNumber(userObject.state.selected_credprofile) === -1
  ) {
    return (document.getElementById('credit_perc').value = '');
  }

  const apy = await window.usage_calc_smartcontract_reader.methods
    .calcFixedApy(
      userObject.state.getcredit_profile,
      userObject.state.selected_credprofile
    )
    .call({
      from: userObject.account,
    });
  const apy_adj = (apy / APY_SCALE) * 100;
  document.getElementById('credit_perc').value = parseFloat(apy_adj)
    .toFixed(2)
    .toString();
}

export async function set_var_credit() {
  document
    .getElementById('set_fixed_credit')
    .classList.remove('transparent_button_pressed');
  document
    .getElementById('set_var_credit')
    .classList.add('transparent_button_pressed');

  if (
    toNumber(userObject.state.getcredit_profile) === -1 ||
    toNumber(userObject.state.selected_credprofile) === -1
  ) {
    return (document.getElementById('credit_perc').value = '');
  }

  const apy = await window.usage_calc_smartcontract_reader.methods
    .calcVarApy(
      userObject.state.getcredit_profile,
      userObject.state.selected_credprofile
    )
    .call({
      from: userObject.account,
    });
  const apy_adj = (apy / APY_SCALE) * 100;
  document.getElementById('credit_perc').value = parseFloat(apy_adj)
    .toFixed(2)
    .toString();
}

export async function set_leverage(ratio, cred_id) {
  ratio = toNumber(ratio);

  if (!(ratio === 25 || ratio === 50 || ratio === 75 || ratio === 100)) return;

  const cytr_profile_id = await getCYTRProfileId();
  const credit_size = userObject.credits.cred_arr[1][cred_id];

  const cc = await window.credit_smartcontract_reader.methods
    .viewCustomerCredit(userObject.account, 0)
    .call({
      from: userObject.account,
    });
  const cc_index = toNumber(cc.index);
  const x = await window.credit_smartcontract_reader.methods
    .viewCustomerCreditExtraDataByIndex(cc_index, cred_id)
    .call({
      from: userObject.account,
    });

  const { is_fixed_apy } = x;

  const clt_id = userObject.credits.cred_arr[4][cred_id];
  const clt_profile_id = userObject.credits.clt_arr[0][clt_id];

  const lns = await window.usage_calc_smartcontract_reader.methods
    .calcNeededLeverageByCreditSize(
      userObject.credits.cred_arr[0][cred_id],
      clt_profile_id,
      cytr_profile_id,
      credit_size,
      is_fixed_apy
    )
    .call({
      from: userObject.account,
    });
  let lev_needed_size = new window.BN(lns.toString());
  if (ratio > 100 || ratio < 0) ratio = 100;
  if (ratio !== 100) {
    const r = new window.BN(ratio);
    lev_needed_size = lev_needed_size.mul(r);
    lev_needed_size = lev_needed_size.div(new window.BN(100));
  }
  window.lev_size_wei = lev_needed_size;

  const size_tokens = window.web3js_reader.utils.fromWei(
    lev_needed_size.toString(),
    'ether'
  );

  document.getElementById('lev_size').value = parseFloat(size_tokens)
    .toFixed(2)
    .toString();
}

export async function getCYTRProfileId() {
  if (!userObject.deposit_profiles) {
    userObject.deposit_profiles = await getAllProfiles();
  }

  if (!window.cytr_profile_id) {
    for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
      if (userObject.deposit_profiles[i].p_name === LEVERAGE_TOKEN) {
        window.cytr_profile_id = toNumber(userObject.deposit_profiles[i].p_id);
        return window.cytr_profile_id;
      }
    }
    window.cytr_profile_id = BAD_DEPOSIT_PROFILE_ID;
    return window.cytr_profile_id;
  }

  return window.cytr_profile_id;
}
