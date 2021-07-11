/* eslint-disable camelcase */
import { web3jsReadersList } from '.';
import { CYCLOPS_NFT_CONTRACT_ADDRESS } from '../../constants/env';
import {
  credit_contract_abi,
  data_provider_abi,
  liqlev_contract_abi,
  nftpub_contracts_abi,
  staking_contract_abi,
  usage_calc_abi,
  votes_calc_abi,
} from '../../constants/web3ContractAbi';

export async function initDataProviderContractReader(callback = null) {
  if (!window.data_provider_smartcontract_reader) {
    const reader = web3jsReadersList.get();
    window.data_provider_smartcontract_reader = await new reader.eth.Contract(
      data_provider_abi,
      window.data_provider_contract_address
    );

    if (callback) callback(window.data_provider_smartcontract_reader);
  } else if (callback) callback(window.data_provider_smartcontract_reader);
}

export async function initStakingContract(callback = null) {
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

export async function initStakingContractReader(callback = null) {
  if (!window.staking_smartcontract_reader) {
    const reader = web3jsReadersList.get();
    window.staking_smartcontract_reader = await new reader.eth.Contract(
      staking_contract_abi,
      window.staking_contract_address
    );
    if (callback) callback(window.staking_smartcontract_reader);
  } else if (callback) callback(window.staking_smartcontract_reader);
}

export async function initCreditContract(callback = null) {
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

export async function initCreditContractReader(callback = null) {
  if (!window.credit_smartcontract_reader) {
    const reader = web3jsReadersList.get();
    window.credit_smartcontract_reader = await new reader.eth.Contract(
      credit_contract_abi,
      window.credit_contract_address
    );
    if (callback) callback(window.credit_smartcontract_reader);
  } else if (callback) callback(window.credit_smartcontract_reader);
}

export async function initLiqLevContract(callback = null) {
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

export async function initLiqLevContractReader(callback = null) {
  if (!window.liqlev_smartcontract_reader) {
    const reader = web3jsReadersList.get();
    window.liqlev_smartcontract_reader = await new reader.eth.Contract(
      liqlev_contract_abi,
      window.liqlev_contract_address
    );
    if (callback) callback(window.liqlev_smartcontract_reader);
  } else if (callback) callback(window.liqlev_smartcontract_reader);
}

export async function initVotesCalcContractReader(callback = null) {
  if (!window.votes_calc_smartcontract_reader) {
    const reader = web3jsReadersList.get();
    window.votes_calc_smartcontract_reader = await new reader.eth.Contract(
      votes_calc_abi,
      window.votes_calc_contract_address
    );
    if (callback) callback(window.votes_calc_smartcontract_reader);
  } else if (callback) callback(window.votes_calc_smartcontract_reader);
}

export async function initUsageCalcContractReader(callback = null) {
  if (!window.usage_calc_smartcontract_reader) {
    const reader = web3jsReadersList.get();
    window.usage_calc_smartcontract_reader = await new reader.eth.Contract(
      usage_calc_abi,
      window.usage_calc_contract_address
    );

    if (callback) callback(window.usage_calc_smartcontract_reader);
  } else if (callback) callback(window.usage_calc_smartcontract_reader);
}

export async function initCyclopsNFTContractReader(callback = null) {
  if (!window.cyclops_nft_smartcontract_reader) {
    const reader = web3jsReadersList.get();
    window.cyclops_nft_smartcontract_reader = await new reader.eth.Contract(
      nftpub_contracts_abi,
      CYCLOPS_NFT_CONTRACT_ADDRESS
    );

    if (callback) callback(window.cyclops_nft_smartcontract_reader);
  } else if (callback) callback(window.cyclops_nft_smartcontract_reader);
}

export async function initCyclopsNFTContract(callback = null) {
  if (!window.cyclops_nft_smartcontract) {
    if (window.web3js) {
      window.cyclops_nft_smartcontract = await new window.web3js.eth.Contract(
        nftpub_contracts_abi,
        CYCLOPS_NFT_CONTRACT_ADDRESS
      );
      if (callback) callback(window.cyclops_nft_smartcontract);
    }
  } else if (callback) callback(window.cyclops_nft_smartcontract);
}
