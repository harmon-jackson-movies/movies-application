// ********************************** Imports **********************************
//
// getMoviesTitle function and other AI functions from API file
import {getMovieByTitle, getMovies, deleteMovie, createMovie} from './movies-api.js';
import {myAddModel, setDataToModal} from './modal.js';

//********************************** Variable Declarations Logic **********************************

// ---------------------------------------------------------------------------- Calling API to get all movies from the JSON file
const moviesFromJsonArr = await getMovies();

// combination of the json file movies and newly added movies from the web page, spread operator creates a completely new array and reference different than the moviesFromJsonArr array, same exact data though, this spread operator is needed so that the newly added movies arent updating the moviesFromJsonArr variable.

export const allMovies = [...moviesFromJsonArr];

//**********************************Api Calls Logic **********************************
// Calls add function of movie by id

async function addMovie(movie) {
    return await createMovie(movie);
}


// Gets the Movie Details From API needed that arent provided by the user
async function getOtherMovieDetails(title, year) {
    let movies = await getMovieByTitle(title, year)
    let movieDetails = {
        rated: movies.Rated,
        movieSummary: movies.Plot,
        year: movies.Year,
        title: movies.Title,
        genre: movies.Genre
    }
    return movieDetails;
}

// Event Listener for addMovieButton
document.querySelector("#addMovieButton").addEventListener("click", async (e) => {
    myAddModel.hide();
    let movieTitle = document.getElementById("title").value;
    let newMovieTitle = movieTitle.replace(' ', '+');
    let movieYear = document.getElementById("year").value;
    // Get other Details
    let movieDetails = await getOtherMovieDetails(newMovieTitle, movieYear);


    let fullMovie = {
        title: movieDetails.title || movieTitle,
        year: movieDetails.year || movieYear,
        rated: movieDetails.rated || "Rating Not Found",
        rating: 5,
        movieSummary: movieDetails.movieSummary || "Summary Not Found",
        genre: movieDetails.genre || "Genre Not Found"
    }
    // Reset Add Form
    document.getElementById("movieForm").reset();

    // Add new created movie to the all movies array
    allMovies.push(await addMovie(fullMovie));
    // Renders new Movie Array
    await displayMovies(allMovies);
})


// Calls delete function of movie by id
async function removeMovie(id) {
    await deleteMovie(id);
    let newMovieArray = allMovies.filter((movie) => movie.id !== id);
    await displayMovies(newMovieArray);
}

//- Delete Movie button for adding to specific movie card, used in insertMovieDetails function
function addDeleteButton() {
    let deleteButton = document.createElement('button');
    deleteButton.classList.add(...['btn', 'btn-danger']);
    deleteButton.innerText = "DELETE";
    // in production this will only disable while the Delete Call is loading/pending, disabled now to prevent deleting our movies during development
    // deleteButton.disabled = true;
    return deleteButton;
}

//---------------------------------------------------- Edit Movie button for adding to specific movie card, used in insertMovieDetails function

function addEditButton(movie) {
    let editButton = document.createElement('button');
    editButton.className = "btn btn-primary";
    editButton.setAttribute('data-bs-toggle', "modal");
    editButton.setAttribute('data-bs-target', "#editModal");
    editButton.addEventListener('click', function (event) {
        let editModalDialog = modalHtmlCreation(movie);
        setDataToModal(editModalDialog.content);
    })

    editButton.type = 'button';
    editButton.innerText = "EDIT";
    return editButton;
}


function modalHtmlCreation(movie) {
    let content =
        `<form id="editMovieForm">

        <input type="hidden" id="movieId" value="${movie.id}" name="id" class="form-control" required>
        <label for="editTitle" class="col-form-label">Movie Title: </label>
        <input type="text" id="editTitle" value="${movie.title}" name="title" class="form-control" required>

            <label for="editYear" class="col-form-label">Year: </label>
            <input type="text" id="editYear" value="${movie.year}" class="form-control" name="year">

          <label for="editRated" class="col-form-label">Rated: </label>
          <input type="text" value="${movie.rated}" id="editRated" class="form-control" name="rated" required>
          
                <label for="editGenre" class="col-form-label">Genre: </label>
          <input type="text" value="${movie.genre}" id="editGenre" class="form-control" name="genre" required>
          
            <label for="editSummary" class="col-form-label">Summary: </label>
          <input type="text" value="${movie.movieSummary}" id="editSummary" class="form-control" name="rated" required>
    
    </form>`
    return {content};
}

//********************************** Movie Data Inserting to Card Logic **********************************

