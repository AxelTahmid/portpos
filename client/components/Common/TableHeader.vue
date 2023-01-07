<template>
  <v-row class="pa-0">
    <v-col
      cols="12"
      sm="12"
      md="5"
      :class="
        bp.mdAndUp ? 'd-flex justify-start py-0' : 'd-flex justify-center'
      "
      align-self="center"
    >
      <span class="kep_title text-capitalize text-center">
        {{ title }}
      </span>
    </v-col>

    <v-col
      cols="12"
      sm="12"
      md="4"
      align-self="center"
      :class="bp.mdAndUp ? 'd-flex justify-end pa-0' : 'd-flex justify-center'"
    >
      <v-btn-toggle rounded>
        <v-btn class="white" small @click.prevent="$emit('initialize')">
          <v-icon> mdi-refresh </v-icon>
          <span class="px-2">fetch</span>
        </v-btn>

        <v-btn class="white" small @click.prevent="$emit('flush')">
          <v-icon> mdi-database-refresh-outline </v-icon>
          <span class="px-2">clear</span>
        </v-btn>

        <v-btn
          v-if="addBtn"
          class="white"
          small
          @click.prevent="$emit('showForm')"
        >
          <v-icon> mdi-plus </v-icon>
          <span class="px-2">add</span>
        </v-btn>
      </v-btn-toggle>
    </v-col>

    <v-col cols="12" sm="12" md="3" align-self="center">
      <v-text-field
        v-model="search"
        dense
        rounded
        hide-details
        background-color="white"
        placeholder="Search..."
        class="pa-0 ma-0"
        @keyup.prevent="$emit('updateSearch', search)"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    title: String,
    addBtn: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      search: ''
    }
  }
}
</script>
