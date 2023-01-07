<template>
  <v-container fluid class="pa-2">
    <table-header
      title="Orders"
      :add-btn="false"
      @updateSearch="search = $event"
      @initialize="initialize()"
      @flush="initialize()"
    />
    <!-- @showForm="formDialog = !formDialog" -->

    <v-row class="pa-0">
      <v-col class="py-0">
        <v-divider />
        <v-skeleton-loader v-if="loading" type="table" class="pt-5" />
        <template v-else>
          <pagination-client-side
            :items-length="orderList ? orderList.length : 0"
            :per-page.sync="itemsPerPage"
            :current-page.sync="page"
          />

          <v-data-table
            class="elevation-1"
            item-key="id"
            :headers="headers"
            :items="orderList"
            :search="search"
            hide-default-footer
            no-data-text="No data found"
          >
            <template #[`item.id`]="{ item }">
              {{ item.id ?? '-' }}
            </template>

            <template #[`item.status`]="{ item }">
              <v-autocomplete
                :value="item.status"
                :items="orderStatus"
                dense
                hide-details="auto"
                @change="changeStatus($event, item.id)"
              />
            </template>

            <template #[`item.invoice_id`]="{ item }">
              {{ item.invoice_id ?? '-' }}
            </template>

            <template #[`item.amount`]="{ item }">
              {{ item.amount ?? '-' }}
            </template>

            <template #[`item.payment_link`]="{ item }">
              <v-btn
                v-if="item.payment_link"
                small
                rounded
                @click.prevent="copyContent(item.payment_link)"
              >
                {{ 'Copy' }}
              </v-btn>
              <span v-else>{{ ' - ' }}</span>
            </template>

            <template #[`item.customer_name`]="{ item }">
              {{ item.customer_name ?? '-' }}
            </template>

            <template #[`item.customer_email`]="{ item }">
              {{ item.customer_email ?? '-' }}
            </template>

            <template #[`item.customer_phone`]="{ item }">
              {{ item.customer_phone ?? '-' }}
            </template>

            <template #[`item.customer_address`]="{ item }">
              {{ item.customer_address ?? '-' }}
            </template>

            <template #[`item.product_name`]="{ item }">
              {{ item.product_name ?? '-' }}
            </template>

            <template #[`item.product_details`]="{ item }">
              {{ item.product_details ?? '-' }}
            </template>
            <template #[`item.created_at`]="{ item }">
              {{ item.created_at ?? '-' }}
            </template>

            <template #[`item.updated_at`]="{ item }">
              {{ item.updated_at ?? '-' }}
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>

    <confirmation-dialogue
      title="delete"
      :show="deleteDialog"
      :processing="btnLoading"
      @close="closeDeleteDialog()"
      @action="callDestroy()"
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import crudMixin from '@/mixin/crudMixin'

export default {
  name: 'Orders',
  mixins: [crudMixin],

  data() {
    return {
      orderStatus: ['Pending', 'Paid', 'Fulfilled', 'Refund'],
      headers: [
        {
          text: '#ID',
          value: 'id',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Status',
          value: 'status',
          class: 'accentlight',
          align: 'center',
          width: '10%'
        },
        {
          text: 'Invoice',
          value: 'invoice_id',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Amount',
          value: 'amount',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Payment Link',
          value: 'payment_link',
          class: 'accentlight',
          align: 'center',
          width: '5%'
        },
        {
          text: 'Name',
          value: 'customer_name',
          class: 'accentlight',
          align: 'center'
        },

        {
          text: 'Email',
          value: 'customer_email',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Phone',
          value: 'customer_phone',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Address',
          value: 'customer_address',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Product',
          value: 'product_name',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Details',
          value: 'product_details',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Created',
          value: 'created_at',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Updated',
          value: 'updated_at',
          class: 'accentlight',
          align: 'center'
        }
      ]
    }
  },

  head() {
    return { title: 'Orders' }
  },

  computed: {
    ...mapGetters({
      orderList: 'orders',
      productList: 'products',
      customerList: 'customers'
    })
  },

  watch: {
    init: {
      handler(nv, ov) {
        if (!this.orderList || !this.orderList.length) {
          this.initialize()
        }
      },
      immediate: true
    }
  },

  methods: {
    async initialize() {
      try {
        this.loading = true
        await Promise.all([
          this.$store.dispatch('getCustomerList'),
          this.$store.dispatch('getOrderList'),
          this.$store.dispatch('getProductList')
        ])
      } catch (e) {
        this.$toast.error(e.response?.data?.message || e.message)
      } finally {
        this.loading = false
      }
    },

    async copyContent(text) {
      try {
        await navigator.clipboard.writeText(text)
        this.$toast.success('Payment Link Copied to Clipboard')
      } catch (e) {
        this.$toast.error(e.response?.data?.message || e.message)
      }
    },

    async changeStatus(status, editID) {
      try {
        await this.$api.order.update({ status, editID })
        this.$toast.success('Order Status Changed')
        await this.initialize()
      } catch (e) {
        this.$toast.error(e.response?.data?.message || e.message)
      }
    },

    async callDestroy() {
      await this.destroy(this.$api.order.destroy)
    }
  }
}
</script>
