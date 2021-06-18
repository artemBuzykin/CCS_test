<template>
    <div class="category-item__product">
        <div class="category-item__product-content">
            <div class="category-item__product-title">{{ local_product.title }} ({{ local_product.max_count }})</div>
            <div class="category-item__product-price" :class="changedPrice">
                Цена: {{ initial_product.price_rub | price_format }}
                {{ local_product.price_rub | price_format }} &#8381;
            </div>
        </div>
        <div class="category-item__product-actions">
            <div class="action-cart" @click="addToCart" v-if="!isProductAdded">
                <svg data-v-768bbf06="" xmlns="http://www.w3.org/2000/svg" width="21px" height="18px">
                    <path
                        data-v-768bbf06=""
                        fill-rule="evenodd"
                        fill="rgb(000, 000, 000)"
                        d="M18.000,11.997 C17.500,11.997 7.000,11.997 7.000,11.997 C7.000,11.997 5.750,12.303 6.000,10.999 C6.000,10.999 4.250,5.185 4.000,3.998 C3.500,2.373 2.000,0.998 2.000,0.998 L1.000,0.998 C0.656,0.998 -0.000,0.966 -0.000,0.622 C-0.000,0.277 0.278,-0.003 0.622,-0.003 L3.110,-0.003 C3.386,-0.003 3.628,0.179 3.707,0.444 L5.000,2.998 C5.000,2.998 19.062,2.998 20.000,2.998 C20.937,2.998 20.911,3.126 20.973,4.062 C21.036,4.999 17.687,11.311 18.000,11.997 ZM5.000,3.998 L7.000,10.999 L17.000,10.999 L20.000,3.998 L5.000,3.998 ZM8.000,13.998 C9.104,13.998 10.000,14.894 10.000,15.998 C10.000,17.103 9.104,17.998 8.000,17.998 C6.895,17.998 6.000,17.103 6.000,15.998 C6.000,14.894 6.895,13.998 8.000,13.998 ZM8.000,17.198 C8.663,17.198 9.200,16.662 9.200,15.998 C9.200,15.336 8.663,14.798 8.000,14.798 C7.337,14.798 6.800,15.336 6.800,15.998 C6.800,16.662 7.337,17.198 8.000,17.198 ZM16.000,13.998 C17.104,13.998 18.000,14.894 18.000,15.998 C18.000,17.103 17.104,17.998 16.000,17.998 C14.895,17.998 14.000,17.103 14.000,15.998 C14.000,14.894 14.895,13.998 16.000,13.998 ZM16.000,17.198 C16.663,17.198 17.200,16.662 17.200,15.998 C17.200,15.336 16.663,14.798 16.000,14.798 C15.337,14.798 14.800,15.336 14.800,15.998 C14.800,16.662 15.337,17.198 16.000,17.198 Z"
                    ></path>
                </svg>
            </div>
            <div v-else>
                В корзине
            </div>
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
                initial_product: { ...this.product },
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
            isProductAdded() {
                return this.$store.getters['cart/isProductExist'](this.local_product.id);
            },
            changedPrice() {
                let class_name = '';
                if (
                    Math.round(parseFloat(this.local_product.price_rub) * 100) / 100 >
                    Math.round(parseFloat(this.initial_product.price_rub) * 100) / 100
                ) {
                    class_name = 'rise';
                }
                // if (this.local_product.price_rub > this.initial_product.price_rub) {
                // class_name = 'rise';
                // }
                else if (
                    Math.round(parseFloat(this.local_product.price_rub) * 100) / 100 <
                    Math.round(parseFloat(this.initial_product.price_rub) * 100) / 100
                ) {
                    class_name = 'down';
                }
                // else if (this.local_product.price_rub < this.initial_product.price_rub) {
                //     class_name = 'down';
                // }
                return class_name;
            },
        },
        methods: {
            addToCart() {
                this.$store.commit('cart/ADD_TO_CART', this.local_product.id);
            },
        },
    };
</script>

<style>
    .category-item__product {
        display: flex;
        padding: 0.5rem 1rem;
    }
    .category-item__product:not(:last-child) {
        box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
    }
    .category-item__product-content {
        flex: 1;
    }
    .category-item__product-title {
        color: #212529;
        font-size: 14px;
        font-weight: 600;
    }
    .category-item__product-price {
        margin-top: 5px;
        font-style: italic;
    }
    .action-cart {
        cursor: pointer;
    }
    .rise {
        background: red;
    }
    .down {
        background: green;
    }
</style>
