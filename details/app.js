const API_KEY = '5551b5ac3a77776ce47ee9212e8660f2';
const baseUrl = 'https://api.themoviedb.org/3';
const imgUrl = 'https://image.tmdb.org/t/p/';



const params = new URLSearchParams(window.location.search);
const MovieId = params.get('id');
const title = params.get('title');
const overview = params.get('overview');


async function movieDetails () {
  try {
    //create a conditionals to see if there is a movie or a tv show
    const movieDetails = `${baseUrl}/tv/${MovieId}?api_key=${API_KEY}`
    const response = await fetch(movieDetails);
    const data = await response.json();
    console.log(data);
    // console.log(data.overview);
 
    
    console.log(data.genres);
    const title = document.getElementById('title');
    const genres = document.getElementById('genres');
    const duration = document.getElementById('duration');
    const overview = document.getElementById('overview'); 
    const imageDetail = document.getElementById('imgDetails');
    const cardCont = document.getElementById('cardCont');
    
    title.textContent = data.title;
    const genresList = data.genres.map(g => g.name).join(', ');
    genres.textContent = `Genres: ${genresList }`;
    duration.textContent = `Duration: ${data.runtime} Minutes`;
    overview.textContent = data.overview;
    imageDetail.src = posterUrl(data.poster_path, 'w342');
    cardCont.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
    url("${posterUrl(data.backdrop_path, 'original')}")`;
    
    
  } catch (error) {
    
    
  }

}

function posterUrl(path, size) {
  return path ? `${imgUrl}${size}${path}` : console.log('Unable to get the path');
}


movieDetails();
