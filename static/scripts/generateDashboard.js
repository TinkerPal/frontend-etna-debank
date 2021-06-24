const cron = require('node-cron');
const BN = require('bn.js');
const Web3 = require('web3');
const axios = require('axios');
const https = require('https');
const fs = require('fs');

const staking_contract_abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "_operator", "type": "address" }, { "indexed": false, "internalType": "address", "name": "_from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, { "indexed": false, "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "ERC721Received", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "CANNOT_TRANSFER_TO_ZERO_ADDRESS", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "NOT_CURRENT_OWNER", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_own_address", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "tokens_number", "type": "uint256" }, { "internalType": "uint256", "name": "deposit_date", "type": "uint256" }, { "internalType": "bool", "name": "imply_lock", "type": "bool" }], "name": "addToCustomerDeposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }], "name": "amountsPerDeposits", "outputs": [{ "internalType": "uint32[]", "name": "", "type": "uint32[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256[]", "name": "token_ids", "type": "uint256[]" }, { "internalType": "uint32", "name": "profile_id", "type": "uint32" }, { "internalType": "uint32", "name": "famer_id", "type": "uint32" }], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }], "name": "depositDays", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }], "name": "depositReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "profile_id", "type": "uint32" }], "name": "depositsStat", "outputs": [{ "internalType": "uint256", "name": "tot_am", "type": "uint256" }, { "internalType": "uint256", "name": "tot_extr_am", "type": "uint256" }, { "internalType": "uint256", "name": "tot_rew", "type": "uint256" }, { "internalType": "uint256", "name": "tot_extr_rew", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "profile_id", "type": "uint32" }], "name": "depositsTotAmount", "outputs": [{ "internalType": "uint256", "name": "tot_am", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getContractDay", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCreditContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getCustomersDepositsItem", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCustomersDepositsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getDepProfilesRegister", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getLiqLevContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getManager", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getRewardToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getUsageCalcContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getVotesCalcContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }], "name": "isNFTCollateralExists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_operator", "type": "address" }, { "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "onERC721Received", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "addresspayable", "name": "to_wallet", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "ownerWithdrawEther", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to_wallet", "type": "address" }, { "internalType": "address", "name": "token_address", "type": "address" }, { "internalType": "uint256", "name": "index_from", "type": "uint256" }, { "internalType": "uint256", "name": "index_to", "type": "uint256" }], "name": "ownerWithdrawNFTs", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to_wallet", "type": "address" }, { "internalType": "address", "name": "token_address", "type": "address" }, { "internalType": "uint8", "name": "token_type", "type": "uint8" }, { "internalType": "uint256", "name": "real_amount_tokens", "type": "uint256" }, { "internalType": "uint256[]", "name": "token_ids", "type": "uint256[]" }], "name": "ownerWithdrawTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }], "name": "rewardsPerDeposits", "outputs": [{ "internalType": "uint32[]", "name": "", "type": "uint32[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "period", "type": "uint256" }], "name": "setContractDay", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "new_credit_contract", "type": "address" }], "name": "setCreditContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "tokens_number", "type": "uint256" }, { "internalType": "uint256", "name": "deposit_date", "type": "uint256" }, { "internalType": "bool", "name": "imply_lock", "type": "bool" }], "name": "setCustomerDeposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "new_dep_profiles_register", "type": "address" }], "name": "setDepProfilesRegister", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "new_liq_lev_contract", "type": "address" }], "name": "setLiqLevContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "new_manager", "type": "address" }], "name": "setManagerRight", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "new_reward_token_address", "type": "address" }], "name": "setRewardToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "new_usage_calc_contract", "type": "address" }], "name": "setUsageCalcContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "new_votes_calc_contract", "type": "address" }], "name": "setVotesCalcContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevContractAddress", "type": "address" }], "name": "setupFromConfig", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevContractAddress", "type": "address" }, { "internalType": "uint256", "name": "cust_index_from", "type": "uint256" }, { "internalType": "uint256", "name": "cust_index_to", "type": "uint256" }], "name": "setupFromDepositsCustFromTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevContractAddress", "type": "address" }, { "internalType": "uint256", "name": "cust_index", "type": "uint256" }], "name": "setupFromDepositsCustIndex", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "start", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "profile_id", "type": "uint32" }], "name": "totalNFTValue", "outputs": [{ "internalType": "uint256", "name": "tot_val", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }], "name": "viewCustomerDeposit", "outputs": [{ "internalType": "uint32", "name": "deposit_profile_id", "type": "uint32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }], "name": "viewCustomerDepositByIndex", "outputs": [{ "internalType": "uint32", "name": "deposit_profile_id", "type": "uint32" }, { "internalType": "uint256", "name": "deposit_amount", "type": "uint256" }, { "internalType": "uint256", "name": "tokens_number", "type": "uint256" }, { "internalType": "uint256", "name": "deposit_date", "type": "uint256" }, { "internalType": "uint256", "name": "acc_reward", "type": "uint256" }, { "internalType": "uint256", "name": "nft_value", "type": "uint256" }, { "internalType": "bool", "name": "imply_lock", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }, { "internalType": "uint256", "name": "token_id_num", "type": "uint256" }], "name": "viewCustomerDepositTokenByIndex", "outputs": [{ "internalType": "uint256", "name": "token_id", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }, { "internalType": "uint256", "name": "withdraw_amount", "type": "uint256" }, { "internalType": "bool", "name": "whole", "type": "bool" }], "name": "withdrawDepositById", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }], "name": "withdrawDepositRewardById", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }, { "internalType": "uint256", "name": "position", "type": "uint256" }, { "internalType": "uint256", "name": "token_id", "type": "uint256" }], "name": "writeNFTTokenToCustomerDeposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];


const data_provider_abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "address", "name": "contract_addr", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "isInternal", "type": "bool" }], "name": "DataProfileRegistered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "CANNOT_TRANSFER_TO_ZERO_ADDRESS", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "NOT_CURRENT_OWNER", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "data_profiles", "outputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "address", "name": "data_provider_contract", "type": "address" }, { "internalType": "bool", "name": "isInternal", "type": "bool" }, { "internalType": "int256", "name": "_data", "type": "int256" }, { "internalType": "uint8", "name": "_decimals", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "data_profiles_length", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }], "name": "getData", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getDataManager", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }], "name": "getDecimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }], "name": "isRegisteredDataProfile", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "address", "name": "data_provider_contract", "type": "address" }, { "internalType": "bool", "name": "isInternal", "type": "bool" }, { "internalType": "int256", "name": "_data", "type": "int256" }, { "internalType": "uint8", "name": "_dec", "type": "uint8" }], "name": "registerDataProfile", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }], "name": "removeDataProfile", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "address", "name": "data_provider_contract", "type": "address" }, { "internalType": "bool", "name": "isInternal", "type": "bool" }, { "internalType": "int256", "name": "_data", "type": "int256" }, { "internalType": "uint8", "name": "_dec", "type": "uint8" }], "name": "replaceDataProfile", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "int256", "name": "new_data", "type": "int256" }], "name": "setData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "new_data_manager", "type": "address" }], "name": "setDataManagerRight", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint8", "name": "new_decimals", "type": "uint8" }], "name": "setDecimals", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevContractAddress", "type": "address" }], "name": "setupFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

