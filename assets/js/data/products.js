"use strict";

/* ==========================================================
   THREE BROTHERS SHOP PLUS
   MODULE 2 — LESSON 1
   PART 1A
   PRODUCT DATA ARCHITECTURE
========================================================== */

const PRODUCTS = [
    {
        id: 1,
        slug: "premium-miniket-rice-25kg",
        name: "Premium Miniket Rice 25kg",
        shortName: "Miniket Rice",
        category: "rice",
        categoryName: "Rice & Grains",
        brand: "fresh",
        brandName: "Fresh",
        price: 1850,
        oldPrice: 2300,
        discount: 20,
        currency: "BDT",
        image: "assets/images/products/rice.jpg",
        images: [
            "assets/images/products/rice.jpg"
        ],
        rating: 4.8,
        reviewCount: 128,
        stock: 28,
        sold: 72,
        unit: "25kg",
        featured: true,
        flashSale: true,
        bestSeller: true,
        isNew: false,
        description:
            "Premium quality Miniket rice suitable for everyday family meals. Carefully processed and packed to maintain freshness and quality.",
        highlights: [
            "Premium quality rice",
            "Clean and carefully processed",
            "Suitable for everyday meals",
            "Secure packaging"
        ]
    },

    {
        id: 2,
        slug: "fresh-soybean-oil-5l",
        name: "Fresh Soybean Oil 5L",
        shortName: "Soybean Oil",
        category: "oil",
        categoryName: "Cooking Essentials",
        brand: "fresh",
        brandName: "Fresh",
        price: 860,
        oldPrice: 1050,
        discount: 18,
        currency: "BDT",
        image: "assets/images/products/oil.jpg",
        images: [
            "assets/images/products/oil.jpg"
        ],
        rating: 4.6,
        reviewCount: 94,
        stock: 36,
        sold: 64,
        unit: "5L",
        featured: true,
        flashSale: true,
        bestSeller: false,
        isNew: false,
        description:
            "Refined soybean oil for daily cooking. Suitable for frying, curries and regular household food preparation.",
        highlights: [
            "Refined cooking oil",
            "Suitable for everyday cooking",
            "Secure bottle packaging",
            "Family-size quantity"
        ]
    },

    {
        id: 3,
        slug: "premium-fresh-apple-1kg",
        name: "Premium Fresh Apple 1kg",
        shortName: "Fresh Apple",
        category: "fruits",
        categoryName: "Fresh Fruits",
        brand: "local-fresh",
        brandName: "Local Fresh",
        price: 280,
        oldPrice: 400,
        discount: 30,
        currency: "BDT",
        image: "assets/images/products/apple.jpg",
        images: [
            "assets/images/products/apple.jpg"
        ],
        rating: 4.9,
        reviewCount: 76,
        stock: 17,
        sold: 83,
        unit: "1kg",
        featured: true,
        flashSale: true,
        bestSeller: false,
        isNew: true,
        description:
            "Fresh and carefully selected premium apples with a crisp texture and naturally sweet taste.",
        highlights: [
            "Freshly selected",
            "Crisp texture",
            "Naturally sweet",
            "Quality checked"
        ]
    },

    {
        id: 4,
        slug: "fresh-broiler-chicken-1kg",
        name: "Fresh Broiler Chicken 1kg",
        shortName: "Broiler Chicken",
        category: "meat",
        categoryName: "Meat & Poultry",
        brand: "local-fresh",
        brandName: "Local Fresh",
        price: 275,
        oldPrice: 350,
        discount: 22,
        currency: "BDT",
        image: "assets/images/products/chicken.jpg",
        images: [
            "assets/images/products/chicken.jpg"
        ],
        rating: 4.7,
        reviewCount: 112,
        stock: 9,
        sold: 91,
        unit: "1kg",
        featured: true,
        flashSale: true,
        bestSeller: true,
        isNew: false,
        description:
            "Fresh broiler chicken processed with care and suitable for curries, grilling and everyday family meals.",
        highlights: [
            "Freshly processed",
            "Quality checked",
            "Suitable for multiple recipes",
            "Delivered with care"
        ]
    }
];

