/**
 * @description
 * Vanilla JavaScript dropdown - a tiny (~600 bytes gzipped) select tag replacement.
 *
 * @class
 * @param {(string|Object)} options.elem - HTML id of the select or the DOM element.
 */
var CustomSelect = function (options) {
  var elem = typeof options.elem === 'string' ? document.getElementById(options.elem) : options.elem;
  var bubbles = typeof options.bubbles === 'boolean' ? true : false,
    mainClass = 'js-Dropdown',
    titleClass = 'js-Dropdown-title',
    listClass = 'js-Dropdown-list',
    selectedClass = 'is-selected',
    openClass = 'is-open',
    activeClass = 'is-active',
    selectOptions = elem.options,
    optionsLength = selectOptions.length,
    index = 0;

  // creating the pseudo-select container
  var selectContainer = document.createElement('div');

  selectContainer.className = mainClass;

  if (elem.id) {
    selectContainer.id = 'custom-' + elem.id;
  }

  // creating the always visible main button
  var button = document.createElement('button');

  button.className = titleClass;
  button.innerHTML = selectOptions[0].innerHTML;

  button.addEventListener('click', () => toggle())
  // creating the UL
  var ul = document.createElement('ul');
  ul.className = listClass;

  generateOptions(selectOptions);

  // appending the button and the list
  selectContainer.appendChild(button);
  selectContainer.appendChild(ul);

  // pseudo-select is ready - append it and hide the original
  elem.parentNode.insertBefore(selectContainer, elem);
  elem.style.display = 'none';

  /**
   * Generates a list from passed options.
   *
   * @param {object} options - options for the whole select or for an optgroup.
   */
  function generateOptions(options) {
    for (var i = 0; i < options.length; i++) {
      var li = document.createElement('li');

      li.innerHTML = options[i].innerHTML;

      li.innerHTML = `<span class="flex items-center"><span class="dropdown-link"><a target="_blank" href="${options[i].getAttribute("data-href")}"><img src="../images/link-inside-li.svg" class="li-link"><img src="../images/link.svg" class="btn-link"></a></span><span class="dropdown-text">${options[i].innerHTML}</span></span>`;

      li.setAttribute('data-value', options[i].value);
      li.setAttribute('data-index', index++);

      if (selectOptions[elem.selectedIndex].getAttribute('value') === options[i].getAttribute('value')) {
        li.classList.add(selectedClass);
        button.innerHTML = `<span class="flex items-center"><span class="dropdown-link"><a target="_blank" href="${options[i].getAttribute("data-href")}"><img src="../images/link-inside-li.svg" class="li-link"><img src="../images/link.svg" class="btn-link"></a></span><span class="dropdown-text">${options[i].innerHTML}</span></span>`;
      }

      li.addEventListener('click', onClick, false);

      ul.appendChild(li);
    }
  }

  /**
   * Closes the current select on any click outside of it.
   *
   */
  document.addEventListener('click', function (e) {
    if (!selectContainer.contains(e.target)) close();
  });

  /**
   * Handles the clicks on current select.
   *
   * @param {object} e - The item the click occured on.
   */
  function onClick(e) {

    var t = e.currentTarget; // || e.srcElement; - uncomment for IE8
    console.log(button);
    console.log(e.currentTarget)
    button.innerHTML = t.innerHTML;
    elem.options.selectedIndex = t.getAttribute('data-index');

    //trigger 'change' event
    var evt = bubbles ? new CustomEvent('change', {
      bubbles: true
    }) : new CustomEvent('change');
    elem.dispatchEvent(evt);

    // highlight the selected
    for (var i = 0; i < optionsLength; i++) {
      ul.querySelectorAll('li')[i].classList.remove(selectedClass);
    }
    t.classList.add(selectedClass);

    close();
  }

  /**
   * Toggles the open/close state of the select on title's clicks.
   *
   * @public
   */
  function toggle() {
    ul.classList.toggle(openClass);
    button.classList.toggle(activeClass);
  }

  /**
   * Opens the select.
   *
   * @public
   */
  function open() {
    ul.classList.add(openClass);
    button.classList.add(activeClass);
  }

  /**
   * Closes the select.
   *
   * @public
   */
  function close() {
    ul.classList.remove(openClass);
    button.classList.remove(activeClass);
  }

  return {
    toggle: toggle,
    close: close,
    open: open,
  };
};

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

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene, {
  pointerEvents: true
});

var modals = document.querySelectorAll("[data-modal]");

modals.forEach(function (trigger) {
  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    var modal = document.getElementById(trigger.dataset.modal);
    modal.classList.add("open");
    var exits = modal.querySelectorAll(".modal-exit");
    exits.forEach(function (exit) {
      exit.addEventListener("click", function (event) {
        event.preventDefault();
        modal.classList.remove("open");
      });
    });
  });
});
