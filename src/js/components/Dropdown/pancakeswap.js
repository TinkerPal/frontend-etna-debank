import Choices from 'choices.js';
import { toNumber } from '../../utils';

export function initPancakeSwapDropdown() {
  const pancakeswapSelectElement = document.querySelector('#pancakeswap-poll');

  const pancakeswapDropdown =
    pancakeswapSelectElement &&
    new Choices(pancakeswapSelectElement, {
      classNames: {
        containerOuter: 'choices choices-pancakeswap',
      },
      searchEnabled: false,
      shouldSort: false,
      itemSelectText: '',
      callbackOnCreateTemplates(template) {
        return {
          item: (classNames, data) => {
            const { text, link } = data.value;

            return template(/* html */ `
                <div class="${classNames.item} ${
              data.highlighted
                ? classNames.highlightedState
                : classNames.itemSelectable
            } ${
              data.placeholder ? classNames.placeholder : ''
            }" data-item data-id="${data.id}" data-value="${text}" ${
              data.active ? 'aria-selected="true"' : ''
            } ${data.disabled ? 'aria-disabled="true"' : ''}>
                  <span class="dropdown-text">Go to pool at Pancakeswap</span>
                </div>
              `);
          },
          choice: (classNames, data) => {
            const { text, link } = data.value;
            if (link === '') {
              return template('<div class="hidden"></div> ');
            }

            return template(/* html */ `
                <a target="_blank" class="${classNames.item}" href="${link}"><img src="../images/link-inside-li.svg" class="btn-link"><span class="dropdown-text">${text}</span></a>
            `);
          },
        };
      },
    });

  const data = [
    {
      text: 'Go to pool at Pancakeswap',
      link: '',
      isDefault: true,
    },
    {
      text: 'BNB-ETNA',
      link: 'https://exchange.pancakeswap.finance/#/add/BNB/0x51F35073FF7cF54c9e86b7042E59A8cC9709FC46',
    },
    {
      text: 'BUSD-ETNA',
      link: 'https://exchange.pancakeswap.finance/#/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56/0x51F35073FF7cF54c9e86b7042E59A8cC9709FC46',
    },
    {
      text: 'ETH-ETNA',
      link: 'https://exchange.pancakeswap.finance/#/add/0x2170Ed0880ac9A755fd29B2688956BD959F933F8/0x51F35073FF7cF54c9e86b7042E59A8cC9709FC46',
    },
    {
      text: 'BTC-ETNA',
      link: 'https://exchange.pancakeswap.finance/#/add/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c/0x51F35073FF7cF54c9e86b7042E59A8cC9709FC46',
    },
  ];

  const assetSelectOptions = data.map((dataItem) => ({
    value: {
      ...dataItem,
    },
    label: `${dataItem.text}`,
    disabled: dataItem.isDefault || false,
    selected: dataItem.isDefault || false,
  }));
  pancakeswapDropdown.setChoices(assetSelectOptions, 'value', 'label', true);
}
