const modal_withdraw_deposit = new Modal('modal-withdraw-deposit');
const modal_withdraw_yield = new Modal('modal-withdraw-reward');
const modal_add_credit = new Modal('modal-open-new-credit', () => {
  initCreditProfilesDropdown();
  initGetCreditDropdown()
});
const modal_return_fee = new Modal('modal-return-fee');
const modal_return_credit = new Modal('modal-return-credit');
const modal_add_leverage = new Modal('modal-set-leverage');
const modal_unfreeze = new Modal('modal-unfreeze');
const modal_add_lliquidity = new Modal('modal-add-liquidity', () => {
  initLiqPairsDropdown(), initLiqTermsDropdown()
});
const modal_add_deposit = new Modal('modal-new-deposit', initDepositProfilesDropdown, () => {
  depositModalRebuild();
  depositModalUpdateNftDropdown();
}, null, depositModalUpdateNftDropdown);

const nftAssetsSelect = new Choices('#nftAssetsSelect', {
  removeItemButton: true,
  callbackOnCreateTemplates: function (template) {
    return {
      item: (classNames, data) => {
        const value = `${data.value.text}[${data.value.t_id}]`;

        return template(`
            <div class="${classNames.item} ${
            data.highlighted
              ? classNames.highlightedState
              : classNames.itemSelectable
          } ${
            data.placeholder ? classNames.placeholder : ''
          }" data-item data-id="${data.id}" data-value="${value}" ${
            data.active ? 'aria-selected="true"' : ''
          } ${data.disabled ? 'aria-disabled="true"' : ''} data-deletable>
              <span class="choices__item-img"><img src="${data.value.imageSrc}"></span> ${value}
              <button type="button" class="choices__button" aria-label="Remove item: '${value}'" data-button="">Remove item</button>
            </div>
          `);
      },
      choice: (classNames, data) => {
        const value = `${data.value.text}[${data.value.t_id}]`;

        return template(`
            <div class="${classNames.item} ${classNames.itemChoice} ${
            data.disabled ? classNames.itemDisabled : classNames.itemSelectable
          }" data-select-text="${this.config.itemSelectText}" data-choice ${
            data.disabled
              ? 'data-choice-disabled aria-disabled="true"'
              : 'data-choice-selectable'
          } data-id="${data.id}" data-value="${value}" ${
            data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
          }>
              <span class="choices__item-img"><img src="${data.value.imageSrc}"></span> ${data.label}
            </div>
          `);
      },
    };
  },
});

const walletButton = document.getElementById("enableEthereumButton");

const createTableBtnWithIcon = (icon, text, callback) => {
  return `<span class="table-btn" onclick="${callback}">
  <i class="icon-cell">
    <img src="/images/${icon}.svg" class="w-full h-full" alt="#">
  </i> 
  ${text}
</span>`
}

const createCellWithIcon = (iconSrc) => {
  const iconName = iconSrc.toLowerCase();
  const iconObj = CRYPTO_ICONS.find(icon => iconName === icon.name);

  if (iconObj) {
    iconSrc = iconObj.icon ? iconObj.icon : iconObj.name;
  } else {
    iconSrc = 'b'
  }

  return `<span class="crypto-icon-no-spaces"><img src="/images/crypto-icons/icon-${iconSrc}.svg"></span>`
}

let contractsObject = {
  deposit_contract: {
    address: '',
    contract: {},
    setAddress: function (addr) {
      this.address = addr;
    }
  }
}

document.addEventListener('visibilitychange', function () {
  if (document.visibilityState == 'hidden') {
    setWalletPref({
      page_id: userObject.state.current_page_id
    });
  }
});

window.addEventListener('DOMContentLoaded', async function () {

  const r1 = getBackendParameter('STAKING_CONTRACT', (contract_address) => {
    window.staking_contract_address = contract_address;
  });

  const r2 = getBackendParameter('FAMERS_REGISTER_CONTRACT', (contract_address) => {
    window.famers_register_contract_address = contract_address;
  });

  const r3 = getBackendParameter('DEPPROFILES_REGISTER_CONTRACT', (contract_address) => {
    window.depprofiles_register_contract_address = contract_address;
  });

  const r4 = getBackendParameter('CREDIT_PROFILES_REGISTER_CONTRACT', (contract_address) => {
    window.credit_profiles_register_contract_address = contract_address;
  });

  const r5 = getBackendParameter('DATA_PROVIDER_CONTRACT', (contract_address) => {
    window.data_provider_contract_address = contract_address;
  });

  const r6 = getBackendParameter('VOTES_CALC_CONTRACT', (contract_address) => {
    window.votes_calc_contract_address = contract_address;
  });

  const r7 = getBackendParameter('USAGE_CALC_CONTRACT', (contract_address) => {
    window.usage_calc_contract_address = contract_address;
  });

  const r8 = getBackendParameter('CREDIT_CONTRACT', (contract_address) => {
    window.credit_contract_address = contract_address;
  });

  const r9 = getBackendParameter('LIQLEV_CONTRACT', (contract_address) => {
    window.liqlev_contract_address = contract_address;
  });
  await Promise.all([r1, r2, r3, r4, r5, r6, r7, r8, r9]);

  //in any case;
  await initWeb3jsReader();

  await web3jsReadersList.init();

  await Promise.all([initDataProviderContractReader(), initVotesCalcContractReader(), initUsageCalcContractReader(), initCyclopsNFTContractReader()]);
  //await initDataProviderContractReader();
  //await initVotesCalcContractReader();
  //await initUsageCalcContractReader();

  if (isMetaMaskInstalled()) {

    window.ethereum.autoRefreshOnNetworkChange = false;
    await getAccount();

    window.ethereum.on('accountsChanged', async function (accounts) {
      await getAccount();
    });

    window.ethereum.on('chainChanged', async (chainId) => {
      if (chainId == '0x2a') window.location.replace('https://debank.cyclops.game');
      window.location.reload();
    });

  } else {
    walletButton.style.display = "block";
    await initWeb3Modal();
    walletButton.addEventListener("click", toggleWeb3Connect);
  }

  if (window.location.pathname == '/') {
    await getWalletPref();
    openTab({
      srcElement: document.getElementById(userObject.state.current_page_id + '-menu')
    }, userObject.state.current_page_id);

    //initDepositProfilesDropdown()
    //initCreditProfilesDropdown();
    //initGetCreditDropdown();
  }
  modal_add_credit.onInitCallback();
  modal_add_lliquidity.onInitCallback();
  modal_add_deposit.onInitCallback();
});

async function initWeb3Modal() {

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: true, // optional. For MetaMask / Brave / Opera.

  });
}

async function getAccount() {

  try {

    let accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });
    userObject.account = accounts[0];

    /*
    if (userObject.account == '0xddc58f7839a71787eb94211bc922e0ae2bfb5501'){}
    else if( userObject.account == '0xc358a60bccec7d0efe5c5e0d9f3862bba6cb5cd8'){}
    else {window.location.replace('https://fame.cyclops.game/upgrade.html')}*/

    window.chainId = window.ethereum.chainId;

    document.getElementById('debank_load_bar').ldBar.set(10);

    safeSetValueBySelector('.current-wallet', userObject.account);
    safeSetInnerHTMLBySelector('.current-wallet', userObject.account, ' inline');

    checkAdminButton();
    window.web3js = await new Web3(window.ethereum);
    window.web3 = window.web3js;
    window.BN = web3js.utils.BN;

    await Promise.all([initStakingContract(), initCreditContract(), initLiqLevContract(), initCyclopsNFTContract()])

    document.getElementById('debank_load_bar').ldBar.set(15);

    await userObject.load();

    document.getElementById('debank_load_bar').ldBar.set(25);

    if (window.location.pathname == '/') {

      window.barCheck = setInterval(barChecker, 1000);
      async function barChecker() {
        if (document.getElementById('load_bar_cover')) {
          if (
            document.getElementById('tokens_balance').innerHTML
          ) {
            await new Promise(r => setTimeout(r, 1000));
            document.getElementById('load_bar_cover').style.display = "none";
            clearInterval(window.barCheck);
          }
        }
      }

      if (window.chainId == undefined) {
        document.getElementById('net_name').innerHTML = "unknown net";
        document.getElementById('net_info').style.color = "red";
        document.getElementById('net_txt').innerHTML = " wrong network, connect to BSC-Test";
      } else if (window.chainId != '0x61') {
        document.getElementById('net_name').innerHTML = chains[window.chainId];
        document.getElementById('net_icon').style.color = "red";
        document.getElementById('net_txt').innerHTML = " wrong network, connect to BSC-Test";
      } else {
        document.getElementById('net_icon').style.color = "#48A68E";
        document.getElementById('net_txt').innerHTML = " BSC-Test";
      }

      await updateData();

      // 	//initFamersDropdowns();
      // 	initLiqTermsDropdown();
    }

    window.gp = await window.web3js.eth.getGasPrice();
    window.gp = window.gp * 2;
  } catch (error) {
    errorMsg('Cannot access wallet. Reloar your page, please.');
  }
}

async function getAccountWalletConnect() {

  try {
    ////
    window.web3js = await new Web3(window.provider);
    window.web3 = window.web3js;

    // Get connected chain id from Ethereum node
    const chainId = await window.web3js.eth.getChainId();

    //do not rely on automatic..
    if (window.chainId == undefined) window.chainId = '0x1';

    document.getElementById('debank_load_bar').ldBar.set(10);

    // Load chain information over an HTTP API
    const chainData = evmChains.getChain(chainId);

    // Get list of accounts of the connected wallet
    let accounts = await web3js.eth.getAccounts();

    userObject.account = accounts[0];

    safeSetValueBySelector('.current-wallet', userObject.account);
    safeSetInnerHTMLBySelector('.current-wallet', userObject.account, 'inline');

    //for MM-based code to work without changes for smart contract interactions
    window.ethereum = window.provider;

    await window.provider.enable();

    window.BN = web3js.utils.BN;

    await Promise.all([initStakingContract(), initCreditContract(), initLiqLevContract()])

    document.getElementById('debank_load_bar').ldBar.set(15);

    await userObject.load();

    document.getElementById('debank_load_bar').ldBar.set(25);

    if (window.location.pathname == '/') {

      // if (window.chainId == undefined){
      // 	document.getElementById('net_name').innerHTML="unknown net";
      // 	document.getElementById('net_info').style.display ="block";
      // 	document.getElementById('net_info').style.color ="red";
      // 	document.getElementById('net_txt').innerHTML=" wrong network, connect to BSC-Test";
      // } else if (window.chainId != '0x61') {
      // 	document.getElementById('net_name').innerHTML=chains[window.chainId];
      // 	document.getElementById('net_info').style.display ="block";
      // 	document.getElementById('net_icon').style.color ="red";
      // 	document.getElementById('net_txt').innerHTML=" wrong network, connect to BSC-Test";
      // } else {
      // 	document.getElementById('net_icon').style.color ="green";
      // 	document.getElementById('net_info').style.display ="block";
      // 	document.getElementById('net_txt').innerHTML=" BSC-Test";
      // }

      await updateData();

      //initFamersDropdowns();
      // initLiqTermsDropdown();
    }

    window.gp = await window.web3js.eth.getGasPrice();
    window.gp = window.gp * 2;

  } catch (error) {
    errorMsg('Cannot access wallet. Reloar your page, please.');
  }

}

function temporaryDisableCurrentButton(element_id = null) {
  let elem;
  if (element_id) elem = document.getElementById(element_id);
  else elem = event.srcElement
  elem.disabled = true;
  setTimeout(() => {
    elem.disabled = false;
  }, 10000);
}

async function initStakingContract(callback = null) {

  if (!window.staking_smartcontract) {

    if (window.web3js) {
      window.staking_smartcontract = await new window.web3js.eth.Contract(staking_contract_abi, window.staking_contract_address);
      if (callback) callback(window.staking_smartcontract);
    }

  } else {
    if (callback) callback(window.staking_smartcontract);
  }
}

async function initCreditContract(callback = null) {

  if (!window.credit_smartcontract) {

    if (window.web3js) {
      window.credit_smartcontract = await new window.web3js.eth.Contract(credit_contract_abi, window.credit_contract_address);
      if (callback) callback(window.credit_smartcontract);
    }

  } else {
    if (callback) callback(window.credit_smartcontract);
  }
}

async function initLiqLevContract(callback = null) {

  if (!window.liqlev_smartcontract) {

    if (window.web3js) {
      window.liqlev_smartcontract = await new window.web3js.eth.Contract(liqlev_contract_abi, window.liqlev_contract_address);
      if (callback) callback(window.liqlev_smartcontract);
    }

  } else {
    if (callback) callback(window.liqlev_smartcontract);
  }
}

async function initVotesCalcContractReader(callback = null) {

  if (!window.votes_calc_smartcontract_reader) {
    //if (window.web3js_reader){
    //window.votes_calc_smartcontract_reader = await new window.web3js_reader.eth.Contract(votes_calc_abi, window.votes_calc_contract_address); 
    let reader = web3jsReadersList.get();
    window.votes_calc_smartcontract_reader = await new reader.eth.Contract(votes_calc_abi, window.votes_calc_contract_address);
    if (callback) callback(window.votes_calc_smartcontract_reader);
    //}
  } else {
    if (callback) callback(window.votes_calc_smartcontract_reader);
  }
}

async function initUsageCalcContractReader(callback = null) {

  if (!window.usage_calc_smartcontract_reader) {
    //if (window.web3js_reader){
    let reader = web3jsReadersList.get();
    window.usage_calc_smartcontract_reader = await new reader.eth.Contract(usage_calc_abi, window.usage_calc_contract_address);
    //window.usage_calc_smartcontract_reader = await new window.web3js_reader.eth.Contract(usage_calc_abi, window.usage_calc_contract_address); 
    if (callback) callback(window.usage_calc_smartcontract_reader);
    //}
  } else {
    if (callback) callback(window.usage_calc_smartcontract_reader);
  }
}

async function initCyclopsNFTContractReader(callback = null) {

  if (!window.cyclops_nft_smartcontract_reader) {
    //if (window.web3js_reader){
    let reader = web3jsReadersList.get();
    window.cyclops_nft_smartcontract_reader = await new reader.eth.Contract(nftpub_contracts_abi, window.cyclops_nft_contract_address);
    //window.cyclops_nft_smartcontract_reader = await new window.web3js_reader.eth.Contract(nftpub_contracts_abi, window.cyclops_nft_contract_address); 
    if (callback) callback(window.cyclops_nft_smartcontract_reader);
    //}
  } else {
    if (callback) callback(window.cyclops_nft_smartcontract_reader);
  }
}

