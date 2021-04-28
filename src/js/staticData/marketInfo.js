document.addEventListener("DOMContentLoaded", function (event) {

  const marketData = JSON.parse(`
  {  
    "usersName": "Total users",
    "usersAmount": "31,657",
    "borrowName": "Total borrow",
    "borrowAmount": "32,982",
    "creditsName": "Total credits",
    "creditsAmount": "23,657",
    "depositsName": "Total deposits",
    "depositsAmount": "21,982",
    "assetsNumb": "12,748,120",
    "assetsCompared": "121,504"
  }
  `);

  let borrowAmount = document.querySelector('#borrowAmount');
  let depositsAmount = document.querySelector('#depositsAmount');
  let totalBorrow = document.querySelector('#totalBorrow');
  let usersAmount = document.querySelector('#usersAmount');
  let comparedSum = document.querySelectorAll('.compared-sum');
  let currentCapitItems = document.querySelectorAll('.current-capit');

  currentCapitItems.forEach(item => {
    item.innerHTML = marketData.assetsNumb;
  });

  comparedSum.forEach(elem => {
    elem.innerHTML = `$${marketData.assetsCompared}`;
  });

  usersAmount.innerHTML = `$${marketData.usersAmount}`;
  totalBorrow.innerHTML = `$${marketData.borrowAmount}`;
  depositsAmount.innerHTML = `$${marketData.depositsAmount}`;
  borrowAmount.innerHTML = `$${marketData.creditsAmount}`;

});
