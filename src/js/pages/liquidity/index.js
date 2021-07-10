/* eslint-disable camelcase */
import { modalAddLiquidity } from '../..';
import { cryptoInfoBuild } from '../../components/CryptoInfo';
import {
  errorMsg,
  output_transaction,
  resetMsg,
} from '../../components/InfoMessages';
import { openTab } from '../../components/Navigation';
import { updateData } from '../../components/Web3';
import { initStakingContract } from '../../components/Web3/contracts';
import { NONE_FAMER_ID } from '../../constants';
import { isMobile } from '../../constants/env';
import { erc20TokenContractAbi } from '../../constants/web3ContractAbi';
import { userObject } from '../../store';
import {
  formatDataForMobile,
  htmlToElement,
  safeFloatToWei,
  safeSetTableData,
  tokenIdByLiqpairsTokenName,
  toNormalUSDView,
  toNumber,
} from '../../utils';
import { approveTokenMove } from '../utils';

export async function getLiquidityDashboard(callback = null) {
  let html =
    '<table class="min-w-full">' +
    '<thead>' +
    '<tr>' +
    '<th class="table-title" colspan = "2" scope = "colgroup">Liquidity-Pair</th>' +
    '<th class="table-title">Quantity</th>' +
    '<th class="table-title">Lockup</th>' +
    '<th class="table-title">Days till Withdraw</th>' +
    '<th class="table-title">USD value</th>' +
    '<th class="table-title">APY</th>' +
    '<th class="table-title">Duration days</th>' +
    '<th class="table-title">Extractable</th>' +
    '<th class="table-title">Withdraw deposit</th>' +
    '<th class="table-title">Current Yield ETNA</th>' +
    '<th class="table-title">Extractable Yield ETNA</th>' +
    '<th class="table-title">Withdraw yield</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';

  const wrapper = document.querySelector('#deposits_uniswap');
  wrapper.innerHTML = '';
  userObject.state.currentLiq = [];

  await Promise.all([
    userObject.deposits.getAmArr(),
    userObject.deposits.getRewArr(),
  ]);

  const [
    [icon_column, asset_column, lockup_period],
    apy_column,
    dep_column,
    [usd_val_column, usd_val_only_col],
    [duration_col, unlock_col],
    extractable_dep_col,
    withdraw_dep_col,
    withdraw_dep_inputs_col,
    reward_col,
    extractable_reward_col,
    withdraw_rew_col,
    usd_reward_column,
  ] = await Promise.all([
    userObject.liq_earn.getIconAssetLockupCols(),
    userObject.liq_earn.getApyCol(),
    userObject.liq_earn.getDepCol(),
    userObject.liq_earn.getUsdValCol(),
    userObject.liq_earn.getDurationUnlockCol(),
    userObject.liq_earn.getExtrDepCol(),
    userObject.liq_earn.getWithdrawDepCol(),
    userObject.liq_earn.getWithdrawDepInputsCol(),
    userObject.liq_earn.getRewardCol(),
    userObject.liq_earn.getExtractableRewardCol(),
    userObject.liq_earn.getWithdrawRewCol(),
    userObject.liq_earn.getUsdRewardCol(),
  ]);

  const icon_column_s = new Array(icon_column.length);
  const asset_column_s = new Array(icon_column.length);
  const dep_column_s = new Array(icon_column.length);
  const lockup_period_s = new Array(icon_column.length);
  const unlock_col_s = new Array(icon_column.length);
  const usd_val_column_s = new Array(icon_column.length);
  const apy_column_s = new Array(icon_column.length);
  const duration_col_s = new Array(icon_column.length);
  const extractable_dep_col_s = new Array(icon_column.length);
  const withdraw_dep_col_s = new Array(icon_column.length);
  const withdraw_dep_inputs_col_s = new Array(icon_column.length);
  const reward_col_s = new Array(icon_column.length);
  const extractable_reward_col_s = new Array(icon_column.length);
  const withdraw_rew_col_s = new Array(icon_column.length);
  const usd_reward_column_s = new Array(icon_column.length);

  usd_val_only_col.sort((a, b) => toNumber(b.val) - toNumber(a.val));

  for (let i = 0; i < icon_column?.length ?? 0; i++) {
    const old_index = usd_val_only_col[i].ori_index;

    icon_column_s[i] = icon_column[old_index];
    asset_column_s[i] = asset_column[old_index];
    lockup_period_s[i] = lockup_period[old_index];
    unlock_col_s[i] = unlock_col[old_index];
    usd_reward_column_s[i] = usd_reward_column[old_index];
    dep_column_s[i] = dep_column[old_index];
    usd_val_column_s[i] = usd_val_column[old_index];
    apy_column_s[i] = apy_column[old_index];
    duration_col_s[i] = duration_col[old_index];
    extractable_dep_col_s[i] = extractable_dep_col[old_index];
    withdraw_dep_col_s[i] = withdraw_dep_col[old_index];
    withdraw_dep_inputs_col_s[i] = withdraw_dep_inputs_col[old_index];
    reward_col_s[i] = reward_col[old_index];
    extractable_reward_col_s[i] = extractable_reward_col[old_index];
    withdraw_rew_col_s[i] = withdraw_rew_col[old_index];
  }

  for (let i = 0; i < icon_column?.length ?? 0; i++) {
    if (isMobile) {
      const options = {
        icon_column: formatDataForMobile(icon_column_s[i]),
        asset_column: formatDataForMobile(asset_column_s[i]),
        usd_reward_column: {
          data: formatDataForMobile(usd_reward_column_s[i]),
          name: 'Extractable Yield USD value',
        },
        list: {
          dep_column: {
            data: formatDataForMobile(dep_column_s[i]),
            name: 'Quantity',
          },
          lockup_period: {
            data: formatDataForMobile(lockup_period_s[i]),
            name: 'Lockup',
          },
          unlock_col: {
            data: formatDataForMobile(unlock_col_s[i]),
            name: 'Days till Withdraw',
          },
          usd_val_column: {
            data: formatDataForMobile(usd_val_column_s[i]),
            name: 'USD value',
          },
          apy_column: {
            data: formatDataForMobile(apy_column_s[i]),
            name: 'APY',
          },
          duration_col: {
            data: formatDataForMobile(duration_col_s[i]),
            name: 'Duration days',
          },
          extractable_dep_col: {
            data: formatDataForMobile(extractable_dep_col_s[i]),
            name: 'Extractable',
          },
          withdraw_dep_col: {
            data: formatDataForMobile(withdraw_dep_col_s[i]),
            name: 'Withdraw deposit',
          },
          reward_col: {
            data: formatDataForMobile(reward_col_s[i]),
            name: 'Current Yield ETNA',
          },
          extractable_reward_col: {
            data: formatDataForMobile(extractable_reward_col_s[i]),
            name: 'Extractable Yield ETNA',
          },

          withdraw_rew_col: {
            data: formatDataForMobile(withdraw_rew_col_s[i]),
            name: 'Withdraw yield',
          },
        },
      };

      const mobileListEl = htmlToElement(
        /* html */
        `<div class="stat-row stat-row__blue">
          <div class="w-2/12">
            <div class="stat-row__icon">${options.icon_column}</div>
          </div>
          <div class="w-3/12">
            <div class="flex flex-col ml-5 h-full">
              <div class="crypto-name crypto-style">${
                options.asset_column
              }</div>
              <div class="crypto-stat crypto-stat__name">
              ${
                options.list.dep_column.data !== '-'
                  ? options.list.dep_column.data
                  : ''
              }
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
                  ? `<div class="crypto-amount crypto-style">${toNormalUSDView(
                      options.list.usd_val_column.data
                    )}</div>`
                  : ''
              }
              ${
                options.list.duration_col.data !== '-'
                  ? `<div class="crypto-collateral crypto-stat__name">${options.list.duration_col.data} days</div>`
                  : ''
              }
            </div>
          </div>
        </div>`
      );

      userObject.state.currentLiq = [...userObject.state.currentLiq, options];
      /* eslint no-loop-func: "off" */
      mobileListEl.onclick = (e) => {
        openTab(
          e,
          'crypto-info',
          () =>
            cryptoInfoBuild(
              i,
              {
                link: 'liq-earn-tab',
                text: 'Liquidity-Earn',
              },
              'currentLiq'
            ),
          options.asset_column
        );
      };

      wrapper.appendChild(mobileListEl);
    } else {
      html += '<tr class="table-row">';

      html += icon_column_s[i];

      html += asset_column_s[i];

      // html += in_wallet_column_s[i];

      html += dep_column_s[i];

      html += lockup_period_s[i];

      html += unlock_col_s[i];

      html += usd_val_column_s[i];

      html += apy_column_s[i];

      html += duration_col_s[i];

      html += extractable_dep_col_s[i];

      html += withdraw_dep_col_s[i];

      html += withdraw_dep_inputs_col_s[i];

      html += reward_col_s[i];

      html += extractable_reward_col_s[i];

      html += withdraw_rew_col_s[i];

      html += '</tr>';
    }
  }

  html += '</tbody></table>';

  safeSetTableData('deposits_uniswap', isMobile ? '' : html, 'empty');
  if (callback) callback();
}

