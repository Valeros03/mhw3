const client_id = 'secret';
const client_secret = 'secret';
let token;


const searchingBlock = document.querySelector('#input-container');
const inputText = searchingBlock.querySelector('input');

const searchButton = document.querySelector('#search-button');
let isShown = false;
let bSearching = false;

const mainContent = document.querySelector('#content-show');
const searchingContent = document.querySelector('#search-show');

function focusedSearch(){

    searchingBlock.classList.remove('hover-highlighted');
    searchingBlock.classList.add('highlighted-input');
}
function unfocusedSearch(){

    searchingBlock.classList.remove('highlighted-input');
    searchingBlock.classList.add('hover-highlighted');
    
}

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
  

function search(event)
{
 
    const value = event.currentTarget.value;
    if(bSearching === false){
        mainContent.classList.add('hidden');
        searchingContent.classList.remove('hidden');
    }

    bSearching = true;

    if(value === ""){

        searchingContent.classList.add('hidden');
        mainContent.classList.remove('hidden');
        bSearching = false;
        return;
    }

    

  const album_value = encodeURIComponent(value);
 
  fetch("https://api.spotify.com/v1/search?type=album,artist,track&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}


function updateShowMore(valore){

    moreArtist.href = 'artist.html?input=' + encodeURIComponent(valore);
    moreTrack.href = 'track.html?input=' + encodeURIComponent(valore);
    moreAlbum.href = 'album.html?input=' + encodeURIComponent(valore);
  }
  
 


  let currentArtist;

  function HandleSearchResult(json) {


    let title;
    if(json.query.search[0]){
        title = json.query.search[0].title;
      fetch("https://it.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title))
        .then(onResponse)
        .then(GetDescription);

    }else{
        const noBio = {
            extract: "No Description"
        }
        GetDescription(noBio);
    }

    
  }

function GetDescription(json){

  
  let image;
  


  const nomeArtist = createH2(currentArtist.name);
  const modalDescription = createParagraph(json.extract);

  
  document.body.classList.add('no-scroll');
  modalView.style.top = window.pageYOffset + 'px';
  artistInfo.appendChild(nomeArtist);

    if(currentArtist.images[0])
    {
        image = createImage(currentArtist.images[0].url);
        artistInfo.appendChild(image);
    }
  artistInfo.appendChild(modalDescription);
  modalView.classList.remove('hidden');

}

function ArtistInfo(artist){

  currentArtist = artist;
  let searchTerm = artist.name + " cantante";
  let url = "https://it.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + encodeURIComponent(searchTerm) + "&format=json&origin=*";

  fetch(url).then(onResponse).then(HandleSearchResult)

   
}

function onArtistClick(event){

  const id = event.currentTarget.dataset.ArtistId;
  fetch("https://api.spotify.com/v1/artists/" + encodeURIComponent(id),
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(ArtistInfo);

}


function onJson(json) {

    const library = document.querySelector('#album-view');
    const artistCollection = document.querySelector('#artist-view');
    const trackCollection = document.querySelector('#track-view');

    library.innerHTML = '';
    artistCollection.innerHTML = '';
    trackCollection.innerHTML = '';
 

    const albumResults = json.albums.items;
    const artistResults = json.artists.items;
    const trackResults = json.tracks.items;


    
    let num_album;
    let num_artist_result;
    let num_track;

    if(albumResults.length > 6){
        num_album = 6;
    }else{
        num_album = albumResults.length;
    }

    if(artistResults.length > 6){
        num_artist_result = 6;
    }else{
        num_artist_result = artistResults.length;
    }

    if(trackResults.length > 6){
        num_track = 6;
    }else{
        num_track = trackResults.length;
    }
    

    for(let i=0; i<num_track; i++)
      {
        const playButton = document.createElement('button');
        playButton.classList.add('icon-button');
        playButton.classList.add('play-over');
        playButton.classList.add('hidden');

        const imagePlay = document.createElement('img');
        imagePlay.src = 'https://img.icons8.com/?size=100&id=36067&format=png&color=40C057';
        imagePlay.classList.add('icon-image');

        playButton.appendChild(imagePlay);
     
        const track_data = trackResults[i]
       
        const title = track_data.name;
        const num_artist = track_data.artists.length;
        let artistList="";
        
        for(let j=0; j<num_artist; j++){
          artistList += track_data.artists[j].name + " ";
        }

        const img = document.createElement('img');
        img.classList.add('album-icon');

        if(track_data.album.images)
            img.src = track_data.album.images[1].url;
        
        const track = document.createElement('div');
        track.classList.add('element-show');
  
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('image-box');

        

        imgWrapper.appendChild(img);
  
        const nomeTrack = document.createElement('p');
        nomeTrack.textContent = title;
        nomeTrack.classList.add('artist-name');
        nomeTrack.classList.add('open-sans');
  
        const caption = document.createElement('sapn');
        caption.textContent = artistList;
        caption.classList.add('gray-text');
      
        track.appendChild(imgWrapper);
        track.appendChild(playButton);
        track.appendChild(nomeTrack);
        track.append(caption);
        trackCollection.appendChild(track);
  
      }

    for(let i=0; i<num_artist_result; i++)
    {
     
        const playButton = document.createElement('button');
        playButton.classList.add('icon-button');
        playButton.classList.add('play-over');
        playButton.classList.add('hidden');

        const imagePlay = document.createElement('img');
        imagePlay.src = 'https://img.icons8.com/?size=100&id=36067&format=png&color=40C057';
        imagePlay.classList.add('icon-image');

        playButton.appendChild(imagePlay);

        const artist_data = artistResults[i]
       
        const title = artist_data.name;

        const img = document.createElement('img');
        img.classList.add('artist-icon')

        if(artist_data.images.length > 0)
            img.src = artist_data.images[0].url;
        
        
        const artist = document.createElement('div');
        artist.classList.add('element-show');
        artist.addEventListener('click', onArtistClick);
        artist.dataset.ArtistId = artist_data.id;
  
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('image-box');

        
  
        imgWrapper.appendChild(img);

        const nomeArtista = document.createElement('p');
        nomeArtista.textContent = title;
        nomeArtista.classList.add('artist-name');
        nomeArtista.classList.add('open-sans');
      
        artist.appendChild(imgWrapper);
        artist.appendChild(playButton);
        artist.appendChild(nomeArtista);
        artistCollection.appendChild(artist);
  
    }


    for(let i=0; i<num_album; i++)
    {
   

        const playButton = document.createElement('button');
        playButton.classList.add('icon-button');
        playButton.classList.add('play-over');
        playButton.classList.add('hidden');

        const imagePlay = document.createElement('img');
        imagePlay.src = 'https://img.icons8.com/?size=100&id=36067&format=png&color=40C057';
        imagePlay.classList.add('icon-image');

        playButton.appendChild(imagePlay);
      const album_data = albumResults[i]
     
      const title = album_data.name;
      const num_artist = album_data.artists.length;
      let artistList="";
      
      for(let j=0; j<num_artist; j++){
        artistList += album_data.artists[j].name + " ";
      }

      const img = document.createElement('img');
      img.classList.add('album-icon');

        if(album_data.images.length > 0)
            img.src = album_data.images[0].url;
      
      const album = document.createElement('div');
      album.classList.add('element-show');

      

      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('image-box');

      imgWrapper.appendChild(img);

      const nomeAlbum = document.createElement('p');
      nomeAlbum.textContent = title;
      nomeAlbum.classList.add('artist-name');
      nomeAlbum.classList.add('open-sans');

      const caption = document.createElement('sapn');
      caption.textContent = artistList;
      caption.classList.add('gray-text');
    
      album.appendChild(imgWrapper);
      album.appendChild(playButton);
      album.appendChild(nomeAlbum);
      album.append(caption);
      library.appendChild(album);

    }

    const elementList = document.querySelectorAll('div.element-show');


    for(let element of elementList){
        element.addEventListener('mouseenter', onMouseOver);
        element.addEventListener('mouseleave', onMouseLeft);
    }
    
  }

  function onResponse(response) {
   
    return response.json();
  }



function onTokenJson(json)
{

  token = json.access_token;
 
}

function onTokenResponse(response)
{
  return response.json();
}



const accediButton = document.querySelector('#accedi');


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


searchButton.addEventListener('click', showInputContainer);
document.addEventListener('click', hideDropDown);
menu.addEventListener('click', showDropDown);

const modalView = document.querySelector('#modal-view');
modalView.addEventListener('click', onModalClick);

const dropDown = document.querySelector('#dropdown-pam');
const artistInfo = document.querySelector('#artist-info');

inputText.addEventListener('focus', focusedSearch);
inputText.addEventListener('blur', unfocusedSearch);


fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);


const moreArtist = document.querySelector('#more-artist');
const moreTrack = document.querySelector('#more-track');
const moreAlbum = document.querySelector('#more-album');

inputText.addEventListener('input', search);
