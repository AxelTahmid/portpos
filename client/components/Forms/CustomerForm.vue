<template>
  <v-container>
    <v-dialog :value="show" persistent max-width="400px">
      <v-card>
        <v-card-title
          :class="bp.mdAndUp ? 'py-2' : 'py-2 d-flex justify-center'"
        >
          {{ 'Add Customer' }}
        </v-card-title>

        <v-divider />

        <v-form ref="formcomponent" class="px-1 py-3">
          <v-row no-gutters class="pa-0">
            <v-col cols="12" class="pa-2">
              <v-text-field
                v-model="customerForm.name"
                dense
                rounded
                hide-details="auto"
                outlined
                label="Name"
              />
            </v-col>
            <v-col cols="12" class="pa-2">
              <v-text-field
                v-model="customerForm.email"
                dense
                rounded
                hide-details="auto"
                outlined
                label="Email"
              />
            </v-col>
            <v-col cols="12" class="pa-2">
              <v-text-field
                v-model="customerForm.phone"
                dense
                rounded
                hide-details="auto"
                outlined
                label="Phone"
              />
            </v-col>
            <v-col cols="12" class="pa-2">
              <v-text-field
                v-model="customerForm.address"
                dense
                rounded
                hide-details="auto"
                outlined
                label="Address"
              />
            </v-col>
          </v-row>
        </v-form>

        <v-divider />

        <v-card-actions class="py-3">
          <v-row no-gutters>
            <v-col
              :class="
                bp.mdAndUp ? 'd-flex justify-end' : 'd-flex justify-center'
              "
            >
              <v-btn
                rounded
                depressed
                small
                outlined
                class="px-7"
                @click.prevent="reset()"
              >
                {{ 'Close' }}
              </v-btn>

              <span class="px-2" />
              <v-btn
                rounded
                depressed
                small
                class="primary px-10"
                :loading="loading"
                @click.prevent="create()"
              >
                {{ 'Save' }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'CustomerForm',

  props: {
    show: Boolean
  },

  data() {
    return {
      loading: false,
      customerForm: {
        amount: '',
        product_id: '',
        customer_id: ''
      }
    }
  },

  methods: {
    reset() {
      this.$emit('update:show', false)
      this.$refs.formcomponent.reset()
    },

    async create() {
      try {
        this.loading = true
        const data = await this.$api.customer.create(this.customerForm)
        await this.$store.dispatch('getCustomerList')

        this.$emit('updateCustomer', data.data.data.id)
        this.reset()
      } catch (e) {
        this.$toast.error(e.response?.data?.message || e.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
