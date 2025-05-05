const elementList = document.querySelectorAll('div.element-show');
let homeToken;

for(let element of elementList){
    element.addEventListener('mouseenter', onMouseOver);
    element.addEventListener('mouseleave', onMouseLeft);
}

const menu = document.querySelector('#menu');

const artistCategory = document.querySelector('#artist-category');
const artistList = artistCategory.querySelectorAll('div.element-show');

for(let element of artistList){
    element.addEventListener('click', onThumbnailClick);
}






