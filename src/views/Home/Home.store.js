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
    return Promise.resolve(service.get(`${config.API_URL}obterusuario?cpf=${cpf}`))
      .then(response => {
        commit('SET_SELECTEDUSER', response.data);
      })
      .catch(err => {
        commit('PUSH_NOTIFICATION', { message: JSON.parse(JSON.stringify(err)).Message || JSON.parse(JSON.stringify(err)).message, messageClass: 'danger' })
        commit('SET_ISSUCCESS', false);
      }).finally(() => commit('LOADING'));
  },
  async createUser({ commit }, user) {
    user.Idsistema = 1383;
    commit('LOADING');
    return Promise.resolve(service.post(`${config.API_URL}/autocadastro`, user)).then(response => {
      user.vouchers = response.data;
      commit('SET_SELECTEDUSER', user)
      commit('SET_ISSUCCESS', true);
    }).catch(err => {
      console.log('ERRO NORMAL', err)
      console.log('ERRO PARSE', JSON.parse(JSON.stringify(err)))
      commit('PUSH_NOTIFICATION', { message: JSON.parse(JSON.stringify(err)).Message || JSON.parse(JSON.stringify(err)).message, messageClass: 'danger' })
      commit('SET_ISSUCCESS', false);
    }).finally(() => commit('LOADING'));
  },
  async editUser({ commit }, user) {
    commit('LOADING');
    user.Idsistema = 1383;
    return Promise.all([service.post(`${config.API_URL}/inserirvoucher`, user)])
      .then(response => {
        user.vouchers = response[0].data;
        commit('SET_SELECTEDUSER', user)
        commit('SET_ISSUCCESS', true);
      }).catch(err => {
        console.log('ERRO NORMAL', err)
        console.log('ERRO NORMAL prop', err.Message)
        console.log('ERRO PARSE', JSON.parse(JSON.stringify(err)))
        commit('PUSH_NOTIFICATION', { message: JSON.parse(JSON.stringify(err)).Message || JSON.parse(JSON.stringify(err)).message, messageClass: 'danger' })
        commit('SET_ISSUCCESS', false);
      }).finally(() => commit('LOADING'));
  }
}

export default { state, mutations, actions }