const credit_contract_abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "cust_wallet", "type": "address" }, { "indexed": false, "internalType": "uint32", "name": "cred_id", "type": "uint32" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint32", "name": "profile_id", "type": "uint32" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" }], "name": "CreditDecreased", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "cust_wallet", "type": "address" }, { "indexed": false, "internalType": "uint32", "name": "dep_collateral_id", "type": "uint32" }, { "indexed": false, "internalType": "uint256", "name": "cred_amount", "type": "uint256" }, { "indexed": false, "internalType": "uint32", "name": "cred_profile_id", "type": "uint32" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" }], "name": "CreditGot", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "cust_wallet", "type": "address" }, { "indexed": false, "internalType": "uint32", "name": "cred_id", "type": "uint32" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint32", "name": "profile_id", "type": "uint32" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" }], "name": "FeeZeroed", "type": "event" }, { "inputs": [], "name": "CANNOT_TRANSFER_TO_ZERO_ADDRESS", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "NOT_CURRENT_OWNER", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_manager", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_own_address", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }], "name": "amountsPerCollaterals", "outputs": [{ "internalType": "uint32[]", "name": "", "type": "uint32[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "credit_profile_id", "type": "uint32" }, { "internalType": "uint256", "name": "collateral_profile_id", "type": "uint256" }], "name": "calcFixedApy", "outputs": [{ "internalType": "uint256", "name": "fixed_apy", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "cred_profiles_register", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "index", "type": "uint32" }, { "internalType": "uint32", "name": "cred_id", "type": "uint32" }], "name": "creditFee", "outputs": [{ "internalType": "uint256", "name": "fee", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "profile_id", "type": "uint32" }], "name": "creditsStat", "outputs": [{ "internalType": "uint256", "name": "tot_am", "type": "uint256" }, { "internalType": "uint256", "name": "tot_f", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "profile_id", "type": "uint32" }], "name": "creditsTotAmount", "outputs": [{ "internalType": "uint256", "name": "tot_am", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint32", "name": "cred_id", "type": "uint32" }], "name": "currentCredit", "outputs": [{ "internalType": "uint256", "name": "cred_body", "type": "uint256" }, { "internalType": "uint256", "name": "cred_fee", "type": "uint256" }, { "internalType": "uint32", "name": "cust_index", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }], "name": "dataPerCredits", "outputs": [{ "internalType": "uint32[]", "name": "", "type": "uint32[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }, { "internalType": "uint32[]", "name": "", "type": "uint32[]" }, { "internalType": "uint32[]", "name": "", "type": "uint32[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint32", "name": "clt_id", "type": "uint32" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "decreaseCollateral", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint32", "name": "cred_id", "type": "uint32" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "decreaseCredit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "dep_profiles_register", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "deposit_contract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "index", "type": "uint32" }, { "internalType": "uint32", "name": "_new_number", "type": "uint32" }], "name": "directEditCredNumber", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getCredProfilesRegister", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }, { "internalType": "uint256", "name": "cred_amount", "type": "uint256" }, { "internalType": "uint32", "name": "get_credit_profile_id", "type": "uint32" }, { "internalType": "bool", "name": "whole", "type": "bool" }, { "internalType": "bool", "name": "is_fixed_apy", "type": "bool" }], "name": "getCredit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "index", "type": "uint32" }], "name": "getCustomersCollateralsItem", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCustomersCollateralsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "index", "type": "uint32" }], "name": "getCustomersCreditsItem", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCustomersCreditsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getDepositContract", "outputs": [{ "internalType": "address", "name": "dep_contract", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "liq_lev_contract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint32", "name": "cred_id", "type": "uint32" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "returnCredit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint32", "name": "cred_id", "type": "uint32" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "returnFee", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "new_cred_profiles_register", "type": "address" }], "name": "setCredProfilesRegister", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "new_deposit_contract", "type": "address" }], "name": "setDepositContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "new_manager", "type": "address" }], "name": "setManagerRight", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevContractAddress", "type": "address" }], "name": "setupFromConfig", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevContractAddress", "type": "address" }], "name": "setupFromData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevContractAddress", "type": "address" }, { "internalType": "uint32", "name": "cust_index", "type": "uint32" }], "name": "setupFromDataCreditsCltls", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "prevContractAddress", "type": "address" }, { "internalType": "uint32", "name": "cust_index", "type": "uint32" }], "name": "setupFromDataCreditsCust", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "index", "type": "uint32" }, { "internalType": "uint32", "name": "cred_id", "type": "uint32" }, { "internalType": "uint256", "name": "apy_value", "type": "uint256" }], "name": "startCreditLeverage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "index", "type": "uint32" }, { "internalType": "uint32", "name": "cred_id", "type": "uint32" }, { "internalType": "bool", "name": "prev_is_fixed_apy", "type": "bool" }, { "internalType": "uint256", "name": "prev_apy_value", "type": "uint256" }], "name": "stopCreditLeverage", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "usage_calc_contract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint32", "name": "cred_id", "type": "uint32" }], "name": "viewCreditAmount", "outputs": [{ "internalType": "uint256", "name": "credit_amount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint256", "name": "dep_id", "type": "uint256" }], "name": "viewCustomerCollateral", "outputs": [{ "internalType": "uint32", "name": "deposit_profile_id", "type": "uint32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "index", "type": "uint32" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }], "name": "viewCustomerCollateralByIndex", "outputs": [{ "internalType": "uint32", "name": "deposit_profile_id", "type": "uint32" }, { "internalType": "uint256", "name": "deposit_amount", "type": "uint256" }, { "internalType": "uint256", "name": "tokens_number", "type": "uint256" }, { "internalType": "uint256", "name": "deposit_date", "type": "uint256" }, { "internalType": "uint256", "name": "acc_reward", "type": "uint256" }, { "internalType": "uint256", "name": "nft_value", "type": "uint256" }, { "internalType": "bool", "name": "imply_lock", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "index", "type": "uint32" }, { "internalType": "uint32", "name": "dep_id", "type": "uint32" }, { "internalType": "uint256", "name": "token_id_num", "type": "uint256" }], "name": "viewCustomerCollateralTokenByIndex", "outputs": [{ "internalType": "uint256", "name": "token_id", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "cust_wallet", "type": "address" }, { "internalType": "uint256", "name": "cred_id", "type": "uint256" }], "name": "viewCustomerCredit", "outputs": [{ "internalType": "uint32", "name": "credit_profile_id", "type": "uint32" }, { "internalType": "uint32", "name": "index", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "index", "type": "uint32" }, { "internalType": "uint32", "name": "cred_id", "type": "uint32" }], "name": "viewCustomerCreditByIndex", "outputs": [{ "internalType": "uint32", "name": "profile_id", "type": "uint32" }, { "internalType": "uint256", "name": "collateral_profile_id", "type": "uint256" }, { "internalType": "uint32", "name": "collateral_id", "type": "uint32" }, { "internalType": "uint256", "name": "credit_amount", "type": "uint256" }, { "internalType": "uint256", "name": "credit_date", "type": "uint256" }, { "internalType": "uint256", "name": "acc_fee", "type": "uint256" }, { "internalType": "uint32", "name": "linked_dep_id", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint32", "name": "index", "type": "uint32" }, { "internalType": "uint32", "name": "cred_id", "type": "uint32" }], "name": "viewCustomerCreditExtraDataByIndex", "outputs": [{ "internalType": "bool", "name": "is_fixed_apy", "type": "bool" }, { "internalType": "uint256", "name": "fixed_apy", "type": "uint256" }], "stateMutability": "view", "type": "function" }];

