// ********************************** THis file contains only direct API calls to the movies JSON and OMDB, movies.js file will
// contain functions that call these API calls below

// API used for OMDB to get posters
export const getMovieByTitle = async (title, year = '') => {
    let y = year ? `&y=${year}` : '';
    let movieRequest = `http://www.omdbapi.com/?t=${title}${y}&apikey=bd23bfb7`;
    return fetch(movieRequest).then(response => response.json()).then(data => data).catch(err => console.log(err));

};

/*--------------------------------------------------------------------------------- Fetch to get movies from movies.json-*/

export const getMovies = async () => {
    let movieRequest = `http://localhost:3000/movies`;
    return fetch(movieRequest).then(response => response.json()).then(data => data).catch(err => console.log(err));

};

//-------------------------------------------------------------------------------- DELETE FETCH CALL

export const deleteMovie = async (id) => {
    try {
        const url = `http://localhost:3000/movies/${id}`;
        const options = {
            method: 'DELETE'
        };
        const response = await fetch(url, options);
        const deletedMovie = await response.json();
        return deletedMovie;
    } catch (error) {
        console.error(error);
    }
}
/*--------------------------------------------------------------------------------- Create Movie with POST -*/
export const createMovie = async (movie) => {
    try {
        const url = 'http://localhost:3000/movies';
        const options = {
            method: 'POST',
            headers:
                {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(movie)
        };
        const response = await fetch(url, options);
        const newMovie = await response.json();
        return newMovie;
    } catch (error) {
        console.error(error);
    }
}

/*--------------------------------------------------------------------------------- Edit Movie with PUT -*/
export const editMovie = async (id, movie) => {
    try {
        const url = `http://localhost:3000/movies/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        };
        const response = await fetch(url, options);
        const updatedMovie = await response.json();
        return updatedMovie;
    } catch (error) {
        console.error(error);
    }
}



