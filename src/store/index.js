import Vue from 'vue';
import Vuex from 'vuex';
import { randomIntFromInterval, findProductTitle, findExistProducts } from '@/utils';
import { getData, getNames } from '@/api';
import cart from './cart';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        usd_rate: randomIntFromInterval(20, 80),
        products: [],
        group_info: {},
    },
    getters: {
        getUsdRate: (state) => state.usd_rate,
        // Приводим данные к более понятному виду
        getFormatedProducts: (state, getters) => {
            let formated_products = [];
            if (Object.keys(state.group_info).length) {
                formated_products = state.products.map((product) => {
                    return {
                        id: product.T,
                        max_count: product.P,
                        price_usd: product.C,
                        price_rub: (product.C * getters.getUsdRate).toFixed(2),
                        title: findProductTitle(state.group_info, product.T),
                        category: {
                            id: product.G,
                            title: state.group_info[product.G].G,
                        },
                    };
                });
            }
            return formated_products;
        },
        getFormatedGroup: (state, getters) => {
            let exist_groups = [];
            if (state.products.length) {
                Object.keys(state.group_info).forEach((key) => {
                    // Находим категории, у которых есть товары с апи
                    const is_group_exist = state.products.findIndex((info) => info.G == key);
                    if (is_group_exist !== -1) {
                        exist_groups.push({
                            id: +key,
                            title: state.group_info[key].G,
                            products: findExistProducts(state.group_info[key].B, getters.getFormatedProducts),
                        });
                    }
                });
            }
            return exist_groups;
        },
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = [...products];
        },
        SET_GROUP_INFO(state, info) {
            state.group_info = { ...info };
        },
        SET_USD_RATE(state) {
            state.usd_rate = randomIntFromInterval(20, 80);
        },
    },
    actions: {
        async loadProductData({ commit }) {
            const products = await getData();
            commit('SET_PRODUCTS', products.Value.Goods);
        },
        async loadGroupInfo({ commit }) {
            const info = await getNames();
            commit('SET_GROUP_INFO', info);
        },
    },
    modules: {
        cart,
    },
    strict: true,
});
