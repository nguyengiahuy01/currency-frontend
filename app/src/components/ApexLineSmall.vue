<template>
  <card-base :bgColor="bgColorCard">
    <div class="row">
      <div class="col-12 text-h6 text-white">
        {{ title.label }}<br>
        <small>{{ title.description }}</small>
      </div>
      <div class="col-12">
      <apexchart ref="realtimeChart" type="line" height="90" :options="chartOptions" :series="series" />
      <q-select v-model="selected" :options="options" color="white"/>
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
    bgColorCard: {
      type: String
    },
    title: {
      type: Object
    }
  },
  data () {
    return {
      series: [{
        data: [10, 41, 850, 51, 260, 62, 420, 91, 600]
      }],
      options: ['EUR', 'CHF'],
      selected: null,
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
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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