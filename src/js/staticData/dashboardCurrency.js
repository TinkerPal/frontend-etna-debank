document.addEventListener("DOMContentLoaded", function (event) {

const currencyData = JSON.parse(`
{  
  "currencyInfo": [
    {
      "assetsName": "ST1",
      "assetsAmount": "760",
      "assetsIndex": "2,540",
      "indexIcon": "arrow-up.svg"
    },
    {
      "assetsName": "BNB",
      "assetsAmount": "650",
      "assetsIndex": "2,304",
      "indexIcon": "arrow-down.svg"
    },
    {
      "assetsName": "ST2",
      "assetsAmount": "612",
      "assetsIndex": "2,140",
      "indexIcon": "arrow-up.svg"
    },
    {
      "assetsName": "ST3",
      "assetsAmount": "598",
      "assetsIndex": "1,976",
      "indexIcon": "arrow-up.svg"
    },
    {
      "assetsName": "ST4",
      "assetsAmount": "513",
      "assetsIndex": "1,903",
      "indexIcon": "arrow-down.svg"
    },
    {
      "assetsName": "CYTR",
      "assetsAmount": "498",
      "assetsIndex": "1,320",
      "indexIcon": "arrow-down.svg"
    }
  ]
}
`);

let staticRow = '';
let staticRowData = document.querySelector('.static-row__data');

for (const i in currencyData.currencyInfo) {
  staticRow = `
    <div class="flex items-center w-full mb-3 static-row">
      <div class="w-5/12">
        <div class="static-name">
          ${currencyData.currencyInfo[i].assetsName}
        </div>
      </div>
      <div class="w-3/12">
        <div class="static-data">
          ${currencyData.currencyInfo[i].assetsAmount}
        </div>
      </div>
      <div class="w-4/12">
        <div class="up-info">
          <div class="static-data">
            ${currencyData.currencyInfo[i].assetsIndex}
          </div>
          <span class="arrow-stat up w-3 h-2">
            <img src="../images/${currencyData.currencyInfo[i].indexIcon}" class="w-full h-full" alt="#">
          </span>
        </div>
      </div>
    </div>
  `
  staticRowData.innerHTML += staticRow;
}

});
