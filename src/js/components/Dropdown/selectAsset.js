import Choices from 'choices.js';

const selectAssetSelectElement = document.querySelector(
  '#depprofiles-dropdown'
);

export const selectAssetDropdown =
  selectAssetSelectElement &&
  new Choices(selectAssetSelectElement, {
    classNames: {
      containerOuter: 'choices choices-collateral',
    },
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });
