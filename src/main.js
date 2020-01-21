import Vue from 'vue';
import App from '@/App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import '@/filters/index';
import '@/App.scss';
import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = `application/json`;
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/pt-br';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
