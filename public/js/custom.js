const WALLETS_API_URL = "https://bsc-debank-wallet-api.etna.network";
//const NFT_PUB_API_URL = "https://bsc-debank-pub-api.etna.network";
//const NFT_ROOT_URL = "https://debank.etna.network/nft";



const erc20TokenContractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];

const staking_contract_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint32","name":"profile_id","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"dep_id","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ApprovedContractBlockDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint32","name":"profile_id","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"dep_id","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"CustomerWithdrawDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint32","name":"profile_id","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"dep_id","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"CustomerWithdrawDepositRewardById","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"},{"indexed":false,"internalType":"uint32","name":"profile_id","type":"uint32"},{"indexed":false,"internalType":"uint8","name":"deposit_type","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"token_ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"DepositPlaced","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token_address","type":"address"},{"indexed":false,"internalType":"uint256","name":"real_amount_tokens","type":"uint256"},{"indexed":false,"internalType":"address","name":"to_wallet","type":"address"}],"name":"ERC20ownerWithdrawTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_operator","type":"address"},{"indexed":false,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"_data","type":"bytes"}],"name":"ERC721Received","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token_address","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens_count","type":"uint256"},{"indexed":false,"internalType":"address","name":"to_wallet","type":"address"}],"name":"ERC721ownerWithdrawTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"to_wallet","type":"address"}],"name":"OwnerWithdrawEther","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_own_address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint32","name":"dep_id","type":"uint32"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"tokens_number","type":"uint256"},{"internalType":"uint256","name":"deposit_date","type":"uint256"},{"internalType":"bool","name":"imply_lock","type":"bool"}],"name":"addToCustomerDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"}],"name":"amountsPerDeposits","outputs":[{"internalType":"uint32[]","name":"","type":"uint32[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"token_ids","type":"uint256[]"},{"internalType":"uint32","name":"profile_id","type":"uint32"},{"internalType":"uint32","name":"famer_id","type":"uint32"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"dep_id","type":"uint32"}],"name":"depositDays","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint32","name":"dep_id","type":"uint32"}],"name":"depositReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"}],"name":"depositsStat","outputs":[{"internalType":"uint256","name":"tot_am","type":"uint256"},{"internalType":"uint256","name":"tot_extr_am","type":"uint256"},{"internalType":"uint256","name":"tot_rew","type":"uint256"},{"internalType":"uint256","name":"tot_extr_rew","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"}],"name":"depositsTotAmount","outputs":[{"internalType":"uint256","name":"tot_am","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCreditContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getCustomersDepositsItem","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCustomersDepositsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDepProfilesRegister","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLiqLevContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUsageCalcContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVotesCalcContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"addresspayable","name":"to_wallet","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ownerWithdrawEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to_wallet","type":"address"},{"internalType":"address","name":"token_address","type":"address"},{"internalType":"uint8","name":"token_type","type":"uint8"},{"internalType":"uint256","name":"real_amount_tokens","type":"uint256"},{"internalType":"uint256[]","name":"token_ids","type":"uint256[]"}],"name":"ownerWithdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"}],"name":"rewardsPerDeposits","outputs":[{"internalType":"uint32[]","name":"","type":"uint32[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"period","type":"uint256"}],"name":"setContractDay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_credit_contract","type":"address"}],"name":"setCreditContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_dep_profiles_register","type":"address"}],"name":"setDepProfilesRegister","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_liq_lev_contract","type":"address"}],"name":"setLiqLevContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_manager","type":"address"}],"name":"setManagerRight","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_reward_token_address","type":"address"}],"name":"setRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_usage_calc_contract","type":"address"}],"name":"setUsageCalcContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_votes_calc_contract","type":"address"}],"name":"setVotesCalcContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevContractAddress","type":"address"}],"name":"setupFromConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevContractAddress","type":"address"}],"name":"setupFromDeposits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"start","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"}],"name":"totalNFTValue","outputs":[{"internalType":"uint256","name":"tot_val","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"dep_id","type":"uint32"}],"name":"viewCustomerDeposit","outputs":[{"internalType":"uint32","name":"deposit_profile_id","type":"uint32"},{"internalType":"uint256","name":"index","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint32","name":"dep_id","type":"uint32"}],"name":"viewCustomerDepositByIndex","outputs":[{"internalType":"uint32","name":"deposit_profile_id","type":"uint32"},{"internalType":"uint256","name":"deposit_amount","type":"uint256"},{"internalType":"uint256","name":"tokens_number","type":"uint256"},{"internalType":"uint256","name":"deposit_date","type":"uint256"},{"internalType":"uint256","name":"acc_reward","type":"uint256"},{"internalType":"uint256","name":"nft_value","type":"uint256"},{"internalType":"bool","name":"imply_lock","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint32","name":"dep_id","type":"uint32"},{"internalType":"uint256","name":"token_id_num","type":"uint256"}],"name":"viewCustomerDepositTokenByIndex","outputs":[{"internalType":"uint256","name":"token_id","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"dep_id","type":"uint32"},{"internalType":"uint256","name":"withdraw_amount","type":"uint256"},{"internalType":"bool","name":"whole","type":"bool"}],"name":"withdrawDepositById","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"dep_id","type":"uint32"}],"name":"withdrawDepositRewardById","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

const famers_register_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"famer_token_address","type":"address"}],"name":"FamerTokenRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"to_wallet","type":"address"}],"name":"OwnerWithdrawEther","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"famers","outputs":[{"internalType":"address","name":"famer_token_address","type":"address"},{"internalType":"bool","name":"sold","type":"bool"},{"internalType":"uint256","name":"sold_for","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"famersLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBankContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"i","type":"uint32"}],"name":"getFamerName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"i","type":"uint32"}],"name":"getFamerUri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"famer_token_address","type":"address"}],"name":"isRegisteredFamer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"addresspayable","name":"killAddress","type":"address"}],"name":"kill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"addresspayable","name":"to_wallet","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ownerWithdrawEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"famer_token_address","type":"address"},{"internalType":"bool","name":"sold","type":"bool"},{"internalType":"uint256","name":"sold_for","type":"uint256"}],"name":"registerFamer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"famer_token_address","type":"address"}],"name":"removeFamer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"famer_token_address","type":"address"},{"internalType":"bool","name":"sold","type":"bool"},{"internalType":"uint256","name":"sold_for","type":"uint256"}],"name":"replaceFamer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevContractAddress","type":"address"}],"name":"setupFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newBankContract","type":"address"}],"name":"transferBankRight","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const nftpub_contracts_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_operator","type":"address"},{"indexed":false,"internalType":"bool","name":"_approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":true,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_approved","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBankContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getContractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPublisher","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"string","name":"_uri","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"_name","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"bool","name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"new_name","type":"string"}],"name":"setNFTName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"new_symbol","type":"string"}],"name":"setNFTSymbol","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newBankContract","type":"address"}],"name":"transferBankRight","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newPublisher","type":"address"}],"name":"transferPublishRight","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"sendTo","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const profiles_register_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"id","type":"uint32"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint8","name":"deposit_type","type":"uint8"},{"internalType":"address","name":"deposit_token_address","type":"address"},{"internalType":"uint256","name":"init_apy","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"reward_per_day","type":"uint256"},{"internalType":"uint256","name":"min_lock_time","type":"uint256"}],"name":"addDepositProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"depositProfiles","outputs":[{"internalType":"uint32","name":"id","type":"uint32"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint8","name":"deposit_type","type":"uint8"},{"internalType":"address","name":"deposit_token_address","type":"address"},{"internalType":"uint256","name":"init_apy","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"reward_per_day","type":"uint256"},{"internalType":"uint256","name":"min_lock_time","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositProfilesLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getDepositProfileById","outputs":[{"internalType":"uint32","name":"","type":"uint32"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"id","type":"uint32"}],"name":"removeDepositProfileAtId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"id","type":"uint32"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint8","name":"deposit_type","type":"uint8"},{"internalType":"address","name":"deposit_token_address","type":"address"},{"internalType":"uint256","name":"init_apy","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"reward_per_day","type":"uint256"},{"internalType":"uint256","name":"min_lock_time","type":"uint256"}],"name":"replaceDepositProfileAtId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"i","type":"uint32"},{"internalType":"uint32","name":"id","type":"uint32"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint8","name":"deposit_type","type":"uint8"},{"internalType":"address","name":"deposit_token_address","type":"address"},{"internalType":"uint256","name":"init_apy","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"reward_per_day","type":"uint256"},{"internalType":"uint256","name":"min_lock_time","type":"uint256"}],"name":"replaceDepositProfileAtIndex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevContractAddress","type":"address"}],"name":"setupFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const data_provider_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"address","name":"contract_addr","type":"address"},{"indexed":false,"internalType":"bool","name":"isInternal","type":"bool"}],"name":"DataProfileRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"data_profiles","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"address","name":"data_provider_contract","type":"address"},{"internalType":"bool","name":"isInternal","type":"bool"},{"internalType":"int256","name":"_data","type":"int256"},{"internalType":"uint8","name":"_decimals","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"data_profiles_length","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"getData","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDataManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"getDecimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"isRegisteredDataProfile","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"address","name":"data_provider_contract","type":"address"},{"internalType":"bool","name":"isInternal","type":"bool"},{"internalType":"int256","name":"_data","type":"int256"},{"internalType":"uint8","name":"_dec","type":"uint8"}],"name":"registerDataProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"removeDataProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"address","name":"data_provider_contract","type":"address"},{"internalType":"bool","name":"isInternal","type":"bool"},{"internalType":"int256","name":"_data","type":"int256"},{"internalType":"uint8","name":"_dec","type":"uint8"}],"name":"replaceDataProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"int256","name":"new_data","type":"int256"}],"name":"setData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_data_manager","type":"address"}],"name":"setDataManagerRight","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint8","name":"new_decimals","type":"uint8"}],"name":"setDecimals","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevContractAddress","type":"address"}],"name":"setupFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const votes_calc_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"address","name":"contract_addr","type":"address"}],"name":"TokenDataRegistered","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"token_ids","type":"uint256[]"}],"name":"calcNFTTokensValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"deposit_type","type":"uint8"},{"internalType":"string","name":"dep_name","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"token_ids","type":"uint256[]"}],"name":"calcVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"data_label","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"calcVotesForERC20","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"token_ids","type":"uint256[]"}],"name":"calcVotesForERC721","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"calcVotesForETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDataProviderContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDepositContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getFamerVote","outputs":[{"internalType":"uint32","name":"","type":"uint32"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"famer_id","type":"uint256"}],"name":"getFamerVoteByFamer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFamerVotesLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNFTMarketplaceContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"base","type":"uint256"},{"internalType":"uint256","name":"exponent","type":"uint256"}],"name":"pow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint32","name":"famer_id","type":"uint32"},{"internalType":"uint256","name":"vote","type":"uint256"}],"name":"registerFamerVote","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_data_provider_contract","type":"address"}],"name":"setDataProviderContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_deposit_contract","type":"address"}],"name":"setDepositContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_nft_marketplace_contract","type":"address"}],"name":"setNFTMarketplaceContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevContractAddress","type":"address"}],"name":"setupFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"token_data_sources","outputs":[{"internalType":"string","name":"data_profile_name","type":"string"},{"internalType":"address","name":"stakable_token_addr","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const usage_calc_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_own_address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"profile_id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"adjustedAsset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"profile_id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"adjustedCollateral","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"}],"name":"calcDepApy","outputs":[{"internalType":"uint256","name":"dep_apy","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"},{"internalType":"uint256","name":"collateral_profile_id","type":"uint256"}],"name":"calcFixedApy","outputs":[{"internalType":"uint256","name":"fixed_apy","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"usd_value","type":"uint256"},{"internalType":"uint256","name":"profile_id","type":"uint256"}],"name":"calcFromUSDValue","outputs":[{"internalType":"uint256","name":"est_tokens","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"credit_profile_id","type":"uint32"},{"internalType":"uint256","name":"collateral_profile_id","type":"uint256"},{"internalType":"uint256","name":"credit_amount","type":"uint256"},{"internalType":"bool","name":"is_fixed_apy","type":"bool"},{"internalType":"uint256","name":"days_num","type":"uint256"}],"name":"calcFutureCreditFee","outputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"credit_profile_id","type":"uint32"},{"internalType":"uint256","name":"collateral_profile_id","type":"uint256"},{"internalType":"uint32","name":"lev_asset_profile_id","type":"uint32"},{"internalType":"uint256","name":"credit_amount","type":"uint256"},{"internalType":"bool","name":"is_fixed_apy","type":"bool"}],"name":"calcNeededLeverageByCreditSize","outputs":[{"internalType":"uint256","name":"needed_leverage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"dep_id","type":"uint32"},{"internalType":"uint256","name":"dep_amount","type":"uint256"}],"name":"calcUSDValue","outputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"},{"internalType":"uint256","name":"est_usd","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"profile_id","type":"uint256"},{"internalType":"uint256","name":"dep_amount","type":"uint256"}],"name":"calcUSDValueByProfileNonNFT","outputs":[{"internalType":"uint256","name":"est_usd","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"profile_id","type":"uint256"},{"internalType":"uint256","name":"dep_amount","type":"uint256"}],"name":"calcUSDValueByProfileNonNFT_mwei","outputs":[{"internalType":"uint256","name":"est_usd","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"dep_id","type":"uint32"},{"internalType":"uint256","name":"dep_amount","type":"uint256"},{"internalType":"uint32","name":"get_credit_profile_id","type":"uint32"}],"name":"calcUSDValueCollateral","outputs":[{"internalType":"uint256","name":"est_usd","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"dep_id","type":"uint32"},{"internalType":"uint256","name":"dep_amount","type":"uint256"}],"name":"calcUSDValue_mwei","outputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"},{"internalType":"uint256","name":"est_usd_apy_scale","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"},{"internalType":"uint256","name":"collateral_profile_id","type":"uint256"}],"name":"calcVarApy","outputs":[{"internalType":"uint256","name":"variable_apy","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cred_profiles_register","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"cred_id","type":"uint32"}],"name":"creditFee","outputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"cred_id","type":"uint32"},{"internalType":"uint256","name":"num_periods","type":"uint256"}],"name":"creditFeeFuture","outputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"credit_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dep_profiles_register","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint32","name":"dep_id","type":"uint32"}],"name":"depositReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"},{"internalType":"uint256","name":"rew_size","type":"uint256"},{"internalType":"uint256","name":"num_periods","type":"uint256"}],"name":"depositSizeFromReward","outputs":[{"internalType":"uint256","name":"dep_size","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"asset_profile_id","type":"uint256"},{"internalType":"uint256","name":"cred_amount","type":"uint256"},{"internalType":"uint256","name":"get_credit_profile_id","type":"uint256"}],"name":"estimateCollateralForCredit","outputs":[{"internalType":"uint256","name":"est_collat","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"dep_id","type":"uint32"},{"internalType":"uint256","name":"dep_amount","type":"uint256"},{"internalType":"uint256","name":"get_credit_profile_id","type":"uint256"}],"name":"estimateCreditForCollateral","outputs":[{"internalType":"uint256","name":"est_usd","type":"uint256"},{"internalType":"uint256","name":"est_asset","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"collateral_profile_id","type":"uint32"},{"internalType":"uint32","name":"get_credit_profile_id","type":"uint32"}],"name":"getAdjCoeffByPair","outputs":[{"internalType":"uint256","name":"adj_coeff","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"}],"name":"getAssetUsage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDepositContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint32","name":"dep_id","type":"uint32"},{"internalType":"uint256","name":"tokens_number","type":"uint256"}],"name":"getDepositNFTs","outputs":[{"internalType":"uint256[]","name":"token_ids_ret","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"}],"name":"getFixedAddPecentByProfileId","outputs":[{"internalType":"uint256","name":"add_percent","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"}],"name":"getLiquidationLimitByProfileId","outputs":[{"internalType":"uint256","name":"limit_percent","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVotesCalcContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"collateral_profile_id","type":"uint32"},{"internalType":"uint32","name":"get_credit_profile_id","type":"uint32"}],"name":"getZeroFeeByPair","outputs":[{"internalType":"bool","name":"is_free","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liqlev_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewtoken_profile_id","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"collateral_profile_id","type":"uint32"},{"internalType":"uint32","name":"get_credit_profile_id","type":"uint32"},{"internalType":"uint256","name":"adj_coeff","type":"uint256"}],"name":"setAdjCoeffByPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_deposit_contract","type":"address"}],"name":"setDepositContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"},{"internalType":"uint256","name":"add_percent","type":"uint256"}],"name":"setFixedAddPecentByProfileId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"},{"internalType":"uint256","name":"limit_percent","type":"uint256"}],"name":"setLiquidationLimitByProfileId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"new_rewtoken_profile_id","type":"uint32"}],"name":"setRewardTokenProfileId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_votes_calc_contract","type":"address"}],"name":"setVotesCalcContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"collateral_profile_id","type":"uint32"},{"internalType":"uint32","name":"get_credit_profile_id","type":"uint32"},{"internalType":"bool","name":"is_free","type":"bool"}],"name":"setZeroFeeByPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prev_contract_address","type":"address"}],"name":"setupFromData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint32","name":"dep_id","type":"uint32"}],"name":"viewCustomerDepositByIndex","outputs":[{"internalType":"uint32","name":"deposit_profile_id_r","type":"uint32"},{"internalType":"uint256","name":"deposit_amount_r","type":"uint256"},{"internalType":"uint256","name":"deposit_date_r","type":"uint256"},{"internalType":"uint256","name":"acc_reward_r","type":"uint256"},{"internalType":"uint256","name":"nft_value_r","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votes_calc_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

