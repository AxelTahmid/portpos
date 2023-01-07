const resource = '/v1/order/'

export default ($client) => ({
  fetch() {
    return $client.get(resource)
  },

  fetchById(id) {
    return $client.get(resource + id)
  },

  save(payload) {
    const { amount, customer_id, product_id } = payload || {}
    return $client.post(resource, { amount, customer_id, product_id })
  },

  update(payload) {
    const { status } = payload || {}
    return $client.patch(resource + payload.editID, {
      status
    })
  },

  destroy(id) {
    return $client.delete(resource + id)
  }
})
