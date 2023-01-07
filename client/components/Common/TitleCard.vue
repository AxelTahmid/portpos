<template>
  <v-card
    class="pa-0 pb-2"
    style="background-color: transparent"
    flat
    color="transparent"
  >
    <v-container fluid class="pa-0 fill-height">
      <v-row class="pa-0" no-gutters align="center">
        <v-list-item class="px-0">
          <span class="py-0 kep_title text-capitalize text-center">
            {{ title }}
          </span>
        </v-list-item>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'TitleCard',
  props: {
    title: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped></style>
