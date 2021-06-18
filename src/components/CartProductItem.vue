<template>
    <div class="cart-product">
        <div class="cart-product-col cart-product-title">
            {{ local_product.category.title }}. {{ local_product.title }}
        </div>
        <div class="cart-product-col cart-product-quantity">
            <div class="quantity-wrap">
                <div class="quantity-btn" @click="changeQuantity('dec')">-</div>
                <div class="quantity-value">
                    <input type="text" :value="local_product.amount" @change="setQuantity" />
                </div>
                <div class="quantity-btn" @click="changeQuantity('inc')">+</div>
            </div>
            <div v-if="isAlmostOver" class="over">
                Количество ограничено
            </div>
        </div>
        <div class="cart-product-col cart-product-price">
            <div class="cart-product-price--total">{{ productTotalPrice | price_format }} &#8381;</div>
            <div>{{ local_product.price_rub | price_format }} &#8381; / шт</div>
        </div>
        <div class="cart-product-col cart-product-actions">
            <span @click="deleteFromCart">Удалить</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            product: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                local_product: { ...this.product },
            };
        },
        watch: {
            product: {
                handler(val) {
                    this.local_product = { ...val };
                },
            },
        },
        computed: {
            productTotalPrice() {
                return (this.local_product.price_rub * this.local_product.amount).toFixed(2);
            },
            isAlmostOver() {
                //Проверяем, что товар закончился
                return this.local_product.max_count - this.local_product.amount == 0;
            },
        },
        methods: {
            deleteFromCart() {
                this.$store.commit('cart/DELETE_FROM_CART', this.local_product.id);
            },
            changeQuantity(type) {
                if (type == 'inc' && this.isAlmostOver) {
                    return false;
                }
                this.$store.commit('cart/CHANGE_QUANTITY', {
                    productId: this.local_product.id,
                    type,
                });
            },
            setQuantity(e) {
                let val = e.target.value;
                if (val > this.local_product.max_count) {
                    val = this.local_product.max_count;
                } else if (val <= 0) {
                    val = 1;
                }
                this.$store.commit('cart/SET_QUANTITY', {
                    productId: this.local_product.id,
                    qnt: val,
                });
            },
        },
    };
</script>

<style>
    .cart-product {
        display: flex;
        margin-left: -5px;
        margin-right: -5px;
        margin-bottom: 15px;
    }
    .cart-product-col {
        padding: 0 5px;
        font-size: 14px;
    }
    .cart-product-title {
        flex: 0 0 50%;
    }
    .cart-product-quantity {
        flex: 0 0 20%;
    }
    .quantity-wrap {
        display: flex;
        align-items: center;
    }
    .cart-product-price {
        flex: 0 0 20%;
        font-size: 11px;
    }
    .cart-product-actions {
        flex: 0 0 10%;
        color: red;
    }
    .cart-product-actions span {
        flex: 0 0 10%;
        cursor: pointer;
    }
    .cart-product-price--total {
        font-weight: bold;
        font-size: 14px;
    }
    .quantity-btn {
        width: 20px;
        height: 20px;
        display: flex;
        line-height: 20px;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        border: 1px solid #c7ccd6;
        cursor: pointer;
    }
    .quantity-value {
        margin: 0 5px;
    }
    .quantity-value input {
        width: 50px;
    }
    .over {
        font-size: 10px;
        color: orange;
    }
</style>
