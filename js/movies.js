// ********************************** Imports **********************************
//
// getMoviesTitle function and other AI functions from API file
import {getMovieByTitle, getMovies, deleteMovie, createMovie} from './movies-api.js';

//********************************** Variable Declarations Logic **********************************

// ---------------------------------------------------------------------------- Calling API to get all movies from the JSON file
const moviesFromJsonArr = await getMovies();

// combination of the json file movies and newly added movies from the web page, spread operator creates a completely new array and reference different than the moviesFromJsonArr array, same exact data though, this spread operator is needed so that the newly added movies arent updating the moviesFromJsonArr variable.

const allMovies = [...moviesFromJsonArr];

//**********************************Api Calls Logic **********************************

// Calls delete function of movie by id
async function removeMovie(id) {
    return await deleteMovie(id);
}

//- Delete Movie button for adding to specific movie card, used in insertMovieDetails function
function addDeleteButton() {
    let deleteButton = document.createElement('button');
    deleteButton.classList.add(...['btn', 'btn-danger']);
    deleteButton.innerText = "DELETE";
    // in production this will only disable while the Delete Call is loading/pending, disabled now to prevent deleting our movies during development
    deleteButton.disabled = true;
    return deleteButton;
}

//---------------------------------------------------------------------------- Edit Movie button for adding to specific movie card, used in insertMovieDetails function

function addEditButton() {
    let editButton = document.createElement('button');
    editButton.classList.add(...['btn', 'btn-primary']);
    editButton.innerText = "EDIT";
    return editButton;
}

//********************************** Movie Data Inserting to Card Logic **********************************

// ---------------------------------------------------------------------------- Inserting Movie Details on Cards
async function insertMovieDetails(newMovieCard, movie) {
    let getMoviePoster = await getMovieByTitle(movie.title, movie.year)
    newMovieCard.querySelector(".card-img-top").src = getMoviePoster.Poster
    newMovieCard.querySelector(".movieTitle").innerHTML = `<strong>Title:</strong> ${movie.title}`
    newMovieCard.querySelector(".movieRated").innerHTML = `<strong>Rated:</strong> ${movie.rated}`
    newMovieCard.querySelector(".movieRating").innerHTML = `<strong>Rating:</strong> ${movie.rating}`
    newMovieCard.querySelector(".movieSummary").innerHTML = `<strong>Summary:</strong> ${movie.movieSummary}`
    let deleteButton = addDeleteButton(movie)
    let editButton = addEditButton(movie)
    deleteButton.addEventListener('click', async (event) => {
        console.log(movie);
        await removeMovie(movie.id)
    })
    newMovieCard.querySelector(".card-body").appendChild(editButton)
    newMovieCard.querySelector(".card-body").appendChild(deleteButton)


    // adds newMovieCard to the movie container
    document.getElementById("movie-container").appendChild(newMovieCard)
}


//********************************** Creating Movie Card HTML, Displaying Movies Logic, Loading Logic **********************************



// Looping through the json and creating a card for each movie in the array, also runs function to insert movie data on each card

async function displayMovies() {
    for (let i = 0; i < allMovies.length; i++) {
        let newCard = createCard()
        await insertMovieDetails(newCard, allMovies[i])

    }
}
// Render movies to page
await displayMovies()

// ---------------------------------------------------------------------------- Create Card HTML - no movie data inserted on card yet, just html

function createCard() {
    // create card for movie
    const movieCard = document.createElement("div");
    movieCard.classList.add(...["card"]);

    const movieCardImage = document.createElement("img");
    movieCardImage.classList.add("card-img-top");

    const movieCardBody = document.createElement("div");
    movieCardBody.classList.add("card-body");

    const movieTitle = document.createElement("p");
    movieTitle.classList.add("card-text", "movieTitle");

    const movieRated = document.createElement("p");
    movieRated.classList.add("card-text", "movieRated");

    const movieRating = document.createElement("p");
    movieRating.classList.add("card-text", "movieRating");

    const movieSummary = document.createElement("p");
    movieSummary.classList.add("card-text", "movieSummary");

    movieCard.appendChild(movieCardImage);
    movieCard.appendChild(movieCardBody);
    movieCardBody.appendChild(movieTitle);
    movieCardBody.appendChild(movieRated);
    movieCardBody.appendChild(movieRating);
    movieCardBody.appendChild(movieSummary);

    return movieCard;
}

// puts loader on the screen and hides movies
function showLoader() {
    // grab loader html and adds the show class, this adds the loader from the page
    document.getElementById("loader").classList.add("show")
    // grab movie-container html and remove the show class, this removes the movie container from the page
    document.getElementById("movie-container").classList.remove("show")
}

/*--------------------------------------------------------------------------------- Showing and Hiding Loader/Movies-*/
// show Movies and hides loader
function showMovies() {
    // grab loader html and adds the hide class, this removes the loader from the page
    document.getElementById("loader").classList.add("hide");
    // grab loader html and removes the show class, this is needed because the loader may have the show class still due to the initial page loading or other rendering such as a search function being ran or a movie being added.
    document.getElementById("loader").classList.remove("show");
    document.getElementById("movie-container").classList.add("show");
}

/*--------------------------------------------------------------------------------- 3 Second Timer for loading image-*/
// the timer will be 3350 in production, but for development and testing it will be 0
function startLoadingTimer() {
    setTimeout(() => {
        showMovies()
    }, 0)
}
// shows Loaders
showLoader();
// then starts timer for the loader that will event, this is a simulated loading process because the movie data fetch is too fast and we want to give the illusion to the user that the page is actually loading
startLoadingTimer();










