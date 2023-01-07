<template>
  <v-container class="fill-height" fluid>
    <error404 :page-not-found="error.statusCode === 404" />
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
html {
  font-family: 'Poppins', serif;
}
</style>
