<template>
    <div class="cart">
        <div v-if="!cartLength">
            В корзине пусто
        </div>
        <div v-else-if="cartLength && !cartProducts.length">
            Загрузка...
        </div>
        <div v-else>
            <div class="cart-header">
                <div class="cart-header__item cart-header__item-title">
                    Наименование товара и описание
                </div>
                <div class="cart-header__item cart-header__item-quantity">
                    Количество
                </div>
                <div class="cart-header__item cart-header__item-price">
                    Цена
                </div>
                <div class="cart-header__item cart-header__item-actions"></div>
            </div>
            <div class="cart-content">
                <cart-product-item
                    v-for="product in cartProducts"
                    :key="product.id"
                    :product="product"
                ></cart-product-item>
            </div>
            <div class="cart-total">
                Итого: <span> {{ totalCost | price_format }} &#8381;</span>
            </div>
        </div>
    </div>
</template>

<script>
    import CartProductItem from './CartProductItem.vue';
    export default {
        components: { CartProductItem },
        data() {
            return {};
        },
        computed: {
            cartLength() {
                return this.$store.getters['cart/getCartSize'];
            },
            cartProducts() {
                return this.$store.getters['cart/getCartProducts'];
            },
            totalCost() {
                let cost_map = this.cartProducts.map((product) => product.amount * product.price_rub);
                return cost_map
                    .reduce((total, item) => {
                        total += +item;
                        return total;
                    }, 0)
                    .toFixed(2);
            },
        },
    };
</script>

<style>
    .cart-header {
        display: flex;
        margin-left: -5px;
        margin-right: -5px;
        margin-bottom: 15px;
    }
    .cart-header__item {
        padding: 0 5px;
        font-size: 15px;
        color: #959da5;
    }
    .cart-header__item-title {
        flex: 0 0 50%;
    }
    .cart-header__item-quantity {
        flex: 0 0 20%;
    }
    .cart-header__item-price {
        flex: 0 0 20%;
    }
    .cart-header__item-actions {
        flex: 0 0 10%;
    }
    .cart-total span {
        color: cornflowerblue;
        font-weight: bold;
    }
</style>