async function initCyclopsNFTContract(callback = null) {

  if (!window.cyclops_nft_smartcontract) {
    if (window.web3js) {
      window.cyclops_nft_smartcontract = await new window.web3js.eth.Contract(nftpub_contracts_abi, window.cyclops_nft_contract_address);
      if (callback) callback(window.cyclops_nft_smartcontract);
    }
  } else {
    if (callback) callback(window.cyclops_nft_smartcontract);
  }
}

async function getCredit() {
  //function getCredit(address cust_wallet, uint32 dep_id,  uint256 cred_amount, uint32 get_credit_profile_id) nonReentrant public

  modal_add_credit.isLoadingAfterConfirm()

  if (userObject.state.selected_credprofile == -1 || !userObject.state.selected_credprofile) {
    modal_add_credit.isLoadedAfterConfirm(false)
    errorMsg('you need to select collateral asset');
    return;
  }

  if (userObject.state.getcredit_profile == -1 || !userObject.state.getcredit_profile) {
    modal_add_credit.isLoadedAfterConfirm(false)
    errorMsg('you need to select credit asset');
    return;
  }

  if (userObject.state.getcredit_profile == userObject.state.selected_credprofile) {
    modal_add_credit.isLoadedAfterConfirm(false)
    errorMsg('assets for collateral and credit should be different');
    return;
  }

  let cred_amount = (safeFloatToWei(document.getElementById('tokens_amount_getcredit').innerText)).toString(); //wei

  let collateral_dep_id = depAmountByProfileId(userObject.state.selected_credprofile)[0];

  const isFullCallateral = document.getElementById('full_collateral').checked;

  const is_fixed_credit = document.getElementById('set_fixed_credit').checked

  initCreditContract(async (contract) => {
    contract.methods.getCredit(userObject.account, collateral_dep_id, cred_amount, userObject.state.getcredit_profile, isFullCallateral, is_fixed_credit).send({
        from: userObject.account,
        gasPrice: window.gp
      }, function (error, txnHash) {
        if (error) {
          modal_add_credit.isLoadedAfterConfirm(false)
          throw error;
        }
        output_transaction(txnHash)

      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (confirmationNumber == 5) {
          await updateData('get_credit');
          modal_add_credit.isLoadedAfterConfirm()
        }
        resetMsg();

      })
      .catch(error => {
        modal_add_credit.isLoadedAfterConfirm(false)
        errorMsg('smartcontract communication error');
      });
  });

}

async function deposit() {

  modal_add_deposit.isLoadingAfterConfirm();

  if (userObject.state.selected_depprofile == -1) {
    modal_add_deposit.isLoadedAfterConfirm(false);
    errorMsg('you need to select asset');
    return;
  }

  let dep_profile_id = userObject.state.selected_depprofile;
  let amount;
  let wei_val = 0;
  let token_ids = new Array();

  if (userObject.state.selected_depprofile_name == 'nft') {
    //errorMsg('currently not supported');
    //return;

    if (userObject.state.selectedNFTAssets.length == 0) {
      modal_add_deposit.isLoadedAfterConfirm(false);
      errorMsg('you need to select tokens');
      return;
    }

    let isApproved = await window.cyclops_nft_smartcontract.methods.isApprovedForAll(userObject.account, window.staking_contract_address).call({
      from: userObject.account
    });

    if (!isApproved) {
      modal_add_deposit.isLoadedAfterConfirm(false, false);
      errorMsg('you need to approve tokens move first');
      return;
    }

    amount = userObject.state.selectedNFTAssets.length;
    for (let i = 0; i < userObject.state.selectedNFTAssets.length; i++) {
      token_ids.push(parseInt(userObject.state.selectedNFTAssets[i].t_id));
    }

  } else {

    amount = (safeFloatToWei(document.getElementById('tokens_amount').value)).toString(); //wei
    if (userObject.state.selected_depprofile_type == NATIVE_ETHEREUM) {
      wei_val = amount;

      //let wb_bn = new BN(await (web3jsReadersList.get()).eth.getBalance(userObject.account));
      let wb_bn = new BN(await window.web3js_reader.eth.getBalance(userObject.account));
      let amount_bn = new BN(amount);

      if (wb_bn.cmp(amount_bn) == -1) {
        modal_add_deposit.isLoadedAfterConfirm(false);
        errorMsg('you do not have enough BNB in your wallet');
        return;
      }

    } else { //ERC20 - check approval

      let token_contract = await new window.web3js.eth.Contract(erc20TokenContractAbi, userObject.state.selected_depprofile_token_address);
      let allow = new BN(await token_contract.methods.allowance(userObject.account, window.staking_contract_address).call({
        from: userObject.account
      }));

      let tokenAmountToApprove = new BN(amount);
      //amount is already adjusted *10**18
      let calculatedApproveValue = tokenAmountToApprove; //tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));

      if (allow < calculatedApproveValue) {
        modal_add_deposit.isLoadedAfterConfirm(false);
        errorMsg('please approve tokens move / wait for approval transaction to finish');
        return;
      }

      let erc20_count = await token_contract.methods.balanceOf(userObject.account).call({
        from: userObject.account
      });
      let erc20_count_bn = new BN(erc20_count);
      let amount_bn = new BN(amount);

      if (erc20_count_bn.cmp(amount_bn) == -1) {
        modal_add_deposit.isLoadedAfterConfirm(false);
        errorMsg('you do not have enough tokens in your wallet');
        return;
      }
    }
  }

  resetMsg();

  initStakingContract(async (stakingContractInstance) => {
    stakingContractInstance.methods.deposit(amount, token_ids, dep_profile_id, window.famer).send({
        from: userObject.account,
        value: wei_val,
        gasPrice: window.gp
      }, function (error, txnHash) {
        if (error) {
          modal_add_deposit.isLoadedAfterConfirm(false);
          throw error;
        }
        output_transaction(txnHash)
      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (confirmationNumber == 5) {
          await updateData('make_deposit');
          modal_add_deposit.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch(error => {
        modal_add_deposit.isLoadedAfterConfirm(false);
        errorMsg('smartcontract communication error');
      });
  });
}

async function approve_stake_liq() {
  modal_add_lliquidity.isLoadingAfterApprove();

  if (!userObject.state.liq_pair_name) {
    modal_add_lliquidity.isLoadedAfterApprove(false)
    errorMsg('You need to select liquidity pair');
    return;
  }

  let amount_wei = (safeFloatToWei(document.getElementById('liq_pair_stake_am').value)).toString(); //wei
  approveTokenMove(userObject.state.liq_pair_address, amount_wei, window.staking_contract_address, modal_add_lliquidity);
}

async function stake_liq() {
  modal_add_lliquidity.isLoadingAfterConfirm();

  if (!userObject.state.liq_pair_name) {
    modal_add_lliquidity.isLoadedAfterConfirm(false, false);
    errorMsg('you need to select liquidity pair');
    return;
  }

  if (!userObject.state.liq_pair_fullcode) {
    modal_add_lliquidity.isLoadedAfterConfirm(false, false);
    errorMsg('you need to select term');
    return;
  }

  let dep_profile_id = await unswIDByProfileName(userObject.state.liq_pair_fullcode);
  let amount;
  let wei_val = 0;
  let token_ids = new Array();

  amount = (safeFloatToWei(document.getElementById('liq_pair_stake_am').value)).toString(); //wei

  let token_contract = await new window.web3js.eth.Contract(erc20TokenContractAbi, userObject.state.liq_pair_address);
  let allow = new BN(await token_contract.methods.allowance(userObject.account, window.staking_contract_address).call({
    from: userObject.account
  }));

  let tokenAmountToApprove = new BN(amount);

  //amount is already adjusted *10**18
  let calculatedApproveValue = tokenAmountToApprove; //tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));

  if (allow < calculatedApproveValue) {
    modal_add_lliquidity.isLoadedAfterConfirm(false, false);
    errorMsg('please approve tokens move / wait for approval transaction to finish');
    return;
  };

  let erc20_count = await token_contract.methods.balanceOf(userObject.account).call({
    from: userObject.account
  });
  let erc20_count_bn = new BN(erc20_count);
  let amount_bn = new BN(amount);

  if (erc20_count_bn.cmp(amount_bn) == -1) {
    modal_add_lliquidity.isLoadedAfterConfirm(false, false);
    errorMsg('you do not have enough tokens in your wallet');
    return;
  }

  resetMsg();

  initStakingContract(async (stakingContractInstance) => {

    stakingContractInstance.methods.deposit(amount, token_ids, dep_profile_id, NONE_FAMER_ID).send({
        from: userObject.account,
        value: wei_val,
        gasPrice: window.gp
      }, function (error, txnHash) {
        if (error) {
          modal_add_lliquidity.isLoadedAfterConfirm(false);
          throw error;
        }
        output_transaction(txnHash)

      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (confirmationNumber == 5) {
          await updateData('stake_liq');
          modal_add_lliquidity.isLoadedAfterConfirm();
        }
        resetMsg();

      })
      .catch(error => {
        modal_add_lliquidity.isLoadedAfterConfirm(false);
        errorMsg('smartcontract communication error');

      });
  });
}

async function approve_deposit() {

  modal_add_deposit.isLoadingAfterApprove();

  if (userObject.state.selected_depprofile == -1) {
    modal_add_deposit.isLoadedAfterApprove(false);
    errorMsg('you need to select asset');
    return;
  }
  let dep_profile_id = userObject.state.selected_depprofile;

  if (userObject.state.selected_depprofile_name == 'nft') {
    let isApproved = await window.cyclops_nft_smartcontract.methods.isApprovedForAll(userObject.account, window.staking_contract_address).call({
      from: userObject.account
    });

    if (isApproved) {
      modal_add_deposit.isLoadedAfterApprove();
      successMsg('already approved');
      return;
    } else {
      //solidity: function setApprovalForAll(address _operator,bool _approved) external{}
      window.cyclops_nft_smartcontract.methods.setApprovalForAll(window.staking_contract_address, true).send({
          from: userObject.account,
          gasPrice: window.gp
        }, function (error, txnHash) {
          if (error) {
            modal_add_deposit.isLoadedAfterApprove(false);
            throw error;
          }
          output_transaction(txnHash)

        })
        .on('confirmation', function (confirmationNumber, receipt) {
          if (confirmationNumber == 5) {
            successMsg('NFT move approved');
            modal_add_deposit.isLoadedAfterApprove();
          }
        })
        .catch(error => {
          errorMsg('smartcontract communication error');
          modal_add_deposit.isLoadedAfterApprove(false);
        });

    }
  } else {

    if (userObject.state.selected_depprofile_type == NATIVE_ETHEREUM) {
      return; //no need..
    }

    let amount_wei = (safeFloatToWei(document.getElementById('tokens_amount').value)).toString(); //wei
    approveTokenMove(userObject.state.selected_depprofile_token_address, amount_wei, window.staking_contract_address, modal_add_deposit);
  }
}

async function approveTokenMove(token_address, amount_wei, toAddress, modal) {

  let BN = window.web3js_reader.utils.BN;

  // Calculate contract compatible value for approve with proper decimal points using BigNumber 
  let tokenAmountToApprove = new BN(amount_wei);
  let calculatedApproveValue = window.web3js_reader.utils.toHex(tokenAmountToApprove);
  let token_contract = await new window.web3js.eth.Contract(erc20TokenContractAbi, token_address);

  await token_contract.methods.approve(toAddress, calculatedApproveValue).send({
      from: userObject.account,
      gasPrice: window.gp
    }, function (error, txnHash) {
      if (error) {
        modal.isLoadedAfterApprove(false);
        throw error;
      }
      output_transaction(txnHash)

    })
    .on('confirmation', function (confirmationNumber, receipt) {
      if (confirmationNumber == 5) {
        successMsg('Tokens move approved');
        modal.isLoadedAfterApprove();
      }
    })
    .catch(error => {
      modal.isLoadedAfterApprove(false);
      errorMsg('smartcontract communication error');
    });
}

function output_transaction(txnHash) {
  const ch = 'testnet.';
  infoMsg(`<a target="_blank" href="https://${ch}bscscan.com/tx/${txnHash}">last transaction:${txnHash}</a>`);
}

function safeSetValueById(id, value, disp = 'block') {
  var el = document.getElementById(id);
  if (el) {
    el.value = value;
    if (value == '') el.style.display = "none";
    else el.style.display = disp;
  }
}

function safeSetInnerHTMLById(id, value, disp = 'block', className = null) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = value;
    if (value == '') {
      if (!className) {
        el.style.display = "none"
      } else {
        el.classList.add(className)
      }
    } else {
      if (!className) {
        el.style.display = disp;
      } else {
        el.classList.remove(className)
      }
    }
  }
}

function safeSetValueBySelector(selector, value) {

  var els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (item) {
      item.value = value;
    });
  }
}

function safeHideBySelector(selector) {

  var els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (item) {
      item.style.display = "none";
    });
  }
}

function safeShowBySelector(selector, disp = "block") {

  var els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (item) {
      item.style.display = disp;
    });
  }
}

function safeSetInnerHTMLBySelector(selector, value, disp = 'block') {
  var els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (el) {
      el.innerHTML = value;
      if (value == '') el.style.display = "none"
      else el.style.display = disp;
    });
  }
}

function safeAddClassBySelector(selector, aclass) {
  var els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (item) {
      item.classList.add(aclass);
    });
  }
}

function safeRemoveClassBySelector(selector, aclass) {
  var els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (item) {
      item.classList.remove(aclass);
    });
  }
}

function shortenWallet(wallet) {
  return wallet.slice(0, 9) + '...' + wallet.slice(-4);
}

function safeFloatToWei(num) { //as string
  var num_s = num.toString();

  //calc digits after 'dot'
  var n = num_s.indexOf(',');
  if (n == -1) n = num_s.indexOf('.');
  if (n == -1) {
    num_s = num_s + '.0';
    n = num_s.indexOf('.');
  }
  let num_dig = num_s.length - n - 1

  //float as integer in string form
  num_s = num_s.substr(n + 1);
  if (num >= 1) {
    num_s = (parseInt(num)).toString() + num_s;
  }

  //divide adj constant on 10**[num digits after dot]
  let bn_adj = new window.BN(ADJ_CONSTANT.toString());

  bn_adj = bn_adj.div((new window.BN(10)).pow(new BN(num_dig)));

  //bn based on float as integer in string form
  let bn_num = new window.BN(num_s);

  //adjust with adj constant
  bn_num = bn_num.mul(bn_adj);

  //and return in BN form
  return bn_num;
}

