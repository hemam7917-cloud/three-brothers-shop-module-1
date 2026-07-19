"use strict";

const ProductPage = (() => {

    function initialize() {

        const slug =
            getSlug();

        if (!slug) {

            showNotFound();

            return;

        }

        const product =
            ShopProducts.getProductBySlug(slug);

        if (!product) {

            showNotFound();

            return;

        }

        renderProduct(product);

ProductGallery.initialize(
product
);

        renderRelatedProducts(product);

    }

    function getSlug() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        return params.get("slug");

    }

    return {

        initialize

    };

})();


function renderProduct(product){

    const container =

        document.getElementById(
            "productDetails"
        );

    container.innerHTML =

`
<div class="product-details">

<div class="product-gallery">

<img
src="${product.image}"
alt="${product.name}">

</div>

<div class="product-info">

<h1>

${product.name}

</h1>

<p>

${product.description}

</p>

<h2>

${ShopProducts.formatPrice(product.price)}

</h2>

<p>

⭐ ${product.rating}

(${product.reviewCount})

</p>

<button

class="button button--primary"

data-action="add-cart"

data-product-id="${product.id}">

Add to Cart

</button>

</div>

</div>

`;

}


function renderRelatedProducts(product){

    const related =

        ShopProducts
        .getProductsByCategory(
            product.category
        )
        .filter(

            p=>p.id!==product.id

        )

        .slice(0,4);

    ProductRenderer.render(

        "#relatedProducts",

        related

    );

}


function showNotFound(){

document
.getElementById(
"productDetails"
)

.innerHTML=

`

<h2>

Product Not Found

</h2>

`;

}

document.addEventListener(

"DOMContentLoaded",

()=>{

ProductPage.initialize();

ProductEvents.initialize();

CartCounter.update();

WishlistCounter.update();

WishlistUI.syncAll();

}

);

function renderBreadcrumb(product){

    const breadcrumb =
        document.getElementById(
            "breadcrumb"
        );

    breadcrumb.innerHTML = `

<a href="index.html">

Home

</a>

>

<a href="category.html?category=${product.category}">

${product.categoryName}

</a>

>

<span>

${product.name}

</span>

`;

}

function renderGallery(product){

const main=

document.getElementById(
"mainImage"
);

main.src=
product.images[0];

const list=

document.getElementById(
"thumbnailList"
);

list.innerHTML=

product.images

.map(

image=>`

<img

src="${image}"

class="thumb"

>

`

)

.join("");

}

let quantity=1;

qtyPlus.onclick=()=>{

quantity++;

qty.value=quantity;

}

qtyMinus.onclick=()=>{

if(quantity>1){

quantity--;

qty.value=quantity;

}

}

const discount=

ShopProducts
.calculateDiscountPercentage(

product.oldPrice,

product.price

);

product.highlights

.map(

item=>

`<li>${item}</li>`

)

document

.querySelector(

'meta[name="description"]'

)

.content=

product.description;

