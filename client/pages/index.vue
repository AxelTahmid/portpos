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
          <pagination-server-side
            store="shop"
            collection="orderList"
            dispatch-to="/getOrderList"
            set-current-page="/SET_ORDERLIST_PAGE"
            set-per-page="/SET_ORDERLIST_ROWS"
            :filter-mode.sync="filterMode"
            @filterAction="applyFilter()"
          />

          <v-data-table
            class="elevation-1"
            item-key="id"
            :headers="headers"
            :items="orderList"
            :search="search"
            hide-default-footer
            no-data-text="No data found"
            disable-sort
          >
            <template #[`item.id`]="{ item }">
              <v-chip small color="secondary" :to="'/shop/orders/' + item.id">
                {{ item.id }}
              </v-chip>
            </template>

            <template #[`item.status`]="{ item }">
              {{ item.status ?? 'Unknown' }}
            </template>

            <template #[`item.payment_method`]="{ item }">
              {{ item.payment_method ?? '-' }}
            </template>

            <template #[`item.account_number`]="{ item }">
              {{ item.account_number ?? '-' }}
            </template>

            <template #[`item.transaction_id`]="{ item }">
              {{ item.transaction_id ?? '-' }}
            </template>

            <template #[`item.order_total`]="{ item }">
              {{ item.order_total ?? '-' }}
            </template>

            <template #[`item.user_id`]="{ item }">
              <v-chip
                v-if="item.user_id"
                link
                small
                color="secondary"
                :to="'/user/customer/' + item.user_id"
              >
                {{ item.user_id }}
              </v-chip>
              <span v-else>{{ '-' }}</span>
            </template>

            <template #[`item.admin_id`]="{ item }">
              <v-chip
                v-if="item.admin_id"
                link
                small
                color="secondary"
                :to="'/user/admin/' + item.admin_id"
              >
                {{ item.admin_id }}
              </v-chip>
              <span v-else>{{ '-' }}</span>
            </template>

            <template #[`item.coupon_id`]="{ item }">
              <v-chip
                v-if="item.coupon_id"
                link
                small
                color="secondary"
                :to="'/user/admin/' + item.coupon_id"
              >
                {{ item.coupon_id }}
              </v-chip>
              <span v-else>{{ '-' }}</span>
            </template>

            <template #[`item.created_at`]="{ item }">
              {{ item.created_at ?? '-' }}
            </template>

            <template #[`item.updated_at`]="{ item }">
              {{ item.updated_at ?? '-' }}
            </template>

            <!-- <template #[`item.action`]="{ item }">
              <v-btn icon @click.prevent="editItem(item, item.id)">
                <v-icon color="primary"> mdi-square-edit-outline </v-icon>
              </v-btn>
              <v-btn
                icon
                @click.prevent="
                  openDeleteDialog({ id: item.id, product: item.product_id })
                "
              >
                <v-icon color="primary"> mdi-trash-can-outline </v-icon>
              </v-btn>
            </template> -->
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
      filterMode: false,
      filterForm: {
        status: '',
        product_id: ''
      },
      filterStatusOpts: ['active', 'reserved', 'delivered'],
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
          text: 'Total',
          value: 'order_total',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Payment',
          value: 'payment_method',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Account',
          value: 'account_number',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'TrxID',
          value: 'transaction_id',
          class: 'accentlight',
          align: 'center'
        },

        {
          text: 'User',
          value: 'user_id',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Admin',
          value: 'admin_id',
          class: 'accentlight',
          align: 'center'
        },
        {
          text: 'Coupon',
          value: 'coupon_id',
          class: 'accentlight',
          align: 'center',
          width: '5%'
        },
        {
          text: 'Created',
          value: 'created_at',
          class: 'accentlight',
          align: 'center',
          width: '10%'
        },
        {
          text: 'Updated',
          value: 'updated_at',
          class: 'accentlight',
          align: 'center',
          width: '10%'
        }
      ]
    }
  },

  head() {
    return { title: 'Orders' }
  },

  computed: {
    ...mapGetters({
      orderList: 'shop/orders',
      productList: 'product/tree'
    })
  },

  watch: {
    init: {
      handler(nv, ov) {
        if (!this.orderList || !this.orderList.length) {
          this.initialize()
        }
        if (!this.productList.length) {
          this.$store.dispatch('product/getProductTree')
        }
      },
      immediate: true
    },
    filterMode(nv, ov) {
      if (!nv) {
        this.filterForm = {
          status: '',
          product_id: ''
        }
        this.initialize()
      }
    }
  },

  methods: {
    async initialize() {
      try {
        this.loading = true
        await this.$store.dispatch('shop/getOrderList')
      } catch (e) {
        this.$toast.error(e.response?.data?.message || e.message)
      } finally {
        this.loading = false
      }
    },

    async applyFilter() {
      try {
        this.loading = true
        await this.$store.dispatch('shop/getFilteredOrders', this.filterForm)
      } catch (e) {
        this.$toast.error(e.response?.data?.message || e.message)
      } finally {
        this.loading = false
      }
    },

    async callDestroy() {
      await this.destroy(this.$api.order.destroy)
    }
  }
}
</script>
