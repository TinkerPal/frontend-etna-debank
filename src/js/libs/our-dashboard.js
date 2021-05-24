async function getOurDashbord(callback = null) {
  const data = await fetch('/etna-dashboard.json')
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

  // const getClassForNumber = (value) => {
  //   return value > 0 ? 'number_increase' : 'number_degrease';
  // };
  // const listCryptoTemplate = (imgSrc, name, price, priceChange) => {
  //   const imgBlock = `<img width="20" height="20" src="${imgSrc}" />`;
  //   const nameBlock = `<div>${name}</div>`;
  //   const priceBlock = `<div>${numeral(price).format('$ 0,0.00')}</div>`;
  //   const priceChangeBlock = `<div class="number_increase">${numeral(priceChange / 100).format('0.0%')}</div>`;

  //   return `
  //   <div class="w-full flex items-center mb-5">
  //     <div class="w-1/12">${imgBlock}</div>
  //     <div class="w-3/12"><div class="ml-2 uppercase text-sm tracking-wide">${nameBlock}</div></div>
  //     <div class="w-5/12"><div class="text-white text-opacity-50 text-sm tracking-wide">${priceBlock}</div></div>
  //     <div class="w-3/12 justify-end">${priceChangeBlock}</div>
  //   </div>
  //   `;
  // };
  // const marketCapElem = document.querySelector('#dashboard-market-cap');
  // const marketCapCompared = document.querySelector(
  //   '#dashboard-market-compared'
  // );
  // const marketTopFiveList = document.querySelector('#market-top-five-list');
  // marketTopFiveList.innerHTML = '';

  // const ourTopFiveList = document.querySelector('#our-top-five-list');
  // ourTopFiveList.innerHTML = '';

  const cryptoNumb1 = document.querySelector('#total-sum-1');
  // const cryptoName1 = document.querySelector('#crypto-name-1');
  const cryptoNumb2 = document.querySelector('#borrow-sum-2');
  // const cryptoName2 = document.querySelector('#crypto-name-2');
  const cryptoNumb3 = document.querySelector('#deposits-sum-3');
  // const cryptoName3 = document.querySelector('#crypto-name-3');
  const cryptoNumb4 = document.querySelector('#credit-sum-4');
  // const cryptoName4 = document.querySelector('#crypto-name-4');
  const cryptoNumb5 = document.querySelector('#users-sum-5');
  // const cryptoName5 = document.querySelector('#crypto-name-5');

  cryptoNumb1.innerHTML = numeral(data.totalAssetsValue).format('($0.0000 a)');
  // cryptoName1.innerHTML = marketTopFiveCurrency[0].name;
  cryptoNumb2.innerHTML = numeral(data.totalBorrow).format('($0.00 a)');
  // cryptoName2.innerHTML = marketTopFiveCurrency[1].name;
  cryptoNumb3.innerHTML = numeral(data.totalDeposits).format('($0.00 a)');
  // cryptoName3.innerHTML = marketTopFiveCurrency[2].name;
  cryptoNumb4.innerHTML = numeral(data.totalCredits).format('($0.00 a)');
  // cryptoName4.innerHTML = marketTopFiveCurrency[3].name;
  cryptoNumb5.innerHTML = numeral(data.totalUsers).format('($0.00 a)');
  // cryptoName5.innerHTML = marketTopFiveCurrency[4].name;

  const marketCapPercentChange =
    marketCapChange / (marketCap + marketCapChange * -1);

  marketCapElem.innerHTML = numeral(marketCap).format('$0,000');

  marketCapCompared.innerHTML = numeral(marketCapPercentChange).format('0.0%');
  marketCapCompared.classList.add(getClassForNumber(marketCapPercentChange));

  if (callback) callback();
}

document.addEventListener('DOMContentLoaded', async function (event) {
  await getOurDashbord();
});
