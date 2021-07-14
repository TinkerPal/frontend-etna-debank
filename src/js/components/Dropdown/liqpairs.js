import Choices from 'choices.js';

const liqpairsSelectElement = document.querySelector('#liqpairs-dropdown');
export const liqpairsDropdown =
  liqpairsSelectElement &&
  new Choices(liqpairsSelectElement, {
    classNames: {
      containerOuter: 'choices choices-credit',
    },
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });
