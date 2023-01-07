<template>
  <v-container>
    <v-dialog :value="show" persistent max-width="600px">
      <v-card>
        <v-card-title
          :class="bp.mdAndUp ? 'py-2' : 'py-2 d-flex justify-center'"
        >
          {{ 'Add Order' }}
        </v-card-title>

        <v-divider />

        <v-form ref="formcomponent" class="px-1 py-3">
          <v-row no-gutters class="pa-0">
            <v-col cols="12" class="pa-2">
              <v-text-field
                v-model="orderForm.amount"
                dense
                rounded
                hide-details="auto"
                outlined
                label="Order Amount"
              />
            </v-col>

            <v-col cols="12" sm="4" md="4" class="pa-2">
              <v-btn
                dense
                rounded
                @click.prevent="showCustomerForm = !showCustomerForm"
              >
                {{ 'Add Customer' }}</v-btn
              >
            </v-col>

            <v-col cols="12" sm="8" md="8" class="pa-2">
              <v-autocomplete
                v-model="orderForm.customer_id"
                :items="customerList"
                item-text="email"
                item-value="id"
                placeholder="Or Select Customer"
                dense
                clearable
                rounded
                outlined
                class="white"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" sm="4" md="4" class="pa-2">
              <v-btn
                dense
                rounded
                @click.prevent="showProductForm = !showProductForm"
              >
                {{ 'Add Product' }}</v-btn
              >
            </v-col>

            <v-col cols="12" sm="8" md="8" class="pa-2">
              <v-autocomplete
                v-model="orderForm.product_id"
                :items="productList"
                item-text="name"
                item-value="id"
                placeholder="Or Select Product"
                dense
                clearable
                rounded
                outlined
                class="white"
                hide-details="auto"
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
                :loading="processing"
                @click.prevent="create()"
              >
                {{ 'Save' }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <customer-form
      :show.sync="showCustomerForm"
      @updateCustomer="orderForm.customer_id = $event"
    />

    <product-form
      :show.sync="showProductForm"
      @updateProduct="orderForm.product_id = $event"
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderForm',

  props: {
    show: Boolean,
    processing: Boolean
  },

  data() {
    return {
      showCustomerForm: false,
      showProductForm: false,
      orderForm: {
        amount: '',
        product_id: '',
        customer_id: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      orderList: 'orders',
      productList: 'products',
      customerList: 'customers'
    })
  },

  methods: {
    reset() {
      this.$emit('update:show', false)
      this.$refs.formcomponent.reset()
    },

    create() {
      if (this.$refs.formcomponent.validate()) {
        this.$emit('create', this.$api.order.save, this.orderForm)
      }
    }
  }
}
</script>
