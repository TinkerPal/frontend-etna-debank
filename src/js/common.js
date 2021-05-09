document.addEventListener("DOMContentLoaded", function (event) {
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

  let allInfo = document.querySelectorAll('[data-id="infoPopup"]');

  const mustBeCut = (field) => {
    const container = field.firstChild;
    const child = container.firstChild;
    return container.clientWidth <= child.clientWidth
  } 
  
  allInfo.forEach(item => {
    if (mustBeCut(item)) item.parentNode.classList.add('hover-element');

    const infoPopup = document.createElement('div');
    infoPopup.classList.add('info-block__popup');
    item.parentNode.appendChild(infoPopup);

    item.onmouseenter = () => {
      if (mustBeCut(item)) {
        item.parentNode.classList.add('hover-element')
      } else {
        item.parentNode.classList.remove('hover-element')
      }

      const content = item.textContent;
      if (infoPopup.innerHTML != content) infoPopup.innerHTML = content;
    }
  });

});
