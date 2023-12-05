export const getMovieByTitle = (title, year = '') => {
    let y = year ? `&y=${year}` : '';
    let movieRequest = `http://www.omdbapi.com/?t=${title}${y}&apikey=bd23bfb7`;
    console.log(movieRequest);
    return fetch(movieRequest).then(response => response.json()).then(data => data).catch(err => console.log(err));
};