const credit_profiles_register_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"id","type":"uint32"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint8","name":"_type","type":"uint8"},{"internalType":"address","name":"_token_address","type":"address"},{"internalType":"uint256","name":"valuation_percent","type":"uint256"},{"internalType":"uint256","name":"init_apy","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"}],"name":"addCreditProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"creditProfiles","outputs":[{"internalType":"uint32","name":"id","type":"uint32"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint8","name":"_type","type":"uint8"},{"internalType":"address","name":"_token_address","type":"address"},{"internalType":"uint256","name":"valuation_percent","type":"uint256"},{"internalType":"uint256","name":"init_apy","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"creditProfilesLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getCreditProfileById","outputs":[{"internalType":"uint32","name":"","type":"uint32"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"id","type":"uint32"}],"name":"removeCreditProfileAtId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"id","type":"uint32"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint8","name":"_type","type":"uint8"},{"internalType":"address","name":"_token_address","type":"address"},{"internalType":"uint256","name":"valuation_percent","type":"uint256"},{"internalType":"uint256","name":"init_apy","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"}],"name":"replaceCreditProfileAtId","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"i","type":"uint32"},{"internalType":"uint32","name":"id","type":"uint32"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint8","name":"_type","type":"uint8"},{"internalType":"address","name":"_token_address","type":"address"},{"internalType":"uint256","name":"valuation_percent","type":"uint256"},{"internalType":"uint256","name":"init_apy","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"}],"name":"replaceCreditProfileAtIndex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevContractAddress","type":"address"}],"name":"setupFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const credit_contract_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"cust_wallet","type":"address"},{"indexed":false,"internalType":"uint32","name":"cred_id","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint32","name":"profile_id","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"CreditDecreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"cust_wallet","type":"address"},{"indexed":false,"internalType":"uint32","name":"dep_collateral_id","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"cred_amount","type":"uint256"},{"indexed":false,"internalType":"uint32","name":"cred_profile_id","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"CreditGot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"cust_wallet","type":"address"},{"indexed":false,"internalType":"uint32","name":"cred_id","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint32","name":"profile_id","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"FeeZeroed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_manager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_own_address","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"}],"name":"amountsPerCollaterals","outputs":[{"internalType":"uint32[]","name":"","type":"uint32[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"credit_profile_id","type":"uint32"},{"internalType":"uint256","name":"collateral_profile_id","type":"uint256"}],"name":"calcFixedApy","outputs":[{"internalType":"uint256","name":"fixed_apy","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cred_profiles_register","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"cred_id","type":"uint32"}],"name":"creditFee","outputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"}],"name":"creditsStat","outputs":[{"internalType":"uint256","name":"tot_am","type":"uint256"},{"internalType":"uint256","name":"tot_f","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"}],"name":"creditsTotAmount","outputs":[{"internalType":"uint256","name":"tot_am","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"cred_id","type":"uint32"}],"name":"currentCredit","outputs":[{"internalType":"uint256","name":"cred_body","type":"uint256"},{"internalType":"uint256","name":"cred_fee","type":"uint256"},{"internalType":"uint32","name":"cust_index","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"}],"name":"dataPerCredits","outputs":[{"internalType":"uint32[]","name":"","type":"uint32[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint32[]","name":"","type":"uint32[]"},{"internalType":"uint32[]","name":"","type":"uint32[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"clt_id","type":"uint32"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"decreaseCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"cred_id","type":"uint32"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"decreaseCredit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"dep_profiles_register","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"_new_number","type":"uint32"}],"name":"directEditCredNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCredProfilesRegister","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"dep_id","type":"uint32"},{"internalType":"uint256","name":"cred_amount","type":"uint256"},{"internalType":"uint32","name":"get_credit_profile_id","type":"uint32"},{"internalType":"bool","name":"whole","type":"bool"},{"internalType":"bool","name":"is_fixed_apy","type":"bool"}],"name":"getCredit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"}],"name":"getCustomersCollateralsItem","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCustomersCollateralsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"}],"name":"getCustomersCreditsItem","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCustomersCreditsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"dep_id","type":"uint32"}],"name":"getCustomersDepositAmount","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"tokens_number_ret","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDepositContract","outputs":[{"internalType":"address","name":"dep_contract","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liq_lev_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"cred_id","type":"uint32"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"returnCredit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"cred_id","type":"uint32"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"returnFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"new_cred_profiles_register","type":"address"}],"name":"setCredProfilesRegister","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_deposit_contract","type":"address"}],"name":"setDepositContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_manager","type":"address"}],"name":"setManagerRight","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevContractAddress","type":"address"}],"name":"setupFromConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevContractAddress","type":"address"}],"name":"setupFromData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"cred_id","type":"uint32"},{"internalType":"uint256","name":"apy_value","type":"uint256"}],"name":"startCreditLeverage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"cred_id","type":"uint32"},{"internalType":"bool","name":"prev_is_fixed_apy","type":"bool"},{"internalType":"uint256","name":"prev_apy_value","type":"uint256"}],"name":"stopCreditLeverage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usage_calc_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"cred_id","type":"uint32"}],"name":"viewCreditAmount","outputs":[{"internalType":"uint256","name":"credit_amount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint256","name":"dep_id","type":"uint256"}],"name":"viewCustomerCollateral","outputs":[{"internalType":"uint32","name":"deposit_profile_id","type":"uint32"},{"internalType":"uint256","name":"index","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"dep_id","type":"uint32"}],"name":"viewCustomerCollateralByIndex","outputs":[{"internalType":"uint32","name":"deposit_profile_id","type":"uint32"},{"internalType":"uint256","name":"deposit_amount","type":"uint256"},{"internalType":"uint256","name":"tokens_number","type":"uint256"},{"internalType":"uint256","name":"deposit_date","type":"uint256"},{"internalType":"uint256","name":"acc_reward","type":"uint256"},{"internalType":"uint256","name":"nft_value","type":"uint256"},{"internalType":"bool","name":"imply_lock","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"dep_id","type":"uint32"},{"internalType":"uint256","name":"token_id_num","type":"uint256"}],"name":"viewCustomerCollateralTokenByIndex","outputs":[{"internalType":"uint256","name":"token_id","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint256","name":"cred_id","type":"uint256"}],"name":"viewCustomerCredit","outputs":[{"internalType":"uint32","name":"credit_profile_id","type":"uint32"},{"internalType":"uint32","name":"index","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"cred_id","type":"uint32"}],"name":"viewCustomerCreditByIndex","outputs":[{"internalType":"uint32","name":"profile_id","type":"uint32"},{"internalType":"uint256","name":"collateral_profile_id","type":"uint256"},{"internalType":"uint32","name":"collateral_id","type":"uint32"},{"internalType":"uint256","name":"credit_amount","type":"uint256"},{"internalType":"uint256","name":"credit_date","type":"uint256"},{"internalType":"uint256","name":"acc_fee","type":"uint256"},{"internalType":"uint32","name":"linked_dep_id","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"cred_id","type":"uint32"}],"name":"viewCustomerCreditExtraDataByIndex","outputs":[{"internalType":"bool","name":"is_fixed_apy","type":"bool"},{"internalType":"uint256","name":"fixed_apy","type":"uint256"}],"stateMutability":"view","type":"function"}];

const liqlev_contract_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"cust_wallet","type":"address"},{"indexed":false,"internalType":"uint32","name":"lev_dep_id","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"cred_id","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"lev_profile_id","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"lev_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"LeverageFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"cust_wallet","type":"address"},{"indexed":false,"internalType":"uint32","name":"cred_id","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"lev_dep_id","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"lev_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"LeverageUnFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NOT_CURRENT_OWNER","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_manager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"cust_index","type":"uint32"},{"internalType":"uint32","name":"credit_index","type":"uint32"},{"internalType":"address","name":"cust_wallet","type":"address"}],"name":"analyzeLiquidation","outputs":[{"internalType":"bool","name":"action_needed","type":"bool"},{"internalType":"uint256","name":"coll_am_liq","type":"uint256"},{"internalType":"uint256","name":"credit_am_liq","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"analyzeLiquidationAll","outputs":[{"internalType":"uint32","name":"bad_credits_cnt","type":"uint32"},{"internalType":"bool[]","name":"customer_is_bad","type":"bool[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"cust_index","type":"uint32"},{"internalType":"uint32","name":"credit_index","type":"uint32"},{"internalType":"address","name":"cust_wallet","type":"address"}],"name":"analyzeLiquidationForCredit","outputs":[{"internalType":"bool","name":"action_needed","type":"bool"},{"internalType":"uint256","name":"r_coll_am_liq","type":"uint256"},{"internalType":"uint256","name":"r_credit_am_liq","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"cust_index","type":"uint32"}],"name":"analyzeLiquidationForCustomer","outputs":[{"internalType":"uint32","name":"r_bad_credits_count","type":"uint32"},{"internalType":"uint32[]","name":"r_bad_credits_ids_for_customer","type":"uint32[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"cred_id","type":"uint32"}],"name":"calcVarApyByCredId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cred_profiles_register","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"credit_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dep_profiles_register","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"dep_id","type":"uint32"},{"internalType":"uint32","name":"cred_id","type":"uint32"},{"internalType":"uint8","name":"ratio","type":"uint8"}],"name":"freezeLeverageForCredit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"}],"name":"getCustomersLeveragesItem","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCustomersLeveragesLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDepositContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"cust_index","type":"uint32"},{"internalType":"uint32","name":"credit_index","type":"uint32"},{"internalType":"uint256","name":"coll_am_liq","type":"uint256"},{"internalType":"uint256","name":"credit_am_liq","type":"uint256"}],"name":"liquidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"processLiquidationAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"cust_index","type":"uint32"},{"internalType":"uint32","name":"credit_index","type":"uint32"},{"internalType":"address","name":"cust_wallet","type":"address"}],"name":"processLiquidationForCredit","outputs":[{"internalType":"bool","name":"action_needed","type":"bool"},{"internalType":"uint256","name":"r_coll_am_liq","type":"uint256"},{"internalType":"uint256","name":"r_credit_am_liq","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"cust_index","type":"uint32"}],"name":"processLiquidationForCustomer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_deposit_contract","type":"address"}],"name":"setDepositContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"new_manager","type":"address"}],"name":"setManagerRight","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevContractAddress","type":"address"}],"name":"setupFromConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevContractAddress","type":"address"}],"name":"setupFromData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint32","name":"cred_id","type":"uint32"}],"name":"unfreezeLeverageForCredit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usage_calc_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint256","name":"dep_id","type":"uint256"}],"name":"viewCustomerLeverage","outputs":[{"internalType":"uint32","name":"deposit_profile_id","type":"uint32"},{"internalType":"uint256","name":"index","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"cust_wallet","type":"address"},{"internalType":"uint256","name":"cred_id","type":"uint256"}],"name":"viewCustomerLeverageByCredId","outputs":[{"internalType":"uint32","name":"lev_dep_id","type":"uint32"},{"internalType":"uint256","name":"cust_index","type":"uint256"},{"internalType":"uint256","name":"lev_index","type":"uint256"},{"internalType":"uint32","name":"deposit_profile_id","type":"uint32"},{"internalType":"uint256","name":"lev_amount","type":"uint256"},{"internalType":"uint256","name":"lev_date","type":"uint256"},{"internalType":"uint8","name":"ratio","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"dep_id","type":"uint32"}],"name":"viewCustomerLeverageByIndex1","outputs":[{"internalType":"uint32","name":"deposit_profile_id","type":"uint32"},{"internalType":"uint256","name":"deposit_amount","type":"uint256"},{"internalType":"uint256","name":"deposit_date","type":"uint256"},{"internalType":"uint256","name":"acc_reward","type":"uint256"},{"internalType":"uint32","name":"cred_id","type":"uint32"},{"internalType":"uint32","name":"ldep_id","type":"uint32"},{"internalType":"uint8","name":"ratio","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"index","type":"uint32"},{"internalType":"uint32","name":"dep_id","type":"uint32"}],"name":"viewCustomerLeverageByIndex2","outputs":[{"internalType":"bool","name":"credit_is_fixed_apy","type":"bool"},{"internalType":"uint256","name":"credit_fixed_apy","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"votes_calc_contract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

window.cyclops_nft_contract_address = '0x6ab7E5B00a6e4A7E56160FAc1BCcAcEad1614554'; //kovan




const apy_scale = 100000;
const CACHE_TIME = 30000; //ms, i.e 30 sec.


const chains = new Array();
	  chains['0x1'] = "mainnet";
	  chains['1'] = "mainnet"; //for opera
	  chains['0x3'] = "ropsten";
	  chains['0x4'] = "rinkeby";
	  chains['0x5'] = "goerli";
	  chains["0x2a"] = "kovan";
	  chains["0x61"] = 'bsctestnet'
	  chains["0x38"] = 'bsc';

const 	dep_types = new Array();
		dep_types["ERC20"] = 1;
		dep_types["ERC721"] = 2;
		dep_types["Uniswap pair"] = 3;
		dep_types["Ether"] = 4;

const 	rev_dep_types = new Array();
		rev_dep_types[1] = "ERC20";
		rev_dep_types[2] = "ERC721";
		rev_dep_types[3] = "Uniswap pair";
		rev_dep_types[4] = "Ether";

const crypto_icons = new Array();
	  crypto_icons['bnb'] = '<span class="iconify" data-icon="cryptocurrency:bnb" data-inline="false"></span>';
	  crypto_icons['ST1'] = '<span class="usdt-icon"></span>';
	  crypto_icons['ST2'] = '<span class="iconify" data-icon="ps:token" data-inline="false"></span>';
	  crypto_icons['ST3'] = '<span class="iconify" data-icon="ps:token" data-inline="false"></span>';
	  crypto_icons['ST4'] = '<span class="iconify" data-icon="ps:token" data-inline="false"></span>';
	  crypto_icons['nft'] = '<span class="iconify" data-icon="ps:token" data-inline="false"></span>';
	  crypto_icons['CYTR'] = '<span class="etna-icon"></span>';
	  crypto_icons['BNB-ST1-1W'] = '<span class="iconify" data-icon="noto:pancakes" data-inline="false"></span>';
	  crypto_icons['BNB-ST1-2W'] = '<span class="iconify" data-icon="noto:pancakes" data-inline="false"></span>';
	  crypto_icons['BNB-ST1-1M'] = '<span class="iconify" data-icon="noto:pancakes" data-inline="false"></span>';
	  crypto_icons['BNB-ST2-1W'] = '<span class="iconify" data-icon="noto:pancakes" data-inline="false"></span>';
	  crypto_icons['BNB-ST2-2W'] = '<span class="iconify" data-icon="noto:pancakes" data-inline="false"></span>';
	  crypto_icons['BNB-ST2-1M'] = '<span class="iconify" data-icon="noto:pancakes" data-inline="false"></span>';


const period_name_from_code = new Array();
	  period_name_from_code['1W'] = "1 week";
	  period_name_from_code['2W'] = "2 weeks";
	  period_name_from_code['1M'] = "1 month";

const period_len_from_code = new Array();
	  period_len_from_code['1W'] = 7;
	  period_len_from_code['2W'] = 14;
	  period_len_from_code['1M'] = 30;

const 	to_bool = new Array();
		to_bool["Yes"] = true;
		to_bool["No"] = false;

const 	rev_to_bool = new Array();
		rev_to_bool[true] = "Yes";
		rev_to_bool[false] = "No";







const infura_endpoint = new Array();
	  infura_endpoint['0x1'] = "https://mainnet.infura.io/v3/e399e7df7f9149d08b2e91939e056007";
	  infura_endpoint['1'] = "https://mainnet.infura.io/v3/e399e7df7f9149d08b2e91939e056007"; //for opera
	  infura_endpoint["0x2a"] = "https://kovan.infura.io/v3/e399e7df7f9149d08b2e91939e056007";
	  infura_endpoint["0x61"] = "https://data-seed-prebsc-1-s1.binance.org:8545";


const zero_address = '0x0000000000000000000000000000000000000000';
const ADJ_CONSTANT = 1000000000000000000; //10^18
//window.chainId = "0x1"; //prod
window.chainId = "0x61"; //testnet bsc

const MAX_ETH_AMOUNT = 20;
const MAX_TOKENS_AMOUNT = 200;

// *** for price chart
const MAX_PRICE_DATA_LEN = 90;
const INIT_SELL_PRICE = 0.1; //ether
const INIT_BUYOUT_PRICE = 0.08; //ether
const INIT_PRICE_DATE = Date.parse('2021-01-01');
const FORECAST_TOKENS_PER_DAY = 5;
const PRICE_CHANGE = 1.0015;

const ERC20_TOKEN = 1;
const ERC721_TOKEN = 2;
const UNISWAP_PAIR = 3;
const NATIVE_ETHEREUM = 4; 
const BAD_TOKEN = 99;
    
const BAD_DEPOSIT_PROFILE_ID = 9999999;
const BAD_DEPOSIT_ID = 9999999;
const NONE_FAMER_ID = 9999999;
window.famer = NONE_FAMER_ID;

// *** wallet connect variables

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;


const providerOptions = {
		walletconnect: {
		      package: WalletConnectProvider,
		      options: {
		        rpc: {
   				 97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  					}
		     }
		 }
};


const walletButton = document.getElementById("enableEthereumButton");
const forwardedOrigin = "https://debank.etna.network";


const isMetaMaskInstalled = () => {
	if (typeof window.ethereum != undefined){
		return Boolean(window.ethereum && window.ethereum.isMetaMask);
	}
}

let contractsObject = {
	deposit_contract: {
		address: '',
		contract: {},
		setAddress: function(addr){
			this.address = addr;
		}
	}


}

let userObject  = {
	loaded :false,
	self: this,
	account:'',

	deposit_profiles:{},
	deposit_profiles_liqpairs:{},
	credit_profiles:{},
	liq_pairs:{},
	liq_terms:{},

	deposits: {	
		icon_column : new Array(),
		assets_column: new Array(),
		getIconAssetsCols_last_call: 0,
  		getIconAssetsCols:  async function(flag = false){
  			let current_timestamp = Date.now();
  			if (current_timestamp > this.getIconAssetsCols_last_call+CACHE_TIME || flag){
  				this.getIconAssetsCols_last_call = current_timestamp;
  				this.icon_column.length =0;
  				this.assets_column.length = 0;
  				let profiles = userObject.deposit_profiles;
			    	
				for (let i = 0; i < profiles.length; i++){
					this.icon_column.push('<td>'+crypto_icons[profiles[i]['p_name']]+'</td>');
					this.assets_column.push('<th scope="row">'+profiles[i]['p_name']+'</th>');
				}	
						
			}	
  			
  			return [this.icon_column, this.assets_column];	
  		},



		am_arr :new Array(),
		getAmArr_last_call: 0,
		getAmArr: async function() {  
  			let current_timestamp = Date.now();
  			if (current_timestamp > (this.getAmArr_last_call+CACHE_TIME)){
  				this.getAmArr_last_call = current_timestamp;
  				console.log('getAmArr call: ', current_timestamp);
  				//console.log('current_timestamp', current_timestamp, 'this.getAmArr_last_call+CACHE_TIME', this.getAmArr_last_call+CACHE_TIME);
  				this.am_arr = await window.staking_smartcontract.methods.amountsPerDeposits(userObject.account).call({from: userObject.account});
  				
  				
  			}
  			return this.am_arr;
  		}, 
  		rew_arr: new Array(),	
  		getRewArr_last_call: 0,
  		getRewArr: async function() {  
  			let current_timestamp = Date.now();
  			if (current_timestamp > (this.getRewArr_last_call+CACHE_TIME)){
  				this.getRewArr_last_call = current_timestamp;
  				this.rew_arr = await window.staking_smartcontract.methods.rewardsPerDeposits(userObject.account).call({from: userObject.account});		

  			}
  			return this.rew_arr;
  		},   				
  		
  		apy_column: new Array(),
  		getApyCol_last_call: 0,
		getApyCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > (this.getApyCol_last_call+CACHE_TIME) || flag){
  				this.getApyCol_last_call = current_timestamp;

  				this.apy_column.length =0;
  				let profiles = userObject.deposit_profiles;

  				for (let i = 0; i < profiles.length; i++){
					
					let apy = await getAPY(profiles[i]['p_id']);
					let apy_adj = (apy / apy_scale)*100;
					

					this.apy_column.push('<th scope="row">'+((parseFloat(apy_adj)).toFixed(2)).toString()+'</th>');
				}
			       

  				

  			}
  			return this.apy_column;

		},

		in_wallet_column: new Array(),
		getInWalletCol_last_call: 0,
		getInWalletCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getInWalletCol_last_call+CACHE_TIME || flag){
  				this.getInWalletCol_last_call = current_timestamp;

  				this.in_wallet_column.length =0;
  				let profiles = userObject.deposit_profiles;

  				
  				for (let i = 0; i < profiles.length; i++){
					let txt='';
					if (parseInt(profiles[i]['p_dep_type']) == ERC721_TOKEN){
			            	      	
			            	 let token_count = await  window.cyclops_nft_smartcontract_reader.methods.balanceOf(userObject.account).call({from:userObject.account});  
			            	
			            	 txt = '<td>'+token_count+'</td>';
			            	
			            	 
			            	 
		            } else if (parseInt(profiles[i]['p_dep_type'])  == ERC20_TOKEN || parseInt(profiles[i]['p_dep_type']) == UNISWAP_PAIR){ 
		                 let erc20contract = await new window.web3js_reader.eth.Contract(erc20TokenContractAbi, profiles[i]['p_tok_addr']); 
		                 let erc20_count = await erc20contract.methods.balanceOf(userObject.account).call({from:userObject.account});
		                 //let adj_count = floorDecimals( window.web3js_reader.utils.fromWei(erc20_count, 'ether'), 4);	            
						 let adj_count_str =  toTokens(erc20_count,4);//((parseFloat(adj_count)).toFixed(4)).toString(); 
		                 let token_name = await erc20contract.methods.name().call({from:userObject.account});
		                 txt = '<td>'+adj_count_str+'</td>';
		                
		                 //html += '<span class="small-text-block">'+token_name+': '+adj_count_str+'</span>';  
		                 
		            } else if (parseInt(profiles[i]['p_dep_type']) == NATIVE_ETHEREUM){
		            	let wb = await window.web3js_reader.eth.getBalance(userObject.account);
		    			//let eth_balance = window.web3js_reader.utils.fromWei(wb, 'ether');
		    			let adj_eth_balance =  toTokens(wb,4);//((parseFloat(eth_balance)).toFixed(4)).toString(); 
		            	txt = '<td>'+adj_eth_balance+'</td>';
		            	
		            }
		            if (!txt) txt =  '<td>-</td>'; 
					this.in_wallet_column.push(txt);
				}
			       

  			}
  			return this.in_wallet_column;

		},

		dep_column: new Array(),
		getDepCol_last_call :0,
		getDepCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getDepCol_last_call+CACHE_TIME || flag){
  				this.getDepCol_last_call = current_timestamp;

  				this.dep_column.length =0;
  				let profiles = userObject.deposit_profiles;
  				let am_arr = this.am_arr;

  				for (let j = 0; j < profiles.length; j++){
					let txt ='';
					for (let i=0; i < am_arr[0].length; i++){
		            	if (am_arr[0][i] == profiles[j]['p_id']){
		            		//found
		            		if (parseInt(profiles[j]['p_dep_type']) == ERC721_TOKEN){//amount
		            			txt = '<td>'+am_arr[1][i]+'</td>';
		            		} else {
		            			//let am = window.web3js_reader.utils.fromWei(am_arr[1][i], 'ether');
	        					let adj_am =  toTokens(am_arr[1][i],4);//((parseFloat(am)).toFixed(4)).toString(); 
		            			txt = '<td>'+adj_am+'</td>';	
		            		}
		            		break;
		            	}
			        }
			        if (!txt) txt =  '<td>-</td>'; 
			        this.dep_column.push(txt);
				}
			       

  			}
  			return this.dep_column;

		},


		usd_val_column: new Array(),
		usd_val_only_col: new Array(),
		getUsdValCol_last_call: 0,
		getUsdValCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getUsdValCol_last_call+CACHE_TIME || flag){
  				this.getUsdValCol_last_call = current_timestamp;

  				this.usd_val_column.length =0;
  				this.usd_val_only_col.length =0;

  				let profiles = userObject.deposit_profiles;
  				let am_arr = this.am_arr;

  				for (let j = 0; j < profiles.length; j++){
					let txt ='';
					for (let i=0; i < am_arr[0].length; i++){
			            	if (am_arr[0][i] == profiles[j]['p_id']){
			            		//found
			            		let am =  await calcUSDValueOfDeposit(am_arr[1][i],i);
			            		this.usd_val_only_col.push({val: am, ori_index: j}); 
			            		txt = '<td>'+am+'</td>';	
			            		
			            		break;
			            	}
			        }
			        if (!txt){
			        	txt =  '<td>-</td>'; 
			        	this.usd_val_only_col.push({val: 0, ori_index: j}); 
			        } 

			        this.usd_val_column.push(txt);

				}

  			}
  			return [this.usd_val_column,this.usd_val_only_col];

		},

		duration_col: new Array(),
		getDurationCol_last_call: 0,
		getDurationCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getDurationCol_last_call+CACHE_TIME || flag){
  				this.getDurationCol_last_call = current_timestamp;

  				this.duration_col.length =0;
  				let profiles = userObject.deposit_profiles;
  				let am_arr = this.am_arr;

  				for (let j = 0; j < profiles.length; j++){
					let txt = '';
					for (let i=0; i < am_arr[0].length; i++){
			            	if (am_arr[0][i] == profiles[j]['p_id']){
			            		if (am_arr[1][i] == 0){
			            			txt = '<td class="withdraw_rew_to_hide">-</td>';	
			            		} else {
			            			let days = await window.staking_smartcontract.methods.depositDays(userObject.account, i).call({from:userObject.account});//duration
			            			txt = '<td class="withdraw_rew_to_hide">'+days.toString()+'</td>';	
			            		}
			            		
			            		break;
			            	}
			        }
			        if (!txt) txt =  '<td class="withdraw_rew_to_hide">-</td>'; 
			        this.duration_col.push(txt);
				}
					       

  				

  			}
  			return this.duration_col;

		},

		extractable_dep_col: new Array(),
		getExtractableDepCol_last_call: 0,
		getExtractableDepCol:  async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getExtractableDepCol_last_call+CACHE_TIME || flag){
  				this.getExtractableDepCol_last_call = current_timestamp;

  				this.extractable_dep_col.length =0;
  				let profiles = userObject.deposit_profiles;
  				let am_arr = this.am_arr;

  				for (let j = 0; j < profiles.length; j++){
					let txt ='';
					for (let i=0; i < am_arr[0].length; i++){
			            	if (am_arr[0][i] == profiles[j]['p_id']){
			            		//found
			            		if (parseInt(profiles[j]['p_dep_type']) == ERC721_TOKEN){//amount
			            			txt = '<td class="withdraw_rew_to_hide">'+am_arr[2][i]+'</td>';
			            		} else {
			            			//let am = window.web3js_reader.utils.fromWei(am_arr[2][i], 'ether');
		        					let adj_am = toTokens(am_arr[2][i],4) ;//((parseFloat(am)).toFixed(4)).toString(); 
			            			txt = '<td class="withdraw_rew_to_hide">'+adj_am+'</td>';	
			            		}
			            		break;
			            	}
			        }
			        if (!txt) txt =  '<td class="withdraw_rew_to_hide">-</td>'; 
			        this.extractable_dep_col.push(txt);
				}
				

  			}
  			return this.extractable_dep_col;

		},

		withdraw_dep_col: new Array(),
		getWithdrawDepCol_last_call: 0,
		getWithdrawDepCol:  async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getWithdrawDepCol_last_call+CACHE_TIME || flag){
  				this.getWithdrawDepCol_last_call = current_timestamp;

  				this.withdraw_dep_col.length =0;
  				let profiles = userObject.deposit_profiles;
  				let am_arr = this.am_arr;

  				for (let j = 0; j < profiles.length; j++){
					let txt = '';
					for (let i=0; i < am_arr[0].length; i++){ //i == deposit id
			            	if (am_arr[0][i] == profiles[j]['p_id'] && am_arr[2][i] >0){
			            		let lbl='';
			            		if (parseInt(profiles[j]['p_dep_type']) == ERC721_TOKEN) lbl = '<span class="small-text">&nbspNFTs</span>';
			            		txt =  '<td class="withdraw_rew_to_hide" onclick="withdraw_deposit('+i.toString()+')"><span class="iconify" data-icon="emojione-v1:money-bag" data-inline="false"></span>'+lbl+'</td>';
			            		break;
			            	}
			        }
			        if (!txt) txt =  '<td class="withdraw_rew_to_hide">-</td>'; 
			        this.withdraw_dep_col.push(txt);
				}

  				

  			}
  			return this.withdraw_dep_col;

		},


		withdraw_dep_inputs_col: new Array(),
		getWithdrawDepInputsCol_last_call: 0,
		getWithdrawDepInputsCol:  async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getWithdrawDepInputsCol_last_call+CACHE_TIME || flag){
  				this.getWithdrawDepInputsCol_last_call = current_timestamp;

  				this.withdraw_dep_inputs_col.length =0;
  				let profiles = userObject.deposit_profiles;
  				let am_arr = this.am_arr;

				for (let j = 0; j < profiles.length; j++){
							let txt = '';
							for (let i=0; i < am_arr[0].length; i++){ //i == deposit id
					            	if (am_arr[0][i] == profiles[j]['p_id']){
					            		
					            		if (parseInt(profiles[j]['p_dep_type']) == ERC721_TOKEN){
					            			txt = '<td class="withdraw_params" style="display:none">';
					            			txt += '<div style="display:block; margin-top: 1vh;"></div>'
					            			txt += '<button id="withraw_dep_confirm'+i.toString()+'" class="transparent_button withdraw_dep_input" style="display:none;width: 10vw" onclick="withdraw_deposit_confirm('+i.toString()+')">Confirm</button>';
					            			txt += '</td>'; 
					            		} else {
					            			//let am = window.web3js_reader.utils.fromWei(am_arr[2][i], 'ether');
				        					let adj_am =  toTokens(am_arr[2][i],4);//((parseFloat(am)).toFixed(4)).toString(); 
				        					//let rew_am = window.web3js_reader.utils.fromWei(rew_arr[1][i], 'ether');	            
				    				 		//let adj_rew_am =  ((parseFloat(rew_am)).toFixed(4)).toString(); 
					            			txt = '<td class="withdraw_params" style="display:none">';
					            			txt += '<button id="withraw_dep_all'+i.toString()+'" class="transparent_button transparent_button_pressed withdraw_dep_input" style="display:none;width: 5vw" onclick="withdraw_deposit_all_btn('+i.toString()+')">All</button>';
					            			txt += '<button id="withraw_dep_part'+i.toString()+'" class="transparent_button withdraw_dep_input" style="display:none;width: 5vw" onclick="withdraw_deposit_part_btn('+i.toString()+')">Part</button>';
					            			txt += '<input class="withdraw_dep_input" id="withraw_dep_input'+i.toString()+'" type="number" min="0.1" step="0.1" max="'+adj_am+'" class="form-control" aria-label="" ';
					            			txt += ' value="'+adj_am+'"';
					            			txt +=' style="display:none; color: white; background-color: black !important; border-color: white !important; width: 8vw;" >';
					            			txt += '<div style="display:block; margin-top: 1vh;"></div>';
					            			//txt += '<span id="withraw_dep_rew'+i.toString()+'" class="withdraw_dep_input">reward to be extracted: '+adj_rew_am+'</span>';
					            			txt += '<div style="display:block; margin-top: 1vh;"></div>';
					            			txt += '<button id="withraw_dep_confirm'+i.toString()+'" class="transparent_button withdraw_dep_input" style="display:none;width: 10vw" onclick="withdraw_deposit_confirm('+i.toString()+')">Confirm</button>';
					            			txt += '</td>'; 
					           
					            		}

					            	
					            		break;
					            	}
					        }
					        if (!txt) txt =  '<td class="withdraw_params" style="display:none">-</td>'; 
					        this.withdraw_dep_inputs_col.push(txt);
						}

  				

  			}
  			return this.withdraw_dep_inputs_col;

		},

		reward_col: new Array(),
		getRewardCol_last_call: 0,
		getRewardCol:  async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getRewardCol_last_call+CACHE_TIME || flag){
  				this.getRewardCol_last_call = current_timestamp;

  				this.reward_col.length =0;
  				let profiles = userObject.deposit_profiles;
  				let rew_arr = this.rew_arr;

  				for (let j = 0; j < profiles.length; j++){
					let txt = '';
					for (let i=0; i < rew_arr[0].length; i++){
							if (rew_arr[0][i] == profiles[j]['p_id']){
			            		//found
			            		//let adj = window.web3js_reader.utils.fromWei(rew_arr[1][i], 'ether');	            
		    				 	let adj_str =  toTokens(rew_arr[1][i],4);//((parseFloat(adj)).toFixed(4)).toString(); 
			            		txt = '<td class="withdraw_params_to_hide">'+adj_str+'</td>';
			            		break;
			            	}	
			
			        }
			        if (!txt) txt =  '<td class="withdraw_params_to_hide">-</td>'; 
			        this.reward_col.push(txt);
				}
		  				

  			}
  			return this.reward_col;

		},

		extractable_reward_col: new Array(),
		getExtractableRewardCol_last_call: 0,
		getExtractableRewardCol:  async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getExtractableRewardCol_last_call+CACHE_TIME || flag){
  				this.getExtractableRewardCol_last_call = current_timestamp;

  				this.extractable_reward_col.length =0;
  				let profiles = userObject.deposit_profiles;
  				let rew_arr = this.rew_arr;

  				for (let j = 0; j < profiles.length; j++){
					let txt = '';
					for (let i=0; i < rew_arr[0].length; i++){
							if (rew_arr[0][i] == profiles[j]['p_id']){
			            		//found
			            		//let adj = window.web3js_reader.utils.fromWei(rew_arr[2][i], 'ether');	            
		    				 	let adj_str =  toTokens(rew_arr[2][i],4);//((parseFloat(adj)).toFixed(4)).toString(); 
			            		txt = '<td class="withdraw_params_to_hide">'+adj_str+'</td>';
			            		break;
			            	}	
			
			        }
			        if (!txt) txt =  '<td class="withdraw_params_to_hide">-</td>'; 
			        this.extractable_reward_col.push(txt);
				}
		  				

  			}
  			return this.extractable_reward_col;

		},

		withdraw_rew_col: new Array(),
		getWithdrawRewCol_last_call: 0,
		getWithdrawRewCol:  async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getWithdrawRewCol_last_call+CACHE_TIME || flag){
  				this.getWithdrawRewCol_last_call = current_timestamp;

  				this.withdraw_rew_col.length =0;
  				let profiles = userObject.deposit_profiles;
  				let rew_arr = this.rew_arr;

  				for (let j = 0; j < profiles.length; j++){
					let txt = '';
					for (let i=0; i < rew_arr[0].length; i++){
			            	if (rew_arr[0][i] == profiles[j]['p_id'] && rew_arr[2][i] >0){
			            		let lbl='';
			            		if (parseInt(profiles[j]['p_dep_type']) == ERC721_TOKEN) lbl = '<span class="small-text">&nbsp;CYTR</span>';
			            		txt =  '<td class="withdraw_params_to_hide" onclick="withdraw_reward('+i.toString()+')"><span class="iconify" data-icon="emojione-v1:money-bag" data-inline="false"></span>'+lbl+'</td>';
			            		break;
			            	}
			        }
			        if (!txt) txt =  '<td class="withdraw_params_to_hide">-</td>'; 
			        this.withdraw_rew_col.push(txt);
				}
		  				

  			}
  			return this.withdraw_rew_col;

		},

		withdraw_rew_inputs_col: new Array(),
		getWithdrawRewInputsCol_last_call: 0,
		getWithdrawRewInputsCol:  async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getWithdrawRewInputsCol_last_call+CACHE_TIME || flag){
  				this.getWithdrawRewInputsCol_last_call = current_timestamp;

  				this.withdraw_rew_inputs_col.length =0;
  				let profiles = userObject.deposit_profiles;
  				let am_arr = this.am_arr;

  				for (let j = 0; j < profiles.length; j++){
					let txt = '';
					for (let i=0; i < am_arr[0].length; i++){ //i == deposit id
			            	if (am_arr[0][i] == profiles[j]['p_id']){
			            		
			            	
		            			txt = '<td class="withdraw_reward_params" style="display:none">';
		            			txt += '<div style="display:block; margin-top: 1vh;"></div>'
		            			txt += '<button id="withdraw_rew_confirm'+i.toString()+'" class="transparent_button withdraw_rew_input" style="display:none;width: 10vw" onclick="withdraw_reward_confirm('+i.toString()+')">Confirm</button>';
		            			txt += '</td>'; 
		            		

			            	
			            		break;
			            	}
			        }
			        if (!txt) txt =  '<td class="withdraw_reward_params" style="display:none">-</td>'; 
			        this.withdraw_rew_inputs_col.push(txt);
				}
		  				

  			}
  			return this.withdraw_rew_inputs_col;

		},



	},
	credits:{
		cred_arr: new Array(),
		getCredArr_last_call: 0,
  		getCredArr: async function() {  
  			let current_timestamp = Date.now();
  			if (current_timestamp > this.getCredArr_last_call+CACHE_TIME){
  				this.getCredArr_last_call = current_timestamp;
  				this.cred_arr = await window.credit_smartcontract.methods.dataPerCredits(userObject.account).call({from: userObject.account});			
  			}
  			return this.cred_arr;
  		}, 

  		clt_arr: null,
  		getCltArr_last_call: 0,
  		getCltArr: async function() {  
  			let current_timestamp = Date.now();
  			if (current_timestamp > this.getCltArr_last_call+CACHE_TIME){
  				this.getCltArr_last_call = current_timestamp;
  				this.clt_arr = await window.credit_smartcontract.methods.amountsPerCollaterals(userObject.account).call({from: userObject.account});					
  			}
  			return this.clt_arr;
  		}, 
  		lev_arr: new Array(),
  		lev_ratio_arr: new Array(),
  		getLevArr_last_call: 0,
  		getLevArr: async function(flag = false) {  
  			let current_timestamp = Date.now();
  			if (current_timestamp > this.getLevArr_last_call+CACHE_TIME || flag){
  				this.getLevArr_last_call = current_timestamp;
  				this.lev_arr.length =0;
  				this.lev_ratio_arr.length = 0;
  				for (let i = 0; i < this.cred_arr[0].length; i++){
					let res = await window.liqlev_smartcontract.methods.viewCustomerLeverageByCredId(userObject.account,i).call({from: userObject.account});
					this.lev_arr.push(res.lev_amount);
					this.lev_ratio_arr.push(res.ratio);
				}
  				
  			}
  			return [this.lev_arr, this.lev_ratio_arr];
  		}, 

  		icon_column: new Array(),
  		assets_column: new Array(),
  		getIconAssetsCols_last_call: 0,
  		getIconAssetsCols:  async function(flag = false){
  			let current_timestamp = Date.now();
  			if (current_timestamp > this.getIconAssetsCols_last_call+CACHE_TIME || flag){
  				this.getIconAssetsCols_last_call = current_timestamp;
  				this.icon_column.length =0;
  				this.assets_column.length = 0;
  				for (let i = 0; i < this.cred_arr[0].length; i++){
					this.icon_column.push('<td>'+crypto_icons[profileNameByProfileId(this.cred_arr[0][i])]+'</td>');
					this.assets_column.push('<th scope="row">'+profileNameByProfileId(this.cred_arr[0][i])+'</th>');
				}			
  			}
  			return [this.icon_column, this.assets_column];	
  		},

  		apr_column: new Array(),
  		getAPRCol_last_call: 0,
  		getAPRCol: async function(flag = false){
  			let current_timestamp = Date.now();
  			if (current_timestamp > this.getAPRCol_last_call+CACHE_TIME || flag){
  				this.getAPRCol_last_call = current_timestamp;
  				this.apr_column.length =0;
  				let cred_arr = this.cred_arr;
  				let clt_arr = this.clt_arr;
  				for (let i = 0; i < cred_arr[0].length; i++){
					let clt_id = cred_arr[4][i];
		        	let clt_profile_id = clt_arr[0][parseInt(clt_id)];

		        	let cc = await window.credit_smartcontract.methods.viewCustomerCredit(userObject.account,0).call({ from: userObject.account});
					let cc_index = parseInt(cc['index']);
			 		let x = await window.credit_smartcontract.methods.viewCustomerCreditExtraDataByIndex(cc_index,i).call({ from: userObject.account});
					let is_fixed_apy = x.is_fixed_apy;

					let apr;
					let prefix;
					if (!is_fixed_apy){
						apr = await window.usage_calc_smartcontract_reader.methods.calcVarApy(cred_arr[0][i], clt_profile_id).call({ from: userObject.account});
						prefix ='V: ';
					} else {
						apr = x.fixed_apy;
						prefix ='F: ';
					}
					let apr_adj = (apr / apy_scale)*100;
					

					this.apr_column.push('<th scope="row">'+prefix+((parseFloat(apr_adj)).toFixed(2)).toString()+'%</th>');
				}


  				
  			}
  			return this.apr_column;	
  		},
  		
		
  		in_wallet_column: new Array(),
  		getInWalletCol_last_call: 0,
		getInWalletCol: async function(flag = false){
  			let current_timestamp = Date.now();
  			if (current_timestamp > this.getInWalletCol_last_call+CACHE_TIME || flag){
  				this.getInWalletCol_last_call = current_timestamp;
  				this.in_wallet_column.length =0;
  				let cred_arr = this.cred_arr;
  				
  				for (let i = 0; i < cred_arr[0].length; i++){
				let txt='';
					if (depTypeByProfileId(cred_arr[0][i]) == ERC721_TOKEN){
			            	           	
			            	 let token_count = await  window.cyclops_nft_smartcontract_reader.methods.balanceOf(userObject.account).call({from:userObject.account});  
			            	
			            	 txt = '<td class="hide_for_credit_return_panel tab-vert-line-left">'+token_count+'</td>';
			            	
			            	 
			            	 
		            } else if (depTypeByProfileId(cred_arr[0][i])   == ERC20_TOKEN || depTypeByProfileId(cred_arr[0][i])  == UNISWAP_PAIR){ 



		                 let erc20contract = await new window.web3js_reader.eth.Contract(erc20TokenContractAbi, tokenAddressByProfileId(cred_arr[0][i])); 
		                 let erc20_count = await erc20contract.methods.balanceOf(userObject.account).call({from:userObject.account});
		                 //let adj_count = floorDecimals(window.web3js_reader.utils.fromWei(erc20_count, 'ether'),4);	            
						 let adj_count_str =  toTokens(erc20_count,4);//((parseFloat(adj_count)).toFixed(4)).toString(); 
		                 let token_name = await erc20contract.methods.name().call({from:userObject.account});
		                 txt = '<td class="hide_for_credit_return_panel tab-vert-line-left">'+adj_count_str+'</td>';
		                
		                 //html += '<span class="small-text-block">'+token_name+': '+adj_count_str+'</span>';  
		                 
		            } else if (depTypeByProfileId(cred_arr[0][i]) == NATIVE_ETHEREUM){
		            	let wb = await window.web3js_reader.eth.getBalance(userObject.account);
		    			//let eth_balance = window.web3js_reader.utils.fromWei(wb, 'ether');
		    			let adj_eth_balance =  toTokens(wb,4);//((parseFloat(eth_balance)).toFixed(4)).toString(); 
		            	txt = '<td class="hide_for_credit_return_panel tab-vert-line-left">'+adj_eth_balance+'</td>';
		            	
		            }
		            if (!txt) txt =  '<td class="hide_for_credit_return_panel tab-vert-line-left">-</td>'; 
					this.in_wallet_column.push(txt);
				}

  				
  			}
  			return this.in_wallet_column;
  		},		


		dep_column: new Array(),
		getDepCol_last_call: 0,
		getDepCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getDepCol_last_call+CACHE_TIME || flag){
  				this.getDepCol_last_call = current_timestamp;
  				this.dep_column.length =0;
  				let cred_arr = this.cred_arr;
  				let am_arr = userObject.deposits.am_arr;
  				
  				for (let j = 0; j < cred_arr[0].length; j++){
					let txt ='';
					for (let i=0; i < am_arr[0].length; i++){
			            	if (am_arr[0][i] == cred_arr[0][j]){
			            		//found
			            		if (depTypeByProfileId(cred_arr[0][j]) == ERC721_TOKEN){//amount
			            			txt = '<td class="hide_for_credit_return_panel">'+am_arr[1][i]+'</td>';
			            		} else {
			            			//let am = window.web3js_reader.utils.fromWei(am_arr[1][i], 'ether');
		        					let adj_am =  toTokens(am_arr[1][i],4);//((parseFloat(am)).toFixed(4)).toString(); 
			            			txt = '<td class="hide_for_credit_return_panel">'+adj_am+'</td>';	
			            		}
			            		break;
			            	}
			        }
			        if (!txt) txt =  '<td class="hide_for_credit_return_panel">-</td>'; 
			        this.dep_column.push(txt);
				}

  			}
  			return this.dep_column;

		},

		cred_column: new Array(),
		getCredCol_last_call: 0,
		getCredCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getCredCol_last_call+CACHE_TIME || flag){
  				this.getCredCol_last_call = current_timestamp;
  				this.cred_column.length =0;
  				let cred_arr = this.cred_arr;
  				for (let i=0; i < cred_arr[0].length; i++){
					let txt ='';
					
		        	if ( cred_arr[1][i] >0 || cred_arr[2][i] >0){//credit or fee unpaid
		        		//found
		        		if (depTypeByProfileId(cred_arr[0][i]) == ERC721_TOKEN){//amount
		        			txt = '<td>'+cred_arr[1][i]+'</td>';
		        		} else {
		        			//let am = window.web3js_reader.utils.fromWei(cred_arr[1][i], 'ether');
							let adj_am = toTokens(cred_arr[1][i],4) //((parseFloat(am)).toFixed(4)).toString(); 
		        			txt = '<td>'+adj_am+'</td>';	
		        		}
		        		
		        	}
			        
			        if (!txt) txt =  '<td>-</td>'; 
			        this.cred_column.push(txt);
				}
			       

  				

  			}
  			return this.cred_column;

		},


		clt_column: new Array(),
		getCltCol_last_call: 0,
		getCltCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getCltCol_last_call+CACHE_TIME || flag){
  				this.getCltCol_last_call = current_timestamp;

  				this.clt_column.length =0;
  				let cred_arr = this.cred_arr;
  				let clt_arr = this.clt_arr;

  				for (let i=0; i < cred_arr[0].length; i++){
					let txt ='';
					
		        	if (cred_arr[1][i] >0 || cred_arr[2][i] >0 ){ //credit or fee unpaid
		        		//found
		        		if (depTypeByProfileId(cred_arr[0][i]) == ERC721_TOKEN){//amount
		        			txt = '<td class="hide_for_set_leverage_panel">'+cred_arr[4][i]+'</td>';
		        		} else {
		        			let clt_id = cred_arr[4][i];
		        			let clt_profile_id = clt_arr[0][parseInt(clt_id)];
		        			let clt_amount = clt_arr[1][parseInt(clt_id)];
		        			//let am = window.web3js_reader.utils.fromWei(clt_amount, 'ether');
		        			let adj_am =  toTokens(clt_amount,4);//((parseFloat(am)).toFixed(4)).toString(); 
							let tdtxt = profileNameByProfileId(clt_profile_id)+': '+adj_am; 
		        			txt = '<td class="hide_for_set_leverage_panel">'+tdtxt+'</td>';	
		        		}
		        		
		        	}
		    
			        if (!txt) txt =  '<td class="hide_for_set_leverage_panel">-</td>'; 
			        this.clt_column.push(txt);
				}
			       

  				

  			}
  			return this.clt_column;

		},


		usd_val_column: new Array(),
		getUsdValCol_last_call: 0,
		getUsdValCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getUsdValCol_last_call+CACHE_TIME || flag){
  				this.getUsdValCol_last_call = current_timestamp;
  				this.usd_val_column.length =0;
  				let cred_arr = this.cred_arr;
  				

  				for (let i=0; i < cred_arr[0].length; i++){
					let txt ='';
					
		        	if ( cred_arr[1][i] >0){ //credit unpaid
		        		//found
		        		let am =  await calcUSDValueByProfileNonNFT(cred_arr[1][i],cred_arr[0][i]);
		        		
		        		txt = '<td class="hide_for_set_leverage_panel">'+am+'</td>';	
		        		
		        		
		        	}
			        
			        if (!txt) txt =  '<td class="hide_for_set_leverage_panel">-</td>'; 
			        this.usd_val_column.push(txt);
				}

  			}
  			return this.usd_val_column;

		},

		duration_col: new Array(),
		getDurationCol_last_call: 0,
		getDurationCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getDurationCol_last_call+CACHE_TIME || flag){
  				this.getDurationCol_last_call = current_timestamp;

  				this.duration_col.length =0;
  				let cred_arr = this.cred_arr;
  				

  				for (let i=0; i < cred_arr[0].length; i++){
					let txt = '';
					
		        	if (cred_arr[1][i] >0 || cred_arr[2][i] >0 ){//credit or fee unpaid
		        		if (cred_arr[3][i] == 0){
		        			txt = '<td class="hide_for_credit_return_panel">-</td>';	
		        		} else {
		        			
		        			txt = '<td class="hide_for_credit_return_panel">'+cred_arr[3][i].toString()+'</td>';	
		        		}
		        		
		        	}
			        
			        if (!txt) txt =  '<td class="hide_for_credit_return_panel">-</td>'; 
			        this.duration_col.push(txt);
				}
 				

  			}
  			return this.duration_col;

		},

		fee_col: new Array(),
		getFeeCol_last_call :0, 
		getFeeCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getFeeCol_last_call+CACHE_TIME || flag){
  				this.getFeeCol_last_call = current_timestamp;

  				this.fee_col.length =0;
  				let cred_arr = this.cred_arr;

  				for (let i=0; i < cred_arr[0].length; i++){
					let txt = '';
					
		    
		    		if (cred_arr[2][i] == 0){
		    			txt = '<td>-</td>';	
		    		} else {
		    			//let am = window.web3js_reader.utils.fromWei(cred_arr[2][i], 'ether');
		    			let adj_am = toTokens(cred_arr[2][i],4);//((parseFloat(am)).toFixed(4)).toString(); 
		    			txt = '<td>'+adj_am+'</td>';	
		    		}
		    		
			        
			        if (!txt) txt =  '<td>-</td>'; 
			        this.fee_col.push(txt);
				}
			       

  				

  			}
  			return this.fee_col;

		},


		leverage_column: new Array(),
		getLevCol_last_call: 0,
		getLevCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getLevCol_last_call+CACHE_TIME || flag){
  				this.getLevCol_last_call = current_timestamp;

  				this.leverage_column.length =0;
  				let cred_arr = this.cred_arr;
  				let lev_arr = this.lev_arr;
  				let lev_ratio_arr = this.lev_ratio_arr;

  				for (let i=0; i < cred_arr[0].length; i++){ //i == credit id
					let txt = '';
		
		        		let lbl='';
		        		//let res = await window.liqlev_smartcontract.methods.viewCustomerLeverageByCredId(userObject.account,i).call({from: userObject.account});
		        		if (lev_arr[i] >0){
		        			//let am = window.web3js_reader.utils.fromWei(lev_arr[i], 'ether');

		        			let adj_am =  toTokens(lev_arr[i],4);//((parseFloat(am)).toFixed(4)).toString(); 
		        			txt = '<td>'+adj_am+'<br>'+lev_ratio_arr[i]+'%</td>';
		        		}	
		        	
		        //	}
			        
			        if (!txt) txt =  '<td>-</td>'; 
			        this.leverage_column.push(txt);
				}
 				

  			}
  			return this.leverage_column;

		},


		set_leverage_column: new Array(),
		getSetLevCol_last_call: 0,
		getSetLevCol:  async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getSetLevCol_last_call+CACHE_TIME || flag){
  				this.getSetLevCol_last_call = current_timestamp;

  				this.set_leverage_column.length =0;
  				let cred_arr = this.cred_arr;
  				let lev_arr = this.lev_arr;
  				

  				for (let i=0; i < cred_arr[0].length; i++){ //i == credit id
					let txt = '';
					
					//let res = await window.liqlev_smartcontract.methods.viewCustomerLeverageByCredId(userObject.account,i).call({from: userObject.account});
		        	if (lev_arr[i] >0 || cred_arr[1][i] >0){
		        	
		        		let lbl='';
		        		
		        		txt =  '<td onclick="compensate_with_leverage('+i.toString()+')"><span class="iconify" data-icon="emojione-v1:money-bag" data-inline="false"></span>'+lbl+'</td>';
		        		
		        	}
			        
			        if (!txt) txt =  '<td>-</td>'; 
			        this.set_leverage_column.push(txt);
				}
  				

  			}
  			return this.set_leverage_column;

		},

		set_leverage_inputs_col: new Array(),
		getSetLevInputsCol_last_call: 0,
		getSetLevInputsCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getSetLevInputsCol_last_call+CACHE_TIME || flag){
  				this.getSetLevInputsCol_last_call = current_timestamp;

  				this.set_leverage_inputs_col.length =0;
  				let cred_arr = this.cred_arr;
  				let clt_arr = this.clt_arr;
  				let lev_arr = this.lev_arr;
  				

  				for (let i=0; i < cred_arr[0].length; i++){ //i == deposit id
					let txt = '';
			            		
			 		//let lev_data = await window.liqlev_smartcontract.methods.viewCustomerLeverageByCredId(userObject.account,i).call({from: userObject.account});
			 		
			 		let cytr_profile_id = await getCYTRProfileId();

			 		let cc = await window.credit_smartcontract.methods.viewCustomerCredit(userObject.account,0).call({ from: userObject.account});
					let cc_index = parseInt(cc['index']);
			 		let x = await window.credit_smartcontract.methods.viewCustomerCreditExtraDataByIndex(cc_index,i).call({ from: userObject.account});
					let is_fixed_apy = x.is_fixed_apy;

					let clt_id = cred_arr[4][i];
		        	let clt_profile_id = clt_arr[0][parseInt(clt_id)];

					//console.log ('i=',i, 'calc needed lev params=',cred_arr[0][i], clt_profile_id, cytr_profile_id, cred_arr[1][i], is_fixed_apy);
			 		let lns = await window.usage_calc_smartcontract_reader.methods
						.calcNeededLeverageByCreditSize(cred_arr[0][i], clt_profile_id, cytr_profile_id, cred_arr[1][i], is_fixed_apy).call({ from: userObject.account});
					

					//console.log('lns=',lns);
					

					txt = '<td class="set_leverage_panel" id="set_leverage_panel'+i.toString()+'" style="display:none">';
					if (cred_arr[1][i] > 0 && lev_arr[i] == 0 ) {
						txt += '<div class="set_leverage_input" style="font-size: 1em;">Set Leverage:</div>';
						txt += '<div style="margin-top: 1vh;"></div>';
						txt += '<button id="set_leverage_credit_25_'+i.toString()+'"+ class="transparent_button set_leverage_input  set_leverage_input'+i.toString()+'" style="width: 3.5vw; margin:0!important" onclick="set_leverage(25,'+i.toString()+')">25%</button>';
						txt += '<button id="set_leverage_credit_50_'+i.toString()+'"+ class="transparent_button set_leverage_input  set_leverage_input'+i.toString()+'" style="width: 3.5vw; margin:0!important" onclick="set_leverage(50,'+i.toString()+')">50%</button>';
						txt += '<button id="set_leverage_credit_75_'+i.toString()+'"+ class="transparent_button set_leverage_input  set_leverage_input'+i.toString()+'" style="width: 3.5vw; margin:0!important" onclick="set_leverage(75,'+i.toString()+')">75%</button>';
						txt += '<button id="set_leverage_credit_100_'+i.toString()+'"+ class="transparent_button set_leverage_input  set_leverage_input'+i.toString()+'" style="width: 3.5vw; margin:0!important" onclick="set_leverage(100,'+i.toString()+')">100%</button>';
						txt += '<div class="set_leverage_input  set_leverage_input'+i.toString()+'" style="margin-top: 1vh;">';
						txt += '<span class="set_leverage_input set_leverage_input'+i.toString()+'" style="position: absolute;margin-top:-0.5em;margin-left:0.5em;background:black; color:white; font-size: 0.5em">CYTR Lev.</span>';
						txt += '<input id="lev_size_'+i.toString()+'"+ readonly class="form-control set_leverage_input set_leverage_input'+i.toString()+'" aria-label="" ';
						txt+=	'style="color: white; background-color: black !important; border-color: white !important;  width: 16vw;" >';

						txt +=	'</div>';
								  		
		    			
		    			txt += '<button class="transparent_button set_leverage_input set_leverage_input'+i.toString()+'" style="width: 10vw" onclick="set_leverage_confirm('+i.toString()+')">Confirm</button>';
					} 

					else if (lev_arr[i] >0){
						txt += '<button id="unfreeze_leverage_'+i.toString()+'"+ class="transparent_button set_leverage_input set_leverage_input'+i.toString()+'" style="width: 6vw; margin:0!important" onclick="unfreeze_leverage('+i.toString()+')">Unfreeze</button>';
						
					}
					txt += '</td>'; 
		            		
			            	
			        
			        if (!txt) txt =  '<td class="set_leverage_panel" id="set_leverage_panel'+i.toString()+'">-</td>'; 
			        this.set_leverage_inputs_col.push(txt);
				}
  				

  			}
  			return this.set_leverage_inputs_col;

		},

		return_credit_col: new Array(),
		getReturnCreditCol_last_call: 0,
		getReturnCreditCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getReturnCreditCol_last_call+CACHE_TIME || flag){
  				this.getReturnCreditCol_last_call = current_timestamp;


  				this.return_credit_col.length =0;
  				let cred_arr = this.cred_arr;
  				let lev_arr = this.lev_arr;
  				let lev_ratio_arr = this.lev_ratio_arr;

  				for (let i=0; i < cred_arr[0].length; i++){ //i == deposit id
					let txt = '';
			
		        	if (cred_arr[1][i] >0 || cred_arr[2][i] >0){//credit or fee unpaid
		        		let lbl='';
		        		
		        		txt =  '<td class="hide_for_set_leverage_panel" onclick="return_credit('+i.toString()+')"><span class="iconify" data-icon="emojione-v1:money-bag" data-inline="false"></span>'+lbl+'</td>';
		        		
		        	}
			        
			        if (!txt) txt =  '<td class="hide_for_set_leverage_panel">-</td>'; 
			        this.return_credit_col.push(txt);
				}

  				
  			}
  			return this.return_credit_col;

		},

		return_credit_inputs_col: new Array(),
		getReturnCreditInputsCol_last_call: 0,
		getReturnCreditInputsCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getReturnCreditInputsCol_last_call+CACHE_TIME || flag){
  				this.getReturnCreditInputsCol_last_call = current_timestamp;
  				this.return_credit_inputs_col.length =0;
  				let cred_arr = this.cred_arr;

  				for (let i=0; i < cred_arr[0].length; i++){ //i == deposit id
					let txt = '';
					
		        	if ( cred_arr[1][i] >0 || cred_arr[2][i] >0 ){
		        		
		    			//let am = window.web3js_reader.utils.fromWei(cred_arr[1][i], 'ether');
						let adj_am =  toTokens(cred_arr[1][i],4);//((parseFloat(am)).toFixed(4)).toString(); 
						//let fee_am = window.web3js_reader.utils.fromWei(cred_arr[2][i], 'ether');	            
				 		//let adj_fee_am =  ((parseFloat(fee_am)).toFixed(4)).toString(); 


		    			txt = '<td class="credit_return_panel" id="credit_return_panel'+i.toString()+'" style="display:none">';
		    			if (cred_arr[1][i] > 0) {
		    				txt += '<div style="font-size: 1em;">Return credit body:</div>';
		    				txt += '<div style="margin-top: 1vh;"></div>';
		        			txt += '<button id="return_credit_all'+i.toString()+'" class="transparent_button transparent_button_pressed credit_return_input" style="width: 5vw" onclick="return_credit_all_btn('+i.toString()+')">All</button>';
		        			txt += '<button id="return_credit_part'+i.toString()+'" class="transparent_button credit_return_input" style="width: 5vw" onclick="return_credit_part_btn('+i.toString()+')">Part</button>';
		        			txt += '<input class="credit_return_input" id="credit_return_input'+i.toString()+'" type="number" min="0.1" step="0.1" max="'+adj_am+'" class="form-control" aria-label="" ';
		        			txt += ' value="'+adj_am+'"';
		        			txt +=' style=" color: white; background-color: black !important; border-color: white !important; width: 8vw;" readonly>';
		        			txt += '<div style="margin-top: 1vh;"></div>';
		        			//txt += '<span id="withraw_dep_rew'+i.toString()+'" class="withdraw_dep_input">reward to be extracted: '+adj_rew_am+'</span>';
		        			txt += '<div style="margin-top: 1vh;"></div>';
		        			if (depTypeByProfileId(cred_arr[0][i]) != NATIVE_ETHEREUM ){
		        				txt += '<button id="return_credit_mvtokens'+i.toString()+'" class="transparent_button credit_return_input" style="width: 10vw" onclick="return_credit_mvtokens('+i.toString()+')">Approve</button>&nbsp;';
		        			}
		        			txt += '<button id="return_credit_confirm'+i.toString()+'" class="transparent_button credit_return_input" style="width: 10vw" onclick="return_credit_confirm('+i.toString()+')">Return</button>';
		    			} else {
		    				
		    				txt += '<div style="font-size: 1em;">Return fee (total):</div>';
		    				txt += '<div style="margin-top: 1vh;"></div>';
		        			if (depTypeByProfileId(cred_arr[0][i]) !=NATIVE_ETHEREUM ){
		        				txt += '<button id="return_fee_mvtokens'+i.toString()+'" class="transparent_button credit_return_input" style="width: 10vw" onclick="return_fee_mvtokens('+i.toString()+')">Approve</button>&nbsp;';
		        			}
		        			txt += '<button id="return_fee_confirm'+i.toString()+'" class="transparent_button credit_return_input" style="width: 10vw" onclick="return_fee_confirm('+i.toString()+')">Return</button>';
		    			}
		    			txt += '</td>'; 
		       
		        		
		        	}
			        
			        if (!txt) txt =  '<td class="credit_return_panel"  id="credit_return_panel'+i.toString()+'" style="display:none">-</td>'; 
			        this.return_credit_inputs_col.push(txt);
				}

  				

  			}
  			return this.return_credit_inputs_col;

		},




	},
	liq_earn:{
		icon_column: new Array(),
		asset_column: new Array(),
		lockup_period : new Array(),
		getIconAssetLockupCols_last_call:0,
		getIconAssetLockupCols: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getIconAssetLockupCols_last_call+CACHE_TIME || flag){
  				this.getIconAssetLockupCols_last_call = current_timestamp;


  				this.icon_column.length =0;
  				this.asset_column.length =0;
  				this.lockup_period.length =0;
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;

		  				
				for (let i = 0; i < am_arr[0].length; i++){
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						//console.log('u_p_id', am_arr[0][i]);
						this.icon_column.push('<td>'+crypto_icons[await unswProfileNameByProfileId(am_arr[0][i])]+'</td>');
						let aname = (await unswProfileNameByProfileId(am_arr[0][i])).slice(0,-3);
						this.asset_column.push('<th scope="row">'+aname+'</th>');
						let period_code = (await unswProfileNameByProfileId(am_arr[0][i])).slice(-2);

						this.lockup_period.push('<th scope="row">'+period_name_from_code[period_code]+'</th>');
					}
				}

  				
  			}
  			return [this.icon_column, this.asset_column, this.lockup_period];

		},


		apy_column : new Array(),
		getApyCol_last_call:0,
		getApyCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getApyCol_last_call+CACHE_TIME || flag){
  				this.getApyCol_last_call = current_timestamp;


  				this.apy_column.length =0;
  				
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;
				

		  				
				for (let i = 0; i < am_arr[0].length; i++){
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						//let apy = await window.usage_calc_smartcontract_reader.methods.calcDepApy(am_arr[0][i]).call({ from: userObject.account});
						let apy = await getAPY(am_arr[0][i]);
						let apy_adj = (apy / apy_scale)*100;
						this.apy_column.push('<th scope="row">'+((parseFloat(apy_adj)).toFixed(2)).toString()+'</th>');
					}
				}

  				
  			}
  			return this.apy_column;

		},

		dep_column : new Array(),
		getDepCol_last_call:0,
		getDepCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getDepCol_last_call+CACHE_TIME || flag){
  				this.getDepCol_last_call = current_timestamp;


  				this.dep_column.length =0;
  				
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;
				

		  				
				for (let i = 0; i < am_arr[0].length; i++){
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						let txt ='';
						if (am_arr[1][i] > 0){
			            	//let am = window.web3js_reader.utils.fromWei(am_arr[1][i], 'ether');
			    			let adj_am =  toTokens(am_arr[1][i],4);//((parseFloat(am)).toFixed(4)).toString(); 
			            	txt = '<td>'+adj_am+'</td>';	
				        } else {
				        	txt =  '<td>-</td>'; 
				        }   		
				        
				        this.dep_column.push(txt);
				    }
				}

  				
  			}
  			return this.dep_column;

		},


		usd_val_column : new Array(),
		usd_val_only_col: new Array(),
		getUsdValCol_last_call:0,
		getUsdValCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getUsdValCol_last_call+CACHE_TIME || flag){
  				this.getUsdValCol_last_call = current_timestamp;


  				this.usd_val_column.length =0;
  				this.usd_val_only_col.length =0;
  				
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;
  				
  				

		  				
				let index =0;
				for (let i = 0; i < am_arr[0].length; i++){		
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;	
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						let txt ='';
						if (am_arr[1][i] > 0){
							//console.log('uw pair amount=', am_arr[1][i], 'dep_id=', i);

			        		let am =  await calcUSDValueOfDeposit(am_arr[1][i],i);
			        		this.usd_val_only_col.push({val: am, ori_index: index}); 
			        		txt = '<td>'+am+'</td>';	
						} else {
				        	txt =  '<td>-</td>'; 
				        	this.usd_val_only_col.push({val: 0, ori_index: index}); 
				        	
				        }   
				        this.usd_val_column.push(txt);
				        index++;
				    }
				}

  				
  			}
  			return [this.usd_val_column,this.usd_val_only_col];

		},

		duration_col : new Array(),
		unlock_col: new Array(),
		getDurationUnlockCol_last_call:0,
		getDurationUnlockCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getDurationUnlockCol_last_call+CACHE_TIME || flag){
  				this.getDurationUnlockCol_last_call = current_timestamp;


  				this.duration_col.length =0;
  				this.unlock_col.length =0;
  				
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;
				
  				
  				

		  				
				for (let i = 0; i < am_arr[0].length; i++){
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						let txt = '';
						let txt_unl = '';
						
			    		if (am_arr[1][i] > 0 && am_arr[2][i] == 0){
			    			let days = await stakingContractInstance.methods.depositDays(userObject.account, i).call({from:userObject.account});//duration
			    			txt = '<td class="withdraw_rew_to_hide">'+days.toString()+'</td>';	

			    			let period_code = (await unswProfileNameByProfileId(am_arr[0][i])).slice(-2);

							let unl_period = period_len_from_code[period_code]-days.toString();
							let unl_period_txt;
							if (unl_period > 0){
								unl_period_txt = unl_period.toString();
							} else {
								unl_period_txt = '-';
							}

			    			txt_unl =  '<td class="withdraw_rew_to_hide">'+unl_period_txt+'</td>';	
			    		} else {
			    			txt = '<td class="withdraw_rew_to_hide">-</td>';	
			    			txt_unl = '<td class="withdraw_rew_to_hide">-</td>';
			    		}
				            		        
				       
				        this.duration_col.push(txt);
				        this.unlock_col.push(txt_unl);
				    }
				}

  				
  			}
  			return [this.duration_col,this.unlock_col];

		},

		extractable_dep_col : new Array(),
		getExtrDepCol_last_call:0,
		getExtrDepCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getExtrDepCol_last_call+CACHE_TIME || flag){
  				this.getExtrDepCol_last_call = current_timestamp;


  				this.extractable_dep_col.length =0;
  				
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;
				
  				
				for (let i = 0; i < am_arr[0].length; i++){
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						let txt ='';
						
			    		if (am_arr[2][i] > 0){
			    			//let am = window.web3js_reader.utils.fromWei(am_arr[2][i], 'ether');
							let adj_am =  toTokens(am_arr[2][i],4);//((parseFloat(am)).toFixed(4)).toString(); 
			        		txt = '<td class="withdraw_rew_to_hide">'+adj_am+'</td>';			
			    		} else {
			    			txt =  '<td class="withdraw_rew_to_hide">-</td>'; 	
			    		}

				        this.extractable_dep_col.push(txt);
				    }
				}
  				
  			}
  			return this.extractable_dep_col;

		},

		withdraw_dep_col : new Array(),
		getWithdrawDepCol_last_call:0,
		getWithdrawDepCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getWithdrawDepCol_last_call+CACHE_TIME || flag){
  				this.getWithdrawDepCol_last_call = current_timestamp;


  				this.withdraw_dep_col.length =0;
  				
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;
				
				
				for (let i = 0; i < am_arr[0].length; i++){
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						let txt = '';
						
						if (am_arr[2][i] > 0){
			    			let lbl='';		
			    			txt =  '<td class="withdraw_rew_to_hide" onclick="withdraw_deposit('+i.toString()+')"><span class="iconify" data-icon="emojione-v1:money-bag" data-inline="false"></span>'+lbl+'</td>';
			    		} else {
			    			txt =  '<td class="withdraw_rew_to_hide">-</td>'; 
			    		}	            	
				        
				      
				        this.withdraw_dep_col.push(txt);
				    }
				}
  				
  			}
  			return this.withdraw_dep_col;

		},

		withdraw_dep_inputs_col : new Array(),
		getWithdrawDepInputsCol_last_call:0,
		getWithdrawDepInputsCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getWithdrawDepInputsCol_last_call+CACHE_TIME || flag){
  				this.getWithdrawDepInputsCol_last_call = current_timestamp;


  				this.withdraw_dep_inputs_col.length =0;
  				
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;
				
				
				for (let i = 0; i < am_arr[0].length; i++){
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						let txt = '';
						
			    		
			    		if (am_arr[2][i] > 0){
							//let am = window.web3js_reader.utils.fromWei(am_arr[2][i], 'ether');
							let adj_am =  toTokens(am_arr[2][i],4);//((parseFloat(am)).toFixed(4)).toString(); 

							//let rew_am = window.web3js_reader.utils.fromWei(rew_arr[1][i], 'ether');	            
					 		//let adj_rew_am =  ((parseFloat(rew_am)).toFixed(4)).toString(); 
							txt = '<td class="withdraw_params" style="display:none">';
							txt += '<button id="withraw_dep_all'+i.toString()+'" class="transparent_button transparent_button_pressed withdraw_dep_input" style="display:none;width: 5vw" onclick="withdraw_deposit_all_btn('+i.toString()+')">All</button>';
							txt += '<button id="withraw_dep_part'+i.toString()+'" class="transparent_button withdraw_dep_input" style="display:none;width: 5vw" onclick="withdraw_deposit_part_btn('+i.toString()+')">Part</button>';
							txt += '<input class="withdraw_dep_input" id="withraw_dep_input'+i.toString()+'" type="number" min="0.1" step="0.1" max="'+adj_am+'" class="form-control" aria-label="" ';
							txt += ' value="'+adj_am+'"';
							txt +=' style="display:none; color: white; background-color: black !important; border-color: white !important; width: 8vw;" >';
							txt += '<div style="display:block; margin-top: 1vh;"></div>';
							//txt += '<span id="withraw_dep_rew'+i.toString()+'" class="withdraw_dep_input">reward to be extracted: '+adj_rew_am+'</span>';
							txt += '<div style="display:block; margin-top: 1vh;"></div>';
							txt += '<button id="withraw_dep_confirm'+i.toString()+'" class="transparent_button withdraw_dep_input" style="display:none;width: 10vw" onclick="withdraw_deposit_confirm('+i.toString()+')">Confirm</button>';
							txt += '</td>'; 
			   			} else {
			   				txt =  '<td class="withdraw_params" style="display:none">-</td>'; 
			   			}
			    		
				       
				        this.withdraw_dep_inputs_col.push(txt);
				    }
				}
  				
  			}
  			return this.withdraw_dep_inputs_col;

		},

		reward_col : new Array(),
		getRewardCol_last_call:0,
		getRewardCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getRewardCol_last_call+CACHE_TIME || flag){
  				this.getRewardCol_last_call = current_timestamp;


  				this.reward_col.length =0;
  				
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;
				
				for (let i = 0; i < am_arr[0].length; i++){
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						let txt = '';
						
			    		if (rew_arr[1][i] > 0){
				    		//let adj = window.web3js_reader.utils.fromWei(rew_arr[1][i], 'ether');	            
						 	let adj_str =  toTokens(rew_arr[1][i],4);//((parseFloat(adj)).toFixed(4)).toString(); 
				    		txt = '<td class="withdraw_params_to_hide">'+adj_str+'</td>';
			    		} else {
			    			txt =  '<td class="withdraw_params_to_hide">-</td>'; 
			    		}
				            	
				        this.reward_col.push(txt);
				    }
				}
  				
  			}
  			return this.reward_col;

		},

		extractable_reward_col : new Array(),
		getExtractableRewardCol_last_call:0,
		getExtractableRewardCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getExtractableRewardCol_last_call+CACHE_TIME || flag){
  				this.getExtractableRewardCol_last_call = current_timestamp;


  				this.extractable_reward_col.length =0;
  				
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;
				
				
				for (let i = 0; i < am_arr[0].length; i++){
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						let txt = '';
						
						if (rew_arr[2][i] > 0){
			        		//let adj = window.web3js_reader.utils.fromWei(rew_arr[2][i], 'ether');	            
						 	let adj_str =  toTokens(rew_arr[2][i],4);//((parseFloat(adj)).toFixed(4)).toString(); 
			        		txt = '<td class="withdraw_params_to_hide">'+adj_str+'</td>';
			        	} else {
			        		txt =  '<td class="withdraw_params_to_hide">-</td>'; 
			        	}
				            		
				        this.extractable_reward_col.push(txt);
				    }
				}
  				
  			}
  			return this.extractable_reward_col;

		},

		withdraw_rew_col : new Array(),
		getWithdrawRewCol_last_call:0,
		getWithdrawRewCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getWithdrawRewCol_last_call+CACHE_TIME || flag){
  				this.getWithdrawRewCol_last_call = current_timestamp;


  				this.withdraw_rew_col.length =0;
  				
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;
				
				
				for (let i = 0; i < am_arr[0].length; i++){
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						let txt = '';
						
						if (rew_arr[2][i] > 0){
			    			let lbl='';
			    			txt =  '<td class="withdraw_params_to_hide" onclick="withdraw_reward('+i.toString()+')"><span class="iconify" data-icon="emojione-v1:money-bag" data-inline="false"></span>'+lbl+'</td>';
			    		} else {
			    			txt =  '<td class="withdraw_params_to_hide">-</td>'; 
			    		}
				      
				        this.withdraw_rew_col.push(txt);
				    }
				}
  				
  			}
  			return this.withdraw_rew_col;

		},

		withdraw_rew_inputs_col : new Array(),
		getWithdrawRewInputsCol_last_call:0,
		getWithdrawRewInputsCol: async function(flag = false){
			let current_timestamp = Date.now();
  			if (current_timestamp > this.getWithdrawRewInputsCol_last_call+CACHE_TIME || flag){
  				this.getWithdrawRewInputsCol_last_call = current_timestamp;


  				this.withdraw_rew_inputs_col.length =0;
  				
  				let am_arr = userObject.deposits.am_arr;
  				let rew_arr = userObject.deposits.rew_arr;
				
				
				for (let i = 0; i < am_arr[0].length; i++){
					if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
					if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
						let txt = '';
						
				        if (rew_arr[2][i] > 0){    	
			    			txt = '<td class="withdraw_reward_params" style="display:none">';
			    			txt += '<div style="display:block; margin-top: 1vh;"></div>'
			    			txt += '<button id="withdraw_rew_confirm'+i.toString()+'" class="transparent_button withdraw_rew_input" style="display:none;width: 10vw" onclick="withdraw_reward_confirm('+i.toString()+')">Confirm</button>';
			    			txt += '</td>'; 
			    		} else {
			    			txt =  '<td class="withdraw_reward_params" style="display:none">-</td>'; 
			    		}
			    		

				        this.withdraw_rew_inputs_col.push(txt);
				    }
				}
  				
  			}
  			return this.withdraw_rew_inputs_col;

		},



	},


	load: async function() {  
		if (this.loaded) return;
    
		
		
	    	

    	[	this.deposit_profiles, 
    		this.deposit_profiles_liqpairs, 
    	 	this.credit_profiles,
    	 	this.liq_pairs, 
    	 	this.liq_terms ] = await Promise.all([	getAllProfiles(),
													getAllProfilesUniswap(),
													getAllCreditProfiles(),
													getLiqPairs(),
													getLiqPairs(),
													getLiqTerms()]);

		

		
		
			
		await Promise.all([ this.deposits.getIconAssetsCols(),
							this.deposits.getAmArr(),
							this.deposits.getRewArr(),
							this.credits.getCredArr(),
							this.credits.getCltArr() ]);

		
	
		await this.credits.getLevArr(true); //as depends on cred arr



	


    	this.loaded = true;
  	},

  	

  	state: {
  		current_page_id: '',
  		selectedNFTAssets: new Array(),
  		selected_credprofile: -1, //collateral asset,  not selected
  		getcredit_profile: -1, //get credit in..
  		selected_depprofile: -1, //deposit
  		selected_depprofile_name: '',
	    selected_depprofile_type : 0, 
	    selected_depprofile_token_address: '',
	    liq_pair_name: '',
	    liq_pair_address: '',
	    liq_pair_fullcode: ''
  	}
  	
}

