import service from './services';
import {callback} from '@/utils/index';
export default {
  async create({ commit }, {url, payload}) {
    commit('LOADING');
    let response = await service.post(url, payload);
    callback(commit, response.data);
  },
  async edit({ commit }, {url, payload}) {
    commit('LOADING');
    let response = await service.put(url, payload);
    callback(commit, response.data);
  },
  async getAll({ commit }, url) {
    let response = await service.get(url);
    let payload = response.data.results;
    commit('GET_ALL_SUCCESS', { payload });
  },
  async getById({ commit }, {url, id}) {
    let response = await service.get(`${url}/${id}`);
    commit('GET_BY_ID_SUCCESS', { payload: response.data });
  },
  emitSelectedMenuItem({commit}, item) {
    commit('SET_MENU_ITEM', item);
  }
}
