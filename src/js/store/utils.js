import { CRYPTO_ICONS } from './constants';

export const createCellWithIcon = (iconSrc) => {
  if (typeof iconSrc === 'string') {
    const iconName = iconSrc.toLowerCase();
    const iconObj = CRYPTO_ICONS.find((icon) => iconName === icon.name);

    return `<span class="crypto-icon-no-spaces"><img src="/images/crypto-icons/icon-${
      iconObj ? iconObj.icon || iconObj.name : 'b'
    }.svg"></span>`;
  }

  return `<span class="crypto-icon-no-spaces"><img src="/images/crypto-icons/icon-b.svg"></span>`;
};

export const createTableBtnWithIcon = (icon, text, callback) => {
  return `<span class="table-btn" onclick="${callback};">
  <i class="icon-cell">
    <img src="/images/${icon}.svg" class="w-full h-full" alt="#">
  </i>
  ${text}
</span>`;
};
