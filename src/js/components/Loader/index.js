/* eslint-disable no-param-reassign */
export function setLdBar(value, part = 0) {
  const { ldBar } = document.getElementById('debank_load_bar');
  const ldBarWrapper = document.getElementById('load_bar_cover');
  const body = document.querySelector('body');

  if (!value) {
    value = Number(ldBar.value) + Number(part);
  }

  if (Number(value) > 100) value = 100;

  ldBar.set(value);

  if (ldBar.value === 100) {
    setTimeout(() => {
      ldBarWrapper.style.display = 'none';
      body.classList.remove('page-loading');
    }, 1000);
  } else {
    ldBarWrapper.style.display = 'block';
    body.classList.add('page-loading');
  }
}
