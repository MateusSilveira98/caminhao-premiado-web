import service from './services';
import {callback} from '@/utils/index';
export default {
  async post({ commit }, {url, payload}) {
    commit('LOADING');
    let response = await service.post(url, payload);
    callback(commit, response.data);
  },
  async put({ commit }, {url, payload}) {
    commit('LOADING');
    let response = await service.put(url, payload);
    callback(commit, response.data);
  },
  async get({ commit }, url) {
    let response = await service.get(url);
    let payload = response.data.results;
    commit('GET_SUCCESS', { payload });
  },
  setSelectedMenuItem({commit}, item) {
    commit('SET_MENU_ITEM', item);
  }
}
