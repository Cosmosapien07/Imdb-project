// https://omdbapi.com/?s=avengers&page=1&apikey=99415a29    -movie titles
// http://www.omdbapi.com/?i=tt3896198&apikey=99415a29   -      movie details
const movieSearchbox=document.getElementById('movie-search-box');
const searchList= document.getElementById('search-list');
const resultGrid=document.getElementById('result-grid');



function findMovies()
{
    let searchTerm=(movieSearchbox.value).trim();
    //the value in the search box
    console.log(searchTerm);
    if(searchTerm.length>0)//if something is typed
        {
            searchList.classList.remove('hide-search-list');//then if this is enabled it has to be removed
            loadMovies(searchTerm);//sends it to loadmovies() to get the response
        }
        else{
            searchList.classList.add('hide-search-list');
            //if no response that will be added if response is there it will be removed in the above if condition
        }
}

async function loadMovies(searchTerm)
{
    const URL='https://omdbapi.com/?s='+searchTerm+'&page=1&apikey=99415a29';
    //building the URL ont the basis of the value that is typed in search box->this function is activated after pressing the key
    const res= await fetch(URL);
    //getting the complete https response
    const data= await res.json();
    //getting the json response 
    //api fetching
    console.log(data.Search);
    //search is the array within the response which consists of the movie details
    if(data.Response=="True")
    displayMovieList(data.Search)
    //if valid response then the block will be displayed in the search list
}

function displayMovieList(movies)//entire array of objects of details
{
    for(let idx=0;idx<movies.length;idx++)//object details
        {
            let movieListItem=document.createElement('div');//creating the div for each element in the array
            movieListItem.dataset.id=movies[idx].imdbID;//giving ithe id to it to get the response of it later
            movieListItem.classList.add('search-list-item');//entire search-list-item (ie.;the css part of the poster and the name of the little part in the search list)
            if(movies[idx].Poster != "N/A")
                moviePoster=movies[idx].Poster;//poster url
            else
                moviePoster="notfound.png";
             
                var image= "<img src="+moviePoster+">+</img>";//uploading the poster image url
                var titleu="<h3>"+movies[idx].Title+"</h3>";//uploading the title
                var Yearu="<p>"+movies[idx].Year+"</p>"//uploading the year
            movieListItem.innerHTML=" <div class='search-item-thumbnail'>"+image+"</div><div class='search-item-info'>"+titleu+Yearu+"</div>"//giving the innerhtml(html part of the search list)
            searchList.appendChild(movieListItem);    //now adding this div to the search list  
        }

        loadMovieDetails();
}

function loadMovieDetails()
{
    const SearchListMovies= searchList.querySelectorAll('.search-list-item');
    // console.log(SearchListMovies);
    SearchListMovies.forEach(movie => {
        // console.log(movie.dataset.id);
        movie.addEventListener('click',async() => {
            // console.log(movie.dataset.id);
            //enables the response functionality after clicking the each div
            searchList.classList.add('hide-search-list');//hiding the search list
            movieSearchbox.value ="";//will make the text int he search box to disappear
            const URL1='http://www.omdbapi.com/?i='+movie.dataset.id+'&apikey=99415a29';//gives the response of details asper the id
            const result=await fetch(URL1);
            const movieDetails=await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);//displaying the detaols pf selected movie
        });
    });
}

function displayMovieDetails(details)
{
    resultGrid.innerHTML="<div class='movie-poster'><img src="+details.Poster+"></div><div class='movie-info'><h3 class='movie-title'>"+details.Title+"</h3><ul class='movie-misc-info'><li class='year'>Year : "+details.Year+"</li><li class='rated'>Ratings : "+details.Rated+"</li><li class='released'>Released : "+ details.Released+", 2022</li></ul><p class='genre'><b>Genre :</b> "+ details.Genre+"</p><p class='writer'><b>Writer :</b>"+ details.Writer +"</p><p class='actors'><b>Actors :</b>"+ details.Actors+"</p><p class='plot'><b>Plot : </b> "+details.Plot+"</p><p class='Languages'><B> Languages :</B>"+details.Language+"</p></div>";
}
window.addEventListener('click', function(event){
    if(event.target.className!=="form-control")
        {
            searchList.classList.add('hide-search-list');
        }
});