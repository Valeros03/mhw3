const searchingBlock = document.querySelector('#input-container');
const inputText = searchingBlock.querySelector('input');
function focusedSearch(){

    searchingBlock.classList.remove('hover-highlighted');
    searchingBlock.classList.add('highlighted-input');
}
function unfocusedSearch(){

    searchingBlock.classList.remove('highlighted-input');
    searchingBlock.classList.add('hover-highlighted');
    
}

inputText.addEventListener('focus', focusedSearch);
inputText.addEventListener('blur', unfocusedSearch);




function onMouseOver(event){

    let playButton = event.currentTarget.querySelector('button.play-over');
    playButton.classList.remove('hidden');


}

function onMouseLeft(event){

    let playButton = event.currentTarget.querySelector('button.play-over');
    playButton.classList.add('hidden');


}

function showDropDown(event){

    event.stopPropagation();
    dropDown.classList.remove('hidden');
}

function hideDropDown(){

    dropDown.classList.add('hidden');

}

const searchButton = document.querySelector('#search-button');
let isShown = false;
function showInputContainer(){

    if(!isShown)
    {    
        searchingBlock.style.display = 'flex';
        focusedSearch();
        inputText.focus();
    }
    else
    {
        searchingBlock.style.display = 'none';
        unfocusedSearch();
    }
    isShown = !isShown;
}


searchButton.addEventListener('click', showInputContainer);
document.addEventListener('click', hideDropDown);
menu.addEventListener('click', showDropDown);

const modalView = document.querySelector('#modal-view');
modalView.addEventListener('click', onModalClick);

const dropDown = document.querySelector('#dropdown-pam');
const artistInfo = document.querySelector('#artist-info');



function createImage(src) {
    const image = document.createElement('img');
    image.src = src;
    return image;
  }
  
function createParagraph(text){
    const newText = document.createElement('p');
    newText.textContent = text;
    newText.classList.add('open-sans');
    newText.classList.add('white-text');
    newText.style.margin = 16 + 'px';
    return newText;

}

function createH2(text){

    const newText = document.createElement('h2');
    newText.textContent = text;
    newText.classList.add('open-sans');
    newText.classList.add('white-text');
    newText.style.margin = 16 + 'px';
    return newText;

}

function onThumbnailClick(event) {
    
    const imageSrc = event.currentTarget.querySelector('img');
    const nomeArtist = createH2(event.currentTarget.querySelector('.artist-name').textContent);
    const description = createParagraph(event.currentTarget.dataset.description);

    const image = createImage(imageSrc.src);
    document.body.classList.add('no-scroll');
    modalView.style.top = window.pageYOffset + 'px';
    artistInfo.appendChild(nomeArtist);
    artistInfo.appendChild(image);
    artistInfo.appendChild(description);
    modalView.classList.remove('hidden');

  }
  
  function onModalClick() {
    document.body.classList.remove('no-scroll');
    modalView.classList.add('hidden');
    artistInfo.innerHTML = '';
  }
  


function loadEsplora(event){
    window.location.href = `esplora.html?input=${encodeURIComponent(event.currentTarget.value)}`;
}

const accediButton = document.querySelector('#accedi');



inputText.addEventListener('input', loadEsplora);