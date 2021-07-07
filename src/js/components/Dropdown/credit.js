const creditSelectElement = document.querySelector('#getcredit-dropdown');
const creditDropdown =
  creditSelectElement &&
  new Choices(creditSelectElement, {
    classNames: {
      containerOuter: 'choices choices-credit',
    },
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  });
