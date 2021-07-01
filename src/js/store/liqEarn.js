import { CACHE_TIME, PERIOD_LEN_FROM_CODE, PERIOD_NAME_FROM_CODE } from './constants';
import userObject from './userObject';
import { createCellWithIcon } from './utils';

export default {
  icon_column: [],
  asset_column: [],
  lockup_period: [],
  getIconAssetLockupCols_last_call: 0,
  async getIconAssetLockupCols(flag = false) {
    const currentTimestamp = Date.now();
    if (
      currentTimestamp > this.getIconAssetLockupCols_last_call + CACHE_TIME ||
      flag
    ) {
      this.getIconAssetLockupCols_last_call = currentTimestamp;

      this.icon_column.length = 0;
      this.asset_column.length = 0;
      this.lockup_period.length = 0;
      const { am_arr } = userObject.deposits;
      if (am_arr.length === 0) return [[], [], []];

      const { rew_arr } = userObject.deposits;

      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
          continue;
        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          this.icon_column.push(
            `<td class="table-cell">${createCellWithIcon(
              await tokenNameByLiqpairsTokenId(am_arr[0][i])
            )}</td>`
          );
          const aname = (await tokenNameByLiqpairsTokenId(am_arr[0][i])).slice(
            0,
            -3
          );
          this.asset_column.push(`<td class="table-cell">${aname}</td>`);
          const period_code = (
            await tokenNameByLiqpairsTokenId(am_arr[0][i])
          ).slice(-2);

          this.lockup_period.push(
            `<td class="table-cell">${PERIOD_NAME_FROM_CODE[period_code]}</td>`
          );
        }
      }
    }
    return [this.icon_column, this.asset_column, this.lockup_period];
  },

  apy_column: [],
  getApyCol_last_call: 0,
  async getApyCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getApyCol_last_call + CACHE_TIME || flag) {
      this.getApyCol_last_call = currentTimestamp;

      this.apy_column.length = 0;

      const { am_arr } = userObject.deposits;
      if (am_arr.length === 0) return [[], [], []];
      const { rew_arr } = userObject.deposits;

      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
          continue;
        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          // let apy = await window.usage_calc_smartcontract_reader.methods.calcDepApy(am_arr[0][i]).call({ from: userObject.account});
          const apy = await getAPY(am_arr[0][i]);
          const apy_adj = (apy / APY_SCALE) * 100;
          this.apy_column.push(
            `<td class="table-cell">${parseFloat(apy_adj)
              .toFixed(2)
              .toString()}</td>`
          );
        }
      }
    }
    return this.apy_column;
  },

  dep_column: [],
  getDepCol_last_call: 0,
  async getDepCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getDepCol_last_call + CACHE_TIME || flag) {
      this.getDepCol_last_call = currentTimestamp;

      this.dep_column.length = 0;

      const { am_arr } = userObject.deposits;
      const { rew_arr } = userObject.deposits;

      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
          continue;
        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          let txt = '';
          if (toNumber(am_arr[1][i]) > 0) {
            // let am = window.web3js_reader.utils.fromWei(am_arr[1][i], 'ether');
            const adj_am = toTokens(am_arr[1][i], 4); // ((parseFloat(am)).toFixed(4)).toString();
            txt = `<td class="table-cell">${adj_am}</td>`;
          } else {
            txt = '<td class="table-cell">-</td>';
          }
          this.dep_column.push(txt);
        }
      }
    }
    return this.dep_column;
  },

  usd_val_column: [],
  usd_val_only_col: [],
  getUsdValCol_last_call: 0,
  async getUsdValCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getUsdValCol_last_call + CACHE_TIME || flag) {
      this.getUsdValCol_last_call = currentTimestamp;

      this.usd_val_column.length = 0;
      this.usd_val_only_col.length = 0;

      const { am_arr } = userObject.deposits;
      const { rew_arr } = userObject.deposits;

      let index = 0;
      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
          continue;
        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          let txt = '';
          if (toNumber(am_arr[1][i]) > 0) {
            const am = await calcUSDValueOfDeposit(am_arr[1][i], i);
            this.usd_val_only_col.push({
              val: am,
              ori_index: index,
            });
            txt = `<td class="table-cell">${am}</td>`;
          } else {
            txt = '<td class="table-cell">-</td>';
            this.usd_val_only_col.push({
              val: 0,
              ori_index: index,
            });
          }
          this.usd_val_column.push(txt);
          index++;
        }
      }
    }
    return [this.usd_val_column, this.usd_val_only_col];
  },

  usd_reward_column: [],
  getUsdRewardCol_last_call: 0,
  async getUsdRewardCol(flag = false) {
    const currentTimestamp = Date.now();
    if (
      currentTimestamp > this.getUsdRewardCol_last_call + CACHE_TIME ||
      flag
    ) {
      this.getUsdRewardCol_last_call = currentTimestamp;

      this.usd_reward_column.length = 0;

      const { am_arr } = userObject.deposits;
      const { rew_arr } = userObject.deposits;

      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(rew_arr[1][i]) === 0) continue;

        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          let txt = '';

          if (toNumber(rew_arr[2][i]) > 0) {
            const am = await calcUSDValueOfDeposit(rew_arr[2][i], i);
            txt = `<td class="table-cell">${am}</td>`;
          } else {
            txt = '<td class="table-cell">-</td>';
          }

          this.usd_reward_column.push(txt);
        }
      }
    }
    return this.usd_reward_column;
  },

  duration_col: [],
  unlock_col: [],
  getDurationUnlockCol_last_call: 0,
  async getDurationUnlockCol(flag = false) {
    const currentTimestamp = Date.now();
    if (
      currentTimestamp > this.getDurationUnlockCol_last_call + CACHE_TIME ||
      flag
    ) {
      this.getDurationUnlockCol_last_call = currentTimestamp;

      this.duration_col.length = 0;
      this.unlock_col.length = 0;

      const { am_arr } = userObject.deposits;
      const { rew_arr } = userObject.deposits;

      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
          continue;
        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          let txt = '';
          let txt_unl = '';

          if (toNumber(am_arr[1][i]) > 0) {
            const days = await window.staking_smartcontract.methods
              .depositDays(userObject.account, i)
              .call({
                from: userObject.account,
              }); // duration

            txt = `<td class="table-cell">${!toNumber(days) ? '-' : days}</td>`;

            const period_code = (
              await tokenNameByLiqpairsTokenId(am_arr[0][i])
            ).slice(-2);

            const unl_period =
              PERIOD_LEN_FROM_CODE[period_code] - days.toString();
            let unl_period_txt;
            if (toNumber(unl_period) > 0) {
              unl_period_txt = unl_period.toString();
            } else {
              unl_period_txt = '-';
            }

            txt_unl = `<td class="table-cell">${unl_period_txt}</td>`;
          } else {
            txt = '<td class="table-cell">-</td>';
            txt_unl = '<td class="table-cell">-</td>';
          }

          this.duration_col.push(txt);
          this.unlock_col.push(txt_unl);
        }
      }
    }
    return [this.duration_col, this.unlock_col];
  },

  extractable_dep_col: [],
  getExtrDepCol_last_call: 0,
  async getExtrDepCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getExtrDepCol_last_call + CACHE_TIME || flag) {
      this.getExtrDepCol_last_call = currentTimestamp;

      this.extractable_dep_col.length = 0;

      const { am_arr } = userObject.deposits;
      const { rew_arr } = userObject.deposits;

      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
          continue;
        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          let txt = '';

          if (toNumber(am_arr[2][i]) > 0) {
            // let am = window.web3js_reader.utils.fromWei(am_arr[2][i], 'ether');
            const adj_am = toTokens(am_arr[2][i], 4); // ((parseFloat(am)).toFixed(4)).toString();
            txt = `<td class="table-cell">${adj_am}</td>`;
          } else {
            txt = '<td class="table-cell">-</td>';
          }

          this.extractable_dep_col.push(txt);
        }
      }
    }
    return this.extractable_dep_col;
  },

  withdraw_dep_col: [],
  getWithdrawDepCol_last_call: 0,
  async getWithdrawDepCol(flag = false) {
    const currentTimestamp = Date.now();
    if (
      currentTimestamp > this.getWithdrawDepCol_last_call + CACHE_TIME ||
      flag
    ) {
      this.getWithdrawDepCol_last_call = currentTimestamp;

      this.withdraw_dep_col.length = 0;

      const { am_arr } = userObject.deposits;
      const { rew_arr } = userObject.deposits;

      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
          continue;
        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          let txt = '';

          if (toNumber(am_arr[2][i]) > 0) {
            if (isMobile) {
              txt = `<td class="table-cell">
                    <div onclick="openTab(event, 'withdraw_deposit-tab', () => withdraw_deposit(${i.toString()}))" class="link-arrow">
                      <img src="./images/link-arrow.svg" alt="#">
                    </div>
                  </td>`;
            } else {
              txt = `<td class="table-cell">${createTableBtnWithIcon(
                'withdraw',
                'Withdraw deposit',
                `withdraw_deposit(${i.toString()})`
              )}</td>`;
            }
          } else {
            txt = '<td class="table-cell">-</td>';
          }

          this.withdraw_dep_col.push(txt);
        }
      }
    }
    return this.withdraw_dep_col;
  },

  withdraw_dep_inputs_col: [],
  getWithdrawDepInputsCol_last_call: 0,
  async getWithdrawDepInputsCol(flag = false) {
    const currentTimestamp = Date.now();
    if (
      currentTimestamp > this.getWithdrawDepInputsCol_last_call + CACHE_TIME ||
      flag
    ) {
      this.getWithdrawDepInputsCol_last_call = currentTimestamp;

      this.withdraw_dep_inputs_col.length = 0;

      const { am_arr } = userObject.deposits;
      const { rew_arr } = userObject.deposits;

      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
          continue;
        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          let txt = '';

          if (toNumber(am_arr[2][i]) > 0) {
            // let am = window.web3js_reader.utils.fromWei(am_arr[2][i], 'ether');
            const adj_am = toTokens(am_arr[2][i], 4); // ((parseFloat(am)).toFixed(4)).toString();

            // let rew_am = window.web3js_reader.utils.fromWei(rew_arr[1][i], 'ether');
            // let adj_rew_am =  ((parseFloat(rew_am)).toFixed(4)).toString();
            txt =
              '<td class="withdraw_params table-cell" style="display:none">';
            txt += `<button id="withraw_dep_all${i.toString()}" class="transparent_button transparent_button_pressed withdraw_dep_input" style="display:none;width: 5vw" onclick="withdraw_deposit_all_btn(${i.toString()})">All</button>`;
            txt += `<button id="withraw_dep_part${i.toString()}" class="transparent_button withdraw_dep_input" style="display:none;width: 5vw" onclick="withdraw_deposit_part_btn(${i.toString()})">Part</button>`;
            txt += `<input class="withdraw_dep_input" id="withraw_dep_input${i.toString()}" type="number" min="0.1" step="0.1" max="${adj_am}" class="form-control" aria-label="" `;
            txt += ` value="${adj_am}"`;
            txt +=
              ' style="display:none; color: white; background-color: black !important; border-color: white !important; width: 8vw;" >';
            txt += '<div style="display:block; margin-top: 1vh;"></div>';
            // txt += '<span id="withraw_dep_rew'+i.toString()+'" class="withdraw_dep_input">reward to be extracted: '+adj_rew_am+'</span>';
            txt += '<div style="display:block; margin-top: 1vh;"></div>';
            txt += `<button id="withraw_dep_confirm${i.toString()}" class="transparent_button withdraw_dep_input" style="display:none;width: 10vw" onclick="withdraw_deposit_confirm(${i.toString()})">Confirm</button>`;
            txt += '</td>';
          } else {
            txt =
              '<td class="withdraw_params table-cell" style="display:none">-</td>';
          }

          this.withdraw_dep_inputs_col.push(txt);
        }
      }
    }
    return this.withdraw_dep_inputs_col;
  },

  reward_col: [],
  getRewardCol_last_call: 0,
  async getRewardCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getRewardCol_last_call + CACHE_TIME || flag) {
      this.getRewardCol_last_call = currentTimestamp;

      this.reward_col.length = 0;

      const { am_arr } = userObject.deposits;
      const { rew_arr } = userObject.deposits;

      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
          continue;
        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          let txt = '';

          if (toNumber(rew_arr[1][i]) > 0) {
            // let adj = window.web3js_reader.utils.fromWei(rew_arr[1][i], 'ether');
            const adj_str = toTokens(rew_arr[1][i], 4); // ((parseFloat(adj)).toFixed(4)).toString();
            txt = `<td class="table-cell">${adj_str}</td>`;
          } else {
            txt = '<td class="table-cell">-</td>';
          }

          this.reward_col.push(txt);
        }
      }
    }
    return this.reward_col;
  },

  extractable_reward_col: [],
  getExtractableRewardCol_last_call: 0,
  async getExtractableRewardCol(flag = false) {
    const currentTimestamp = Date.now();
    if (
      currentTimestamp > this.getExtractableRewardCol_last_call + CACHE_TIME ||
      flag
    ) {
      this.getExtractableRewardCol_last_call = currentTimestamp;
      this.extractable_reward_col.length = 0;

      const { am_arr } = userObject.deposits;
      const { rew_arr } = userObject.deposits;

      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
          continue;
        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          let txt = '';

          if (toNumber(rew_arr[2][i]) > 0) {
            // let adj = window.web3js_reader.utils.fromWei(rew_arr[2][i], 'ether');
            const adj_str = toTokens(rew_arr[2][i], 4); // ((parseFloat(adj)).toFixed(4)).toString();
            txt = `<td class="table-cell">${adj_str}</td>`;
          } else {
            txt = '<td class="table-cell">-</td>';
          }

          this.extractable_reward_col.push(txt);
        }
      }
    }
    return this.extractable_reward_col;
  },

  withdraw_rew_col: [],
  getWithdrawRewCol_last_call: 0,
  async getWithdrawRewCol(flag = false) {
    const currentTimestamp = Date.now();
    if (
      currentTimestamp > this.getWithdrawRewCol_last_call + CACHE_TIME ||
      flag
    ) {
      this.getWithdrawRewCol_last_call = currentTimestamp;

      this.withdraw_rew_col.length = 0;

      const { am_arr } = userObject.deposits;
      const { rew_arr } = userObject.deposits;

      for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
        if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
          continue;
        if (
          toNumber(await depTypeByLiqpairsTokenId(am_arr[0][i])) === UNISWAP_PAIR
        ) {
          let txt = '';

          if (toNumber(rew_arr[2][i]) > 0) {
            if (isMobile) {
              txt = `<td class="table-cell">
                    <div onclick="openTab(event, 'withdraw_reward-tab', () => withdraw_reward(${i.toString()}))" class="link-arrow">
                      <img src="./images/link-arrow.svg" alt="#">
                    </div>
                  </td>`;
            } else {
              txt = `<td class="table-cell">${createTableBtnWithIcon(
                'withdraw',
                'Withdraw yield',
                `withdraw_reward(${i.toString()})`
              )}</td>`;
            }
          } else {
            txt = '<td class="table-cell">-</td>';
          }

          this.withdraw_rew_col.push(txt);
        }
      }
    }
    return this.withdraw_rew_col;
  },
};