function successMsg(msg) {
  safeSetInnerHTMLById('info_pane_message', msg);
  document.getElementById('info_pane').classList.remove('info_pane_error', 'info_pane_info', 'info_pane_success');
  document.getElementById('info_pane').classList.add('info_pane_success');
}

function infoMsg(msg) {
  safeSetInnerHTMLById('info_pane_message', msg);
  document.getElementById('info_pane').classList.remove('info_pane_error', 'info_pane_info', 'info_pane_success');
  document.getElementById('info_pane').classList.add('info_pane_info');
}

function errorMsg(msg) {
  safeSetInnerHTMLById('info_pane_message', msg);
  document.getElementById('info_pane').classList.remove('info_pane_error', 'info_pane_info', 'info_pane_success');
  document.getElementById('info_pane').classList.add('info_pane_error');
}

function resetMsg() {
  document.getElementById('info_pane').classList.remove('info_pane_error', 'info_pane_info', 'info_pane_success');
  safeSetInnerHTMLById('info_pane_message', '');
}

function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

async function onUniversalConnect() {

  try {
    window.provider = await web3Modal.connect();
    getAccountWalletConnect();
  } catch (e) {
    return;
  }

  window.provider.on("accountsChanged", (accounts) => {
    getAccountWalletConnect();
  });

  // Subscribe to chainId change
  window.provider.on("chainChanged", (chainId) => {
    if (chainId == '0x2a') window.location.replace('https://debank.cyclops.game');
    window.location.reload();
  });

  // Subscribe to networkId change
  window.provider.on("networkChanged", (networkId) => {
    getAccountWalletConnect();
  });

}

/*

https://data-seed-prebsc-1-s1.binance.org:8545/
https://data-seed-prebsc-2-s1.binance.org:8545/
https://data-seed-prebsc-1-s2.binance.org:8545/
https://data-seed-prebsc-2-s2.binance.org:8545/
https://data-seed-prebsc-1-s3.binance.org:8545/
https://data-seed-prebsc-2-s3.binance.org:8545/

*/
let web3jsReadersList = {
  rpc_list: new Array(
    'https://data-seed-prebsc-1-s1.binance.org:8545/',
    'https://data-seed-prebsc-2-s1.binance.org:8545/',
    'https://data-seed-prebsc-1-s2.binance.org:8545/',
    'https://data-seed-prebsc-2-s2.binance.org:8545/',
    'https://data-seed-prebsc-1-s3.binance.org:8545/',
    'https://data-seed-prebsc-2-s3.binance.org:8545/'
  ),
  web3js_list: new Array,
  index: 0,

  init: async function () {
    let await_array = new Array();
    for (let i = 0; i < this.rpc_list.length; i++) {
      await_array.push(new Web3(new Web3.providers.HttpProvider(this.rpc_list[i])));
    }
    this.web3js_list = await Promise.all(await_array);
  },

  get: function () {
    let ret_val = this.web3js_list[this.index];
    this.index++;
    if (this.index > 3) this.index = 0;
    return ret_val;
  }
}

async function initWeb3jsReader(callback = null) {
  if (!window.web3js_reader) {
    window.web3js_reader = await new Web3(new Web3.providers.HttpProvider(infura_endpoint[window.chainId]));
  }
  //and in any case
  if (callback) callback(window.web3js_reader);
}

function isWeb3Connected() {

  if (isMetaMaskInstalled()) {
    return true
  } else {
    return !!window.provider;
  }
}

async function connectWeb3() {
  if (isMetaMaskInstalled()) {
    window.ethereum.autoRefreshOnNetworkChange = false;
    getAccount();

    window.ethereum.on('accountsChanged', function (accounts) {
      getAccount();
    });

    window.ethereum.on('chainChanged', (chainId) => {
      if (chainId == '0x2a') window.location.replace('https://debank.cyclops.game');
      window.location.reload();
    });

  } else {

    //try to connect with something built-in, like Opera
    try {
      await window.web3.currentProvider.enable();
      if (window.web3.currentProvider.isConnected()) {
        window.provider = window.web3.currentProvider;
        getAccountWalletConnect();
        return;
      }

    } catch {
      //do nothing
    }

    initWeb3Modal();
    //await web3Modal.updateTheme("dark");

    await onUniversalConnect();
    //errorMsg("You need to install MetaMask");

  }
}

async function onUniversalDisconnect() {

  // TODO: Which providers have close method?
  if (window.provider.close) {
    await window.provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    window.provider = null;

  }

  userObject.account = null;

  window.location.reload();
}

async function toggleWeb3Connect() {
  if (isMetaMaskInstalled()) return; //do nothing, we just use metamask

  if (!isWeb3Connected()) { //connect to mobile wallet
    await connectWeb3();
    if (isWeb3Connected()) {
      walletButton.classList.remove('web3-disconnected');
      walletButton.classList.add('web3-connected');
    }

    return;
  } else { //disconnect from mobile wallet
    await onUniversalDisconnect();
    if (!isWeb3Connected()) {
      walletButton.classList.remove('web3-connected');
      walletButton.classList.add('web3-disconnected');
    }

    return;
  }
}

function copyToClipboard(elem) { //elem should be input  
  elem.select();
  elem.setSelectionRange(0, 99999)
  document.execCommand("copy");
}

async function updateData(action = null) {

  console.log('update data call, action =', action);

  await userObject.load(); //only once, userObject controls it

  if (!action) { //only when loaded

    getDepositsDashboard(() => {
      document.getElementById('debank_load_bar').ldBar.set(100);
    });

    getCreditsDashboard(() => {
      document.getElementById('debank_load_bar').ldBar.set(75);
    });

    getLiquidityDashboard(() => {
      document.getElementById('debank_load_bar').ldBar.set(45);
    });

    //getFamersDashboard();
  } else if (action == 'make_deposit') {
    await getDepositsDashboard();
  } else if (action == 'withdraw_deposit') {
    await getDepositsDashboard();
    await getLiquidityDashboard();
  } else if (action == 'withdraw_deposit_reward') {
    await getDepositsDashboard();
    await getLiquidityDashboard();
  } else if (action == 'get_credit') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action == 'set_leverage') {
    await getCreditsDashboard();
  } else if (action == 'unfreeze_leverage') {
    await getCreditsDashboard();
  } else if (action == 'return_credit') {
    await getCreditsDashboard();
  } else if (action == 'return_fee') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action == 'stake_liq') {
    await getLiquidityDashboard();
  }

}

function loginAdmin() {

  const msgParams = [{
      type: 'string',
      name: 'Authorization',
      value: 'Sign to confirm your access to admin wallet'
    },
    {
      type: 'string',
      name: 'Timestamp',
      value: Math.floor(Date.now() / 100000).toString()
    },
    {
      type: 'uint32',
      name: 'Randon number for extra security',
      value: Math.floor(Math.random() * 100000000)
    }
  ];

  window.ethereum
    .request({
      method: 'eth_signTypedData',
      params: [msgParams, userObject.account]
    })
    .then((result) => {
      encr_message = result;

      checkAdminAuthentification(msgParams, encr_message, 'admin.php');
    })
    .catch((error) => {
      if (error.code === 4001) {
        errorMsg('we need you to sign message to get admin access');
      } else {
        //console.error(error);
      }
    })

}

function updTotalsTable() {

  const msgParams = [{
      type: 'string',
      name: 'Authorization',
      value: 'Sign to confirm your access to admin wallet'
    },
    {
      type: 'string',
      name: 'Timestamp',
      value: Math.floor(Date.now() / 100000).toString()
    },
    {
      type: 'uint32',
      name: 'Randon number for extra security',
      value: Math.floor(Math.random() * 100000000)
    }
  ];

  window.ethereum
    .request({
      method: 'eth_signTypedData',
      params: [msgParams, userObject.account]
    })
    .then(async (result) => {
      encr_message = result;
      safeSetInnerHTMLById('total_tokens_balance', 'Updating, please stay on page..');
      let new_totals_tab = await buildTotalDashboard();

      checkAdminAuthentification(msgParams, encr_message, 'upd_totals.php', {
        var_name: "totals_tab",
        var_value: new_totals_tab
      });
    })
    .catch((error) => {
      if (error.code === 4001) {
        errorMsg('we need you to sign message to get admin access');
      } else {
        //console.error(error);
      }
    })
}

function checkAdminButton(token) {
  //admin functions work only with MM
  if (!isMetaMaskInstalled()) return;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "wallet_id": userObject.account
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(WALLETS_API_URL + '/get_wallet_type', requestOptions)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }

    })
    .then(respJson => {
      var wallet_type = respJson.type;
      if (wallet_type == "admin") {
        if (document.getElementById("adminButton")) {
          document.getElementById("adminButton").style.display = "block";
          document.getElementById("adminButton").addEventListener("click", loginAdmin);
        }

        if (document.getElementById("upd_totals")) {
          document.getElementById("upd_totals").style.display = "block";
          document.getElementById("upd_totals").addEventListener("click", updTotalsTable);
        }
      }

    })
    .catch(error => {
      //console.log("get wallet type error:"+error);

    });
}

function setWalletPref(pref) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "wallet_id": userObject.account,
    page_id: pref.page_id
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    keepalive: true
    //redirect: 'follow'
  };

  fetch(WALLETS_API_URL + '/set_wallet_pref', requestOptions)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }

    })
    .then(respJson => {
      var type = respJson.type;

      if (type == "success") {
        //
      } else {
        errorMsg("setting wallet preferences error");
      }

    })
    .catch(error => {
      errorMsg("set wallet preferences error");

    });
}

async function getWalletPref() {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "wallet_id": userObject.account
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
    //redirect: 'follow'
  };

  await fetch(WALLETS_API_URL + '/get_wallet_pref', requestOptions)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }

    })
    .then(respJson => {
      var type = respJson.type;

      if (type == "success") {

        if (!respJson.value.page_id) {
          userObject.state.current_page_id = 'dashboard-tab';
        } else {
          userObject.state.current_page_id = respJson.value.page_id;
        }

      } else {
        userObject.state.current_page_id = 'dashboard-tab';
      }

    })
    .catch(error => {
      userObject.state.current_page_id = 'dashboard-tab';
    });
}

function checkAdminAuthentification(msg_params, encr_message, php_script, extra_data = null) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "wallet_id": userObject.account,
    msg_params: msg_params,
    encrypted_message: encr_message
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(WALLETS_API_URL + '/check_signed_message', requestOptions)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }

    })
    .then(respJson => {

      //if we are here, it success (see backend implementation) 
      //we store signed message & signed data as token
      window.msg_params = msg_params;
      window.encr_message = encr_message;
      //in admin functions we will call checkAdminAuthentification (window.window.msg_params,window.encr_message)
      //to verify admin access, after page is reload, metamask need to sign message again

      //redirect to admin page, where at backend we also check 
      //credentials 

      var postData = new Array;

      postData["body_raw"] = raw;
      if (extra_data) {
        postData["extra_data"] = JSON.stringify(extra_data);
      }

      postAndRedirect(window.location.href + php_script, postData);

    })
    .catch(error => {
      errorMsg('This wallet does not have admin access');
    });
}

function postAndRedirect(url, postData) {

  var postFormStr = "<form method='POST' action='" + url + "'>\n";

  for (var key in postData) {
    if (postData.hasOwnProperty(key)) {
      postFormStr += "<input type='hidden' name='" + key + "' value='" + postData[key] + "'></input>";
    }
  }

  postFormStr += "</form>";

  var formElement = $(postFormStr);

  $('body').append(formElement);
  $(formElement).submit();
}

function assetNFTUrlByName(asset_name) {
  return NFT_ROOT_URL + '/' + asset_name + '.json';
}

async function getBackendParameter(var_name, callback = null) {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  await fetch(WALLETS_API_URL + '/get_var/' + var_name, requestOptions)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }

    })
    .then(respJson => {

      if (respJson.type == "success") {

        resetMsg();
        if (callback) callback(respJson.var);

      } else {
        errorMsg('API error');
      }

    })
    .catch(error => {});
}

async function initFamersRegisterContract(callback = null) {

  if (!window.famers_register_smartcontract) {

    if (window.web3js) {
      window.famers_register_smartcontract = await new window.web3js.eth.Contract(famers_register_abi, window.famers_register_contract_address);
      if (callback) callback(window.famers_register_smartcontract);
    }

  } else {
    if (callback) callback(window.famers_register_smartcontract);
  }
}

async function initFamersRegisterContractReader(callback = null) {

  if (!window.famers_register_smartcontract_reader) {

    //if (window.web3js_reader){
    let reader = web3jsReadersList.get();
    window.famers_register_smartcontract_reader = await new reader.eth.Contract(famers_register_abi, window.famers_register_contract_address);
    if (callback) callback(window.famers_register_smartcontract_reader);
    //}

  } else {
    if (callback) callback(window.famers_register_smartcontract_reader);
  }
}

async function initDataProviderContractReader(callback = null) {

  if (!window.data_provider_smartcontract_reader) {

    //if (window.web3js_reader){
    window.data_provider_smartcontract_reader = await new(web3jsReadersList.get()).eth.Contract(data_provider_abi, window.data_provider_contract_address);

    //window.data_provider_smartcontract_reader = await new window.web3js_reader.eth.Contract(data_provider_abi, window.data_provider_contract_address); 
    if (callback) callback(window.data_provider_smartcontract_reader);
    //}

  } else {
    if (callback) callback(window.data_provider_smartcontract_reader);
  }
}

function getSmartContractFamerProfile(getProfileIdCallback, setDetailsCallback) {
  if (getProfileIdCallback() == 0) {
    infoMsg('please select profile');
    return;
  }

  getSmartcontractFamerProfileDetails(getProfileIdCallback, setDetailsCallback);
}

async function getSmartcontractFamerProfileDetails(getProfileIdCallback, setDetailsCallback) {

  var profile_id = getProfileIdCallback() - 1;

  initFamersRegisterContract(async (famersContractInstance) => {

    let prof_details = await famersContractInstance.methods.famers(profile_id).call({
      from: userObject.account
    });

    let json_details = {};
    json_details['famer_token_address'] = prof_details[0];
    json_details['sold'] = rev_to_bool[prof_details[1]];
    json_details['sold_for'] = prof_details[2];

    setDetailsCallback(json_details);

  });
}

