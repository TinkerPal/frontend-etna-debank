import {
  modalAddCredit,
  modalAddDeposit,
  modalAddLeverage,
  modalAddLiquidity,
  modalReturnCredit,
  modalReturnFee,
  modalUnfreeze,
  modalWithdrawDeposit,
  modalWithdrawYield,
} from '../..';

export function closeAllModals() {
  const allModals = [
    modalWithdrawDeposit,
    modalWithdrawYield,
    modalAddCredit,
    modalReturnFee,
    modalReturnCredit,
    modalAddLeverage,
    modalUnfreeze,
    modalAddLiquidity,
    modalAddDeposit,
  ];

  allModals.forEach((modal) => {
    if (modal.modal) {
      modal.hideModal();
    }
  });
}