export async function approve_stake_liq() {
  modalAddLiquidity.isLoadingAfterApprove();

  if (!userObject.state.liq_pair_name) {
    modalAddLiquidity.isLoadedAfterApprove(false);
    errorMsg('You need to select liquidity pair');
    return;
  }

  const amount_wei = safeFloatToWei(
    document.getElementById('liq_pair_stake_am').value
  ).toString(); // wei
  approveTokenMove(
    userObject.state.liq_pair_address,
    amount_wei,
    window.staking_contract_address,
    modalAddLiquidity
  );
}

export async function stake_liq() {
  modalAddLiquidity.isLoadingAfterConfirm();

  if (!userObject.state.liq_pair_name) {
    modalAddLiquidity.isLoadedAfterConfirm(false, false);
    errorMsg('You need to select liquidity pair');
    return;
  }

  if (!userObject.state.liq_pair_fullcode) {
    modalAddLiquidity.isLoadedAfterConfirm(false, false);
    errorMsg('You need to select term');
    return;
  }

  const dep_profile_id = await tokenIdByLiqpairsTokenName(
    userObject.state.liq_pair_fullcode
  );
  const wei_val = 0;
  const token_ids = [];

  const amount = safeFloatToWei(
    document.getElementById('liq_pair_stake_am').value
  ).toString(); // wei

  const token_contract = await new window.web3js.eth.Contract(
    erc20TokenContractAbi,
    userObject.state.liq_pair_address
  );
  const allow = new window.BN(
    await token_contract.methods
      .allowance(userObject.account, window.staking_contract_address)
      .call({
        from: userObject.account,
      })
  );

  const tokenAmountToApprove = new window.BN(amount);

  // amount is already adjusted *10**18
  const calculatedApproveValue = tokenAmountToApprove;

  if (allow < calculatedApproveValue) {
    modalAddLiquidity.isLoadedAfterConfirm(false, false);
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
  const erc20_count_bn = new window.BN(erc20_count);
  const amount_bn = new window.BN(amount);

  if (toNumber(erc20_count_bn.cmp(amount_bn)) === -1) {
    modalAddLiquidity.isLoadedAfterConfirm(false, false);
    errorMsg('You do not have enough tokens in your wallet');
    return;
  }

  resetMsg();

  initStakingContract(async (stakingContractInstance) => {
    stakingContractInstance.methods
      .deposit(amount, token_ids, dep_profile_id, NONE_FAMER_ID)
      .send(
        {
          from: userObject.account,
          value: wei_val,
          gasPrice: window.gp,
        },
        (error, txnHash) => {
          if (error) {
            modalAddLiquidity.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async (confirmationNumber) => {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('stake_liq');
          modalAddLiquidity.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modalAddLiquidity.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
        throw new Error(error);
      });
  });
}
