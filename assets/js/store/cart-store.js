"use strict";

/* ==========================================================
   THREE BROTHERS SHOP PLUS
   MODULE 2
   LESSON 1
   PART 1G

   CART STORE
========================================================== */

const CartStore = (() => {

    const STORAGE_KEY = "tbsp-cart";

    let cart = load();

    function load() {

        try {

            return JSON.parse(
                localStorage.getItem(STORAGE_KEY)
            ) || [];

        } catch {

            return [];

        }

    }

    function save() {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(cart)

        );

    }

    function getItems() {

        return [...cart];

    }

    function getTotalQuantity() {

        return cart.reduce(

            (total, item) =>

                total + item.quantity,

            0

        );

    }

    function add(productId) {

        const item = cart.find(

            p => p.productId === productId

        );

        if (item) {

            item.quantity++;

        } else {

            cart.push({

                productId,

                quantity: 1

            });

        }

        save();

    }

    function remove(productId) {

        cart = cart.filter(

            item =>

                item.productId !== productId

        );

        save();

    }

    function increase(productId) {

        const item = cart.find(

            p =>

                p.productId === productId

        );

        if (!item) return;

        item.quantity++;

        save();

    }

    function decrease(productId) {

        const item = cart.find(

            p =>

                p.productId === productId

        );

        if (!item) return;

        item.quantity--;

        if (item.quantity <= 0) {

            remove(productId);

            return;

        }

        save();

    }

    function clear() {

        cart = [];

        save();

    }

    return Object.freeze({

        add,

        remove,

        increase,

        decrease,

        clear,

        getItems,

        getTotalQuantity

    });

})();