async function getFamersList() {

  let flist = new Array();

  let profiles_len = await window.famers_register_smartcontract_reader.methods.famersLength().call({
    from: userObject.account
  });

  for (let i = 0; i < profiles_len; i++) {

    let option = {};
    option.text = await window.famers_register_smartcontract_reader.methods.getFamerName(i).call({
      from: userObject.account
    });

    let json_path = await window.famers_register_smartcontract_reader.methods.getFamerUri(i).call({
      from: userObject.account
    });
    let response = await fetch('https://cors-proxy.etna.network/?url=' + json_path);
    let json_content = await response.json();

    option.value = i + 1;
    option.selected = false;
    option.f_id = i;
    option.description = json_content.description;
    option.imageSrc = json_content.image;

    flist.push(option);
  }

  window.famers = flist;

  return flist;
}

async function getDepositProfilesList() { //for dropdown

  /*	
  	if (!userObject.deposit_profiles){
      	userObject.deposit_profiles = await getAllProfiles();
      } else {
      		
      }*/
  let plist = new Array();

  //
  //({ p_id: p_id, p_name: p_name, p_dep_type: p_dep_type, 
  //	 p_tok_addr: p_tok_addr, init_apy: init_apy, rate: rate,
  //	 reward_per_day: reward_per_day, min_lock_time: min_lock_time });
  //

  for (let i = 0; i < userObject.deposit_profiles.length; i++) {
    let option = {};

    option.text = userObject.deposit_profiles[i].p_name; //name
    option.p_id = userObject.deposit_profiles[i].p_id; //profile id
    option.d_type = userObject.deposit_profiles[i].p_dep_type; //dep type
    option.d_tok_addr = userObject.deposit_profiles[i].p_tok_addr;
    let json_details = {};
    json_details['id'] = userObject.deposit_profiles[i].p_id;
    json_details['name'] = userObject.deposit_profiles[i].p_name;
    json_details['deposit_type'] = userObject.deposit_profiles[i].p_dep_type;
    json_details['deposit_token_address'] = userObject.deposit_profiles[i].p_tok_addr;
    json_details['init_apy'] = userObject.deposit_profiles[i].init_apy;
    json_details['rate'] = userObject.deposit_profiles[i].rate;
    json_details['reward_per_day'] = userObject.deposit_profiles[i].reward_per_day;
    json_details['min_lock_time'] = userObject.deposit_profiles[i].min_lock_time;

    option.value = JSON.stringify(json_details);
    option.selected = false;
    option.description = '';
    option.imageSrc = '';

    plist.push(option);
  }
  return plist;

}

async function getCreditProfilesList() { //for dropdown

  let plist = new Array();

  for (let i = 0; i < userObject.credit_profiles.length; i++) {
    let option = {};

    option.text = userObject.credit_profiles[i].name;
    option.p_id = userObject.credit_profiles[i].id;
    option.c_type = userObject.credit_profiles[i]._type;
    option.c_tok_addr = userObject.credit_profiles[i]._token_address;
    let json_details = {};
    json_details['id'] = userObject.credit_profiles[i].id;
    json_details['name'] = userObject.credit_profiles[i].name;
    json_details['_type'] = userObject.credit_profiles[i]._type;
    json_details['_token_address'] = userObject.credit_profiles[i]._token_address;
    json_details['valuation_percent'] = userObject.credit_profiles[i].valuation_percent;
    json_details['init_apy'] = userObject.credit_profiles[i].init_apy;
    json_details['rate'] = userObject.credit_profiles[i].rate;

    option.value = JSON.stringify(json_details);
    option.selected = false;
    option.description = '';
    option.imageSrc = '';

    plist.push(option);
  }
  return plist;

}

async function getCreditProfilesListCredit() { //for dropdown

  let full_list = await getCreditProfilesList();

  let plist = new Array();

  /*if (!userObject.credit_profiles){
    		userObject.credit_profiles = await getAllCreditProfiles();
    	} else {
    		
    }*/
  //all except NFT, we do not give credits in NFT
  for (let i = 0; i < full_list.length; i++) {
    if (full_list[i].c_type == ERC721_TOKEN) continue;
    plist.push(full_list[i]);
  }
  return plist;

}
const setState = (state) => {
  userObject.state = {
    ...userObject.state,
    ...state
  };
}
async function depositModalUpdateNftDropdown() {
  const nftData = await getNFTAssets();
  updateAssetsDropdown(nftData);

  if (userObject.state.selected_depprofile_name === 'nft') {
    updUSDValue('-', 'usd_value');
  }
}

async function depositModalRebuild() {
  if (modal_add_deposit.isLoading) return;
  var ddData = await getDepositProfilesList();

  const depprofilesDropdown = modal_add_deposit.modal.querySelector('#depprofiles-dropdown');
  const nftAssetsDropdownRow = modal_add_deposit.modal.querySelector('#assets-dropdown');
  const assetsAmountRow = modal_add_deposit.modal.querySelector('#tokens_amount').parentNode;
  const depositSelectedAsset = depprofilesDropdown.value;
  const currentDepProfile = ddData.find(item => item.text === depositSelectedAsset);

  setState({
    selected_depprofile: currentDepProfile.p_id,
    selected_depprofile_name: currentDepProfile.text,
    selected_depprofile_type: currentDepProfile.d_type,
    selected_depprofile_token_address: currentDepProfile.d_tok_addr,
  })

  if (currentDepProfile.d_type == NATIVE_ETHEREUM) {
    modal_add_deposit.approve.classList.add('btn-done');
    modal_add_deposit.approve.disabled = true;
    modal_add_deposit.confirm.disabled = false;
  } else {
    modal_add_deposit.approve.classList.remove('btn-done');
    modal_add_deposit.approve.disabled = false;
    modal_add_deposit.confirm.disabled = true;
  }

  if (currentDepProfile.text == 'nft') {
    nftAssetsDropdownRow.classList.remove('hidden')
    assetsAmountRow.classList.add('hidden')
    updUSDValue('-', 'usd_value');
  } else {
    nftAssetsDropdownRow.classList.add('hidden')
    assetsAmountRow.classList.remove('hidden')
    updUSDValue('tokens_amount', 'usd_value');
  }
}

const setOptionsToSelect = (data, select) => {
  data.forEach(asset => {
    const option = document.createElement('option');
    option.value = asset.text;
    option.innerHTML = asset.text;
    select.appendChild(option);
  })
}

async function initDepositProfilesDropdown() {
  const ddData = await getDepositProfilesList();
  const nftData = await getNFTAssets();

  initAssetsDropdown(nftData);

  const depprofilesDropdown = modal_add_deposit.modal.querySelector('#depprofiles-dropdown');
  const assetsAmmountValue = modal_add_deposit.modal.querySelector('#tokens_amount');

  setOptionsToSelect(ddData, depprofilesDropdown);

  new CustomSelect({
    elem: depprofilesDropdown,
  });

  assetsAmmountValue.oninput = depositModalRebuild;
  depprofilesDropdown.onchange = depositModalRebuild;
}

async function initCreditProfilesDropdown() {
  const ddData = await getCreditProfilesList();

  const dropdown = modal_add_credit.modal.querySelector('#credprofiles-dropdown');
  const tokensAmmountCollateral = modal_add_credit.modal.querySelector('#tokens_amount_collateral');
  const tokensAmmountGetCredit = modal_add_credit.modal.querySelector('#tokens_amount_getcredit');
  const usdValueCollateral = modal_add_credit.modal.querySelector('#usd_value_collateral');
  const creditPerc = modal_add_credit.modal.querySelector('#credit_perc');
  const fullCollateral = modal_add_credit.modal.querySelector('#full_collateral');
  const partCollateral = modal_add_credit.modal.querySelector('#part_collateral');
  const getCreditButton = modal_add_credit.modal.querySelector('#getcredit_button');

  const collateralDropdown = new Choices(dropdown, {
    classNames: {
      containerOuter: 'choices choices-collateral',
    },
    searchEnabled: false
  });

  const collateralDropdownOptions = ddData.map(item => {

    const deposit = getDepositByTokenId(item.p_id);

    if(deposit > 0) {
      return { value: item.text, label: item.text}
    }
  }).filter(item => !!item);
  
  collateralDropdownOptions[0].selected = true;
  collateralDropdown.setChoices(collateralDropdownOptions, 'value', 'label', true);


  userObject.state.selected_credprofile = ddData[0].p_id;
  full_collateral_btn(depAmountByProfileId(userObject.state.selected_credprofile)[0]);

  dropdown.addEventListener(
    'change',
    async function (e) {
        const value = e.target.value;
        const selectedData = ddData.find(item => item.text === value);
        if (value === 'nft') {
          fullCollateral.checked = true;
          partCollateral.parentNode.classList.add('hidden');
        } else {
          partCollateral.parentNode.classList.remove('hidden');
        }

        resetMsg();

        setState({
          selected_credprofile: selectedData.p_id
        })

        if (selectedData.p_id == userObject.state.getcredit_profile) {
          errorMsg("assets for collateral and credit should be different");
          getCreditButton.disabled = true;
        } else {
          getCreditButton.disabled = false;
        }

        setState({
          selected_credprofile_name: selectedData.text,
          selected_credprofile_type: selectedData.c_type,
          selected_credprofile_token_address: selectedData.c_tok_addr
        })

        tokensAmmountCollateral.value = depAmountByProfileId(userObject.state.selected_credprofile)[1];

        await updUSDValueCollateral('tokens_amount_collateral', 'usd_value_collateral', depAmountByProfileId(userObject.state.selected_credprofile)[0]);

        if (userObject.state.getcredit_profile != -1) {
          tokensAmmountGetCredit.innerText = await calcTokensFromUSD(userObject.state.getcredit_profile, usdValueCollateral.value);
          let apy = await window.usage_calc_smartcontract_reader.methods.calcVarApy(userObject.state.getcredit_profile, userObject.state.selected_credprofile).call({
            from: userObject.account
          });

          let apy_adj = (apy / apy_scale) * 100;
          creditPerc.value = ((parseFloat(apy_adj)).toFixed(2)).toString();
        }
      },
      false,
  );

}

async function initGetCreditDropdown() {
  var ddData = await getCreditProfilesListCredit();

  const dropdown = modal_add_credit.modal.querySelector('#getcredit-dropdown');
  const tokensAmmountGetCredit = modal_add_credit.modal.querySelector('#tokens_amount_getcredit');
  const usdValueCollateral = modal_add_credit.modal.querySelector('#usd_value_collateral');
  const creditPerc = modal_add_credit.modal.querySelector('#credit_perc');
  const getCreditButton = modal_add_credit.modal.querySelector('#getcredit_button');

  setOptionsToSelect(ddData, dropdown);

  new CustomSelect({
    elem: dropdown,
  });

  dropdown.onchange = async (e) => {
    const value = e.target.value;
    const selectedData = ddData.find(item => item.text === value);

    resetMsg();

    setState({
      getcredit_profile: selectedData.p_id
    })

    if (selectedData.p_id == userObject.state.selected_credprofile) {
      errorMsg("assets for collateral and credit should be different");
      getCreditButton.disabled = true;
    } else {
      getCreditButton.disabled = false;
    }

    tokensAmmountGetCredit.innerText = await calcTokensFromUSD(userObject.state.getcredit_profile, usdValueCollateral.value);

    if (userObject.state.selected_credprofile != -1) {
      let apy = await window.usage_calc_smartcontract_reader.methods.calcVarApy(userObject.state.getcredit_profile, userObject.state.selected_credprofile).call({
        from: userObject.account
      });
      let apy_adj = (apy / apy_scale) * 100;
      creditPerc.value = ((parseFloat(apy_adj)).toFixed(2)).toString();
    }
  }
}

function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  }
}

async function initFamersDropdowns() {
  var ddData = await getFamersList();

  $('#famer-dropdown1').ddslick({
    data: ddData,
    width: '16vw',
    selectText: "Select Famer",
    imagePosition: "left",

    onSelected: function (selectedData) {
      //callback function: do something with selectedData;
      window.famer = selectedData.selectedData.f_id;
    }
  });

  document.getElementById('famer-dropdown1').setAttribute('style', 'position:absolute !important; right: 7vw! important');

}

async function getNFTAssets() {

  let flist = new Array();

  let len = await window.cyclops_nft_smartcontract_reader.methods.balanceOf(userObject.account).call({
    from: userObject.account
  });

  for (let i = 0; i < len; i++) {
    let t_id = await window.cyclops_nft_smartcontract_reader.methods.tokenOfOwnerByIndex(userObject.account, i).call({
      from: userObject.account
    });
    let token_uri = await window.cyclops_nft_smartcontract_reader.methods.tokenURI(t_id).call({
      from: userObject.account
    });

    let response = await fetch(token_uri);
    let json_content = await response.json();
    let option = {};
    option.text = json_content.name;
    option.t_id = t_id;

    option.value = i + 1;
    option.selected = false;
    option.description = t_id; //json_content.description;
    option.imageSrc = json_content.image;

    flist.push(option);
  }

  return flist;
}

function initAssetsDropdown(data) {
  updateAssetsDropdown(data);

  nftAssetsSelect.passedElement.element.addEventListener(
    'change',

    function () {
      const values = nftAssetsSelect.getValue(true);
      userObject.state.selectedNFTAssets = values;
      depositModalRebuild()
    },
    false,
  );
}

function updateAssetsDropdown(data) {
  const assetSelectOptions = data.map(dataItem => ({
    value: {
      ...dataItem
    },
    label: `${dataItem.text}[${dataItem.t_id}]`,
  }));

  nftAssetsSelect.removeActiveItems();
  userObject.state.selectedNFTAssets = {};
  nftAssetsSelect.setChoices(assetSelectOptions, 'value', 'label', true);
}

async function getLiqTerms() {

  let lterms = new Array();

  let terms = [{
      text: '1 week',
      code: '1W'
    },
    {
      text: '2 weeks',
      code: '2W'
    },
    {
      text: '1 month',
      code: '1M'
    }
  ];

  for (let i = 0; i < terms.length; i++) {

    let option = {};
    option.text = terms[i].text;
    option.code = terms[i].code;

    option.value = i + 1;
    option.selected = false;
    option.description = '';
    option.imageSrc = '';

    lterms.push(option);
  }

  return lterms;
}

async function getLiqPairs() {

  let lpairs = new Array();

  let pairs = [{
      text: 'BNB-ST1',
      addr: '0xc5b5b56e9ba3b43a3960d8b48ac7fcdc535dc80e'
    },
    {
      text: 'BNB-ST2',
      addr: '0xf5f7ac1821beaba18e690298fe9c681d4a1971a4'
    }
  ];

  for (let i = 0; i < pairs.length; i++) {

    let option = {};
    option.text = pairs[i].text;
    option.addr = pairs[i].addr;

    option.value = i + 1;
    option.selected = false;
    option.description = '';
    option.imageSrc = '';

    lpairs.push(option);
  }

  return lpairs;
}

