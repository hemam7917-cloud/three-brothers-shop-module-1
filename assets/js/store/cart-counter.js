"use strict";

/* ==========================================================
   CART COUNTER
========================================================== */

const CartCounter = (() => {

    function update() {

        const badge =

            document.querySelector(

                "[data-cart-count]"

            );

        if (!badge) {

            return;

        }

        badge.textContent =

            CartStore.getTotalQuantity();

    }

    return Object.freeze({

        update

    });

})();