//userObject.state.selectedNFTAssets = new Array();

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState == 'hidden') {        
        setWalletPref({page_id: userObject.state.current_page_id}); 
    }
});

window.addEventListener('DOMContentLoaded', async () => {
	
	

	
	const r1 = getBackendParameter('STAKING_CONTRACT',(contract_address) => {
		window.staking_contract_address = contract_address;	
	});

	const r2 = getBackendParameter('FAMERS_REGISTER_CONTRACT',(contract_address) => {
		window.famers_register_contract_address = contract_address;	
	});

	const r3 = getBackendParameter('DEPPROFILES_REGISTER_CONTRACT',(contract_address) => {
		window.depprofiles_register_contract_address = contract_address;	
	});	

	const r4 = getBackendParameter('CREDIT_PROFILES_REGISTER_CONTRACT',(contract_address) => {
		window.credit_profiles_register_contract_address = contract_address;	
	});	

	const r5 = getBackendParameter('DATA_PROVIDER_CONTRACT',(contract_address) => {
		window.data_provider_contract_address = contract_address;	
	});	

	const r6 = getBackendParameter('VOTES_CALC_CONTRACT',(contract_address) => {
		window.votes_calc_contract_address = contract_address;	
	});	

	const r7 = getBackendParameter('USAGE_CALC_CONTRACT',(contract_address) => {
		window.usage_calc_contract_address = contract_address;	
	});	

	const r8 = getBackendParameter('CREDIT_CONTRACT',(contract_address) => {
		window.credit_contract_address = contract_address;	
	});	

	const r9 = getBackendParameter('LIQLEV_CONTRACT',(contract_address) => {
		window.liqlev_contract_address = contract_address;	
	});	
	await Promise.all([r1,r2,r3,r4,r5,r6,r7,r8,r9]);

	//in any case;
	await initWeb3jsReader();

	await web3jsReadersList.init();

	await Promise.all( [initDataProviderContractReader(),initVotesCalcContractReader(),initUsageCalcContractReader(), initCyclopsNFTContractReader()]);
	//await initDataProviderContractReader();
	//await initVotesCalcContractReader();
	//await initUsageCalcContractReader();

	
				  


	if (isMetaMaskInstalled()){
			
			window.ethereum.autoRefreshOnNetworkChange = false;
			await getAccount();

		 	window.ethereum.on('accountsChanged', async function(accounts){
		  		await getAccount();
		  	});

		  	window.ethereum.on('chainChanged', async (chainId) => {
		  		//console.log('chainId=', chainId);
		  		if (chainId == '0x2a') window.location.replace('https://debank.cyclops.game');
		 		window.location.reload();
			});

			

	} else {

	  
		walletButton.style.display="block";

		await initWeb3Modal();
		

	  	walletButton.addEventListener("click", toggleWeb3Connect);

	}

	if (window.location.pathname == '/'){
		//setWalletPref({page_id: 'dashboard-tab'}); 
		await getWalletPref();
		
		openTab({srcElement: document.getElementById(userObject.state.current_page_id+'-menu')}, userObject.state.current_page_id);
		
		initDepositProfilesDropdown();
		initCreditProfilesDropdown();
		initGetCreditDropdown();

	}
	
});

