"use strict";

/* ==========================================================
   THREE BROTHERS SHOP PLUS
   MODULE 2
   LESSON 1
   PART 1F

   PRODUCT EVENT ENGINE
========================================================== */

const ProductEvents = (() => {

    function initialize() {

        document.addEventListener(
            "click",
            handleClick
        );

    }

    function handleClick(event) {

        const button =
            event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const action =
            button.dataset.action;

        const productId =
            Number(button.dataset.productId);

        switch (action) {

            case "add-cart":
                addToCart(productId);
                break;

            case "wishlist":
                addToWishlist(productId);
                break;

            case "quick-view":
                quickView(productId);
                break;

            case "buy-now":
                buyNow(productId);
                break;

        }

    }

    function addToCart(productId){

    CartStore.add(productId);

    CartCounter.update();

    console.log(

        CartStore.getItems()

    );

}

    function addToWishlist(productId){

    WishlistStore.toggle(productId);

    WishlistCounter.update();

    ProductRenderer.render(
        "#featuredProducts",
        ShopProducts.getFeaturedProducts()
    );
    }




    function quickView(productId) {

        const product =
            ShopProducts.getProductById(productId);

        console.log(
            "Quick View:",
            product
        );

    }

    function buyNow(productId) {

        const product =
            ShopProducts.getProductById(productId);

        console.log(
            "Buy Now:",
            product
        );

    }

    return Object.freeze({

        initialize

    });

})();