const RPC = 'https://proud-patient-forest.bsc.quiknode.pro/8fffb4d84f42ec02686c35631b566c819138e876/'
const NFT_TOKEN_ID = '7';
const USER_ACCOUNT = '0xC358A60bcCEc7d0eFe5c5E0d9f3862bBA6cb5cd8';
const WALLETS_API_URL = 'https://prod-debank-wallet-api.etna.network';
const DEPOSIT_CONTRACT_ADDRESS = '0x5744d84892D255b41bf68a7983D7257AC6be77f9';
const CREDIT_CONTRACT_ADDRESS = "0x97ab0b143cE0Eb04224F00CaD41Ee943Dd87C5De";
const DATA_PROVIDER_CONTRACT_ADDESS = "0xCa3B2930D66E50EBc21Dd182FD9D9A78b595b017";
const LEVERAGE_TOKEN = 'ETNA';
const NATIVE_ETHEREUM = 4;

const web3 = new Web3(RPC)

const deposit_contract = new web3.eth.Contract(staking_contract_abi, DEPOSIT_CONTRACT_ADDRESS);
const credit_contract = new web3.eth.Contract(credit_contract_abi, CREDIT_CONTRACT_ADDRESS);
const data_contract = new web3.eth.Contract(data_provider_abi, DATA_PROVIDER_CONTRACT_ADDESS);

