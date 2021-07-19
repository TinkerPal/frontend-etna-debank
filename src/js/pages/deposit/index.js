/* eslint-disable camelcase */
import {
  modalAddDeposit,
  modalWithdrawDeposit,
  modalWithdrawYield,
} from '../..';
import { cryptoInfoBuild } from '../../components/CryptoInfo';
import {
  errorMsg,
  infoMsg,
  output_transaction,
  resetMsg,
  successMsg,
} from '../../components/InfoMessages';
import { openTab } from '../../components/Navigation';
import { updateData } from '../../components/Web3';
import { initStakingContract } from '../../components/Web3/contracts';
import { NATIVE_ETHEREUM, NONE_FAMER_ID } from '../../constants';
import { isMobile, NFT_TOKEN_ID } from '../../constants/env';
import { erc20TokenContractAbi } from '../../constants/web3ContractAbi';
import { userObject } from '../../store/userObject';
import {
  formatDataForMobile,
  htmlToElement,
  isTokenNft,
  safeFloatToWei,
  safeSetTableData,
  toNormalUSDView,
  toNumber,
  toTokens,
} from '../../utils';
import { approveTokenMove } from '../utils';

export async function getDepositsDashboard(
  callback = null,
  forceUpdate = false
) {
  let html =
    '<table class="min-w-full">' +
    '<thead>' +
    '<tr>' +
    '<th class="table-title" colspan = "2" scope = "colgroup">Asset</th>' +
    '<th class="table-title">In wallet</th>' +
    '<th class="table-title">Deposit</th>' +
    '<th class="table-title">USD value</th>' +
    '<th class="table-title">APY</th>' +
    '<th class="table-title">Duration days</th>' +
    '<th class="table-title">Extractable</th>' +
    '<th class="table-title">Withdraw deposit</th>' +
    '<th class="table-title" >Current Yield</th>' +
    '<th class="table-title" >Extractable Yield</th>' +
    '<th class="table-title" >Withdraw yield</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';

  const wrapper = document.querySelector('#tokens_balance');

  if (isMobile) {
    wrapper.innerHTML = '';
  }

  userObject.state.currentDeposits = [];

  const profiles = userObject.deposit_profiles;

  const [am_arr, rew_arr] = await Promise.all([
    userObject.deposits.getAmArr(forceUpdate),
    userObject.deposits.getRewArr(forceUpdate),
  ]);

  // let rew_arr = await userObject.deposits.getRewArr();

  const [
    [icon_column, asset_column],
    apy_column,
    in_wallet_column,
    dep_column,
    [usd_val_column, usd_val_only_col],
    duration_col,
    extractable_dep_col,
    withdraw_dep_col,
    reward_col,
    extractable_reward_col,
    withdraw_rew_col,
    usd_reward_column,
  ] = await Promise.all([
    userObject.deposits.getIconAssetsCols(forceUpdate),
    userObject.deposits.getApyCol(forceUpdate),
    userObject.deposits.getInWalletCol(forceUpdate),
    userObject.deposits.getDepCol(forceUpdate),
    userObject.deposits.getUsdValCol(forceUpdate),
    userObject.deposits.getDurationCol(forceUpdate),
    userObject.deposits.getExtractableDepCol(forceUpdate),
    userObject.deposits.getWithdrawDepCol(forceUpdate),
    userObject.deposits.getRewardCol(forceUpdate),
    userObject.deposits.getExtractableRewardCol(forceUpdate),
    userObject.deposits.getWithdrawRewCol(forceUpdate),
    userObject.deposits.getUsdRewardCol(forceUpdate),
  ]);

  const icon_column_s = new Array(profiles.length);
  const asset_column_s = new Array(profiles.length);
  const in_wallet_column_s = new Array(profiles.length);
  const dep_column_s = new Array(profiles.length);
  const usd_val_column_s = new Array(profiles.length);
  const apy_column_s = new Array(profiles.length);
  const duration_col_s = new Array(profiles.length);
  const extractable_dep_col_s = new Array(profiles.length);
  const withdraw_dep_col_s = new Array(profiles.length);
  const reward_col_s = new Array(profiles.length);
  const extractable_reward_col_s = new Array(profiles.length);
  const withdraw_rew_col_s = new Array(profiles.length);
  const usd_reward_column_s = new Array(profiles.length);

  usd_val_only_col.sort((a, b) => toNumber(b.val) - toNumber(a.val));

  for (let i = 0; i < profiles?.length ?? 0; i++) {
    const old_index = usd_val_only_col[i].ori_index;

    icon_column_s[i] = icon_column[old_index];
    asset_column_s[i] = asset_column[old_index];
    in_wallet_column_s[i] = in_wallet_column[old_index];
    dep_column_s[i] = dep_column[old_index];
    usd_val_column_s[i] = usd_val_column[old_index];
    usd_reward_column_s[i] = usd_reward_column[old_index];
    apy_column_s[i] = apy_column[old_index];
    duration_col_s[i] = duration_col[old_index];
    extractable_dep_col_s[i] = extractable_dep_col[old_index];
    withdraw_dep_col_s[i] = withdraw_dep_col[old_index];
    reward_col_s[i] = reward_col[old_index];
    extractable_reward_col_s[i] = extractable_reward_col[old_index];
    withdraw_rew_col_s[i] = withdraw_rew_col[old_index];
  }

  for (let i = 0; i < profiles?.length ?? 0; i++) {
    // 0 means max amount for ERC20 compatible and ignored for ERC721
    if (isMobile) {
      const options = {
        icon_column: formatDataForMobile(icon_column_s[i]),
        asset_column: formatDataForMobile(asset_column_s[i]),
        usd_reward_column: {
          data: formatDataForMobile(usd_reward_column_s[i]),
          name: 'Extractable Yield USD value',
        },
        list: {
          in_wallet_column: {
            data: formatDataForMobile(in_wallet_column_s[i]),
            name: 'In wallet',
          },
          dep_column: {
            data: formatDataForMobile(dep_column_s[i]),
            name: 'Deposit',
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
            name: 'Current Yield',
          },
          extractable_reward_col: {
            data: formatDataForMobile(extractable_reward_col_s[i]),
            name: 'Extractable Yield',
          },

          withdraw_rew_col: {
            data: formatDataForMobile(withdraw_rew_col_s[i]),
            name: 'Withdraw yield',
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
            <div class="crypto-name crypto-style">${options.asset_column}</div>
            <div class="crypto-stat crypto-stat__percent crypto-stat__name">
              
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
              options.list.dep_column.data !== '-'
                ? `<div class="crypto-collateral crypto-stat__name">${options.list.dep_column.data} ${options.asset_column}`
                : ''
            }
            </div>
          </div>
        </div>
      </div>
      `);

      userObject.state.currentDeposits = [
        ...userObject.state.currentDeposits,
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
                link: 'dashboard-tab',
                text: 'Deposits',
              },
              'currentDeposits'
            ),
          options.asset_column
        );
      };

      wrapper.appendChild(mobileListEl);
    } else {
      html += '<tr class="table-row">';

      html += icon_column_s[i];

      html += asset_column_s[i];

      html += in_wallet_column_s[i];

      html += dep_column_s[i];

      html += usd_val_column_s[i];

      html += apy_column_s[i];

      html += duration_col_s[i];

      html += extractable_dep_col_s[i];

      html += withdraw_dep_col_s[i];

      html += reward_col_s[i];

      html += extractable_reward_col_s[i];

      html += withdraw_rew_col_s[i];

      html += '</tr>';
    }
  }
  html += '</tbody></table>';

  safeSetTableData('tokens_balance', isMobile ? '' : html, 'empty');

  if (callback) callback();
}

export async function deposit() {
  modalAddDeposit.isLoadingAfterConfirm();

  if (toNumber(userObject.state.selected_depprofile) === -1) {
    modalAddDeposit.isLoadedAfterConfirm(false);
    errorMsg('You need to select asset');
    return;
  }
  const dep_profile_id = userObject.state.selected_depprofile;
  let amount;
  let wei_val = 0;
  const token_ids = [];

  if (userObject.state.selected_depprofile_name === 'nft') {
    // errorMsg('currently not supported');
    // return;

    if (userObject.state.selectedNFTAssets.length === 0) {
      modalAddDeposit.isLoadedAfterConfirm(false);
      errorMsg('You need to select tokens');
      return;
    }

    try {
      const isNFTCollateralExists =
        await window.staking_smartcontract_reader.methods
          .isNFTCollateralExists(userObject.account)
          .call({
            from: userObject.account,
          });

      if (isNFTCollateralExists) {
        modalAddDeposit.isLoadedAfterConfirm(false);
        errorMsg(
          'You have NFT as collateral, please return credit to unfreeze it and you will be able to open new NFT deposit'
        );
        return;
      }
    } catch (error) {
      Error(error);
    }

    const isApproved = await window.cyclops_nft_smartcontract_reader.methods
      .isApprovedForAll(userObject.account, window.staking_contract_address)
      .call({
        from: userObject.account,
      });

    if (!isApproved) {
      modalAddDeposit.isLoadedAfterConfirm(false, false);
      errorMsg('You need to approve tokens move first');
      return;
    }

    amount = userObject.state.selectedNFTAssets.length;

    const MAX_AMOUNT_OF_NFT = 50;
    const amounTsPerDeposits = await window.staking_smartcontract_reader.methods
      .amountsPerDeposits(userObject.account)
      .call({
        from: userObject.account,
      });
    const nftIndex = amounTsPerDeposits[0].findIndex(
      (tokenId) => tokenId === NFT_TOKEN_ID
    );
    const amountNftInDeposit =
      nftIndex === -1 ? 0 : toNumber(amounTsPerDeposits[1][nftIndex]);

    if (amountNftInDeposit + amount > MAX_AMOUNT_OF_NFT) {
      modalAddDeposit.isLoadedAfterConfirm(false);
      errorMsg(
        `You have ${amountNftInDeposit} tokens on you NFT deposit now. You are adding ${amount} tokens. Total is ${
          amountNftInDeposit + amount
        }. You cannot create NFT deposit with token number above ${MAX_AMOUNT_OF_NFT} tokens.`
      );
      return;
    }

    for (let i = 0; i < userObject.state.selectedNFTAssets?.length ?? 0; i++) {
      token_ids.push(toNumber(userObject.state.selectedNFTAssets[i].t_id));
    }
  } else {
    amount = safeFloatToWei(
      document.getElementById('tokens_amount').value
    ).toString(); // wei
    if (
      toNumber(userObject.state.selected_depprofile_type) === NATIVE_ETHEREUM
    ) {
      wei_val = amount;

      const wb_bn = new window.BN(
        await window.web3js_reader.eth.getBalance(userObject.account)
      );
      const amount_bn = new window.BN(amount.toString());

      if (toNumber(wb_bn.cmp(amount_bn)) === -1) {
        modalAddDeposit.isLoadedAfterConfirm(false);
        errorMsg('You do not have enough BNB in your wallet');
        return;
      }
    } else {
      // ERC20 - check approval

      const token_contract = await new window.web3js.eth.Contract(
        erc20TokenContractAbi,
        userObject.state.selected_depprofile_token_address
      );
      const allow = new window.BN(
        await token_contract.methods
          .allowance(userObject.account, window.staking_contract_address)
          .call({
            from: userObject.account,
          })
      );

      const tokenAmountToApprove = new window.BN(amount.toString());
      // amount is already adjusted *10**18
      const calculatedApproveValue = tokenAmountToApprove;

      if (allow < calculatedApproveValue) {
        modalAddDeposit.isLoadedAfterConfirm(false);
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
      const amount_bn = new window.BN(amount.toString());

      if (toNumber(erc20_count_bn.cmp(amount_bn)) === -1) {
        modalAddDeposit.isLoadedAfterConfirm(false);
        errorMsg('You do not have enough tokens in your wallet');
        return;
      }
    }
  }

  resetMsg();

  initStakingContract(async (stakingContractInstance) => {
    if (amount === '0' || !amount) {
      errorMsg('Amount of asset must be greater than 0');
      return modalAddDeposit.isLoadedAfterConfirm(false);
    }

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
            modalAddDeposit.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async (confirmationNumber) => {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('make_deposit');
          modalAddDeposit.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modalAddDeposit.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
        throw new Error(error);
      });
  });
}

export async function approve_deposit() {
  modalAddDeposit.isLoadingAfterApprove();

  if (toNumber(userObject.state.selected_depprofile) === -1) {
    modalAddDeposit.isLoadedAfterApprove(false);
    errorMsg('You need to select asset');
    return;
  }

  if (userObject.state.selected_depprofile_name === 'nft') {
    const isApproved = await window.cyclops_nft_smartcontract_reader.methods
      .isApprovedForAll(userObject.account, window.staking_contract_address)
      .call({
        from: userObject.account,
      });

    if (isApproved) {
      modalAddDeposit.isLoadedAfterApprove();
      successMsg('Already approved');
    } else {
      // solidity: function setApprovalForAll(address _operator,bool _approved) external{}
      window.cyclops_nft_smartcontract.methods
        .setApprovalForAll(window.staking_contract_address, true)
        .send(
          {
            from: userObject.account,
            gasPrice: window.gp,
          },
          (error, txnHash) => {
            if (error) {
              modalAddDeposit.isLoadedAfterApprove(false);
              throw error;
            }
            output_transaction(txnHash);
          }
        )
        .on('confirmation', (confirmationNumber) => {
          if (toNumber(confirmationNumber) === 5) {
            successMsg('NFT move approved');
            modalAddDeposit.isLoadedAfterApprove();
          }
        })
        .catch((error) => {
          errorMsg('Smartcontract communication error');
          modalAddDeposit.isLoadedAfterApprove(false);
          throw new Error(error);
        });
    }
  } else {
    if (
      toNumber(userObject.state.selected_depprofile_type) === NATIVE_ETHEREUM
    ) {
      return; // no need..
    }

    const amount_wei = safeFloatToWei(
      document.getElementById('tokens_amount').value
    ).toString(); // wei
    approveTokenMove(
      userObject.state.selected_depprofile_token_address,
      amount_wei,
      window.staking_contract_address,
      modalAddDeposit
    );
  }
}

export function withdraw_reward(dep_id) {
  modalWithdrawYield.show();
  modalWithdrawYield.confirm.onclick = () => withdraw_reward_confirm(dep_id);
  return true;
}
export function withdraw_reward_confirm(dep_id) {
  modalWithdrawYield.isLoadingAfterConfirm();

  if (toNumber(userObject.deposits.rew_arr[2][dep_id]) === 0) {
    modalWithdrawYield.isLoadedAfterConfirm(false);
    infoMsg('Reward is not currently exractable');
    return;
  }

  initStakingContract(async (stakingContractInstance) => {
    stakingContractInstance.methods
      .withdrawDepositRewardById(userObject.account, dep_id)
      .send(
        {
          from: userObject.account,
          gasPrice: window.gp,
        },
        (error, txnHash) => {
          if (error) {
            modalWithdrawYield.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async (confirmationNumber) => {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('withdraw_deposit_reward');
          modalWithdrawYield.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modalWithdrawYield.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
        throw new Error(error);
      });
  });
}
export function withdraw_deposit(dep_id) {
  const depositAmount = userObject.deposits.am_arr[2][dep_id];
  const depositTokenId = userObject.deposits.am_arr[0][dep_id];

  const modalElement = modalWithdrawDeposit.modal;
  const allDepositsBtn = modalElement.querySelector('#withraw_dep_all');
  const partDepositsBtn = modalElement.querySelector('#withraw_dep_part');
  const withdrawInput = modalElement.querySelector('#withraw_dep_input');

  const isNft = isTokenNft(depositTokenId);

  const adj_am = isNft ? depositAmount : toTokens(depositAmount, 4);

  isNft
    ? partDepositsBtn.parentElement.classList.add('hidden')
    : partDepositsBtn.parentElement.classList.remove('hidden');

  withdrawInput.value = adj_am;
  allDepositsBtn.checked = true;
  allDepositsBtn.onchange = () => withdraw_deposit_all_btn(dep_id);
  partDepositsBtn.onchange = () => withdraw_deposit_part_btn(dep_id);
  modalWithdrawDeposit.confirm.onclick = () => withdraw_deposit_confirm(dep_id);

  modalWithdrawDeposit.show();
  return true;
}

function withdraw_deposit_confirm(dep_id) {
  if (toNumber(userObject.deposits.am_arr[2][dep_id]) === 0) {
    infoMsg('Deposit is not currently exractable');
    return;
  }

  const isWithdrawAllDeposit =
    document.getElementById('withraw_dep_all').checked;
  const depositValue = document.getElementById('withraw_dep_input').value;

  const withdraw_amount = isWithdrawAllDeposit
    ? 0
    : safeFloatToWei(depositValue);

  modalWithdrawDeposit.isLoadingAfterConfirm();

  initStakingContract(async (stakingContractInstance) => {
    stakingContractInstance.methods
      .withdrawDepositById(
        userObject.account,
        dep_id,
        withdraw_amount,
        isWithdrawAllDeposit
      )
      .send(
        {
          from: userObject.account,
          gasPrice: window.gp,
        },
        (error, txnHash) => {
          if (error) {
            modalWithdrawDeposit.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async (confirmationNumber) => {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('withdraw_deposit');
          modalWithdrawDeposit.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modalWithdrawDeposit.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
        throw new Error(error);
      });
  });
}

function withdraw_deposit_all_btn(dep_id) {
  const modalElement = modalWithdrawDeposit.modal;
  const withdrawInput = modalElement.querySelector('#withraw_dep_input');

  const adj_am = toTokens(userObject.deposits.am_arr[2][dep_id], 4);

  withdrawInput.value = adj_am;
  withdrawInput.readOnly = true;
}

function withdraw_deposit_part_btn() {
  const modalElement = modalWithdrawDeposit.modal;
  const withdrawInput = modalElement.querySelector('#withraw_dep_input');

  withdrawInput.value = 0;
  withdrawInput.readOnly = false;
}
