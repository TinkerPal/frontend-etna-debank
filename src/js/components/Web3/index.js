export async function initWeb3jsReader(callback = null) {
  if (!window.web3js_reader) {
    window.web3js_reader = await new Web3(
      new Web3.providers.HttpProvider(INFURA_ENDPOINT[CHAIN_ID])
    );
  }
  // and in any case
  if (callback) callback(window.web3js_reader);
}
