const modal_withdraw_deposit = new Modal('modal-withdraw-deposit');
const modal_withdraw_yield = new Modal('modal-withdraw-reward');
const modal_add_credit = new Modal(
  'modal-open-new-credit',
  async () => {
    await initCollateralDropdown();
    await initCreditDropdown();
  },
  async () => {
    await collateralDropdownBuild();
    await creditDropdownBuild();
    await creditModalDataUpdate();
  }
);
const modal_return_fee = new Modal('modal-return-fee');
const modal_return_credit = new Modal('modal-return-credit');
const modal_add_leverage = new Modal('modal-set-leverage');
const modal_unfreeze = new Modal('modal-unfreeze');
const modal_add_lliquidity = new Modal(
  'modal-add-liquidity',
  () => {
    initLiqPairsDropdown();
    initLiqTermsDropdown();
  },
  liqModalBuild
);
const modal_add_deposit = new Modal(
  'modal-new-deposit',
  initDepositProfilesDropdown,
  () => {
    depositModalRebuild();
    depositModalUpdateNftDropdown();
  },
  null,
  depositModalUpdateNftDropdown
);

const modals = [
  modal_withdraw_deposit,
  modal_withdraw_yield,
  modal_add_credit,
  modal_return_fee,
  modal_return_credit,
  modal_add_leverage,
  modal_unfreeze,
  modal_add_lliquidity,
  modal_add_deposit,
];

function closeAllModals() {
  modals.forEach((modal) => {
    if (modal.modal) {
      modal.hideModal();
    }
  });
}

function choiseOnInitNft(choice) {
  let list = new SimpleBar(choice.choiceList.element, {
    autoHide: false,
  });
  let inner = new SimpleBar(choice.containerInner.element, {
    autoHide: false,
  });

  const rebuildScroll = () => {
    const currentChoices = choice._currentState.choices;
    list && list.unMount();
    list = new SimpleBar(choice.choiceList.element, {
      autoHide: false,
    });
    inner && inner.unMount();
    inner = new SimpleBar(choice.containerInner.element, {
      autoHide: false,
    });

    if (currentChoices) {
      const isEmpty = currentChoices.every((item) => item.selected === false);
      const isFull = currentChoices.every((item) => item.selected === true);

      if (isEmpty) {
        selectAllBtn.style.display = 'flex';
        unSelectAllBtn.style.display = 'none';
      }

      if (!isEmpty && !isFull) {
        selectAllBtn.style.display = 'flex';
        unSelectAllBtn.style.display = 'flex';
      }

      if (isFull) {
        selectAllBtn.style.display = 'none';
        unSelectAllBtn.style.display = 'flex';
      }
    }
  };

  const nftButtonsWrapper = document.createElement('div');
  nftButtonsWrapper.classList.add(
    'flex',
    'items-center',
    'w-full',
    'p-2',
    'bg-blueish-black',
    'relative'
  );
  const selectAllBtn = document.createElement('button');
  selectAllBtn.classList.add('table-btn', 'mr-2', 'nft-btn');
  selectAllBtn.innerHTML = 'Select all NFT';

  selectAllBtn.onclick = () => {
    const currentChoices = choice._currentState.choices;

    if (currentChoices.length === 0) return;

    currentChoices.forEach((item) => {
      choice.setChoiceByValue(item.value);
    });
    const values = nftAssetsSelect.getValue(true);
    userObject.state.selectedNFTAssets = values;
    depositModalRebuild();
    rebuildScroll();
    nftAssetsSelect.hideDropdown();
  };

  const unSelectAllBtn = document.createElement('button');
  unSelectAllBtn.classList.add('table-btn', 'nft-btn');
  unSelectAllBtn.innerHTML = 'Unselect all NFT';

  unSelectAllBtn.onclick = () => {
    nftAssetsSelect.removeActiveItems();
    userObject.state.selectedNFTAssets = [];
    depositModalRebuild();
    rebuildScroll();
    nftAssetsSelect.hideDropdown();
  };

  nftButtonsWrapper.appendChild(selectAllBtn);
  nftButtonsWrapper.appendChild(unSelectAllBtn);
  choice.dropdown.element.appendChild(nftButtonsWrapper);

  const eventsForRebuildScroll = [
    'change',
    'showDropdown',
    'hideDropdown',
    'addItem',
    'removeItem',
    'highlightItem',
    'unhighlightItem',
    'choice',
    'search',
    'highlightChoice',
  ];

  eventsForRebuildScroll.forEach((rebuildEvent) => {
    choice.passedElement.element.addEventListener(
      rebuildEvent,
      function () {
        setTimeout(() => {
          rebuildScroll();
        }, 0);
      },
      false
    );
  });
}

const nftSelectElement = document.querySelector('#nftAssetsSelect');
const nftAssetsSelect =
  nftSelectElement &&
  new Choices(nftSelectElement, {
    removeItemButton: true,
    callbackOnInit() {
      choiseOnInitNft(this);
    },
    callbackOnCreateTemplates(template) {
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
                <span class="choices__item-img"><img src="${
                  data.value.imageSrc
                }"></span> ${value} - $${data.value.price}
                <button type="button" class="choices__button" aria-label="Remove item: '${value}'" data-button="">Remove item</button>
              </div>
            `);
        },
        choice: (classNames, data) => {
          const value = `${data.value.text}[${data.value.t_id}]`;

          return template(`
              <div class="${classNames.item} ${classNames.itemChoice} ${
            data.disabled ? classNames.itemDisabled : classNames.itemSelectable
          }" data-choice ${
            data.disabled
              ? 'data-choice-disabled aria-disabled="true"'
              : 'data-choice-selectable'
          } data-id="${data.id}" data-value="${value}" ${
            toNumber(data.groupId) > 0 ? 'role="treeitem"' : 'role="option"'
          }>
                <span class="choices__item-img"><img src="${
                  data.value.imageSrc
                }"></span> ${data.label} - $${data.value.price}
              </div>
            `);
        },
      };
    },
  });

const creditSelectElement = document.querySelector('#credprofiles-dropdown');
const collateralDropdown =
  creditSelectElement &&
  new Choices(creditSelectElement, {
    classNames: {
      containerOuter: 'choices choices-collateral',
    },
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });

const getCreditSelectElement = document.querySelector('#getcredit-dropdown');
const creditDropdown =
  getCreditSelectElement &&
  new Choices(getCreditSelectElement, {
    classNames: {
      containerOuter: 'choices choices-credit',
    },
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });

const walletButton = document.getElementById('enableEthereumButton');

const createTableBtnWithIcon = (icon, text, callback) => {
  return `<span class="table-btn" onclick="${callback}">
  <i class="icon-cell">
    <img src="/images/${icon}.svg" class="w-full h-full" alt="#">
  </i> 
  ${text}
