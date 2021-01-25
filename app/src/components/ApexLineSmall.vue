<template>
  <card-base :bgColor="'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)'">
    <div class="row">
      <div class="col-2 text-h6 text-white">
        <q-select v-model="selected" :options="options" label="Währung">
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-12">
      <apexchart ref="realtimeChart" type="line" height="90" :options="chartOptions" :series="series" />
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
  props: {
    options: {
      type: Array
    }
  },
  async mounted () {
    const quotesList = []
    const data = []
    for (let i = 14; i > 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      this.chartOptions.xaxis.categories.push(date)
      const quotes = (await this.$client.historical({date})).quotes
      quotesList.push(quotes)
    }
    for (const quotes of quotesList) {
      data.push(quotes['USDEUR'])
    }
    this.series.push({
      name: 'USD - EUR',
      data
    })
  },
  data () {
    return {
      selected: this.options[0],
      series: [],
      chartOptions: {
        colors: ['#FFF', '#17ead9', '#f02fc2'],
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
          width: 4
        },
        xaxis: {
          categories: [],
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
            show: false,
            style: {
              color: '#fff'
            }
          }
        }
      }
    }
  }
}
</script>