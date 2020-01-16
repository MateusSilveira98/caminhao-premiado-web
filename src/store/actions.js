export default {
  setSelectedMenuItem({ commit }, item) {
    commit('SET_MENU_ITEM', item);
  },
  pushNotification({ commit }, { message, messageClass }) {
    commit('PUSH_NOTIFICATION', {message, messageClass});
  }
}
