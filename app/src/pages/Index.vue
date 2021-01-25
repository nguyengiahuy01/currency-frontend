<template>
  <q-page class="container">
    <div class="row q-col-gutter-md q-px-md q-pt-md justify-center">
      <div class="col-md-3" v-for="i in 3" :key="i">
        <ApexLineSmall 
          :bgColorCard="cards.colors[i - 1]"
          :title="cards.titles[i -1]"/>
      </div>
    </div>
    <div class="row q-col-gutter-md q-px-md q-py-md justify-center">
      <div class="col-md-6 col-sm-12 col-xs-12">
    <q-card class="mycard" flat bordered>
      <q-card-section>
        <div class="text-h6">Currency Währungsrechner</div>
      </q-card-section>
      <!-- <Chart/> -->
      <q-card-section class="q-pt-xs">
        <q-card-section horizontal>
          <q-select v-model="from" :options="options" label="Von">
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
          </q-select>&nbsp;
          <q-select v-model="to" :options="options" label="in">
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
          </q-select>&nbsp;
          <q-input
            v-model.number="amount"
            type="number"
            filled
            label="Beitrag"
            style="width: 100%"
          />
          <q-btn @click="caculate()"
                flat icon="arrow_right"
                color="primary"/>
          <hr>
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <div class="text-bold" v-if="to.description !== from.description"><hr>
          1&nbsp;{{ from.description }} = {{ convert(from.value, to.value, 1).toFixed(5) + ' ' + to.description }}<br>
          1&nbsp;{{ to.description }} = {{ convert(to.value, from.value, 1).toFixed(5) + ' ' + from.description }}
        </div>
        <div v-if="result">
          <hr>
          <div class="text-h6">
            {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: fromResult.value.slice(3) }).format(amount) }}
            &nbsp;({{ fromResult.description }}) = <br>
          </div>
          <div class="text-h3" style="color: grey">
            {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: toResult.value.slice(3)}).format(result) }}&nbsp;
          </div>
          <div class="text-h6">
            {{ toResult.description }}
          </div>
        </div>
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
  async mounted () {
    await this.retrieveQuotes()
  },
  watch: {
    amount (val) {
      this.result = this.convert(this.fromResult.value, this.toResult.value, val)
    }
  },
  data () {
    const usd = {
          label: 'USD',
          value: 'USDUSD',
          description: 'US-Dollar',
          icon: 'monetization_on'
        }
    const eur = {
          label: 'EUR',
          value: 'USDEUR',
          description: 'Euro',
          icon: 'euro_symbol'
        }
    const chf = {
          label: 'CHF',
          value: 'USDCHF',
          description: 'Schweizer Franken',
          icon: 'dollar'
        }
    return {
      from: usd,
      to: eur,
      options: [usd, eur, chf],
      amount: 1,
      result: null,
      fromResult: '',
      toResult: '',
      loading: true,
      dialog: true,
      quotes: [],
      cards: { 
          colors: [
          'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
          'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
          'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)'
        ],
        titles: [usd, eur, chf]
      }
    }
  },
  methods: {
    async retrieveQuotes () {
      this.quotes = (await this.$client.live()).quotes
    },
    convert (from, to, amount) {
      // because of restricted Access  - (Your current Subscription Plan does not support HTTPS Encryption)
      let result
      if (from === 'USDUSD') {
        result = amount * this.quotes[to]
      } else {
        result = (amount/this.quotes[from])*(this.quotes[to])
      }
      return result
    },
    async caculate () {
      try {
        await this.retrieveQuotes()
        this.result = this.convert(this.from.value, this.to.value, this.amount)
        this.fromResult = this.from
        this.toResult = this.to
        this.hideResult = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
