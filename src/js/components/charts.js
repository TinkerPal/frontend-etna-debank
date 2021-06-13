// charts BNB

const chartItemBnb = document.querySelector('.chart-bnb');

if (chartItemBnb) {
  const chartBNB = LightweightCharts.createChart(chartItemBnb, {
    layout: {
      backgroundColor: '#060711',
    },
    leftPriceScale: {
      visible: false,
    },
    rightPriceScale: {
      visible: false,
    },
    timeScale: {
      visible: false,
    },
    crosshair: {
      horzLine: {
        visible: false,
      },
      vertLine: {
        visible: false,
      },
    },
    grid: {
      vertLines: {
        visible: false,
      },
      horzLines: {
        visible: false,
      },
    },
  });

  const areaSeries = chartBNB.addAreaSeries({
    topColor: 'rgba(246, 84, 62, 0.9)',
    lineColor: 'rgba(246, 84, 62, 1)',
    bottomColor: 'rgba(246, 84, 62, 0.04)',
    lineWidth: 1,
    crosshairMarkerVisible: false,
    handleScroll: {
      mouseWheel: false,
      pressedMouseMove: false,
      horzTouchDrag: false,
      vertTouchDrag: false,
    },
    handleScale: {
      mouseWheel: false,
      pinch: false,
    },
    disableInteraction: false,
    priceScale: {
      autoScale: true,
    },
    priceLineVisible: false,
    timeScale: {
      barSpacing: 1,
      visible: false,
    },
  });

  chartBNB.timeScale().fitContent();

  areaSeries.setData([
    {
      time: '2019-04-11',
      value: 80.01,
    },
    {
      time: '2019-04-12',
      value: 96.63,
    },
    {
      time: '2019-04-13',
      value: 76.64,
    },
    {
      time: '2019-04-14',
      value: 81.89,
    },
    {
      time: '2019-04-15',
      value: 74.43,
    },
    {
      time: '2019-04-16',
      value: 80.01,
    },
    {
      time: '2019-04-17',
      value: 96.63,
    },
    {
      time: '2019-04-18',
      value: 76.64,
    },
    {
      time: '2019-04-19',
      value: 81.89,
    },
    {
      time: '2019-04-20',
      value: 74.43,
    },
  ]);
}

// charts ST1

const chartItemST1 = document.querySelector('.chart-st1');

if (chartItemST1) {
  const chartST1 = LightweightCharts.createChart(chartItemST1, {
    layout: {
      backgroundColor: '#060711',
    },
    leftPriceScale: {
      visible: false,
    },
    rightPriceScale: {
      visible: false,
    },
    timeScale: {
      visible: false,
    },
    crosshair: {
      horzLine: {
        visible: false,
      },
      vertLine: {
        visible: false,
      },
    },
    grid: {
      vertLines: {
        visible: false,
      },
      horzLines: {
        visible: false,
      },
    },
  });

  const areaSeries = chartST1.addAreaSeries({
    topColor: 'rgba(99, 116, 195, 0.9)',
    lineColor: 'rgba(99, 116, 195, 1)',
    bottomColor: 'rgba(99, 116, 195, 0.04)',
    lineWidth: 1,
    crosshairMarkerVisible: false,
    handleScroll: {
      mouseWheel: false,
      pressedMouseMove: false,
      horzTouchDrag: false,
      vertTouchDrag: false,
    },
    handleScale: {
      axisPressedMouseMove: {
        time: false,
        price: false,
      },

      mouseWheel: false,
      pinch: false,
    },
    disableInteraction: false,
    priceScale: {
      autoScale: true,
    },
    priceLineVisible: false,
    timeScale: {
      barSpacing: 1,
      visible: false,
    },
  });

  chartST1.timeScale().fitContent();

  areaSeries.setData([
    {
      time: '2019-04-11',
      value: 80.01,
    },
    {
      time: '2019-04-12',
      value: 96.63,
    },
    {
      time: '2019-04-13',
      value: 76.64,
    },
    {
      time: '2019-04-14',
      value: 81.89,
    },
    {
      time: '2019-04-15',
      value: 74.43,
    },
    {
      time: '2019-04-16',
      value: 80.01,
    },
    {
      time: '2019-04-17',
      value: 96.63,
    },
    {
      time: '2019-04-18',
      value: 76.64,
    },
    {
      time: '2019-04-19',
      value: 81.89,
    },
    {
      time: '2019-04-20',
      value: 74.43,
    },
  ]);
}

// charts ST2

const chartItemST2 = document.querySelector('.chart-st2');

