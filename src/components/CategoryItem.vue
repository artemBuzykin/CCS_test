<template>
    <div class="category-col">
        <div class="category-item">
            <div class="category-item__header">
                {{ category.title }}
            </div>
            <div class="category-item__content">
                <category-product-item
                    v-for="product in category.products"
                    :key="product.id"
                    :product="product"
                ></category-product-item>
            </div>
        </div>
    </div>
</template>

<script>
    import CategoryProductItem from './CategoryProductItem.vue';
    export default {
        components: { CategoryProductItem },
        props: {
            category: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style>
    .category-item {
        border: 1px solid rgba(0, 0, 0, 0.125);
        margin-bottom: 15px;
    }
    .category-item__header {
        color: #0c63e4;
        background-color: #e7f1ff;
        box-shadow: inset 0 -1px 0 rgb(0 0 0 / 13%);
        padding: 0.8rem 1rem;
    }
</style>
