<template>
  <v-app dark>
    <v-main>
      <Nuxt />
    </v-main>
    <v-navigation-drawer :value="orders.length > 1" right fixed app>
      <template #prepend>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="text-h5 text-center font-weight-bold success--text"
              >Recently Completed</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>

      <v-list>
        <v-container v-for="(order, index) in orders" :key="order.orderNumber">
          <!-- Skip first, is displayed in big screen -->
          <v-list-item v-if="index != 0">
            <v-list-item-title class="text-h1 text-center">{{
              String(order.orderNumber).padStart(3, '0')
            }}</v-list-item-title>
          </v-list-item>
        </v-container>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  computed: {
    orders() {
      return this.$store.state.orders.orders
    },
  },
}
</script>
