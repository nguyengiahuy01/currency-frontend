<template>
  <q-page class="container">
    <div
      class="row q-col-gutter-md q-px-md q-pt-md justify-center"
      key="lineSmall"
    >
      <div class="col-md-3" v-for="i in 3" :key="i">
        <ApexLineSmall 
          :bgColorCard="colors[i - 1]"/>
      </div>
    </div>
    <div class="row q-col-gutter-md q-px-md q-py-md justify-center">
      <div class="col-md-6 col-sm-12 col-xs-12">
    <q-card class="mycard" flat bordered>
      <q-card-section>
        <div class="text-h6">Currency Währungsrechner</div>
        <div class="text-subtitle2">by Gia Huy Nguyen</div>
      </q-card-section>
      <!-- <Chart/> -->
      <q-card-section class="q-pt-xs">
        <q-card-section horizontal>
          <q-select v-model="selectedA" :options="optionsA" label="Von"/>
          <q-select v-model="selectedB" :options="optionsB" label="in" />
          <q-input
            v-model.number="amount"
            type="number"
            filled
            label="Beitrag"
          />
          <q-btn @click="convert()"
                flat icon="arrow_right"
                color="primary"/>
        </q-card-section>
      </q-card-section>
    </q-card>
      </div></div>
  </q-page>
</template>

<script>
import ApexLineSmall from 'components/ApexLineSmall'
export default {
  name: 'PageIndex',
  components: {
    ApexLineSmall
  },
  data () {
    return {
      selectedA: 'USD',
      selectedB: 'EUR',
      optionsA: ['USD', 'EUR', 'CHF'],
      optionsB: ['USD', 'EUR', 'CHF'],
      amount: 0,
      loading: true,
      dialog: true,
      colors: [
        'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
        'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
        'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)',
        'linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)'
      ]
    }
  },
  methods: {
    async convert () {
      const converted = await this.$client.live()
      /* client.convert({from: this.selectedA, to: this.selectedB, amount: this.amount}) */
      console.log(converted)
    }
  }
}
</script>
