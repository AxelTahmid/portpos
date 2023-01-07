<template>
  <v-container fluid>
    <v-row justify="center">
      <v-menu
        bottom
        min-width="150px"
        rounded
        offset-y
        left
        transition="slide-x-transition"
      >
        <template #activator="{ on }">
          <v-img :src="logo" aspect-ratio="3" contain v-on="on" />
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center text-capitalize">
              <h3>{{ user.role }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3" />
              <v-btn
                depressed
                dense
                rounded
                text
                @click.prevent="$auth.logout()"
              >
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProfileAvatar',
  data: () => ({
    user: {
      role: '',
      email: ''
    }
  }),

  created() {
    this.initUser()
  },

  methods: {
    initUser() {
      this.user.email = this.$auth.user.email
      this.user.role = this.$auth.user.role
    }
  }
}
</script>
