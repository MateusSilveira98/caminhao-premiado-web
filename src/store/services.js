import axios from 'axios';
export default {
  post(url, payload) {
    return axios.post(url, payload)
  },
  get(url) {
    return axios.get(url)
  }
}
