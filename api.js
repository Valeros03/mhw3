let currentArtist;
function GetDescription(json){

  const imageSrc = currentArtist.images[0].url;
  const nomeArtist = createH2(currentArtist.name);
  const modalDescription = createParagraph(json.extract);

  const image = createImage(imageSrc);
  document.body.classList.add('no-scroll');
  modalView.style.top = window.pageYOffset + 'px';
  artistInfo.appendChild(nomeArtist);
  artistInfo.appendChild(image);
  artistInfo.appendChild(modalDescription);
  modalView.classList.remove('hidden');

}

function ArtistInfo(artist){

  currentArtist = artist;
  fetch("https://it.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(artist.name)).then(onResponse).then(GetDescription)

   
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
    console.log('JSON ricevuto');
    console.log(json);

    const library = document.querySelector('#album-view');
    const artistCollection = document.querySelector('#artist-view');
    const trackCollection = document.querySelector('#track-view');

    library.innerHTML = '';
    artistCollection.innerHTML = '';
    trackCollection.innerHTML = '';
 

    const albumResults = json.albums.items;
    const artistResults = json.artists.items;
    const trackResults = json.tracks.items;

    let num_results = 6;

    

    for(let i=0; i<num_results; i++)
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
        const selected_image = track_data.album.images[1].url;
        
        const track = document.createElement('div');
        track.classList.add('element-show');
  
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('image-box');

        const img = document.createElement('img');
        img.src = selected_image;
        img.classList.add('album-icon')

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

    for(let i=0; i<num_results; i++)
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
       
        const selected_image = artist_data.images[0].url;
        
        const artist = document.createElement('div');
        artist.classList.add('element-show');
        artist.addEventListener('click', onArtistClick);
        artist.dataset.ArtistId = artist_data.id;
  
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('image-box');

        const img = document.createElement('img');
        img.src = selected_image;
        img.classList.add('artist-icon')
  
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


    for(let i=0; i<num_results; i++)
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
      const selected_image = album_data.images[0].url;
      
      const album = document.createElement('div');
      album.classList.add('element-show');

      const img = document.createElement('img');
      img.src = selected_image;
      img.classList.add('album-icon');

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
    console.log('Risposta ricevuta');
    return response.json();
  }

function search(value)
{
 
  const album_value = encodeURIComponent(value);
  console.log('Eseguo ricerca: ' + album_value)
  console.log('Token: ' + token);
  fetch("https://api.spotify.com/v1/search?type=album,artist,track&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
  console.log('Token: ' + token);
  search(input);
}

function onTokenResponse(response)
{
  return response.json();
}


const client_id = '6ff7a41aaad1448694fea5650531aad1';
const client_secret = 'fe88c9457d8c436cb8e8cfd1d0ccd402';

let token;

const params = new URLSearchParams(window.location.search);
const input = params.get('input');

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

const form = document.querySelector('form');
form.addEventListener('submit', search)



if(input != ''){
    searchingBlock.style.display = 'flex';
    focusedSearch();
    inputText.focus();
    inputText.value = input;
    
}

const moreArtist = document.querySelector('#more-artist');
const moreTrack = document.querySelector('#more-track');
const moreAlbum = document.querySelector('#more-album');

function updateShowMore(valore){

  moreArtist.href = 'artist.html?input=' + encodeURIComponent(valore);
  moreTrack.href = 'track.html?input=' + encodeURIComponent(valore);
  moreAlbum.href = 'album.html?input=' + encodeURIComponent(valore);
}

function loadRicerca(event) {

  event.preventDefault();
  const valore = encodeURIComponent(event.currentTarget.value.trim());
  search(valore); 
  updateShowMore(valore);
}

inputText.removeEventListener('input', loadEsplora);
inputText.addEventListener('input', loadRicerca);




