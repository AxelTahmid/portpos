<template>
  <v-app dark>
    <navbar />

    <v-main style="background-color: #edeff3">
      <v-container fluid class="pa-5 mt-5">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Default',

  head() {
    return {
      title: 'ACS'
    }
  }
}
</script>

<style>
html {
  font-family: 'Poppins', serif;
}
</style>
