const resource = '/v1/product/'

export default ($client) => ({
  fetchList() {
    return $client.get(resource)
  },

  fetch(id) {
    return $client.get(resource + id)
  },

  save(payload) {
    return $client.post(resource, payload)
  },

  update(payload) {
    const { editID } = payload

    return $client.put(resource + editID, payload)
  },

  destroy(slug) {
    return $client.delete(resource + slug)
  }
})
