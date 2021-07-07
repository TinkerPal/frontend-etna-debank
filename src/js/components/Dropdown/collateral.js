const collateralSelectElement = document.querySelector(
  '#credprofiles-dropdown'
);
const collateralDropdown =
  collateralSelectElement &&
  new Choices(collateralSelectElement, {
    classNames: {
      containerOuter: 'choices choices-collateral',
    },
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });
