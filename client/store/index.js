export const state = () => ({
  customerList: [],
  orderList: [],
  productList: []
})

export const getters = {
  customers(state) {
    return state.customerList
  },
  orders(state) {
    return state.orderList
  },
  products(state) {
    return state.productList
  }
}

export const mutations = {
  SET_CUSTOMER_LIST(state, data) {
    state.customerList = data
  },
  SET_ORDER_LIST(state, data) {
    state.orderList = data
  },
  SET_PRODUCT_LIST(state, data) {
    state.productList = data
  }
}

export const actions = {
  async getCustomerList({ commit }) {
    const { data } = await this.$api.customer.fetch()
    commit('SET_CUSTOMER_LIST', data.data)
  },

  async getOrderList({ commit }) {
    const { data } = await this.$api.order.fetch()
    commit('SET_ORDER_LIST', data.data)
  },

  async getProductList({ commit }) {
    const { data } = await this.$api.product.fetch()
    commit('SET_PRODUCT_LIST', data.data)
  }
}
