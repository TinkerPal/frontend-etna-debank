/* eslint-disable no-param-reassign */
import numeral from 'numeral';
import SimpleBar from 'simplebar';
import { openTab } from '../../components/Navigation';
import { userObject } from '../../store/userObject';

export async function getOurDashbord(callback = null) {
  const ourCryptoList = document.querySelector('#our-crypto-list');
  if (!ourCryptoList) return;

  const data = await fetch(`/dashboard.json?ts=${Date.now()}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      // if api for get dashboard data failed, remove dashboard page and change current page to
      document.getElementById('total-dashboard-tab-menu').remove();

      if (userObject.state.current_page_id === 'total-dashboard-tab') {
        openTab(
          {
            srcElement: document.getElementById('dashboard-tab-menu'),
          },
          'dashboard-tab'
        );
      }

      throw new Error(error);
    });

  if (data.length === 0) {
    return;
  }

  const listOurCryptoTemplate = (name, amount, total) => {
    const assetName = /* html */ `<div class="w-5/12 row-name uppercase">${name}</div>`;
    const assetTotal = `${numeral(total).format('($ 0.00 a)')}`;

    return /* html */ `
          <div class="crypto-row">
            ${assetName}
            <div class="w-7/12 flex items-center justify-end h-5 w-auto">
              <div class="crypto-amount row-name">
                ${assetTotal} <span class="number_increase ml-2"></span>
              </div>
            </div>
          </div>
        `;
  };

  ourCryptoList.innerHTML = '';

  data.tokensStatistic.forEach((item) => {
    ourCryptoList.innerHTML += listOurCryptoTemplate(
      item.name,
      item.amount,
      item.total
    );
  });

  new SimpleBar(ourCryptoList, {
    autoHide: false,
  });

  const cryptoNumbAll1 = document.querySelectorAll('.total-sum-1');
  const cryptoNumbAll2 = document.querySelectorAll('.borrow-sum-2');
  const cryptoNumbAll3 = document.querySelectorAll('.deposits-sum-3');
  const cryptoNumb4 = document.querySelector('#credit-sum-4');
  const cryptoNumbAll5 = document.querySelectorAll('.users-sum-5');
  const comparedLastMonths = document.querySelectorAll('.last-month');

  comparedLastMonths.forEach((elem) => {
    elem.innerHTML = numeral(data.prevTotalAssetsValue).format('($0.00 a)');
  });

  cryptoNumbAll1.forEach((each) => {
    each.innerHTML = numeral(data.totalAssetsValue).format('($0.0000 a)');
  });

  cryptoNumbAll2.forEach((item) => {
    item.innerHTML = numeral(data.totalNft).format('(0 a)');
  });

  cryptoNumbAll3.forEach((elem) => {
    elem.innerHTML = numeral(data.totalDeposits).format('($0.00 a)');
  });

  cryptoNumb4.innerHTML = numeral(data.totalCredits).format('($0.00 a)');

  cryptoNumbAll5.forEach((el) => {
    el.innerHTML = numeral(data.totalUsers).format('(0 a)');
  });

  if (callback) callback();
}
