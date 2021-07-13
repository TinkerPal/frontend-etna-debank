/* eslint-disable camelcase */
import { APY_SCALE } from '../constants';
import { isMobile } from '../constants/env';
import {
  getAPY,
  getPriceOfTokens,
  getWalletBalance,
  isTokenNft,
  toNumber,
  toTokens,
} from '../utils';
import { CACHE_TIME } from './constants';
import { userObject } from './userObject';
import {
  calcUSDValueOfDeposit,
  createCellWithIcon,
  createTableBtnWithIcon,
} from './utils';

export default {
  icon_column: [],
  assets_column: [],
  getIconAssetsCols_last_call: 0,
  async getIconAssetsCols(flag = false) {
    const currentTimestamp = Date.now();
    if (
      currentTimestamp > this.getIconAssetsCols_last_call + CACHE_TIME ||
      flag
    ) {
      this.getIconAssetsCols_last_call = currentTimestamp;
      this.icon_column.length = 0;
      this.assets_column.length = 0;
      const profiles = userObject.deposit_profiles;

      profiles.forEach((token) => {
        this.icon_column.push(
          `<td class="table-cell">${createCellWithIcon(token.p_name)}</td>`
        );
        this.assets_column.push(`<td class="table-cell">${token.p_name}</td>`);
      });
    }
    return [this.icon_column, this.assets_column];
  },

  liq_arr: [],
  dep_arr: [],
  am_arr: [],
  getAmArr_last_call: 0,
  async getAmArr() {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getAmArr_last_call + CACHE_TIME) {
      this.getAmArr_last_call = currentTimestamp;

      this.am_arr = await window.staking_smartcontract.methods
        .amountsPerDeposits(userObject.account)
        .call({
          from: userObject.account,
        });

      if (!Array.isArray(this.am_arr)) {
        this.am_arr = Object.values(this.am_arr);
      }
      const depositTokens = userObject.deposit_profiles.map(
        (token) => token.p_id
      );

      const depositTokensindex = [];
      this.am_arr[0].forEach((token, i) => {
        if (depositTokens.includes(token)) {
          depositTokensindex.push(i);
        }
      });

      this.am_arr.forEach((arr) => {
        this.dep_arr.push(
          arr.filter((array, i) => depositTokensindex.includes(i))
        );
        this.liq_arr.push(
          arr.filter((array, i) => !depositTokensindex.includes(i))
        );
      });
    }
    return this.am_arr;
  },

  rew_arr: [],
  getRewArr_last_call: 0,
  async getRewArr() {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getRewArr_last_call + CACHE_TIME) {
      this.getRewArr_last_call = currentTimestamp;

      this.rew_arr = await window.staking_smartcontract.methods
        .rewardsPerDeposits(userObject.account)
        .call({
          from: userObject.account,
        });

      if (!Array.isArray(this.rew_arr)) {
        this.rew_arr = Object.values(this.rew_arr);
      }
    }
    return this.rew_arr;
  },

  apy_column: [],
  getApyCol_last_call: 0,
  async getApyCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getApyCol_last_call + CACHE_TIME || flag) {
      this.getApyCol_last_call = currentTimestamp;

      this.apy_column.length = 0;
      const profiles = userObject.deposit_profiles;

      const apyColumnPromise = [];
      profiles.forEach((token) => {
        apyColumnPromise.push(getAPY(token.p_id));
      });
      const apyColumnData = await Promise.all(apyColumnPromise);

      apyColumnData.forEach((apy) => {
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

  in_wallet_arr: [],
  in_wallet_column: [],
  getInWalletCol_last_call: 0,
  async getInWalletCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getInWalletCol_last_call + CACHE_TIME || flag) {
      this.getInWalletCol_last_call = currentTimestamp;

      this.in_wallet_column.length = 0;
      this.in_wallet_arr.length = 0;

      const tokenCountPromise = [];
      userObject.deposit_profiles.forEach((token) => {
        tokenCountPromise.push(getWalletBalance(token.p_id));
      });
      const tokensCount = await Promise.all(tokenCountPromise);

      tokensCount.forEach((amount) => {
        this.in_wallet_column.push(
          `<td class="table-cell">${toNumber(amount) > 0 ? amount : '-'}</td>`
        );
        this.in_wallet_arr.push(amount);
      });
    }

    return this.in_wallet_column;
  },

  dep_column: [],
  getDepCol_last_call: 0,
  async getDepCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getDepCol_last_call + CACHE_TIME || flag) {
      this.getDepCol_last_call = currentTimestamp;

      this.dep_column.length = 0;

      const profiles = userObject.deposit_profiles;
      const { am_arr } = this;

      profiles.forEach((token) => {
        const depositTokenId = am_arr[0].find(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );

        if (depositTokenId) {
          const i = am_arr[0].indexOf(depositTokenId);

          this.dep_column.push(
            `<td class="table-cell">${
              isTokenNft(depositTokenId)
                ? am_arr[1][i]
                : toTokens(am_arr[1][i], 4)
            }</td>`
          );
        } else {
          this.dep_column.push(`<td class="table-cell">-</td>`);
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

      const profiles = userObject.deposit_profiles;
      const { dep_arr } = this;
      const { am_arr } = this;

      const calcUsdValuePromise = [];
      profiles.forEach((token) => {
        const depositTokenId = am_arr[0].find(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );

        if (depositTokenId) {
          const i = am_arr[0].indexOf(depositTokenId);

          calcUsdValuePromise.push(calcUSDValueOfDeposit(am_arr[1][i], i));
        }
      });
      const calcUsdValueData = await Promise.all(calcUsdValuePromise);

      profiles.forEach((token, profileIndex) => {
        const depositTokenIndex = dep_arr[0].findIndex(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );

        if (depositTokenIndex !== -1) {
          const usdValue = calcUsdValueData[depositTokenIndex];

          this.usd_val_only_col.push({
            val: usdValue,
            ori_index: profileIndex,
          });

          this.usd_val_column.push(`<td class="table-cell">${usdValue}</td>`);
        } else {
          this.usd_val_only_col.push({
            val: 0,
            ori_index: profileIndex,
          });

          this.usd_val_column.push(`<td class="table-cell">-</td>`);
        }
      });
    }
    return [this.usd_val_column, this.usd_val_only_col];
  },

  duration_col: [],
  getDurationCol_last_call: 0,
  async getDurationCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getDurationCol_last_call + CACHE_TIME || flag) {
      this.getDurationCol_last_call = currentTimestamp;

      this.duration_col.length = 0;
      const profiles = userObject.deposit_profiles;
      const { am_arr } = this;
      const { dep_arr } = this;

      const depositDaysPromise = [];
      profiles.forEach((token) => {
        const depositTokenIndex = am_arr[0].findIndex(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );

        if (depositTokenIndex !== -1) {
          depositDaysPromise.push(
            toNumber(am_arr[1][depositTokenIndex]) > 0
              ? window.staking_smartcontract.methods
                  .depositDays(userObject.account, depositTokenIndex)
                  .call({
                    from: userObject.account,
                  })
              : 0
          );
        }
      });
      const depositDaysData = await Promise.all(depositDaysPromise);

      profiles.forEach((token) => {
        const depositTokenIndex = dep_arr[0].findIndex(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );

        const days = depositDaysData[depositTokenIndex];

        this.duration_col.push(
          `<td class="table-cell">${toNumber(days) > 0 ? days : '-'}</td>`
        );
      });
    }
    return this.duration_col;
  },

  extractable_dep_col: [],
  getExtractableDepCol_last_call: 0,
  async getExtractableDepCol(flag = false) {
    const currentTimestamp = Date.now();
    if (
      currentTimestamp > this.getExtractableDepCol_last_call + CACHE_TIME ||
      flag
    ) {
      this.getExtractableDepCol_last_call = currentTimestamp;

      this.extractable_dep_col.length = 0;
      const profiles = userObject.deposit_profiles;
      const { am_arr } = this;

      profiles.forEach((token) => {
        const depositTokenId = am_arr[0].find(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );
        const isNft = isTokenNft(token.p_id);

        if (depositTokenId) {
          const i = am_arr[0].indexOf(depositTokenId);

          this.extractable_dep_col.push(
            `<td class="table-cell">${
              isNft ? am_arr[2][i] : toTokens(am_arr[2][i], 4)
            }</td>`
          );
        } else {
          this.extractable_dep_col.push(`<td class="table-cell">-</td>`);
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
      const profiles = userObject.deposit_profiles;
      const { am_arr } = this;

      profiles.forEach((token) => {
        const depositTokenId = am_arr[0].find(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );

        if (depositTokenId) {
          const i = am_arr[0].indexOf(depositTokenId);
          const hasDeposit = toNumber(am_arr[2][i]) > 0;

          if (hasDeposit) {
            this.withdraw_dep_col.push(`
              <td class="table-cell">
                ${
                  isMobile
                    ? `<div onclick="openTab(event, 'withdraw_deposit-tab', () => withdraw_deposit(${i.toString()}))" class="link-arrow">
                        <img src="./images/link-arrow.svg" alt="#">
                      </div>`
                    : `${createTableBtnWithIcon(
                        'withdraw',
                        'Withdraw deposit',
                        `withdraw_deposit(${i.toString()})`
                      )}`
                }
              </td>
            `);
          } else {
            this.withdraw_dep_col.push(`<td class="table-cell">-</td>`);
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
      const profiles = userObject.deposit_profiles;
      const { rew_arr } = this;

      profiles.forEach((token) => {
        const depositTokenId = rew_arr[0].find(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );

        if (depositTokenId) {
          const i = rew_arr[0].indexOf(depositTokenId);

          this.reward_col.push(
            `<td class="table-cell">${
              toNumber(rew_arr[1][i]) > 0 ? toTokens(rew_arr[1][i], 4) : '-'
            }</td>`
          );
        } else {
          this.reward_col.push(`<td class="table-cell">-</td>`);
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
      const profiles = userObject.deposit_profiles;
      const { rew_arr } = this;

      profiles.forEach((token) => {
        const depositTokenId = rew_arr[0].find(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );

        if (depositTokenId) {
          const i = rew_arr[0].indexOf(depositTokenId);

          this.extractable_reward_col.push(
            `<td class="table-cell">${
              toNumber(rew_arr[2][i]) > 0 ? toTokens(rew_arr[2][i], 4) : '-'
            }</td>`
          );
        } else {
          this.extractable_reward_col.push(`<td class="table-cell">-</td>`);
        }
      });
    }
    return this.extractable_reward_col;
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

      const profiles = userObject.deposit_profiles;
      const { rew_arr } = this;

      const usdRewardPromise = [];
      profiles.forEach((token) => {
        const depositTokenId = rew_arr[0].find(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );

        if (depositTokenId) {
          const i = rew_arr[0].indexOf(depositTokenId);

          usdRewardPromise.push(
            getPriceOfTokens(rew_arr[2][i], token.p_id, true)
          );
        }
      });
      const usdRewardData = await Promise.all(usdRewardPromise);

      profiles.forEach((token) => {
        const depositTokenIndex = rew_arr[0].findIndex(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );

        if (depositTokenIndex !== -1) {
          const usdReward = usdRewardData[depositTokenIndex];
          this.usd_reward_column.push(
            `<td class="table-cell">${usdReward}</td>`
          );
        } else {
          this.usd_reward_column.push(`td class="table-cell">-</td>`);
        }
      });
    }
    return this.usd_reward_column;
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
      const profiles = userObject.deposit_profiles;
      const { rew_arr } = this;

      profiles.forEach((token) => {
        const depositTokenId = rew_arr[0].find(
          (tokenId) => toNumber(tokenId) === toNumber(token.p_id)
        );

        if (depositTokenId) {
          const i = rew_arr[0].indexOf(depositTokenId);
          const hasReward = toNumber(rew_arr[2][i]) > 0;

          if (hasReward) {
            this.withdraw_rew_col.push(`
              <td class="table-cell">
                ${
                  isMobile
                    ? `<div onclick="openTab(event, 'withdraw_reward-tab', () => withdraw_reward(${i.toString()}))" class="link-arrow">
                        <img src="./images/link-arrow.svg" alt="#">
                      </div>`
                    : `${createTableBtnWithIcon(
                        'withdraw',
                        'Withdraw yield',
                        `withdraw_reward(${i.toString()})`
                      )}`
                }
              </td>
            `);
          }
        } else {
          this.withdraw_rew_col.push(`<td class="table-cell">-</td>`);
        }
      });
    }
    return this.withdraw_rew_col;
  },
};
