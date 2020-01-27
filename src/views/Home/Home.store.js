import service from '@/store/services';
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
    Promise.resolve(service.get(`http://localhost:3000/users?Login=${cpf}`)).then(response => {
      commit('SET_SELECTEDUSER', response.data[0]);
    }).catch(err => console.log('ERROR', JSON.stringify(err))).finally(() => commit('LOADING'));
  },
  async createUser({ commit }, user) {
    user.id = user.id ? user.id : Math.floor(Math.random() * 9999);
    commit('LOADING');
    Promise.resolve(service.post(`http://localhost:3000/users`, user)).then(response => {
      commit('SET_ISSUCCESS', true);
    }).catch(err => console.log('ERROR', JSON.stringify(err))).finally(() => commit('LOADING'));
  },
  async editUser({ commit }, user) {
    commit('LOADING');
    Promise.resolve(service.put(`http://localhost:3000/users/${user.id}`, user)).then(response => {
      commit('SET_ISSUCCESS', true);
    }).catch(err => console.log('ERROR', JSON.stringify(err))).finally(() => commit('LOADING'));
  }
}

export default { state, mutations, actions }
