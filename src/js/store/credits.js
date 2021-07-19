/* eslint-disable camelcase */
import { APY_SCALE } from '../constants';
import { isMobile } from '../constants/env';
import {
  getPriceOfTokens,
  isTokenNft,
  tokenNameByDepositTokenId,
  toNumber,
  toTokens,
} from '../utils';
import { CACHE_TIME } from './constants';
import { userObject } from './userObject';
import { createCellWithIcon, createTableBtnWithIcon } from './utils';

export default {
  cred_cc_arr: [],
  cred_arr: [],
  cred_price_arr: [],
  cred_cc_extra_arr: {},
  getCredArr_last_call: 0,
  async getCredArr(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getCredArr_last_call + CACHE_TIME || flag) {
      this.getCredArr_last_call = currentTimestamp;

      this.cred_arr = await window.credit_smartcontract_reader.methods
        .dataPerCredits(userObject.account)
        .call({
          from: userObject.account,
        });

      if (!Array.isArray(this.cred_arr)) {
        this.cred_arr = Object.values(this.cred_arr);
      }

      const credPricePromise = [];

      this.cred_arr[0].forEach((credTokenId, i) => {
        const creditAmount = this.cred_arr[1][i];

        credPricePromise.push(
          toNumber(creditAmount) > 0
            ? getPriceOfTokens(creditAmount, credTokenId, true)
            : 0
        );
      });
      this.cred_price_arr = await Promise.all(credPricePromise);

      const cc = await window.credit_smartcontract_reader.methods
        .viewCustomerCredit(userObject.account, 0)
        .call({
          from: userObject.account,
        });

      const cc_index = toNumber(cc.index);

      const credCCPromise = [];
      this.cred_arr[0].forEach((item, i) => {
        credCCPromise.push(
          window.credit_smartcontract_reader.methods
            .viewCustomerCreditByIndex(cc_index, i)
            .call({
              from: userObject.account,
            })
        );
      });

      this.cred_cc_arr = await Promise.all(credCCPromise);

      const credCCExtraPromise = [];
      this.cred_arr[0].forEach((item, i) => {
        credCCExtraPromise.push(
          window.credit_smartcontract_reader.methods
            .viewCustomerCreditExtraDataByIndex(cc_index, i)
            .call({
              from: userObject.account,
            })
        );
      });

      this.cred_cc_extra_arr = await Promise.all(credCCExtraPromise);
    }
    return this.cred_arr;
  },

  clt_arr: null,
  getCltArr_last_call: 0,
  async getCltArr(flag = false) {
    const currentTimestamp = Date.now();
    if (currentTimestamp > this.getCltArr_last_call + CACHE_TIME || flag) {
      this.getCltArr_last_call = currentTimestamp;

      this.clt_arr = await window.credit_smartcontract_reader.methods
        .amountsPerCollaterals(userObject.account)
        .call({
          from: userObject.account,
        });

      if (!Array.isArray(this.clt_arr)) {
        this.clt_arr = Object.values(this.clt_arr);
      }
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
      this.cred_arr?.[0]?.forEach((item, index) => {
        customerLeveragePromise.push(
          window.liqlev_smartcontract_reader.methods
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
          `<td class="table-cell">${
            toNumber(this.cred_price_arr[i]) || '-'
          }</td>`
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

      this.cred_arr?.[0]?.forEach((item) => {
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

      const { clt_arr, cred_arr, cred_cc_extra_arr, cred_cc_arr } = this;

      if (cred_arr[0].length > 0) {
        const calcVarApyPromise = [];
        cred_cc_arr.forEach((item, i) => {
          calcVarApyPromise.push(
            cred_cc_extra_arr[i].is_fixed_apy
              ? cred_cc_extra_arr[i].fixed_apy
              : window.usage_calc_smartcontract_reader.methods
                  .calcVarApy(cred_arr[0][i], clt_arr[0][i])
                  .call({
                    from: userObject.account,
                  })
          );
        });
        const calcVarApy = await Promise.all(calcVarApyPromise);

        calcVarApy.forEach((apr, i) => {
          const aprAdj = (toNumber(apr) / APY_SCALE) * 100;
          this.apr_column.push(
            `<td class="table-cell">${
              cred_cc_extra_arr[i].is_fixed_apy ? 'F: ' : 'V: '
            }${parseFloat(aprAdj).toFixed(2).toString()}%</td>`
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
      await userObject.deposits.getInWalletCol();

      cred_arr[0].forEach((credTokenId) => {
        const profileTokenArr = userObject.deposit_profiles.map(
          (token) => token.p_id
        );
        const profileTokenIndex = profileTokenArr.indexOf(credTokenId);

        const amount = userObject.deposits.in_wallet_arr[profileTokenIndex];

        this.in_wallet_column.push(
          `<td class="rounded-l-lg table-cell">${
            toNumber(amount) > 0 ? amount : '-'
          }</td>`
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
              : `${
                  toNumber(depositTokenCount) > 0
                    ? toTokens(depositTokenCount, 4)
                    : '-'
                }`
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
            toNumber(creditAmount) > 0
              ? `${
                  isTokenNft(credTokenId)
                    ? creditAmount
                    : toTokens(creditAmount, 4)
                }`
              : '-'
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
                  this.cred_cc_arr[i].linked_dep_id,
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

        if (isTokenNft(clt_arr[0][i])) {
          this.clt_column.push(
            `<td class="table-cell">${collateralName}: ${cred_arr[4][i]}</td>`
          );
        } else {
          const isCollateralCheaperThenCredit =
            toNumber(this.cred_price_arr[i]) * 0.9 >
            toNumber(collateralPriceArray[i]);

          this.clt_column.push(
            isCollateralCheaperThenCredit
              ? `<td class="table-cell attention-cell" title="Your collateral doesn’t cover credit value, please be aware that bank can liquidate your collateral partially or fully at any moment. To prevent that - please return your credit fully or partially.">${collateralName}: ${collateralAmount}</td>`
              : `<td class="table-cell">${collateralName}: ${collateralAmount}</td>`
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

      cred_arr[0].forEach((credTokenId, i) => {
        const duration = cred_arr[3][i];

        this.duration_col.push(
          `<td class="table-cell">${
            toNumber(duration) > 0 ? duration : '-'
          }</td>`
        );
      });
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

      cred_arr[0].forEach((credTokenId, i) => {
        const fee = cred_arr[2][i];

        this.fee_col.push(
          `<td class="table-cell">${
            toNumber(fee) > 0 ? toTokens(fee, 4) : '-'
          }</td>`
        );
      });
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

      cred_arr[0].forEach((credTokenId, i) => {
        const lev = lev_arr[i];

        this.leverage_column.push(
          `<td class="table-cell">${
            lev > 0 ? `${lev_ratio_arr[i]}% (${toTokens(lev, 4)})` : '-'
          }</td>`
        );
      });
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
      const { lev_arr } = this;

      lev_arr.forEach((levTokenId, i) => {
        this.set_leverage_column.push(
          `<td class="table-cell w-12">${
            toNumber(lev_arr[i]) > 0
              ? `${createTableBtnWithIcon(
                  'discount',
                  'Unfreeze',
                  isMobile
                    ? `openTab(event, 'unfreeze-tab', () => show_modal_unfreeze(${i.toString()}))`
                    : `show_modal_unfreeze(${i.toString()})`
                )}`
              : '-'
          }</td>`
        );
      });
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

      if (cred_arr[0].length > 0) {
        this.return_leverage_visible = cred_arr[0].some(
          (value, index) => toNumber(lev_arr[index]) > 0
        );
      } else {
        this.return_leverage_visible = false;
      }
    }
    return this.return_leverage_visible;
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

      cred_arr[0].forEach((credTokenId, i) => {
        const hasCredit = toNumber(cred_arr[1][i]) > 0;
        const hasFee = toNumber(cred_arr[2][i]) > 0;

        if (hasCredit || hasFee) {
          const text = hasCredit ? 'Repay borrow' : 'Repay fee';

          const borrowCallback = isMobile
            ? `openTab(event, 'return_credit-tab', () => return_credit(${i.toString()}))`
            : `return_credit(${i.toString()})`;

          const feeCallback = isMobile
            ? `openTab(event, 'return_fee-tab', () => return_fee(${i.toString()}))`
            : `return_fee(${i.toString()})`;

          const callback = hasCredit ? borrowCallback : feeCallback;

          this.return_credit_col.push(
            `<td class="table-cell pl-0 rounded-r-lg">${createTableBtnWithIcon(
              'money',
              text,
              callback
            )}</td>`
          );
        } else {
          this.return_credit_col.push(
            `<td class="table-cell pl-0 rounded-r-lg">-</td>`
          );
        }
      });
    }
    return this.return_credit_col;
  },
};
