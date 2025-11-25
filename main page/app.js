// const addFav = document.getElementById('addFav');
//
// addFav.addEventListener('click', () => {
//   console.log('hello');
// });


//API READ ACCESS TOKEN
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTUxYjVhYzNhNzc3NzZjZTQ3ZWU5MjEyZTg2NjBmMiIsIm5iZiI6MTc1OTQ2OTkyNC42NDQsInN1YiI6IjY4ZGY2MTY0MWM1YzE4YzZjNTJhMThhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BBFFbdORdEFFKz1nZZpX5cMFKy3ULP5iEU93u-Gbo-E
//
//API Key
//5551b5ac3a77776ce47ee9212e8660f2
//
//

//API
const API_KEY = '5551b5ac3a77776ce47ee9212e8660f2';
const baseUrl = 'https://api.themoviedb.org/3';
const imgUrl = 'https://image.tmdb.org/t/p/';

//Elements
const searchInp = document.getElementById('searchInp');
const searchBtn = document.getElementById('searchBtn');





function posterUrl(path, size) {
  return path ? `${imgUrl}${size}${path}` : console.log('Unable to get the path');
}


// async function search

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const value = searchInp.value.toLowerCase().trim();
  console.log(value);
  if (!value) throw new Error('Movie not found'); 
  searchMovies(value);
  searchInp.value = '';
});

// searchInp.addEventListener('keydown', (e) => {
//   if (e.key !== 'Enter') return;
//   e.preventDefault();
//
//     const value = searchInp.value.toLowerCase().trim();
//     console.log(value);
//     if (!value) throw new Error('Movie not found'); 
//     searchMovies(value);
//     searchInp.value = '';
// });

async function searchMovies(query) {
  const encoded = encodeURIComponent(query);
  console.log(encoded);
  const url = `${baseUrl}/search/movie?api_key=${API_KEY}&query=${encoded}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderMovies(data.results);
  } catch (error) {
    grid.innerHTML = `<h1>Bad request please check it and try again</h1>`
    
  }

}





// Get trending movies as default 
async function trendingAll() {

  try {
    // const url = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`;
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    renderMovies(data.results);
    // console.log(renderMovies(data.results));
    
  } catch (error) {
    grid.innerHTML = `
      <h1>Error getting the trending movies</h1>
    `
    
  }
}



// async function trendingAll() {
//   try {
//     const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
//     const response = await fetch(url);
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//
//     const data = await response.json();
//     console.log('TMDb data:', data);
//
//     renderMovies(data.results);
//
//   } catch (error) {
//     console.error(error);
//     grid.innerHTML = `
//       <h1>Error getting the trending movies</h1>
//       <p>${error.message}</p>
//     `;
//   }
// }
//
const grid = document.getElementById('grid');

function renderMovies(movies) {
  grid.innerHTML = ''; //cleaning the grid before rendering movies

  movies.forEach(e => {
  const movieCard = document.createElement('a');
  movieCard.classList.add('card');
  movieCard.classList.add('movie-card');
  movieCard.href = `/details/index.html?id=${e.id}&title=${e.title}`;
  movieCard.innerHTML = `
       <img class="card-img-top" src="${posterUrl(e.poster_path, 'w185')}" alt="" >
       <div class="card-body">
        <div>
        <button class="add-fav" id="addFav" type="button" title="Add to Favorites">
           <i class="bi bi-plus-circle-fill addIcon"  style="font-size:1.5rem"></i>
        </button>
        </div>
         <h5 class="card-title">${e.name || e.title}</h5>
         <div class="card-info">
            <span class="movie-info">${e.release_date ? e.release_date.slice(0,4) : e.fir}</span>
            <span class="movie-info float-right"><i class="bi bi-star-fill"></i>${e.vote_average.toFixed(1)}</span>
         </div>
       </div>
      
     `;
    grid.appendChild(movieCard);
  });

  addWatchlist();




}

trendingAll();




function addWatchlist() {
  const addFavBtn = document.querySelectorAll('.add-fav').forEach(button => {
    button.addEventListener('click', (e) => {
      console.log('button clicked');
      console.log(grid);
    });
  });
  
  
}



//
// async function getTrending() {
//   const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
//   const data = await response.json();
//   console.log(data);
//
// }
//
//
// getTrending();
//
//
// async function getFastandFurious() {
//   const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=deadpool&api_key=${API_KEY}`);
//   const data = await response.json();
//   console.log(data);
// }
//
// getFastandFurious(); // to get fast and furious implement the encoder
//
//


//Creating and render the movie cards
//

// const grid = document.getElementById('grid');
//
// function renderMovies(movies) {
//   grid.innerHTML = ''; //cleaning the grid before rendering movies
//
//   movies.forEach(e => {
//   const movieCard = document.createElement('div');
//   movieCard.classList.add('card');
//   movieCard.classList.add('movie-card');
//   movieCard.innerHTML = `
//        <img class="card-img-top" src="${posterUrl(e.poster_path, 'w342')}" alt="" width="150px" height="200">
//        <div class="card-body">
//         <div><button class="add-fav" id="addFav" type="button" title="Add to Favorites">
//            <i class="bi bi-plus-circle-fill"></i>
//         </button></div>
//          <h5 class="card-title">${e.name || e.title}</h5>
//          <div class="card-info">
//             <span class="movie-info">${e.realese_date}</span>
//             <span class="movie-info float-right"><i class="bi bi-star-fill"></i>${e.vote_average}</span>
//          </div>
//        </div>
//      `;
//     grid.appendChild(movieCard);
//   });
//
//   
// }
//




// function posterUrl(path, size) {
//   return path ? `${imgUrl}${size}${path}` : console.log('Unable to get the path');
// }
//
//





//Get trending movies as default 
// async function trendingMovies() {
//
//   try {
//     const url = `${baseUrl}/trending/movie/day?api_key=${API_KEY}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     renderMovies(data.results);
//     console.log(renderMovies(data.results));
//     
//   } catch (error) {
//     grid.innerHTML = `
//       <h1>Error getting the trending movies</h1>
//     `
//     
//   }
// }
//
//
//
//



