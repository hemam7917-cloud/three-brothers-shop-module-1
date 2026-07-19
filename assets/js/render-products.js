"use strict";

/* ==========================================================
   THREE BROTHERS SHOP PLUS
   MODULE 2
   LESSON 1
   PART 1E

   PRODUCT PAGE INITIALIZER
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeProductRenderer
);

function initializeProductRenderer(){

    ProductRenderer.render(

        "#featuredProducts",

        ShopProducts.getFeaturedProducts()

    );

    ProductEvents.initialize();

    CartCounter.update();

    WishlistCounter.update();

}

function renderHomeProducts() {

    ProductRenderer.render(
        "#featuredProducts",
        ShopProducts.getFeaturedProducts()
    );

}

function initializeProductRenderer(){

    renderHomeProducts();

    ProductEvents.initialize();

    CartCounter.update();

    WishlistCounter.update();

}

function addToWishlist(productId){

    WishlistStore.toggle(productId);

    WishlistCounter.update();

    renderHomeProducts();

}

