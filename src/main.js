import Vue from 'vue';
import App from './App.vue';
import store from './store';
Vue.config.productionTip = false;

Vue.filter('price_format', function(value) {
    return value.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
});

new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');
