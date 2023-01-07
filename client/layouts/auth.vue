<template>
  <v-app
    style="
      background: linear-gradient(
        to bottom,
        #f7f7f7 0%,
        #f7f7f7 50%,
        #e5e5e5 50%,
        #e5e5e5 100%
      );
    "
  >
    <v-main>
      <v-container class="bg fill-height grid-list-md text-center">
        <v-row align="center">
          <v-col>
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Auth',
  head() {
    return {
      title: 'Admin'
    }
  }
}
</script>
<style>
html {
  font-family: 'Poppins', serif;
}
</style>
