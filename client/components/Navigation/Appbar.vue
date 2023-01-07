<template>
  <v-app-bar
    absolute
    flat
    app
    class="pt-2"
    fixed
    style="background-color: transparent"
  >
    <v-spacer />

    <v-menu offset-y left transition="slide-y-transition">
      <template #activator="{ on, attrs }">
        <v-btn
          text
          plain
          small
          rounded
          v-bind="attrs"
          class="px-0"
          style="background-color: transparent"
          v-on="on"
        >
          <v-avatar size="30">
            <v-img :src="favicon" />
          </v-avatar>
          <v-list-item-content class="px-0">
            <span class="pa-0 px-2 text-caption text-left text-capitalize">
              {{ username }}
            </span>
          </v-list-item-content>
          <v-icon left> mdi-menu-down </v-icon>
        </v-btn>
      </template>
      <v-card rounded max-width="200px">
        <v-list dense>
          <v-list-item class="black--text small" dense selectable>
            <v-avatar size="40">
              <v-img :src="favicon" />
            </v-avatar>
            <v-list-item-content>
              <v-card-subtitle class="pa-0 px-2">
                {{ username }}
              </v-card-subtitle>
              <span class="pa-0 px-2 text-caption">
                {{ userRole ? userRole : '-' }}
              </span>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item dense @click="$auth.logout()">
            <v-list-item-avatar size="20">
              <v-icon dense> mdi-logout </v-icon>
            </v-list-item-avatar>
            <v-list-item-title class="text-capitalize">
              {{ 'Logout' }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Appbar',

  data: () => ({
    userRole: null,
    username: '',
    userImage: ''
  }),

  created() {
    this.initUser()
  },

  methods: {
    initUser() {
      this.username = this.$auth.user.email
      this.userRole = this.$auth.user.role
    }
  }
}
</script>