</span>`;
};

const createCellWithIcon = (iconSrc) => {
  if (typeof iconSrc === 'string') {
    const iconName = iconSrc.toLowerCase();
    const iconObj = CRYPTO_ICONS.find((icon) => iconName === icon.name);
    if (iconObj) {
      iconSrc = iconObj.icon ? iconObj.icon : iconObj.name;
    } else {
      iconSrc = 'b';
    }
    return `<span class="crypto-icon-no-spaces"><img src="/images/crypto-icons/icon-${iconSrc}.svg"></span>`;
  }

  return `<span class="crypto-icon-no-spaces"><img src="/images/crypto-icons/icon-b.svg"></span>`;
};

const contractsObject = {
  deposit_contract: {
    address: '',
    contract: {},
    setAddress(addr) {
      this.address = addr;
    },
  },
};

document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    setWalletPref({
      page_id: userObject.state.current_page_id,
    });
  }
});

window.addEventListener('DOMContentLoaded', async function () {
  const r1 = getBackendParameter('STAKING_CONTRACT', (contract_address) => {
    window.staking_contract_address = contract_address;
  });

  const r2 = getBackendParameter(
    'FAMERS_REGISTER_CONTRACT',
    (contract_address) => {
      window.famers_register_contract_address = contract_address;
    }
  );

  const r3 = getBackendParameter(
    'DEPPROFILES_REGISTER_CONTRACT',
    (contract_address) => {
      window.depprofiles_register_contract_address = contract_address;
    }
  );

  const r4 = getBackendParameter(
    'CREDIT_PROFILES_REGISTER_CONTRACT',
    (contract_address) => {
      window.credit_profiles_register_contract_address = contract_address;
    }
  );

  const r5 = getBackendParameter(
    'DATA_PROVIDER_CONTRACT',
    (contract_address) => {
      window.data_provider_contract_address = contract_address;
    }
  );

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

  // in any case;
  await initWeb3jsReader();

  await web3jsReadersList.init();

  await Promise.all([
    initDataProviderContractReader(),
    initVotesCalcContractReader(),
    initUsageCalcContractReader(),
    initCyclopsNFTContractReader(),
  ]);

  if (isMetaMaskInstalled()) {
    window.ethereum.autoRefreshOnNetworkChange = false;
    await getAccount();

    window.ethereum.on('accountsChanged', async function (accounts) {
      await getAccount();
    });

    window.ethereum.on('chainChanged', async (chainId) => {
      window.location.reload();
    });

    // loginAdmin(); return;

    await postWalletCallback();
  } else {
    walletButton.style.display = 'block';
    await initWeb3Modal();
    walletButton.addEventListener('click', toggleWeb3Connect);
    errorEmptyMetamaskMsg();
  }
});

async function postWalletCallback() {
  if (
    window.location.pathname === '/' ||
    window.location.pathname === '/our-dashboard.html' ||
    window.location.pathname === '/our-dashboard'
  ) {
    await getWalletPref();
    openTab(
      {
        srcElement: document.getElementById(
          `${userObject.state.current_page_id}-menu`
        ),
      },
      userObject.state.current_page_id
    );

    modal_add_credit.modal && modal_add_credit.onInitCallback();
    modal_add_lliquidity.modal && modal_add_lliquidity.onInitCallback();
    modal_add_deposit.modal && modal_add_deposit.onInitCallback();
  }
}

async function initWeb3Modal() {
  if (window.web3Modal) return;

  // not used?
  // let walletConnectProvider =  new WalletConnectProvider({
  //   rpc: {
  //     WALLET_OPTION_RPC
  //       }
  // });

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: WALLET_OPTION_RPC,
      },
    },
  };

  window.web3Modal = new Web3Modal({
    ...WEB3_MODAL_NETWORK,
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: true, // optional. For MetaMask / Brave / Opera.
  });
}

async function getAccount() {
  resetMsg();
  closeAllModals();
  try {
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    userObject.account = accounts[0];

    const response = await fetch('/whitelisted.json');

    const { whitelisted_wallets } = await response.json();

    const isWhitelistedAccount = whitelisted_wallets.some(
      (whitelistedWallet) =>
        whitelistedWallet.toUpperCase() === userObject.account.toUpperCase()
    );

    if (!isWhitelistedAccount) {
      window.location.replace('/by-invitation.html');
    }

    setLdBar(10);

    safeSetValueBySelector('.current-wallet', userObject.account);
    safeSetInnerHTMLBySelector(
      '.current-wallet',
      userObject.account,
      ' inline'
    );

    checkAdminButton();
    window.web3js = await new Web3(window.ethereum);
    window.web3 = window.web3js;
    window.BN = web3js.utils.BN;

    await Promise.all([
      initStakingContract(),
      initStakingContractReader(),
      initCreditContract(),
      initLiqLevContract(),
      initCyclopsNFTContract(),
    ]);

    setLdBar(15);

    await userObject.load();

    setLdBar(25);

    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/our-dashboard.html' ||
      window.location.pathname === '/our-dashboard'
    ) {
      setNetInfo();

      await updateData();
    }

    window.gp = await window.web3js.eth.getGasPrice();
    window.gp *= 2;
  } catch (error) {
    errorEmptyMsg('Cannot access wallet. Reload your page, please.');
  }
}

async function getAccountWalletConnect() {
  resetMsg();
  closeAllModals();
  try {
    errorEmptyMetamaskMsg(false);
    // Get connected chain id from Ethereum node
    //  const chainId = '0x38';// await window.web3js.eth.getChainId();
    // do not rely on automatic..

    // Load chain information over an HTTP API
    // const chainData = evmChains.getChain(chainId);
    window.web3js = await new Web3(window.provider);
    window.web3 = window.web3js;
    window.BN = web3js.utils.BN;

    // Get list of accounts of the connected wallet
    window.accounts = await web3js.eth.getAccounts();

    userObject.account = accounts[0];

    setLdBar(10);

    safeSetValueBySelector('.current-wallet', userObject.account);
    safeSetInnerHTMLBySelector('.current-wallet', userObject.account, 'inline');

    // checkAdminButton();

    await Promise.all([
      initStakingContract(),
      initCreditContract(),
      initLiqLevContract(),
      initCyclopsNFTContract(),
    ]);

    setLdBar(15);

    await userObject.load();

    setLdBar(25);

    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/our-dashboard.html' ||
      window.location.pathname === '/our-dashboard'
    ) {
      setNetInfo();

      await updateData();
    }

    window.gp = await window.web3js.eth.getGasPrice();
    window.gp *= 2;

    await postWalletCallback();
  } catch (error) {
    errorEmptyMsg('Cannot access wallet. Reload your page, please.');
  }
}

async function setNetInfo() {
  const chanId = await window.web3js.eth.getChainId();
  const chainIdHex = chanId && `0x${chanId.toString(16)}`;

  const netName = document.getElementById('net_name');
  const netInfo = document.getElementById('net_info');
  const netIcon = document.getElementById('net_icon');
  const netTxt = document.getElementById('net_txt');
  if (netName && netInfo && netIcon && netTxt) {
    if (chainIdHex === undefined) {
      netName.innerHTML = 'unknown net';
      netInfo.style.display = 'flex';
      netIcon.style.color = 'red';
      netTxt.innerHTML = ' wrong network, connect to BSC';
    } else if (chainIdHex !== window.chainId) {
      netName.innerHTML = chains[window.chainId];
      netInfo.style.display = 'flex';
      netIcon.style.color = 'red';
      netTxt.innerHTML = ' wrong network, connect to BSC';
    } else {
      netIcon.style.color = '#48A68E';
      netInfo.style.display = 'flex';
      netName.innerHTML = ' BSC';
    }
  }
}

async function initStakingContract(callback = null) {
  if (!window.staking_smartcontract) {
    if (window.web3js) {
      window.staking_smartcontract = await new window.web3js.eth.Contract(
        staking_contract_abi,
        window.staking_contract_address
      );
      if (callback) callback(window.staking_smartcontract);
    }
  } else if (callback) callback(window.staking_smartcontract);
}

async function initStakingContractReader(callback = null) {
  if (!window.staking_smartcontract_reader) {
    const reader = web3jsReadersList.get();
    window.staking_smartcontract_reader = await new reader.eth.Contract(
      staking_contract_abi,
      window.staking_contract_address
    );
    if (callback) callback(window.staking_smartcontract_reader);
  } else if (callback) callback(window.staking_smartcontract_reader);
}

async function initCreditContract(callback = null) {
  if (!window.credit_smartcontract) {
    if (window.web3js) {
      window.credit_smartcontract = await new window.web3js.eth.Contract(
        credit_contract_abi,
        window.credit_contract_address
      );
      if (callback) callback(window.credit_smartcontract);
    }
  } else if (callback) callback(window.credit_smartcontract);
}

async function initLiqLevContract(callback = null) {
  if (!window.liqlev_smartcontract) {
    if (window.web3js) {
      window.liqlev_smartcontract = await new window.web3js.eth.Contract(
        liqlev_contract_abi,
        window.liqlev_contract_address
      );
      if (callback) callback(window.liqlev_smartcontract);
    }
  } else if (callback) callback(window.liqlev_smartcontract);
}

async function initVotesCalcContractReader(callback = null) {
  if (!window.votes_calc_smartcontract_reader) {
    // if (window.web3js_reader){
    // window.votes_calc_smartcontract_reader = await new window.web3js_reader.eth.Contract(votes_calc_abi, window.votes_calc_contract_address);
    const reader = web3jsReadersList.get();
    window.votes_calc_smartcontract_reader = await new reader.eth.Contract(
      votes_calc_abi,
      window.votes_calc_contract_address
    );
    if (callback) callback(window.votes_calc_smartcontract_reader);
    // }
  } else if (callback) callback(window.votes_calc_smartcontract_reader);
}

async function initUsageCalcContractReader(callback = null) {
  if (!window.usage_calc_smartcontract_reader) {
    // if (window.web3js_reader){
    const reader = web3jsReadersList.get();
    window.usage_calc_smartcontract_reader = await new reader.eth.Contract(
      usage_calc_abi,
      window.usage_calc_contract_address
    );
    // window.usage_calc_smartcontract_reader = await new window.web3js_reader.eth.Contract(usage_calc_abi, window.usage_calc_contract_address);
    if (callback) callback(window.usage_calc_smartcontract_reader);
    // }
  } else if (callback) callback(window.usage_calc_smartcontract_reader);
}

async function initCyclopsNFTContractReader(callback = null) {
  if (!window.cyclops_nft_smartcontract_reader) {
    // if (window.web3js_reader){
    const reader = web3jsReadersList.get();
    window.cyclops_nft_smartcontract_reader = await new reader.eth.Contract(
      nftpub_contracts_abi,
      window.cyclops_nft_contract_address
    );
    // window.cyclops_nft_smartcontract_reader = await new window.web3js_reader.eth.Contract(nftpub_contracts_abi, window.cyclops_nft_contract_address);
    if (callback) callback(window.cyclops_nft_smartcontract_reader);
    // }
  } else if (callback) callback(window.cyclops_nft_smartcontract_reader);
}

async function initCyclopsNFTContract(callback = null) {
  if (!window.cyclops_nft_smartcontract) {
    if (window.web3js) {
      window.cyclops_nft_smartcontract = await new window.web3js.eth.Contract(
        nftpub_contracts_abi,
        window.cyclops_nft_contract_address
      );
      if (callback) callback(window.cyclops_nft_smartcontract);
    }
  } else if (callback) callback(window.cyclops_nft_smartcontract);
}

async function getCredit() {
  // function getCredit(address cust_wallet, uint32 dep_id,  uint256 cred_amount, uint32 get_credit_profile_id) nonReentrant public

  modal_add_credit.isLoadingAfterConfirm();

  if (
    toNumber(userObject.state.selected_credprofile) === -1 ||
    !userObject.state.selected_credprofile
  ) {
    modal_add_credit.isLoadedAfterConfirm(false);
    errorMsg('You need to select collateral asset');
    return;
  }

  if (
    toNumber(userObject.state.getcredit_profile) === -1 ||
    !userObject.state.getcredit_profile
  ) {
    modal_add_credit.isLoadedAfterConfirm(false);
    errorMsg('You need to select credit asset');
    return;
  }

  if (
    toNumber(userObject.state.getcredit_profile) ===
    toNumber(userObject.state.selected_credprofile)
  ) {
    modal_add_credit.isLoadedAfterConfirm(false);
    errorMsg('Assets for collateral and credit should be different');
    return;
  }

  const cred_amount = safeFloatToWei(
    document.getElementById('tokens_amount_getcredit').innerText
  ).toString(); // wei

  const collateral_dep_id = depAmountByProfileId(
    userObject.state.selected_credprofile
  )[0];

  const isFullCallateral = document.getElementById('full_collateral').checked;

  const is_fixed_credit = document.getElementById('set_fixed_credit').checked;

  initCreditContract(async (contract) => {
    contract.methods
      .getCredit(
        userObject.account,
        collateral_dep_id,
        cred_amount,
        userObject.state.getcredit_profile,
        isFullCallateral,
        is_fixed_credit
      )
      .send(
        {
          from: userObject.account,
          gasPrice: window.gp,
        },
        function (error, txnHash) {
          if (error) {
            modal_add_credit.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('get_credit');
          modal_add_credit.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modal_add_credit.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
      });
  });
}

async function deposit() {
  modal_add_deposit.isLoadingAfterConfirm();

  if (toNumber(userObject.state.selected_depprofile) === -1) {
    modal_add_deposit.isLoadedAfterConfirm(false);
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
      modal_add_deposit.isLoadedAfterConfirm(false);
      errorMsg('You need to select tokens');
      return;
    }

    try {
      const isNFTCollateralExists = await window.staking_smartcontract.methods
        .isNFTCollateralExists(userObject.account)
        .call({ from: userObject.account });

      if (isNFTCollateralExists) {
        modal_add_deposit.isLoadedAfterConfirm(false);
        errorMsg(
          'You have NFT as collateral, please return credit to unfreeze it and you will be able to open new NFT deposit'
        );
        return;
      }
    } catch (error) {
      console.warn(error);
    }

    const isApproved = await window.cyclops_nft_smartcontract.methods
      .isApprovedForAll(userObject.account, window.staking_contract_address)
      .call({
        from: userObject.account,
      });

    if (!isApproved) {
      modal_add_deposit.isLoadedAfterConfirm(false, false);
      errorMsg('You need to approve tokens move first');
      return;
    }

    amount = userObject.state.selectedNFTAssets.length;

    const MAX_AMOUNT_OF_NFT = 50;
    const amounTsPerDeposits = await window.staking_smartcontract.methods
      .amountsPerDeposits(userObject.account)
      .call({ from: userObject.account });
    const nftIndex = amounTsPerDeposits[0].findIndex(
      (tokenId) => tokenId === NFT_TOKEN_ID
    );
    const amountNftInDeposit =
      nftIndex === -1 ? 0 : toNumber(amounTsPerDeposits[1][nftIndex]);

    if (amountNftInDeposit + amount > MAX_AMOUNT_OF_NFT) {
      modal_add_deposit.isLoadedAfterConfirm(false);
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

      // let wb_bn = new BN(await (web3jsReadersList.get()).eth.getBalance(userObject.account));
      const wb_bn = new BN(
        await window.web3js_reader.eth.getBalance(userObject.account)
      );
      const amount_bn = new BN(amount);

      if (toNumber(wb_bn.cmp(amount_bn)) === -1) {
        modal_add_deposit.isLoadedAfterConfirm(false);
        errorMsg('You do not have enough BNB in your wallet');
        return;
      }
    } else {
      // ERC20 - check approval

      const token_contract = await new window.web3js.eth.Contract(
        erc20TokenContractAbi,
        userObject.state.selected_depprofile_token_address
      );
      const allow = new BN(
        await token_contract.methods
          .allowance(userObject.account, window.staking_contract_address)
          .call({
            from: userObject.account,
          })
      );

      const tokenAmountToApprove = new BN(amount);
      // amount is already adjusted *10**18
      const calculatedApproveValue = tokenAmountToApprove; // tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));

      if (allow < calculatedApproveValue) {
        modal_add_deposit.isLoadedAfterConfirm(false);
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
      const erc20_count_bn = new BN(erc20_count);
      const amount_bn = new BN(amount);

      if (toNumber(erc20_count_bn.cmp(amount_bn)) === -1) {
        modal_add_deposit.isLoadedAfterConfirm(false);
        errorMsg('You do not have enough tokens in your wallet');
        return;
      }
    }
  }

  resetMsg();

  initStakingContract(async (stakingContractInstance) => {
    if (amount === '0' || !amount) {
      errorMsg('Amount of asset must be greater than 0');
      return modal_add_deposit.isLoadedAfterConfirm(false);
    }

    stakingContractInstance.methods
      .deposit(amount, token_ids, dep_profile_id, window.famer)
      .send(
        {
          from: userObject.account,
          value: wei_val,
          gasPrice: window.gp,
        },
        function (error, txnHash) {
          if (error) {
            modal_add_deposit.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('make_deposit');
          modal_add_deposit.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modal_add_deposit.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
      });
  });
}

async function approve_stake_liq() {
  modal_add_lliquidity.isLoadingAfterApprove();

  if (!userObject.state.liq_pair_name) {
    modal_add_lliquidity.isLoadedAfterApprove(false);
    errorMsg('You need to select liquidity pair');
    return;
  }

  const amount_wei = safeFloatToWei(
    document.getElementById('liq_pair_stake_am').value
  ).toString(); // wei
  approveTokenMove(
    userObject.state.liq_pair_address,
    amount_wei,
    window.staking_contract_address,
    modal_add_lliquidity
  );
}

async function stake_liq() {
  modal_add_lliquidity.isLoadingAfterConfirm();

  if (!userObject.state.liq_pair_name) {
    modal_add_lliquidity.isLoadedAfterConfirm(false, false);
    errorMsg('You need to select liquidity pair');
    return;
  }

  if (!userObject.state.liq_pair_fullcode) {
    modal_add_lliquidity.isLoadedAfterConfirm(false, false);
    errorMsg('You need to select term');
    return;
  }

  const dep_profile_id = await unswIDByProfileName(
    userObject.state.liq_pair_fullcode
  );
  const wei_val = 0;
  const token_ids = [];

  const amount = safeFloatToWei(
    document.getElementById('liq_pair_stake_am').value
  ).toString(); // wei

  const token_contract = await new window.web3js.eth.Contract(
    erc20TokenContractAbi,
    userObject.state.liq_pair_address
  );
  const allow = new BN(
    await token_contract.methods
      .allowance(userObject.account, window.staking_contract_address)
      .call({
        from: userObject.account,
      })
  );

  const tokenAmountToApprove = new BN(amount);

  // amount is already adjusted *10**18
  const calculatedApproveValue = tokenAmountToApprove; // tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));

  if (allow < calculatedApproveValue) {
    modal_add_lliquidity.isLoadedAfterConfirm(false, false);
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
  const erc20_count_bn = new BN(erc20_count);
  const amount_bn = new BN(amount);

  if (toNumber(erc20_count_bn.cmp(amount_bn)) === -1) {
    modal_add_lliquidity.isLoadedAfterConfirm(false, false);
    errorMsg('You do not have enough tokens in your wallet');
    return;
  }

  resetMsg();

  initStakingContract(async (stakingContractInstance) => {
    stakingContractInstance.methods
      .deposit(amount, token_ids, dep_profile_id, NONE_FAMER_ID)
      .send(
        {
          from: userObject.account,
          value: wei_val,
          gasPrice: window.gp,
        },
        function (error, txnHash) {
          if (error) {
            modal_add_lliquidity.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('stake_liq');
          modal_add_lliquidity.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modal_add_lliquidity.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
      });
  });
}

async function approve_deposit() {
  modal_add_deposit.isLoadingAfterApprove();

  if (toNumber(userObject.state.selected_depprofile) === -1) {
    modal_add_deposit.isLoadedAfterApprove(false);
    errorMsg('You need to select asset');
    return;
  }
  const dep_profile_id = userObject.state.selected_depprofile;

  if (userObject.state.selected_depprofile_name === 'nft') {
    const isApproved = await window.cyclops_nft_smartcontract.methods
      .isApprovedForAll(userObject.account, window.staking_contract_address)
      .call({
        from: userObject.account,
      });

    if (isApproved) {
      modal_add_deposit.isLoadedAfterApprove();
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
          function (error, txnHash) {
            if (error) {
              modal_add_deposit.isLoadedAfterApprove(false);
              throw error;
            }
            output_transaction(txnHash);
          }
        )
        .on('confirmation', function (confirmationNumber, receipt) {
          if (toNumber(confirmationNumber) === 5) {
            successMsg('NFT move approved');
            modal_add_deposit.isLoadedAfterApprove();
          }
        })
        .catch((error) => {
          errorMsg('Smartcontract communication error');
          modal_add_deposit.isLoadedAfterApprove(false);
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
      modal_add_deposit
    );
  }
}

async function approveTokenMove(token_address, amount_wei, toAddress, modal) {
  const { BN } = window.web3js_reader.utils;

  // Calculate contract compatible value for approve with proper decimal points using BigNumber
  const tokenAmountToApprove = new BN(amount_wei);
  const calculatedApproveValue =
    window.web3js_reader.utils.toHex(tokenAmountToApprove);
  const token_contract = await new window.web3js.eth.Contract(
    erc20TokenContractAbi,
    token_address
  );

  if (calculatedApproveValue === '0' || !calculatedApproveValue) {
    errorMsg('Amount of asset must be greater than 0');
    return modal.isLoadedAfterApprove(false);
  }

  await token_contract.methods
    .approve(toAddress, calculatedApproveValue)
    .send(
      {
        from: userObject.account,
        gasPrice: window.gp,
      },
      function (error, txnHash) {
        if (error) {
          modal.isLoadedAfterApprove(false);
          throw error;
        }
        output_transaction(txnHash);
      }
    )
    .on('confirmation', function (confirmationNumber, receipt) {
      if (toNumber(confirmationNumber) === 5) {
        successMsg('Tokens move approved');
        modal.isLoadedAfterApprove();
      }
    })
    .catch((error) => {
      modal.isLoadedAfterApprove(false);
      errorMsg('Smartcontract communication error');
    });
}

function output_transaction(txnHash) {
  infoMsg(
    `<a target="_blank" href="https://${TRANSACTION_LINK}/tx/${txnHash}">last transaction:${txnHash}</a>`
  );
}

function safeSetValueById(id, value, disp = 'block') {
  const el = document.getElementById(id);
  if (el) {
    el.value = value;
    if (value === '') el.style.display = 'none';
    else el.style.display = disp;
  }
}

function safeHtmlById(id, html = '-') {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = html;
  }
}

function safeSetInnerHTMLById(id, value, disp = 'block', className = null) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = value;
    if (value === '') {
      if (!className) {
        el.style.display = 'none';
      } else {
        el.classList.add(className);
      }
    } else if (!className) {
      el.style.display = disp;
    } else {
      el.classList.remove(className);
    }
  }
}

function safeSetValueBySelector(selector, value) {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (item) {
      item.value = value;
    });
  }
}

function safeHideBySelector(selector) {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (item) {
      item.style.display = 'none';
    });
  }
}

function safeShowBySelector(selector, disp = 'block') {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (item) {
      item.style.display = disp;
    });
  }
}

function safeSetInnerHTMLBySelector(selector, value, disp = 'block') {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (el) {
      el.innerHTML = value;
      if (value === '') el.style.display = 'none';
      else el.style.display = disp;
    });
  }
}

function safeAddClassBySelector(selector, aclass) {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (item) {
      item.classList.add(aclass);
    });
  }
}

function safeRemoveClassBySelector(selector, aclass) {
  const els = document.querySelectorAll(selector);
  if (els) {
    els.forEach(function (item) {
      item.classList.remove(aclass);
    });
  }
}

function shortenWallet(wallet) {
  return `${wallet.slice(0, 9)}...${wallet.slice(-4)}`;
}

function safeFloatToWei(num) {
  // as string
  let num_s = num.toString();

  // calc digits after 'dot'
  let n = num_s.indexOf(',');
  if (n === -1) n = num_s.indexOf('.');
  if (n === -1) {
    num_s += '.0';
    n = num_s.indexOf('.');
  }
  const num_dig = num_s.length - n - 1;

  // float as integer in string form
  num_s = num_s.substr(n + 1);
  if (num >= 1) {
    num_s = toNumber(num).toString() + num_s;
  }

  // divide adj constant on 10**[num digits after dot]
  let bn_adj = new window.BN(ADJ_CONSTANT.toString());

  bn_adj = bn_adj.div(new window.BN(10).pow(new BN(num_dig)));

  // bn based on float as integer in string form
  let bn_num = new window.BN(num_s);

  // adjust with adj constant
  bn_num = bn_num.mul(bn_adj);

  // and return in BN form
  return bn_num;
}

function successMsg(msg) {
  safeSetInnerHTMLById('info_pane_message', msg);
  document
    .getElementById('info_pane')
    .classList.remove('info_pane_error', 'info_pane_info', 'info_pane_success');
  document.getElementById('info_pane').classList.add('info_pane_success');
}

function infoMsg(msg) {
  safeSetInnerHTMLById('info_pane_message', msg);
  document
    .getElementById('info_pane')
    .classList.remove('info_pane_error', 'info_pane_info', 'info_pane_success');
  document.getElementById('info_pane').classList.add('info_pane_info');
}

function errorMsg(msg) {
  safeSetInnerHTMLById('info_pane_message', msg);
  document.getElementById('info_pane') &&
    document
      .getElementById('info_pane')
      .classList.remove(
        'info_pane_error',
        'info_pane_info',
        'info_pane_success'
      );
  document.getElementById('info_pane') &&
    document.getElementById('info_pane').classList.add('info_pane_error');
}

function errorEmptyMsg(msg) {
  safeSetInnerHTMLById('empty-error__msg', msg);

  document.querySelector('.empty-access') &&
    document.querySelector('.empty-access').classList.remove('hidden');
}

function errorEmptyMetamaskMsg(state = true) {
  if (state) {
    document.querySelector('.empty-metamask') &&
      document.querySelector('.empty-metamask').classList.remove('hidden');
  } else {
    document.querySelector('.empty-metamask') &&
      document.querySelector('.empty-metamask').classList.add('hidden');
  }
}

function resetMsg() {
  const infoPane = document.getElementById('info_pane');
  if (infoPane) {
    infoPane.classList.remove(
      'info_pane_error',
      'info_pane_info',
      'info_pane_success'
    );
  }

  safeSetInnerHTMLById('info_pane_message', '');
}

function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent(`on${etype}`);
  } else {
    const evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

async function onUniversalConnect() {
  try {
    window.provider = await web3Modal.connectTo('walletconnect');
    getAccountWalletConnect();
  } catch (e) {
    return;
  }

  window.provider.on('accountsChanged', (accounts) => {
    getAccountWalletConnect();
  });

  // Subscribe to chainId change
  window.provider.on('chainChanged', (chainId) => {
    getAccountWalletConnect();
  });

  // Subscribe to networkId change
  window.provider.on('networkChanged', (networkId) => {
    getAccountWalletConnect();
  });
}

let web3jsReadersList = {
  rpc_list: RPC_LIST,
  web3js_list: [],
  index: 0,

  async init() {
    const await_array = [];
    for (let i = 0; i < this.rpc_list?.length ?? 0; i++) {
      await_array.push(
        new Web3(new Web3.providers.HttpProvider(this.rpc_list[i]))
      );
    }
    this.web3js_list = await Promise.all(await_array);
  },

  get() {
    const ret_val = this.web3js_list[this.index];
    this.index++;
    if (this.index > this.rpc_list.length - 1) this.index = 0;
    return ret_val;
  },
};

async function initWeb3jsReader(callback = null) {
  if (!window.web3js_reader) {
    window.web3js_reader = await new Web3(
      new Web3.providers.HttpProvider(infura_endpoint[window.chainId])
    );
  }
  // and in any case
  if (callback) callback(window.web3js_reader);
}

function isWeb3Connected() {
  if (isMetaMaskInstalled()) {
    return true;
  }
  return !!window.provider;
}

async function connectWeb3() {
  if (isMetaMaskInstalled()) {
    window.ethereum.autoRefreshOnNetworkChange = false;
    getAccount();

    window.ethereum.on('accountsChanged', function (accounts) {
      getAccount();
    });

    window.ethereum.on('chainChanged', (chainId) => {
      getAccount();
    });
  } else {
    // try to connect with something built-in, like Opera
    try {
      await initWeb3Modal();
      await window.web3.currentProvider.enable();
      if (window.web3.currentProvider.isConnected()) {
        window.provider = window.web3.currentProvider;
        await getAccountWalletConnect();
        return;
      }
    } catch (error) {
      console.warn(error);
    }

    // await web3Modal.updateTheme("dark");

    await onUniversalConnect();
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

  window.account = null;
  window.location.reload();
}

async function toggleWeb3Connect() {
  if (isMetaMaskInstalled()) {
    return; // do nothing, we just use metamask
  }

  if (!isWeb3Connected()) {
    // connect to mobile wallet

    await connectWeb3();
    if (isWeb3Connected()) {
      walletButton.classList.remove('web3-disconnected');
      walletButton.classList.add('web3-connected');
    }
  } else {
    // disconnect from mobile wallet
    await onUniversalDisconnect();
    if (!isWeb3Connected()) {
      walletButton.classList.remove('web3-connected');
      walletButton.classList.add('web3-disconnected');
    }
  }
}

function copyToClipboard(elem) {
  // elem should be input
  elem.select();
  elem.setSelectionRange(0, 99999);
  document.execCommand('copy');
}

async function updateData(action = null) {
  await userObject.load(); // only once, userObject controls it

  if (!action) {
    // only when loaded

    getLiquidityDashboard(() => {
      setLdBar(null, '25');
    });

    getDepositsDashboard(() => {
      setLdBar(null, '25');
    });

    getCreditsDashboard(() => {
      setLdBar(null, '25');
    });

    if (
      window.location.pathname === '/our-dashboard.html' ||
      window.location.pathname === '/our-dashboard'
    ) {
      getOurDashbord();
    } else {
      getCapDashbord();
    }

    // getFamersDashboard();
  } else if (action === 'make_deposit') {
    await getDepositsDashboard();
  } else if (action === 'withdraw_deposit') {
    await getDepositsDashboard();
    await getLiquidityDashboard();
  } else if (action === 'withdraw_deposit_reward') {
    await getDepositsDashboard();
    await getLiquidityDashboard();
  } else if (action === 'get_credit') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action === 'set_leverage') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action === 'unfreeze_leverage') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action === 'return_credit') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action === 'return_fee') {
    await getCreditsDashboard();
    await getDepositsDashboard();
  } else if (action === 'stake_liq') {
    await getLiquidityDashboard();
  }
}

function loginAdmin() {
  const msgParams = [
    {
      type: 'string',
      name: 'Authorization',
      value: 'Sign to confirm your access to admin wallet',
    },
    {
      type: 'string',
      name: 'Timestamp',
      value: Math.floor(Date.now() / 100000).toString(),
    },
    {
      type: 'uint32',
      name: 'Randon number for extra security',
      value: Math.floor(Math.random() * 100000000),
    },
  ];

  window.ethereum
    .request({
      method: 'eth_signTypedData',
      params: [msgParams, userObject.account],
    })
    .then((result) => {
      encr_message = result;

      checkAdminAuthentification(msgParams, encr_message, 'admin.php');
    })
    .catch((error) => {
      if (error.code === 4001) {
        errorMsg('We need you to sign message to get admin access');
      } else {
        // console.error(error);
      }
    });
}

function checkAdminButton(token) {
  // admin functions work only with MM
  if (!isMetaMaskInstalled()) return;

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    wallet_id: userObject.account,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`${WALLETS_API_URL}/get_wallet_type`, requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }
    })
    .then((respJson) => {
      const wallet_type = respJson.type;
      if (wallet_type === 'admin') {
        if (document.getElementById('adminButton')) {
          document.getElementById('adminButton').style.display = 'block';
          document
            .getElementById('adminButton')
            .addEventListener('click', loginAdmin);
          document
            .getElementById('net_txt')
            .addEventListener('click', loginAdminTst);
        }
      }
    })
    .catch((error) => {
      new Error(error);
    });
}

function setWalletPref(pref) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    wallet_id: userObject.account,
    page_id: pref.page_id,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    keepalive: true,
    // redirect: 'follow'
  };

  fetch(`${WALLETS_API_URL}/set_wallet_pref`, requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }
    })
    .then((respJson) => {
      const { type } = respJson;

      if (type === 'success') {
        //
      } else {
        errorMsg('Setting wallet preferences error');
      }
    })
    .catch((error) => {
      errorMsg('Set wallet preferences error');
    });
}

async function getWalletPref() {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    wallet_id: userObject.account,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    // redirect: 'follow'
  };

  await fetch(`${WALLETS_API_URL}/get_wallet_pref`, requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }
    })
    .then((respJson) => {
      const { type } = respJson;

      if (type === 'success') {
        if (!respJson.value.page_id) {
          userObject.state.current_page_id = 'dashboard-tab';
        } else {
          userObject.state.current_page_id = respJson.value.page_id;
        }
      } else {
        userObject.state.current_page_id = 'dashboard-tab';
      }
    })
    .catch((error) => {
      userObject.state.current_page_id = 'dashboard-tab';
    });
}

function checkAdminAuthentification(
  msg_params,
  encr_message,
  php_script,
  extra_data = null
) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    wallet_id: userObject.account,
    msg_params,
    encrypted_message: encr_message,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`${WALLETS_API_URL}/check_signed_message`, requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }
    })
    .then((respJson) => {
      // if we are here, it success (see backend implementation)
      // we store signed message & signed data as token
      window.msg_params = msg_params;
      window.encr_message = encr_message;
      // in admin functions we will call checkAdminAuthentification (window.window.msg_params,window.encr_message)
      // to verify admin access, after page is reload, metamask need to sign message again

      // redirect to admin page, where at backend we also check
      // credentials

      const postData = [];

      postData.body_raw = raw;
      if (extra_data) {
        postData.extra_data = JSON.stringify(extra_data);
      }

      postAndRedirect(window.location.href + php_script, postData);
    })
    .catch((error) => {
      errorMsg('This wallet does not have admin access');
    });
}

function postAndRedirect(url, postData) {
  const myForm = document.createElement('form');
  myForm.setAttribute('action', url);
  myForm.setAttribute('method', 'post');
  myForm.setAttribute('hidden', 'true');
  const myInput = document.createElement('input');
  myInput.setAttribute('type', 'text');
  myInput.setAttribute('name', 'body_raw');
  myInput.setAttribute('value', postData.body_raw);
  myForm.appendChild(myInput);
  document.body.appendChild(myForm);
  myForm.submit();
}

function assetNFTUrlByName(asset_name) {
  return `${NFT_ROOT_URL}/${asset_name}.json`;
}

async function getBackendParameter(var_name, callback = null) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  await fetch(`${WALLETS_API_URL}/get_var/${var_name}`, requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.clone().json();
      }
    })
    .then((respJson) => {
      if (respJson.type === 'success') {
        resetMsg();
        if (callback) callback(respJson.var);
      } else {
        errorMsg('API error');
      }
    })
    .catch((error) => {
      new Error(error);
    });
}

async function initDataProviderContractReader(callback = null) {
  if (!window.data_provider_smartcontract_reader) {
    // if (window.web3js_reader){
    const reader = web3jsReadersList.get();
    window.data_provider_smartcontract_reader = await new reader.eth.Contract(
      data_provider_abi,
      window.data_provider_contract_address
    );
    // window.data_provider_smartcontract_reader = await new window.web3js_reader.eth.Contract(data_provider_abi, window.data_provider_contract_address);
    if (callback) callback(window.data_provider_smartcontract_reader);
    // }
  } else if (callback) callback(window.data_provider_smartcontract_reader);
}

async function getDepositProfilesList() {
  const plist = [];

  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    const option = {};

    option.text = userObject.deposit_profiles[i].p_name; // name
    option.p_id = userObject.deposit_profiles[i].p_id; // profile id
    option.d_type = userObject.deposit_profiles[i].p_dep_type; // dep type
    option.d_tok_addr = userObject.deposit_profiles[i].p_tok_addr;
    const json_details = {};
    json_details.id = userObject.deposit_profiles[i].p_id;
    json_details.name = userObject.deposit_profiles[i].p_name;
    json_details.deposit_type = userObject.deposit_profiles[i].p_dep_type;
    json_details.deposit_token_address =
      userObject.deposit_profiles[i].p_tok_addr;
    json_details.init_apy = userObject.deposit_profiles[i].init_apy;
    json_details.rate = userObject.deposit_profiles[i].rate;
    json_details.reward_per_day = userObject.deposit_profiles[i].reward_per_day;
    json_details.min_lock_time = userObject.deposit_profiles[i].min_lock_time;

    option.value = JSON.stringify(json_details);
    option.selected = false;
    option.description = '';
    option.imageSrc = '';

    plist.push(option);
  }
  return plist;
}

async function getCreditProfilesList() {
  const plist = [];

  for (let i = 0; i < userObject.credit_profiles?.length ?? 0; i++) {
    const option = {};

    option.text = userObject.credit_profiles[i].name;
    option.p_id = userObject.credit_profiles[i].id;
    option.c_type = userObject.credit_profiles[i]._type;
    option.c_tok_addr = userObject.credit_profiles[i]._token_address;
    const json_details = {};
    json_details.id = userObject.credit_profiles[i].id;
    json_details.name = userObject.credit_profiles[i].name;
    json_details._type = userObject.credit_profiles[i]._type;
    json_details._token_address = userObject.credit_profiles[i]._token_address;
    json_details.valuation_percent =
      userObject.credit_profiles[i].valuation_percent;
    json_details.init_apy = userObject.credit_profiles[i].init_apy;
    json_details.rate = userObject.credit_profiles[i].rate;

    option.value = JSON.stringify(json_details);
    option.selected = false;
    option.description = '';
    option.imageSrc = '';

    plist.push(option);
  }
  return plist;
}

async function getCreditProfilesListCredit() {
  // for dropdown

  const full_list = await getCreditProfilesList();

  const plist = [];

  /* if (!userObject.credit_profiles){
        userObject.credit_profiles = await getAllCreditProfiles();
      } else {
      	
    } */
  // all except NFT, we do not give credits in NFT
  for (let i = 0; i < full_list?.length ?? 0; i++) {
    if (toNumber(full_list[i].c_type) === ERC721_TOKEN) continue;
    plist.push(full_list[i]);
  }
  return plist;
}

async function depositModalUpdateNftDropdown() {
  const nftAssetsDropdownRow =
    modal_add_deposit.modal.querySelector('#assets-dropdown');

  nftAssetsDropdownRow.classList.add('loading');
  const nftData = await getNFTAssets();
  await updateAssetsDropdown(nftData);

  if (userObject.state.selected_depprofile_name === 'nft') {
    await updUSDValue('-', 'usd_value');
  }
  nftAssetsDropdownRow.classList.remove('loading');
}

async function depositModalRebuild() {
  if (modal_add_deposit.isLoading) return;
  const ddData = await getDepositProfilesList();

  const depprofilesDropdown = modal_add_deposit.modal.querySelector(
    '#depprofiles-dropdown'
  );
  const nftAssetsDropdownRow =
    modal_add_deposit.modal.querySelector('#assets-dropdown');
  const assetsAmountRow =
    modal_add_deposit.modal.querySelector('#tokens_amount').parentNode;
  const depositSelectedAsset = depprofilesDropdown.value;

  const currentDepProfile = ddData.find(
    (item) => item.text.toLowerCase() === depositSelectedAsset.toLowerCase()
  );

  if (!currentDepProfile) return;

  setState({
    selected_depprofile: currentDepProfile.p_id,
    selected_depprofile_name: currentDepProfile.text,
    selected_depprofile_type: currentDepProfile.d_type,
    selected_depprofile_token_address: currentDepProfile.d_tok_addr,
  });

  if (toNumber(currentDepProfile.d_type) === NATIVE_ETHEREUM) {
    modal_add_deposit.nextStep();
  } else {
    modal_add_deposit.prevStep();
  }

  if (currentDepProfile.text === 'nft') {
    nftAssetsDropdownRow.classList.remove('hidden');
    assetsAmountRow.classList.add('hidden');
    updUSDValue('-', 'usd_value');
  } else {
    nftAssetsDropdownRow.classList.add('hidden');
    assetsAmountRow.classList.remove('hidden');
    updUSDValue('tokens_amount', 'usd_value');
  }
}

async function initDepositProfilesDropdown() {
  const ddData = await getDepositProfilesList();
  const nftData = await getNFTAssets();

  if (ddData.length === 0) return;

  if (nftData.length > 0) {
    initAssetsDropdown(nftData);
  }

  const depprofilesDropdown = modal_add_deposit.modal.querySelector(
    '#depprofiles-dropdown'
  );
  const assetsAmmountValue =
    modal_add_deposit.modal.querySelector('#tokens_amount');

  setOptionsToSelect(ddData, depprofilesDropdown);

  new CustomSelect({
    elem: depprofilesDropdown,
  });

  assetsAmmountValue.oninput = depositModalRebuild;
  depprofilesDropdown.onchange = depositModalRebuild;
}

const getCollateralAvailableTokens = async () => {
  const ddData = await getCreditProfilesList();

  if (ddData.length === 0) return [];

  return ddData
    .map((item) => {
      const deposit = getDepositByTokenId(item.p_id);

      if (toNumber(deposit) > 0) {
        return {
          ...item,
        };
      }
      return undefined;
    })
    .filter((item) => !!item);
};

async function collateralDropdownBuild(clear = true) {
  const fullCollateral =
    modal_add_credit.modal.querySelector('#full_collateral');

  let ddData = await getCollateralAvailableTokens();

  if (ddData.length === 0) return;

  ddData = ddData.filter(
    (item) => item.p_id !== userObject.state.getcredit_profile
  );

  const collateralDropdownOptions = ddData.map((item) => ({
    value: item.text,
    label: item.text,
    p_id: item.p_id,
  }));

  const selectedChoise = collateralDropdown.getValue();
  collateralDropdown.removeActiveItems();
  collateralDropdown.setChoices(
    collateralDropdownOptions,
    'value',
    'label',
    true
  );

  if (clear) {
    setState({
      selected_credprofile: ddData[0].p_id,
      selected_credprofile_name: ddData[0].text,
      selected_credprofile_type: ddData[0].c_type,
      selected_credprofile_token_address: ddData[0].c_tok_addr,
    });
    collateralDropdown.setChoiceByValue(ddData[0].text);

    fullCollateral.checked = true;
    full_collateral_btn(
      depAmountByProfileId(userObject.state.selected_credprofile)[0]
    );
  } else {
    collateralDropdown.setChoiceByValue(selectedChoise.value);
  }
}

async function creditDropdownBuild(clear = true) {
  let ddData = await getCreditProfilesListCredit();

  if (ddData.length === 0) return;

  ddData = ddData.filter(
    (item) => item.p_id !== userObject.state.selected_credprofile
  );

  const creditDropdownOptions = ddData.map((item) => ({
    value: item.text,
    label: item.text,
    p_id: item.p_id,
  }));

  const selectedChoise = creditDropdown.getValue();
  creditDropdown.removeActiveItems();
  creditDropdown.setChoices(creditDropdownOptions, 'value', 'label', true);

  if (clear) {
    setState({
      getcredit_profile: ddData[0].p_id,
    });
    creditDropdown.setChoiceByValue(ddData[0].text);
  } else {
    creditDropdown.setChoiceByValue(selectedChoise.value);
  }
}

async function initCollateralDropdown() {
  const dropdown = modal_add_credit.modal.querySelector(
    '#credprofiles-dropdown'
  );

  const fullCollateral =
    modal_add_credit.modal.querySelector('#full_collateral');
  const partCollateral =
    modal_add_credit.modal.querySelector('#part_collateral');

  await collateralDropdownBuild();

  dropdown.addEventListener(
    'change',
    async function (e) {
      const ddData = await getCollateralAvailableTokens();

      const { value } = e.target;
      const selectedData = ddData.find((item) => item.text === value);

      if (value === 'nft') {
        fullCollateral.checked = true;
        partCollateral.parentNode.classList.add('hidden');
      } else {
        partCollateral.parentNode.classList.remove('hidden');
      }

      setState({
        selected_credprofile: selectedData.p_id,
        selected_credprofile_name: selectedData.text,
        selected_credprofile_type: selectedData.c_type,
        selected_credprofile_token_address: selectedData.c_tok_addr,
      });

      await creditDropdownBuild(false);
      await creditModalDataUpdate();
    },
    false
  );
}

async function creditModalDataUpdate() {
  const tokensAmmountCollateral = modal_add_credit.modal.querySelector(
    '#tokens_amount_collateral'
  );
  const tokensAmmountGetCredit = modal_add_credit.modal.querySelector(
    '#tokens_amount_getcredit'
  );
  const usdValueCollateral = modal_add_credit.modal.querySelector(
    '#usd_value_collateral'
  );

  const fullCollaterlBtn =
    modal_add_credit.modal.querySelector('#full_collateral');
  const creditPerc = modal_add_credit.modal.querySelector('#credit_perc');

  if (
    toNumber(userObject.state.selected_credprofile) === -1 ||
    toNumber(userObject.state.getcredit_profile) === -1
  )
    return;

  if (fullCollaterlBtn.checked === true) {
    tokensAmmountCollateral.value = depAmountByProfileId(
      userObject.state.selected_credprofile
    )[1];
  }

  await updUSDValueCollateral(
    'tokens_amount_collateral',
    'usd_value_collateral',
    depAmountByProfileId(userObject.state.selected_credprofile)[0]
  );

  tokensAmmountGetCredit.innerText = await calcTokensFromUSD(
    userObject.state.getcredit_profile,
    usdValueCollateral.value
  );

  const apy = await window.usage_calc_smartcontract_reader.methods
    .calcVarApy(
      userObject.state.getcredit_profile,
      userObject.state.selected_credprofile
    )
    .call({
      from: userObject.account,
    });
  const apy_adj = (apy / apy_scale) * 100;
  creditPerc.value = parseFloat(apy_adj).toFixed(2).toString();
}

async function initCreditDropdown() {
  const ddData = await getCreditProfilesListCredit();

  if (ddData.length === 0) return;

  const dropdown = modal_add_credit.modal.querySelector('#getcredit-dropdown');

  await creditDropdownBuild();
  await creditModalDataUpdate();

  dropdown.addEventListener(
    'change',
    async function (e) {
      const ddData = await getCreditProfilesListCredit();

      const { value } = e.target;
      const selectedData = ddData.find((item) => item.text === value);

      setState({
        getcredit_profile: selectedData.p_id,
      });

      await collateralDropdownBuild(false);
      await creditModalDataUpdate();
    },
    false
  );
}

async function getNFTAssets() {
  const contract = window.data_provider_smartcontract_reader;

  let vc_contract;
  await initVotesCalcContractReader(async (c) => {
    vc_contract = c;
  });

  const flist = [];

  const len = await window.cyclops_nft_smartcontract_reader.methods
    .balanceOf(userObject.account)
    .call({
      from: userObject.account,
    });

  for (let i = 0; i < len; i++) {
    const t_id = await window.cyclops_nft_smartcontract_reader.methods
      .tokenOfOwnerByIndex(userObject.account, i)
      .call({
        from: userObject.account,
      });
    const token_uri = await window.cyclops_nft_smartcontract_reader.methods
      .tokenURI(t_id)
      .call({
        from: userObject.account,
      });
    const response = await fetch(token_uri);
    const json_content = await response.json();

    const option = {};
    option.text = json_content.name;
    option.t_id = t_id;

    option.value = i + 1;
    option.selected = false;
    option.description = t_id; // json_content.description;
    option.imageSrc = json_content.image;

    option.price = await getNftPrice(contract, vc_contract, [t_id]);

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
      depositModalRebuild();
    },
    false
  );
}

function updateAssetsDropdown(data) {
  const assetSelectOptions = data.map((dataItem) => ({
    value: {
      ...dataItem,
    },
    label: `${dataItem.text}[${dataItem.t_id}]`,
  }));

  nftAssetsSelect.removeActiveItems();
  userObject.state.selectedNFTAssets = [];
  nftAssetsSelect.setChoices(assetSelectOptions, 'value', 'label', true);
}

async function getLiqTerms() {
  const lterms = [];

  const terms = [
    {
      text: '1 week',
      code: '1W',
    },
    {
      text: '2 weeks',
      code: '2W',
    },
    {
      text: '1 month',
      code: '1M',
    },
  ];

  for (let i = 0; i < terms?.length ?? 0; i++) {
    const option = {};
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
  const lpairs = [];

  const pairs = LIQ_PAIRS;

  for (let i = 0; i < pairs?.length ?? 0; i++) {
    const option = {};
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
    liq_pair_fullcode: `${userObject.state.liq_pair_name}-${asset.code}`,
  });

  const apy_str = await unswAPYStrByProfileName(
    userObject.state.liq_pair_fullcode
  );

  if (!apy_str) {
    errorMsg('Cannot find APY for pair');
    return;
  }
  safeHtmlById('liq_pair_apy', `${apy_str} APY`);
};

async function initLiqTermsDropdown() {
  const liqTermsSelect =
    modal_add_lliquidity.modal.querySelector('#liqterms-dropdown');
  const liqTermsData = userObject.liq_terms;

  if (liqTermsData.length === 0) return;

  setOptionsToSelect(liqTermsData, liqTermsSelect);

  new CustomSelect({
    elem: liqTermsSelect,
  });

  setApyStr(liqTermsData[0]);

  liqTermsSelect.onchange = (e) => {
    const { value } = e.target;
    const currentOption = liqTermsData.find((item) => item.text === value);
    setApyStr(currentOption);
  };
}

async function initLiqPairsDropdown() {
  const setBal = async (asset) => {
    setState({
      liq_pair_name: asset.text,
      liq_pair_address: asset.addr,
    });
    const bal = await getWalletBalanceStr(userObject.state.liq_pair_address);
    safeHtmlById('liq_pair_in_wallet', bal);
  };

  const liqPairsAssets =
    modal_add_lliquidity.modal.querySelector('#liqpairs-dropdown');
  const liqPairsAssetsOptions = userObject.liq_pairs;

  if (liqPairsAssetsOptions.length === 0) return;

  setOptionsToSelect(liqPairsAssetsOptions, liqPairsAssets);

  new CustomSelect({
    elem: liqPairsAssets,
  });

  setBal(liqPairsAssetsOptions[0]);

  liqPairsAssets.onchange = (e) => {
    const { value } = e.target;
    const currentOption = liqPairsAssetsOptions.find(
      (item) => item.text === value
    );
    setBal(currentOption);

    const liqTermsValue =
      modal_add_lliquidity.modal.querySelector('#liqterms-dropdown').value;
    const currentLiqTerm = userObject.liq_terms.find(
      (item) => item.text === liqTermsValue
    );
    setApyStr(currentLiqTerm);
  };
}

async function liqModalBuild() {
  if (modal_add_lliquidity.isLoading) return;

  const setBal = async (asset) => {
    setState({
      liq_pair_name: asset.text,
      liq_pair_address: asset.addr,
    });
    const bal = await getWalletBalanceStr(userObject.state.liq_pair_address);
    safeHtmlById('liq_pair_in_wallet', bal);
  };

  const liqPairsAssetsOptions = userObject.liq_pairs;

  if (liqPairsAssetsOptions.length === 0) return;

  setBal(liqPairsAssetsOptions[0]);

  modal_add_lliquidity.prevStep();
}

async function getAllProfiles() {
  let profiles;
  await getBackendParameter('DEPPROFILES_UI_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

async function getAllProfilesWithUniswap() {
  let profiles;
  await getBackendParameter('ASSETS_UI_FULL_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

async function getAllProfilesUniswap() {
  let profiles;
  await getBackendParameter('ASSETS_UI_LIQ_PAIRS', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

async function getAllCreditProfiles() {
  let profiles;
  await getBackendParameter('CREDIT_PROFILES_UI_LIST', (profiles_s) => {
    profiles = JSON.parse(profiles_s);
  });
  return profiles || [];
}

function depTypeByProfileId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles[i].p_id) === toNumber(profile_id)
    ) {
      return toNumber(userObject.deposit_profiles[i].p_dep_type);
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

function tokenAddressByProfileId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles[i].p_id) === toNumber(profile_id)
    ) {
      return userObject.deposit_profiles[i].p_tok_addr;
    }
  }
  return zero_address;
}

function profileNameByProfileId(profile_id) {
  for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles[i].p_id) === toNumber(profile_id)
    ) {
      return userObject.deposit_profiles[i].p_name;
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

async function unswAPYStrByProfileName(profile_name) {
  if (!userObject.deposit_profiles_liqpairs) {
    userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
  }

  for (let i = 0; i < userObject.deposit_profiles_liqpairs?.length ?? 0; i++) {
    if (userObject.deposit_profiles_liqpairs[i].p_name === profile_name) {
      const apy = toNumber(userObject.deposit_profiles_liqpairs[i].init_apy);
      const apy_real = apy / apy_scale;
      const apy_str = `${(apy_real * 100).toFixed(1).toString()}%`;
      return apy_str;
    }
  }
  return null;
}

async function unswIDByProfileName(profile_name) {
  if (!userObject.deposit_profiles_liqpairs) {
    userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
  }

  for (let i = 0; i < userObject.deposit_profiles_liqpairs?.length ?? 0; i++) {
    if (userObject.deposit_profiles_liqpairs[i].p_name === profile_name) {
      return toNumber(userObject.deposit_profiles_liqpairs[i].p_id);
    }
  }
  return null;
}

async function unswProfileNameByProfileId(profile_id) {
  if (!userObject.deposit_profiles_liqpairs) {
    userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
  }

  for (let i = 0; i < userObject.deposit_profiles_liqpairs?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles_liqpairs[i].p_id) ===
      toNumber(profile_id)
    ) {
      return userObject.deposit_profiles_liqpairs[i].p_name;
    }
  }
  return null;
}

async function unswDepTypeByProfileId(profile_id) {
  if (!userObject.deposit_profiles_liqpairs) {
    userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
  }

  for (let i = 0; i < userObject.deposit_profiles_liqpairs?.length ?? 0; i++) {
    if (
      toNumber(userObject.deposit_profiles_liqpairs[i].p_id) ===
      toNumber(profile_id)
    ) {
      return toNumber(userObject.deposit_profiles_liqpairs[i].p_dep_type);
    }
  }
  return BAD_DEPOSIT_PROFILE_ID;
}

// getCreditsDashboard

async function getCreditsDashboard(callback = null) {
  // let profiles = userObject.deposit_profiles;

  const [am_arr, cred_arr, clt_arr] = await Promise.all([
    userObject.deposits.getAmArr(),
    userObject.credits.getCredArr(),
    userObject.credits.getCltArr(),
  ]);

  const [lev_arr, lev_ratio_arr] = await userObject.credits.getLevArr();

  const [
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
    return_leverage_visible,
  ] = await Promise.all([
    userObject.credits.getIconAssetsCols(),
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
    userObject.credits.returnLeverageVisible(),
  ]);

  let html = `
  <table class="min-w-full">
  <thead>
  <tr>
  <th class="table-title" colspan = "2" scope = "colgroup">Asset</th> 
  <th class="table-title">Borrowed amount</th> 
  <th class="table-title">USD value</th> 
  <th class="table-title">Collateral</th> 
  <th class="table-title">Duration days</th> 
  <th class="table-title">Curent APR<sup>*</sup></th> 
  <th class="table-title">Fee</th> 
  ${
    return_leverage_visible
      ? `
    <th class="table-title table-title-right">Leverage Level</th> 
    <th class="table-title" colspan = "2" scope = "colgroup">Cover Fees with ETNA Leverage</th>
    <th class="table-title table-title-empty"></th>
    `
      : `
    <th class="table-title pl-0">Repay</th> 
    <th class="table-title table-title-empty"></th>
    `
  }
  <th class="table-title">In wallet</th> 
  <th class="table-title">Deposit</th> 
  </tr> 
  </thead> 
  <tbody>`;

  for (let i = 0; i < cred_arr[0]?.length ?? 0; i++) {
    // i === credit id

    if (
      toNumber(cred_arr[1][i]) > 0 ||
      toNumber(cred_arr[2][i]) > 0 ||
      toNumber(lev_arr[i]) > 0
    ) {
      html += '<tr class="table-row">';

      html += icon_column[i];

      html += asset_column[i];

      html += cred_column[i];

      html += usd_val_column[i];

      html += clt_column[i];

      html += duration_col[i];

      html += apr_column[i];

      html += fee_col[i];

      html += return_leverage_visible ? leverage_column[i] : '';

      html += return_leverage_visible ? set_leverage_column[i] : '';

      html += return_credit_col[i];

      html += return_empty_col[i];

      html += in_wallet_column[i];

      html += dep_column[i];
    }

    html += '</tr>';
  }

  html += '</tbody>' + '</table>';

  safeSetTableData('my_credits', html, 'empty');

  if (callback) callback();
}

async function getLiquidityDashboard(callback = null) {
  let html =
    '<table class="min-w-full">' +
    '<thead>' +
    '<tr>' +
    '<th class="table-title" colspan = "2" scope = "colgroup">Liquidity-Pair</th>' +
    // '<th>In wallet</th>'+
    '<th class="table-title">Quantity</th>' +
    '<th class="table-title">Lockup</th>' +
    '<th class="table-title">Days till Withdraw</th>' +
    '<th class="table-title">USD value</th>' +
    '<th class="table-title">APY</th>' +
    '<th class="table-title">Duration days</th>' +
    '<th class="table-title">Extractable</th>' +
    '<th class="table-title">Withdraw deposit</th>' +
    '<th class="table-title">Current Yield ETNA</th>' +
    '<th class="table-title">Extractable Yield ETNA</th>' +
    '<th class="table-title">Withdraw yield</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>';

  // let profiles = userObject.deposit_profiles;

  const [am_arr, rew_arr] = await Promise.all([
    userObject.deposits.getAmArr(),
    userObject.deposits.getRewArr(),
  ]);

  const [
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
  ] = await Promise.all([
    userObject.liq_earn.getIconAssetLockupCols(),
    userObject.liq_earn.getApyCol(),
    userObject.liq_earn.getDepCol(),
    userObject.liq_earn.getUsdValCol(),
    userObject.liq_earn.getDurationUnlockCol(),
    userObject.liq_earn.getExtrDepCol(),
    userObject.liq_earn.getWithdrawDepCol(),
    userObject.liq_earn.getWithdrawDepInputsCol(),
    userObject.liq_earn.getRewardCol(),
    userObject.liq_earn.getExtractableRewardCol(),
    userObject.liq_earn.getWithdrawRewCol(),
  ]);

  const icon_column_s = new Array(icon_column.length);
  const asset_column_s = new Array(icon_column.length);
  // let in_wallet_column_s = new Array(profiles.length);
  const dep_column_s = new Array(icon_column.length);
  const lockup_period_s = new Array(icon_column.length);
  const unlock_col_s = new Array(icon_column.length);
  const usd_val_column_s = new Array(icon_column.length);
  const apy_column_s = new Array(icon_column.length);
  const duration_col_s = new Array(icon_column.length);
  const extractable_dep_col_s = new Array(icon_column.length);
  const withdraw_dep_col_s = new Array(icon_column.length);
  const withdraw_dep_inputs_col_s = new Array(icon_column.length);
  const reward_col_s = new Array(icon_column.length);
  const extractable_reward_col_s = new Array(icon_column.length);
  const withdraw_rew_col_s = new Array(icon_column.length);

  usd_val_only_col.sort((a, b) => toNumber(b.val) - toNumber(a.val));

  for (let i = 0; i < icon_column?.length ?? 0; i++) {
    const old_index = usd_val_only_col[i].ori_index;

    icon_column_s[i] = icon_column[old_index];
    asset_column_s[i] = asset_column[old_index];
    lockup_period_s[i] = lockup_period[old_index];
    unlock_col_s[i] = unlock_col[old_index];
    // in_wallet_column_s[i] = in_wallet_column[old_index];
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

  for (let i = 0; i < icon_column?.length ?? 0; i++) {
    // 0 means max amount for ERC20 compatible and ignored for ERC721
    html += '<tr class="table-row">';

    html += icon_column_s[i];

    html += asset_column_s[i];

    // html += in_wallet_column_s[i];

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

  html += '</tbody>' + '</table>';

  safeSetTableData('deposits_uniswap', html, 'empty');
  if (callback) callback();
}

// getDepositsDashboard

async function getCapDashbord(callback = null) {
  const data = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&price_change_percentage=24h,30d'
  )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      // if api for get dashboard data failed, remove dashboard page and change current page to
      document.getElementById('total-dashboard-tab-menu').remove();

      if (userObject.state.current_page_id === 'total-dashboard-tab') {
        openTab(
          {
            srcElement: document.getElementById('dashboard-tab-menu'),
          },
          'dashboard-tab'
        );
      }

      throw new Error(error);
    });

  if (data.length === 0) {
    return;
  }

  const getClassForNumber = (value) => {
    return value > 0 ? 'number_increase' : 'number_degrease';
  };
  const listCryptoTemplate = (imgSrc, name, price, priceChange) => {
    const imgBlock = `<img width="20" height="20" src="${imgSrc}" />`;
    const nameBlock = `<div>${name}</div>`;
    const priceBlock = `<div>${numeral(price).format('$ 0,0.00')}</div>`;
    const priceChangeBlock = `<div class="${getClassForNumber(
      priceChange
    )}">${numeral(priceChange / 100).format('0.0%')}</div>`;

    return `
    <div class="w-full flex items-center mb-5">
      <div class="w-1/12">${imgBlock}</div>
      <div class="w-3/12"><div class="ml-2 uppercase text-sm tracking-wide">${nameBlock}</div></div>
      <div class="w-5/12"><div class="text-white text-opacity-50 text-sm tracking-wide">${priceBlock}</div></div>
      <div class="w-3/12 justify-end">${priceChangeBlock}</div>
    </div>
    `;
  };
  const marketCapElem = document.querySelector('#dashboard-market-cap');
  const marketCapCompared = document.querySelector(
    '#dashboard-market-compared'
  );
  const marketTopFiveList = document.querySelector('#market-top-five-list');
  marketTopFiveList.innerHTML = '';

  let marketCap = 0;
  let marketCapChange = 0;
  const marketTopFiveCurrency = [];

  data.forEach((item) => {
    marketCap += item.market_cap;
    marketCapChange += item.market_cap_change_24h;
    marketTopFiveList.innerHTML += listCryptoTemplate(
      item.image,
      item.symbol,
      item.current_price,
      item.price_change_percentage_24h
    );
    marketTopFiveCurrency.push({
      market_cap: item.market_cap,
      name: item.name,
      price_change: numeral(
        item.price_change_percentage_30d_in_currency / 100
      ).format('0.0%'),
      price_change_class: getClassForNumber(
        item.price_change_percentage_30d_in_currency
      ),
    });
  });

  const cryptoNumb1 = document.querySelector('#crypto-cap-1');
  const cryptoName1 = document.querySelector('#crypto-name-1');
  const cryptoNumb2 = document.querySelector('#crypto-cap-2');
  const cryptoName2 = document.querySelector('#crypto-name-2');
  const cryptoNumb3 = document.querySelector('#crypto-cap-3');
  const cryptoName3 = document.querySelector('#crypto-name-3');
  const cryptoNumb4 = document.querySelector('#crypto-cap-4');
  const cryptoName4 = document.querySelector('#crypto-name-4');
  const cryptoNumb5 = document.querySelector('#crypto-cap-5');
  const cryptoName5 = document.querySelector('#crypto-name-5');

  cryptoNumb1.innerHTML = numeral(marketTopFiveCurrency[0].market_cap).format(
    '($0.0000 a)'
  );
  cryptoName1.innerHTML = marketTopFiveCurrency[0].name;
  cryptoNumb2.innerHTML = numeral(marketTopFiveCurrency[1].market_cap).format(
    '($0.00 a)'
  );
  cryptoName2.innerHTML = marketTopFiveCurrency[1].name;
  cryptoNumb3.innerHTML = numeral(marketTopFiveCurrency[2].market_cap).format(
    '($0.00 a)'
  );
  cryptoName3.innerHTML = marketTopFiveCurrency[2].name;
  cryptoNumb4.innerHTML = numeral(marketTopFiveCurrency[3].market_cap).format(
    '($0.00 a)'
  );
  cryptoName4.innerHTML = marketTopFiveCurrency[3].name;
  cryptoNumb5.innerHTML = numeral(marketTopFiveCurrency[4].market_cap).format(
    '($0.00 a)'
  );
  cryptoName5.innerHTML = marketTopFiveCurrency[4].name;

  const marketCapPercentChange =
    marketCapChange / (marketCap + marketCapChange * -1);

  marketCapElem.innerHTML = numeral(marketCap).format('$0,000');

  marketCapCompared.innerHTML = numeral(marketCapPercentChange).format('0.0%');
  marketCapCompared.classList.add(getClassForNumber(marketCapPercentChange));

  if (callback) callback();
}