if (chartItemST2) {
  const chartST2 = LightweightCharts.createChart(chartItemST2, {
    layout: {
      backgroundColor: '#060711',
    },
    leftPriceScale: {
      visible: false,
    },
    rightPriceScale: {
      visible: false,
    },
    timeScale: {
      visible: false,
    },
    crosshair: {
      horzLine: {
        visible: false,
      },
      vertLine: {
        visible: false,
      },
    },
    grid: {
      vertLines: {
        visible: false,
      },
      horzLines: {
        visible: false,
      },
    },
  });

  const areaSeries = chartST2.addAreaSeries({
    topColor: 'rgba(48, 224, 161, 0.9)',
    lineColor: 'rgba(48, 224, 161, 1)',
    bottomColor: 'rgba(48, 224, 161, 0.04)',
    lineWidth: 1,
    crosshairMarkerVisible: false,
    handleScroll: {
      mouseWheel: false,
      pressedMouseMove: false,
      horzTouchDrag: false,
      vertTouchDrag: false,
    },
    handleScale: {
      axisPressedMouseMove: {
        time: false,
        price: false,
      },

      mouseWheel: false,
      pinch: false,
    },
    disableInteraction: false,
    priceScale: {
      autoScale: true,
    },
    priceLineVisible: false,
    timeScale: {
      barSpacing: 1,
      visible: false,
    },
  });

  chartST2.timeScale().fitContent();

  areaSeries.setData([
    {
      time: '2019-04-11',
      value: 80.01,
    },
    {
      time: '2019-04-12',
      value: 96.63,
    },
    {
      time: '2019-04-13',
      value: 76.64,
    },
    {
      time: '2019-04-14',
      value: 81.89,
    },
    {
      time: '2019-04-15',
      value: 74.43,
    },
    {
      time: '2019-04-16',
      value: 80.01,
    },
    {
      time: '2019-04-17',
      value: 96.63,
    },
    {
      time: '2019-04-18',
      value: 76.64,
    },
    {
      time: '2019-04-19',
      value: 81.89,
    },
    {
      time: '2019-04-20',
      value: 74.43,
    },
  ]);
}

// charts ST3

const chartItemST3 = document.querySelector('.chart-st3');

if (chartItemST3) {
  const chartST3 = LightweightCharts.createChart(chartItemST3, {
    layout: {
      backgroundColor: '#060711',
    },
    leftPriceScale: {
      visible: false,
    },
    rightPriceScale: {
      visible: false,
    },
    timeScale: {
      visible: false,
    },
    crosshair: {
      horzLine: {
        visible: false,
      },
      vertLine: {
        visible: false,
      },
    },
    grid: {
      vertLines: {
        visible: false,
      },
      horzLines: {
        visible: false,
      },
    },
  });

  const areaSeries = chartST3.addAreaSeries({
    topColor: 'rgba(255, 255, 255, 0.9)',
    lineColor: 'rgba(255, 255, 255, 1)',
    bottomColor: 'rgba(255, 255, 255, 0.04)',
    lineWidth: 1,
    crosshairMarkerVisible: false,
    handleScroll: {
      mouseWheel: false,
      pressedMouseMove: false,
      horzTouchDrag: false,
      vertTouchDrag: false,
    },
    handleScale: {
      axisPressedMouseMove: {
        time: false,
        price: false,
      },

      mouseWheel: false,
      pinch: false,
    },
    disableInteraction: false,
    priceScale: {
      autoScale: true,
    },
    priceLineVisible: false,
    timeScale: {
      barSpacing: 1,
      visible: false,
    },
  });

  chartST3.timeScale().fitContent();

  areaSeries.setData([
    {
      time: '2019-04-11',
      value: 80.01,
    },
    {
      time: '2019-04-12',
      value: 96.63,
    },
    {
      time: '2019-04-13',
      value: 76.64,
    },
    {
      time: '2019-04-14',
      value: 81.89,
    },
    {
      time: '2019-04-15',
      value: 74.43,
    },
    {
      time: '2019-04-16',
      value: 80.01,
    },
    {
      time: '2019-04-17',
      value: 96.63,
    },
    {
      time: '2019-04-18',
      value: 76.64,
    },
    {
      time: '2019-04-19',
      value: 81.89,
    },
    {
      time: '2019-04-20',
      value: 74.43,
    },
  ]);
}

// charts ETNA

const chartItemETNA = document.querySelector('.chart-etna');

