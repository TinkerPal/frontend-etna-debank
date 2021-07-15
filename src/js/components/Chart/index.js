import { Chart, registerables } from 'chart.js';
import { getCoinData } from './utils';

export default class EtnaChart extends HTMLElement {
  constructor() {
    super();
    Chart.register(...registerables);
  }

  connectedCallback() {
    this.coin = this.getAttribute('coin');

    this.renderHTML();
    this.renderChart();
  }

  renderHTML() {
    this.innerHTML = /* html */ `
    <canvas class="w-full" data-chart></canvas>
    `;
  }

  async renderChart() {
    this.coinData = await getCoinData(this.coin);
    if (!this.coinData) return;

    const percentage =
      this.coinData.market_data.price_change_percentage_24h.toFixed(2);
    const lines = this.coinData.market_data.sparkline_7d.price;

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
        maintainAspectRatio: false,
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

    const cryptoStatInDeposit = this.closest('.stat-row')?.querySelector(
      '.crypto-stat__percent'
    );

    if (cryptoStatInDeposit) {
      cryptoStatInDeposit.innerHTML = `${
        percentage > 0 ? '+' : ''
      }${percentage}%`;
    }

    new Chart(this.querySelector(`[data-chart]`).getContext('2d'), config);
  }
}
