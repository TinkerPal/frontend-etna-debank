const userObject = {
  loaded: false,
  self: this,
  account: '',

  deposit_profiles: [],
  deposit_profiles_liqpairs: [],
  credit_profiles: [],
  liq_pairs: [],
  liq_terms: [],

  deposits: {
    icon_column: [],
    assets_column: [],
    getIconAssetsCols_last_call: 0,
    async getIconAssetsCols(flag = false) {
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getIconAssetsCols_last_call + CACHE_TIME ||
        flag
      ) {
        this.getIconAssetsCols_last_call = current_timestamp;
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
      const current_timestamp = Date.now();
      if (current_timestamp > this.getAmArr_last_call + CACHE_TIME) {
        this.getAmArr_last_call = current_timestamp;

        this.am_arr = await window.staking_smartcontract_reader.methods
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
      const current_timestamp = Date.now();
      if (current_timestamp > this.getRewArr_last_call + CACHE_TIME) {
        this.getRewArr_last_call = current_timestamp;
        this.rew_arr = await window.staking_smartcontract_reader.methods
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
      const current_timestamp = Date.now();
      if (current_timestamp > this.getApyCol_last_call + CACHE_TIME || flag) {
        this.getApyCol_last_call = current_timestamp;

        this.apy_column.length = 0;
        const profiles = userObject.deposit_profiles;

        for (let i = 0; i < profiles?.length ?? 0; i++) {
          const apy = await getAPY(profiles[i].p_id);
          const apy_adj = (apy / apy_scale) * 100;

          this.apy_column.push(
            `<td class="table-cell">${parseFloat(apy_adj)
              .toFixed(2)
              .toString()}</td>`
          );
        }
      }
      return this.apy_column;
    },

    in_wallet_column: [],
    getInWalletCol_last_call: 0,
    async getInWalletCol(flag = false) {
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getInWalletCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getInWalletCol_last_call = current_timestamp;

        this.in_wallet_column.length = 0;
        const profiles = userObject.deposit_profiles;

        for (let i = 0; i < profiles?.length ?? 0; i++) {
          let txt = '';
          if (toNumber(profiles[i].p_dep_type) === ERC721_TOKEN) {
            const token_count =
              await window.cyclops_nft_smartcontract_reader.methods
                .balanceOf(userObject.account)
                .call({
                  from: userObject.account,
                });

            txt = `<td class="table-cell">${token_count}</td>`;
          } else if (
            toNumber(profiles[i].p_dep_type) === ERC20_TOKEN ||
            toNumber(profiles[i].p_dep_type) === UNISWAP_PAIR
          ) {
            const erc20contract = await new window.web3js_reader.eth.Contract(
              erc20TokenContractAbi,
              profiles[i].p_tok_addr
            );
            const erc20_count = await erc20contract.methods
              .balanceOf(userObject.account)
              .call({
                from: userObject.account,
              });
            // let adj_count = floorDecimals( window.web3js_reader.utils.fromWei(erc20_count, 'ether'), 4);
            const adj_count_str = toTokens(erc20_count, 4); // ((parseFloat(adj_count)).toFixed(4)).toString();
            txt = `<td class="table-cell">${adj_count_str}</td>`;
          } else if (toNumber(profiles[i].p_dep_type) === NATIVE_ETHEREUM) {
            const wb = await window.web3js_reader.eth.getBalance(
              userObject.account
            );
            // let eth_balance = window.web3js_reader.utils.fromWei(wb, 'ether');
            const adj_eth_balance = toTokens(wb, 4); // ((parseFloat(eth_balance)).toFixed(4)).toString();
            txt = `<td class="table-cell">${adj_eth_balance}</td>`;
          }
          if (!txt) txt = '<td class="table-cell">-</td>';
          this.in_wallet_column.push(txt);
        }
      }
      return this.in_wallet_column;
    },

    dep_column: [],
    getDepCol_last_call: 0,
    async getDepCol(flag = false) {
      const current_timestamp = Date.now();
      if (current_timestamp > this.getDepCol_last_call + CACHE_TIME || flag) {
        this.getDepCol_last_call = current_timestamp;

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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getUsdValCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getUsdValCol_last_call = current_timestamp;

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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getDurationCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getDurationCol_last_call = current_timestamp;

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
                const days = await window.staking_smartcontract_reader.methods
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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getExtractableDepCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getExtractableDepCol_last_call = current_timestamp;

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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getWithdrawDepCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getWithdrawDepCol_last_call = current_timestamp;

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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getRewardCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getRewardCol_last_call = current_timestamp;

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
      const current_timestamp = Date.now();
      if (
        current_timestamp >
          this.getExtractableRewardCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getExtractableRewardCol_last_call = current_timestamp;

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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getUsdRewardCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getUsdRewardCol_last_call = current_timestamp;

        this.usd_reward_column.length = 0;

        const profiles = userObject.deposit_profiles;
        const { rew_arr } = this;

        for (let j = 0; j < profiles?.length ?? 0; j++) {
          let txt = '';
          for (let i = 0; i < rew_arr[0]?.length ?? 0; i++) {
            if (toNumber(rew_arr[0][i]) === toNumber(profiles[j].p_id)) {
              const usdReward = await getPriceOfTokens(
                rew_arr[2][i],
                profiles[j].p_id === NFT_TOKEN_ID
                  ? LEVERAGE_TOKEN
                  : profiles[j].p_name,
                profiles[j].p_dep_type,
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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getWithdrawRewCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getWithdrawRewCol_last_call = current_timestamp;

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
  },
  credits: {
    cred_arr: [],
    getCredArr_last_call: 0,
    async getCredArr() {
      const current_timestamp = Date.now();
      if (current_timestamp > this.getCredArr_last_call + CACHE_TIME) {
        this.getCredArr_last_call = current_timestamp;
        this.cred_arr = await window.credit_smartcontract.methods
          .dataPerCredits(userObject.account)
          .call({
            from: userObject.account,
          });
      }
      return this.cred_arr;
    },

    clt_arr: null,
    getCltArr_last_call: 0,
    async getCltArr() {
      const current_timestamp = Date.now();
      if (current_timestamp > this.getCltArr_last_call + CACHE_TIME) {
        this.getCltArr_last_call = current_timestamp;
        this.clt_arr = await window.credit_smartcontract.methods
          .amountsPerCollaterals(userObject.account)
          .call({
            from: userObject.account,
          });
      }
      return this.clt_arr;
    },
    lev_arr: [],
    lev_ratio_arr: [],
    getLevArr_last_call: 0,
    async getLevArr(flag = false) {
      if (userObject.credits.cred_arr.length === 0) return [[], []];
      const current_timestamp = Date.now();
      if (current_timestamp > this.getLevArr_last_call + CACHE_TIME || flag) {
        this.getLevArr_last_call = current_timestamp;
        this.lev_arr.length = 0;
        this.lev_ratio_arr.length = 0;
        for (let i = 0; i < this.cred_arr[0]?.length ?? 0; i++) {
          const res = await window.liqlev_smartcontract.methods
            .viewCustomerLeverageByCredId(userObject.account, i)
            .call({
              from: userObject.account,
            });
          this.lev_arr.push(res.lev_amount);
          this.lev_ratio_arr.push(res.ratio);
        }
      }
      return [this.lev_arr, this.lev_ratio_arr];
    },

    icon_column: [],
    assets_column: [],
    getIconAssetsCols_last_call: 0,
    async getIconAssetsCols(flag = false) {
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getIconAssetsCols_last_call + CACHE_TIME ||
        flag
      ) {
        this.getIconAssetsCols_last_call = current_timestamp;
        this.icon_column.length = 0;
        this.assets_column.length = 0;
        for (let i = 0; i < this.cred_arr[0]?.length ?? 0; i++) {
          this.icon_column.push(
            `<td class="table-cell">${createCellWithIcon(
              profileNameByProfileId(this.cred_arr[0][i])
            )}</td>`
          );
          this.assets_column.push(
            `<td class="table-cell">${profileNameByProfileId(
              this.cred_arr[0][i]
            )}</td>`
          );
        }
      }
      return [this.icon_column, this.assets_column];
    },

    apr_column: [],
    getAPRCol_last_call: 0,
    async getAPRCol(flag = false) {
      const current_timestamp = Date.now();
      if (current_timestamp > this.getAPRCol_last_call + CACHE_TIME || flag) {
        this.getAPRCol_last_call = current_timestamp;
        this.apr_column.length = 0;
        const { cred_arr } = this;
        const { clt_arr } = this;
        for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
          const clt_id = cred_arr[4][i];
          const clt_profile_id = clt_arr[0][toNumber(clt_id)];

          const cc = await window.credit_smartcontract.methods
            .viewCustomerCredit(userObject.account, 0)
            .call({
              from: userObject.account,
            });
          const cc_index = toNumber(cc.index);
          const x = await window.credit_smartcontract.methods
            .viewCustomerCreditExtraDataByIndex(cc_index, i)
            .call({
              from: userObject.account,
            });
          const { is_fixed_apy } = x;

          let apr;
          let prefix;
          if (!is_fixed_apy) {
            apr = await window.usage_calc_smartcontract_reader.methods
              .calcVarApy(cred_arr[0][i], clt_profile_id)
              .call({
                from: userObject.account,
              });
            prefix = 'V: ';
          } else {
            apr = x.fixed_apy;
            prefix = 'F: ';
          }
          const apr_adj = (apr / apy_scale) * 100;
          this.apr_column.push(
            `<td class="table-cell">${prefix}${parseFloat(apr_adj)
              .toFixed(2)
              .toString()}%</td>`
          );
        }
      }
      return this.apr_column;
    },

    in_wallet_column: [],
    getInWalletCol_last_call: 0,
    async getInWalletCol(flag = false) {
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getInWalletCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getInWalletCol_last_call = current_timestamp;
        this.in_wallet_column.length = 0;
        const { cred_arr } = this;

        for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
          let txt = '';
          if (toNumber(depTypeByProfileId(cred_arr[0][i])) === ERC721_TOKEN) {
            const token_count =
              await window.cyclops_nft_smartcontract_reader.methods
                .balanceOf(userObject.account)
                .call({
                  from: userObject.account,
                });

            txt = `<td class="rounded-l-lg table-cell">${token_count}</td>`;
          } else if (
            toNumber(depTypeByProfileId(cred_arr[0][i])) === ERC20_TOKEN ||
            toNumber(depTypeByProfileId(cred_arr[0][i])) === UNISWAP_PAIR
          ) {
            const erc20contract = await new window.web3js_reader.eth.Contract(
              erc20TokenContractAbi,
              tokenAddressByProfileId(cred_arr[0][i])
            );
            const erc20_count = await erc20contract.methods
              .balanceOf(userObject.account)
              .call({
                from: userObject.account,
              });
            // let adj_count = floorDecimals(window.web3js_reader.utils.fromWei(erc20_count, 'ether'),4);
            const adj_count_str = toTokens(erc20_count, 4); // ((parseFloat(adj_count)).toFixed(4)).toString();
            const token_name = await erc20contract.methods.name().call({
              from: userObject.account,
            });
            txt = `<td class="rounded-l-lg table-cell">${adj_count_str}</td>`;

            // html += '<span class="small-text-block">'+token_name+': '+adj_count_str+'</span>';
          } else if (
            toNumber(depTypeByProfileId(cred_arr[0][i])) === NATIVE_ETHEREUM
          ) {
            const wb = await window.web3js_reader.eth.getBalance(
              userObject.account
            );
            // let eth_balance = window.web3js_reader.utils.fromWei(wb, 'ether');
            const adj_eth_balance = toTokens(wb, 4); // ((parseFloat(eth_balance)).toFixed(4)).toString();
            txt = `<td class="rounded-l-lg table-cell">${adj_eth_balance}</td>`;
          }
          if (!txt) txt = '<td class="rounded-l-lg table-cell">-</td>';
          this.in_wallet_column.push(txt);
        }
      }
      return this.in_wallet_column;
    },

    dep_column: [],
    getDepCol_last_call: 0,
    async getDepCol(flag = false) {
      const current_timestamp = Date.now();
      if (current_timestamp > this.getDepCol_last_call + CACHE_TIME || flag) {
        this.getDepCol_last_call = current_timestamp;
        this.dep_column.length = 0;
        const { cred_arr } = this;
        const { am_arr } = userObject.deposits;

        for (let j = 0; j < cred_arr[0]?.length ?? 0; j++) {
          let txt = '';
          for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
            if (toNumber(am_arr[0][i]) === toNumber(cred_arr[0][j])) {
              // found
              if (
                toNumber(depTypeByProfileId(cred_arr[0][j])) === ERC721_TOKEN
              ) {
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

    cred_column: [],
    getCredCol_last_call: 0,
    async getCredCol(flag = false) {
      const current_timestamp = Date.now();
      if (current_timestamp > this.getCredCol_last_call + CACHE_TIME || flag) {
        this.getCredCol_last_call = current_timestamp;
        this.cred_column.length = 0;
        const { cred_arr } = this;
        for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
          let txt = '';

          if (toNumber(cred_arr[1][i]) > 0 || toNumber(cred_arr[2][i]) > 0) {
            // credit or fee unpaid
            // found
            if (toNumber(depTypeByProfileId(cred_arr[0][i])) === ERC721_TOKEN) {
              // amount
              txt = `<td class="table-cell">${cred_arr[1][i]}</td>`;
            } else {
              // let am = window.web3js_reader.utils.fromWei(cred_arr[1][i], 'ether');
              const adj_am = toTokens(cred_arr[1][i], 4); // ((parseFloat(am)).toFixed(4)).toString();
              txt = `<td class="table-cell">${adj_am}</td>`;
            }
          }

          if (!txt) txt = '<td class="table-cell">-</td>';
          this.cred_column.push(txt);
        }
      }
      return this.cred_column;
    },

    clt_column: [],
    getCltCol_last_call: 0,
    async getCltCol(flag = false) {
      const current_timestamp = Date.now();
      if (current_timestamp > this.getCltCol_last_call + CACHE_TIME || flag) {
        this.getCltCol_last_call = current_timestamp;
        this.clt_column.length = 0;
        const { cred_arr } = this;
        const { clt_arr } = this;
        for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
          let txt = '';
          if (toNumber(cred_arr[1][i]) > 0 || toNumber(cred_arr[2][i]) > 0) {
            // credit or fee unpaid
            // found
            if (toNumber(depTypeByProfileId(cred_arr[0][i])) === ERC721_TOKEN) {
              // amount
              txt = `<td class="table-cell">${cred_arr[4][i]}</td>`;
            } else {
              let isCollateralCheaperThenCredit = false;
              const clt_id = cred_arr[4][i];
              const clt_profile_id = clt_arr[0][toNumber(clt_id)];
              const clt_amount = clt_arr[1][toNumber(clt_id)];
              let tdtxt = profileNameByProfileId(clt_profile_id);
              let adj_am;
              if (tdtxt === 'nft') {
                adj_am = clt_amount;
              } else {
                adj_am = toTokens(clt_amount, 4);
                const cc = await window.credit_smartcontract.methods
                  .viewCustomerCredit(userObject.account, 0)
                  .call({
                    from: userObject.account,
                  });
                const cc_index = toNumber(cc.index);
                const credit = await window.credit_smartcontract.methods
                  .viewCustomerCreditByIndex(cc_index, i)
                  .call({
                    from: userObject.account,
                  });
                const credit_usd_val = await calcUSDValueByProfileNonNFT(
                  credit.credit_amount,
                  credit.profile_id
                ); // usd value for credit
                const coll = await window.credit_smartcontract.methods
                  .viewCustomerCollateralByIndex(cc_index, credit.collateral_id)
                  .call({
                    from: userObject.account,
                  });
                const coll_usd_val =
                  await window.usage_calc_smartcontract_reader.methods
                    .calcUSDValueCollateral(
                      userObject.account,
                      toNumber(credit.linked_dep_id),
                      coll.deposit_amount,
                      toNumber(credit.profile_id)
                    )
                    .call({
                      from: userObject.account,
                    });

                if (credit_usd_val * 0.9 > coll_usd_val) {
                  isCollateralCheaperThenCredit = true;
                }
              }
              tdtxt = tdtxt.toUpperCase();
              tdtxt += `: ${adj_am}`;
              txt = `<td class="table-cell ${
                isCollateralCheaperThenCredit && 'attention-cell'
              }" ${
                isCollateralCheaperThenCredit &&
                'title="Your collateral doesn’t cover credit value, please be aware that bank can liquidate your collateral partially or fully at any moment. To prevent that - please return your credit fully or partially."'
              }><span>${tdtxt}</span></td>`;
            }
          }
          if (!txt) txt = '<td class="table-cell">-</td>';
          this.clt_column.push(txt);
        }
      }
      return this.clt_column;
    },

    usd_val_column: [],
    getUsdValCol_last_call: 0,
    async getUsdValCol(flag = false) {
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getUsdValCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getUsdValCol_last_call = current_timestamp;
        this.usd_val_column.length = 0;
        const { cred_arr } = this;

        for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
          let txt = '';

          if (toNumber(cred_arr[1][i]) > 0) {
            // credit unpaid
            // found
            const am = await calcUSDValueByProfileNonNFT(
              cred_arr[1][i],
              cred_arr[0][i]
            );

            txt = `<td class="table-cell">${am}</td>`;
          }

          if (!txt) txt = '<td class="table-cell">-</td>';
          this.usd_val_column.push(txt);
        }
      }
      return this.usd_val_column;
    },

    duration_col: [],
    getDurationCol_last_call: 0,
    async getDurationCol(flag = false) {
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getDurationCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getDurationCol_last_call = current_timestamp;

        this.duration_col.length = 0;
        const { cred_arr } = this;

        for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
          let txt = '';

          if (toNumber(cred_arr[1][i]) > 0 || toNumber(cred_arr[2][i]) > 0) {
            // credit or fee unpaid
            if (toNumber(cred_arr[3][i]) === 0) {
              txt = '<td class="table-cell">-</td>';
            } else {
              txt = `<td class="table-cell">${cred_arr[3][i].toString()}</td>`;
            }
          }

          if (!txt) txt = '<td class="table-cell">-</td>';
          this.duration_col.push(txt);
        }
      }
      return this.duration_col;
    },

    fee_col: [],
    getFeeCol_last_call: 0,
    async getFeeCol(flag = false) {
      const current_timestamp = Date.now();
      if (current_timestamp > this.getFeeCol_last_call + CACHE_TIME || flag) {
        this.getFeeCol_last_call = current_timestamp;

        this.fee_col.length = 0;
        const { cred_arr } = this;

        for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
          let txt = '';

          if (toNumber(cred_arr[2][i]) === 0) {
            txt = '<td class="table-cell">-</td>';
          } else {
            // let am = window.web3js_reader.utils.fromWei(cred_arr[2][i], 'ether');
            const adj_am = toTokens(cred_arr[2][i], 4); // ((parseFloat(am)).toFixed(4)).toString();
            txt = `<td class="table-cell">${adj_am}</td>`;
          }

          if (!txt) txt = '<td class="table-cell">-</td>';
          this.fee_col.push(txt);
        }
      }
      return this.fee_col;
    },

    leverage_column: [],
    getLevCol_last_call: 0,
    async getLevCol(flag = false) {
      const current_timestamp = Date.now();
      if (current_timestamp > this.getLevCol_last_call + CACHE_TIME || flag) {
        this.getLevCol_last_call = current_timestamp;

        this.leverage_column.length = 0;
        const { cred_arr } = this;
        const { lev_arr } = this;
        const { lev_ratio_arr } = this;

        for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
          let txt = '';

          if (toNumber(lev_arr[i]) > 0) {
            const adj_am = toTokens(lev_arr[i], 4);
            txt = `<td class="table-cell">${lev_ratio_arr[i]}% (${adj_am})</td>`;
          }

          if (!txt) txt = '<td class="table-cell">-</td>';
          this.leverage_column.push(txt);
        }
      }
      return this.leverage_column;
    },

    set_leverage_column: [],
    getSetLevCol_last_call: 0,
    async getSetLevCol(flag = false) {
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getSetLevCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getSetLevCol_last_call = current_timestamp;

        this.set_leverage_column.length = 0;
        const { cred_arr } = this;
        const { lev_arr } = this;

        for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
          let txt = '';

          if (toNumber(lev_arr[i]) > 0) {
            if (isMobile) {
              txt = `<td class="table-cell w-12">${createTableBtnWithIcon(
                'discount',
                'Unfreeze',
                `openTab(event, 'unfreeze-tab', () => show_modal_unfreeze(${i.toString()}))`
              )}</td>`;
            } else {
              txt = `<td class="table-cell w-12">${createTableBtnWithIcon(
                'discount',
                'Unfreeze',
                `show_modal_unfreeze(${i.toString()})`
              )}</td>`;
            }
          }

          if (!txt) txt = '<td class="table-cell w-12">-</td>';
          this.set_leverage_column.push(txt);
        }
      }
      return this.set_leverage_column;
    },

    return_leverage_visible: false,
    getReturn_leverage_visible: 0,
    async returnLeverageVisible(flag = false) {
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getReturn_leverage_visible + CACHE_TIME ||
        flag
      ) {
        this.getReturn_leverage_visible = current_timestamp;

        const { cred_arr } = this;
        const { lev_arr } = this;

        this.return_leverage_visible = cred_arr[0]?.some(
          (value, index) => toNumber(lev_arr[index]) > 0
        );
      }
      return this.return_leverage_visible;
    },

    return_empty_col: [],
    async getReturnEmptyCol(flag = false) {
      for (let i = 0; i < this.cred_arr[0]?.length ?? 0; i++) {
        this.return_empty_col.push(
          '<td class="table-cell table-cell-empty"></td>'
        );
      }

      return this.return_empty_col;
    },

    return_credit_col: [],
    getReturnCreditCol_last_call: 0,
    async getReturnCreditCol(flag = false) {
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getReturnCreditCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getReturnCreditCol_last_call = current_timestamp;
        this.return_credit_col.length = 0;
        const { cred_arr } = this;
        const { lev_arr } = this;
        const { lev_ratio_arr } = this;

        for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
          // i === deposit id
          let txt = '';

          if (toNumber(cred_arr[1][i]) > 0 || toNumber(cred_arr[2][i]) > 0) {
            if (toNumber(cred_arr[1][i]) > 0) {
              // credit or fee unpaid
              if (isMobile) {
                txt = `<td class="table-cell pl-0 rounded-r-lg">${createTableBtnWithIcon(
                  'money',
                  'Repay borrow',
                  `openTab(event, 'return_credit-tab', () => return_credit(${i.toString()}))`
                )}</td>`;
              } else {
                txt = `<td class="table-cell pl-0 rounded-r-lg">${createTableBtnWithIcon(
                  'money',
                  'Repay borrow',
                  `return_credit(${i.toString()})`
                )}</td>`;
              }
            } else if (isMobile) {
              txt = `<td class="table-cell pl-0 rounded-r-lg">${createTableBtnWithIcon(
                'money',
                'Repay fee',
                `openTab(event, 'return_fee-tab', () => return_fee(${i.toString()}))`
              )}</td>`;
            } else {
              txt = `<td class="table-cell pl-0 rounded-r-lg">${createTableBtnWithIcon(
                'money',
                'Repay fee',
                `return_fee(${i.toString()})`
              )}</td>`;
            }
          }

          if (!txt) txt = '<td class="table-cell pl-0 rounded-r-lg">-</td>';
          this.return_credit_col.push(txt);
        }
      }
      return this.return_credit_col;
    },
  },
  liq_earn: {
    icon_column: [],
    asset_column: [],
    lockup_period: [],
    getIconAssetLockupCols_last_call: 0,
    async getIconAssetLockupCols(flag = false) {
      const current_timestamp = Date.now();
      if (
        current_timestamp >
          this.getIconAssetLockupCols_last_call + CACHE_TIME ||
        flag
      ) {
        this.getIconAssetLockupCols_last_call = current_timestamp;

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
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
          ) {
            this.icon_column.push(
              `<td class="table-cell">${createCellWithIcon(
                await unswProfileNameByProfileId(am_arr[0][i])
              )}</td>`
            );
            const aname = (
              await unswProfileNameByProfileId(am_arr[0][i])
            ).slice(0, -3);
            this.asset_column.push(`<td class="table-cell">${aname}</td>`);
            const period_code = (
              await unswProfileNameByProfileId(am_arr[0][i])
            ).slice(-2);

            this.lockup_period.push(
              `<td class="table-cell">${period_name_from_code[period_code]}</td>`
            );
          }
        }
      }
      return [this.icon_column, this.asset_column, this.lockup_period];
    },

    apy_column: [],
    getApyCol_last_call: 0,
    async getApyCol(flag = false) {
      const current_timestamp = Date.now();
      if (current_timestamp > this.getApyCol_last_call + CACHE_TIME || flag) {
        this.getApyCol_last_call = current_timestamp;

        this.apy_column.length = 0;

        const { am_arr } = userObject.deposits;
        if (am_arr.length === 0) return [[], [], []];
        const { rew_arr } = userObject.deposits;

        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
            continue;
          if (
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
          ) {
            // let apy = await window.usage_calc_smartcontract_reader.methods.calcDepApy(am_arr[0][i]).call({ from: userObject.account});
            const apy = await getAPY(am_arr[0][i]);
            const apy_adj = (apy / apy_scale) * 100;
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
      const current_timestamp = Date.now();
      if (current_timestamp > this.getDepCol_last_call + CACHE_TIME || flag) {
        this.getDepCol_last_call = current_timestamp;

        this.dep_column.length = 0;

        const { am_arr } = userObject.deposits;
        const { rew_arr } = userObject.deposits;

        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
            continue;
          if (
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getUsdValCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getUsdValCol_last_call = current_timestamp;

        this.usd_val_column.length = 0;
        this.usd_val_only_col.length = 0;

        const { am_arr } = userObject.deposits;
        const { rew_arr } = userObject.deposits;

        let index = 0;
        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
            continue;
          if (
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getUsdRewardCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getUsdRewardCol_last_call = current_timestamp;

        this.usd_reward_column.length = 0;

        const { am_arr } = userObject.deposits;
        const { rew_arr } = userObject.deposits;

        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (!rew_arr[1]) continue;

          if (toNumber(rew_arr[1][i]) === 0) continue;

          if (
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getDurationUnlockCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getDurationUnlockCol_last_call = current_timestamp;

        this.duration_col.length = 0;
        this.unlock_col.length = 0;

        const { am_arr } = userObject.deposits;
        const { rew_arr } = userObject.deposits;

        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
            continue;
          if (
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
          ) {
            let txt = '';
            let txt_unl = '';

            if (toNumber(am_arr[1][i]) > 0) {
              const days = await window.staking_smartcontract_reader.methods
                .depositDays(userObject.account, i)
                .call({
                  from: userObject.account,
                }); // duration

              txt = `<td class="table-cell">${
                !toNumber(days) ? '-' : days
              }</td>`;

              const period_code = (
                await unswProfileNameByProfileId(am_arr[0][i])
              ).slice(-2);

              const unl_period =
                period_len_from_code[period_code] - days.toString();
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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getExtrDepCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getExtrDepCol_last_call = current_timestamp;

        this.extractable_dep_col.length = 0;

        const { am_arr } = userObject.deposits;
        const { rew_arr } = userObject.deposits;

        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
            continue;
          if (
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getWithdrawDepCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getWithdrawDepCol_last_call = current_timestamp;

        this.withdraw_dep_col.length = 0;

        const { am_arr } = userObject.deposits;
        const { rew_arr } = userObject.deposits;

        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
            continue;
          if (
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
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
      const current_timestamp = Date.now();
      if (
        current_timestamp >
          this.getWithdrawDepInputsCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getWithdrawDepInputsCol_last_call = current_timestamp;

        this.withdraw_dep_inputs_col.length = 0;

        const { am_arr } = userObject.deposits;
        const { rew_arr } = userObject.deposits;

        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
            continue;
          if (
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getRewardCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getRewardCol_last_call = current_timestamp;

        this.reward_col.length = 0;

        const { am_arr } = userObject.deposits;
        const { rew_arr } = userObject.deposits;

        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
            continue;
          if (
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
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
      const current_timestamp = Date.now();
      if (
        current_timestamp >
          this.getExtractableRewardCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getExtractableRewardCol_last_call = current_timestamp;
        this.extractable_reward_col.length = 0;

        const { am_arr } = userObject.deposits;
        const { rew_arr } = userObject.deposits;

        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
            continue;
          if (
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
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
      const current_timestamp = Date.now();
      if (
        current_timestamp > this.getWithdrawRewCol_last_call + CACHE_TIME ||
        flag
      ) {
        this.getWithdrawRewCol_last_call = current_timestamp;

        this.withdraw_rew_col.length = 0;

        const { am_arr } = userObject.deposits;
        const { rew_arr } = userObject.deposits;

        for (let i = 0; i < am_arr[0]?.length ?? 0; i++) {
          if (toNumber(am_arr[1][i]) === 0 && toNumber(rew_arr[1][i]) === 0)
            continue;
          if (
            toNumber(await unswDepTypeByProfileId(am_arr[0][i])) ===
            UNISWAP_PAIR
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
  },
  async load() {
    if (this.loaded) return;

    [
      this.deposit_profiles,
      this.deposit_profiles_liqpairs,
      this.credit_profiles,
      this.liq_pairs,
      this.liq_terms,
    ] = await Promise.all([
      getAllProfiles(),
      getAllProfilesUniswap(),
      getAllCreditProfiles(),
      getLiqPairs(),
      getLiqTerms(),
    ]);

    await Promise.all([
      this.deposits.getIconAssetsCols(),
      this.deposits.getAmArr(),
      this.deposits.getRewArr(),
      this.credits.getCredArr(),
      this.credits.getCltArr(),
    ]);

    await this.credits.getLevArr(true); // as depends on cred arr

    this.loaded = true;
  },
  state: {
    currentDeposits: [],
    currentCredits: [],
    currentLiq: [],
    current_page_id: '',
    selectedNFTAssets: [],
    selected_credprofile: -1, // collateral asset,  not selected
    getcredit_profile: -1, // get credit in..
    selected_depprofile: -1, // deposit
    selected_depprofile_name: '',
    selected_depprofile_type: 0,
    selected_depprofile_token_address: '',
    liq_pair_name: '',
    liq_pair_address: '',
    liq_pair_fullcode: '',
  },
};
