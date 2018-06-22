import Vue from 'vue';


import App from './App.vue';
import router from './router';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
//elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import Cube from 'cube-ui'
//引入svg
import Icon from 'vue-svg-icon/Icon.vue';  
Vue.component('icon', Icon); 
//引入mock
import Mock from './mock';

Vue.use(Cube)

Vue.use(Vant);

new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App)
});
