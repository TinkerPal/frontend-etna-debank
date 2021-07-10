export async function approveTokenMove(
  token_address,
  amount_wei,
  toAddress,
  modal
) {
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
