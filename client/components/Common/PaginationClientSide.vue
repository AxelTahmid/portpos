<!-- eslint-disable vuetify/grid-unknown-attributes -->
<template>
  <v-container fluid class="px-0 py-5">
    <v-row align="center" class="d-flex justify-space-between">
      <v-col v-if="bp.mdAndUp" cols="12" md="5" sm="12">
        <span class="grey--text pr-2">
          {{ 'Rows Per Page' }}
        </span>
        <v-menu offset-y right transition="slide-y-transition">
          <template #activator="{ on, attrs }">
            <v-chip pill small dark v-bind="attrs" color="primary" v-on="on">
              {{ itemsPerPage == itemsLength ? 'All' : itemsPerPage }}
              <v-icon color="white" class="pl-2"> mdi-menu-down </v-icon>
            </v-chip>
          </template>
          <v-list>
            <v-list-item
              v-for="(title, index) in itemsPerPageArray"
              :key="index"
              link
              class="black--text small"
            >
              <v-list-item-title
                v-model="itemsPerPage"
                class="black--text small"
                @click.prevent="setItemNumber(title)"
              >
                {{ title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <span class="grey--text pl-2">
          {{ `Total: ${itemsLength}` }}
        </span>
      </v-col>
      <v-col cols="12" md="5" sm="12" :align="bp.mdAndUp ? 'right' : 'center'">
        <span v-if="bp.mdAndUp" class="grey--text pr-2">
          {{ `Showing Page  ${page}  of  ${numberOfPages}` }}
        </span>
        <v-chip
          :disabled="page === 1"
          class="rounded-r-0"
          pill
          small
          color="white black--text"
          @click.prevent="formerPage()"
        >
          <v-icon color="black"> mdi-chevron-left </v-icon>
        </v-chip>
        <v-chip
          class="rounded-0 px-5"
          label
          pill
          small
          dark
          color="white black--text"
        >
          {{ page }}
        </v-chip>
        <v-chip
          :disabled="page === numberOfPages"
          class="rounded-0"
          label
          small
          dark
          color="white black--text"
          @click.prevent="nextPage()"
        >
          <v-icon color="black"> mdi-chevron-right </v-icon>
        </v-chip>
        <v-menu offset-y left>
          <template #activator="{ on, attrs }">
            <v-chip
              close-icon="mdi-delete"
              class="rounded-l-0"
              pill
              small
              dark
              v-bind="attrs"
              color="white black--text"
              v-on="on"
            >
              {{ itemsPerPage }}
              <v-icon color="black" class="pl-2"> mdi-menu-down </v-icon>
            </v-chip>
          </template>
          <v-list>
            <v-list-item
              v-for="(title, index) in itemsPerPageArray"
              :key="index"
              link
              class="black--text small"
            >
              <v-list-item-title
                v-model="itemsPerPage"
                class="black--text small"
                @click.prevent="setItemNumber(title)"
              >
                {{ title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PaginationClientSide',
  props: {
    itemsLength: Number,
    perPage: Number,
    currentPage: Number
  },
  data() {
    return {
      itemsPerPage: this.perPage, // 10,
      itemsPerPageArray: [10, 20, 30, 50, this.itemsLength],
      page: this.currentPage // 1,
      // title: null
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.itemsLength / this.itemsPerPage)
    }
  },

  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) {
        this.page += 1
        this.$emit('update:currentPage', this.page)
      }
    },
    formerPage() {
      if (this.page - 1 >= 1) {
        this.page -= 1
        this.$emit('update:currentPage', this.page)
      }
    },
    setItemNumber(data) {
      this.itemsPerPage = parseInt(data)
      this.$emit('update:perPage', parseInt(data))
      this.page = 1
      this.$emit('update:currentPage', this.page)
    }
  }
}
</script>

<style lang="scss" scoped></style>
