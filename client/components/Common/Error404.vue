<template>
  <v-row align="center" no-gutters>
    <v-col cols="12" class="d-flex justify-center">
      <v-img
        :src="page404"
        contain
        :aspect-ratio="bp.mdAndUp ? 6 : 2"
        class="mt-4 justify-center"
      />
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <span class="text-h1 pt-10 pb-2">{{ pageNotFound ? '404' : '500' }}</span>
    </v-col>

    <v-col cols="12" class="d-flex justify-center">
      <span class="py-5 text--disabled">
        {{ pageNotFound ? 'Page Not Found' : 'Something Went Wrong' }}
      </span>
    </v-col>

    <v-col cols="12" class="d-flex justify-center">
      <v-btn
        rounded
        depressed
        class="primary px-10"
        @click.prevent="$router.back()"
      >
        {{ 'Return' }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import page404 from 'static/page404.png'

export default {
  props: {
    pageNotFound: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    reveal: false,
    page404
  })
}
</script>
