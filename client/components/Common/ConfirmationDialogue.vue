<template>
  <v-dialog :value="show" persistent max-width="390">
    <v-card align="center">
      <v-card-text class="text-center pa-5">
        {{ `Are you sure you want to ${title} this?` }}
      </v-card-text>
      <v-card-actions class="pb-5">
        <v-spacer />
        <v-btn
          color="primary"
          outlined
          rounded
          small
          class="px-5"
          @click.prevent="close()"
        >
          {{ 'No' }}
        </v-btn>
        <v-btn
          class="primary px-5"
          rounded
          small
          :loading="processing"
          @click.prevent="action()"
        >
          {{ 'Yes' }}
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmationDialogue',
  props: {
    title: String,
    show: Boolean,
    processing: Boolean
  },

  methods: {
    close() {
      this.$emit('close')
    },
    action() {
      this.$emit('action')
    }
  }
}
</script>
