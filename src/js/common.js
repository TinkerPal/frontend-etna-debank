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
