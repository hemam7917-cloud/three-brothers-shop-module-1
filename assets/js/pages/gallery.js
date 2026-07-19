"use strict";

const ProductGallery = (() => {

    let images = [];

    let currentIndex = 0;

    function initialize(product){

        images = product.images;

        currentIndex = 0;

        render();

        bindKeyboard();

        bindSwipe();

    }

    function render(){

        renderMainImage();

        renderThumbnails();

    }

    return Object.freeze({

        initialize

    });

})();

function renderThumbnails(){

const container=

document.getElementById(
"galleryThumbnailList"
);

container.innerHTML=

images

.map(

(image,index)=>`

<button

class="gallery-thumb
${index===currentIndex?"active":""}"

data-index="${index}">

<img
src="${image}">

</button>

`

)

.join("");

}

document

.addEventListener(

"click",

event=>{

const button=

event.target.closest(

".gallery-thumb"

);

if(!button){

return;

}

currentIndex=

Number(

button.dataset.index

);

render();

}

);

function bindKeyboard(){

document

.addEventListener(

"keydown",

event=>{

if(event.key==="ArrowRight"){

next();

}

if(event.key==="ArrowLeft"){

previous();

}

}

);

}

function bindKeyboard(){

document

.addEventListener(

"keydown",

event=>{

if(event.key==="ArrowRight"){

next();

}

if(event.key==="ArrowLeft"){

previous();

}

}

);

}

function next(){

currentIndex++;

if(currentIndex>=images.length){

currentIndex=0;

}

render();

}

function previous(){

currentIndex--;

if(currentIndex<0){

currentIndex=

images.length-1;

}

render();

}

const image=

document.getElementById(

"galleryMainImage"

);

image

.addEventListener(

"mousemove",

()=>{

image.style.transform=

"scale(2)";

}

);

image

.addEventListener(

"mouseleave",

()=>{

image.style.transform=

"scale(1)";

}

);

image.style.transformOrigin=

`${x}% ${y}%`;