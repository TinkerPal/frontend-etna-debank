
if (!window.cur_price){

	fetch("https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xbd05cee8741100010d8e93048a80ed77645ac7bf&vs_currencies=USD&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false")
					.then(function(response){
						//console.log(response.json());
						return response.clone().json();
					})
					.then(function(respJson){
						window.cur_price = respJson["0xbd05cee8741100010d8e93048a80ed77645ac7bf"].usd;
						document.querySelector("#token_price").innerHTML = window.cur_price;
					})
					.catch(function(error){
						console.log("fetch token price error:"+error);
					});
}

if (!window.prices){		
	let current_unix_time = (Math.round((new Date()).getTime() / 1000)).toString();
	var d = new Date();
	d.setMonth(d.getMonth() - 3);
	let prev_unix_time = (Math.round(d.getTime() / 1000)).toString();
	
	/*fetch("https://api.coingecko.com/api/v3/coins/ethereum/contract/0xbd05cee8741100010d8e93048a80ed77645ac7bf/market_chart/?vs_currency=usd&days=10")*/
	fetch("https://api.coingecko.com/api/v3/coins/ethereum/contract/0xbd05cee8741100010d8e93048a80ed77645ac7bf/market_chart/range?vs_currency=usd&from="+prev_unix_time+"&to="+current_unix_time)
	.then(function(response){
		//console.log(response.json());
		return response.clone().json();
	})
	.then(function(respJson){
		window.prices = respJson["prices"];
		window.chart_prices = new Array();
		for (let i=0; i<window.prices.length; i++){
			let d = new Date(window.prices[i][0]).toISOString();
			let ds = d.slice(0,10);
			let v = window.prices[i][1];
			window.chart_prices.push({time: ds, value: v});
		}
		//let w= `calc(100%)`;
		//console.log('w=',w);
		let avail_width = document.getElementById('price_chart_host').getBoundingClientRect().width;

		const chart = LightweightCharts.createChart(document.getElementById('price_chart'), { width: avail_width, height: 300 });
				const lineSeries = chart.addLineSeries({
				    priceScaleId: 'right',
				    title: '',
				    scaleMargins: {
				        top: 0.1,
				        bottom: 0.3,
				    }, 
					
					color: '#e54353',
					
				});
				
				lineSeries.setData(window.chart_prices);
				chart.applyOptions({
				    layout: {
				        backgroundColor: '#000',
				        textColor: '#fff',
				        
				    },
				});
				chart.applyOptions({ width: $('#price_chart_host').width(), height: $('#price_chart_host').height() })
				chart.timeScale().fitContent();
	})
	.catch(function(error){
		console.log("fetch token price error:"+error);
	});


				
}
