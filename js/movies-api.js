export const getMovieByTitle = async (title, year = '') => {
    let y = year ? `&y=${year}` : '';
    let movieRequest = `http://www.omdbapi.com/?t=${title}${y}&apikey=bd23bfb7`;
    console.log(movieRequest);
    return fetch(movieRequest).then(response => response.json()).then(data => data).catch(err => console.log(err));

};

/*--------------------------------------------------------------------------------- 3 Second Timer for loading image-*/
function timer() {
    setTimeout(() => {
        showMovies()
    }, 3350)
}

timer();

/*--------------------------------------------------------------------------------- Fetch to get movies from movies.json-*/

export const getMovies = async () => {
    let movieRequest = `http://localhost:3000/movies`;
    return fetch(movieRequest).then(response => response.json()).then(data => data).catch(err => console.log(err));

};

/*--------------------------------------------------------------------------------- Showing and Hiding Loader/Movies-*/

function showMovies() {
    document.getElementById("loader")
        .classList.add("hide")
        document.getElementById("loader")
            .classList.remove("show")
    document.getElementById("movie-container")
        .classList.add("show")
}

function showLoader() {
    document.getElementById("loader")
        .classList.add("show")
    document.getElementById("movie-container")
        .classList.remove("show")
}

showLoader()



