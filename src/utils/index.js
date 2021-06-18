// Хелпер функция для генерации рандомного числа
function randomIntFromInterval(min, max) {
    return Math.random() * (max - min) + min;
}
//Поиск названия продукта в объекте names по айди продукта
function findProductTitle(group_info, product_id) {
    let product_title = null;
    Object.keys(group_info).forEach((key) => {
        if (product_title) {
            return true;
        }
        const group = group_info[key].B;
        const is_finded_key = Object.keys(group).find((id) => +id == +product_id);
        if (is_finded_key) {
            product_title = group[is_finded_key].N;
        }
    });
    return product_title;
}

//Фильтруем в категорих только те товары, которые приходят с апи
function findExistProducts(group_products, all_products) {
    let filtered_products = [];
    Object.keys(group_products).forEach((product_id) => {
        const product = all_products.find((product) => +product.id == +product_id);
        if (product) {
            filtered_products.push(product);
        }
    });
    return filtered_products;
}

export { randomIntFromInterval, findProductTitle, findExistProducts };
