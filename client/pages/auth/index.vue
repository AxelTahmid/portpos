<template>
  <Login />
</template>

<script>
import Login from '../../components/Auth/Login'

export default {
  name: 'Index',
  components: { Login },
  layout: 'auth',

  head() {
    return { title: 'Auth' }
  }
}
</script>

<style>
html {
  font-family: 'Poppins', serif;
}
</style>