const setApyStr = async (asset) => {
  setState({
    liq_pair_fullcode: userObject.state.liq_pair_name + '-' + asset.code
  })

  const apy_str = await unswAPYStrByProfileName(userObject.state.liq_pair_fullcode);

  if (!apy_str) {
    errorMsg('cannot find APY for pair');
    return;
  }
  safeSetInnerHTMLById('liq_pair_apy', apy_str + ' APY', 'flex');
}

async function initLiqTermsDropdown() {

  const liqTermsSelect = modal_add_lliquidity.modal.querySelector('#liqterms-dropdown');
  const liqTermsData = userObject.liq_terms;
  setOptionsToSelect(liqTermsData, liqTermsSelect);

  new CustomSelect({
    elem: liqTermsSelect
  });

  setApyStr(liqTermsData[0])

  liqTermsSelect.onchange = (e) => {
    const value = e.target.value
    const currentOption = liqTermsData.find(item => item.text === value)
    setApyStr(currentOption)
  }
}

async function initLiqPairsDropdown() {
  const setBal = async (asset) => {
    setState({
      liq_pair_name: asset.text,
      liq_pair_address: asset.addr,
    })
    const bal = await getWalletBalanceStr(userObject.state.liq_pair_address);
    safeSetInnerHTMLById('liq_pair_in_wallet', bal, 'flex');
  }

  const liqPairsAssets = modal_add_lliquidity.modal.querySelector('#liqpairs-dropdown');
  const liqPairsAssetsOptions = userObject.liq_pairs;
  setOptionsToSelect(liqPairsAssetsOptions, liqPairsAssets);

  new CustomSelect({
    elem: liqPairsAssets
  });

  setBal(liqPairsAssetsOptions[0])

  liqPairsAssets.onchange = (e) => {
    const value = e.target.value
    const currentOption = liqPairsAssetsOptions.find(item => item.text === value)
    setBal(currentOption);

    const liqTermsValue = modal_add_lliquidity.modal.querySelector('#liqterms-dropdown').value;
    const currentLiqTerm = userObject.liq_terms.find(item => item.text === liqTermsValue)
    setApyStr(currentLiqTerm);
  }
}

async function getTotalDashboard(callback = null) {

  let html;
  await getBackendParameter('totals_tab', (content) => {
    html = content;
  });

  safeSetInnerHTMLById('total_tokens_balance', html);

  if (callback) callback();
}

// buildTotalDashboard

async function buildTotalDashboard() {
  let stakingContractInstance;
  await initStakingContract((contract) => {
    stakingContractInstance = contract;
  });

  let creditContractInstance;
  await initCreditContract((contract) => {
    creditContractInstance = contract;
  });

  let html =
    '<table class="min-w-full">' +
    '<thead>' +
    '<tr>' +
    '<th class="table-title" colspan = "2" scope = "colgroup">Assets</th>' +
    '<th class="table-title">Total Deposits</th>' +
    '<th class="table-title">Total Borrowed</th>' +
    '<th class="table-title">Deposit APY<sup>*</sup></th>' +
    '<th class="table-title">Variable Borrow APR<sup>*</sup></th>' +
    '<th class="table-title">Fixed Borrow APR<sup>*</sup></th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';

  let profiles = userObject.deposit_profiles;
  let cred_profiles = userObject.credit_profiles;

  let icon_column = new Array();
  let asset_column = new Array();
  let dep_column = new Array();
  //let extractable_dep_col = new Array();
  //let reward_col = new Array();
  //let extractable_reward_col = new Array();
  let cred_column = new Array();
  //let fee_column = new Array();

  for (let i = 0; i < profiles.length; i++) {
    icon_column.push('<td class="table-cell">' + createCellWithIcon(profiles[i]['p_name']) + '</td>');
    asset_column.push('<td class="table-cell">' + profiles[i]['p_name'] + '</td>');
    let dep_stat = await stakingContractInstance.methods.depositsStat(parseInt(profiles[i]['p_id'])).call({
      from: userObject.account
    });
    let dep_total = dep_stat[0];
    if (parseInt(profiles[i]['p_dep_type']) != ERC721_TOKEN)
      dep_total = window.web3js_reader.utils.fromWei(dep_total, 'ether');
    let dep_total_str = ((parseFloat(dep_total)).toFixed(3)).toString();

    dep_column.push('<td class="table-cell">' + dep_total_str + '</td>');
    /*
    let extr_dep_total = dep_stat[1];
    if (parseInt(profiles[i]['p_dep_type']) != ERC721_TOKEN)
     	extr_dep_total = window.web3js_reader.utils.fromWei(extr_dep_total, 'ether');

    let extr_dep_total_str = ((parseFloat(extr_dep_total)).toFixed(3)).toString();  
    extractable_dep_col.push('<td class="table-cell">'+extr_dep_total_str+'</td>');

    let rew_total = window.web3js_reader.utils.fromWei(dep_stat[2], 'ether');
    let rew_total_str = ((parseFloat(rew_total)).toFixed(3)).toString();  
    reward_col.push('<td class="table-cell">'+rew_total_str+'</td>');

    let extr_rew_total = window.web3js_reader.utils.fromWei(dep_stat[3], 'ether');
    let extr_rew_total_str = ((parseFloat(extr_rew_total)).toFixed(3)).toString();  
    extractable_reward_col.push('<td class="table-cell">'+extr_rew_total_str+'</td>');
    */
    let cred_stat = await creditContractInstance.methods.creditsStat(parseInt(profiles[i]['p_id'])).call({
      from: userObject.account
    });
    let cred_total = cred_stat[0];
    //let fee_total = cred_stat[1];
    if (parseInt(profiles[i]['p_dep_type']) != ERC721_TOKEN)
      cred_total = window.web3js_reader.utils.fromWei(cred_total, 'ether');
    let cred_total_str = ((parseFloat(cred_total)).toFixed(3)).toString();
    cred_column.push('<td class="table-cell">' + cred_total_str + '</td>');

    /*fee_total = window.web3js_reader.utils.fromWei(fee_total, 'ether'); 
    let fee_total_str = ((parseFloat(fee_total)).toFixed(3)).toString(); 
    fee_column.push('<td class="table-cell">'+fee_total_str+'</td>');*/
  }

  let usage_contract;
  await initUsageCalcContractReader((contract) => {
    usage_contract = contract;
  });

  let apy_column = new Array();
  for (let j = 0; j < profiles.length; j++) {
    let apy_str;

    let apy = parseInt(profiles[j]['init_apy']);
    let rate = parseInt(profiles[j]['rate']);
    let rate_real = rate / apy_scale;
    let apy_real = apy / apy_scale;
    let usage = await usage_contract.methods.getAssetUsage(profiles[j]['p_id']).call({
      from: userObject.account
    });
    let usage_real = usage / apy_scale;
    apy_real = apy_real + rate_real * usage_real;

    apy_str = ((apy_real * 100).toFixed(3)).toString() + '%';

    apy_column.push('<td class="table-cell">' + apy_str + '</td>');
  }

  let apr_column = new Array();
  for (let i = 0; i < profiles.length; i++) {
    let max_apr = 0.0;
    let min_apr = 999.0;
    for (let j = 0; j < profiles.length; j++) {

      let apr = await window.usage_calc_smartcontract_reader.methods.calcVarApy(profiles[i]['p_id'], profiles[j]['p_id']).call({
        from: userObject.account
      });
      let apr_adj = (apr / apy_scale) * 100;
      if (max_apr < apr_adj) max_apr = apr_adj;
      if (min_apr > apr_adj) min_apr = apr_adj;
    }
    apr_column.push('<td class="table-cell">' + ((parseFloat(max_apr)).toFixed(2)).toString() + '</td>');
  }

  let apr_fix_column = new Array();
  for (let i = 0; i < profiles.length; i++) {
    let max_apr = 0.0;
    let min_apr = 999.0;
    for (let j = 0; j < profiles.length; j++) {

      let apr = await window.usage_calc_smartcontract_reader.methods.calcFixedApy(profiles[i]['p_id'], profiles[j]['p_id']).call({
        from: userObject.account
      });
      let apr_adj = (apr / apy_scale) * 100;
      if (max_apr < apr_adj) max_apr = apr_adj;
      if (min_apr > apr_adj) min_apr = apr_adj;
    }

    apr_fix_column.push('<td class="table-cell"">' + ((parseFloat(max_apr)).toFixed(2)).toString() + '</td>');
  }

  for (let i = 0; i < profiles.length; i++) {
    //0 means max amount for ERC20 compatible and ignored for ERC721
    html += '<tr class="table-row">';

    html += icon_column[i];

    html += asset_column[i];

    html += dep_column[i];

    html += cred_column[i];

    //html += extractable_dep_col[i];

    //html += reward_col[i];

    //html += extractable_reward_col[i];

    html += apy_column[i];

    html += apr_column[i];

    html += apr_fix_column[i];
    //html += earned_column[i];

    //html += fee_column[i];

    html += '</tr>';
  }

  html += '</tbody>' +
    '</table>';

  html += '<span style="inline; font-size: 50%; "><sup>*</sup> Expected value, based on current system state shown: effective APY depends also on asset usage data, effective APR depends on collateral and credit asset and asset usage data.</span>'

  return html;
}

// FamersDashboard

async function getFamersDashboard() {
  await getFamersList();

  //** need to work here with votes calc contract
  initStakingContract(async (stakingContractInstance) => {

    let html =
      '<table class="min-w-full">' +
      '<thead>' +
      '<tr>' +
      '<th class="table-title">Famer</th>' +
      '<th class="table-title">Votes</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

    let famers_table = new Array(window.famers.length);

    for (let i = 0; i < window.famers.length; i++) {
      famers_table[i] = {};
      famers_table[i]["name"] = '<td class="table-cell">' + window.famers[i].text + '</td>';
    }

    for (let i = 0; i < window.famers.length; i++) {
      let v = await stakingContractInstance.methods.getFamerVoteByFamer(i).call({
        from: userObject.account
      });
      famers_table[i]["dig_v"] = v;
      famers_table[i]["vote"] = '<td class="table-cell">' + v.toString() + '</td>';
    }

    famers_table.reverse((a, b) => {
      if (a.dig_v < b.dig_v) return -1;
      if (a.div_v == b.dig_v) return 0;
      return 1;
    });

    for (let i = 0; i < window.famers.length; i++) {
      //0 means max amount for ERC20 compatible and ignored for ERC721
      html += '<tr style="text-align: left; font-size: 0.75em">';

      html += famers_table[i]["name"];

      html += famers_table[i]["vote"];

      html += '</tr>';
    }

    html += '</tbody>' +
      '</table>';

    safeSetInnerHTMLById('famers_votes', html)
  });

}

