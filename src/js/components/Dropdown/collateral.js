import Choices from 'choices.js';

const collateralSelectElement = document.querySelector(
  '#credprofiles-dropdown'
);
export const collateralDropdown =
  collateralSelectElement &&
  new Choices(collateralSelectElement, {
    classNames: {
      containerOuter: 'choices choices-collateral',
    },
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });
