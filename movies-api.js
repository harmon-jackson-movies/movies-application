export const getMovieByTitle = async (title, year = '') => {
    let y = year ? `&y=${year}` : '';
    let movieRequest = `http://www.omdbapi.com/?t=${title}${y}&apikey=bd23bfb7`;
    console.log(movieRequest);
    return fetch(movieRequest).then(response => response.json()).then(data => data).catch(err => console.log(err));

};

/*---------------------------------------------------------------------------------3 Second Timer for loading image-*/
function timer() {
    setTimeout(() => {
        document.getElementById("loader")
            .classList.add("hideLoader")
    }, 3250)
}
timer();