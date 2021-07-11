/* eslint-disable camelcase */
import {
  errorMsg,
  output_transaction,
  successMsg,
} from '../components/InfoMessages';
import { erc20TokenContractAbi } from '../constants/web3ContractAbi';
import { userObject } from '../store/userObject';
import { toNumber } from '../utils';

/* eslint-disable camelcase */
export async function approveTokenMove(
  token_address,
  amount_wei,
  toAddress,
  modal
) {
  const tokenAmountToApprove = new window.BN(amount_wei.toString());
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
      (error, txnHash) => {
        if (error) {
          modal.isLoadedAfterApprove(false);
          throw error;
        }
        output_transaction(txnHash);
      }
    )
    .on('confirmation', (confirmationNumber) => {
      if (toNumber(confirmationNumber) === 5) {
        successMsg('Tokens move approved');
        modal.isLoadedAfterApprove();
      }
    })
    .catch((error) => {
      modal.isLoadedAfterApprove(false);
      errorMsg('Smartcontract communication error');
      throw new Error(error);
    });
}
