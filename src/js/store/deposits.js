import { CACHE_TIME } from './constants';
import userObject from './userObject';
import { createCellWithIcon } from './utils';

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

      for (let i = 0; i < profiles?.length ?? 0; i++) {
        this.icon_column.push(
          `<td class="table-cell">${createCellWithIcon(
            profiles[i].p_name
          )}</td>`
        );
        this.assets_column.push(
          `<td class="table-cell">${profiles[i].p_name}</td>`
        );
      }
    }
    return [this.icon_column, this.assets_column];
  },

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

      for (let i = 0; i < profiles?.length ?? 0; i++) {
        const apy = await getAPY(profiles[i].p_id);
        const apy_adj = (apy / APY_SCALE) * 100;

        this.apy_column.push(
          `<td class="table-cell">${parseFloat(apy_adj)
            .toFixed(2)
            .toString()}</td>`
        );
      }
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
        const { p_id, p_tok_addr } = token;

        if (isTokenNft(p_id)) {
          tokenCountPromise.push(
            window.cyclops_nft_smartcontract_reader.methods
              .balanceOf(userObject.account)
              .call({
                from: userObject.account,
              })
          );
        } else {
          tokenCountPromise.push(getWalletBalanceStr(p_tok_addr));
        }
      });
      const tokensCount = await Promise.all(tokenCountPromise);

      tokensCount.forEach((amount) => {
        this.in_wallet_column.push(
          `<td class="rounded-l-lg table-cell">${
            toNumber(amount) > 0 ? amount : '-'
          }</td>`
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

      for (let j = 0; j < profiles?.length ?? 0; j++) {
        let txt = '';
        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[0][i]) === toNumber(profiles[j].p_id)) {
            // found
            if (toNumber(profiles[j].p_dep_type) === ERC721_TOKEN) {
              // amount
              txt = `<td class="table-cell">${am_arr[1][i]}</td>`;
            } else {
              // let am = window.web3js_reader.utils.fromWei(am_arr[1][i], 'ether');
              const adj_am = toTokens(am_arr[1][i], 4); // ((parseFloat(am)).toFixed(4)).toString();
              txt = `<td class="table-cell">${adj_am}</td>`;
            }
            break;
          }
        }
        if (!txt) txt = '<td class="table-cell">-</td>';
        this.dep_column.push(txt);
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

      const profiles = userObject.deposit_profiles;
      const { am_arr } = this;

      for (let j = 0; j < profiles?.length ?? 0; j++) {
        let txt = '';
        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[0][i]) === toNumber(profiles[j].p_id)) {
            // found

            const am = await calcUSDValueOfDeposit(am_arr[1][i], i);
            this.usd_val_only_col.push({
              val: am,
              ori_index: j,
            });
            txt = `<td class="table-cell">${am}</td>`;

            break;
          }
        }
        if (!txt) {
          txt = '<td class="table-cell">-</td>';
          this.usd_val_only_col.push({
            val: 0,
            ori_index: j,
          });
        }

        this.usd_val_column.push(txt);
      }
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

      for (let j = 0; j < profiles?.length ?? 0; j++) {
        let txt = '';
        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[0][i]) === toNumber(profiles[j].p_id)) {
            if (toNumber(am_arr[1][i]) === 0) {
              txt = '<td class="table-cell">-</td>';
            } else {
              const days = await window.staking_smartcontract.methods
                .depositDays(userObject.account, i)
                .call({
                  from: userObject.account,
                }); // duration
              txt = `<td class="table-cell">${days.toString()}</td>`;
            }
            break;
          }
        }
        if (!txt) txt = '<td class="table-cell">-</td>';
        this.duration_col.push(txt);
      }
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

      for (let j = 0; j < profiles?.length ?? 0; j++) {
        let txt = '';
        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[0][i]) === toNumber(profiles[j].p_id)) {
            // found
            if (toNumber(profiles[j].p_dep_type) === ERC721_TOKEN) {
              // amount
              txt = `<td class="table-cell">${am_arr[2][i]}</td>`;
            } else {
              // let am = window.web3js_reader.utils.fromWei(am_arr[2][i], 'ether');
              const adj_am = toTokens(am_arr[2][i], 4); // ((parseFloat(am)).toFixed(4)).toString();
              txt = `<td class="table-cell">${adj_am}</td>`;
            }
            break;
          }
        }
        if (!txt) txt = '<td class="table-cell">-</td>';
        this.extractable_dep_col.push(txt);
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
      const profiles = userObject.deposit_profiles;
      const { am_arr } = this;

      for (let j = 0; j < profiles?.length ?? 0; j++) {
        let txt = '';
        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (
            toNumber(am_arr[0][i]) === toNumber(profiles[j].p_id) &&
            toNumber(am_arr[2][i]) > 0
          ) {
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
            break;
          }
        }
        if (!txt) txt = '<td class="table-cell">-</td>';
        this.withdraw_dep_col.push(txt);
      }
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

      for (let j = 0; j < profiles?.length ?? 0; j++) {
        let txt = '';
        for (let i = 0; i < rew_arr[0]?.length ?? 0; i++) {
          if (toNumber(rew_arr[0][i]) === toNumber(profiles[j].p_id)) {
            // found
            // let adj = window.web3js_reader.utils.fromWei(rew_arr[1][i], 'ether');
            const adj_str = toTokens(rew_arr[1][i], 4); // ((parseFloat(adj)).toFixed(4)).toString();
            txt = `<td class="table-cell">${adj_str}</td>`;
            break;
          }
        }
        if (!txt) txt = '<td class="table-cell">-</td>';
        this.reward_col.push(txt);
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
      const profiles = userObject.deposit_profiles;
      const { rew_arr } = this;

      for (let j = 0; j < profiles?.length ?? 0; j++) {
        let txt = '';
        for (let i = 0; i < rew_arr[0]?.length ?? 0; i++) {
          if (toNumber(rew_arr[0][i]) === toNumber(profiles[j].p_id)) {
            const adj_str = toTokens(rew_arr[2][i], 4);
            txt = `<td class="table-cell">${adj_str}</td>`;
            break;
          }
        }
        if (!txt) txt = '<td class="table-cell">-</td>';
        this.extractable_reward_col.push(txt);
      }
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

      for (let j = 0; j < profiles?.length ?? 0; j++) {
        let txt = '';
        for (let i = 0; i < rew_arr[0]?.length ?? 0; i++) {
          if (toNumber(rew_arr[0][i]) === toNumber(profiles[j].p_id)) {
            const usdReward = await getPriceOfTokens(
              rew_arr[2][i],
              profiles[j].p_id,
              true
            );

            txt = `<td class="table-cell">${usdReward}</td>`;

            break;
          }
        }
        if (!txt) txt = '<td class="table-cell">-</td>';
        this.usd_reward_column.push(txt);
      }
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

      for (let j = 0; j < profiles?.length ?? 0; j++) {
        let txt = '';
        for (let i = 0; i < rew_arr[0]?.length ?? 0; i++) {
          if (
            toNumber(rew_arr[0][i]) === toNumber(profiles[j].p_id) &&
            toNumber(rew_arr[2][i]) > 0
          ) {
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
            break;
          }
        }
        if (!txt) txt = '<td class="table-cell">-</td>';
        this.withdraw_rew_col.push(txt);
      }
    }
    return this.withdraw_rew_col;
  },
};
