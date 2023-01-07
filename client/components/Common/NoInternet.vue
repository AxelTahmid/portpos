<template>
  <v-container class="align">
    <v-row align="end" justify="end" align-content="end" style="height: 450px">
      <v-col cols="12" sm="12" md="12" lg="12" align-self="end">
        <v-card class="mx-auto pa-2" style="background-color: transparent" flat>
          <v-card
            class="mx-auto"
            max-width="344"
            style="background-color: transparent"
            flat
          >
            <v-img :src="emptyParcelBox" aspect-ratio="2.5" contain />
          </v-card>

          <span class="kep_title" style="color: #9d9c9c">
            <v-spacer />
            {{ 'no_internet_text' }}
            <v-spacer />
          </span>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import emptyParcelBox from '@/static/nowifi.png'

export default {
  data: () => ({
    reveal: false,
    emptyParcelBox
  })
}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
