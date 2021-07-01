import deposits from './deposits';
import credits from './credits';
import liqEarn from './liqEarn';

export const userObject = {
  loaded: false,
  self: this,
  account: '',

  deposit_profiles: [],
  deposit_profiles_liqpairs: [],
  credit_profiles: [],
  liq_pairs: [],
  liq_terms: [],
  deposits,
  credits,
  liq_earn: liqEarn,
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
      this.credits.getCredCCArr(),
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