async function initWeb3Modal(){

		web3Modal = new Web3Modal({
		    cacheProvider: false, // optional
		    providerOptions, // required
		    disableInjectedProvider: true, // optional. For MetaMask / Brave / Opera.
			
		});
}



async function getAccount(){
	
	try{
	
		let accounts = await ethereum.request({method:'eth_requestAccounts'});
		userObject.account = accounts[0];
		
		/*
		if (userObject.account == '0xddc58f7839a71787eb94211bc922e0ae2bfb5501'){}
		else if( userObject.account == '0xc358a60bccec7d0efe5c5e0d9f3862bba6cb5cd8'){}
		else {window.location.replace('https://fame.cyclops.game/upgrade.html')}*/
		

		window.chainId = window.ethereum.chainId;
		
		document.getElementById('debank_load_bar').ldBar.set(10);
	  
	  
	
	
		
		safeSetValueBySelector( '.current-wallet', (userObject.account));
		safeSetInnerHTMLBySelector( '.current-wallet', (userObject.account),'inline');

		checkAdminButton();
        window.web3js =  await new Web3(window.ethereum);
		window.web3 = window.web3js;
		window.BN = web3js.utils.BN;

		await Promise.all( [ initStakingContract(), initCreditContract(), initLiqLevContract(), initCyclopsNFTContract() ]  )
		

		document.getElementById('debank_load_bar').ldBar.set(15);

		await userObject.load();

		document.getElementById('debank_load_bar').ldBar.set(25);

		// if (window.location.pathname == '/'){
			
		// 	window.barCheck = setInterval(barChecker, 1000);
		// 		async function barChecker() {
		// 		  if (document.getElementById('load_bar_cover')){
		// 		  	if (	document.getElementById('total_tokens_balance').innerHTML && 
		// 		  			document.getElementById('tokens_balance').innerHTML &&
		// 					document.getElementById('my_credits').innerHTML) {
		// 		  				await new Promise(r => setTimeout(r, 1000));
		// 		  				document.getElementById('load_bar_cover').style.display="none";
		// 		  				clearInterval(window.barCheck);

		// 			}
		// 		  }
				  
		// 	}

		// 	if (window.chainId == undefined){
		// 		document.getElementById('net_name').innerHTML="unknown net";
		// 		document.getElementById('net_info').style.display ="block";
		// 		document.getElementById('net_info').style.color ="red";
		// 		document.getElementById('net_txt').innerHTML=" wrong network, connect to BSC-Test";
		// 	} else if (window.chainId != '0x61') {
		// 		document.getElementById('net_name').innerHTML=chains[window.chainId];
		// 		document.getElementById('net_info').style.display ="block";
		// 		document.getElementById('net_icon').style.color ="red";
		// 		document.getElementById('net_txt').innerHTML=" wrong network, connect to BSC-Test";
		// 	} else {
		// 		document.getElementById('net_icon').style.color ="green";
		// 		document.getElementById('net_info').style.display ="block";
		// 		document.getElementById('net_txt').innerHTML=" BSC-Test";
		// 	}

		// 	// await updateData();
			
		// 	initAssetsDropdown();
		// 	//initFamersDropdowns();
		// 	initLiqTermsDropdown();
		// 	initLiqPairsDropdown();
		// }

		
		window.gp = await window.web3js.eth.getGasPrice();
		window.gp = window.gp*2;	
	

		

	} catch (error){
		errorMsg('cannot access wallet');
	}
	
}

async function getAccountWalletConnect(){

	try{
	////
		window.web3js =  await new Web3(window.provider);
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
	
			
		safeSetValueBySelector( '.current-wallet', userObject.account);
		safeSetInnerHTMLBySelector( '.current-wallet', userObject.account,'inline');

		//for MM-based code to work without changes for smart contract interactions
		window.ethereum = window.provider; 

		
		await window.provider.enable();
		
        
		window.BN = web3js.utils.BN;

		await Promise.all( [ initStakingContract(), initCreditContract(), initLiqLevContract() ]  )
		

		document.getElementById('debank_load_bar').ldBar.set(15);
		
		await userObject.load();

		document.getElementById('debank_load_bar').ldBar.set(25);
		
		
		if (window.location.pathname == '/'){
			

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

			// await updateData();
			
			//initAssetsDropdown();
			//initFamersDropdowns();
			initLiqTermsDropdown();
			initLiqPairsDropdown();
		}

		
		window.gp = await window.web3js.eth.getGasPrice();
		window.gp = window.gp*2;	
	

		

	} catch (error){
		errorMsg('cannot access wallet');
	}
	
}
	


