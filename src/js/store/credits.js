/* eslint-disable camelcase */
import {
  APY_SCALE,
  ERC20_TOKEN,
  ERC721_TOKEN,
  NATIVE_ETHEREUM,
  UNISWAP_PAIR,
} from '../constants';
import { depTypeByDepositTokenId, getWalletBalanceStr } from '../custom';
import {
  getPriceOfTokens,
  isTokenNft,
  tokenAddressByDepositTokenId,
  tokenNameByDepositTokenId,
  toNumber,
  toTokens,
} from '../utils';
import { CACHE_TIME } from './constants';
import userObject from './userObject';
import { createCellWithIcon } from './utils';

export default {
  cred_arr: [],
  cred_price_arr: [],
  getCredArr_last_call: 0,
  async getCredArr() {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getCredArr_last_call + CACHE_TIME) {
      this.getCredArr_last_call = currentTimestamp;

      this.cred_arr = await window.credit_smartcontract.methods
        .dataPerCredits(userObject.account)
        .call({
          from: userObject.account,
        });

      const credPricePromise = [];
      this.cred_arr[0].forEach((credTokenId, i) => {
        const creditAmount = toNumber(this.cred_arr[1][i]);

        credPricePromise.push(
          creditAmount > 0
            ? getPriceOfTokens(creditAmount, credTokenId, true)
            : 0
        );
      });
      this.cred_price_arr = await Promise.all(credPricePromise);
    }
    return this.cred_arr;
  },

  cred_cc_arr: [],
  getCredCCArr_last_call: 0,
  async getCredCCArr() {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getCredCCArr_last_call + CACHE_TIME) {
      this.getCredCCArr_last_call = currentTimestamp;

      const cc = await window.credit_smartcontract.methods
        .viewCustomerCredit(userObject.account, 0)
        .call({
          from: userObject.account,
        });
      const cc_index = toNumber(cc.index);

      const credCCPromise = [];
      this.cred_arr[0].forEach((item, i) => {
        credCCPromise.push(
          window.credit_smartcontract.methods
            .viewCustomerCreditByIndex(cc_index, i)
            .call({
              from: userObject.account,
            })
        );
      });

      this.cred_cc_arr = await Promise.all(credCCPromise);
    }
    return this.cred_cc_arr;
  },

  clt_arr: null,
  getCltArr_last_call: 0,
  async getCltArr() {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getCltArr_last_call + CACHE_TIME) {
      this.getCltArr_last_call = currentTimestamp;
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
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getLevArr_last_call + CACHE_TIME || flag) {
      this.getLevArr_last_call = currentTimestamp;
      this.lev_arr.length = 0;
      this.lev_ratio_arr.length = 0;

      const customerLeveragePromise = [];
      this.cred_arr[0].forEach((item, index) => {
        customerLeveragePromise.push(
          window.liqlev_smartcontract.methods
            .viewCustomerLeverageByCredId(userObject.account, index) // FYI - method get index of cred_arr[0], not token id. Why? I dont know. :)
            .call({
              from: userObject.account,
            })
        );
      });

      const customerLeverageArray = await Promise.all(customerLeveragePromise);

      customerLeverageArray.forEach((item) => {
        this.lev_arr.push(item.lev_amount);
        this.lev_ratio_arr.push(item.ratio);
      });
    }
    return [this.lev_arr, this.lev_ratio_arr];
  },

  usd_val_column: [],
  getUsdValCol_last_call: 0,
  async getUsdValCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getUsdValCol_last_call + CACHE_TIME || flag) {
      this.getUsdValCol_last_call = currentTimestamp;
      this.usd_val_column.length = 0;

      this.cred_arr[0].forEach((credTokenId, i) => {
        this.usd_val_column.push(
          `<td class="table-cell">${this.cred_price_arr[i]}</td>`
        );
      });
    }
    return this.usd_val_column;
  },

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

      this.cred_arr[0].forEach((item) => {
        this.icon_column.push(
          `<td class="table-cell">${createCellWithIcon(
            tokenNameByDepositTokenId(item)
          )}</td>`
        );

        this.assets_column.push(
          `<td class="table-cell">${tokenNameByDepositTokenId(item)}</td>`
        );
      });
    }
    return [this.icon_column, this.assets_column];
  },

  apr_column: [],
  getAPRCol_last_call: 0,
  async getAPRCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getAPRCol_last_call + CACHE_TIME || flag) {
      this.getAPRCol_last_call = currentTimestamp;
      this.apr_column.length = 0;

      const { cred_arr } = this;
      const { clt_arr } = this;

      if (cred_arr[0].length > 0) {
        const calcVarApyPromise = [];
        const prefixArray = [];
        this.cred_cc_arr.forEach((item, i) => {
          calcVarApyPromise.push(
            !item.is_fixed_apy
              ? window.usage_calc_smartcontract_reader.methods
                  .calcVarApy(cred_arr[0][i], clt_arr[0][i])
                  .call({
                    from: userObject.account,
                  })
              : item.fixed_apy
          );

          prefixArray.push(!item.is_fixed_apy ? 'V: ' : 'F: ');
        });
        const calcVarApy = await Promise.all(calcVarApyPromise);

        calcVarApy.forEach((apr, i) => {
          const aprAdj = (apr / APY_SCALE) * 100;
          this.apr_column.push(
            `<td class="table-cell">${prefixArray[i]}${parseFloat(aprAdj)
              .toFixed(2)
              .toString()}%</td>`
          );
        });
      }
    }
    return this.apr_column;
  },

  in_wallet_column: [],
  getInWalletCol_last_call: 0,
  async getInWalletCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getInWalletCol_last_call + CACHE_TIME || flag) {
      this.getInWalletCol_last_call = currentTimestamp;
      this.in_wallet_column.length = 0;
      const { cred_arr } = this;

      const tokenCountPromise = [];
      cred_arr[0].forEach((creditTokenId) => {
        if (isTokenNft(creditTokenId)) {
          tokenCountPromise.push(
            window.cyclops_nft_smartcontract_reader.methods
              .balanceOf(userObject.account)
              .call({
                from: userObject.account,
              })
          );
        } else {
          tokenCountPromise.push(
            getWalletBalanceStr(tokenAddressByDepositTokenId(creditTokenId))
          );
        }
      });

      const tokensCount = await Promise.all(tokenCountPromise);

      tokensCount.forEach((tokenCount) => {
        this.in_wallet_column.push(
          `<td class="rounded-l-lg table-cell">${tokenCount}</td>`
        );
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
      const { cred_arr } = this;
      const { am_arr } = userObject.deposits;

      cred_arr[0].forEach((credTokenId) => {
        const depositTokenIndex = am_arr[0].indexOf(credTokenId);
        const depositTokenCount = am_arr[1][depositTokenIndex];

        this.dep_column.push(
          `<td class="table-cell">${
            isTokenNft(credTokenId)
              ? depositTokenCount
              : toTokens(depositTokenCount, 4)
          }</td>`
        );
      });
    }
    return this.dep_column;
  },

  cred_column: [],
  getCredCol_last_call: 0,
  async getCredCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getCredCol_last_call + CACHE_TIME || flag) {
      this.getCredCol_last_call = currentTimestamp;
      this.cred_column.length = 0;
      const { cred_arr } = this;

      cred_arr[0].forEach((credTokenId, i) => {
        const creditAmount = cred_arr[1][i];

        this.cred_column.push(
          `<td class="table-cell">${
            isTokenNft(credTokenId) ? creditAmount : toTokens(creditAmount, 4)
          }</td>`
        );
      });
    }
    return this.cred_column;
  },

  clt_column: [],
  getCltCol_last_call: 0,
  async getCltCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getCltCol_last_call + CACHE_TIME || flag) {
      this.getCltCol_last_call = currentTimestamp;
      this.clt_column.length = 0;
      const { cred_arr } = this;
      const { clt_arr } = this;

      const collateralPricePromise = [];
      cred_arr[0].forEach((credTokenId, i) => {
        collateralPricePromise.push(
          isTokenNft(credTokenId)
            ? 0
            : window.usage_calc_smartcontract_reader.methods
                .calcUSDValueCollateral(
                  userObject.account,
                  i,
                  clt_arr[1][i],
                  cred_arr[0][i]
                )
                .call({
                  from: userObject.account,
                })
        );
      });
      const collateralPriceArray = await Promise.all(collateralPricePromise);

      cred_arr[0].forEach((credTokenId, i) => {
        const collateralAmount = toTokens(clt_arr[1][i], 4);
        const collateralName = tokenNameByDepositTokenId(
          clt_arr[0][i]
        ).toUpperCase();

        if (isTokenNft(credTokenId)) {
          this.clt_column.push(`<td class="table-cell">${cred_arr[4][i]}</td>`);
        } else {
          const isCollateralCheaperThenCredit =
            toNumber(this.cred_price_arr[i]) * 0.9 >
            toNumber(collateralPriceArray[i]);

          isCollateralCheaperThenCredit
            ? this.clt_column.push(
                `<td class="table-cell attention-cell" title="Your collateral doesn’t cover credit value, please be aware that bank can liquidate your collateral partially or fully at any moment. To prevent that - please return your credit fully or partially.">${collateralName}: ${collateralAmount}</td>`
              )
            : this.clt_column.push(
                `<td class="table-cell">${collateralName}: ${collateralAmount}</td>`
              );
        }
      });
    }
    return this.clt_column;
  },

  duration_col: [],
  getDurationCol_last_call: 0,
  async getDurationCol(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getDurationCol_last_call + CACHE_TIME || flag) {
      this.getDurationCol_last_call = currentTimestamp;

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
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getFeeCol_last_call + CACHE_TIME || flag) {
      this.getFeeCol_last_call = currentTimestamp;

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
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getLevCol_last_call + CACHE_TIME || flag) {
      this.getLevCol_last_call = currentTimestamp;

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
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getSetLevCol_last_call + CACHE_TIME || flag) {
      this.getSetLevCol_last_call = currentTimestamp;

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
    const currentTimestamp = Date.now();
    if (
      currentTimestamp > this.getReturn_leverage_visible + CACHE_TIME ||
      flag
    ) {
      this.getReturn_leverage_visible = currentTimestamp;

      const { cred_arr } = this;
      const { lev_arr } = this;

      this.return_leverage_visible = cred_arr[0].some(
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
    const currentTimestamp = Date.now();
    if (
      currentTimestamp > this.getReturnCreditCol_last_call + CACHE_TIME ||
      flag
    ) {
      this.getReturnCreditCol_last_call = currentTimestamp;
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
};
