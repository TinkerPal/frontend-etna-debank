document.addEventListener("DOMContentLoaded", function (event) {

  // active/current tab function
  var pages = document.querySelectorAll('.page');
  var tabs = document.querySelectorAll('.nav-link');

  for (let j = 0; j < tabs.length; j++) {
    // attach event listener to all tabs
    tabs[j].addEventListener('click', clickTab)
  }

  // event listener function
  function clickTab(e) {

    var tabID = e.currentTarget.id
    var pageID = tabID.replace('t', 'p')

    for (let i = 0; i < pages.length; i++) {
      // deactivate all tabs
      tabs[i].classList.remove('active')
      // hide all pages
      pages[i].classList.remove('active')
    }

    // activate current tab
    e.currentTarget.classList.add('active')

    // show current page
    var currentPage = document.querySelector('#' + pageID)
    currentPage.classList.add('active'); {}
  }

  (Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
  }),
  false;

  let colorSelect = document.querySelectorAll(".color-select");

  colorSelect.forEach(item => {
    let itemId = item.id;
    var select = new CustomSelect({
      elem: itemId // id of the original select element
    });
  });

  var scene = document.querySelector('#scene');
  var parallaxInstance = new Parallax(scene, {
    pointerEvents: true
  });

  // notification popup

  var notifBlock = document.querySelector('.notif-block');
  var notifIcon = document.querySelector('.notif');

  notifBlock.querySelector('.modal-close').addEventListener('click', () => {
    notifBlock.classList.add('hidden');
  });

  notifIcon.addEventListener('click', () => {
    notifBlock.classList.remove('hidden');
  });

  var closeIcon = document.querySelectorAll('.close-icon');

  closeIcon.forEach(item => {
    item.addEventListener('click', () => {
      item.closest('.notif-row').remove();
    });
  });

  var multipleCancelButton = new Choices('#choices-multiple', {
    removeItemButton: true,
    callbackOnCreateTemplates: function(template) {
      return {
        item: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${
            data.highlighted
              ? classNames.highlightedState
              : classNames.itemSelectable
          } ${
            data.placeholder ? classNames.placeholder : ''
          }" data-item data-id="${data.id}" data-value="${data.value}" ${
            data.active ? 'aria-selected="true"' : ''
          } ${data.disabled ? 'aria-disabled="true"' : ''} data-deletable>
              <span class="choices__item-img"><img src="../images/nft-heroes/apollo.png"></span> ${data.label}
              <button type="button" class="choices__button" aria-label="Remove item: '${data.value}'" data-button="">Remove item</button>
            </div>
          `);
        },
        choice: (classNames, data) => {
          return template(`
            <div class="${classNames.item} ${classNames.itemChoice} ${
            data.disabled ? classNames.itemDisabled : classNames.itemSelectable
          }" data-select-text="${this.config.itemSelectText}" data-choice ${
            data.disabled
              ? 'data-choice-disabled aria-disabled="true"'
              : 'data-choice-selectable'
          } data-id="${data.id}" data-value="${data.value}" ${
            data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
          }>
              <span class="choices__item-img"><img src="../images/nft-heroes/apollo.png"></span> ${data.label}

            </div>
          `);
        },
      };
    },
  });
  
});
