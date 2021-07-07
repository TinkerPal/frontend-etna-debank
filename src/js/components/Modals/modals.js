import { Modal } from '../Modal';

export const modalWithdrawDeposit = new Modal('modal-withdraw-deposit');
export const modalWithdrawYield = new Modal('modal-withdraw-reward');

export const modalReturnFee = new Modal('modal-return-fee');
export const modalReturnCredit = new Modal('modal-return-credit');
export const modalAddLeverage = new Modal('modal-set-leverage');
export const modalUnfreeze = new Modal('modal-unfreeze');
export const modalAddLiquidity = new Modal(
  'modal-add-liquidity',
  () => {
    initLiqPairsDropdown();
    initLiqTermsDropdown();
  },
  liqModalBuild
);
export const modalAddDeposit = new Modal(
  'modal-new-deposit',
  initDepositProfilesDropdown,
  () => {
    depositModalRebuild();
    depositModalUpdateNftDropdown();
  },
  null,
  depositModalUpdateNftDropdown
);

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

export function closeAllModals() {
  allModals.forEach((modal) => {
    if (modal.modal) {
      modal.hideModal();
    }
  });
}
