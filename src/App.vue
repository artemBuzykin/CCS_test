<template>
    <div id="app">
        <div class="container">
            <div class="row">
                <div class="categories-col">
                    <categories-list></categories-list>
                </div>
                <div class="cart-col">
                    <cart-list></cart-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CartList from './components/CartList.vue';
    import CategoriesList from './components/CategoriesList.vue';
    export default {
        name: 'App',
        components: { CategoriesList, CartList },
    };
</script>

<style>
    * {
        box-sizing: border-box;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }
    .container {
        max-width: 1400px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        padding-right: 15px;
        padding-left: 15px;
    }
    .row {
        display: flex;
        margin-left: -10px;
        margin-right: -10px;
    }
    .categories-col {
        padding-right: 10px;
        padding-left: 10px;
        flex: 0 0 50%;
        max-width: 50%;
    }
    .cart-col {
        padding-right: 10px;
        padding-left: 10px;
        flex: 0 0 50%;
        max-width: 50%;
    }
</style>
