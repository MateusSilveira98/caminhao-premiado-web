import service from '@/store/services';
import moment from 'moment';
const state = {
  selectedUser: {},
  isSuccess: false,
  invalidVouchers: [],
  invalidEmail: {}
}
const mutations = {
  'SET_SELECTEDUSER'(state, result) {
    state.selectedUser = result ? result : {};
  },
  'SET_ISSUCCESS'(state, result) {
    state.isSuccess = result;
  },
  'SET_INVALID_VOUCHERS'(state, result) {
    state.invalidVouchers = result;
  },
  'SET_INVALID_EMAIL'(state, result) {
    state.invalidEmail = result;
  }
}
const actions = {
  async getUserByCPF({ commit }, cpf) {
    commit('LOADING');
    return Promise.resolve(service.get(`${process.env.VUE_APP_API_URL}obterusuario?cpf=${cpf}`))
      .then(response => {
        commit('SET_SELECTEDUSER', response.data);
      })
      .catch(err => {
        commit('PUSH_NOTIFICATION', { message: err.response.data.message || 'OPS! Algo de errado não está certo :(', messageClass: 'danger' })
        commit('SET_ISSUCCESS', false);
      }).finally(() => commit('LOADING'));
  },
  async createUser({ commit }, user) {
    user.Idsistema = 1383;
    user.dataNascimento = moment(user.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    commit('LOADING');
    return Promise.resolve(service.post(`${process.env.VUE_APP_API_URL}/autocadastro`, user)).then(response => {
      user.vouchers = response.data; 1
      commit('SET_SELECTEDUSER', user)
      commit('SET_ISSUCCESS', true);
    }).catch(err => {
      if (err.response.data) {
        let response = JSON.parse(err.response.data);
        console.log(response)
        if (!response.email) {
          commit('SET_INVALID_VOUCHERS', response)
        } else {
          commit('SET_INVALID_EMAIL', response)
        }
      }
      else {
        commit('PUSH_NOTIFICATION', { message: 'OPS! Algo de errado não está certo :(', messageClass: 'danger' })
      }
      commit('SET_ISSUCCESS', false);
    }).finally(() => commit('LOADING'));
  },
  async editUser({ commit }, user) {
    commit('LOADING');
    user.Idsistema = 1383;
    return Promise.all([service.post(`${process.env.VUE_APP_API_URL}/inserirvoucher`, user)])
      .then(response => {
        user.vouchers = response[0].data;
        commit('SET_SELECTEDUSER', user)
        commit('SET_ISSUCCESS', true);
      }).catch((err) => {
        let response = JSON.parse(err.response.data);
        if (response.length > 0) {
          commit('SET_INVALID_VOUCHERS', response)
        } else {
          commit('PUSH_NOTIFICATION', { message: 'OPS! Algo de errado não está certo :(', messageClass: 'danger' })
        }
        commit('SET_ISSUCCESS', false);
      }).finally(() => commit('LOADING'));
  }
}

export default { state, mutations, actions }
