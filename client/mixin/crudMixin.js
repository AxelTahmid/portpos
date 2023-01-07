export default {
  data() {
    return {
      search: '',
      page: 1,
      itemsPerPage: 20,
      loading: false,
      btnLoading: false,
      formDialog: false,
      deleteDialog: false,
      deleteID: '',
      editForm: false,
      editID: '',
      form: {}
    }
  },
  methods: {
    async create(action, payload) {
      try {
        this.btnLoading = true

        const res = await action(payload)

        this.$toast.success(res.data?.message || 'Created')

        this.initialize()
      } catch (e) {
        this.$toast.error(e.response?.data?.message || e.message)
      } finally {
        this.formDialog = false
        this.btnLoading = false
      }
    },

    editItem(item, id) {
      this.form = { ...item }
      this.editID = id
      this.editForm = true
      this.formDialog = true
    },

    async update(action, payload) {
      try {
        this.btnLoading = true

        const res = await action({
          ...payload,
          editID: this.editID
        })

        this.$toast.success(res.data?.message || 'Updated')

        this.initialize()
      } catch (e) {
        this.$toast.error(e.response?.data?.message || e.message)
      } finally {
        this.btnLoading = false
        this.editForm = false
        this.formDialog = false
      }
    },

    openDeleteDialog(id) {
      this.deleteID = id
      this.deleteDialog = true
    },

    closeDeleteDialog() {
      this.deleteID = ''
      this.deleteDialog = false
    },

    async destroy(action) {
      try {
        this.btnLoading = true

        const res = await action(this.deleteID)

        this.$toast.success(res.data?.message || 'Deleted')

        this.initialize()
      } catch (e) {
        this.$toast.error(e.response?.data?.message || e.message)
      } finally {
        this.closeDeleteDialog()
        this.btnLoading = false
      }
    }
  }
}