function temporaryDisableCurrentButton(element_id = null){
	let elem;
	if (element_id) elem = document.getElementById(element_id);
	else elem = event.srcElement
	elem.disabled = true;
	setTimeout(() => { elem.disabled  = false;}, 10000);
}







async function initStakingContract(callback = null){
	
	if (!window.staking_smartcontract){
		     
		if (window.web3js){
			window.staking_smartcontract = await new window.web3js.eth.Contract(staking_contract_abi, window.staking_contract_address); 
			if (callback) callback(window.staking_smartcontract);
		}
		
	} else {
		if (callback) callback(window.staking_smartcontract);
	}
} 

async function initCreditContract(callback = null){
	
	if (!window.credit_smartcontract){
		     
		if (window.web3js){
			window.credit_smartcontract = await new window.web3js.eth.Contract(credit_contract_abi, window.credit_contract_address); 
			if (callback) callback(window.credit_smartcontract);
		}
		
	} else {
		if (callback) callback(window.credit_smartcontract);
	}
} 

async function initLiqLevContract(callback = null){
	
	if (!window.liqlev_smartcontract){
		     
		if (window.web3js){
			window.liqlev_smartcontract = await new window.web3js.eth.Contract(liqlev_contract_abi, window.liqlev_contract_address); 
			if (callback) callback(window.liqlev_smartcontract);
		}
		
	} else {
		if (callback) callback(window.liqlev_smartcontract);
	}
} 


