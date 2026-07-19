"use strict";

/* ==========================================================
   THREE BROTHERS SHOP PLUS
   MODULE 2
   LESSON 2
   PART 2A

   WISHLIST STORE
========================================================== */

const WishlistStore = (() => {

    const STORAGE_KEY = "tbsp-wishlist";

    let wishlist = load();

    function load() {

        try {

            return JSON.parse(

                localStorage.getItem(STORAGE_KEY)

            ) || [];

        }

        catch {

            return [];

        }

    }

    function save() {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(wishlist)

        );

    }

    function getItems() {

        return [...wishlist];

    }

    function count() {

        return wishlist.length;

    }

    function has(productId) {

        return wishlist.includes(productId);

    }

    function add(productId) {

        if (has(productId)) {

            return;

        }

        wishlist.push(productId);

        save();

    }

    function remove(productId) {

        wishlist = wishlist.filter(

            id => id !== productId

        );

        save();

    }

    function toggle(productId) {

        if (has(productId)) {

            remove(productId);

        }

        else {

            add(productId);

        }

    }

    function clear() {

        wishlist = [];

        save();

    }

    return Object.freeze({

        add,

        remove,

        toggle,

        has,

        clear,

        count,

        getItems

    });

})();