function toNumber(number) {
    return parseInt(number, 10);
}

function floorDecimals(value, decimals) {
    return Number(`${Math.floor(`${value}e${decimals}`)}e-${decimals}`);
}

function toTokens(wei_am, digs) {
    const n_tokens = floorDecimals(
        web3.utils.fromWei(wei_am, 'ether'),
        digs
    );
    return parseFloat(n_tokens).toFixed(digs).toString();
}

async function getPriceOfTokens(
    tokenAmount,
    tokenName,
    tokenType,
    isSafeAmount = false
) {
    const token = toNumber(tokenType) === NATIVE_ETHEREUM ? 'BNBUSD' : tokenName;

    const wei_amount = isSafeAmount
        ? new BN(tokenAmount)
        : safeFloatToWei(tokenAmount); // BN

    const [data, dec] = await Promise.all([
        data_contract.methods.getData(token).call({
            from: USER_ACCOUNT,
        }),
        data_contract.methods.getDecimals(token).call({
            from: USER_ACCOUNT,
        }),
    ]);

    const usd_bn = new BN(wei_amount.mul(new BN(data)));

    const base = new BN(10);
    const div_dec = new BN(base.pow(new BN(dec)));
    const usd_adj = new BN(usd_bn.div(div_dec));

    return parseFloat(web3.utils.fromWei(usd_adj, 'ether'));
}

