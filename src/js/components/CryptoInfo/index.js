import { ERC20_TOKEN, NATIVE_ETHEREUM } from '../../constants';
import { userObject } from '../../store/userObject';
import { toNormalUSDView, toNumber } from '../../utils';
import { openTab } from '../Navigation';

export function cryptoInfoBuild(index, breadcrumb, userObjectState) {
  const options = userObject.state?.[userObjectState]?.[index] ?? {};
  const profile = userObject.deposit_profiles.find(
    (item) => item.p_name.toLowerCase() === options.asset_column.toLowerCase()
  );

  const breadcrumbEl = document.querySelector('[data-tab="crypto-info"]');
  breadcrumbEl.onclick = (e) => openTab(e, breadcrumb.link);
  breadcrumbEl.innerHTML = breadcrumb.text;

  if (Object.values(options).length === 0) {
    breadcrumbEl.openTab(
      {
        srcElement: document.getElementById(`${breadcrumb.link}-menu`),
      },
      breadcrumb.link
    );
    return false;
  }

  const wrapper = document.querySelector('#crypto-info .crypto-info__data');
  wrapper.innerHTML = '';

  const header = document.querySelector('#crypto-info-header');
  header.innerHTML = `${options.icon_column}${options.asset_column}`;

  const graph = document.querySelector('#crypto-info .crypto-info__diagram');

  if (
    toNumber(profile?.p_dep_type) === ERC20_TOKEN ||
    toNumber(profile?.p_dep_type) === NATIVE_ETHEREUM
  ) {
    graph.classList.remove('hidden');
    graph.innerHTML = /* html */ `
      <etna-chart class="crypto-chart" coin="${options.asset_column.toLowerCase()}"></etna-chart>
      `;
  } else {
    graph.classList.add('hidden');
  }
  // graph.innerHTML

  const btnWrapper = document.querySelector('#crypto-info .crypto-info__btn');
  btnWrapper.innerHTML = '';

  const getBtnStructure = (name, data) => {
    return `${data}`;
  };

  const getItemStructure = (name, data) => {
    if (name === 'Withdraw yield' || name === 'Withdraw deposit') {
      if (!data || data === '-') return '';

      return /* html */ `<div class="crypto-info__row withdraw">
          <div class="w-1/2">
            <div class="flex flex-col">
              <div class="table-name">
                ${name}
              </div>
              <div class="table-currency">
                USD walue
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div class="flex items-center justify-end">
              <div class="flex flex-col">
                <div class="table-amount">
                  ${
                    name === 'Withdraw deposit'
                      ? options.list.dep_column.data
                      : options.list.extractable_reward_col.data
                  } ${
        options.asset_column === 'nft' && name === 'Withdraw yield'
          ? 'ETNA'
          : options.asset_column
      }
                </div>
                <div class="table-data">
                  ${
                    name === 'Withdraw deposit'
                      ? toNormalUSDView(options.list.usd_val_column.data)
                      : toNormalUSDView(options.usd_reward_column.data)
                  }
                </div>
              </div>
              ${data}
            </div>
          </div>
        </div>`;
    }

    return /* html */ `<div class="crypto-info__row">
        <div class="w-1/2">
          <div class="table-name">
            ${name}
          </div>
        </div>
        <div class="w-1/2">
          <div class="table-data">
            ${data}
          </div>
        </div>
      </div>`;
  };

  Object.values(options.list).forEach((item) => {
    if (item.data) {
      if (item.name === 'btn') {
        btnWrapper.innerHTML += getBtnStructure(item.name, item.data);
      } else {
        wrapper.innerHTML += getItemStructure(item.name, item.data);
      }
    }
  });

  const haveBtns = Object.values(options.list).some(
    (item) => item.name === 'btn'
  );

  if (haveBtns) {
    wrapper.parentNode.classList.add('_with-btns');
  } else {
    wrapper.parentNode.classList.remove('_with-btns');
  }

  return true;
}
