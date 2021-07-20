/* eslint-disable no-param-reassign */
export function setLdBar(value, part = 0) {
  const loaderBar = document.getElementById('debank_load_bar');
  const ldBarWrapper = document.getElementById('load_bar_cover');
  const body = document.querySelector('body');

  if (!loaderBar.ldBar) {
    const loadingValue = loaderBar.dataset.value;

    if (!value) {
      loaderBar.dataset.value = Number(loadingValue) + Number(part);
    } else {
      loaderBar.dataset.value = Number(value);
    }

    if (Number(loaderBar.dataset.value) > 100) loaderBar.dataset.value = 100;

    if (Number(loaderBar.dataset.value) === 100) {
      setTimeout(() => {
        ldBarWrapper.style.display = 'none';
        body.classList.remove('page-loading');
      }, 1000);
    } else {
      ldBarWrapper.style.display = 'block';
      body.classList.add('page-loading');
    }

    return;
  }

  if (!value) {
    value = Number(loaderBar.ldBar.value) + Number(part);
  }

  if (Number(value) > 100) value = 100;

  loaderBar.ldBar.set(value);

  if (loaderBar.ldBar.value === 100) {
    setTimeout(() => {
      ldBarWrapper.style.display = 'none';
      body.classList.remove('page-loading');
    }, 1000);
  } else {
    ldBarWrapper.style.display = 'block';
    body.classList.add('page-loading');
  }
}
