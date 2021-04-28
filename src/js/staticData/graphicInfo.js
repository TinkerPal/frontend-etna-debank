document.addEventListener("DOMContentLoaded", function (event) {
  
const graphicInfoData = JSON.parse(`
{  
  "graphicInfo": [
    {
      "name": "Borrow",
      "itemAmount": "862",
      "diagram": "pink-graph.svg"
    },
    {
      "name": "Deposits",
      "itemAmount": "753",
      "diagram": "green-graph.svg"
    },
    {
      "name": "Credits",
      "itemAmount": "553",
      "diagram": "yellow-graph.svg"
    }
  ]
}
`);

let assetsRow = '';
let assetsDiagramBlock = document.querySelector('.assets-diagram__block');

for (const i in graphicInfoData.graphicInfo) {
  assetsRow = `
    <div class="flex items-center w-full mb-3 assets-diagram">
      <div class="w-5/12">
        <div class="static-name">
          ${graphicInfoData.graphicInfo[i].name}
        </div>
      </div>
      <div class="w-3/12">
        <div class="static-data">
          ${graphicInfoData.graphicInfo[i].itemAmount}
        </div>
      </div>
      <div class="w-4/12">
        <div class="h-5">
          <img src="../images/${graphicInfoData.graphicInfo[i].diagram}" class="w-full h-full" alt="#">
        </div>
      </div>
    </div>
  `
  assetsDiagramBlock.innerHTML += assetsRow;
}

});

