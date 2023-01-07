const resource = '/v1/customer/'

export default ($client) => ({
  fetch() {
    return $client.get(resource)
  },

  fetchById(id) {
    return $client.get(resource + id)
  },

  create(payload) {
    const { name, email, phone, address } = payload || {}

    return $client.post(resource, { name, email, phone, address })
  },

  update(payload) {
    const { name, email, phone, address, editID } = payload || {}

    return $client.patch(resource + editID, { name, email, phone, address })
  },

  destroy(id) {
    return $client.delete(resource + id)
  }
})
