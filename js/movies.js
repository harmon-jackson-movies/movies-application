// Imports getMoviesTitle function from API file and adding a timeout for loading image
import {getMovieByTitle, getMovies, deleteMovie, createMovie} from './movies-api.js'

// ---------------------------------------------------------------------------- Adding info from json variable
let getAllMovies = await getMovies();


const addDefaultMovies = async (defaultMovies) => {
    let moviesArray = [];
    for (const defaultMovie of defaultMovies) {
        moviesArray.push(await getMovieByTitle(defaultMovie.title, defaultMovie.year));
    }
    return moviesArray;
}

// ---------------------------------------------------------------------------- Create Card

function createCard() {
    const cardDiv = document.createElement("div")
    cardDiv.classList.add(...["card"])

    const cardImage = document.createElement("img")
    cardImage.classList.add("card-img-top")

    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    const movieTitle = document.createElement("p")
    movieTitle.classList.add("card-text")

    const movieRated = document.createElement("p")
    movieRated.classList.add("card-text")

    const movieRating = document.createElement("p")
    movieRating.classList.add("card-text")

    const movieSummary = document.createElement("p")
    movieSummary.classList.add("card-text")
    cardDiv.appendChild(cardImage)
    cardDiv.appendChild(cardBody)
    cardBody.appendChild(movieTitle)
    cardBody.appendChild(movieRated)
    cardBody.appendChild(movieRating)
    cardBody.appendChild(movieSummary)

    return cardDiv
}

// ---------------------------------------------------------------------------- Looping through the json

async function displayMovies() {
    for (let i = 0; i < getAllMovies.length; i++) {
        let newCard = createCard()
        await insertMovieDetails(newCard, getAllMovies[i])

    }
}

await displayMovies()

// ---------------------------------------------------------------------------- Inserting Movie Details on Cards
async function insertMovieDetails(newCard, movie) {
    let getMoviePoster = await getMovieByTitle(movie.title, movie.year)
    newCard.querySelector(".card-img-top").src = getMoviePoster.Poster
    let deleteButton = addDeleteButton(movie)
    let editButton = addEditButton(movie)
    deleteButton.addEventListener('click', async (event) => {
        console.log(movie);
        await removeMovie(movie.id)
    })
    newCard.querySelector(".card-body").appendChild(editButton)
    newCard.querySelector(".card-body").appendChild(deleteButton)



    document.getElementById("movie-container").appendChild(newCard)
}

async function removeMovie(id) {
    return await deleteMovie(id);
}
//----------------------------------------------------------------------------  Delete Movie button
function addDeleteButton() {
    let deleteButton = document.createElement('button');
    deleteButton.classList.add(...['btn', 'btn-danger']);
    deleteButton.innerText = "DELETE";
    deleteButton.disabled = true;
    return deleteButton;
}

//---------------------------------------------------------------------------- Edit Movie button

function addEditButton() {
    let editButton = document.createElement('button');
    editButton.classList.add(...['btn', 'btn-primary']);
    editButton.innerText = "EDIT";
    return editButton;
}