if (chartItemETNA) {
  const chartETNA = LightweightCharts.createChart(chartItemETNA, {
    layout: {
      backgroundColor: '#060711',
    },
    leftPriceScale: {
      visible: false,
    },
    rightPriceScale: {
      visible: false,
    },
    timeScale: {
      visible: false,
    },
    crosshair: {
      horzLine: {
        visible: false,
      },
      vertLine: {
        visible: false,
      },
    },
    grid: {
      vertLines: {
        visible: false,
      },
      horzLines: {
        visible: false,
      },
    },
  });

  const areaSeries = chartETNA.addAreaSeries({
    topColor: 'rgba(130, 231, 23, 0.9)',
    lineColor: 'rgba(130, 231, 23, 1)',
    bottomColor: 'rgba(130, 231, 23, 0.04)',
    lineWidth: 1,
    crosshairMarkerVisible: false,
    handleScroll: {
      mouseWheel: false,
      pressedMouseMove: false,
      horzTouchDrag: false,
      vertTouchDrag: false,
    },
    handleScale: {
      axisPressedMouseMove: {
        time: false,
        price: false,
      },

      mouseWheel: false,
      pinch: false,
    },
    disableInteraction: false,
    priceScale: {
      autoScale: true,
    },
    priceLineVisible: false,
    timeScale: {
      barSpacing: 1,
      visible: false,
    },
  });

  chartETNA.timeScale().fitContent();

  areaSeries.setData([
    {
      time: '2019-04-11',
      value: 8000.01,
    },
    {
      time: '2019-04-12',
      value: 9600.63,
    },
    {
      time: '2019-04-13',
      value: 7600.64,
    },
    {
      time: '2019-04-14',
      value: 8100.89,
    },
    {
      time: '2019-04-15',
      value: 7400.43,
    },
    {
      time: '2019-04-16',
      value: 8000.01,
    },
    {
      time: '2019-04-17',
      value: 9600.63,
    },
    {
      time: '2019-04-18',
      value: 7600.64,
    },
    {
      time: '2019-04-19',
      value: 8100.89,
    },
    {
      time: '2019-04-20',
      value: 7400.43,
    },
  ]);
}

// chart on inside page

const chartCRYPTO = document.querySelector('.crypto-info__diagram');

if (chartCRYPTO) {
  const chartCryptoETNA = LightweightCharts.createChart(chartCRYPTO, {
    layout: {
      backgroundColor: '#060711',
      textColor: '#B9C1D9',
      fontSize: 9,
      fontFamily: 'Inter',
    },
    leftPriceScale: {
      visible: true,
    },
    rightPriceScale: {
      visible: false,
    },
    timeScale: {
      visible: true,
    },
    crosshair: {
      horzLine: {
        visible: false,
        labelVisible: false,
      },
      vertLine: {
        visible: false,
      },
    },
    grid: {
      vertLines: {
        visible: true,
        color: 'rgba(185, 193, 217, 0.1)',
      },
      horzLines: {
        visible: true,
        color: 'rgba(185, 193, 217, 0.1)',
      },
    },
    localization: {
      locale: 'en-US',
    },
  });

  const areaSeries = chartCryptoETNA.addAreaSeries({
    topColor: 'rgba(130, 231, 23, 0.9)',
    lineColor: 'rgba(130, 231, 23, 1)',
    bottomColor: 'rgba(130, 231, 23, 0.04)',
    lineWidth: 2,
    crosshairMarkerVisible: true,
    handleScroll: {
      mouseWheel: false,
      pressedMouseMove: false,
      horzTouchDrag: false,
      vertTouchDrag: false,
    },
    handleScale: {
      axisPressedMouseMove: {
        time: false,
        price: false,
      },

      mouseWheel: false,
      pinch: false,
    },
    disableInteraction: false,
    priceScale: {
      autoScale: false,
      borderColor: 'rgba(185, 193, 217, 0.58)',
    },
    localization: {
      dateFormat: 'dd MMM',
    },
    timeScale: {
      barSpacing: 1,
      visible: true,
      secondsVisible: true,
    },
    priceLineVisible: false,
    priceLineWidth: 0,
    lastValueVisible: false,
    baseLineVisible: false,
    priceFormat: {
      type: 'volume',
      precision: 3,
      minMove: 0.05,
    },
  });

  areaSeries.setData([
    {
      time: '2019-04-11',
      value: 8000.01,
    },
    {
      time: '2019-05-12',
      value: 9600.63,
    },
    {
      time: '2019-06-13',
      value: 7600.64,
    },
    {
      time: '2019-07-14',
      value: 8100.89,
    },
    {
      time: '2019-08-15',
      value: 7400.43,
    },
    {
      time: '2019-09-16',
      value: 8000.01,
    },
    {
      time: '2019-10-17',
      value: 9600.63,
    },
    {
      time: '2019-11-18',
      value: 7600.64,
    },
    {
      time: '2019-12-19',
      value: 8100.89,
    },
    {
      time: '2020-01-20',
      value: 7400.43,
    },
  ]);

  chartCryptoETNA.timeScale().fitContent();
}
