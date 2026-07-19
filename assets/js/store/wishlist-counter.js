"use strict";

/* ==========================================================
   WISHLIST COUNTER
========================================================== */

const WishlistCounter = (() => {

    function update() {

        const badge =

            document.querySelector(

                "[data-wishlist-count]"

            );

        if (!badge) {

            return;

        }

        badge.textContent =

            WishlistStore.count();

    }

    return Object.freeze({

        update

    });

})();