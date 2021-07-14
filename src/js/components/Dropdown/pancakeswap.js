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
                ${
                  link
                    ? `<span class="dropdown-link"><a target="_blank" href="${link}"><img src="../images/link.svg" class="btn-link"></a></span>`
                    : ''
                }
                <span class="dropdown-text">${text}</span>
                </div>
              `);
          },
          choice: (classNames, data) => {
            const { text, link } = data.value;
            if (link === null) {
              return;
            }
            return template(/* html */ `
                <div class="${classNames.item} ${classNames.itemChoice} ${
              data.disabled
                ? classNames.itemDisabled
                : classNames.itemSelectable
            }" data-choice ${
              data.disabled
                ? 'data-choice-disabled aria-disabled="true"'
                : 'data-choice-selectable'
            } data-id="${data.id}" data-value="${text}">
            
                <span class="dropdown-link"><a target="_blank" href="${link}"><img src="../images/link-inside-li.svg" class="btn-link"></a></span>
                <span class="dropdown-text">${text}</span>
                
            </div>
              `);
          },
        };
      },
    });
  const data = [
    {
      text: 'Go to pool at Pancakeswap',
      link: null,
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
  }));
  pancakeswapDropdown.setChoices(assetSelectOptions, 'value', 'label', true);
  pancakeswapDropdown.setChoiceByValue(data[0]);
}
