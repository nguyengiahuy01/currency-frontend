<template>
  <card-base :bgColor="'linear-gradient( 135deg, #FFF 10%, #eef2ff 100%)'">
    <div class="row">
      <div class="col-2 text-h6 text-white">
        <q-select v-model="selected" :options="options" label="Währung">
        </q-select>
      </div>
      <div class="col-12">
        <apexchart ref="realtimeChart" type="line" height="200" :options="chartOptions" :series="series" style="padding: 2em"/>
      </div>
    </div>
  </card-base>
</template>

<script>
import CardBase from './CardBase'
export default {
  name: 'ApexLine',
  components: {
    CardBase
  },
  async mounted () {
    for (let i = 0; i < 14; i++) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      this.chartOptions.xaxis.categories.unshift(date)
      const response = await this.$client.historical({date})
      this.chartAllData.unshift(response)
    }
    this.buildChart('USD')
  },
  watch: {
    selected (val) {
      this.buildChart(val)
      console.log(this.series)
    }
  },
  data () {
    return {
      selected: 'USD',
      options: ['USD', 'EUR', 'CHF'],
      chartAllData: [],
      series: [],
      chartOptions: {
        colors: ['#17ead9', '#f02fc2'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        sparkline: {
          enabled: true
        },
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          },
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 2,
            opacity: 0.2
          }
        },
        grid: {
          show: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          categories: ['Tommorow'],
          axisBorder: {
            show: false
          },
          labels: {
            show: false,
            style: {
              colors: 'bgColorCard'
            }
          }
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              color: '#fff'
            }
          }
        }
      }
    }
  },
  methods: {
    buildChart(val) {
      const serieEUR = {
        name: 'EUR',
        data: []
      }
      const serieCHF = {
        name: 'CHF',
        data: []
      }
      const serieUSD = {
        name: 'USD',
        data: []
      }
      if (val === 'USD') {
        for (let i = 0; i < 14; i++) {
          serieEUR.name = 'USD-EUR'
          serieCHF.name = 'USD-CHF'
          serieEUR.data.unshift(this.chartAllData[i].quotes['USDEUR'])
          serieCHF.data.unshift(this.chartAllData[i].quotes['USDCHF'])
        }
        this.series = [serieEUR, serieCHF]
      } else if (val === 'EUR') {
        serieUSD.name = 'EUR-USD'
        serieCHF.name = 'EUR-CHF'
        for (let i = 0; i < 14; i++) {
          const USDEUR = this.chartAllData[i].quotes['USDEUR']
          const USDCHF = this.chartAllData[i].quotes['USDCHF']
          const EURUSD = (1/USDEUR)
          const EURCHF = (1/USDEUR)*USDCHF
          serieUSD.data.unshift(EURUSD)
          serieCHF.data.unshift(EURCHF)
        }
        this.series = [serieUSD, serieCHF]
      } else {
        serieUSD.name = 'CHF-USD'
        serieEUR.name = 'CHF-EUR'
        for (let i = 0; i < 14; i++) {
          const USDEUR = this.chartAllData[i].quotes['USDEUR']
          const USDCHF = this.chartAllData[i].quotes['USDCHF']
          const CHFUSD = 1/USDCHF
          const CHFEUR = (1/USDCHF)*USDEUR
          serieUSD.data.unshift(CHFUSD)
          serieEUR.data.unshift(CHFEUR)
        }
        this.series = [serieUSD, serieEUR]
      }
    },
    convertCurrency (curr, amount) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: curr }).format(amount)
    }
  }
}
</script>