import Cookies from 'js-cookie';
//Сделал дополнительно сохранение корзины в куки
let cart_initial = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
export default {
    namespaced: true,
    state: {
        cart: cart_initial,
    },
    getters: {
        getCartSize: (state) => {
            return state.cart.length;
        },
        getCart: (state) => {
            return state.cart;
        },
        isProductExist: (state) => (productId) => {
            const cart_product = state.cart.find((product) => product.id === productId);
            return !!cart_product;
        },
        //Собираем продукты, которые находятся в корзине
        getCartProducts: (state, getters, rootState, rootGetters) => {
            const cart = getters.getCart;
            const products = rootGetters.getFormatedProducts;
            if (getters.getCartSize && products.length) {
                return cart.map((store) => {
                    let product_by_id = products.find((item) => item.id == store.id);
                    return {
                        ...product_by_id,
                        ...store,
                    };
                });
            } else {
                return [];
            }
        },
    },
    mutations: {
        ADD_TO_CART(state, productId) {
            const cart_product = state.cart.find((product) => product.id === productId);
            if (!cart_product) {
                // Добавляем в корзину только айди товара и количество
                // Тк при отправке на сервер обычно нужны только эти данные
                state.cart.push({
                    id: productId,
                    amount: 1,
                });
                Cookies.set('cart', state.cart);
            }
        },
        CHANGE_QUANTITY(state, payload) {
            let cart_product = state.cart.find((product) => product.id === payload.productId);
            if (payload.type == 'inc') {
                cart_product.amount++;
            } else if (payload.type == 'dec') {
                if (cart_product.amount > 1) {
                    cart_product.amount--;
                }
            }
            Cookies.set('cart', state.cart);
        },
        SET_QUANTITY(state, payload) {
            let cart_product = state.cart.find((product) => product.id === payload.productId);
            cart_product.amount = payload.qnt;
            Cookies.set('cart', state.cart);
        },
        DELETE_FROM_CART(state, productId) {
            const cart_product_index = state.cart.findIndex((product) => product.id === productId);
            if (cart_product_index !== -1) {
                state.cart.splice(cart_product_index, 1);
            }
            Cookies.set('cart', state.cart);
        },
    },
};
