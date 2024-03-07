export const PASSWORD = 'Valantis';

export const BASE_URL = 'https://api.valantis.store:41000/';

export const PAGE_SIZE = 50;

export const formatAmount = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const getUniqueProducts = (products) => {
    const productMap = {};

    for (const item of products) {
        if (!productMap[item.id]) {
            productMap[item.id] = item;
        }
    }

    return Object.values(productMap);
};

export const getProductParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const category = searchParams.get('category');
    const value = getFilterValue(category, searchParams.get('value'));
    const filter =
        category && value
            ? {
                category,
                value,
            }
            : null;
    const page = Number(searchParams.get('page')) || 1;

    return {
        filter,
        page,
    };
};


export const getFilterValue = (category, value) => {
    if (!category) {
        return null;
    }

    if (category === 'price' && value !== null) {
        return Number(value) || null;
    }

    return value;
};
