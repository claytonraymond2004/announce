<template>
  <v-container
    v-if="order"
    ref="background"
    fill-height
    fluid
    style="transition: background 0.25s ease"
    :class="{ green: greenBackground }"
  >
    <v-row class="pa-0">
      <v-col class="text-center text-h1 pa-0 ma-0" style="line-height: 1"
        >ORDER NUMBER</v-col
      >
    </v-row>
    <v-row align="center" justify="center" class="text-center">
      <v-col
        v-if="order"
        v-resize-text="{
          ratio: 0.1,
          minFontSize: '100px',
          maxFontSize: '550px',
          delay: 200,
        }"
        style="line-height: 1"
        class="pa-0 ma-0 font-weight-black"
        >{{ String(order.orderNumber).padStart(3, '0') }}</v-col
      >
    </v-row>
  </v-container>
  <v-container v-else fill-height fluid>
    <v-row class="pa-0">
      <v-col
        v-resize-text="{
          ratio: 0.1,
          minFontSize: '100px',
          maxFontSize: '700px',
          delay: 200,
        }"
        class="text-center text-h1 pa-0 ma-0 font-weight-black"
        >Come to the window when your Order Number is displayed here.</v-col
      >
    </v-row>
  </v-container>
</template>

<script>
const faye = require('faye')
export default {
  name: 'IndexPage',
  data() {
    return {
      greenBackground: false,
      flashingBackground: false,
      flashCount: 0,
      flashInterval: null,
    }
  },
  head: {
    title: 'Orders',
  },
  computed: {
    order() {
      return this.$store.state.orders.orders[0]
    },
  },
  mounted() {
    this.$store.dispatch('orders/setupGarbageCollection') // Setup Garbage collection
    const client = new faye.Client('http://192.168.1.84:8080/faye')
    const store = this.$store

    client.subscribe('/order/patch', (order) => {
      if (order.complete) {
        this.flashBackground()
        store.dispatch('orders/addOrder', order)
      }
    })
  },
  methods: {
    flashBackground() {
      if (!this.flashingBackground) {
        this.flashInterval = setInterval(this.changeBackground, 550)
        this.flashingBackground = true
      }
    },
    changeBackground() {
      this.greenBackground = !this.greenBackground
      this.flashCount++
      if (this.flashCount > 7) {
        clearInterval(this.flashInterval)
        this.flashCount = 0
        this.greenBackground = false
        this.flashingBackground = false
      }
    },
  },
}
</script>
