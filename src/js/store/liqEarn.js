/* eslint-disable camelcase */
import { APY_SCALE } from '../constants';
import { isMobile } from '../constants/env';
import { calcUSDValueOfDeposit } from '..';
import {
  getAPY,
  isTokenLiqPairs,
  tokenNameByLiqpairsTokenId,
  toNumber,
  toTokens,
} from '../utils';
import {
  CACHE_TIME,
  PERIOD_LEN_FROM_CODE,
  PERIOD_NAME_FROM_CODE,
} from './constants';
import userObject from '.';
import { createCellWithIcon, createTableBtnWithIcon } from './utils';

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

      am_arr[0].forEach((depTokenId, i) => {
        const isLiqPairs = isTokenLiqPairs(depTokenId);
        if (isLiqPairs) {
          const hasDepAmount = toNumber(am_arr[1][i]) > 0;
          const hasDepYield = toNumber(rew_arr[1][i]) > 0;

          if (hasDepAmount || hasDepYield) {
            const tokenName = tokenNameByLiqpairsTokenId(depTokenId);
            const aname = tokenName.slice(0, -3);
            const periodCode = tokenName.slice(-2);

            this.icon_column.push(
              `<td class="table-cell">${createCellWithIcon(tokenName)}</td>`
            );
            this.asset_column.push(`<td class="table-cell">${aname}</td>`);
            this.lockup_period.push(
              `<td class="table-cell">${PERIOD_NAME_FROM_CODE[periodCode]}</td>`
            );
          }
        }
      });
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

      const getAPYPromise = [];
      am_arr[0].forEach((depTokenId, i) => {
        const isLiqPairs = isTokenLiqPairs(depTokenId);
        if (isLiqPairs) {
          const hasDepAmount = toNumber(am_arr[1][i]) > 0;
          const hasDepYield = toNumber(rew_arr[1][i]) > 0;

          if (hasDepAmount || hasDepYield) {
            getAPYPromise.push(getAPY(am_arr[0][i]));
          }
        }
      });
      const getAPYArray = await Promise.all(getAPYPromise);

      getAPYArray.forEach((apy) => {
        const apyAdj = (toNumber(apy) / APY_SCALE) * 100;
        this.apy_column.push(
          `<td class="table-cell">${parseFloat(apyAdj)
            .toFixed(2)
            .toString()}</td>`
        );
      });
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

      am_arr[0].forEach((depTokenId, i) => {
        const isLiqPairs = isTokenLiqPairs(depTokenId);
        if (isLiqPairs) {
          const hasDepAmount = toNumber(am_arr[1][i]) > 0;
          const hasDepYield = toNumber(rew_arr[1][i]) > 0;

          if (hasDepAmount || hasDepYield) {
            this.dep_column.push(
              `<td class="table-cell">${
                hasDepAmount ? toTokens(am_arr[1][i], 4) : '-'
              }</td>`
            );
          }
        }
      });
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

      const calcUSDValueOfDepositPromise = [];
      am_arr[0].forEach((depTokenId, i) => {
        const isLiqPairs = isTokenLiqPairs(depTokenId);
        if (isLiqPairs) {
          const depAmount = am_arr[1][i];

          const hasDepAmount = toNumber(depAmount) > 0;
          const hasDepYield = toNumber(rew_arr[1][i]) > 0;

          if (hasDepAmount || hasDepYield) {
            calcUSDValueOfDepositPromise.push(
              hasDepAmount ? calcUSDValueOfDeposit(depAmount, i) : 0
            );
          }
        }
      });
      const calcUSDValueOfDepositArray = await Promise.all(
        calcUSDValueOfDepositPromise
      );

      calcUSDValueOfDepositArray.forEach((USDValue, i) => {
        this.usd_val_only_col.push({
          val: USDValue,
          ori_index: i,
        });
        this.usd_val_column.push(`<td class="table-cell">${USDValue}</td>`);
      });
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

      const calcUSDValueOfYieldPromise = [];
      am_arr[0].forEach((depTokenId, i) => {
        const isLiqPairs = isTokenLiqPairs(depTokenId);
        if (isLiqPairs) {
          const depYield = rew_arr[1][i];

          const hasDepYield = toNumber(depYield) > 0;

          if (hasDepYield) {
            calcUSDValueOfYieldPromise.push(
              toNumber(rew_arr[2][i]) > 0
                ? calcUSDValueOfDeposit(depYield, i)
                : 0
            );
          }
        }
      });
      const calcUSDValueOfYieldArray = await Promise.all(
        calcUSDValueOfYieldPromise
      );

      calcUSDValueOfYieldArray.forEach((USDValue) => {
        this.usd_reward_column.push(`<td class="table-cell">${USDValue}</td>`);
      });
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

      const depositDaysPromise = [];
      am_arr[0].forEach((depTokenId, i) => {
        const isLiqPairs = isTokenLiqPairs(depTokenId);
        if (isLiqPairs) {
          const depAmount = am_arr[1][i];
          const depYield = rew_arr[1][i];

          const hasDepYield = toNumber(depYield) > 0;
          const hasDepAmount = toNumber(depAmount) > 0;

          if (hasDepYield || hasDepAmount) {
            depositDaysPromise.push(
              hasDepAmount
                ? window.staking_smartcontract.methods
                    .depositDays(userObject.account, i)
                    .call({
                      from: userObject.account,
                    })
                : 0
            );
          }
        }
      });
      const depositDaysArray = await Promise.all(depositDaysPromise);

      depositDaysArray.forEach((day, i) => {
        const periodCode = tokenNameByLiqpairsTokenId(am_arr[0][i]).slice(-2);
        const dayInNumber = toNumber(day);

        const unlockPeriod = PERIOD_LEN_FROM_CODE[periodCode] - dayInNumber;

        this.duration_col.push(
          `<td class="table-cell">${dayInNumber > 0 ? dayInNumber : '-'}</td>`
        );
        this.unlock_col.push(
          `<td class="table-cell">${unlockPeriod > 0 ? unlockPeriod : '-'}</td>`
        );
      });
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

      am_arr[0].forEach((depTokenId, i) => {
        const isLiqPairs = isTokenLiqPairs(depTokenId);

        if (isLiqPairs) {
          const hasDepAmount = toNumber(am_arr[1][i]) > 0;
          const hasDepYield = toNumber(rew_arr[1][i]) > 0;

          const hasExtractableDepAmount = toNumber(am_arr[2][i]) > 0;

          if (hasDepAmount || hasDepYield) {
            this.extractable_dep_col.push(
              `<td class="table-cell">${
                hasExtractableDepAmount ? toTokens(am_arr[2][i], 4) : '-'
              }</td>`
            );
          }
        }
      });
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

      am_arr[0].forEach((depTokenId, i) => {
        const isLiqPairs = isTokenLiqPairs(depTokenId);

        if (isLiqPairs) {
          const hasDepAmount = toNumber(am_arr[1][i]) > 0;
          const hasDepYield = toNumber(rew_arr[1][i]) > 0;

          const hasExtractableDepAmount = toNumber(am_arr[2][i]) > 0;

          if (hasDepAmount || hasDepYield) {
            this.withdraw_dep_col.push(
              `<td class="table-cell">${
                hasExtractableDepAmount
                  ? `${
                      isMobile
                        ? `<td class="table-cell">
                            <div onclick="openTab(event, 'withdraw_deposit-tab', () => withdraw_deposit(${i.toString()}))" class="link-arrow">
                              <img src="./images/link-arrow.svg" alt="#">
                            </div>
                          </td>`
                        : `<td class="table-cell">${createTableBtnWithIcon(
                            'withdraw',
                            'Withdraw deposit',
                            `withdraw_deposit(${i.toString()})`
                          )}</td>`
                    }`
                  : '-'
              }</td>`
            );
          }
        }
      });
    }
    return this.withdraw_dep_col;
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

      am_arr[0].forEach((depTokenId, i) => {
        const isLiqPairs = isTokenLiqPairs(depTokenId);

        if (isLiqPairs) {
          const depYield = rew_arr[1][i];

          const hasDepAmount = toNumber(am_arr[1][i]) > 0;
          const hasDepYield = toNumber(depYield) > 0;

          if (hasDepAmount || hasDepYield) {
            this.reward_col.push(
              `<td class="table-cell">${
                hasDepYield ? toTokens(depYield, 4) : '-'
              }</td>`
            );
          }
        }
      });
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

      am_arr[0].forEach((depTokenId, i) => {
        const isLiqPairs = isTokenLiqPairs(depTokenId);

        if (isLiqPairs) {
          const extractableDepYield = rew_arr[2][i];

          const hasDepAmount = toNumber(am_arr[1][i]) > 0;
          const hasDepYield = toNumber(rew_arr[1][i]) > 0;
          const hasExtractableDepYield = toNumber(extractableDepYield) > 0;

          if (hasDepAmount || hasDepYield) {
            this.extractable_reward_col.push(
              `<td class="table-cell">${
                hasExtractableDepYield ? toTokens(extractableDepYield, 4) : '-'
              }</td>`
            );
          }
        }
      });
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

      am_arr[0].forEach((depTokenId, i) => {
        const isLiqPairs = isTokenLiqPairs(depTokenId);

        if (isLiqPairs) {
          const extractableDepYield = rew_arr[2][i];

          const hasDepAmount = toNumber(am_arr[1][i]) > 0;
          const hasDepYield = toNumber(rew_arr[1][i]) > 0;
          const hasExtractableDepYield = toNumber(extractableDepYield) > 0;

          if (hasDepAmount || hasDepYield) {
            this.withdraw_rew_col.push(
              `<td class="table-cell">${
                hasExtractableDepYield
                  ? `${
                      isMobile
                        ? `<td class="table-cell">
                            <div onclick="openTab(event, 'withdraw_reward-tab', () => withdraw_reward(${i.toString()}))" class="link-arrow">
                              <img src="./images/link-arrow.svg" alt="#">
                            </div>
                          </td>`
                        : `<td class="table-cell">${createTableBtnWithIcon(
                            'withdraw',
                            'Withdraw yield',
                            `withdraw_reward(${i.toString()})`
                          )}</td>`
                    }`
                  : '-'
              }</td>`
            );
          }
        }
      });
    }
    return this.withdraw_rew_col;
  },
};