async function getAllProfiles() {
    const options = {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    }
    const profilesData = await axios.get(`${WALLETS_API_URL}/get_var/DEPPROFILES_UI_LIST`, options).then(response => response.data).catch(function (error) {
        console.log(error);
    });

    if (!profilesData) return;

    if (profilesData.type !== 'success') return;

    return JSON.parse(profilesData.var);
}

async function getDepositAmount(profiles) {
    const depositsAmountArrayForPromise = [];

    profiles.forEach((item) => {
        depositsAmountArrayForPromise.push(
            deposit_contract.methods.depositsTotAmount(item.p_id).call({
                from: USER_ACCOUNT,
            })
        );
    });

    const depositAmountData = await Promise.all(depositsAmountArrayForPromise);
    return depositAmountData || [];
}

async function getDepositTotal(profiles, depositAmountData) {
    const totalNftInEtna = await deposit_contract.methods
        .totalNFTValue(NFT_TOKEN_ID)
        .call({
            from: USER_ACCOUNT,
        });

    const depositsTotalArrayForPromise = [];
    profiles.forEach(async (item, index) => {
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
    return depositsTotal || [];
}


async function run() {
    const profiles = await getAllProfiles();
    if(!profiles) return;

    const users = await deposit_contract.methods.getCustomersDepositsLength().call({ from: USER_ACCOUNT });

    const depositAmountData = await getDepositAmount(profiles);

    const depositsTotal = await getDepositTotal(profiles, depositAmountData);

    const tokensStatistic = depositAmountData
        .map((amount, index) => ({
            name: profiles[index].p_name,
            total: depositsTotal[index],
            amount:
                profiles[index].p_id !== NFT_TOKEN_ID
                    ? toTokens(amount, 1)
                    : amount,
        }))
        .filter((item) => item.total > 0);

    const nftStatistic = tokensStatistic.find((item) => item.name === 'nft');

    const totalAssets = tokensStatistic.reduce(
        (prev, cur) => toNumber(prev) + toNumber(cur.total),
        0
    );

    const creditsAmountArrayForPromise = [];
    profiles.forEach((item) => {
        creditsAmountArrayForPromise.push(
            credit_contract.methods.creditsTotAmount(item.p_id).call({
                from: USER_ACCOUNT,
            })
        );
    });
    const creditsAmountArray = await Promise.all(creditsAmountArrayForPromise);

    const creditsTotalArrayForPromise = [];
    profiles.forEach((item, index) => {
        creditsTotalArrayForPromise.push(
            getPriceOfTokens(
                creditsAmountArray[index],
                item.p_name,
                item.p_dep_type,
                true
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
        totalNft: nftStatistic.amount,
        totalDeposits: totalAssets,
    };
    fs.writeFile("../dashboard.json", JSON.stringify(data), function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
}

run();
cron.schedule('0 */4 * * *', () => { //every 4 hours
    run();
});