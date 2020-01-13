export default {
  'LOADING'(state) {
    state.loading = !state.loading;
  },
  'PUSH_NOTIFICATION'(state) {
    state.toNotify = true;
    setTimeout(() => {
      state.toNotify = false;
    }, 500);
  },
  'SUCCESS_MESSAGE'(state, { response }) {
    state.message = response.message;
    state.messageClass = 'success';
  },
  'FAIL_MESSAGE'(state, { response }) {
    state.message = typeof response.message == 'object' ? JSON.stringify(response.message) : response.message;
    state.messageClass = 'danger';
  },
  'GET_ALL_SUCCESS'(state, {payload}) {
    state.all = payload;
  },
  'GET_BY_ID_SUCCESS'(state, {payload}) {
    state.selected = payload;
  },
  'SET_MENU_ITEM'(state, item) {
    state.menuItem = item;
  }
}
