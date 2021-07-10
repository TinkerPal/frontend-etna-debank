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
