<template>
  <v-row no-gutters align="center" class="pb-2">
    <v-card
      class="pa-0 pb-2"
      style="background-color: transparent"
      flat
      color="transparent"
    >
      <v-container fluid class="pa-0 fill-height">
        <v-row class="pa-0" no-gutters align="center">
          <v-list-item class="px-0">
            <v-btn class="primary" icon @click.prevent="$router.back()">
              <v-icon color="white"> mdi-chevron-double-left </v-icon>
            </v-btn>
            <span class="px-2" />

            <span class="kep_title">
              {{ title }}
            </span>
          </v-list-item>
        </v-row>
      </v-container>
    </v-card>
    <v-col cols="12" class="pb-2">
      <v-divider />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TitleRow',
  props: {
    title: String
  }
}
</script>
