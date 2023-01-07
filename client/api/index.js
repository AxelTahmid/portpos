import customerApi from './customer'
import productApi from './product'
import orderApi from './order'

export default ($client) => ({
  customer: customerApi($client),

  product: productApi($client),

  order: orderApi($client)
})