/* ==========================================================
   PRODUCT DATA HELPERS
========================================================== */

function getAllProducts() {
    return [...PRODUCTS];
}

function getProductById(productId) {
    const normalizedId = Number(productId);

    return PRODUCTS.find(
        product => product.id === normalizedId
    ) || null;
}

function getProductBySlug(productSlug) {
    return PRODUCTS.find(
        product => product.slug === productSlug
    ) || null;
}

function getProductsByCategory(category) {
    return PRODUCTS.filter(
        product => product.category === category
    );
}

function getFeaturedProducts() {
    return PRODUCTS.filter(
        product => product.featured
    );
}

function getFlashSaleProducts() {
    return PRODUCTS.filter(
        product => product.flashSale
    );
}

function getBestSellerProducts() {
    return PRODUCTS.filter(
        product => product.bestSeller
    );
}

function searchProducts(searchTerm) {
    const normalizedTerm = String(searchTerm)
        .trim()
        .toLowerCase();

    if (!normalizedTerm) {
        return getAllProducts();
    }

    return PRODUCTS.filter(product => {
        return (
            product.name
                .toLowerCase()
                .includes(normalizedTerm) ||

            product.categoryName
                .toLowerCase()
                .includes(normalizedTerm) ||

            product.brandName
                .toLowerCase()
                .includes(normalizedTerm)
        );
    });
}


/* ==========================================================
   PRODUCT VALIDATION
========================================================== */

function isValidProduct(product) {

    if (!product) return false;

    if (typeof product.id !== "number") return false;

    if (!product.name) return false;

    if (!product.category) return false;

    if (typeof product.price !== "number") return false;

    return true;
}

/* ==========================================================
   PRICE FORMATTER
========================================================== */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "en-BD",
        {
            style: "currency",
            currency: "BDT",
            minimumFractionDigits: 0
        }
    ).format(price);

}

/* ==========================================================
   DISCOUNT
========================================================== */

function calculateDiscountPercentage(
    oldPrice,
    newPrice
){

    if (
        oldPrice <= 0 ||
        newPrice >= oldPrice
    ){

        return 0;

    }

    return Math.round(

        ((oldPrice-newPrice)/oldPrice)*100

    );

}

/* ==========================================================
   STOCK
========================================================== */

function getStockStatus(stock){

    if(stock<=0){

        return{

            label:"Out of Stock",

            color:"danger"

        };

    }

    if(stock<=5){

        return{

            label:"Low Stock",

            color:"warning"

        };

    }

    return{

        label:"In Stock",

        color:"success"

    };

}

/* ==========================================================
   RATING
========================================================== */

function formatRating(rating){

    return Number(rating).toFixed(1);

}

/* ==========================================================
   BADGES
========================================================== */

function getProductBadges(product){

    const badges=[];

    if(product.flashSale){

        badges.push("Flash Sale");

    }

    if(product.bestSeller){

        badges.push("Best Seller");

    }

    if(product.isNew){

        badges.push("New");

    }

    if(product.discount>0){

        badges.push(
            `${product.discount}% OFF`
        );

    }

    return badges;

}

/* ==========================================================
   GLOBAL EXPORT
   Module system আসার আগে এই Project-এ window ব্যবহার করছি।
========================================================== */

window.ShopProducts = Object.freeze({

    products:Object.freeze(PRODUCTS),

    getAllProducts,

    getProductById,

    getProductBySlug,

    getProductsByCategory,

    getFeaturedProducts,

    getFlashSaleProducts,

    getBestSellerProducts,

    searchProducts,

    isValidProduct,

    formatPrice,

    calculateDiscountPercentage,

    getStockStatus,

    formatRating,

    getProductBadges

});