import {getMovieByTitle} from './movies-api.js'

console.log(await getMovieByTitle(`Top+Gun`, "1986"));
console.log(await getMovieByTitle(`Major+Payne`, "1995"));