// ---------------------------------------------------------------------------- Inserting Movie Details on Cards
async function insertMovieDetails(newMovieCard, movie) {
    let getOtherMovieDetails = await getMovieByTitle(movie.title, movie.year)
    newMovieCard.querySelector(".card-img-top").src = getOtherMovieDetails.Poster || '../assests/placeholder.jpeg'
    newMovieCard.querySelector(".card-img-top").alt = movie.title || getOtherMovieDetails.Title;
    newMovieCard.querySelector(".movieTitle").innerHTML = `<strong>Title:</strong> ${movie.title || getOtherMovieDetails.Title}`
    newMovieCard.querySelector(".movieRated").innerHTML = `<strong>Rated:</strong> ${movie.rated || getOtherMovieDetails.Rated}`
    newMovieCard.querySelector(".movieGenre").innerHTML = `<strong>Genre:</strong> ${movie.genre || getOtherMovieDetails.Genre || "Genre Not Found"}`
    newMovieCard.querySelector(".movieYear").innerHTML = `<strong>Year:</strong> ${movie.year || getOtherMovieDetails.Year}`
    // newMovieCard.querySelector(".movieRating").innerHTML = `<strong>Rating:</strong> ${movie.rating || 5}`
    newMovieCard.querySelector(".movieSummary").innerHTML = `<strong>Summary:</strong> ${movie.movieSummary || getOtherMovieDetails.Plot || "Summary Not Found"}`
    let deleteButton = addDeleteButton()
    let editButton = addEditButton(movie)
    deleteButton.addEventListener('click', async (event) => {
        await removeMovie(movie.id)
    })

    newMovieCard.querySelector(".card-body").appendChild(editButton)
    newMovieCard.querySelector(".card-body").appendChild(deleteButton)


    // adds newMovieCard to the movie container
    document.getElementById("movie-container").appendChild(newMovieCard)
}


//********************************** Creating Movie Card HTML, Displaying Movies Logic, Loading Logic **********************************


// Looping through the json and creating a card for each movie in the array, also runs function to insert movie data on each card

export async function displayMovies(movies) {
    document.getElementById('movie-container').innerHTML = "";
    for (let i = movies.length - 1; i >= 0; i--) {
        let newCard = createCard()
        await insertMovieDetails(newCard, movies[i])

    }
}

// Render movies to page
await displayMovies(allMovies)

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

    const movieGenre = document.createElement("p");
    movieGenre.classList.add("card-text", "movieGenre");

    const movieYear = document.createElement("p");
    movieYear.classList.add("card-text", "movieYear");

    const movieRating = document.createElement("p");
    movieRating.classList.add("card-text", "movieRating");

    // Generate a random number of checked stars (between 1 and 5)
    const randomCheckedStars = Math.floor(Math.random() * 5) + 1;

    // Add the star icons dynamically based on the random number
    const starIcons = document.createElement('div');
    for (let i = 0; i < randomCheckedStars; i++) {
        const star = document.createElement('span');
        star.classList.add('fa', 'fa-star', 'checked');
        starIcons.appendChild(star);
    }
    movieRating.appendChild(starIcons);

    const movieSummary = document.createElement("p");
    movieSummary.classList.add("card-text", "movieSummary");

    movieCard.appendChild(movieCardImage);
    movieCard.appendChild(movieCardBody);
    movieCardBody.appendChild(movieTitle);
    movieCardBody.appendChild(movieRated);
    movieCardBody.appendChild(movieYear);
    movieCardBody.appendChild(movieGenre);
    movieCardBody.appendChild(starIcons);
    movieCardBody.appendChild(movieSummary);

    return movieCard;
}

// puts loader on the screen and hides movies
export function showLoader() {
    // grab loader html and adds the show class, this adds the loader from the page
    document.getElementById("loader").classList.add("show")
    // grab movie-container html and remove the show class, this removes the movie container from the page
    document.getElementById("movie-container").classList.remove("show");

}

/*--------------------------------------------------------------------------------- Showing and Hiding Loader/Movies-*/

// show Movies and hides loader
function showMovies() {
    // grab loader html and adds the hide class, this removes the loader from the page
    document.getElementById("loader").classList.add("hide");
    // grab loader html and removes the show class, this is needed because the loader may have the show class still due to the initial page loading or other rendering such as a search function being ran or a movie being added.
    document.getElementById("loader").classList.remove("show");
    document.getElementById("movie-container").classList.add("show");
    document.getElementById("movie-container").classList.remove("hide");
}

/*--------------------------------------------------------------------------------- 3 Second Timer for loading image-*/

// the timer will be 2350 in production, but for development and testing it will be 0
export function startLoadingTimer(timer) {
    setTimeout(() => {
        showMovies()
        document.body.style.background = "linear-gradient(to bottom, #af9be5, #000000)";
    }, timer)
}

// shows Loaders
showLoader();
// then starts timer for the loader that will event, this is a simulated loading process because the movie data fetch is too fast and we want to give the illusion to the user that the page is actually loading
startLoadingTimer(2350);

// ********** Search Code **************
async function searchMovies(search) {
    console.log(search);

    let lowerCasedSearch = search.toLowerCase().toString();
    if (!search) {
        console.log('if');
        return displayMovies(await getMovies());
    } else {
        console.log('else');
        let movies = [...allMovies]
        let searchedMovies = movies.filter((movie) => movie.title.toLowerCase().includes(lowerCasedSearch) || movie?.genre?.toLowerCase()?.includes(lowerCasedSearch) || movie.year.toLowerCase().includes(lowerCasedSearch) || movie.rated.toLowerCase().includes(lowerCasedSearch))
        await displayMovies(searchedMovies);
    }
}

document.getElementById('searchButton').addEventListener("click", async () => {
    await searchMovies(document.getElementById('searchMovie').value);
})

document.getElementById('searchMovie').addEventListener("keyup", async (event) => {
    console.log(document.getElementById('searchMovie').value)
    console.log(event.keyCode);
    await searchMovies(document.getElementById('searchMovie').value);


})