async function getAllProfiles() {
  let profiles;
  await getBackendParameter('DEPPROFILES_UI_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles;

}

async function getAllProfilesWithUniswap() {

  let profiles;
  await getBackendParameter('ASSETS_UI_FULL_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles;

}

async function getAllProfilesUniswap() {
  let profiles;
  await getBackendParameter('ASSETS_UI_LIQ_PAIRS', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles;

}

async function getAllCreditProfiles() { //for dropdown
  /*
  	 struct CreditProfile {
        uint32 id;
        string name; // == data label for data provider
        uint8  _type; 
        address _token_address; //0x0 if ethereum
        uint256 valuation_percent; //scale = 100000;  i.e. 1% == 1000, 0.1% == 100
        uint256 init_apy; //APY = Initial APY + Rate * Usage, Usage = ration of borrowed/deposited; scale = 100000; i.e. 1% == 1000, 0.1% == 100
        uint256 rate;
      }

  */

  let profiles;
  await getBackendParameter('CREDIT_PROFILES_UI_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles;

  /*
  let plist = new Array();

  let cred_profiles_contract = await new window.web3js_reader.eth.Contract(credit_profiles_register_abi, window.credit_profiles_register_contract_address); 
  let profiles_len = await cred_profiles_contract.methods.creditProfilesLength().call({from:userObject.account});
  

  
  for(let i=0; i< profiles_len; i++){
  	let option = {};
  	let prof_details = await cred_profiles_contract.methods.creditProfiles(i).call({from:userObject.account});
  	
  	
  
  	option['id'] = prof_details[0];
  	option['name'] = prof_details[1];
  	option['_type'] = prof_details[2];
  	option['_token_address'] = prof_details[3];
  	option['valuation_percent'] = prof_details[4];
  	option['init_apy'] = prof_details[5];
  	option['rate'] = prof_details[6];
  

  	plist.push(option);
  }
  return plist;*/

}

function depTypeByProfileId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles.length; i++) {
    if (userObject.deposit_profiles[i].p_id == profile_id) {
      return parseInt(userObject.deposit_profiles[i].p_dep_type);
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

function tokenAddressByProfileId(profile_id) {

  for (let i = 0; i < userObject.deposit_profiles.length; i++) {
    if (userObject.deposit_profiles[i].p_id == profile_id) {
      return userObject.deposit_profiles[i].p_tok_addr;
    }
  }
  return zero_address;
}

function profileNameByProfileId(profile_id) {

  for (let i = 0; i < userObject.deposit_profiles.length; i++) {
    if (userObject.deposit_profiles[i].p_id == profile_id) {
      return userObject.deposit_profiles[i].p_name;
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

async function unswAPYStrByProfileName(profile_name) {
  if (!userObject.deposit_profiles_liqpairs) {
    userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
  } else {

  }

  for (let i = 0; i < userObject.deposit_profiles_liqpairs.length; i++) {
    if (userObject.deposit_profiles_liqpairs[i].p_name == profile_name) {
      let apy = parseInt(userObject.deposit_profiles_liqpairs[i].init_apy);
      let apy_real = apy / apy_scale;
      apy_str = ((apy_real * 100).toFixed(1)).toString() + '%';
      return apy_str;
    }
  }
  return null;
}

async function unswIDByProfileName(profile_name) {
  if (!userObject.deposit_profiles_liqpairs) {
    userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
  } else {

  }

  for (let i = 0; i < userObject.deposit_profiles_liqpairs.length; i++) {
    if (userObject.deposit_profiles_liqpairs[i].p_name == profile_name) {
      return parseInt(userObject.deposit_profiles_liqpairs[i].p_id);

    }
  }
  return null;
}

async function unswProfileNameByProfileId(profile_id) {
  if (!userObject.deposit_profiles_liqpairs) {
    userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
  } else {

  }

  for (let i = 0; i < userObject.deposit_profiles_liqpairs.length; i++) {
    if (userObject.deposit_profiles_liqpairs[i].p_id == profile_id) {
      return userObject.deposit_profiles_liqpairs[i].p_name;
    }
  }
  return null;
}

async function unswDepTypeByProfileId(profile_id) {
  if (!userObject.deposit_profiles_liqpairs) {
    userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
  } else {

  }

  for (let i = 0; i < userObject.deposit_profiles_liqpairs.length; i++) {
    if (userObject.deposit_profiles_liqpairs[i].p_id == profile_id) {
      return parseInt(userObject.deposit_profiles_liqpairs[i].p_dep_type);
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

// getCreditsDashboard

async function getCreditsDashboard(callback = null) {

  let html =
    '<table class="min-w-full">' +
    '<thead>' +
    '<tr>' +
    '<th class="table-title" colspan = "2" scope = "colgroup">Asset</th>' +
    '<th class="table-title">Borrowed mount</th>' +
    '<th class="table-title">USD value</th>' +
    '<th class="table-title">Collateral</th>' +
    '<th class="table-title">Duration days</th>' +
    '<th class="table-title">Curent APR<sup>*</sup></th>' +
    '<th class="table-title">Fee</th>' +
    '<th class="table-title table-title-right">Leverage Level</th>' +
    '<th class="table-title" colspan = "2" scope = "colgroup">Cover Fees with CYTR Leverage</th>' +
    '<th class="table-title table-title-empty"></th>' +
    '<th class="table-title">In wallet</th>' +
    '<th class="table-title">Deposit</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';

  //let profiles = userObject.deposit_profiles;

  let [am_arr, cred_arr, clt_arr] = await Promise.all([userObject.deposits.getAmArr(),
    userObject.credits.getCredArr(),
    userObject.credits.getCltArr()
  ]);

  let [lev_arr, lev_ratio_arr] = await userObject.credits.getLevArr();

  let [
    [icon_column, asset_column],
    apr_column,
    in_wallet_column,
    dep_column,
    cred_column,
    clt_column,
    usd_val_column,
    duration_col,
    fee_col,
    leverage_column,
    set_leverage_column,
    return_credit_col,
    return_empty_col,
  ] = await Promise.all([userObject.credits.getIconAssetsCols(),
    userObject.credits.getAPRCol(),
    userObject.credits.getInWalletCol(),
    userObject.credits.getDepCol(),
    userObject.credits.getCredCol(),
    userObject.credits.getCltCol(),
    userObject.credits.getUsdValCol(),
    userObject.credits.getDurationCol(),
    userObject.credits.getFeeCol(),
    userObject.credits.getLevCol(),
    userObject.credits.getSetLevCol(),
    userObject.credits.getReturnCreditCol(),
    userObject.credits.getReturnEmptyCol(),
  ]);

  for (let i = 0; i < cred_arr[0].length; i++) { //i == credit id

    if (cred_arr[1][i] > 0 || cred_arr[2][i] > 0 || lev_arr[i] > 0) {

      html += '<tr class="table-row">';

      html += icon_column[i];

      html += asset_column[i];

      html += cred_column[i];

      html += usd_val_column[i];

      html += clt_column[i];

      html += duration_col[i];

      html += apr_column[i];

      html += fee_col[i];

      html += leverage_column[i];

      html += set_leverage_column[i];

      html += return_credit_col[i];

      html += return_empty_col[i];

      html += in_wallet_column[i];

      html += dep_column[i];

    }

    html += '</tr>';
  }

  html += '</tbody>' +
    '</table>';

  html += '<span style="display: inline; font-size: 60%; "><sup>*</sup> Effective current credit APR, based on all conditions, incl. Leverage</span>'

  safeSetInnerHTMLById('my_credits', html, false, 'empty')

  if (callback) callback();
}

async function getLiquidityDashboard(callback = null) {

  //	initStakingContract(async (stakingContractInstance) => {
  stakingContractInstance = window.staking_smartcontract;

  let html =
    '<table class="min-w-full">' +
    '<thead>' +
    '<tr>' +
    '<th class="table-title" colspan = "2" scope = "colgroup">Liquidity-Pair</th>' +
    //'<th>In wallet</th>'+
    '<th class="table-title">Quantity</th>' +
    '<th class="table-title">Lockup</th>' +
    '<th class="table-title">Days till Withdraw</th>' +
    '<th class="table-title">USD value</th>' +
    '<th class="table-title">APY</th>' +
    '<th class="table-title">Duration days</th>' +
    '<th class="table-title">Extractable</th>' +
    '<th class="table-title">Withdraw deposit</th>' +
    '<th class="table-title">Current Yield CYTR</th>' +
    '<th class="table-title">Extractable Yield CYTR</th>' +
    '<th class="table-title">Withdraw yield</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';

  let profiles = userObject.deposit_profiles;

  let [am_arr, rew_arr] = await Promise.all([userObject.deposits.getAmArr(),
    userObject.deposits.getRewArr()
  ]);

  let [
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
  ] = await Promise.all([userObject.liq_earn.getIconAssetLockupCols(),
    userObject.liq_earn.getApyCol(),
    userObject.liq_earn.getDepCol(),
    userObject.liq_earn.getUsdValCol(),
    userObject.liq_earn.getDurationUnlockCol(),
    userObject.liq_earn.getExtrDepCol(),
    userObject.liq_earn.getWithdrawDepCol(),
    userObject.liq_earn.getWithdrawDepInputsCol(),
    userObject.liq_earn.getRewardCol(),
    userObject.liq_earn.getExtractableRewardCol(),
    userObject.liq_earn.getWithdrawRewCol()
  ]);

  let icon_column_s = new Array(icon_column.length);
  let asset_column_s = new Array(icon_column.length);
  //let in_wallet_column_s = new Array(profiles.length);
  let dep_column_s = new Array(icon_column.length);
  let lockup_period_s = new Array(icon_column.length);
  let unlock_col_s = new Array(icon_column.length);
  let usd_val_column_s = new Array(icon_column.length);
  let apy_column_s = new Array(icon_column.length);
  let duration_col_s = new Array(icon_column.length);
  let extractable_dep_col_s = new Array(icon_column.length);
  let withdraw_dep_col_s = new Array(icon_column.length);
  let withdraw_dep_inputs_col_s = new Array(icon_column.length);
  let reward_col_s = new Array(icon_column.length);
  let extractable_reward_col_s = new Array(icon_column.length);
  let withdraw_rew_col_s = new Array(icon_column.length);

  usd_val_only_col.sort((a, b) => parseInt(b.val) - parseInt(a.val));

  for (let i = 0; i < icon_column.length; i++) {
    let old_index = usd_val_only_col[i].ori_index;

    icon_column_s[i] = icon_column[old_index];
    asset_column_s[i] = asset_column[old_index];
    lockup_period_s[i] = lockup_period[old_index];
    unlock_col_s[i] = unlock_col[old_index];
    //in_wallet_column_s[i] = in_wallet_column[old_index];
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

  for (let i = 0; i < icon_column.length; i++) {
    //0 means max amount for ERC20 compatible and ignored for ERC721
    html += '<tr class="table-row">';

    html += icon_column_s[i];

    html += asset_column_s[i];

    //html += in_wallet_column_s[i];

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

  html += '</tbody>' +
    '</table>';

  safeSetInnerHTMLById('deposits_uniswap', html)
  if (callback) callback();

}

// getDepositsDashboard

async function getDepositsDashboard(callback = null) {

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

  let profiles = userObject.deposit_profiles;

  let [am_arr, rew_arr] = await Promise.all([userObject.deposits.getAmArr(),
    userObject.deposits.getRewArr()
  ]);

  //let rew_arr = await userObject.deposits.getRewArr();

  let [
    [icon_column, asset_column],
    apy_column,
    in_wallet_column,
    dep_column,
    [usd_val_column, usd_val_only_col],
    duration_col,
    extractable_dep_col,
    withdraw_dep_col,
    withdraw_dep_inputs_col,
    reward_col,
    extractable_reward_col,
    withdraw_rew_col
  ] = await Promise.all([userObject.deposits.getIconAssetsCols(),
    userObject.deposits.getApyCol(),
    userObject.deposits.getInWalletCol(),
    userObject.deposits.getDepCol(),
    userObject.deposits.getUsdValCol(),
    userObject.deposits.getDurationCol(),
    userObject.deposits.getExtractableDepCol(),
    userObject.deposits.getWithdrawDepCol(),
    userObject.deposits.getWithdrawDepInputsCol(),
    userObject.deposits.getRewardCol(),
    userObject.deposits.getExtractableRewardCol(),
    userObject.deposits.getWithdrawRewCol()
  ]);

  let icon_column_s = new Array(profiles.length);
  let asset_column_s = new Array(profiles.length);
  let in_wallet_column_s = new Array(profiles.length);
  let dep_column_s = new Array(profiles.length);
  let usd_val_column_s = new Array(profiles.length);
  let apy_column_s = new Array(profiles.length);
  let duration_col_s = new Array(profiles.length);
  let extractable_dep_col_s = new Array(profiles.length);
  let withdraw_dep_col_s = new Array(profiles.length);
  let withdraw_dep_inputs_col_s = new Array(profiles.length);
  let reward_col_s = new Array(profiles.length);
  let extractable_reward_col_s = new Array(profiles.length);
  let withdraw_rew_col_s = new Array(profiles.length);

  usd_val_only_col.sort((a, b) => parseInt(b.val) - parseInt(a.val));

  for (let i = 0; i < profiles.length; i++) {
    let old_index = usd_val_only_col[i].ori_index;

    icon_column_s[i] = icon_column[old_index];
    asset_column_s[i] = asset_column[old_index];
    in_wallet_column_s[i] = in_wallet_column[old_index];
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

  for (let i = 0; i < profiles.length; i++) {
    //0 means max amount for ERC20 compatible and ignored for ERC721
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

    html += withdraw_dep_inputs_col_s[i];

    html += reward_col_s[i];

    html += extractable_reward_col_s[i];

    html += withdraw_rew_col_s[i];

    html += '</tr>';
  }

  html += '</tbody>' +
    '</table>';

  safeSetInnerHTMLById('tokens_balance', html)

  if (callback) callback();
}

function openTab(event, tabid) {
  safeRemoveClassBySelector(".nav-link", "active");
  safeRemoveClassBySelector(".page", "active");
  event.srcElement.classList.add("active");
  document.getElementById(tabid).classList.add("active");
  userObject.state.current_page_id = tabid;
}

async function updUSDValue(tokens_amount_elem, usd_val_elem) {

  let contract = window.data_provider_smartcontract_reader;

  if (userObject.state.selected_depprofile_type == NATIVE_ETHEREUM) {

    let tokens_amount = document.getElementById(tokens_amount_elem).value;
    let BN = window.BN;
    let wei_amount = safeFloatToWei(tokens_amount); //BN
    let [data, dec] = await Promise.all([contract.methods.getData('BNBUSD').call({
      from: userObject.account
    }), contract.methods.getDecimals('BNBUSD').call({
      from: userObject.account
    })]);

    let usd_bn = new BN(wei_amount.mul(new BN(data)));
    //console.log('usd_bn', usd_bn.toString());
    let base = new BN(10);
    let div_dec = new BN(base.pow(new BN(dec)));
    let usd_adj = new BN(usd_bn.div(div_dec));
    //console.log('usd_adj', usd_adj.toString());
    let usd_float = parseFloat(window.web3js_reader.utils.fromWei(usd_adj, 'ether'));
    safeSetValueById(usd_val_elem, usd_float.toFixed(3), 'inline');
  } else if (userObject.state.selected_depprofile_type == ERC721_TOKEN) {
    let vc_contract;
    await initVotesCalcContractReader(async (c) => {
      vc_contract = c;
    });

    let token_ids = new Array();
    for (let i = 0; i < userObject.state.selectedNFTAssets.length; i++) {
      token_ids.push(parseInt(userObject.state.selectedNFTAssets[i].t_id));
    }
    let BN = window.BN;

    let wei_am = await vc_contract.methods.calcNFTTokensValue(token_ids).call({
      from: userObject.account
    }); //cytr
    let wei_amount = new BN(wei_am);

    let [data, dec] = await Promise.all([contract.methods.getData('ETNAUSD').call({
      from: userObject.account
    }), contract.methods.getDecimals('ETNAUSD').call({
      from: userObject.account
    })]);

    //let data = await contract.methods.getData('CYTRUSD').call({from:userObject.account});
    //let dec = await contract.methods.getDecimals('CYTRUSD').call({from:userObject.account});
    let usd_bn = new BN(wei_amount.mul(new BN(data)));
    //console.log('usd_bn', usd_bn.toString());
    let base = new BN(10);
    let div_dec = new BN(base.pow(new BN(dec)));
    let usd_adj = new BN(usd_bn.div(div_dec));
    //console.log('usd_adj', usd_adj.toString());
    let usd_float = parseFloat(window.web3js_reader.utils.fromWei(usd_adj, 'ether'));
    safeSetValueById(usd_val_elem, usd_float.toFixed(3), 'inline');

  } else if (userObject.state.selected_depprofile_type == ERC20_TOKEN || userObject.state.selected_depprofile_type == UNISWAP_PAIR) {
    let tokens_amount = document.getElementById(tokens_amount_elem).value;
    let BN = window.BN;
    let wei_amount = safeFloatToWei(tokens_amount); //BN

    let [data, dec] = await Promise.all([contract.methods.getData(userObject.state.selected_depprofile_name).call({
      from: userObject.account
    }), contract.methods.getDecimals(userObject.state.selected_depprofile_name).call({
      from: userObject.account
    })]);
    //let data = await contract.methods.getData(userObject.state.selected_depprofile_name).call({from:userObject.account});
    //let dec = await contract.methods.getDecimals(userObject.state.selected_depprofile_name).call({from:userObject.account});
    let usd_bn = new BN(wei_amount.mul(new BN(data)));
    //console.log('usd_bn', usd_bn.toString());
    let base = new BN(10);
    let div_dec = new BN(base.pow(new BN(dec)));
    let usd_adj = new BN(usd_bn.div(div_dec));
    //console.log('usd_adj', usd_adj.toString());
    let usd_float = parseFloat(window.web3js_reader.utils.fromWei(usd_adj, 'ether'));
    safeSetValueById(usd_val_elem, usd_float.toFixed(3), 'inline');
  }

}

async function updUSDValueCollateral(tokens_amount_elem, usd_val_elem, dep_id) {
  let am_arr = userObject.deposits.am_arr;
  //console.log('am_arr[1][dep_id]=',dep_id, am_arr[1][dep_id]);

  let tokens_amount = document.getElementById(tokens_amount_elem).value;
  //console.log('tokens_amount=',tokens_amount);
  let BN = window.BN;
  let wei_amount = 0;
  if (parseInt(userObject.state.selected_credprofile_type) != ERC721_TOKEN) {
    wei_amount = safeFloatToWei(tokens_amount); //BN
  } else {
    wei_amount = new BN(tokens_amount);
  }

  let dep_am = new BN(am_arr[1][dep_id]);

  if (wei_amount.cmp(dep_am) == 1) {

    let tok_float = 0;
    if (parseInt(userObject.state.selected_credprofile_type) != ERC721_TOKEN) {
      tok_float = parseFloat(window.web3js_reader.utils.fromWei(am_arr[1][dep_id], 'ether'));
    } else {
      tok_float = am_arr[1][dep_id];
    }
    safeSetValueById(tokens_amount_elem, tok_float.toFixed(3), 'inline');
    wei_amount = am_arr[1][dep_id];
  }

  //let data = await contract.methods.calcUSDValueCollateral(userObject.account, dep_id.toString(), wei_amount.toString()).call({from: userObject.account});
  console.log('userObject.state.selected_credprofile=', userObject.state.selected_credprofile);
  console.log('param= ', userObject.account, dep_id, wei_amount.toString(), userObject.state.selected_credprofile);
  //param=  0xddc58f7839a71787eb94211bc922e0ae2bfb5501 9 4 6
  let usd_val = await window.usage_calc_smartcontract_reader.methods.calcUSDValueCollateral(userObject.account, dep_id, wei_amount, userObject.state.selected_credprofile).call({
    from: userObject.account
  });

  safeSetValueById(usd_val_elem, usd_val, 'inline');

  if (userObject.state.getcredit_profile != -1) {

    document.getElementById('tokens_amount_getcredit').innerText = await calcTokensFromUSD(userObject.state.getcredit_profile, document.getElementById('usd_value_collateral').value);
  }

}

async function calcUSDValueOfDeposit(wei_amount, dep_id) {
  let usd_val = await window.usage_calc_smartcontract_reader.methods.calcUSDValue(userObject.account, dep_id, wei_amount).call({
    from: userObject.account
  });
  //console.log('usd_val',usd_val);
  return usd_val["est_usd"];
}

async function calcUSDValueByProfileNonNFT(wei_amount, profile_id) {
  //console.log('calc usd', profile_id);
  //return 0;
  if (profileNameByProfileId(profile_id) == 'nft') return 0;
  let usd_val = await window.usage_calc_smartcontract_reader.methods.calcUSDValueByProfileNonNFT(profile_id, wei_amount).call({
    from: userObject.account
  });

  return usd_val;
}

function show_modal_leverage(cread_id) {
  const confirm = modal_add_leverage.confirm;
  const leveragePercentSelect = modal_add_leverage.modal.querySelector('#select-leverage');
  set_leverage(leveragePercentSelect.value, cread_id);

  confirm.onclick = () => set_leverage_confirm(leveragePercentSelect.value, cread_id);
  leveragePercentSelect.onchange = (e) => set_leverage(leveragePercentSelect.value, cread_id);

  modal_add_leverage.show();
}

function show_modal_unfreeze(cread_id) {
  const confirm = modal_unfreeze.confirm;
  confirm.onclick = () => unfreeze_leverage(cread_id);

  modal_unfreeze.show();
}

function compensate_with_leverage(cred_id) {
  show_set_leverage(cred_id);
}

async function set_leverage_confirm(ratio, cred_id) {
  // function freezeLeverageForCredit(address cust_wallet, uint32 dep_id, uint32 cred_id, uint256 lev_amount) nonReentrant public  
  modal_add_leverage.isLoadingAfterConfirm();
  if (userObject.credits.cred_arr[1][cred_id] == 0) {
    modal_add_leverage.isLoadedAfterConfirm(false);
    infoMsg("no active credit");
    return;
  }

  initLiqLevContract(async (contractInstance) => {

    let lev = await contractInstance.methods.viewCustomerLeverageByCredId(userObject.account, cred_id).call({
      from: userObject.account
    });

    if (lev.lev_amount > 0) {
      modal_add_leverage.isLoadedAfterConfirm(false);
      infoMsg("you need to unfreeze current leverage first");
      return;
    }

    let cytr_profile_id = await getCYTRProfileId();

    let res_arr = depAmountByProfileIdReal(cytr_profile_id);
    let dep_id = res_arr[0];
    let cytr_am = res_arr[1];

    let cytr_am_bn = new BN(cytr_am);

    if (window.lev_size_wei.cmp(cytr_am_bn) == 1) {
      modal_add_leverage.isLoadedAfterConfirm(false);
      infoMsg("not enough CYTR on deposit");
      return;
    }

    contractInstance.methods.freezeLeverageForCredit(userObject.account, dep_id, cred_id, ratio).send({
        from: userObject.account,
        gasPrice: window.gp
      }, function (error, txnHash) {
        
        if (error) {
          modal_add_leverage.isLoadedAfterConfirm(false);
          throw error;
        }
        output_transaction(txnHash)

      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (confirmationNumber == 5) {
          await updateData('set_leverage');
          modal_add_leverage.isLoadedAfterConfirm();
        }
        resetMsg();

      })
      .catch(error => {
        errorMsg('smartcontract communication error');
        modal_add_leverage.isLoadedAfterConfirm(false);
      });

  });
}

async function unfreeze_leverage(cred_id) {
  // function freezeLeverageForCredit(address cust_wallet, uint32 dep_id, uint32 cred_id, uint256 lev_amount) nonReentrant public  

  /*if (userObject.credits.cred_arr[1][cred_id] ==  0){
  	infoMsg("no active credit");
  	return;
  }*/
  modal_unfreeze.isLoadingAfterConfirm();
  initLiqLevContract(async (contractInstance) => {

    contractInstance.methods.unfreezeLeverageForCredit(userObject.account, cred_id).send({
        from: userObject.account,
        gasPrice: window.gp
      }, function (error, txnHash) {
        if (error) {
          modal_unfreeze.isLoadedAfterConfirm(false);
          throw error;
        }
        output_transaction(txnHash)

      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (confirmationNumber == 5) {
          await updateData('unfreeze_leverage');
          modal_unfreeze.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch(error => {
        errorMsg('smartcontract communication error');
        modal_unfreeze.isLoadedAfterConfirm(false);
      });

  });
}

function return_credit(cred_id) {

  const modalElement = modal_return_credit.modal;
  const allCreditReturnBtn = modalElement.querySelector('#return_credit_all');
  const partCreditReturnBtn = modalElement.querySelector('#return_credit_part');
  const submitTokensBtn = modalElement.querySelector('#return_credit_mvtokens');
  const submitBtn = modalElement.querySelector('#return_credit_confirm');
  const creditReturnInput = modalElement.querySelector('#credit_return_input');

  allCreditReturnBtn.onchange = () => return_credit_all_btn(cred_id);
  partCreditReturnBtn.onchange = () => return_credit_part_btn(cred_id);
  submitTokensBtn.onclick = () => return_credit_mvtokens(cred_id);
  submitBtn.onclick = () => return_credit_confirm(cred_id);

  allCreditReturnBtn.checked = true;
  creditReturnInput.value = toTokens(userObject.credits.cred_arr[1][cred_id], 4);

  if (isToken(cred_id, 'bnb', 'credit_profiles', 'credits', 'cred_arr', 'id', 'name')) {
    submitTokensBtn.disabled = true;
    submitTokensBtn.classList.add('btn-done');
    submitBtn.disabled = false
  } else {
    submitTokensBtn.disabled = false;
    submitTokensBtn.classList.remove('btn-done');
    submitBtn.disabled = true
  }

  modal_return_credit.show();
}

function return_fee(cred_id) {

  const modalElement = modal_return_fee.modal;
  const submitTokensBtn = modalElement.querySelector('#return_fee_approve');
  const submitBtn = modalElement.querySelector('#return_fee_confirm');

  submitTokensBtn.onclick = () => return_fee_mvtokens(cred_id);
  submitBtn.onclick = () => return_fee_confirm(cred_id);

  if (depTypeByProfileId(userObject.credits.cred_arr[0][cred_id]) == NATIVE_ETHEREUM) {
    submitTokensBtn.disabled = true;
    submitTokensBtn.classList.add('btn-done');
    submitBtn.disabled = false
  } else {
    submitTokensBtn.disabled = false;
    submitTokensBtn.classList.remove('btn-done');
    submitBtn.disabled = true
  }

  modal_return_fee.show();
}

function withdraw_reward(dep_id) {

  const modalElement = modal_withdraw_yield.modal;
  const submitBtn = modalElement.querySelector('#withraw_rew_confirm');

  submitBtn.onclick = () => withdraw_reward_confirm(dep_id);

  modal_withdraw_yield.show();
}

function withdraw_deposit(dep_id) {
  const deposit = userObject.deposits.am_arr[2][dep_id];
  const modalElement = modal_withdraw_deposit.modal;
  const allDepositsBtn = modalElement.querySelector('#withraw_dep_all');
  const partDepositsBtn = modalElement.querySelector('#withraw_dep_part');
  const withdrawInput = modalElement.querySelector('#withraw_dep_input');

  const adj_am = isToken(dep_id) ? deposit : toTokens(deposit, 4);

  isToken(dep_id) ? partDepositsBtn.parentElement.classList.add('hidden') : partDepositsBtn.parentElement.classList.remove('hidden');

  withdrawInput.value = adj_am;
  allDepositsBtn.checked = true;
  allDepositsBtn.onchange = () => withdraw_deposit_all_btn(dep_id);
  partDepositsBtn.onchange = () => withdraw_deposit_part_btn(dep_id);
  modal_withdraw_deposit.confirm.onclick = () => withdraw_deposit_confirm(dep_id);

  modal_withdraw_deposit.show();
}

function depAmountByProfileId(profile_id) {
  for (let i = 0; i < userObject.deposits.am_arr[0].length; i++) {
    if (userObject.deposits.am_arr[0][i] == profile_id) {
      let am = userObject.deposits.am_arr[1][i];
      if (depTypeByProfileId(profile_id) !== ERC721_TOKEN) {
        am = window.web3js_reader.utils.fromWei(am, 'ether');
      }
      return ([i, am]);
    }
  }
  return [BAD_DEPOSIT_ID, 0];
}

function depAmountByProfileIdReal(profile_id) {
  for (let i = 0; i < userObject.deposits.am_arr[0].length; i++) {
    if (userObject.deposits.am_arr[0][i] == profile_id) {
      let am = userObject.deposits.am_arr[1][i];

      return ([i, am]);
    }
  }
  return [BAD_DEPOSIT_ID, 0];
}

async function calcTokensFromUSD(cred_profile_id, amount_usd) {
  // function calcFromUSDValue(uint256 usd_value, uint256 profile_id) public view returns(uint256 est_tokens)
  let tokens = await window.usage_calc_smartcontract_reader.methods.calcFromUSDValue(amount_usd, cred_profile_id).call({
    from: userObject.account
  });
  let n_tokens = window.web3js_reader.utils.fromWei(tokens, 'ether');
  return ((parseFloat(n_tokens)).toFixed(4)).toString();
}

function withdraw_deposit_confirm(dep_id) {
  if (userObject.deposits.am_arr[2][dep_id] == 0) {
    infoMsg("deposit is not currently exractable");
    return;
  }

  const isWithdrawAllDeposit = document.getElementById('withraw_dep_all').checked;
  const depositValue = document.getElementById('withraw_dep_input').value;

  const withdraw_amount = isWithdrawAllDeposit ? 0 : safeFloatToWei(depositValue);

  modal_withdraw_deposit.isLoadingAfterConfirm();

  initStakingContract(async (stakingContractInstance) => {

    stakingContractInstance.methods.withdrawDepositById(userObject.account, dep_id, withdraw_amount, isWithdrawAllDeposit).send({
        from: userObject.account,
        gasPrice: window.gp
      }, function (error, txnHash) {
        if (error) {
          modal_withdraw_deposit.isLoadedAfterConfirm(false);
          throw error;
        }
        output_transaction(txnHash)

      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (confirmationNumber == 5) {
          await updateData('withdraw_deposit');
          modal_withdraw_deposit.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch(error => {
        modal_withdraw_deposit.isLoadedAfterConfirm(false);
        errorMsg('smartcontract communication error');
      });

  });

}

async function return_credit_mvtokens(cred_id) {
  modal_return_credit.isLoadingAfterApprove();
  if (userObject.credits.cred_arr[1][cred_id] == 0) {
    modal_return_credit.isLoadedAfterApprove(false);
    infoMsg("no active credit");
    return;
  }

  const isReturnAllCredit = document.getElementById('return_credit_all').checked;
  const returnCreditValue = document.getElementById('credit_return_input').value;

  const return_amount = isReturnAllCredit ? userObject.credits.cred_arr[1][cred_id] : safeFloatToWei(returnCreditValue);

  let returned_asset_token_address = tokenAddressByProfileId(userObject.credits.cred_arr[0][cred_id]);
  approveTokenMove(returned_asset_token_address, return_amount, window.credit_contract_address, modal_return_credit);
}

async function return_fee_mvtokens(cred_id) {
  modal_return_fee.isLoadingAfterApprove()

  if (userObject.credits.cred_arr[2][cred_id] == 0) {
    modal_return_fee.isLoadedAfterApprove(false)
    infoMsg("no active credit");
    return;
  }

  let return_amount = userObject.credits.cred_arr[2][cred_id];

  let returned_asset_token_address = tokenAddressByProfileId(userObject.credits.cred_arr[0][cred_id]);
  approveTokenMove(returned_asset_token_address, return_amount, window.credit_contract_address, modal_return_fee);
}

async function return_credit_confirm(cred_id) {
  modal_return_credit.isLoadingAfterConfirm();
  if (userObject.credits.cred_arr[1][cred_id] == 0) {
    modal_return_credit.isLoadedAfterConfirm(false);
    infoMsg("no active credit");
    return;
  }

  const isReturnAllCredit = document.getElementById('return_credit_all').checked;
  const returnCreditValue = document.getElementById('credit_return_input').value;

  const return_amount = isReturnAllCredit ? userObject.credits.cred_arr[1][cred_id] : safeFloatToWei(returnCreditValue);

  //alert(return_amount); return;
  let returned_asset_type = depTypeByProfileId(userObject.credits.cred_arr[0][cred_id]);
  let returned_asset_token_address = tokenAddressByProfileId(userObject.credits.cred_arr[0][cred_id]);

  let return_val = 0;
  if (returned_asset_type == NATIVE_ETHEREUM) {
    return_val = return_amount;
    //do nothing
  } else if (returned_asset_type == ERC721_TOKEN) {
    modal_return_credit.isLoadedAfterConfirm(false);
    errorMsg('error: ERC721 is not possible type for credit');
    return;
  } else { //ERC20 - check approval

    let token_contract = await new window.web3js.eth.Contract(erc20TokenContractAbi, returned_asset_token_address);
    let allow = new BN(await token_contract.methods.allowance(userObject.account, window.credit_contract_address).call({
      from: userObject.account
    }));

    let tokenAmountToApprove = new BN(return_amount);

    //amount is already adjusted *10**18
    let calculatedApproveValue = tokenAmountToApprove; //tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));

    if (allow < calculatedApproveValue) {
      modal_return_credit.isLoadedAfterConfirm(false, false);
      errorMsg('please approve tokens move / wait for approval transaction to finish');
      return;
    }

    let erc20_count = await token_contract.methods.balanceOf(userObject.account).call({
      from: userObject.account
    });
    let erc20_count_bn = new BN(erc20_count);
    let return_amount_bn = new BN(return_amount);

    if (erc20_count_bn.cmp(return_amount_bn) == -1) {
      modal_return_credit.isLoadedAfterConfirm(false);
      errorMsg('you do not have enough tokens in your wallet');
      return;
    }

  }

  initCreditContract(async (creditContractInstance) => {

    creditContractInstance.methods.returnCredit(userObject.account, cred_id, return_amount).send({
        from: userObject.account,
        value: return_val,
        gasPrice: window.gp
      }, function (error, txnHash) {
        if (error) {
          modal_return_credit.isLoadedAfterConfirm(false);
          throw error;
        }
        output_transaction(txnHash)

      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (confirmationNumber == 5) {
          await updateData('return_credit');
          modal_return_credit.isLoadedAfterConfirm();
        }
        resetMsg();

      })
      .catch(error => {
        modal_return_credit.isLoadedAfterConfirm(false);
        errorMsg('smartcontract communication error');
      });
  });

}

async function return_fee_confirm(cred_id) {
  modal_return_fee.isLoadingAfterConfirm()
  if (userObject.credits.cred_arr[2][cred_id] == 0) {
    modal_return_fee.isLoadedAfterConfirm(false)
    infoMsg("no active credit");
    return;
  }

  let return_amount = userObject.credits.cred_arr[2][cred_id];

  //alert(return_amount); return;
  let returned_asset_type = depTypeByProfileId(userObject.credits.cred_arr[0][cred_id]);
  let returned_asset_token_address = tokenAddressByProfileId(userObject.credits.cred_arr[0][cred_id]);
  let return_val = 0;

  if (returned_asset_type == NATIVE_ETHEREUM) {
    return_val = return_amount;
    //do nothing
  } else if (returned_asset_type == ERC721_TOKEN) {
    modal_return_fee.isLoadedAfterConfirm(false)
    errorMsg('error: ERC721 is not possible type for credit');
    return;
  } else { //ERC20 - check approval

    let token_contract = await new window.web3js.eth.Contract(erc20TokenContractAbi, returned_asset_token_address);
    let allow = new BN(await token_contract.methods.allowance(userObject.account, window.credit_contract_address).call({
      from: userObject.account
    }));

    let tokenAmountToApprove = new BN(return_amount);

    //amount is already adjusted *10**18
    let calculatedApproveValue = tokenAmountToApprove; //tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));

    if (allow < calculatedApproveValue) {
      modal_return_fee.isLoadedAfterConfirm(false, false)
      errorMsg('please approve tokens move / wait for approval transaction to finish');
      return;
    }

    let erc20_count = await token_contract.methods.balanceOf(userObject.account).call({
      from: userObject.account
    });
    let erc20_count_bn = new BN(erc20_count);
    let return_amount_bn = new BN(return_amount);

    if (erc20_count_bn.cmp(return_amount_bn) == -1) {
      modal_return_fee.isLoadedAfterConfirm(false)
      errorMsg('you do not have enough tokens in your wallet');
      return;
    }

  }

  initCreditContract(async (creditContractInstance) => {
    //console.log(userObject.account, cred_id, return_amount);

    creditContractInstance.methods.returnFee(userObject.account, cred_id, return_amount).send({
        from: userObject.account,
        value: return_val,
        gasPrice: window.gp
      }, function (error, txnHash) {
        if (error) {
          modal_return_fee.isLoadedAfterConfirm(false)
          throw error;
        }
        output_transaction(txnHash)

      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (confirmationNumber == 5) {
          await updateData('return_fee');
          modal_return_fee.isLoadedAfterConfirm()
        }
        resetMsg();

      })
      .catch(error => {
        modal_return_fee.isLoadedAfterConfirm(false);
        errorMsg('smartcontract communication error');

      });

  });

}

function withdraw_reward_confirm(dep_id) {

  //alert(dep_id); return;
  if (userObject.deposits.rew_arr[2][dep_id] == 0) {
    infoMsg("reward is not currently exractable");
    return;
  }

  modal_withdraw_yield.isLoadingAfterConfirm();

  initStakingContract(async (stakingContractInstance) => {

    stakingContractInstance.methods.withdrawDepositRewardById(userObject.account, dep_id).send({
        from: userObject.account,
        gasPrice: window.gp
      }, function (error, txnHash) {
        if (error) {
          modal_withdraw_yield.isLoadedAfterConfirm(false);
          throw error;
        }
        output_transaction(txnHash)

      })
      .on('confirmation', async function (confirmationNumber, receipt) {

        if (confirmationNumber == 5) {
          await updateData('withdraw_deposit_reward');
          modal_withdraw_yield.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch(error => {
        modal_withdraw_yield.isLoadedAfterConfirm(false);
        errorMsg('smartcontract communication error');
      });

  });

}

function full_collateral_btn(dep_id) {

  document.getElementById('tokens_amount_collateral').value = depAmountByProfileId(userObject.state.selected_credprofile)[1];
  updUSDValueCollateral('tokens_amount_collateral', 'usd_value_collateral', dep_id);
  document.getElementById('tokens_amount_collateral').readOnly = true;

}

function part_collateral_btn(dep_id) {
  document.getElementById('tokens_amount_collateral').value = 0.;
  updUSDValueCollateral('tokens_amount_collateral', 'usd_value_collateral', dep_id);
  document.getElementById('tokens_amount_collateral').readOnly = false;
}

function return_credit_all_btn(dep_id) {
  //let am = window.web3js_reader.utils.fromWei(userObject.credits.cred_arr[1][dep_id], 'ether');
  let adj_am = toTokens(userObject.credits.cred_arr[1][dep_id], 4); //((parseFloat(am)).toFixed(4)).toString(); 
  document.getElementById('credit_return_input').value = adj_am;
  document.getElementById('credit_return_input').readOnly = true;
}

function return_credit_part_btn(dep_id) {
  document.getElementById('credit_return_input').value = 0.;
  document.getElementById('credit_return_input').readOnly = false;
}

function withdraw_deposit_all_btn(dep_id) {
  const modalElement = modal_withdraw_deposit.modal;
  const withdrawInput = modalElement.querySelector('#withraw_dep_input');

  //let am = window.web3js_reader.utils.fromWei(userObject.deposits.am_arr[2][dep_id], 'ether');
  const adj_am = toTokens(userObject.deposits.am_arr[2][dep_id], 4); //((parseFloat(am)).toFixed(4)).toString(); 

  withdrawInput.value = adj_am;
  withdrawInput.readOnly = true;
}

function withdraw_deposit_part_btn() {
  const modalElement = modal_withdraw_deposit.modal;
  const withdrawInput = modalElement.querySelector('#withraw_dep_input');

  withdrawInput.value = 0.;
  withdrawInput.readOnly = false;
}

function reorder_divs(id1, id2) {
  document.getElementById(id1).style.order = "1";
  document.getElementById(id2).style.order = "2";
}

async function set_fixed_credit() {
  document.getElementById('set_fixed_credit').classList.add('transparent_button_pressed');
  document.getElementById('set_var_credit').classList.remove('transparent_button_pressed');
  let apy = await window.usage_calc_smartcontract_reader.methods.calcFixedApy(userObject.state.getcredit_profile, userObject.state.selected_credprofile).call({
    from: userObject.account
  });
  let apy_adj = (apy / apy_scale) * 100;
  document.getElementById('credit_perc').value = ((parseFloat(apy_adj)).toFixed(2)).toString();
}

async function set_var_credit() {
  document.getElementById('set_fixed_credit').classList.remove('transparent_button_pressed');
  document.getElementById('set_var_credit').classList.add('transparent_button_pressed');
  let apy = await window.usage_calc_smartcontract_reader.methods.calcVarApy(userObject.state.getcredit_profile, userObject.state.selected_credprofile).call({
    from: userObject.account
  });
  let apy_adj = (apy / apy_scale) * 100;
  document.getElementById('credit_perc').value = ((parseFloat(apy_adj)).toFixed(2)).toString();
}

async function set_leverage(ratio, cred_id) { //100 - 100%
  if (!(ratio == 25 || ratio == 50 || ratio == 75 || ratio == 100)) return;

  // function calcNeededLeverageByCreditSize(    uint32 credit_profile_id, uint32 lev_asset_profile_id, 
  //  uint256 credit_amount, bool is_fixed_apy) public view returns(uint256 needed_leverage)
  let cytr_profile_id = await getCYTRProfileId();
  let credit_size = userObject.credits.cred_arr[1][cred_id]; //safeFloatToWei(document.getElementById('tokens_amount_getcredit').value);

  let cc = await window.credit_smartcontract.methods.viewCustomerCredit(userObject.account, 0).call({
    from: userObject.account
  });
  let cc_index = parseInt(cc['index']);
  let x = await window.credit_smartcontract.methods.viewCustomerCreditExtraDataByIndex(cc_index, cred_id).call({
    from: userObject.account
  });

  let is_fixed_apy = x.is_fixed_apy;

  let clt_id = userObject.credits.cred_arr[4][cred_id];
  let clt_profile_id = userObject.credits.clt_arr[0][parseInt(clt_id)];

  let lns = await window.usage_calc_smartcontract_reader.methods
    .calcNeededLeverageByCreditSize(userObject.credits.cred_arr[0][cred_id], clt_profile_id, cytr_profile_id, credit_size, is_fixed_apy).call({
      from: userObject.account
    });
  let lev_needed_size = new BN(lns);

  if (ratio > 100 || ratio < 0) ratio = 100;
  if (ratio != 100) {
    let r = new BN(ratio);
    lev_needed_size = lev_needed_size.mul(r);
    lev_needed_size = lev_needed_size.div(new BN(100));
  }
  window.lev_size_wei = lev_needed_size;

  var size_tokens = window.web3js_reader.utils.fromWei(lev_needed_size, 'ether');

  document.getElementById('lev_size').value = ((parseFloat(size_tokens)).toFixed(2)).toString();

}

async function getCYTRProfileId() {
  if (!userObject.deposit_profiles) {
    userObject.deposit_profiles = await getAllProfiles();
  } else {
    //
  }

  if (!window.cytr_profile_id) {
    for (let i = 0; i < userObject.deposit_profiles.length; i++) {
      if (userObject.deposit_profiles[i].p_name == 'CYTR') {
        window.cytr_profile_id = parseInt(userObject.deposit_profiles[i].p_id);
        return window.cytr_profile_id;
      }
    }
    window.cytr_profile_id = BAD_DEPOSIT_PROFILE_ID;
    return window.cytr_profile_id;
  } else {
    //
  }
  return window.cytr_profile_id;

}

function toTokens(wei_am, digs) {
  let n_tokens = floorDecimals(window.web3js_reader.utils.fromWei(wei_am, 'ether'), digs);
  return ((parseFloat(n_tokens)).toFixed(digs)).toString();
}

async function openExernalPool(token1, token2, liq_pair_name, liq_pair_address) {
  window.open("https://pancakeswap.finance");
  safeRemoveClassBySelector(".unsw-menu", "transparent_button_pressed");
  document.getElementById(liq_pair_name).classList.add('transparent_button_pressed');
}

async function getWalletBalanceStr(token_address) {

  let erc20contract = await new window.web3js_reader.eth.Contract(erc20TokenContractAbi, token_address);
  let erc20_count = await erc20contract.methods.balanceOf(userObject.account).call({
    from: userObject.account
  });
  //let adj_count = floorDecimals( window.web3js_reader.utils.fromWei(erc20_count, 'ether'),3);	

  let adj_count_str = toTokens(erc20_count, 3)
  return adj_count_str;
}

async function getWalletBalance(token_address) {
  if (token_address == 'BNB') {
    let wb = await window.web3js_reader.eth.getBalance(userObject.account);
    return floorDecimals(window.web3js_reader.utils.fromWei(wb, 'ether'), 3);
  } else {

    let erc20contract = await new window.web3js_reader.eth.Contract(erc20TokenContractAbi, token_address);
    let erc20_count = await erc20contract.methods.balanceOf(userObject.account).call({
      from: userObject.account
    });
    //let adj_count = floorDecimals( window.web3js_reader.utils.fromWei(erc20_count, 'ether'),3);	

    let n_tokens = floorDecimals(window.web3js_reader.utils.fromWei(erc20_count, 'ether'), 3);
    return n_tokens;
  }
}

function floorDecimals(value, decimals) {
  return Number(Math.floor(value + 'e' + decimals) + 'e-' + decimals);
}

async function getAPY(profile_id) {
  let profiles;
  if (!userObject.deposit_profiles) {
    userObject.deposit_profiles = await getAllProfiles();
  } else {
    //
  }

  if (!window.dep_apys) {
    window.dep_apys = new Array();
    for (let i = 0; i < userObject.deposit_profiles.length; i++) {
      window.dep_apys[parseInt(userObject.deposit_profiles[i]['p_id'])] = null;
    }
  }

  if (window.dep_apys[profile_id]) {
    return window.dep_apys[profile_id];
  } else {
    let apy = await window.usage_calc_smartcontract_reader.methods.calcDepApy(profile_id).call({
      from: userObject.account
    });
    window.dep_apys[profile_id] = apy;
    return window.dep_apys[profile_id];
  }

}
