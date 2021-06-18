<template>
    <div>
        <div v-if="is_loading">
            Загрузка...
        </div>
        <div v-else>
            Текущий курс: 1 &#36; = {{ usdRate }} &#8381;
            <div class="categories-list row">
                <category-item v-for="category in categories" :key="category.id" :category="category"> </category-item>
            </div>
        </div>
    </div>
</template>

<script>
    import CategoryItem from './CategoryItem.vue';
    export default {
        components: { CategoryItem },
        computed: {
            categories() {
                return this.$store.getters.getFormatedGroup;
            },
            usdRate() {
                return this.$store.getters.getUsdRate;
            },
        },
        data() {
            return {
                is_loading: true,
            };
        },
        async created() {
            await this.loadData();
            this.reloadProductData();
        },
        methods: {
            async loadData() {
                await Promise.all([this.$store.dispatch('loadGroupInfo'), this.$store.dispatch('loadProductData')]);
                this.is_loading = false;
            },
            reloadProductData() {
                setInterval(async () => {
                    await this.$store.dispatch('loadProductData');
                    this.$store.commit('SET_USD_RATE');
                }, 5000);
            },
        },
    };
</script>

<style scoped>
    .categories-list {
        flex-wrap: wrap;
        margin-right: -8px;
        margin-left: -8px;
    }
    .category-col {
        flex: 0 0 50%;
        max-width: 50%;
        padding-right: 8px;
        padding-left: 8px;
    }
</style>
