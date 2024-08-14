import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Asegúrate de que este sea el path correcto al archivo de rutas

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Importar CSS de Bootstrap y BootstrapVue
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Instalar BootstrapVue
Vue.use(BootstrapVue);
// Opción de instalar íconos de BootstrapVue
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router, // Integrar Vue Router en la instancia de Vue
  render: h => h(App),
}).$mount('#app');
