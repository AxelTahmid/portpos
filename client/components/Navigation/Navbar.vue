<template>
  <v-navigation-drawer app overlay-color="green">
    <v-list-item link class="pa-5 pb-1">
      <profile-avatar />
    </v-list-item>

    <v-list rounded dense>
      <v-list-item v-for="(item, i) in items" :key="i" dense :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <span class="pp-body-reg-1">
            {{ item.title }}
          </span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Navbar',

  data: () => ({
    listLoader: false,

    items: [
      {
        icon: 'mdi-view-dashboard-outline',
        title: 'Orders',
        to: '/'
      }
    ]
  })
}
</script>
