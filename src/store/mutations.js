export default {
  'LOADING'(state) {
    state.loading = !state.loading;
  },
  'PUSH_NOTIFICATION'(state, { message, messageClass }) {
    state.toNotify = !state.toNotify;
    state.message = message;
    state.messageClass = messageClass;
  },
  'SET_MENU_ITEM'(state, item) {
    state.menuItem = item;
  }
}
