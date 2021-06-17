class EtnaChart extends HTMLElement {
  async connectedCallback() {
    this.coin = this.getAttribute('coin');
    this.coinData = await getCoinData(this.coin);
    if (!this.coinData) return;

    this.renderHTML();
    this.renderChart(
      this.coinData.market_data.price_change_percentage_24h.toFixed(2),
      this.coinData.market_data.sparkline_7d.price
    );
  }

  renderHTML() {
    this.innerHTML = /* html */ `
    <canvas class="w-full" data-chart></canvas>
    `;
  }

  renderChart(percentage, lines) {
    const data = {
      labels: lines,
      datasets: [
        {
          borderColor: percentage < 0 ? '#F6465D' : '#0ECB81',
          data: lines,
          borderWidth: 2,
        },
      ],
    };
    const config = {
      type: 'line',
      data,
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 3,
        scales: {
          y: {
            display: false,
          },
          x: {
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 0,
          },
        },
      },
    };

    const cryptoStatInDeposit = this.closest('.stat-row').querySelector(
      '.crypto-stat__percent'
    );
    cryptoStatInDeposit.innerHTML = `${
      percentage > 0 ? '+' : ''
    }${percentage}%`;

    const myChart = new Chart(
      this.querySelector(`[data-chart]`).getContext('2d'),
      config
    );

    console.log(myChart);
  }
}
