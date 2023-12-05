
// Imports getMoviesTitle function from API file and adding a timeout for loading image
import {getMovieByTitle} from './movies-api.js'

console.log(await getMovieByTitle(`Top+Gun`, "1986"));

console.log(await getMovieByTitle(`Major+Payne`, "1995"));

let defaultMovies =  [
    {
        "id": 1,
        "title": "Major Payne",
        "rating": 5,
        "movieSummary": "",
        "year": "1995"
    },
    {
        "id": 2,
        "title": "Top Gun",
        "rating": 5,
        "movieSummary": "",
        "year": "1986"
    },
    {
        "id": 3,
        "title": "Catch Me If You Can",
        "rating": 5,
        "movieSummary": ""
    },
    {
        "id": 4,
        "title": "The Empire Strikes Back",
        "rating": 5,
        "movieSummary": ""
    },
    {
        "id": 5,
        "title": "IP Man",
        "rating": 2,
        "movieSummary": ""
    }
]

const addDefaultMovies = async (defaultMovies) => {
    let moviesArray=[];
    for (const defaultMovie of defaultMovies) {
        moviesArray.push(await getMovieByTitle(defaultMovie.title, defaultMovie.year));
    }
    return moviesArray;
}

console.log(await addDefaultMovies(defaultMovies));

