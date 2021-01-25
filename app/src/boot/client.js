export default ({ Vue }) => {
    const CurrencyLayerClient = require('currencylayer-client')
    Vue.prototype.$client = new CurrencyLayerClient({apiKey: 'c2500f69486298bb5f8529aa229c32fc'})
}