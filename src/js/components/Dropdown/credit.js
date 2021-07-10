import Choices from 'choices.js';

const creditSelectElement = document.querySelector('#getcredit-dropdown');
export const creditDropdown =
  creditSelectElement &&
  new Choices(creditSelectElement, {
    classNames: {
      containerOuter: 'choices choices-credit',
    },
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });
