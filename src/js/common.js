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
  var notifCloseBtns = notifBlock.querySelectorAll('.modal-close');

  notifCloseBtns.forEach(item => {
    item.addEventListener('click', () => {
      notifBlock.classList.add('hidden');
    });
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

});
