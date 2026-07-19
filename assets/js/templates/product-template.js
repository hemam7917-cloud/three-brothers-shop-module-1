"use strict";

/* ==========================================================
   THREE BROTHERS SHOP PLUS
   MODULE 2
   LESSON 1
   PART 1D

   PRODUCT TEMPLATE ENGINE
========================================================== */

const ProductTemplate = (() => {

    function create(product){

        if(
            !ShopProducts.isValidProduct(product)
        ){
            return "";
        }

        const badges =
            createBadges(product);

        const stock =
            ShopProducts.getStockStatus(
                product.stock
            );

        return `
<article class="product-card">

    <div class="product-card__image">
<a
href="product.html?slug=${product.slug}">

<img
src="${product.image}"
alt="${product.name}">

</a>

        ${badges}

    </div>

    <div class="product-card__body">

        <p class="product-card__brand">

            ${product.brandName}

        </p>

      <h3>

<a
href="product.html?slug=${product.slug}">

${product.name}

</a>

</h3>

        ${createPrice(product)}

        ${createRating(product)}

        ${createStock(stock)}

        ${createButton(product)}

    </div>

</article>
`;

    }

    /* ========================= */

    function createPrice(product){

        return `
<div class="product-card__price">

<strong>

${ShopProducts.formatPrice(product.price)}

</strong>

<del>

${ShopProducts.formatPrice(product.oldPrice)}

</del>

</div>
`;

    }

    /* ========================= */

    function createRating(product){

        return `
<div class="product-card__rating">

⭐ ${ShopProducts.formatRating(product.rating)}

(${product.reviewCount})

</div>
`;

    }

    /* ========================= */

    function createStock(stock){

        return `
<div
class="product-card__stock
product-card__stock--${stock.color}">

${stock.label}

</div>
`;

    }

    /* ========================= */

    function createButton(product){

        return `
<button
class="button button--primary btn--full"
data-action="add-cart"
data-product-id="${product.id}">

Add to Cart

</button>

`;

    }

    function createWishlistButton(product) {

    const active =
        WishlistStore.has(product.id);

    return `
<button
class="wishlist-button ${active ? "wishlist-button--active" : ""}"
data-action="wishlist"
data-product-id="${product.id}"
aria-label="Wishlist">

❤

</button>
`;

}


    /* ========================= */

    function createBadges(product){

        return ShopProducts
            .getProductBadges(product)
            .map(

                badge=>`

<span class="product-badge">

${badge}

</span>

`

            )
            .join("");

    }

    return Object.freeze({

        create

    });

})();