import {editMovie} from "./movies-api.js";
import {allMovies, displayMovies} from "./movies.js";

async function updateMovie(id, movie) {
    return await editMovie(id, movie)
}

export const myAddModel = new bootstrap.Modal('#addModal', {
    keyboard: true,
})

const addModel = document.getElementById('addModal')

if (addModel) {
    addModel.addEventListener('show.bs.modal', event => {
        const modalTitle = addModel.querySelector('.modal-title')
        modalTitle.textContent = `Add a Movie`;
    })
}


export const myEditModel = new bootstrap.Modal('#editModal', {
    keyboard: true,
})
const editModal = document.getElementById('editModal')
if (editModal) {
    editModal.addEventListener('show.bs.modal', event => {
        document.getElementById('editMovieButton').addEventListener('click', saveEdits);

    })


//     on hide
    editModal.addEventListener('hide.bs.modal', event => {
        document.getElementById('editMovieButton').removeEventListener('click', saveEdits);
    });

}

async function saveEdits() {
    // Retrieve data from the modal elements

    let movieId = +document.getElementById('movieId').value;  // input1
    let title = document.getElementById('editTitle').value;// input2
    let year = document.getElementById('editYear').value; // input3
    let rated = document.getElementById('editRated').value;  // input4
    let movieSummary = document.getElementById('editSummary').value;  // input4
    let genre = document.getElementById('editGenre').value;  // input4
    myEditModel.hide();

    let updatedMovie = await updateMovie(movieId, {rated, title, year, movieSummary, genre});

    let fullMovie = {
        title: updatedMovie.title,
        year: updatedMovie.year,
        rated: updatedMovie.rated,
        rating: 5,
        movieSummary: updatedMovie.movieSummary,
        id: updatedMovie.id,
        genre: updatedMovie.genre
    }


    let updatedIndex = allMovies.findIndex((movie) => movie.id === fullMovie.id)

    allMovies.splice(updatedIndex, 1, fullMovie);
    // Renders new Movie Array

    await displayMovies(allMovies);
}


export function setDataToModal(content) {
    // Set the title and content to the modal
    document.getElementById('modalBody').innerHTML = content;
}