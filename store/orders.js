export const state = () => ({
  orders: [],
})

export const mutations = {
  ADD_ORDER(state, order) {
    state.orders.unshift(order)
  },
  REMOVE_ORDER(state, orderId) {
    for (const i in state.orders) {
      if (state.orders[i].id === orderId) {
        state.orders.splice(i, 1)
        break
      }
    }
  },
}

export const actions = {
  setupGarbageCollection({ commit, state }) {
    // Set timer to remove completed orders older than every 5 min; collect 30 seconds
    setInterval(function () {
      const now = new Date().getTime()
      state.orders
        .filter(
          (order) => (now - Date.parse(order.completedAt)) / 1000 / 60 > 5
        )
        .forEach((order) => {
          commit('REMOVE_ORDER', order.id)
        })
    }, 30 * 1000)
  },

  addOrder({ commit, state }, order) {
    // check if order already in array
    if (!state.orders.some((obj) => obj.orderNumber === order.orderNumber)) {
      commit('ADD_ORDER', order)
    }
  },
}
