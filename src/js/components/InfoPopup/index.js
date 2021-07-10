/* eslint-disable no-param-reassign */
export function createInfoPopup() {
  const allInfo = document.querySelectorAll('[data-id="infoPopup"]');
  const mustBeCut = (field) => {
    const container = field.firstChild;
    const child = container.firstChild;
    return container.clientWidth <= child.clientWidth;
  };

  allInfo.forEach((item) => {
    if (mustBeCut(item)) item.parentNode.classList.add('hover-element');

    const infoPopup = document.createElement('div');
    infoPopup.classList.add('info-block__popup');
    item.parentNode.appendChild(infoPopup);

    item.onmouseenter = () => {
      if (mustBeCut(item)) {
        item.parentNode.classList.add('hover-element');
      } else {
        item.parentNode.classList.remove('hover-element');
      }

      const content = item.textContent;
      if (infoPopup.innerHTML !== content) infoPopup.innerHTML = content;
    };
  });
}