async function getOurDashbord(callback = null) {
  try {
    const depositsAmountArrayForPromise = [];
    userObject.deposit_profiles.forEach((item) => {
      depositsAmountArrayForPromise.push(
        window.staking_smartcontract.methods
          .depositsTotAmount(item.p_id)
          .call({ from: userObject.account })
      );
    });
    const depositAmountData = await Promise.all(depositsAmountArrayForPromise);
    const totalNftInEtna = await window.staking_smartcontract_reader.methods
      .totalNFTValue(NFT_TOKEN_ID)
      .call({ from: userObject.account });

    const depositsTotalArrayForPromise = [];
    userObject.deposit_profiles.forEach(async (item, index) => {
      depositsTotalArrayForPromise.push(
        getPriceOfTokens(
          item.p_id === NFT_TOKEN_ID
            ? totalNftInEtna
            : depositAmountData[index],
          item.p_id === NFT_TOKEN_ID ? LEVERAGE_TOKEN : item.p_name,
          item.p_dep_type,
          true
        )
      );
    });

    const depositsTotal = await Promise.all(depositsTotalArrayForPromise);
    const tokensStatistic = depositAmountData.map((amount, index) => ({
      name: userObject.deposit_profiles[index].p_name,
      total: depositsTotal[index],
      amount:
        userObject.deposit_profiles[index].p_id !== NFT_TOKEN_ID
          ? toTokens(amount, 1)
          : amount,
    }));

    const nft = tokensStatistic.find((item) => item.name === 'nft');

    const totalAssets = tokensStatistic.reduce(
      (prev, cur) => toNumber(prev) + toNumber(cur.total),
      0
    );

    let users = 0;
    try {
      users = await window.staking_smartcontract_reader.methods
        .getCustomersDepositsLength()
        .call({ from: '0xC358A60bcCEc7d0eFe5c5E0d9f3862bBA6cb5cd8' });
    } catch (e) {
      console.warn(e);
    }

    const creditsAmountArrayForPromise = [];
    userObject.deposit_profiles.forEach((item) => {
      creditsAmountArrayForPromise.push(
        window.credit_smartcontract.methods
          .creditsTotAmount(item.p_id)
          .call({ from: userObject.account })
      );
    });
    const creditsAmountArray = await Promise.all(creditsAmountArrayForPromise);

    const creditsTotalArrayForPromise = [];
    userObject.deposit_profiles.forEach((item, index) => {
      creditsTotalArrayForPromise.push(
        getPriceOfTokens(
          creditsAmountArray[index],
          item.p_name,
          item.p_dep_type
        )
      );
    });
    const creditsTotalArray = await Promise.all(creditsTotalArrayForPromise);
    const creditsTotal = creditsTotalArray.reduce(
      (prev, cur) => toNumber(prev) + toNumber(cur),
      0
    );

    const data = {
      tokensStatistic,
      totalUsers: toNumber(users),
      totalCredits: creditsTotal,
      totalAssetsValue: totalAssets + creditsTotal,
      totalNft: nft.amount,
      totalDeposits: totalAssets,
    };

    if (data.length === 0) {
      return;
    }

    const listOurCryptoTemplate = (name, amount, total) => {
      const assetName = `<div class="w-3/12 row-name uppercase">${name}</div>`;
      const assetAmount = `<div class="w-3/12 text-right text-violet-100 tracking-wider text-sm">${numeral(
        amount
      ).format('($ 0.00 a)')}</div>`;
      const assetTotal = `${numeral(total).format('($ 0.00 a)')}`;

      return `
        <div class="crypto-row">
          ${assetName}
          ${assetAmount}
          <div class="w-6/12 flex items-center justify-end h-5 w-auto">
            <div class="crypto-amount row-name">
              ${assetTotal} <span class="number_increase ml-2"></span>
            </div>
          </div>
        </div>
      `;
    };

    const ourCryptoList = document.querySelector('#our-crypto-list');
    ourCryptoList.innerHTML = '';

    data.tokensStatistic.forEach((item) => {
      ourCryptoList.innerHTML += listOurCryptoTemplate(
        item.name,
        item.amount,
        item.total
      );
    });

    new SimpleBar(ourCryptoList, { autoHide: false });

    const cryptoNumbAll1 = document.querySelectorAll('.total-sum-1');
    const cryptoNumbAll2 = document.querySelectorAll('.borrow-sum-2');
    const cryptoNumbAll3 = document.querySelectorAll('.deposits-sum-3');
    const cryptoNumb4 = document.querySelector('#credit-sum-4');
    const cryptoNumbAll5 = document.querySelectorAll('.users-sum-5');
    const comparedLastMonths = document.querySelectorAll('.last-month');

    comparedLastMonths.forEach((elem) => {
      elem.innerHTML = numeral(data.prevTotalAssetsValue).format('($0.00 a)');
    });

    cryptoNumbAll1.forEach((each) => {
      each.innerHTML = numeral(data.totalAssetsValue).format('($0.00 a)');
    });

    cryptoNumbAll2.forEach((item) => {
      item.innerHTML = numeral(data.totalNft).format('(0 a)');
    });

    cryptoNumbAll3.forEach((elem) => {
      elem.innerHTML = numeral(data.totalDeposits).format('($0.00 a)');
    });

    cryptoNumb4.innerHTML = numeral(data.totalCredits).format('($0.00 a)');

    cryptoNumbAll5.forEach((el) => {
      el.innerHTML = numeral(data.totalUsers).format('(0 a)');
    });
    setLdBar(100);
  } catch (e) {
    console.warn(e);
  }
  if (callback) callback();
}

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

  const profiles = userObject.deposit_profiles;

  await Promise.all([
    userObject.deposits.getAmArr(),
    userObject.deposits.getRewArr(),
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
  ] = await Promise.all([
    userObject.deposits.getIconAssetsCols(),
    userObject.deposits.getApyCol(),
    userObject.deposits.getInWalletCol(),
    userObject.deposits.getDepCol(),
    userObject.deposits.getUsdValCol(),
    userObject.deposits.getDurationCol(),
    userObject.deposits.getExtractableDepCol(),
    userObject.deposits.getWithdrawDepCol(),
    userObject.deposits.getRewardCol(),
    userObject.deposits.getExtractableRewardCol(),
    userObject.deposits.getWithdrawRewCol(),
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

  usd_val_only_col.sort((a, b) => toNumber(b.val) - toNumber(a.val));

  for (let i = 0; i < profiles?.length ?? 0; i++) {
    const old_index = usd_val_only_col[i].ori_index;

    icon_column_s[i] = icon_column[old_index];
    asset_column_s[i] = asset_column[old_index];
    in_wallet_column_s[i] = in_wallet_column[old_index];
    dep_column_s[i] = dep_column[old_index];
    usd_val_column_s[i] = usd_val_column[old_index];
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

  html += '</tbody>' + '</table>';

  safeSetTableData('tokens_balance', html, 'empty');

  if (callback) callback();
}

async function getNftPrice(contract, vc_contract, token_ids) {
  const { BN } = window;

  const wei_am = await vc_contract.methods.calcNFTTokensValue(token_ids).call({
    from: userObject.account,
  }); // cytr
  const wei_amount = new BN(wei_am);

  const [data, dec] = await Promise.all([
    contract.methods.getData('ETNAUSD').call({
      from: userObject.account,
    }),
    contract.methods.getDecimals('ETNAUSD').call({
      from: userObject.account,
    }),
  ]);

  // let data = await contract.methods.getData('CYTRUSD').call({from:userObject.account});
  // let dec = await contract.methods.getDecimals('CYTRUSD').call({from:userObject.account});
  const usd_bn = new BN(wei_amount.mul(new BN(data)));

  const base = new BN(10);
  const div_dec = new BN(base.pow(new BN(dec)));
  const usd_adj = new BN(usd_bn.div(div_dec));

  const usd_float = parseFloat(
    window.web3js_reader.utils.fromWei(usd_adj, 'ether')
  );
  return usd_float.toFixed(3);
}

async function getPriceOfTokens(
  tokenAmount,
  tokenName,
  tokenType,
  isSafeAmount = false
) {
  const contract = window.data_provider_smartcontract_reader;
  const token = toNumber(tokenType) === NATIVE_ETHEREUM ? 'BNBUSD' : tokenName;

  const { BN } = window;
  const wei_amount = isSafeAmount
    ? new BN(tokenAmount)
    : safeFloatToWei(tokenAmount); // BN

  const [data, dec] = await Promise.all([
    contract.methods.getData(token).call({
      from: userObject.account,
    }),
    contract.methods.getDecimals(token).call({
      from: userObject.account,
    }),
  ]);

  const usd_bn = new BN(wei_amount.mul(new BN(data)));

  const base = new BN(10);
  const div_dec = new BN(base.pow(new BN(dec)));
  const usd_adj = new BN(usd_bn.div(div_dec));

  return parseFloat(window.web3js_reader.utils.fromWei(usd_adj, 'ether'));
}

async function updUSDValue(tokens_amount_elem, usd_val_elem) {
  const contract = window.data_provider_smartcontract_reader;

  if (toNumber(userObject.state.selected_depprofile_type) === ERC721_TOKEN) {
    let vc_contract;
    await initVotesCalcContractReader(async (c) => {
      vc_contract = c;
    });

    const token_ids = [];
    for (let i = 0; i < userObject.state.selectedNFTAssets?.length ?? 0; i++) {
      token_ids.push(toNumber(userObject.state.selectedNFTAssets[i].t_id));
    }

    const nftPrice = await getNftPrice(contract, vc_contract, token_ids);

    return safeSetValueById(usd_val_elem, nftPrice, 'inline');
  }

  const tokens_amount = document.getElementById(tokens_amount_elem).value;
  const usd_float = await getPriceOfTokens(
    tokens_amount,
    userObject.state.selected_depprofile_name,
    userObject.state.selected_depprofile_type
  );
  safeSetValueById(usd_val_elem, usd_float.toFixed(3), 'inline');
}

async function updUSDValueCollateral(tokens_amount_elem, usd_val_elem, dep_id) {
  if (toNumber(dep_id) === 9999999) return;

  const { am_arr } = userObject.deposits;

  const tokens_amount = document.getElementById(tokens_amount_elem).value;

  const { BN } = window;
  let wei_amount = 0;
  if (toNumber(userObject.state.selected_credprofile_type) !== ERC721_TOKEN) {
    wei_amount = safeFloatToWei(tokens_amount); // BN
  } else {
    wei_amount = new BN(tokens_amount);
  }

  const dep_am = new BN(am_arr[1][dep_id]);

  if (toNumber(wei_amount.cmp(dep_am)) === 1) {
    let tok_float = 0;
    if (toNumber(userObject.state.selected_credprofile_type) !== ERC721_TOKEN) {
      tok_float = parseFloat(
        window.web3js_reader.utils.fromWei(am_arr[1][dep_id], 'ether')
      );
    } else {
      tok_float = parseFloat(am_arr[1][dep_id]);
    }
    safeSetValueById(tokens_amount_elem, tok_float.toFixed(3), 'inline');
    wei_amount = am_arr[1][dep_id];
  }

  // let data = await contract.methods.calcUSDValueCollateral(userObject.account, dep_id.toString(), wei_amount.toString()).call({from: userObject.account});

  // param=  0xddc58f7839a71787eb94211bc922e0ae2bfb5501 9 4 6
  const usd_val = await window.usage_calc_smartcontract_reader.methods
    .calcUSDValueCollateral(
      userObject.account,
      dep_id,
      wei_amount,
      userObject.state.selected_credprofile
    )
    .call({
      from: userObject.account,
    });

  safeSetValueById(usd_val_elem, usd_val, 'inline');

  if (toNumber(userObject.state.getcredit_profile) !== -1) {
    document.getElementById('tokens_amount_getcredit').innerText =
      await calcTokensFromUSD(
        userObject.state.getcredit_profile,
        document.getElementById('usd_value_collateral').value
      );
  }
}

async function calcUSDValueOfDeposit(wei_amount, dep_id) {
  const usd_val = await window.usage_calc_smartcontract_reader.methods
    .calcUSDValue(userObject.account, dep_id, wei_amount)
    .call({
      from: userObject.account,
    });

  return usd_val.est_usd;
}

async function calcUSDValueByProfileNonNFT(wei_amount, profile_id) {
  if (profileNameByProfileId(profile_id) === 'nft') return 0;
  const usd_val = await window.usage_calc_smartcontract_reader.methods
    .calcUSDValueByProfileNonNFT(profile_id, wei_amount)
    .call({
      from: userObject.account,
    });
  return usd_val;
}

function show_modal_leverage(cread_id) {
  const { confirm } = modal_add_leverage;
  const leveragePercentSelect =
    modal_add_leverage.modal.querySelector('#select-leverage');
  set_leverage(leveragePercentSelect.value, cread_id);

  confirm.onclick = () =>
    set_leverage_confirm(leveragePercentSelect.value, cread_id);
  leveragePercentSelect.onchange = (e) =>
    set_leverage(leveragePercentSelect.value, cread_id);

  modal_add_leverage.show();
}

function show_modal_unfreeze(cread_id) {
  const { confirm } = modal_unfreeze;
  confirm.onclick = () => unfreeze_leverage(cread_id);

  modal_unfreeze.show();
}

async function set_leverage_confirm(ratio, cred_id) {
  // function freezeLeverageForCredit(address cust_wallet, uint32 dep_id, uint32 cred_id, uint256 lev_amount) nonReentrant public
  modal_add_leverage.isLoadingAfterConfirm();
  if (toNumber(userObject.credits.cred_arr[1][cred_id]) === 0) {
    modal_add_leverage.isLoadedAfterConfirm(false);
    infoMsg('No active credit');
    return;
  }

  initLiqLevContract(async (contractInstance) => {
    const lev = await contractInstance.methods
      .viewCustomerLeverageByCredId(userObject.account, cred_id)
      .call({
        from: userObject.account,
      });

    if (toNumber(lev.lev_amount) > 0) {
      modal_add_leverage.isLoadedAfterConfirm(false);
      infoMsg('You need to unfreeze current leverage first');
      return;
    }

    const cytr_profile_id = await getCYTRProfileId();
    const res_arr = depAmountByProfileIdReal(cytr_profile_id);
    const dep_id = res_arr[0];
    const cytr_am = res_arr[1];

    const cytr_am_bn = new BN(cytr_am);

    if (toNumber(window.lev_size_wei.cmp(cytr_am_bn)) === 1) {
      modal_add_leverage.isLoadedAfterConfirm(false);
      infoMsg('Not enough ETNA on deposit');
      return;
    }

    contractInstance.methods
      .freezeLeverageForCredit(userObject.account, dep_id, cred_id, ratio)
      .send(
        {
          from: userObject.account,
          gasPrice: window.gp,
        },
        function (error, txnHash) {
          if (error) {
            modal_add_leverage.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('set_leverage');
          modal_add_leverage.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        errorMsg('Smartcontract communication error');
        modal_add_leverage.isLoadedAfterConfirm(false);
      });
  });
}

async function unfreeze_leverage(cred_id) {
  modal_unfreeze.isLoadingAfterConfirm();
  initLiqLevContract(async (contractInstance) => {
    contractInstance.methods
      .unfreezeLeverageForCredit(userObject.account, cred_id)
      .send(
        {
          from: userObject.account,
          gasPrice: window.gp,
        },
        function (error, txnHash) {
          if (error) {
            modal_unfreeze.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('unfreeze_leverage');
          modal_unfreeze.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        errorMsg('Smartcontract communication error');
        modal_unfreeze.isLoadedAfterConfirm(false);
      });
  });
}

function return_credit(cred_id) {
  modal_return_credit.show();
  if (modal_return_credit.isLoading) return;
  const modalElement = modal_return_credit.modal;
  const allCreditReturnBtn = modalElement.querySelector('#return_credit_all');
  const partCreditReturnBtn = modalElement.querySelector('#return_credit_part');
  const creditReturnInput = modalElement.querySelector('#credit_return_input');

  allCreditReturnBtn.onchange = () => return_credit_all_btn(cred_id);
  partCreditReturnBtn.onchange = () => return_credit_part_btn(cred_id);
  modal_return_credit.approve.onclick = () => return_credit_mvtokens(cred_id);
  modal_return_credit.confirm.onclick = () => return_credit_confirm(cred_id);

  allCreditReturnBtn.checked = true;
  creditReturnInput.value = toTokens(
    userObject.credits.cred_arr[1][cred_id],
    4
  );

  if (
    isToken(
      cred_id,
      'bnb',
      'credit_profiles',
      'credits',
      'cred_arr',
      'id',
      'name'
    )
  ) {
    modal_return_credit.nextStep();
  } else {
    modal_return_credit.prevStep();
  }
}

function return_fee(cred_id) {
  modal_return_fee.show();
  if (modal_return_fee.isLoading) return;

  modal_return_fee.approve.onclick = () => return_fee_mvtokens(cred_id);
  modal_return_fee.confirm.onclick = () => return_fee_confirm(cred_id);

  if (
    toNumber(depTypeByProfileId(userObject.credits.cred_arr[0][cred_id])) ===
    NATIVE_ETHEREUM
  ) {
    modal_return_fee.nextStep();
  } else {
    modal_return_fee.prevStep();
  }
}

function withdraw_reward(dep_id) {
  modal_withdraw_yield.show();
  modal_withdraw_yield.confirm.onclick = () => withdraw_reward_confirm(dep_id);
}

function withdraw_deposit(dep_id) {
  const deposit = userObject.deposits.am_arr[2][dep_id];
  const modalElement = modal_withdraw_deposit.modal;
  const allDepositsBtn = modalElement.querySelector('#withraw_dep_all');
  const partDepositsBtn = modalElement.querySelector('#withraw_dep_part');
  const withdrawInput = modalElement.querySelector('#withraw_dep_input');

  const adj_am = isToken(dep_id) ? deposit : toTokens(deposit, 4);

  isToken(dep_id)
    ? partDepositsBtn.parentElement.classList.add('hidden')
    : partDepositsBtn.parentElement.classList.remove('hidden');

  withdrawInput.value = adj_am;
  allDepositsBtn.checked = true;
  allDepositsBtn.onchange = () => withdraw_deposit_all_btn(dep_id);
  partDepositsBtn.onchange = () => withdraw_deposit_part_btn(dep_id);
  modal_withdraw_deposit.confirm.onclick = () =>
    withdraw_deposit_confirm(dep_id);

  modal_withdraw_deposit.show();
}

async function calcTokensFromUSD(cred_profile_id, amount_usd) {
  if (!amount_usd) return 0;
  // function calcFromUSDValue(uint256 usd_value, uint256 profile_id) public view returns(uint256 est_tokens)
  const tokens = await window.usage_calc_smartcontract_reader.methods
    .calcFromUSDValue(amount_usd, cred_profile_id)
    .call({
      from: userObject.account,
    });
  const n_tokens = window.web3js_reader.utils.fromWei(tokens, 'ether');
  return parseFloat(n_tokens).toFixed(4).toString();
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

  modal_withdraw_deposit.isLoadingAfterConfirm();

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
        function (error, txnHash) {
          if (error) {
            modal_withdraw_deposit.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('withdraw_deposit');
          modal_withdraw_deposit.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modal_withdraw_deposit.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
      });
  });
}

async function return_credit_mvtokens(cred_id) {
  modal_return_credit.isLoadingAfterApprove();
  if (toNumber(userObject.credits.cred_arr[1][cred_id]) === 0) {
    modal_return_credit.isLoadedAfterApprove(false);
    infoMsg('No active credit');
    return;
  }

  const isReturnAllCredit =
    document.getElementById('return_credit_all').checked;
  const returnCreditValue = document.getElementById(
    'credit_return_input'
  ).value;

  const return_amount = isReturnAllCredit
    ? userObject.credits.cred_arr[1][cred_id]
    : safeFloatToWei(returnCreditValue);

  const returned_asset_token_address = tokenAddressByProfileId(
    userObject.credits.cred_arr[0][cred_id]
  );
  approveTokenMove(
    returned_asset_token_address,
    return_amount,
    window.credit_contract_address,
    modal_return_credit
  );
}

async function return_fee_mvtokens(cred_id) {
  modal_return_fee.isLoadingAfterApprove();

  if (toNumber(userObject.credits.cred_arr[2][cred_id]) === 0) {
    modal_return_fee.isLoadedAfterApprove(false);
    infoMsg('No active credit');
    return;
  }

  const return_amount = userObject.credits.cred_arr[2][cred_id];

  const returned_asset_token_address = tokenAddressByProfileId(
    userObject.credits.cred_arr[0][cred_id]
  );
  approveTokenMove(
    returned_asset_token_address,
    return_amount,
    window.credit_contract_address,
    modal_return_fee
  );
}

async function return_credit_confirm(cred_id) {
  modal_return_credit.isLoadingAfterConfirm();
  if (toNumber(userObject.credits.cred_arr[1][cred_id]) === 0) {
    modal_return_credit.isLoadedAfterConfirm(false);
    infoMsg('No active credit');
    return;
  }

  const isReturnAllCredit =
    document.getElementById('return_credit_all').checked;
  const returnCreditValue = document.getElementById(
    'credit_return_input'
  ).value;

  const return_amount = isReturnAllCredit
    ? userObject.credits.cred_arr[1][cred_id]
    : safeFloatToWei(returnCreditValue);

  // alert(return_amount); return;
  const returned_asset_type = depTypeByProfileId(
    userObject.credits.cred_arr[0][cred_id]
  );
  const returned_asset_token_address = tokenAddressByProfileId(
    userObject.credits.cred_arr[0][cred_id]
  );

  let return_val = 0;
  if (toNumber(returned_asset_type) === NATIVE_ETHEREUM) {
    return_val = return_amount;
    // do nothing
  } else if (toNumber(returned_asset_type) === ERC721_TOKEN) {
    modal_return_credit.isLoadedAfterConfirm(false);
    errorMsg('Error: ERC721 is not possible type for credit');
    return;
  } else {
    // ERC20 - check approval

    const token_contract = await new window.web3js.eth.Contract(
      erc20TokenContractAbi,
      returned_asset_token_address
    );
    const allow = new BN(
      await token_contract.methods
        .allowance(userObject.account, window.credit_contract_address)
        .call({
          from: userObject.account,
        })
    );

    const tokenAmountToApprove = new BN(return_amount);

    // amount is already adjusted *10**18
    const calculatedApproveValue = tokenAmountToApprove; // tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));

    if (allow < calculatedApproveValue) {
      modal_return_credit.isLoadedAfterConfirm(false, false);
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
    const erc20_count_bn = new BN(erc20_count);
    const return_amount_bn = new BN(return_amount);

    if (toNumber(erc20_count_bn.cmp(return_amount_bn)) === -1) {
      modal_return_credit.isLoadedAfterConfirm(false);
      errorMsg('You do not have enough tokens in your wallet');
      return;
    }
  }

  initCreditContract(async (creditContractInstance) => {
    creditContractInstance.methods
      .returnCredit(userObject.account, cred_id, return_amount)
      .send(
        {
          from: userObject.account,
          value: return_val,
          gasPrice: window.gp,
        },
        function (error, txnHash) {
          if (error) {
            modal_return_credit.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('return_credit');
          modal_return_credit.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modal_return_credit.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
      });
  });
}

async function return_fee_confirm(cred_id) {
  modal_return_fee.isLoadingAfterConfirm();
  if (toNumber(userObject.credits.cred_arr[2][cred_id]) === 0) {
    modal_return_fee.isLoadedAfterConfirm(false);
    infoMsg('No active credit');
    return;
  }

  const return_amount = userObject.credits.cred_arr[2][cred_id];

  // alert(return_amount); return;
  const returned_asset_type = depTypeByProfileId(
    userObject.credits.cred_arr[0][cred_id]
  );
  const returned_asset_token_address = tokenAddressByProfileId(
    userObject.credits.cred_arr[0][cred_id]
  );
  let return_val = 0;

  if (toNumber(returned_asset_type) === NATIVE_ETHEREUM) {
    return_val = return_amount;
    // do nothing
  } else if (toNumber(returned_asset_type) === ERC721_TOKEN) {
    modal_return_fee.isLoadedAfterConfirm(false);
    errorMsg('Error: ERC721 is not possible type for credit');
    return;
  } else {
    // ERC20 - check approval

    const token_contract = await new window.web3js.eth.Contract(
      erc20TokenContractAbi,
      returned_asset_token_address
    );
    const allow = new BN(
      await token_contract.methods
        .allowance(userObject.account, window.credit_contract_address)
        .call({
          from: userObject.account,
        })
    );

    const tokenAmountToApprove = new BN(return_amount);

    // amount is already adjusted *10**18
    const calculatedApproveValue = tokenAmountToApprove; // tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));

    if (allow < calculatedApproveValue) {
      modal_return_fee.isLoadedAfterConfirm(false, false);
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
    const erc20_count_bn = new BN(erc20_count);
    const return_amount_bn = new BN(return_amount);

    if (toNumber(erc20_count_bn.cmp(return_amount_bn)) === -1) {
      modal_return_fee.isLoadedAfterConfirm(false);
      errorMsg('You do not have enough tokens in your wallet');
      return;
    }
  }

  initCreditContract(async (creditContractInstance) => {
    creditContractInstance.methods
      .returnFee(userObject.account, cred_id, return_amount)
      .send(
        {
          from: userObject.account,
          value: return_val,
          gasPrice: window.gp,
        },
        function (error, txnHash) {
          if (error) {
            modal_return_fee.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('return_fee');
          modal_return_fee.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modal_return_fee.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
      });
  });
}

function withdraw_reward_confirm(dep_id) {
  modal_withdraw_yield.isLoadingAfterConfirm();
  // alert(dep_id); return;
  if (toNumber(userObject.deposits.rew_arr[2][dep_id]) === 0) {
    modal_withdraw_yield.isLoadedAfterConfirm(false);
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
        function (error, txnHash) {
          if (error) {
            modal_withdraw_yield.isLoadedAfterConfirm(false);
            throw error;
          }
          output_transaction(txnHash);
        }
      )
      .on('confirmation', async function (confirmationNumber, receipt) {
        if (toNumber(confirmationNumber) === 5) {
          await updateData('withdraw_deposit_reward');
          modal_withdraw_yield.isLoadedAfterConfirm();
        }
        resetMsg();
      })
      .catch((error) => {
        modal_withdraw_yield.isLoadedAfterConfirm(false);
        errorMsg('Smartcontract communication error');
      });
  });
}

function full_collateral_btn(dep_id) {
  document.getElementById('tokens_amount_collateral').value =
    depAmountByProfileId(userObject.state.selected_credprofile)[1];
  updUSDValueCollateral(
    'tokens_amount_collateral',
    'usd_value_collateral',
    dep_id
  );
  document.getElementById('tokens_amount_collateral').readOnly = true;
}

function part_collateral_btn(dep_id) {
  document.getElementById('tokens_amount_collateral').value = 0;
  updUSDValueCollateral(
    'tokens_amount_collateral',
    'usd_value_collateral',
    dep_id
  );
  document.getElementById('tokens_amount_collateral').readOnly = false;
}

function return_credit_all_btn(dep_id) {
  const adj_am = toTokens(userObject.credits.cred_arr[1][dep_id], 4);
  document.getElementById('credit_return_input').value = adj_am;
  document.getElementById('credit_return_input').readOnly = true;
}

function return_credit_part_btn(dep_id) {
  document.getElementById('credit_return_input').value = 0;
  document.getElementById('credit_return_input').readOnly = false;
}

function withdraw_deposit_all_btn(dep_id) {
  const modalElement = modal_withdraw_deposit.modal;
  const withdrawInput = modalElement.querySelector('#withraw_dep_input');

  const adj_am = toTokens(userObject.deposits.am_arr[2][dep_id], 4);

  withdrawInput.value = adj_am;
  withdrawInput.readOnly = true;
}

function withdraw_deposit_part_btn() {
  const modalElement = modal_withdraw_deposit.modal;
  const withdrawInput = modalElement.querySelector('#withraw_dep_input');

  withdrawInput.value = 0;
  withdrawInput.readOnly = false;
}

async function set_fixed_credit() {
  document
    .getElementById('set_fixed_credit')
    .classList.add('transparent_button_pressed');
  document
    .getElementById('set_var_credit')
    .classList.remove('transparent_button_pressed');

  if (
    toNumber(userObject.state.getcredit_profile) === -1 ||
    toNumber(userObject.state.selected_credprofile) === -1
  ) {
    return (document.getElementById('credit_perc').value = '');
  }

  const apy = await window.usage_calc_smartcontract_reader.methods
    .calcFixedApy(
      userObject.state.getcredit_profile,
      userObject.state.selected_credprofile
    )
    .call({
      from: userObject.account,
    });
  const apy_adj = (apy / apy_scale) * 100;
  document.getElementById('credit_perc').value = parseFloat(apy_adj)
    .toFixed(2)
    .toString();
}

async function set_var_credit() {
  document
    .getElementById('set_fixed_credit')
    .classList.remove('transparent_button_pressed');
  document
    .getElementById('set_var_credit')
    .classList.add('transparent_button_pressed');

  if (
    toNumber(userObject.state.getcredit_profile) === -1 ||
    toNumber(userObject.state.selected_credprofile) === -1
  ) {
    return (document.getElementById('credit_perc').value = '');
  }

  const apy = await window.usage_calc_smartcontract_reader.methods
    .calcVarApy(
      userObject.state.getcredit_profile,
      userObject.state.selected_credprofile
    )
    .call({
      from: userObject.account,
    });
  const apy_adj = (apy / apy_scale) * 100;
  document.getElementById('credit_perc').value = parseFloat(apy_adj)
    .toFixed(2)
    .toString();
}

async function set_leverage(ratio, cred_id) {
  // 100 - 100%
  ratio = toNumber(ratio);

  if (!(ratio === 25 || ratio === 50 || ratio === 75 || ratio === 100)) return;

  // function calcNeededLeverageByCreditSize(    uint32 credit_profile_id, uint32 lev_asset_profile_id,
  //  uint256 credit_amount, bool is_fixed_apy) public view returns(uint256 needed_leverage)
  const cytr_profile_id = await getCYTRProfileId();
  const credit_size = userObject.credits.cred_arr[1][cred_id]; // safeFloatToWei(document.getElementById('tokens_amount_getcredit').value);

  const cc = await window.credit_smartcontract.methods
    .viewCustomerCredit(userObject.account, 0)
    .call({
      from: userObject.account,
    });
  const cc_index = toNumber(cc.index);
  const x = await window.credit_smartcontract.methods
    .viewCustomerCreditExtraDataByIndex(cc_index, cred_id)
    .call({
      from: userObject.account,
    });

  const { is_fixed_apy } = x;

  const clt_id = userObject.credits.cred_arr[4][cred_id];
  const clt_profile_id = userObject.credits.clt_arr[0][toNumber(clt_id)];

  const lns = await window.usage_calc_smartcontract_reader.methods
    .calcNeededLeverageByCreditSize(
      userObject.credits.cred_arr[0][cred_id],
      clt_profile_id,
      cytr_profile_id,
      credit_size,
      is_fixed_apy
    )
    .call({
      from: userObject.account,
    });
  let lev_needed_size = new BN(lns);
  if ((ratio, 10 > 100 || ratio < 0)) ratio = 100;
  if (ratio !== 100) {
    const r = new BN(ratio);
    lev_needed_size = lev_needed_size.mul(r);
    lev_needed_size = lev_needed_size.div(new BN(100));
  }
  window.lev_size_wei = lev_needed_size;

  const size_tokens = window.web3js_reader.utils.fromWei(
    lev_needed_size,
    'ether'
  );

  document.getElementById('lev_size').value = parseFloat(size_tokens)
    .toFixed(2)
    .toString();
}

async function getCYTRProfileId() {
  if (!userObject.deposit_profiles) {
    userObject.deposit_profiles = await getAllProfiles();
  }

  if (!window.cytr_profile_id) {
    for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
      if (userObject.deposit_profiles[i].p_name === LEVERAGE_TOKEN) {
        window.cytr_profile_id = toNumber(userObject.deposit_profiles[i].p_id);
        return window.cytr_profile_id;
      }
    }
    window.cytr_profile_id = BAD_DEPOSIT_PROFILE_ID;
    return window.cytr_profile_id;
  }

  return window.cytr_profile_id;
}

async function getWalletBalanceStr(token_address) {
  const erc20contract = await new window.web3js_reader.eth.Contract(
    erc20TokenContractAbi,
    token_address
  );
  const erc20_count = await erc20contract.methods
    .balanceOf(userObject.account)
    .call({
      from: userObject.account,
    });
  // let adj_count = floorDecimals( window.web3js_reader.utils.fromWei(erc20_count, 'ether'),3);

  const adj_count_str = toTokens(erc20_count, 3);
  return adj_count_str;
}

async function getWalletBalance(token_address) {
  if (token_address === 'BNB') {
    const wb = await window.web3js_reader.eth.getBalance(userObject.account);
    return floorDecimals(window.web3js_reader.utils.fromWei(wb, 'ether'), 3);
  }
  const erc20contract = await new window.web3js_reader.eth.Contract(
    erc20TokenContractAbi,
    token_address
  );
  const erc20_count = await erc20contract.methods
    .balanceOf(userObject.account)
    .call({
      from: userObject.account,
    });
  // let adj_count = floorDecimals( window.web3js_reader.utils.fromWei(erc20_count, 'ether'),3);

  const n_tokens = floorDecimals(
    window.web3js_reader.utils.fromWei(erc20_count, 'ether'),
    3
  );
  return n_tokens;
}

async function getAPY(profile_id) {
  if (!userObject.deposit_profiles) {
    userObject.deposit_profiles = await getAllProfiles();
  }

  if (!window.dep_apys) {
    window.dep_apys = [];
    for (let i = 0; i < userObject.deposit_profiles?.length ?? 0; i++) {
      window.dep_apys[toNumber(userObject.deposit_profiles[i].p_id)] = null;
    }
  }

  if (window.dep_apys[profile_id]) {
    return window.dep_apys[profile_id];
  }
  const apy = await window.usage_calc_smartcontract_reader.methods
    .calcDepApy(profile_id)
    .call({
      from: userObject.account,
    });
  window.dep_apys[profile_id] = apy;
  return window.dep_apys[profile_id];
}
