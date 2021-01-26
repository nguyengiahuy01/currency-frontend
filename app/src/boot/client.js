export default ({ Vue }) => {
    const CurrencyLayerClient = require('currencylayer-client')
    Vue.prototype.$client = new CurrencyLayerClient({apiKey: 'c7f688d0f675f61ef7b79b542f8be33e'})
}