import service from '@/store/services';
import config from '@/config.json';
const state = {
  selectedUser: {},
  isSuccess: false
}
const mutations = {
  'SET_SELECTEDUSER'(state, result) {
    state.selectedUser = result ? result : {};
  },
  'SET_ISSUCCESS'(state, result) {
    state.isSuccess = result;
  }
}
const actions = {
  async getUserByCPF({ commit }, cpf) {
    commit('LOADING');
    return Promise.resolve(service.get(`${config.API_URL}/users?Login=${cpf}`))
      .then(response => {
        commit('SET_SELECTEDUSER', response.data[0]);
      })
      .catch(err => {
        commit('PUSH_NOTIFICATION', { message: JSON.parse(JSON.stringify(err)).message, messageClass: 'danger' })
        commit('SET_ISSUCCESS', false);
      }).finally(() => commit('LOADING'));
  },
  async createUser({ commit }, user) {
    user.id = user.id ? user.id : Math.floor(Math.random() * 9999);
    commit('LOADING');
    return Promise.resolve(service.post(`${config.API_URL}/users`, user)).then(response => {
      commit('SET_ISSUCCESS', true);
    }).catch(err => {
      commit('PUSH_NOTIFICATION', { message: JSON.parse(JSON.stringify(err)).message, messageClass: 'danger' })
      commit('SET_ISSUCCESS', false);
    }).finally(() => commit('LOADING'));
  },
  async editUser({ commit }, user) {
    commit('LOADING');
    return Promise.resolve(service.put(`${config.API_URL}/users/${user.id}`, user)).then(response => {
      commit('SET_ISSUCCESS', true);
    }).catch(err => {
      commit('PUSH_NOTIFICATION', { message: JSON.parse(JSON.stringify(err)).message, messageClass: 'danger' })
      commit('SET_ISSUCCESS', false);
    }).finally(() => commit('LOADING'));
  }
}

export default { state, mutations, actions }
