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
    let response = await service.get(`http://localhost:3000/users?Login=${cpf}`);
    commit('SET_SELECTEDUSER', response.data[0]);
    commit('LOADING');
  },
  async saveUser({ commit }, user) {
    user.id = user.id ? user.id : Math.floor(Math.random() * 9999);
    commit('LOADING');
    let response = await service.post(`http://localhost:3000/users`, user);
    if (response.statusText === "Created")
      commit('SET_ISSUCCESS', true);
    commit('LOADING');
  }
}

export default { state, mutations, actions }