async function initVotesCalcContractReader(callback = null){
	
	if (!window.votes_calc_smartcontract_reader){
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

async function initUsageCalcContractReader(callback = null){
	
	if (!window.usage_calc_smartcontract_reader){
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

async function initCyclopsNFTContractReader(callback = null){
	
	if (!window.cyclops_nft_smartcontract_reader){
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

async function initCyclopsNFTContract(callback = null){
	
	if (!window.cyclops_nft_smartcontract){
		if (window.web3js){
			window.cyclops_nft_smartcontract = await new window.web3js.eth.Contract(nftpub_contracts_abi, window.cyclops_nft_contract_address); 
			if (callback) callback(window.cyclops_nft_smartcontract);
		}
	} else {
		if (callback) callback(window.cyclops_nft_smartcontract);
	}
} 




async function getCredit(){
	//function getCredit(address cust_wallet, uint32 dep_id,  uint256 cred_amount, uint32 get_credit_profile_id) nonReentrant public

	if (userObject.state.selected_credprofile == -1 || !userObject.state.selected_credprofile){
    	errorMsg('you need to select collateral asset');
    	return;
    }	

    if (userObject.state.getcredit_profile == -1 || !userObject.state.getcredit_profile){
    	errorMsg('you need to select credit asset');
    	return;
    }	

    if (userObject.state.getcredit_profile == userObject.state.selected_credprofile){
    	errorMsg('assets for collateral and credit should be different');
    	return;
    }	

    let cred_amount = (safeFloatToWei(document.getElementById('tokens_amount_getcredit').value)).toString(); //wei

    let collateral_dep_id = depAmountByProfileId(userObject.state.selected_credprofile)[0];

    let whole = false;
    if (document.getElementById('full_collateral')){
		whole = document.getElementById('full_collateral').classList.contains('transparent_button_pressed');
	}

	let is_fixed_credit = false;
    if (document.getElementById('set_fixed_credit')){
		is_fixed_credit = document.getElementById('set_fixed_credit').classList.contains('transparent_button_pressed');
	}
    
    initCreditContract( async(contract) => {
    	//console.log(userObject.account+';'+collateral_dep_id+';'+cred_amount+';'+ userObject.state.getcredit_profile+';'+whole+';'+is_fixed_credit);

    	//return;
    	contract.methods.getCredit(userObject.account, collateral_dep_id,  cred_amount, userObject.state.getcredit_profile, whole, is_fixed_credit ).send({from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash)
			
	    })
	    .on('confirmation', function(confirmationNumber, receipt){
				if (confirmationNumber == 5) updateData('get_credit');
				resetMsg();

		})
		.catch(error => 	{
				errorMsg('smartcontract communication error');
			
		});   
    });

}


async function deposit(){
	 
    

    if (userObject.state.selected_depprofile == -1 ){
    	errorMsg('you need to select asset');
    	return;
    }


    let dep_profile_id = userObject.state.selected_depprofile;
    let amount;
    let wei_val = 0;
 	let token_ids = new Array();

    if (userObject.state.selected_depprofile_name == 'nft'){
    	//errorMsg('currently not supported');
    	//return;

	    if (userObject.state.selectedNFTAssets.length == 0){
	    	errorMsg('you need to select tokens');
	        return;
	    }

	    let isApproved = await window.cyclops_nft_smartcontract.methods.isApprovedForAll(userObject.account, window.staking_contract_address).call({from:userObject.account});

	  	if (!isApproved){
	    	errorMsg('you need to approve tokens move first');
	        return;
	    }

	    amount = userObject.state.selectedNFTAssets.length;
	    for (let i=0; i < userObject.state.selectedNFTAssets.length; i++){
	 		token_ids.push(parseInt(userObject.state.selectedNFTAssets[i].t_id));
	 	}


	} else {
		
		amount = (safeFloatToWei(document.getElementById('tokens_amount').value)).toString(); //wei
		if (userObject.state.selected_depprofile_type == NATIVE_ETHEREUM) {
			wei_val = amount;
			
			//let wb_bn = new BN(await (web3jsReadersList.get()).eth.getBalance(userObject.account));
			let wb_bn = new BN(await window.web3js_reader.eth.getBalance(userObject.account));
			let amount_bn = new BN(amount);

		   	if (wb_bn.cmp(amount_bn) == -1){
		   		errorMsg('you do not have enough BNB in your wallet');
				return;
		   	}

		} else { //ERC20 - check approval

			let token_contract = await new window.web3js.eth.Contract(erc20TokenContractAbi, userObject.state.selected_depprofile_token_address); 
			let allow = new BN(await token_contract.methods.allowance(userObject.account,window.staking_contract_address).call({from:userObject.account}));
			

			let tokenAmountToApprove = new BN(amount); 
		    
		    //amount is already adjusted *10**18
		    let calculatedApproveValue = tokenAmountToApprove;//tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));
		 	

		    if (allow < calculatedApproveValue){
		    	errorMsg('please approve tokens move / wait for approval transaction to finish');
		    	return;
		    }


		    let erc20_count = await token_contract.methods.balanceOf(userObject.account).call({from:userObject.account});
		    let erc20_count_bn = new BN(erc20_count);
		    let amount_bn = new BN(amount);
		   	
		   	if (erc20_count_bn.cmp(amount_bn) == -1){
		   		errorMsg('you do not have enough tokens in your wallet');
				return;
		   	}
    
		}

	}

  	

    resetMsg();
    temporaryDisableCurrentButton('deposit_button');



 	
 
 	
   
	initStakingContract(async (stakingContractInstance) => {

		
	     
	    stakingContractInstance.methods.deposit(amount, token_ids, dep_profile_id, window.famer).send( {from: userObject.account, value: wei_val, gasPrice: window.gp}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash)
			
	    })
	    .on('confirmation', function(confirmationNumber, receipt){
				if (confirmationNumber == 5) updateData('make_deposit');
				resetMsg();

		})
		.catch(error => 	{
				errorMsg('smartcontract communication error');
			
		});   

	      
	});
		
    		
}

async function approve_stake_liq(){
	 
  	 if (!userObject.state.liq_pair_name){
    	errorMsg('You need to select liquidity pair');
    	return;
    }

	let amount_wei = (safeFloatToWei(document.getElementById('liq_pair_stake_am').value)).toString(); //wei
	approveTokenMove(userObject.state.liq_pair_address, amount_wei, window.staking_contract_address);    		
}


async function stake_liq(){
	 
    

    if (!userObject.state.liq_pair_name){
    	errorMsg('you need to select liquidity pair');
    	return;
    }

	if (!userObject.state.liq_pair_fullcode){
		errorMsg('you need to select term');
    	return;
	}

    let dep_profile_id = await unswIDByProfileName(userObject.state.liq_pair_fullcode);
    let amount;
    let wei_val = 0;
    let token_ids = new Array();
 
		
	amount = (safeFloatToWei(document.getElementById('liq_pair_stake_am').value)).toString(); //wei
	
	let token_contract = await new window.web3js.eth.Contract(erc20TokenContractAbi, userObject.state.liq_pair_address); 
	let allow = new BN(await token_contract.methods.allowance(userObject.account,window.staking_contract_address).call({from:userObject.account}));
	

	let tokenAmountToApprove = new BN(amount); 
    
    //amount is already adjusted *10**18
    let calculatedApproveValue = tokenAmountToApprove;//tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));
 	

    if (allow < calculatedApproveValue){
    	errorMsg('please approve tokens move / wait for approval transaction to finish');
    	return;
    }


    let erc20_count = await token_contract.methods.balanceOf(userObject.account).call({from:userObject.account});
    let erc20_count_bn = new BN(erc20_count);
    let amount_bn = new BN(amount);
   	
   	if (erc20_count_bn.cmp(amount_bn) == -1){
   		errorMsg('you do not have enough tokens in your wallet');
		return;
   	}


    resetMsg();
    temporaryDisableCurrentButton('stake_liq_confirm');
	
   
	initStakingContract(async (stakingContractInstance) => {

		
	     
	    stakingContractInstance.methods.deposit(amount, token_ids, dep_profile_id, NONE_FAMER_ID).send( {from: userObject.account, value: wei_val, gasPrice: window.gp}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash)
			
	    })
	    .on('confirmation', function(confirmationNumber, receipt){
				if (confirmationNumber == 5) updateData('stake_liq');
				resetMsg();

		})
		.catch(error => 	{
				errorMsg('smartcontract communication error');
			
		});   

	      
	});
		
    		
}

async function approve_deposit(){
	 
  	 if (userObject.state.selected_depprofile == -1 ){
    	errorMsg('you need to select asset');
    	return;
    }


    let dep_profile_id = userObject.state.selected_depprofile;

    if (userObject.state.selected_depprofile_name == 'nft'){
	  	let isApproved = await window.cyclops_nft_smartcontract.methods.isApprovedForAll(userObject.account, window.staking_contract_address).call({from:userObject.account});

	  	if (isApproved){
	    	infoMsg('already approved');
	        return;
	    } else {
	    	//solidity: function setApprovalForAll(address _operator,bool _approved) external{}
	    	window.cyclops_nft_smartcontract.methods.setApprovalForAll(window.staking_contract_address, true).send({from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
		        if (error) throw error;
		        output_transaction(txnHash)
				
		    })
		    .on('confirmation', function(confirmationNumber, receipt){
						
					if (confirmationNumber == 5) infoMsg('NFT move approved');
			})
			.catch(error => 	{
					errorMsg('smartcontract communication error');
				
			});   

	    }
	} else {

		if (userObject.state.selected_depprofile_type == NATIVE_ETHEREUM) {
			return; //no need..
		}

		let amount_wei = (safeFloatToWei(document.getElementById('tokens_amount').value)).toString(); //wei
		approveTokenMove(userObject.state.selected_depprofile_token_address, amount_wei, window.staking_contract_address);
	}
		
    		
}

async function approveTokenMove(token_address, amount_wei, toAddress){
   

  
    let BN = window.web3js_reader.utils.BN;
   

    // Calculate contract compatible value for approve with proper decimal points using BigNumber 
    let tokenAmountToApprove = new BN(amount_wei); 
    let calculatedApproveValue = window.web3js_reader.utils.toHex(tokenAmountToApprove);
    
    let token_contract = await new window.web3js.eth.Contract(erc20TokenContractAbi, token_address); 

	     
	await token_contract.methods.approve(toAddress,calculatedApproveValue).send({from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
			if (error) throw error;
	        output_transaction(txnHash)
			
	    })
	      .on('confirmation', function(confirmationNumber, receipt){
				if (confirmationNumber == 5) infoMsg('Tokens move approved');		
			})
		 	.catch(error => 	{
				errorMsg('smartcontract communication error');
			
		});   
	      
	   
	
}




function output_transaction(txnHash, color = 'white', element_id = 'info_pane', elem_to_hide = null){
	var el = document.getElementById(element_id);
	if (el) {
		var ch ='testnet.';
		//if (window.chainId != '0x1' && window.chainId != '1') ch = chains[window.ethereum.chainId]+'.';

	    el.innerHTML = 
    	'<span style="color: '+color+'";"><a style="color: ' +color+ ';" target="_blank" href="https://'+ch+'bscscan.com/tx/'+txnHash+'">last transaction: '+txnHash+'</a></span>';
		el.style.display = "block";
	}
	if (elem_to_hide) document.getElementById(elem_to_hide).style.display = "none";
}


function safeSetValueById(id, value, disp = 'block'){
	var el = document.getElementById(id);
	if (el) {
		el.value = value;
		if (value == '' ) el.style.display = "none";
		else el.style.display = disp;
	}
}


function safeSetInnerHTMLById(id, value, disp = 'block'){
	var el = document.getElementById(id);
	if (el){
		 el.innerHTML = value;
		 if (value == '' ) el.style.display = "none"
		 else el.style.display = disp;
	}
}

function safeSetValueBySelector(selector, value){
	
	var els = document.querySelectorAll(selector);
	if (els){
		els.forEach(function(item) {
		  item.value = value;
		});
	}
}

function safeHideBySelector(selector){
	
	var els = document.querySelectorAll(selector);
	if (els){
		els.forEach(function(item) {
		  item.style.display = "none";
		});
	}
}

function safeShowBySelector(selector, disp="block"){
	
	var els = document.querySelectorAll(selector);
	if (els){
		els.forEach(function(item) {
		  item.style.display = disp;
		});
	}
}

function safeSetInnerHTMLBySelector(selector, value, disp = 'block'){
	var els = document.querySelectorAll(selector);
	if (els){
		els.forEach(function(el) {
		 el.innerHTML = value;
		 if (value == '' ) el.style.display = "none"
		 else el.style.display = disp;
		});
	}
}

function safeAddClassBySelector(selector, aclass){
	var els = document.querySelectorAll(selector);
	if (els){
		els.forEach(function(item) {
		  item.classList.add(aclass);
		});
	}
}

function safeRemoveClassBySelector(selector, aclass){
	var els = document.querySelectorAll(selector);
	if (els){
		els.forEach(function(item) {
		  item.classList.remove(aclass);
		});
	}
}

function shortenWallet(wallet){
	return wallet.slice(0,9)+'...'+wallet.slice(-4);
}

function safeFloatToWei(num){ //as string
	var num_s = num.toString();
	
	//calc digits after 'dot'
	var n = num_s.indexOf(',');
	if (n == -1) n = num_s.indexOf('.');
	if (n == -1){
		num_s=num_s+'.0';
		n = num_s.indexOf('.');
	}
	let num_dig = num_s.length - n -1
	
	//float as integer in string form
	num_s = num_s.substr(n+1);
	if (num >= 1){
		num_s = (parseInt(num)).toString()+num_s;
	}
	

	//divide adj constant on 10**[num digits after dot]
	let bn_adj = new window.BN(ADJ_CONSTANT.toString());
	
	bn_adj = bn_adj.div( (new window.BN(10)).pow(new BN(num_dig)) );


	//bn based on float as integer in string form
	let bn_num =  new window.BN(num_s);	

	//adjust with adj constant
	bn_num = bn_num.mul(bn_adj);

	//and return in BN form
	return bn_num;
}

function infoMsg(msg){
	safeSetInnerHTMLById('info_pane',msg);
	document.getElementById('info_pane').classList.remove('info_pane_error');
	document.getElementById('info_pane').classList.add('info_pane_info');
}

function errorMsg(msg){
	safeSetInnerHTMLById('info_pane',msg);
	document.getElementById('info_pane').classList.add('info_pane_error');
	document.getElementById('info_pane').classList.remove('info_pane_info');
}

function resetMsg(){
	document.getElementById('info_pane').classList.remove('info_pane_error');
	safeSetInnerHTMLById('info_pane','');
}



function eventFire(el, etype){
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
	  } catch(e) {
	    //console.log("Could not get a wallet connection", e);
	    return;
	  }

	  window.provider.on("accountsChanged", (accounts) => {
	    getAccountWalletConnect();
	  });

	  // Subscribe to chainId change
	  window.provider.on("chainChanged", (chainId) => {
	  	//console.log('chainId=', chainId);
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
	index:0,
	
	init: async function(){
		let await_array = new Array();
		for (let i=0; i < this.rpc_list.length; i++){
			await_array.push( new Web3(new Web3.providers.HttpProvider(this.rpc_list[i])) );
		}
		this.web3js_list = await Promise.all(await_array);

	},

	get: function(){
			let ret_val = this.web3js_list[this.index];
			this.index++;
			if (this.index > 3) this.index = 0;
			return ret_val;
	}

}


async function initWeb3jsReader(callback=null){
	if (!window.web3js_reader){
		window.web3js_reader = await new Web3(new Web3.providers.HttpProvider(infura_endpoint[window.chainId]));
	}	
	//and in any case
	if (callback) callback(window.web3js_reader); 

}


function isWeb3Connected(){
	
	if (isMetaMaskInstalled()){
		 return true
	}
	else{ 
		return !!window.provider;
	}
	
}


async function connectWeb3(){
	if (isMetaMaskInstalled()){
			//console.log('metamask installed');
			window.ethereum.autoRefreshOnNetworkChange = false;
			getAccount();

			
		 	window.ethereum.on('accountsChanged', function(accounts){
		  		getAccount();
		  	});

		  	window.ethereum.on('chainChanged', (chainId) => {
		  	//console.log('chainId=', chainId);
		  		if (chainId == '0x2a') window.location.replace('https://debank.cyclops.game');
		 		window.location.reload();
			});

			

	} else {

		//try to connect with something built-in, like Opera
		try{
			await window.web3.currentProvider.enable();
			if (window.web3.currentProvider.isConnected()){
				window.provider =  window.web3.currentProvider;
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
  if(window.provider.close) {
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

async function toggleWeb3Connect(){
	if (isMetaMaskInstalled()) return; //do nothing, we just use metamask


	
	if (!isWeb3Connected()){ 	//connect to mobile wallet
		await connectWeb3();
		if (isWeb3Connected()){ 
			walletButton.classList.remove('web3-disconnected');
			walletButton.classList.add('web3-connected');
		}

		return;
	} else {		//disconnect from mobile wallet
		await onUniversalDisconnect();
		if (!isWeb3Connected()){ 
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

	console.log('update data call, action =',action);

	await userObject.load(); //only once, userObject controls it

	if (!action){ //only when loaded
		getTotalDashboard( ()=>{document.getElementById('debank_load_bar').ldBar.set(35);});
		
		getDepositsDashboard( ()=>{document.getElementById('debank_load_bar').ldBar.set(100);} );	
		
		getCreditsDashboard( ()=>{document.getElementById('debank_load_bar').ldBar.set(75);} );
		
		getLiquidityDashboard( ()=>{document.getElementById('debank_load_bar').ldBar.set(45);});
		
		

		//getFamersDashboard();
	} else if (action == 'make_deposit'){		
		getDepositsDashboard();
	} else if (action == 'withdraw_deposit'){
		getDepositsDashboard();
	} else if (action == 'withdraw_deposit_reward'){
		getDepositsDashboard();
	} else if (action == 'get_credit'){
		getCreditsDashboard();
	}  else if (action == 'set_leverage'){
		getCreditsDashboard();
	} else if (action == 'unfreeze_leverage'){
		getCreditsDashboard();
	} else if (action == 'return_credit'){
		getCreditsDashboard();
	} else if (action == 'return_fee'){
		getCreditsDashboard();
	} else if (action == 'stake_liq'){
		getLiquidityDashboard();
	}

}





function loginAdmin(){
  	
	const msgParams = [
	    {
	      type: 'string',
	      name: 'Authorization',
	      value: 'Sign to confirm your access to admin wallet'
	    },
	    {
	      type: 'string',
	      name: 'Timestamp',
	      value: Math.floor(Date.now()/100000).toString()
	    },
	    { type: 'uint32',
	      name: 'Randon number for extra security',
	      value: Math.floor(Math.random() * 100000000)
		}
  	];
  	

  	window.ethereum
  	 .request({
  	 	method:'eth_signTypedData',
  	 	params: [msgParams, userObject.account]
  	 })
  	 .then((result) => {
  	 	encr_message = result;
  	 	
  	 	checkAdminAuthentification(msgParams, encr_message,'admin.php');
  	 })
  	 .catch((error) => {
  	 	if (error.code === 4001){
  	 		errorMsg('we need you to sign message to get admin access');
  	 	} else {
  	 		//console.error(error);
  	 	}
  	 })
  
}


function updTotalsTable(){
  	
	const msgParams = [
	    {
	      type: 'string',
	      name: 'Authorization',
	      value: 'Sign to confirm your access to admin wallet'
	    },
	    {
	      type: 'string',
	      name: 'Timestamp',
	      value: Math.floor(Date.now()/100000).toString()
	    },
	    { type: 'uint32',
	      name: 'Randon number for extra security',
	      value: Math.floor(Math.random() * 100000000)
		}
  	];
  	

  	window.ethereum
  	 .request({
  	 	method:'eth_signTypedData',
  	 	params: [msgParams, userObject.account]
  	 })
  	 .then(async (result) => {
  	 	encr_message = result;
  	 	safeSetInnerHTMLById('total_tokens_balance', 'Updating, please stay on page..');
  	 	let new_totals_tab = await buildTotalDashboard();
  	 	
  	 	checkAdminAuthentification(msgParams, encr_message,'upd_totals.php',{var_name:"totals_tab", var_value: new_totals_tab});
  	 })
  	 .catch((error) => {
  	 	if (error.code === 4001){
  	 		errorMsg('we need you to sign message to get admin access');
  	 	} else {
  	 		//console.error(error);
  	 	}
  	 })
  
}

function checkAdminButton(token){
	//admin functions work only with MM
	if (!isMetaMaskInstalled()) return;

  	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	
	var raw = JSON.stringify({"wallet_id":userObject.account});
	

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  redirect: 'follow'
	};

	fetch(WALLETS_API_URL+'/get_wallet_type', requestOptions)
	  .then(response => {	
	  						if (response.status !== 200){
	  							throw new Error(response.status);
	  						} else {
	  							return response.clone().json();
	  						}
	  						
	  					})
	  .then(respJson => {
	  						var wallet_type = respJson.type;
	  						if (wallet_type == "admin") {
								if (document.getElementById("adminButton")){
		  							document.getElementById("adminButton").style.display = "block";
									document.getElementById("adminButton").addEventListener("click", loginAdmin);
								}

								if (document.getElementById("upd_totals")){
		  							document.getElementById("upd_totals").style.display = "block";
									document.getElementById("upd_totals").addEventListener("click", updTotalsTable);
								}
	  						}
	  						
	  					})
	  .catch(error => 	{
	  						//console.log("get wallet type error:"+error);

	  					});    	
}

function setWalletPref(pref){

//console.log('pref_window_account=',userObject.account);
	
  	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	
	var raw = JSON.stringify({"wallet_id":userObject.account, page_id: pref.page_id});
	

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  keepalive: true
	  //redirect: 'follow'
	};

	fetch(WALLETS_API_URL+'/set_wallet_pref', requestOptions)
	  .then(response => {	
	  						if (response.status !== 200){
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
	  .catch(error => 	{
	  						errorMsg("set wallet preferences error");

	  					});    	
}

async function getWalletPref(){

//console.log('pref_window_account=',userObject.account);
	
  	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	
	var raw = JSON.stringify({"wallet_id":userObject.account});
	

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw
	  //redirect: 'follow'
	};

	await fetch(WALLETS_API_URL+'/get_wallet_pref', requestOptions)
	  .then(response => {	
	  						if (response.status !== 200){
	  							throw new Error(response.status);
	  						} else {
	  							return response.clone().json();
	  						}
	  						
	  					})
	  .then(respJson => {
	  						var type = respJson.type;
	  						if (type == "success") {
								
								if (!respJson.value.page_id){
									userObject.state.current_page_id ='dashboard-tab';
								} else {
									userObject.state.current_page_id = respJson.value.page_id;
								}
								
								//console.log('current pref', respJson.value)
								
	  						} else {

	  							userObject.state.current_page_id = 'dashboard-tab';
	  							//console.log("getting wallet preferences error");
	  						}
	  						
	  					})
	  .catch(error => 	{
	  						//console.log("get wallet preferences error");
	  						userObject.state.current_page_id ='dashboard-tab';
	  					});    	
}

function checkAdminAuthentification(msg_params, encr_message, php_script, extra_data = null){
		
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({"wallet_id":userObject.account, msg_params: msg_params, encrypted_message: encr_message});
		

		var requestOptions = {
		  method: 'POST',
		  headers: myHeaders,
		  body: raw,
		  redirect: 'follow'
		};

		fetch(WALLETS_API_URL+'/check_signed_message', requestOptions)
		  .then(response => {	
		  						if (response.status !== 200){
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
		  						
		  						postAndRedirect(window.location.href+php_script,postData); 

		  					})
		  .catch(error => 	{
		  						//console.log("admin authentification failure:"+error);
		  						errorMsg('This wallet does not have admin access');
		  					});    	
}


function postAndRedirect(url, postData){

    var postFormStr = "<form method='POST' action='" + url + "'>\n";

    for (var key in postData){
        if (postData.hasOwnProperty(key)){
            postFormStr += "<input type='hidden' name='" + key + "' value='" + postData[key] + "'></input>";
        }
    }

    postFormStr += "</form>";

    var formElement = $(postFormStr);

    $('body').append(formElement);
    $(formElement).submit();
}




function assetNFTUrlByName(asset_name){
	return NFT_ROOT_URL+'/'+asset_name+'.json';
}


async function getBackendParameter(var_name, callback = null){
 
     
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
 
 

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  await fetch(WALLETS_API_URL+'/get_var/'+var_name, requestOptions)
    .then(response => { 
                if (response.status !== 200){
                  throw new Error(response.status);
                } else {
                  return response.clone().json();
                }
                
              })
    .then(respJson => {
                
                if (respJson.type == "success"){
               		
					resetMsg();
					if (callback) callback(respJson.var);


                } else {
					errorMsg('API error');
                
                         
                }
                

               
              })
    .catch(error =>   {
                 //console.log(error);
                
              });     
}

async function initFamersRegisterContract(callback = null){
	
	if (!window.famers_register_smartcontract){
		     
		if (window.web3js){
			window.famers_register_smartcontract = await new window.web3js.eth.Contract(famers_register_abi, window.famers_register_contract_address); 
			if (callback) callback(window.famers_register_smartcontract);
		}
		
	} else {
		if (callback) callback(window.famers_register_smartcontract);
	}
} 



async function initFamersRegisterContractReader(callback = null){
	
	if (!window.famers_register_smartcontract_reader){
		     
		//if (window.web3js_reader){
			let reader = web3jsReadersList.get();
			window.famers_register_smartcontract_reader = await new reader.eth.Contract(famers_register_abi, window.famers_register_contract_address); 
			if (callback) callback(window.famers_register_smartcontract_reader);
		//}
		
	} else {
		if (callback) callback(window.famers_register_smartcontract_reader);
	}
} 


async function initDataProviderContractReader(callback = null){
	
	if (!window.data_provider_smartcontract_reader){
		     
		//if (window.web3js_reader){
			window.data_provider_smartcontract_reader = await new (web3jsReadersList.get()).eth.Contract(data_provider_abi, window.data_provider_contract_address); 
			
			//window.data_provider_smartcontract_reader = await new window.web3js_reader.eth.Contract(data_provider_abi, window.data_provider_contract_address); 
			if (callback) callback(window.data_provider_smartcontract_reader);
		//}
		
	} else {
		if (callback) callback(window.data_provider_smartcontract_reader);
	}
} 

function getSmartContractFamerProfile(getProfileIdCallback, setDetailsCallback){
	if (getProfileIdCallback() == 0){
		 infoMsg('please select profile');
		 return;
	}
	
	getSmartcontractFamerProfileDetails(getProfileIdCallback, setDetailsCallback);
}

async function getSmartcontractFamerProfileDetails(getProfileIdCallback, setDetailsCallback){
  
   	var profile_id = getProfileIdCallback()-1;

 
	initFamersRegisterContract(async (famersContractInstance) => {
	      
      	let prof_details = await famersContractInstance.methods.famers(profile_id).call({from:userObject.account});
		
		let json_details = {};
		json_details['famer_token_address'] = prof_details[0];
		json_details['sold'] = rev_to_bool[prof_details[1]];
		json_details['sold_for'] = prof_details[2];
	
		
		setDetailsCallback(json_details);
	  
	});
}

async function getFamersList(){


	let flist = new Array();
	   			
	let profiles_len = await window.famers_register_smartcontract_reader.methods.famersLength().call({from:userObject.account});

	
	for(let i=0; i< profiles_len; i++){
		
		let option = {};
		option.text = await window.famers_register_smartcontract_reader.methods.getFamerName(i).call({from:userObject.account});
		
		let json_path = await window.famers_register_smartcontract_reader.methods.getFamerUri(i).call({from:userObject.account});
		let response = await fetch('https://cors-proxy.etna.network/?url='+json_path);
		let json_content = await response.json();
		

		option.value = i+1;
		option.selected = false;
		option.f_id = i;
		option.description = json_content.description;
		option.imageSrc = json_content.image;
		
		flist.push(option);
	}

	window.famers = flist;	

	return flist;
}

async function getDepositProfilesList(){ //for dropdown

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
	
	for(let i=0; i< userObject.deposit_profiles.length; i++){
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
		
		option.value =  JSON.stringify(json_details);
		option.selected = false;
		option.description = '';
		option.imageSrc = '';

		plist.push(option);
	}
	return plist;
	
}

async function getCreditProfilesList(){ //for dropdown
	

	let plist = new Array();

	
	
	for(let i=0; i< userObject.credit_profiles.length; i++){
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
		
		option.value =  JSON.stringify(json_details);
		option.selected = false;
		option.description = '';
		option.imageSrc = '';

		plist.push(option);
	}
	return plist;

	
	
}

async function getCreditProfilesListCredit(){ //for dropdown
	
	let full_list = await getCreditProfilesList();

	let plist = new Array();

	/*if (!userObject.credit_profiles){
    		userObject.credit_profiles = await getAllCreditProfiles();
    	} else {
    		
    }*/
    //all except NFT, we do not give credits in NFT
	for(let i=0; i< full_list.length; i++){
		if (full_list[i].c_type == ERC721_TOKEN) continue;
		plist.push(full_list[i]);
	}    
	return plist;

	
}

async function initDepositProfilesDropdown(){
	var ddData = await getDepositProfilesList();


	$('#depprofiles-dropdown').ddslick({
	    data:ddData,
	    width: '16vw',
	    selectText: "Select Asset",
	    imagePosition:"left",
	     
	    onSelected: function(selectedData){
	        //callback function: do something with selectedData;
	       userObject.state.selected_depprofile = selectedData.selectedData.p_id;
	       userObject.state.selected_depprofile_name = selectedData.selectedData.text;
	       userObject.state.selected_depprofile_type = selectedData.selectedData.d_type;
	       userObject.state.selected_depprofile_token_address = selectedData.selectedData.d_tok_addr;
	       if (selectedData.selectedData.text == 'nft'){
	       	 //errorMsg("NFTs are not curently supported"); return;
	       	 document.getElementById('assets-dropdown').style.display = "inline";
	       	 document.getElementById('tokens_amount').style.display="none";  
	       	 document.getElementById('approve_button').style.display = "block";
	       	 if (userObject.state.selectedNFTAssets.length > 0){
	       	 	document.getElementById('usd_value').style.display="inline";
	       	 	document.getElementById('usd_value_label').style.display="inline";
	       	 	updUSDValue('-','usd_value');
	       	 } else {
	       	 	document.getElementById('usd_value').style.display="none";
	       	 	document.getElementById('usd_value_label').style.display="none";
	       	 }
	       	 //document.getElementById('usd_value').style.display="inline";
	       	 //document.getElementById('usd_value_label').style.display="inline";
	       	 document.getElementById('nft_assets_list_div').style.display="block";
	       	 //updUSDValue('-','usd_value');
	       } else {
	       	 if (selectedData.selectedData.d_type == NATIVE_ETHEREUM){
	       	 	document.getElementById('approve_button').style.display = "none";
	       	 } else {
	       	 	document.getElementById('approve_button').style.display = "block";
	       	 }

	       	 document.getElementById('assets-dropdown').style.display="none";
	       	 //console.log('h=', document.querySelectorAll("#depprofiles-dropdown > .dd-select")[0].offsetHeight);
	       	 document.getElementById('tokens_amount').style.height = (document.querySelectorAll("#depprofiles-dropdown > .dd-select")[0].offsetHeight).toString()+'px'; 
	       	 document.getElementById('tokens_amount').style.display="inline";
	       	 document.getElementById('usd_value').style.height = (document.querySelectorAll("#depprofiles-dropdown > .dd-select")[0].offsetHeight).toString()+'px'; 
	       	 document.getElementById('usd_value').style.display="inline";
	       	  document.getElementById('usd_value_label').style.display="inline";
	       	 document.getElementById('nft_assets_list_div').style.display="none";
	       	 updUSDValue('tokens_amount','usd_value');
	       }
	    }   
	});

}

async function initCreditProfilesDropdown(){
	var ddData = await getCreditProfilesList();


	$('#credprofiles-dropdown').ddslick({
	    data:ddData,
	    width: '16vw',
	    selectText: "Select Collateral",
	    imagePosition:"left",
	     
	    onSelected: async function(selectedData){
	        //callback function: do something with selectedData;
	       resetMsg();
	       if (selectedData.selectedData.p_id ==  userObject.state.getcredit_profile){
	       	  	userObject.state.selected_credprofile = selectedData.selectedData.p_id;
	       		errorMsg("assets for collateral and credit should be different");
	       		document.getElementById('tokens_amount_getcredit').value ='';
	       		document.getElementById('tokens_amount_getcredit').style.display = 'none';
	       		return;
	       }
	       userObject.state.selected_credprofile = selectedData.selectedData.p_id;
	       userObject.state.selected_credprofile_name = selectedData.selectedData.text;
	       userObject.state.selected_credprofile_type = selectedData.selectedData.c_type;
	       userObject.state.selected_credprofile_token_address = selectedData.selectedData.c_tok_addr;
	       
	       	 document.getElementById('tokens_amount_collateral').value = depAmountByProfileId(userObject.state.selected_credprofile)[1];
	       	 document.getElementById('tokens_amount_collateral').style.height = (document.querySelectorAll("#credprofiles-dropdown > .dd-select")[0].offsetHeight).toString()+'px'; 
	       	 document.getElementById('tokens_amount_collateral').style.display="inline";
	       	 document.getElementById('collateral_full_part').style.height = document.getElementById('tokens_amount_collateral').style.height;
	       	 document.getElementById('collateral_full_part').style.display="inline";
	       	
	       	 document.getElementById('usd_value_collateral').style.height = (document.querySelectorAll("#credprofiles-dropdown > .dd-select")[0].offsetHeight).toString()+'px'; 
	       	 document.getElementById('usd_value_collateral').style.display="inline";
	       	 document.getElementById('usd_value_label_collateral').style.display="inline";
	       	 
	       	 await updUSDValueCollateral('tokens_amount_collateral','usd_value_collateral', depAmountByProfileId(userObject.state.selected_credprofile)[0]);

	       	// if  (document.getElementById('tokens_amount_getcredit').style.display == "inline") {
	       	if (userObject.state.getcredit_profile != -1){
	       		
	       	 	document.getElementById('tokens_amount_getcredit').value = await calcTokensFromUSD(userObject.state.getcredit_profile,document.getElementById('usd_value_collateral').value);
	       	 	let apy = await window.usage_calc_smartcontract_reader.methods.calcVarApy(userObject.state.getcredit_profile, userObject.state.selected_credprofile).call({ from: userObject.account});
			   	let apy_adj = (apy / apy_scale)*100;			
		       	document.getElementById('credit_perc').value = ((parseFloat(apy_adj)).toFixed(2)).toString(); 
	        }
	       
	    }   
	});

}

async function initGetCreditDropdown(){
	var ddData = await getCreditProfilesListCredit();


	$('#getcredit-dropdown').ddslick({
	    data:ddData,
	    width: '16vw',
	    selectText: "Get Credit In",
	    imagePosition:"left",
	     
	    onSelected: async function(selectedData){
	        //callback function: do something with selectedData;
	        //console.log('selected_credprofile=', userObject.state.selected_credprofile, selectedData.selectedData.p_id);
	       resetMsg();
	       if (selectedData.selectedData.p_id ==  userObject.state.selected_credprofile){
	       		userObject.state.getcredit_profile = selectedData.selectedData.p_id;
	       		errorMsg("assets for collateral and credit should be different");
	       		document.getElementById('tokens_amount_getcredit').value ='';
	       		document.getElementById('tokens_amount_getcredit').style.display = 'none';
	       		return;
	       }
	       userObject.state.getcredit_profile = selectedData.selectedData.p_id;
	       /*window.getcredit_name = selectedData.selectedData.text;
	       window.getcredit_type = selectedData.selectedData.c_type;
	       window.getcredit_token_address = selectedData.selectedData.c_tok_addr;*/
	      
	       document.getElementById('tokens_amount_getcredit').value = await calcTokensFromUSD(userObject.state.getcredit_profile,document.getElementById('usd_value_collateral').value);
	       document.getElementById('tokens_amount_getcredit').style.height = (document.querySelectorAll("#getcredit-dropdown > .dd-select")[0].offsetHeight).toString()+'px'; 
	       document.getElementById('tokens_amount_getcredit').style.display="inline";
	       
	       if (userObject.state.selected_credprofile != -1){
		       document.getElementById('credit_perc_label').style.display="inline";
		       document.getElementById('credit_perc').style.display="inline";
		       document.getElementById('set_var_credit').style.display="inline";
		       document.getElementById('set_fixed_credit').style.display="inline";
			   
			  
	      
		       let apy = await window.usage_calc_smartcontract_reader.methods.calcVarApy(userObject.state.getcredit_profile, userObject.state.selected_credprofile).call({ from: userObject.account});
			   let apy_adj = (apy / apy_scale)*100;			
		       document.getElementById('credit_perc').value = ((parseFloat(apy_adj)).toFixed(2)).toString(); 
		    }

	       //document.getElementById('credit_perc_div').style.height = (document.getElementById('getcredit_button').offsetHeight).toString()+'px';
	     
	    }   
	});

}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

async function initFamersDropdowns(){
	var ddData = await getFamersList();


	$('#famer-dropdown1').ddslick({
	    data:ddData,
	    width: '16vw',
	    selectText: "Select Famer",
	    imagePosition:"left",
	     
	    onSelected: function(selectedData){
	        //callback function: do something with selectedData;
	       window.famer = selectedData.selectedData.f_id;
	    }   
	});

	document.getElementById('famer-dropdown1').setAttribute( 'style', 'position:absolute !important; right: 7vw! important' );
	

}

async function getNFTAssets(){

	let flist = new Array();

	   			
	let len = await window.cyclops_nft_smartcontract_reader.methods.balanceOf(userObject.account).call({from:userObject.account});

	
	for(let i=0; i< len; i++){
		let t_id = await window.cyclops_nft_smartcontract_reader.methods.tokenOfOwnerByIndex(userObject.account,i).call({from:userObject.account}); 
		let token_uri = await window.cyclops_nft_smartcontract_reader.methods.tokenURI(t_id).call({from:userObject.account}); 
		
		let response = await fetch(token_uri);
		let json_content = await response.json();

		
		let option = {};
		option.text = json_content.name;
		option.t_id = t_id;

		option.value = i+1;
		option.selected = false;
		option.description = t_id;//json_content.description;
		option.imageSrc = json_content.image;
		
		flist.push(option);
	}
				
	return flist;
}

async function initAssetsDropdown(){
	if (!window.ddData)
		window.ddData = await getNFTAssets();

	$('#assets-dropdown').ddslick({
	    data:window.ddData,
	    width: '16vw',

	    selectText: "Select NFTs",
	    imagePosition:"left",
	     
	    onSelected: function(selectedData){
	    	let asset = {};
	    	asset.text = selectedData.selectedData.text;
	    	asset.t_id = selectedData.selectedData.t_id;
	      	
	      	assetAdd(asset);

	        //callback function: do something with selectedData;
	        
	     
	    }   
	});
	document.getElementById('assets-dropdown').style.display = "none";
}

async function getLiqTerms(){

	let lterms = new Array();

	let terms = [
		{text: '1 week', code: '1W'},
		{text: '2 weeks', code: '2W'},
		{text: '1 month', code: '1M'}
	];
	
	for(let i=0; i< terms.length; i++){
		

		let option = {};
		option.text = terms[i].text;
		option.code = terms[i].code;

		option.value = i+1;
		option.selected = false;
		option.description = '';
		option.imageSrc = '';
		
		lterms.push(option);
	}
				
	return lterms;
}

async function getLiqPairs(){

	let lpairs = new Array();

	let pairs = [
		{text: 'BNB-ST1', addr: '0xc5b5b56e9ba3b43a3960d8b48ac7fcdc535dc80e'},
		{text: 'BNB-ST2', addr: '0xf5f7ac1821beaba18e690298fe9c681d4a1971a4'}
	];
	
	for(let i=0; i< pairs.length; i++){
		

		let option = {};
		option.text = pairs[i].text;
		option.addr = pairs[i].addr;

		option.value = i+1;
		option.selected = false;
		option.description = '';
		option.imageSrc = '';
		
		lpairs.push(option);
	}
				
	return lpairs;
}

async function initLiqTermsDropdown(){
	

	/*if (!userObject.deposit_profiles_liqpairs){
    	userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
    } else {
    		
    }*/

	$('#liqterms-dropdown').ddslick({
	    data:userObject.liq_terms,
	    width: '16vw',

	    selectText: "Select Period",
	    imagePosition:"left",
	     
	    onSelected: async function(selectedData){
	    	let liqterm = {};
	    	liqterm.text = selectedData.selectedData.text;
	    	liqterm.code = selectedData.selectedData.code;


	      	
	      	userObject.state.liq_pair_fullcode = userObject.state.liq_pair_name+'-'+liqterm.code;
	     	let apy_str = await unswAPYStrByProfileName(userObject.state.liq_pair_fullcode);
			if (!apy_str){
				errorMsg('cannot find APY for pair');
				return;
			}
			safeSetInnerHTMLById('liq_pair_apy', apy_str+' APY', 'inline');

	        //callback function: do something with selectedData;
	        
	     
	    }   
	});
	document.getElementById('liqterms-dropdown').setAttribute( 'style', 'font-size: 0.5em !important; margin:0 !important; padding: 0 !important;' );
	(document.querySelectorAll("#liqterms-dropdown > .dd-select"))[0].style.height = '4vh'; 
	(document.querySelectorAll("#liqterms-dropdown > .dd-select"))[0].style.width = '8vw'; 
	(document.querySelectorAll("#liqterms-dropdown > .dd-select"))[0].style.margin = '0'; 
	(document.querySelectorAll("#liqterms-dropdown.dd-container"))[0].style.height = '4vh'; 
	(document.querySelectorAll("#liqterms-dropdown.dd-container"))[0].style.width = '8vw'; 
	(document.querySelectorAll("#liqterms-dropdown.dd-container"))[0].style.margin = '0'; 
	
}

async function initLiqPairsDropdown(){
	

	$('#liqpairs-dropdown').ddslick({
	    data: userObject.liq_pairs,
	    width: '16vw',

	    selectText: "Select Pair",
	    imagePosition:"left",
	     
	    onSelected: async function(selectedData){
	    	let liqpair = {};
	    	liqpair.text = selectedData.selectedData.text;
	    	liqpair.addr = selectedData.selectedData.addr;

	    //console.log('liqpair=',liqpair);
	    	
	    	userObject.state.liq_pair_name = liqpair.text;
	    	userObject.state.liq_pair_address = liqpair.addr;
	    	let bal = await getWalletBalanceStr(userObject.state.liq_pair_address);
			safeSetInnerHTMLById('liq_pair_in_wallet', bal+' in wallet', 'inline');
	      	

	      	userObject.state.liq_pair_fullcode = null;
			safeSetInnerHTMLById('liq_pair_apy', '', 'inline');
			safeSetValueById('liq_pair_stake_am','1','inline');

			$('#liqterms-dropdown').ddslick('destroy');
			initLiqTermsDropdown();
	      	
	     
	    }   
	});
	document.getElementById('liqpairs-dropdown').setAttribute( 'style', 'font-size: 0.5em !important; margin:0 !important; padding: 0 !important;' );
	(document.querySelectorAll("#liqpairs-dropdown > .dd-select"))[0].style.height = '4vh'; 
	(document.querySelectorAll("#liqpairs-dropdown > .dd-select"))[0].style.width = '8vw'; 
	(document.querySelectorAll("#liqpairs-dropdown > .dd-select"))[0].style.margin = '0'; 
	(document.querySelectorAll("#liqpairs-dropdown.dd-container"))[0].style.height = '4vh'; 
	(document.querySelectorAll("#liqpairs-dropdown.dd-container"))[0].style.width = '8vw'; 
	(document.querySelectorAll("#liqpairs-dropdown.dd-container"))[0].style.margin = '0'; 
	
}

function assetAdd(asset){
	for (let i=0; i < userObject.state.selectedNFTAssets.length; i++){
		if (userObject.state.selectedNFTAssets[i].t_id == asset.t_id) return;
	}
	userObject.state.selectedNFTAssets.push(asset);
	
	let html = '';
	for (let i=0; i < userObject.state.selectedNFTAssets.length; i++){
		html += '<span class="box-span" onclick="assetRemove('+userObject.state.selectedNFTAssets[i].t_id+')">'+userObject.state.selectedNFTAssets[i].text+'['+userObject.state.selectedNFTAssets[i].t_id+']</span>';
	}
	document.getElementById('nft_assets_list').innerHTML = html;
	document.getElementById('nft_assets_list').style.display = "block";
	if (userObject.state.selectedNFTAssets.length > 0){
		document.getElementById('usd_value_label').style.display="inline";
		document.getElementById('usd_value').style.display="inline";
		updUSDValue('-','usd_value');
	}
	
}

function assetRemove(t_id){
	for (let i=0; i < userObject.state.selectedNFTAssets.length; i++){
		if (userObject.state.selectedNFTAssets[i].t_id == t_id){
			userObject.state.selectedNFTAssets.splice(i,1);
			break;
		} 
	}
	
	
	let html = '';
	for (let i=0; i < userObject.state.selectedNFTAssets.length; i++){
		html += '<span class="box-span" onclick="assetRemove('+userObject.state.selectedNFTAssets[i].t_id+')">'+userObject.state.selectedNFTAssets[i].text+'['+userObject.state.selectedNFTAssets[i].t_id+']</span>';
	}
	document.getElementById('nft_assets_list').innerHTML = html;
	if (userObject.state.selectedNFTAssets.length > 0){
		 document.getElementById('nft_assets_list').style.display = "block";
		 document.getElementById('usd_value_label').style.display="inline";
		 document.getElementById('usd_value').style.display="inline";
		 updUSDValue('-','usd_value');
	}
	else{
		 document.getElementById('nft_assets_list').style.display = "none";
		 $('#assets-dropdown').ddslick('destroy');
		 initAssetsDropdown();
		 document.getElementById('assets-dropdown').style.display = "inline";	
		 document.getElementById('usd_value').style.display="none";
	     document.getElementById('usd_value_label').style.display="none";
	}
	
}


async function getTotalDashboard(callback = null){

	let html;
	await getBackendParameter('totals_tab',(content) => {
		html = content;	
	});
	
	safeSetInnerHTMLById('total_tokens_balance', html);

	if (callback) callback();
}

async function buildTotalDashboard(){
		let stakingContractInstance;
		await initStakingContract((contract) => {
			stakingContractInstance = contract;
		});

		let creditContractInstance;
		await initCreditContract((contract) => {
			creditContractInstance = contract;
		});
		
		

		let html = 
									'<table class="table" style="font-size: 0.75em">'+
									 '<thead>'+
									    '<tr style="text-align:left">'+
									      '<th></th>'+ //icon
									      '<th>Assets</th>'+
									      '<th>Total Deposits</th>'+	
										  '<th>Total Borrowed</th>'+	
									      '<th>Deposit APY<sup>*</sup></th>'+
									      '<th>Variable<br>Borrow APR<sup>*</sup></th>'+
									      '<th>Fixed<br>Borrow APR<sup>*</sup></th>'+
									   '</tr>'+
									  '</thead>'+ 
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
		
		for (let i = 0; i < profiles.length; i++){
			icon_column.push('<td>'+crypto_icons[profiles[i]['p_name']]+'</td>');
			asset_column.push('<td>'+profiles[i]['p_name']+'</td>');
			let dep_stat = await stakingContractInstance.methods.depositsStat(parseInt(profiles[i]['p_id'])).call({from:userObject.account});
			let dep_total = dep_stat[0];
			if (parseInt(profiles[i]['p_dep_type']) != ERC721_TOKEN)
			 	dep_total = window.web3js_reader.utils.fromWei(dep_total, 'ether');
			let dep_total_str = ((parseFloat(dep_total)).toFixed(3)).toString();  

			dep_column.push('<td>'+dep_total_str+'</td>');
			/*
			let extr_dep_total = dep_stat[1];
			if (parseInt(profiles[i]['p_dep_type']) != ERC721_TOKEN)
			 	extr_dep_total = window.web3js_reader.utils.fromWei(extr_dep_total, 'ether');

			let extr_dep_total_str = ((parseFloat(extr_dep_total)).toFixed(3)).toString();  
			extractable_dep_col.push('<td>'+extr_dep_total_str+'</td>');

			let rew_total = window.web3js_reader.utils.fromWei(dep_stat[2], 'ether');
			let rew_total_str = ((parseFloat(rew_total)).toFixed(3)).toString();  
			reward_col.push('<td>'+rew_total_str+'</td>');

			let extr_rew_total = window.web3js_reader.utils.fromWei(dep_stat[3], 'ether');
			let extr_rew_total_str = ((parseFloat(extr_rew_total)).toFixed(3)).toString();  
			extractable_reward_col.push('<td>'+extr_rew_total_str+'</td>');
			*/
			let cred_stat = await creditContractInstance.methods.creditsStat(parseInt(profiles[i]['p_id'])).call({from:userObject.account});
			let cred_total = cred_stat[0];
			//let fee_total = cred_stat[1];
			if (parseInt(profiles[i]['p_dep_type']) != ERC721_TOKEN)
			 	cred_total = window.web3js_reader.utils.fromWei(cred_total, 'ether');
			let cred_total_str = ((parseFloat(cred_total)).toFixed(3)).toString();  
			cred_column.push('<td>'+cred_total_str+'</td>');

			/*fee_total = window.web3js_reader.utils.fromWei(fee_total, 'ether'); 
			let fee_total_str = ((parseFloat(fee_total)).toFixed(3)).toString(); 
			fee_column.push('<td>'+fee_total_str+'</td>');*/
		}

		
		


		let usage_contract;
		await initUsageCalcContractReader((contract) => {
			usage_contract = contract;
		});

		
		let apy_column = new Array();
		for (let j = 0; j < profiles.length; j++){
			let apy_str;
			
			let apy = parseInt(profiles[j]['init_apy']);
			let rate = parseInt(profiles[j]['rate']);
			let rate_real = rate  / apy_scale; 
			let apy_real = apy  / apy_scale; 
			let usage = await usage_contract.methods.getAssetUsage(profiles[j]['p_id']).call({from:userObject.account});
			let usage_real = usage / apy_scale;
			apy_real = apy_real + rate_real * usage_real;

			apy_str = ((apy_real*100).toFixed(3)).toString()+'%';
			
			apy_column.push('<td>'+apy_str+'</td>');
		}


		let apr_column = new Array();
		for (let i = 0; i < profiles.length; i++){
			let max_apr =0.0;
			let min_apr = 999.0;
			for (let j = 0; j < profiles.length; j++){
	        	
				let apr = await window.usage_calc_smartcontract_reader.methods.calcVarApy(profiles[i]['p_id'], profiles[j]['p_id']).call({ from: userObject.account});
				let apr_adj = (apr / apy_scale)*100;
				if (max_apr < apr_adj) max_apr = apr_adj;
				if (min_apr > apr_adj) min_apr = apr_adj;
			}
			//from: '+((parseFloat(min_apr)).toFixed(2)).toString()+'<br>'
			apr_column.push('<th scope="row">'+((parseFloat(max_apr)).toFixed(2)).toString()+ '</th>');
		}

		let apr_fix_column = new Array();
		for (let i = 0; i < profiles.length; i++){
			let max_apr =0.0;
			let min_apr = 999.0;
			for (let j = 0; j < profiles.length; j++){
	        	
				let apr = await window.usage_calc_smartcontract_reader.methods.calcFixedApy(profiles[i]['p_id'], profiles[j]['p_id']).call({ from: userObject.account});
				let apr_adj = (apr / apy_scale)*100;
				if (max_apr < apr_adj) max_apr = apr_adj;
				if (min_apr > apr_adj) min_apr = apr_adj;
			}
			
			//from: '+((parseFloat(min_apr)).toFixed(2)).toString()+'<br>'
			apr_fix_column.push('<th scope="row">'+((parseFloat(max_apr)).toFixed(2)).toString()+ '</th>');
		}

		/*
		let earned_column = new Array();
		await stakingContractInstance.getPastEvents('CustomerWithdrawDepositRewardById', {	fromBlock: 0, toBlock: 'latest'})
				.then(function(events){
				   for (let i = 0; i < profiles.length; i++){
				   		let flag = false;
				   		
				   		let v = new BN(0);
						events.forEach(function(item) {
							
							if (profiles[i]['p_id'] == item.returnValues.profile_id){
								v =v.add(new BN(item.returnValues.reward));
								flag = true;
							
							}
														
						});
						

						if (flag){
							let vf = window.web3js_reader.utils.fromWei(v, 'ether');
							let f = (parseFloat(vf)).toFixed(3);
							earned_column.push('<td>'+f.toString()+'</td>');
						} else {
							earned_column.push('<td>-</td>');
						}
						
						
					}
				})
				.catch(error => 	{
		  			errorMsg('cannot get events from smartcontract');
		});       
	      */

	

		
		
		for (let i = 0; i < profiles.length; i++){
            //0 means max amount for ERC20 compatible and ignored for ERC721
             	html += '<tr style="text-align: left; font-size: 0.75em">';
            	
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
        

				      	

		html +=	'</tbody>'+
			'</table>';

		html += '<span style="inline; font-size: 50%; "><sup>*</sup> Expected value, based on current system state shown: effective APY depends also on asset usage data, effective APR depends on collateral and credit asset and asset usage data.</span>'

	    return html;


}

async function getFamersDashboard(){
	await getFamersList();

	//** need to work here with votes calc contract
	initStakingContract(async (stakingContractInstance) => {
		

		let html = 
									'<table class="table" style="font-size: 0.75em">'+
									 '<thead>'+
									    '<tr style="text-align:left">'+
									      '<th>Famer</th>'+
									      '<th>Votes</th>'+
									   '</tr>'+
									  '</thead>'+ 
									  '<tbody>';

	    let famers_table = new Array(window.famers.length);
	
    	
    	for (let i = 0; i < window.famers.length; i++){
    		famers_table[i] = {};
    		famers_table[i]["name"]= '<td>'+window.famers[i].text+'</td>';
    	}

    	
    	for (let i = 0; i < window.famers.length; i++){
    		let v = await stakingContractInstance.methods.getFamerVoteByFamer(i).call({from:userObject.account});
    		famers_table[i]["dig_v"]= v;
    		famers_table[i]["vote"] = '<td>'+v.toString()+'</td>';
    	}

    	famers_table.reverse((a,b) =>{ 
    				if (a.dig_v < b.dig_v) return -1;
    				if (a.div_v == b.dig_v) return 0;
    				return 1; 
    			});
    	
		
		for (let i = 0; i < window.famers.length; i++){
            //0 means max amount for ERC20 compatible and ignored for ERC721
             	html += '<tr style="text-align: left; font-size: 0.75em">';
            
            	html += famers_table[i]["name"];

            	html += famers_table[i]["vote"];
	          
	           
              	html += '</tr>';
    	}
        

				      	

		html +=	'</tbody>'+
			'</table>';

	    safeSetInnerHTMLById('famers_votes', html)
	});

}

async function getAllProfiles(){
	
	let profiles;
	await getBackendParameter('DEPPROFILES_UI_LIST',(profiles_s) => {
		profiles = JSON.parse(profiles_s);	
	});
	return profiles;

}

async function getAllProfilesWithUniswap(){
	
	let profiles;
	await getBackendParameter('ASSETS_UI_FULL_LIST',(profiles_s) => {
		profiles = JSON.parse(profiles_s);	
	});
	return profiles;

}

async function getAllProfilesUniswap(){
	let profiles;
	await getBackendParameter('ASSETS_UI_LIQ_PAIRS',(profiles_s) => {
		profiles = JSON.parse(profiles_s);	
	});
	return profiles;

}

async function getAllCreditProfiles(){ //for dropdown
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
	await getBackendParameter('CREDIT_PROFILES_UI_LIST',(profiles_s) => {
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

function depTypeByProfileId(profile_id){
	for (let i = 0; i < userObject.deposit_profiles.length; i++){
		if (userObject.deposit_profiles[i].p_id == profile_id){
			return parseInt(userObject.deposit_profiles[i].p_dep_type);
		}
	}
	return BAD_DEPOSIT_PROFILE_ID;
}

function tokenAddressByProfileId(profile_id){
	

	for (let i = 0; i < userObject.deposit_profiles.length; i++){
		if (userObject.deposit_profiles[i].p_id == profile_id){
			return userObject.deposit_profiles[i].p_tok_addr;
		}
	}
	return zero_address;
}

function profileNameByProfileId(profile_id){
	

	for (let i = 0; i < userObject.deposit_profiles.length; i++){
		if (userObject.deposit_profiles[i].p_id == profile_id){
			return userObject.deposit_profiles[i].p_name;
		}
	}
	return BAD_DEPOSIT_PROFILE_ID;
}


async function unswAPYStrByProfileName(profile_name){
	if (!userObject.deposit_profiles_liqpairs){
    	userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
    } else {
    		
    }

	for (let i = 0; i < userObject.deposit_profiles_liqpairs.length; i++){
		if (userObject.deposit_profiles_liqpairs[i].p_name == profile_name){
			let apy = parseInt(userObject.deposit_profiles_liqpairs[i].init_apy);
			let apy_real = apy / apy_scale;
			apy_str = ((apy_real*100).toFixed(1)).toString()+'%';
			return apy_str;
		}
	}
	return null;
}


async function unswIDByProfileName(profile_name){
	if (!userObject.deposit_profiles_liqpairs){
    	userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
    } else {
    		
    }

	for (let i = 0; i < userObject.deposit_profiles_liqpairs.length; i++){
		if (userObject.deposit_profiles_liqpairs[i].p_name == profile_name){
			return parseInt(userObject.deposit_profiles_liqpairs[i].p_id);
			
		}
	}
	return null;
}


async function unswProfileNameByProfileId(profile_id){
	if (!userObject.deposit_profiles_liqpairs){
    	userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
    } else {
    		
    }

	for (let i = 0; i < userObject.deposit_profiles_liqpairs.length; i++){
		if (userObject.deposit_profiles_liqpairs[i].p_id == profile_id){
			return userObject.deposit_profiles_liqpairs[i].p_name;
		}
	}
	return null;
}

async function unswDepTypeByProfileId(profile_id){
	if (!userObject.deposit_profiles_liqpairs){
    	userObject.deposit_profiles_liqpairs = await getAllProfilesUniswap();
    } else {
    		
    }

	for (let i = 0; i < userObject.deposit_profiles_liqpairs.length; i++){
		if (userObject.deposit_profiles_liqpairs[i].p_id == profile_id){
			return parseInt(userObject.deposit_profiles_liqpairs[i].p_dep_type);
		}
	}
	return BAD_DEPOSIT_PROFILE_ID;
}

async function getCreditsDashboard(callback = null){


		let html = 
									'<table class="table" style="font-size: 0.75em">'+
									 '<thead>'+
									    '<tr style="text-align:left">'+
									      '<th></th>'+
									      '<th>Asset</th>'+
									      '<th>Borrowed<br>amount</th>'+
									      '<th class="hide_for_set_leverage_panel">USD value</th>'+
									      '<th class="hide_for_set_leverage_panel">Collateral</th>'+
									      '<th class="hide_for_credit_return_panel">Duration<br>days</th>'+
									      '<th>Curent<br>APR<sup>*</sup></th>'+
									      '<th>Fee</th>'+
									      '<th>Leverage<br>Level</th>'+
									      '<th>Cover Fees<br>with CYTR<br>Leverage</th>'+
									      '<th class="set_leverage_panel set_leverage_panel_header" style="display:none"><button class="transparent_button"  onclick="hide_set_leverage()">Hide</button></th>'+								     
									      '<th class="hide_for_set_leverage_panel">Repay<br>borrow</th>'+
									      '<th class="credit_return_panel credit_return_panel_header" style="display:none"><button class="transparent_button"  onclick="hide_return_credit()">Hide</button></th>'+
									      '<th class="hide_for_credit_return_panel tab-vert-line-left">In wallet</th>'+
									      '<th class="hide_for_credit_return_panel">Deposit</th>'+
									     '</tr>'+
									  '</thead>'+ 
									  '<tbody>';
	
    	//let profiles = userObject.deposit_profiles;
    	
		
		let [am_arr,cred_arr,clt_arr] = await Promise.all([	userObject.deposits.getAmArr(),
															userObject.credits.getCredArr(),
															userObject.credits.getCltArr()]);
    	

		let [lev_arr, lev_ratio_arr] = await userObject.credits.getLevArr();

		
		
		let [[icon_column, asset_column],
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
			  set_leverage_inputs_col,
			  return_credit_col,
			  return_credit_inputs_col] = await Promise.all([ userObject.credits.getIconAssetsCols(),
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
			  												  userObject.credits.getSetLevInputsCol(),
			  												  userObject.credits.getReturnCreditCol(),
			  												  userObject.credits.getReturnCreditInputsCol()]);

	
		
		
		for (let i=0; i < cred_arr[0].length; i++){ //i == credit id
            

				if (cred_arr[1][i] >0 || cred_arr[2][i] >0 || lev_arr[i] >0){            	

	             	html += '<tr style="text-align: left; font-size: 0.75em">';

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

		            html += set_leverage_inputs_col[i];
		            
		            html += return_credit_col[i];
		         
		            html += return_credit_inputs_col[i];

		            html += in_wallet_column[i];

		            html += dep_column[i];
	           
	        	}
	        

	           
              	html += '</tr>';
    	}
        

				      	

		html +=	'</tbody>'+
			'</table>';

		html += '<span style="inline; font-size: 60%; "><sup>*</sup> Effective current credit APR, based on all conditions, incl. Leverage</span>'
	
	    safeSetInnerHTMLById('my_credits', html)
	
	    if (callback) callback();
}


async function getLiquidityDashboard(callback = null){

//	initStakingContract(async (stakingContractInstance) => {
		stakingContractInstance = window.staking_smartcontract;

		let html = 
									'<table class="table" style="font-size: 0.75em">'+
									 '<thead>'+
									    '<tr style="text-align:left">'+
									      '<th></th>'+	
									      '<th>liquidity-Pair</th>'+
									     
									      //'<th>In wallet</th>'+
									      '<th>Quantity</th>'+
									      '<th>Lockup</th>'+
									      '<th>Days till<br>Withdraw</th>'+
									      '<th>USD value</th>'+
									      '<th>APY</th>'+
									      '<th class="withdraw_rew_to_hide">Duration<br>days</th>'+
									      '<th class="withdraw_rew_to_hide">Extractable</th>'+
									      '<th class="withdraw_rew_to_hide">Withdraw<br>deposit</th>'+
									      '<th class="withdraw_params" style="display:none"><button class="transparent_button"  onclick="hide_withdraw_deposit()">Hide</button></th>'+
									      '<th class="withdraw_params_to_hide" >Current<br>Yield<br>CYTR</th>'+
									      '<th class="withdraw_params_to_hide" >Extractable<br>Yield<br>CYTR</th>'+
									      '<th class="withdraw_params_to_hide" >Withdraw<br>Yield</th>'+
									      '<th class="withdraw_reward_params" style="display:none"><button class="transparent_button"  onclick="hide_withdraw_reward()">Hide</button></th>'+
									   '</tr>'+
									  '</thead>'+ 
									  '<tbody>';

		let profiles = userObject.deposit_profiles;

		let [am_arr,rew_arr] = await Promise.all([	userObject.deposits.getAmArr(),
													userObject.deposits.getRewArr()
													]);

    	
		
		let [[icon_column, asset_column, lockup_period],
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
			  withdraw_rew_inputs_col 			] = await Promise.all( [userObject.liq_earn.getIconAssetLockupCols(),
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
									 									userObject.liq_earn.getWithdrawRewInputsCol() ]);


		

/*
		let withdraw_rew_col = new Array();
		for (let i = 0; i < am_arr[0].length; i++){
			if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
			if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
				let txt = '';
				
				if (rew_arr[2][i] > 0){
	    			let lbl='';
	    			txt =  '<td class="withdraw_params_to_hide" onclick="withdraw_reward('+i.toString()+')"><span class="iconify" data-icon="emojione-v1:money-bag" data-inline="false"></span>'+lbl+'</td>';
	    		} else {
	    			txt =  '<td class="withdraw_params_to_hide">-</td>'; 
	    		}
		      
		        withdraw_rew_col.push(txt);
		    }
		}



		let withdraw_rew_inputs_col = new Array();
		for (let i = 0; i < am_arr[0].length; i++){
			if (am_arr[1][i] == 0 && rew_arr[1][i] == 0) continue;
			if ((await unswDepTypeByProfileId( am_arr[0][i])) == UNISWAP_PAIR ){
				let txt = '';
				
		        if (rew_arr[2][i] > 0){    	
	    			txt = '<td class="withdraw_reward_params" style="display:none">';
	    			txt += '<div style="display:block; margin-top: 1vh;"></div>'
	    			txt += '<button id="withdraw_rew_confirm'+i.toString()+'" class="transparent_button withdraw_rew_input" style="display:none;width: 10vw" onclick="withdraw_reward_confirm('+i.toString()+')">Confirm</button>';
	    			txt += '</td>'; 
	    		} else {
	    			txt =  '<td class="withdraw_reward_params" style="display:none">-</td>'; 
	    		}
	    		

		        withdraw_rew_inputs_col.push(txt);
		    }
		}
*/
		

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
		let withdraw_rew_inputs_col_s = new Array(icon_column.length);

		//console.log('usd_val_only_col before sort', usd_val_only_col);
		usd_val_only_col.sort((a, b) => parseInt(b.val) - parseInt(a.val));
		//console.log('usd_val_only_col', usd_val_only_col);

		for (let i = 0; i < icon_column.length; i++){
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
			withdraw_rew_inputs_col_s[i] = withdraw_rew_inputs_col[old_index];
		}
		
		for (let i = 0; i < icon_column.length; i++){
            //0 means max amount for ERC20 compatible and ignored for ERC721
             	html += '<tr style="text-align: left; font-size: 0.75em">';
            
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

	           	html += withdraw_rew_inputs_col_s[i];
	           
              	html += '</tr>';
    	}
        

				      	

		html +=	'</tbody>'+
			'</table>';

	    safeSetInnerHTMLById('deposits_uniswap', html)
		if (callback) callback();

}


async function getDepositsDashboard(callback = null){



		let html = 
									'<table class="table" style="font-size: 0.75em">'+
									 '<thead>'+
									    '<tr style="text-align:left">'+
									      '<th></th>'+	
									      '<th>Asset</th>'+
									     
									      '<th>In wallet</th>'+
									      '<th>Deposit</th>'+
									      '<th>USD value</th>'+
									      '<th>APY</th>'+
									      '<th class="withdraw_rew_to_hide">Duration<br>days</th>'+
									      '<th class="withdraw_rew_to_hide">Extractable</th>'+
									      '<th class="withdraw_rew_to_hide">Withdraw<br>deposit</th>'+
									      '<th class="withdraw_params" style="display:none"><button class="transparent_button"  onclick="hide_withdraw_deposit()">Hide</button></th>'+
									      '<th class="withdraw_params_to_hide" >Current<br>Yield</th>'+
									      '<th class="withdraw_params_to_hide" >Extractable<br>Yield</th>'+
									      '<th class="withdraw_params_to_hide" >Withdraw<br>Yield</th>'+
									      '<th class="withdraw_reward_params" style="display:none"><button class="transparent_button"  onclick="hide_withdraw_reward()">Hide</button></th>'+
									   '</tr>'+
									  '</thead>'+ 
									  '<tbody>';

									  
		let profiles = userObject.deposit_profiles;
    	

		let [am_arr,rew_arr] = await Promise.all([	userObject.deposits.getAmArr(),
													userObject.deposits.getRewArr() ]);

		//let rew_arr = await userObject.deposits.getRewArr();
		
		let [	[icon_column, asset_column],
				apy_column,
				in_wallet_column,
				dep_column,
				[usd_val_column,usd_val_only_col],
				duration_col,
				extractable_dep_col,
				withdraw_dep_col,
				withdraw_dep_inputs_col,
				reward_col,
				extractable_reward_col,
				withdraw_rew_col,
				withdraw_rew_inputs_col ] = await Promise.all( [ 	userObject.deposits.getIconAssetsCols(),
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
																	userObject.deposits.getWithdrawRewCol(),
																	userObject.deposits.getWithdrawRewInputsCol() ]);
	
		
		

		

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
		let withdraw_rew_inputs_col_s = new Array(profiles.length);

		usd_val_only_col.sort((a, b) => parseInt(b.val) - parseInt(a.val));
		

		for (let i = 0; i < profiles.length; i++){
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
			withdraw_rew_inputs_col_s[i] = withdraw_rew_inputs_col[old_index];
		}
		
		for (let i = 0; i < profiles.length; i++){
            //0 means max amount for ERC20 compatible and ignored for ERC721
             	html += '<tr style="text-align: left; font-size: 0.75em">';
            
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

	           	html += withdraw_rew_inputs_col_s[i];
	           
              	html += '</tr>';
    	}
        

				      	

		html +=	'</tbody>'+
			'</table>';

	    safeSetInnerHTMLById('tokens_balance', html)
		
		if (callback) callback();

}


function openTab(event,tabid){
	safeHideBySelector('.tabcontent');
	safeRemoveClassBySelector(".tab-menu", "menu-selected");
 	event.srcElement.classList.add("menu-selected"); 
	document.getElementById(tabid).style.display = "block";	
	userObject.state.current_page_id = tabid;
}


async function updUSDValue(tokens_amount_elem, usd_val_elem){
		
		let contract = window.data_provider_smartcontract_reader;

		if (userObject.state.selected_depprofile_type == NATIVE_ETHEREUM){
			

			let tokens_amount = document.getElementById(tokens_amount_elem).value;
			let BN = window.BN;
			let wei_amount = safeFloatToWei(tokens_amount); //BN
			let [data, dec] = await Promise.all([ contract.methods.getData('BNBUSD').call({from:userObject.account}), contract.methods.getDecimals('BNBUSD').call({from:userObject.account})]);
			
			let usd_bn = new BN(wei_amount.mul(new BN(data) ));
			//console.log('usd_bn', usd_bn.toString());
			let base = new BN(10);
			let div_dec = new BN(base.pow(new BN(dec)));	
			let usd_adj = new BN( usd_bn.div(div_dec));	
			//console.log('usd_adj', usd_adj.toString());
			let usd_float = parseFloat(window.web3js_reader.utils.fromWei(usd_adj, 'ether'));
			safeSetValueById(usd_val_elem,usd_float.toFixed(3),'inline');	
		} else if (userObject.state.selected_depprofile_type == ERC721_TOKEN){
			let vc_contract;
			await initVotesCalcContractReader(async (c) => {
				vc_contract = c;
			});

			let token_ids = new Array();
		    for (let i=0; i < userObject.state.selectedNFTAssets.length; i++){
		 		token_ids.push(parseInt(userObject.state.selectedNFTAssets[i].t_id));
		 	}
		 	let BN = window.BN;

		 	let wei_am = await vc_contract.methods.calcNFTTokensValue(token_ids).call({from:userObject.account});//cytr
		 	let wei_amount = new BN(wei_am);
		 	
		 	let [data, dec] = await Promise.all([ contract.methods.getData('ETNAUSD').call({from:userObject.account}), contract.methods.getDecimals('ETNAUSD').call({from:userObject.account})]);
			
		 	//let data = await contract.methods.getData('CYTRUSD').call({from:userObject.account});
			//let dec = await contract.methods.getDecimals('CYTRUSD').call({from:userObject.account});
			let usd_bn = new BN(wei_amount.mul(new BN(data) ));
			//console.log('usd_bn', usd_bn.toString());
			let base = new BN(10);
			let div_dec = new BN(base.pow(new BN(dec)));	
			let usd_adj = new BN( usd_bn.div(div_dec));	
			//console.log('usd_adj', usd_adj.toString());
			let usd_float = parseFloat(window.web3js_reader.utils.fromWei(usd_adj, 'ether'));
			safeSetValueById(usd_val_elem,usd_float.toFixed(3),'inline');	

		} else if (userObject.state.selected_depprofile_type == ERC20_TOKEN || userObject.state.selected_depprofile_type == UNISWAP_PAIR){
			let tokens_amount = document.getElementById(tokens_amount_elem).value;
			let BN = window.BN;
			let wei_amount = safeFloatToWei(tokens_amount); //BN

			let [data, dec] = await Promise.all([contract.methods.getData(userObject.state.selected_depprofile_name).call({from:userObject.account}), contract.methods.getDecimals(userObject.state.selected_depprofile_name).call({from:userObject.account})]);  
			//let data = await contract.methods.getData(userObject.state.selected_depprofile_name).call({from:userObject.account});
			//let dec = await contract.methods.getDecimals(userObject.state.selected_depprofile_name).call({from:userObject.account});
			let usd_bn = new BN(wei_amount.mul(new BN(data) ));
			//console.log('usd_bn', usd_bn.toString());
			let base = new BN(10);
			let div_dec = new BN(base.pow(new BN(dec)));	
			let usd_adj = new BN( usd_bn.div(div_dec));	
			//console.log('usd_adj', usd_adj.toString());
			let usd_float = parseFloat(window.web3js_reader.utils.fromWei(usd_adj, 'ether'));
			safeSetValueById(usd_val_elem,usd_float.toFixed(3),'inline');	
		}
		

}

async function updUSDValueCollateral(tokens_amount_elem, usd_val_elem,dep_id){
		let am_arr = userObject.deposits.am_arr;
		//console.log('am_arr[1][dep_id]=',dep_id, am_arr[1][dep_id]);

		let tokens_amount = document.getElementById(tokens_amount_elem).value;
		//console.log('tokens_amount=',tokens_amount);
		let BN = window.BN;
		let wei_amount = 0;
		if (parseInt(userObject.state.selected_credprofile_type) != ERC721_TOKEN){
			wei_amount = safeFloatToWei(tokens_amount); //BN
		} else {
			wei_amount = new BN(tokens_amount);
		}
		
		let dep_am = new BN(am_arr[1][dep_id]);
		
		if (wei_amount.cmp(dep_am) == 1 ){
			
			let tok_float = 0;
			if (parseInt(userObject.state.selected_credprofile_type) != ERC721_TOKEN){
			 	tok_float = parseFloat(window.web3js_reader.utils.fromWei(am_arr[1][dep_id], 'ether'));
			} else {
				tok_float = am_arr[1][dep_id];
			}
			safeSetValueById(tokens_amount_elem,tok_float.toFixed(3),'inline');	
			wei_amount = am_arr[1][dep_id];
		} 

		//let data = await contract.methods.calcUSDValueCollateral(userObject.account, dep_id.toString(), wei_amount.toString()).call({from: userObject.account});
		console.log('userObject.state.selected_credprofile=',userObject.state.selected_credprofile);
		console.log('param= ',userObject.account,dep_id,wei_amount.toString(),userObject.state.selected_credprofile);
		//param=  0xddc58f7839a71787eb94211bc922e0ae2bfb5501 9 4 6
		let usd_val = await window.usage_calc_smartcontract_reader.methods.calcUSDValueCollateral(userObject.account,dep_id,wei_amount,userObject.state.selected_credprofile).call({ from: userObject.account});
		
		
		safeSetValueById(usd_val_elem,usd_val,'inline');	

		if (userObject.state.getcredit_profile != -1){
	       		
	       	 	document.getElementById('tokens_amount_getcredit').value = await calcTokensFromUSD(userObject.state.getcredit_profile,document.getElementById('usd_value_collateral').value);
	    }	

}


async function calcUSDValueOfDeposit(wei_amount, dep_id){
	let usd_val = await window.usage_calc_smartcontract_reader.methods.calcUSDValue(userObject.account,dep_id,wei_amount).call({ from: userObject.account});
	//console.log('usd_val',usd_val);
	return usd_val["est_usd"];
}

async function calcUSDValueByProfileNonNFT(wei_amount, profile_id){
	//console.log('calc usd', profile_id);
	//return 0;
	if (profileNameByProfileId(profile_id) == 'nft') return 0;
	let usd_val = await window.usage_calc_smartcontract_reader.methods.calcUSDValueByProfileNonNFT(profile_id, wei_amount ).call({ from: userObject.account});
	
	return usd_val;
}


function compensate_with_leverage(cred_id){
	show_set_leverage(cred_id);
}

function hide_set_leverage(){
	$('.set_leverage_panel').hide();
	$('.hide_for_credit_return_panel').show();
	
	$('.hide_for_credit_return_panel').show();
	$('.hide_for_set_leverage_panel').show();
	window.lev_size_wei = 0;
}

function show_set_leverage(cred_id){

	$('.hide_for_credit_return_panel').hide();
	$('.hide_for_set_leverage_panel').hide();
	$('.set_leverage_panel').hide();
	$('#set_leverage_panel'+cred_id.toString()).show();
	$('.set_leverage_panel_header').show();
	window.lev_size_wei = 0;

}

async function set_leverage_confirm(cred_id){
	// function freezeLeverageForCredit(address cust_wallet, uint32 dep_id, uint32 cred_id, uint256 lev_amount) nonReentrant public  

	if (userObject.credits.cred_arr[1][cred_id] ==  0){
		infoMsg("no active credit");
		return;
	}

	if (!(document.getElementById('set_leverage_credit_25'+'_'+cred_id.toString()).classList.contains('transparent_button_pressed') ||
		document.getElementById('set_leverage_credit_50'+'_'+cred_id.toString()).classList.contains('transparent_button_pressed') ||
		document.getElementById('set_leverage_credit_75'+'_'+cred_id.toString()).classList.contains('transparent_button_pressed') ||
		document.getElementById('set_leverage_credit_100'+'_'+cred_id.toString()).classList.contains('transparent_button_pressed')) ){
		infoMsg("leverage not set");
		return;
	}

	let ratio = 0;
	if (document.getElementById('set_leverage_credit_25'+'_'+cred_id.toString()).classList.contains('transparent_button_pressed')) ratio = 25
	else if (document.getElementById('set_leverage_credit_50'+'_'+cred_id.toString()).classList.contains('transparent_button_pressed') ) ratio = 50
	else if (document.getElementById('set_leverage_credit_75'+'_'+cred_id.toString()).classList.contains('transparent_button_pressed')) ratio = 75
	else if (document.getElementById('set_leverage_credit_100'+'_'+cred_id.toString()).classList.contains('transparent_button_pressed')) ratio = 100;	

	initLiqLevContract(async (contractInstance) => {

		let lev = await contractInstance.methods.viewCustomerLeverageByCredId(userObject.account, cred_id).call({from:userObject.account});
		
		if (lev.lev_amount > 0){
			infoMsg("you need to unfreeze current leverage first");
			return;
		}


		let cytr_profile_id = await getCYTRProfileId();

		let res_arr = depAmountByProfileIdReal(cytr_profile_id);
		let dep_id = res_arr[0];
		let cytr_am = res_arr[1];
	
 		
		let cytr_am_bn = new BN(cytr_am);

		if (window.lev_size_wei.cmp(cytr_am_bn) == 1) {
			infoMsg("not enough CYTR on deposit");
			return;
			
		}

		
	    contractInstance.methods.freezeLeverageForCredit(userObject.account, dep_id, cred_id,  ratio).send( {from: userObject.account, gasPrice: window.gp }, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash)
			
	    })
	    .on('confirmation', function(confirmationNumber, receipt){
				if (confirmationNumber == 5) updateData('set_leverage');
				resetMsg();

		})
		.catch(error => 	{
				errorMsg('smartcontract communication error');
			
		});   

	      
	});
}

async function unfreeze_leverage(cred_id){
	// function freezeLeverageForCredit(address cust_wallet, uint32 dep_id, uint32 cred_id, uint256 lev_amount) nonReentrant public  

	/*if (userObject.credits.cred_arr[1][cred_id] ==  0){
		infoMsg("no active credit");
		return;
	}*/

	initLiqLevContract(async (contractInstance) => {

		
	    contractInstance.methods.unfreezeLeverageForCredit(userObject.account, cred_id).send({from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash)
			
	    })
	    .on('confirmation', function(confirmationNumber, receipt){
				if (confirmationNumber == 5) updateData('unfreeze_leverage');
				resetMsg();

		})
		.catch(error => 	{
				errorMsg('smartcontract communication error');
			
		});   

	      
	});
}

function return_credit(dep_id){
	//alert(dep_id);
	show_return_credit(dep_id);
}

function hide_return_credit(){
	$('.credit_return_panel').hide();
	
	$('.hide_for_credit_return_panel').show();
}

function show_return_credit(cred_id){
	$('.hide_for_credit_return_panel').hide();
	$('.credit_return_panel').hide();
	$('#credit_return_panel'+cred_id.toString()).show();
	$('.credit_return_panel_header').show();
	
	//$('#credit_return_input'+dep_id.toString()).show();
	//$('#credit_return_input'+dep_id.toString()).show();
	//$('.withdraw_params_to_hide').show();

}

function withdraw_reward(dep_id){
	hide_withdraw_reward(dep_id);
	$('.withdraw_reward_params').show();
	
	$('#withdraw_rew_confirm'+dep_id.toString()).show();
	$('.withdraw_rew_to_hide').hide();
}

function withdraw_deposit(dep_id){
	hide_withdraw_deposit(dep_id);
	$('.withdraw_params').show();
	$('#withraw_dep_input'+dep_id.toString()).show();
	$('#withraw_dep_all'+dep_id.toString()).show();
	$('#withraw_dep_part'+dep_id.toString()).show();
	$('#withraw_dep_confirm'+dep_id.toString()).show();
	//$('#withraw_dep_rew'+dep_id.toString()).show();

	$('.withdraw_params_to_hide').hide();

	if (document.getElementById('withraw_dep_input'+dep_id.toString()))
		document.getElementById('withraw_dep_input'+dep_id.toString()).readOnly = true;
}

function hide_withdraw_deposit(dep_id){
	$('.withdraw_params').hide();
	$('.withdraw_dep_input').hide();
	$('.withdraw_params_to_hide').show();
}

function hide_withdraw_reward(dep_id){
	$('.withdraw_reward_params').hide();
	$('.withdraw_rew_input').hide();
	$('.withdraw_rew_to_hide').show();
}

function depAmountByProfileId(profile_id){
	for (let i=0; i < userObject.deposits.am_arr[0].length; i++){
    	if (userObject.deposits.am_arr[0][i] == profile_id){
    		let am = userObject.deposits.am_arr[1][i];
    		if (depTypeByProfileId(profile_id) !== ERC721_TOKEN){
    			am = window.web3js_reader.utils.fromWei(am, 'ether');
    		}
    		return ([i,am]); 		
    	}
	}
	return [BAD_DEPOSIT_ID,0];
}

function depAmountByProfileIdReal(profile_id){
	for (let i=0; i < userObject.deposits.am_arr[0].length; i++){
    	if (userObject.deposits.am_arr[0][i] == profile_id){
    		let am = userObject.deposits.am_arr[1][i];
    		
    		return ([i,am]); 		
    	}
	}
	return [BAD_DEPOSIT_ID,0];
}


async function calcTokensFromUSD(cred_profile_id,amount_usd){
	// function calcFromUSDValue(uint256 usd_value, uint256 profile_id) public view returns(uint256 est_tokens)
	let tokens = await window.usage_calc_smartcontract_reader.methods.calcFromUSDValue(amount_usd, cred_profile_id).call({ from: userObject.account});	
	let n_tokens = window.web3js_reader.utils.fromWei(tokens, 'ether');
	return ((parseFloat(n_tokens)).toFixed(4)).toString(); 
}

function withdraw_deposit_confirm(dep_id){
	if (userObject.deposits.am_arr[2][dep_id] ==  0){
		infoMsg("deposit is not currently exractable");
		return;
	}

	let whole = true;
	if (document.getElementById('withraw_dep_all'+dep_id.toString())){
		whole = document.getElementById('withraw_dep_all'+dep_id.toString()).classList.contains('transparent_button_pressed');
	}
	
	let withdraw_amount = 0;
	if (whole){
		withdraw_amount = 0; //doesn't matter, smartcontract will extract whole deposit amount;
	} else {
		withdraw_amount = safeFloatToWei(document.getElementById('withraw_dep_input'+dep_id.toString()).value);

	}
	
	initStakingContract(async (stakingContractInstance) => {

		
	    stakingContractInstance.methods.withdrawDepositById(userObject.account, dep_id, withdraw_amount, whole).send({from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash)
			
	    })
	    .on('confirmation', function(confirmationNumber, receipt){
				if (confirmationNumber == 5) updateData('withdraw_deposit');
				resetMsg();

		})
		.catch(error => 	{
				errorMsg('smartcontract communication error');
			
		});   

	      
	});

}

async function return_credit_mvtokens(cred_id){
	if (userObject.credits.cred_arr[1][cred_id] ==  0){
		infoMsg("no active credit");
		return;
	}

	let whole = true;
	if (document.getElementById('return_credit_all'+cred_id.toString())){
		whole = document.getElementById('return_credit_all'+cred_id.toString()).classList.contains('transparent_button_pressed');
	}
	
	let return_amount = 0;
	if (whole){
		return_amount = userObject.credits.cred_arr[1][cred_id]; //doesn't matter, smartcontract will extract whole deposit amount;
	} else {
		return_amount = safeFloatToWei(document.getElementById('credit_return_input'+cred_id.toString()).value);

	}

	let returned_asset_token_address = tokenAddressByProfileId(userObject.credits.cred_arr[0][cred_id]);
	approveTokenMove(returned_asset_token_address, return_amount, window.credit_contract_address);
}

async function return_fee_mvtokens(cred_id){
	if (userObject.credits.cred_arr[2][cred_id] ==  0){
		infoMsg("no active credit");
		return;
	}
		
	let	return_amount = userObject.credits.cred_arr[2][cred_id]; 
	

	let returned_asset_token_address = tokenAddressByProfileId(userObject.credits.cred_arr[0][cred_id]);
	approveTokenMove(returned_asset_token_address, return_amount, window.credit_contract_address);
}

async function return_credit_confirm(cred_id){
	if (userObject.credits.cred_arr[1][cred_id] ==  0){
		infoMsg("no active credit");
		return;
	}

	let whole = true;
	if (document.getElementById('return_credit_all'+cred_id.toString())){
		whole = document.getElementById('return_credit_all'+cred_id.toString()).classList.contains('transparent_button_pressed');
	}
	
	let return_amount = 0;
	if (whole){
		return_amount = userObject.credits.cred_arr[1][cred_id]; //doesn't matter, smartcontract will extract whole deposit amount;
	} else {
		return_amount = safeFloatToWei(document.getElementById('credit_return_input'+cred_id.toString()).value);

	}
	
	//alert(return_amount); return;
	let returned_asset_type = depTypeByProfileId(userObject.credits.cred_arr[0][cred_id]);
	let returned_asset_token_address = tokenAddressByProfileId(userObject.credits.cred_arr[0][cred_id]);

	if (returned_asset_type == NATIVE_ETHEREUM) {
		//do nothing
	} else if (returned_asset_type == ERC721_TOKEN){
		errorMsg('error: ERC721 is not possible type for credit');
		return;
	} else { //ERC20 - check approval

			let token_contract = await new window.web3js.eth.Contract(erc20TokenContractAbi, returned_asset_token_address); 
			let allow = new BN(await token_contract.methods.allowance(userObject.account,window.credit_contract_address).call({from:userObject.account}));
			

			let tokenAmountToApprove = new BN(return_amount); 
		    
		    //amount is already adjusted *10**18
		    let calculatedApproveValue = tokenAmountToApprove;//tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));
		 	

		    if (allow < calculatedApproveValue){
		    	errorMsg('please approve tokens move / wait for approval transaction to finish');
		    	return;
		    }

		    let erc20_count = await token_contract.methods.balanceOf(userObject.account).call({from:userObject.account});
		    let erc20_count_bn = new BN(erc20_count);
		    let return_amount_bn = new BN(return_amount);
		   	
		   	if (erc20_count_bn.cmp(return_amount_bn) == -1){
		   		errorMsg('you do not have enough tokens in your wallet');
				return;
		   	}
    
	}
	

	initCreditContract(async (creditContractInstance) => {

		
	    creditContractInstance.methods.returnCredit(userObject.account, cred_id, return_amount).send({from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash)
			
	    })
	    .on('confirmation', function(confirmationNumber, receipt){
				if (confirmationNumber == 5) updateData('return_credit');
				resetMsg();

		})
		.catch(error => 	{
				errorMsg('smartcontract communication error');
			
		});   

	      
	});

}

async function return_fee_confirm(cred_id){
	if (userObject.credits.cred_arr[2][cred_id] ==  0){
		infoMsg("no active credit");
		return;
	}

	
	let	return_amount = userObject.credits.cred_arr[2][cred_id];
	
	
	//alert(return_amount); return;
	let returned_asset_type = depTypeByProfileId(userObject.credits.cred_arr[0][cred_id]);
	let returned_asset_token_address = tokenAddressByProfileId(userObject.credits.cred_arr[0][cred_id]);

	if (returned_asset_type == NATIVE_ETHEREUM) {
		//do nothing
	} else if (returned_asset_type == ERC721_TOKEN){
		errorMsg('error: ERC721 is not possible type for credit');
		return;
	} else { //ERC20 - check approval

			let token_contract = await new window.web3js.eth.Contract(erc20TokenContractAbi, returned_asset_token_address); 
			let allow = new BN(await token_contract.methods.allowance(userObject.account,window.credit_contract_address).call({from:userObject.account}));
			

			let tokenAmountToApprove = new BN(return_amount); 
		    
		    //amount is already adjusted *10**18
		    let calculatedApproveValue = tokenAmountToApprove;//tokenAmountToApprove.mul(new BN(ADJ_CONSTANT.toString()));
		 	

		    if (allow < calculatedApproveValue){
		    	errorMsg('please approve tokens move / wait for approval transaction to finish');
		    	return;
		    }

		    let erc20_count = await token_contract.methods.balanceOf(userObject.account).call({from:userObject.account});
		    let erc20_count_bn = new BN(erc20_count);
		    let return_amount_bn = new BN(return_amount);
		   	
		   	if (erc20_count_bn.cmp(return_amount_bn) == -1){
		   		errorMsg('you do not have enough tokens in your wallet');
				return;
		   	}
    
	}
	

	initCreditContract(async (creditContractInstance) => {
		//console.log(userObject.account, cred_id, return_amount);
		
	    creditContractInstance.methods.returnFee(userObject.account, cred_id, return_amount).send({from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash)
			
	    })
	    .on('confirmation', function(confirmationNumber, receipt){
				if (confirmationNumber == 5) updateData('return_fee');
				resetMsg();

		})
		.catch(error => 	{
				errorMsg('smartcontract communication error');
			
		});   

	      
	});

}

function withdraw_reward_confirm(dep_id){
	
	//alert(dep_id); return;
	if (userObject.deposits.rew_arr[2][dep_id] ==  0){
		infoMsg("reward is not currently exractable");
		return;
	}
	
	initStakingContract(async (stakingContractInstance) => {

		
	    stakingContractInstance.methods.withdrawDepositRewardById(userObject.account, dep_id).send({from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash)
			
	    })
	    .on('confirmation', function(confirmationNumber, receipt){
				if (confirmationNumber == 5) updateData('withdraw_deposit_reward');
				resetMsg();

		})
		.catch(error => 	{
				errorMsg('smartcontract communication error');
			
		});   

	      
	});
}


function full_collateral_btn(dep_id){
	
	document.getElementById('full_collateral').classList.add('transparent_button_pressed');
	document.getElementById('part_collateral').classList.remove('transparent_button_pressed');
	document.getElementById('tokens_amount_collateral').value = depAmountByProfileId(userObject.state.selected_credprofile)[1];
	updUSDValueCollateral('tokens_amount_collateral','usd_value_collateral', dep_id);
	document.getElementById('tokens_amount_collateral').readOnly = true;


}

function part_collateral_btn(dep_id){
	
	document.getElementById('full_collateral').classList.remove('transparent_button_pressed');
	document.getElementById('part_collateral').classList.add('transparent_button_pressed');
	document.getElementById('tokens_amount_collateral').value = 0.;
	updUSDValueCollateral('tokens_amount_collateral','usd_value_collateral', dep_id);
	document.getElementById('tokens_amount_collateral').readOnly = false;

}


function return_credit_all_btn(dep_id){

	//alert(dep_id);
	document.getElementById('return_credit_all'+dep_id.toString()).classList.add('transparent_button_pressed');
	document.getElementById('return_credit_part'+dep_id.toString()).classList.remove('transparent_button_pressed');
	//let am = window.web3js_reader.utils.fromWei(userObject.credits.cred_arr[1][dep_id], 'ether');
    let adj_am =  toTokens(userObject.credits.cred_arr[1][dep_id],4);//((parseFloat(am)).toFixed(4)).toString(); 
	document.getElementById('credit_return_input'+dep_id.toString()).value = adj_am;
	document.getElementById('credit_return_input'+dep_id.toString()).readOnly = true;


}

function return_credit_part_btn(dep_id){
	//alert(dep_id);
	document.getElementById('return_credit_all'+dep_id.toString()).classList.remove('transparent_button_pressed');
	document.getElementById('return_credit_part'+dep_id.toString()).classList.add('transparent_button_pressed');
	
	document.getElementById('credit_return_input'+dep_id.toString()).value = 0.;
	document.getElementById('credit_return_input'+dep_id.toString()).readOnly = false;
}

function withdraw_deposit_all_btn(dep_id){
	//alert(dep_id);
	document.getElementById('withraw_dep_all'+dep_id.toString()).classList.add('transparent_button_pressed');
	document.getElementById('withraw_dep_part'+dep_id.toString()).classList.remove('transparent_button_pressed');
	//let am = window.web3js_reader.utils.fromWei(userObject.deposits.am_arr[2][dep_id], 'ether');
    let adj_am =  toTokens(userObject.deposits.am_arr[2][dep_id],4);//((parseFloat(am)).toFixed(4)).toString(); 
	document.getElementById('withraw_dep_input'+dep_id.toString()).value = adj_am;
	document.getElementById('withraw_dep_input'+dep_id.toString()).readOnly = true;


}

function withdraw_deposit_part_btn(dep_id){
	//alert(dep_id);
	document.getElementById('withraw_dep_all'+dep_id.toString()).classList.remove('transparent_button_pressed');
	document.getElementById('withraw_dep_part'+dep_id.toString()).classList.add('transparent_button_pressed');
	document.getElementById('withraw_dep_input'+dep_id.toString()).value = 0.;
	document.getElementById('withraw_dep_input'+dep_id.toString()).readOnly = false;

}

function reorder_divs(id1, id2){
	document.getElementById(id1).style.order ="1";
	document.getElementById(id2).style.order ="2";
}

async function set_fixed_credit(){
	document.getElementById('set_fixed_credit').classList.add('transparent_button_pressed');
	document.getElementById('set_var_credit').classList.remove('transparent_button_pressed');
	let apy = await window.usage_calc_smartcontract_reader.methods.calcFixedApy(userObject.state.getcredit_profile,userObject.state.selected_credprofile).call({ from: userObject.account});
	let apy_adj = (apy / apy_scale)*100;	
	document.getElementById('credit_perc').value = ((parseFloat(apy_adj)).toFixed(2)).toString(); 
}

async function set_var_credit(){
	document.getElementById('set_fixed_credit').classList.remove('transparent_button_pressed');
	document.getElementById('set_var_credit').classList.add('transparent_button_pressed');
	let apy = await window.usage_calc_smartcontract_reader.methods.calcVarApy(userObject.state.getcredit_profile,userObject.state.selected_credprofile).call({ from: userObject.account});
	let apy_adj = (apy / apy_scale)*100;	
	document.getElementById('credit_perc').value = ((parseFloat(apy_adj)).toFixed(2)).toString(); 
}

async function set_leverage(ratio, cred_id){ //100 - 100%
	if (!(ratio == 25 || ratio ==50 || ratio ==75 || ratio == 100)) return;



	if (document.getElementById('set_leverage_credit'+'_'+ratio.toString()+'_'+cred_id.toString()).classList.contains('transparent_button_pressed') ){
		document.getElementById('set_leverage_credit'+'_'+ratio.toString()+'_'+cred_id.toString()).classList.remove('transparent_button_pressed');
		document.getElementById('lev_size_'+cred_id.toString()).value = '';
		window.lev_size_wei = 0;
		
	} else {
		document.getElementById('set_leverage_credit_25'+'_'+cred_id.toString()).classList.remove('transparent_button_pressed');
		document.getElementById('set_leverage_credit_50'+'_'+cred_id.toString()).classList.remove('transparent_button_pressed');
		document.getElementById('set_leverage_credit_75'+'_'+cred_id.toString()).classList.remove('transparent_button_pressed');
		document.getElementById('set_leverage_credit_100'+'_'+cred_id.toString()).classList.remove('transparent_button_pressed');
		document.getElementById('set_leverage_credit'+'_'+ratio.toString()+'_'+cred_id.toString()).classList.add('transparent_button_pressed');
		
		// function calcNeededLeverageByCreditSize(    uint32 credit_profile_id, uint32 lev_asset_profile_id, 
        //  uint256 credit_amount, bool is_fixed_apy) public view returns(uint256 needed_leverage)
        let cytr_profile_id = await getCYTRProfileId();
        let credit_size = userObject.credits.cred_arr[1][cred_id];//safeFloatToWei(document.getElementById('tokens_amount_getcredit').value);

        let cc = await window.credit_smartcontract.methods.viewCustomerCredit(userObject.account,0).call({ from: userObject.account});
        let cc_index = parseInt(cc['index']);
        let x = await window.credit_smartcontract.methods.viewCustomerCreditExtraDataByIndex(cc_index,cred_id).call({ from: userObject.account});


        let is_fixed_apy = x.is_fixed_apy;


		let clt_id = userObject.credits.cred_arr[4][cred_id];
    	let clt_profile_id = userObject.credits.clt_arr[0][parseInt(clt_id)];

		let lns = await window.usage_calc_smartcontract_reader.methods
				.calcNeededLeverageByCreditSize(userObject.credits.cred_arr[0][cred_id], clt_profile_id, cytr_profile_id, credit_size, is_fixed_apy).call({ from: userObject.account});
		let lev_needed_size = new BN(lns);

		if (ratio > 100 || ratio < 0) ratio = 100;
		if (ratio != 100){
			let r = new BN(ratio);
			lev_needed_size = lev_needed_size.mul(r);
			lev_needed_size = lev_needed_size.div(new BN(100));
		}
		window.lev_size_wei = lev_needed_size;


		var size_tokens = window.web3js_reader.utils.fromWei(lev_needed_size, 'ether');
	
		document.getElementById('lev_size_'+cred_id.toString()).value = ((parseFloat(size_tokens)).toFixed(2)).toString(); 
		
	}
	
}

async function getCYTRProfileId(){
	if (!userObject.deposit_profiles){
		userObject.deposit_profiles = await getAllProfiles();		
	} else {
		//
	}

	if (!window.cytr_profile_id){
		for (let i = 0; i < userObject.deposit_profiles.length; i++){
			if (userObject.deposit_profiles[i].p_name == 'CYTR'){
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

function toTokens(wei_am, digs){
	let n_tokens = floorDecimals(window.web3js_reader.utils.fromWei(wei_am, 'ether'),digs);
	return ((parseFloat(n_tokens)).toFixed(digs)).toString(); 
}

async function openExernalPool(token1, token2, liq_pair_name, liq_pair_address){
	window.open("https://pancakeswap.finance");
	safeRemoveClassBySelector(".unsw-menu", "transparent_button_pressed");
	document.getElementById(liq_pair_name).classList.add('transparent_button_pressed');
}


  
async function getWalletBalanceStr(token_address){


	let erc20contract = await new window.web3js_reader.eth.Contract(erc20TokenContractAbi, token_address); 
	let erc20_count = await erc20contract.methods.balanceOf(userObject.account).call({from:userObject.account});
	//let adj_count = floorDecimals( window.web3js_reader.utils.fromWei(erc20_count, 'ether'),3);	
	          
	let adj_count_str =  toTokens(erc20_count,3)
	return adj_count_str;
}  

async function getWalletBalance(token_address){
	if (token_address == 'BNB') {
		let wb = await window.web3js_reader.eth.getBalance(userObject.account);
		return floorDecimals(window.web3js_reader.utils.fromWei(wb, 'ether'),3);
	} else {

		let erc20contract = await new window.web3js_reader.eth.Contract(erc20TokenContractAbi, token_address); 
		let erc20_count = await erc20contract.methods.balanceOf(userObject.account).call({from:userObject.account});
		//let adj_count = floorDecimals( window.web3js_reader.utils.fromWei(erc20_count, 'ether'),3);	
		          
		let n_tokens = floorDecimals(window.web3js_reader.utils.fromWei(erc20_count, 'ether'),3);
		return n_tokens;
	}
}  

function floorDecimals(value, decimals) {   
	return Number(Math.floor(value+'e'+decimals)+'e-'+decimals); 
}


async function getAPY(profile_id){
	let profiles;
	if (!userObject.deposit_profiles){
		userObject.deposit_profiles = await getAllProfiles();
	} else {
		//
	}

	if (!window.dep_apys){
		window.dep_apys = new Array();
		for (let i=0; i< userObject.deposit_profiles.length; i++){
			window.dep_apys[ parseInt(userObject.deposit_profiles[i]['p_id']) ] = null;
		}
	}

	if (window.dep_apys[ profile_id ] ){
		return window.dep_apys[ profile_id ];
	} else {
		let apy = await window.usage_calc_smartcontract_reader.methods.calcDepApy(profile_id).call({ from: userObject.account});
		window.dep_apys[ profile_id ] = apy;
		return window.dep_apys[ profile_id ];
	}
	
}
