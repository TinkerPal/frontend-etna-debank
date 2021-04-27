document.addEventListener("DOMContentLoaded", function (event) {

  const data = JSON.parse(`
{  
  "notificationsArr": [
    {
      "title": "Notification title 111111",
      "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.",
      "href": "#3"
    },
    {
      "title": "Notification title 222222",
      "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.",
      "href": "#4"
    },
    {
      "title": "Notification title 33333",
      "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.",
      "href": "#5"
    }
  ]
}
`);

  let notifItem = '';
  const notifCommon = document.querySelector('.notif-block');

  for (const i in data.notificationsArr) {
    notifItem = `
    <div class="flex w-full notif-block__item" data-id="${[i]}">
      <div class="w-1/12 flex justify-start h-full">
        <div class="nofif-icon w-4 h-5">
          <img src="../images/notif.svg" alt="#">
        </div>
      </div>
      <div class="w-10/12 h-full ml-2 flex flex-col">
        <div class="notif-item flex flex-col pb-6 mb-6 border-b border-light-violet">
          <div class="text-sm font-medium mb-1">
            ${data.notificationsArr[i].title}
          </div>
          <div class="text-sm text-white font-normal text-opacity-50">
            ${data.notificationsArr[i].text}
          </div>
          <div class="flex items-center mt-3">
            <a href="${data.notificationsArr[i].href}" class="btn mr-3">
              Undo
            </a>
            <div class="btn bg-none border border-light-grey hover:text-grey-200 transition-all delete-btn">
              Dismiss
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/12 flex justify-end h-full">
        <button class="modal-close modal-exit w-3 h-3">
          <img src="../images/close.svg" alt="#">
        </button>
      </div>
    </div>
  `
    notifCommon.innerHTML += notifItem;
  }

  let sumItems = data.notificationsArr.length;
  let notifAmount = document.querySelector('.notif-amount');
  let deleteBtns = document.querySelectorAll('.delete-btn');

  notifAmount.innerHTML = sumItems;

  deleteBtns.forEach(item => {
    item.addEventListener('click', () => {
      item.parentElement.closest('.notif-block__item').remove();
      sumItems = sumItems - 1;
      notifAmount.innerHTML = sumItems;

      if (sumItems < 1) {
        notifAmount.remove();
        notifCommon.remove();
      }

    });
  });

});
