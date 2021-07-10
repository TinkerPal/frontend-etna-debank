import Choices from 'choices.js';
import SimpleBar from 'simplebar';
import { isMobile } from '../../constants/env';
import { userObject } from '../../store';
import { toNumber } from '../../utils';
import { depositModalRebuild } from '../Modal/deposit';

const nftSelectElement = document.querySelector('#nftAssetsSelect');
export const nftAssetsSelect =
  nftSelectElement &&
  new Choices(nftSelectElement, {
    removeItemButton: true,
    callbackOnInit() {
      choiseOnInitNft(this);
    },
    callbackOnCreateTemplates(template) {
      return {
        item: (classNames, data) => {
          const value = `${data.value.text}[${data.value.t_id}]`;

          return template(/* html */ `
              <div class="${classNames.item} ${
            data.highlighted
              ? classNames.highlightedState
              : classNames.itemSelectable
          } ${
            data.placeholder ? classNames.placeholder : ''
          }" data-item data-id="${data.id}" data-value="${value}" ${
            data.active ? 'aria-selected="true"' : ''
          } ${data.disabled ? 'aria-disabled="true"' : ''} data-deletable>
                <span class="choices__item-img"><img src="${
                  data.value.imageSrc
                }"></span> ${value} - $${data.value.price}
                <button type="button" class="choices__button" aria-label="Remove item: '${value}'" data-button="">Remove item</button>
              </div>
            `);
        },
        choice: (classNames, data) => {
          const value = `${data.value.text}[${data.value.t_id}]`;

          return template(/* html */ `
              <div class="${classNames.item} ${classNames.itemChoice} ${
            data.disabled ? classNames.itemDisabled : classNames.itemSelectable
          }" data-choice ${
            data.disabled
              ? 'data-choice-disabled aria-disabled="true"'
              : 'data-choice-selectable'
          } data-id="${data.id}" data-value="${value}" ${
            toNumber(data.groupId) > 0 ? 'role="treeitem"' : 'role="option"'
          }>
                <span class="choices__item-img"><img src="${
                  data.value.imageSrc
                }"></span> ${data.label} - $${data.value.price}
              </div>
            `);
        },
      };
    },
  });

function choiseOnInitNft(choice) {
  let list =
    !isMobile &&
    new SimpleBar(choice.choiceList.element, {
      autoHide: false,
    });
  let inner =
    !isMobile &&
    new SimpleBar(choice.containerInner.element, {
      autoHide: false,
    });

  const rebuildScroll = () => {
    const currentChoices = choice._currentState.choices;

    if (!isMobile) {
      list && list.unMount();
      list = new SimpleBar(choice.choiceList.element, {
        autoHide: false,
      });
      inner && inner.unMount();
      inner = new SimpleBar(choice.containerInner.element, {
        autoHide: false,
      });
    }

    if (currentChoices) {
      const isEmpty = currentChoices.every((item) => item.selected === false);
      const isFull = currentChoices.every((item) => item.selected === true);

      if (isEmpty) {
        selectAllBtn.style.display = 'flex';
        unSelectAllBtn.style.display = 'none';
      }

      if (!isEmpty && !isFull) {
        selectAllBtn.style.display = 'flex';
        unSelectAllBtn.style.display = 'flex';
      }

      if (isFull) {
        selectAllBtn.style.display = 'none';
        unSelectAllBtn.style.display = 'flex';
      }
    }
  };

  const nftButtonsWrapper = document.createElement('div');
  nftButtonsWrapper.classList.add(
    'flex',
    'items-center',
    'w-full',
    'p-2',
    'bg-blueish-black',
    'relative'
  );
  const selectAllBtn = document.createElement('button');
  selectAllBtn.classList.add('table-btn', 'mr-2', 'nft-btn');
  selectAllBtn.innerHTML = 'Select all NFT';

  selectAllBtn.onclick = () => {
    const currentChoices = choice._currentState.choices;

    if (currentChoices.length === 0) return;

    currentChoices.forEach((item) => {
      choice.setChoiceByValue(item.value);
    });
    const values = nftAssetsSelect.getValue(true);
    userObject.state.selectedNFTAssets = values;
    depositModalRebuild();
    rebuildScroll();
    nftAssetsSelect.hideDropdown();
  };

  const unSelectAllBtn = document.createElement('button');
  unSelectAllBtn.classList.add('table-btn', 'nft-btn');
  unSelectAllBtn.innerHTML = 'Unselect all NFT';

  unSelectAllBtn.onclick = () => {
    nftAssetsSelect.removeActiveItems();
    userObject.state.selectedNFTAssets = [];
    depositModalRebuild();
    rebuildScroll();
    nftAssetsSelect.hideDropdown();
  };

  nftButtonsWrapper.appendChild(selectAllBtn);
  nftButtonsWrapper.appendChild(unSelectAllBtn);
  choice.dropdown.element.appendChild(nftButtonsWrapper);

  const eventsForRebuildScroll = [
    'change',
    'showDropdown',
    'hideDropdown',
    'addItem',
    'removeItem',
    'highlightItem',
    'unhighlightItem',
    'choice',
    'search',
    'highlightChoice',
  ];

  eventsForRebuildScroll.forEach((rebuildEvent) => {
    choice.passedElement.element.addEventListener(
      rebuildEvent,
      () => {
        setTimeout(() => {
          rebuildScroll();
        }, 0);
      },
      false
    );
  });
}
