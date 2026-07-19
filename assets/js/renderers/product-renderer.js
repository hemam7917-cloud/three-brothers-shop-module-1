"use strict";

/* ==========================================================
   THREE BROTHERS SHOP PLUS
   MODULE 2
   LESSON 1
   PART 1E

   GENERIC PRODUCT RENDERER
========================================================== */

const ProductRenderer = (() => {

    function render(containerSelector, products) {

        const container =
            typeof containerSelector === "string"
                ? document.querySelector(containerSelector)
                : containerSelector;

        if (!container) {
            console.warn(
                "Product container not found:",
                containerSelector
            );
            return;
        }

        if (!Array.isArray(products)) {
            console.error(
                "Products must be an array."
            );
            return;
        }

        container.innerHTML =
            products
                .filter(ShopProducts.isValidProduct)
                .map(product =>
                    ProductTemplate.create(product)
                )
                .join("");

    }

    function clear(containerSelector) {

        const container =
            typeof containerSelector === "string"
                ? document.querySelector(containerSelector)
                : containerSelector;

        if (container) {
            container.innerHTML = "";
        }

    }

    return Object.freeze({

        render,

        clear

    });

})();