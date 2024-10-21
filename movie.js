

const api= "http://www.omdbapi.com/?i=tt3896198&apikey=e95bc6b"

var moviecont=document.querySelector(".movie-cont");
var div= document.querySelector(".div");
let srch=document.getElementById("srch");
var main = document.querySelector(".main")
var movitem=document.querySelector(".movie-item")
main.style.display="flex"
main.innerHTML=`
<h1>Search For movies</h1>
`
srch.style.color="transparent"
srch.value.innerHTML="search for movies"

let arr =["deadpool","spiderman","Avatar","Avengers","Titanic","Joker","Terrifier 3","The Substance","Speak No Evil","conjuring","It's What's Inside","Salem's Lot","The Sea Inside","Trainspotting","In the Mood for Love","The Man Who Wasn't There"]

srch.value=arr[Math.floor(Math.random()*arr.length)]
getmovie()
// if(srch.value.Trim()===""){
//     main.innerHTML=`
//         <h1>Search for movies</h1>
    
//     `
//     return;

// }
srch.addEventListener("click",()=>{
    srch.value=""
    srch.style.color="black"
})



async function getmovie(){
    main.innerHTML=`
    <h1>Searching</h1>
    `
    main.style.width="100%"
    main.style.display="flex"
    let  raw =await fetch(`http://www.omdbapi.com/?apikey=e95bc6b&s=${srch.value}&plot=full`)
    let  data =await  raw.json()
    console.log(data)
    if(data.Response==="True"){
        var movies =data.Search
        display(movies)
        
    }else{
        console.log("movie not found")
        main.innerHTML=`<h1>No movie Found!</h1>`
       
    }
    if(data.Error=="Too many results."){
        main.innerHTML=`<h1>${data.Error}</h1>`
    }
    
    
}


function display(movies){
    main.innerHTML =``

    movies.forEach(movie =>{
        main.innerHTML +=`
        <div class="movie-item" imdb=${movie.imdbID}>
                <img src="${movie.Poster}" alt="${movie.Title}" title=${movie.Title}>
                <h2>${movie.Title} (${movie.Year})</h2>
                <p id="imdb"><strong>IMDb ID:</strong> ${movie.imdbID}</p>
                <div class="movie-popup"></div>
            </div>
        `;
    });

    const movieItems = document.querySelectorAll('.movie-item');

    movieItems.forEach(item => {
        item.addEventListener('click', showPopup);
    });
} 

async function showPopup(event) {
    const id = event.currentTarget.getAttribute("imdb")

    let raw = await fetch(`http://www.omdbapi.com/?apikey=e95bc6b&i=${id}&plot=full`)
    let details =await raw.json()
    
    main.innerHTML=`
        <button id="close">< Back</button>
        <img src="${details.Poster}" id="details-img">
        <br>
        <h1 id="rating"><strong>Imdb Rating : </strong> ${details.imdbRating} OUT of 10</h1>
        <h1 id="actor"><strong id="act">Actors : </strong> ${details.Actors}</h1>
        <h1 id="dirct" ><strong>Director: </strong> ${details.Director}</h1>
        <h2 id="plot"><strong id="strg">Plot: </strong> ${details.Plot}</h2>
        
    `;
    main.style.width="90%"
    main.style.display="inline-block"


    var close =document.getElementById("close")
    close.addEventListener("click",()=>{
        getmovie()
       
        
    })

    
}

let debuncy;
srch.addEventListener("keyup",()=>{
    clearTimeout(debuncy);
    debuncy =setTimeout(()=>{
        getmovie()
    },200)

});



















// const api = "http://www.omdbapi.com/?i=tt3896198&apikey=e95bc6b";

// var moviecont = document.querySelector(".movie-cont");
// var div = document.querySelector(".div");
// let srch = document.getElementById("srch");
// var main = document.querySelector(".main");

// // Function to fetch movies based on search input
// async function getmovie() {
//     let raw = await fetch(`http://www.omdbapi.com/?apikey=e95bc6b&s=${srch.value}&plot=full`);
//     let data = await raw.json();
//     console.log(data);
    
//     if (data.Response === "True") {
//         var movies = data.Search;
//         display(movies);  // Call the function to display movies
//     } else {
//         console.log("Movie not found");
//         main.innerHTML = `<h1>No movie Found!</h1>`;
//     }
    
//     if (data.Error === "Too many results.") {
//         main.innerHTML = `<h1>${data.Error}</h1>`;
//     }
// }

// // Function to display movies
// function display(movies) {
//     main.innerHTML = ``;  // Clear previous results

//     movies.forEach(movie => {
//         main.innerHTML += `
//         <div class="movie-item" data-imdb="${movie.imdbID}">
//             <img src="${movie.Poster}" alt="${movie.Title}" title="${movie.Title}">
//             <h2>${movie.Title} (${movie.Year})</h2>
//             <p id="imdb"><strong>IMDb ID:</strong> ${movie.imdbID}</p>
//             <div class="movie-popup"></div>
//         </div>
//         `;
//     });

//     // Attach hover event listeners dynamically to each .movie-item
//     const movieItems = document.querySelectorAll('.movie-item');
//     movieItems.forEach(item => {
//         item.addEventListener('mouseenter', showPopup);  // Show popup on hover
//         item.addEventListener('mouseleave', hidePopup);  // Hide popup when the mouse leaves
//     });
// }

// // Function to show movie details in a popup on hover
// async function showPopup(event) {
//     const id = event.currentTarget.getAttribute("data-imdb");  // Get IMDb ID from data attribute
//     const popup = event.currentTarget.querySelector(".movie-popup");  // Query the .movie-popup element

//     let raw = await fetch(`http://www.omdbapi.com/?apikey=e95bc6b&i=${id}&plot=full`);
//     let details = await raw.json();

//     // Populate the popup with movie details
//     popup.innerHTML = `
//         <p><strong>Actors:</strong> ${details.Actors}</p>
//         <p><strong>Director:</strong> ${details.Director}</p>
//         <p><strong>Plot:</strong> ${details.Plot}</p>
//     `;

//     popup.style.display = "block";  // Make the popup visible
// }

// // Function to hide popup when the mouse leaves the movie item
// function hidePopup(event) {
//     const popup = event.currentTarget.querySelector(".movie-popup");
//     popup.style.display = "none";  // Hide the popup
// }

// // Debounce to avoid calling the API too frequently while typing
// let debounceTimeout;
// srch.addEventListener("keyup", () => {
//     clearTimeout(debounceTimeout);
//     debounceTimeout = setTimeout(() => {
//         getmovie();  // Fetch and display movies after user stops typing for 200ms
//     }, 200);
// });

