document.addEventListener("DOMContentLoaded", function (event) {
  
  const marketData = JSON.parse(`
  {  
    "marketInfo": [
      {
        "usersName": "Total users",
        "usersAmount": "31,657"
      },
      {
        "borrowName": "Total borrow",
        "borrowAmount": "32,982"
      },
      {
        "creditsName": "Total credits",
        "creditsAmount": "23,657"
      },
      {
        "depositsName": "Total deposits",
        "depositsAmount": "21,982"
      },
      {
        "assetsNumb": "12,748,120",
        "assetsCompared": "121,504"
      }
    ],
  }
  `);
  
  for (const i in marketData.marketInfo) {
    
  }
  
  });
  
  