import Choices from 'choices.js';

const liqtermsSelectElement = document.querySelector('#liqterms-dropdown');
export const liqtermsDropdown =
  liqtermsSelectElement &&
  new Choices(liqtermsSelectElement, {
    classNames: {
      containerOuter: 'choices choices-credit',
    },
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });
