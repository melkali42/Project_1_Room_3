
// Favorites button add to favorites list
var addFav = document.getElementById("addToFavorites");

function addFavorite() { 
  var favoritesList = JSON.parse(localStorage.getItem("allFavorites"));
    if(favoritesList == null) favoritesList = [];
    var cityName = document.getElementById("search-input").value;

localStorage.setItem(cityName,JSON.stringify(cityName));
favoritesList.push(cityName);
localStorage.setItem("allFavorites", JSON.stringify(favoritesList));

console.log(favoritesList);
}

addFav.addEventListener("click",addFavorite);

var searchBar = document.querySelector(".search-bar");
var searchButton = document.getElementById("search-button");
var searchInput = document.getElementById("search-input");
var form = document.getElementById("form");
var apiKey = "b2a3d794234a2e76abf165d172c1074d";

// establish the API URL- save in a variable
// make another function get forecast weather info

function getCurrentWeatherInfo(cityName) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`; // run fetch on this

  fetch(currentWeatherUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityName = searchInput.value;
  getCurrentWeatherInfo(cityName);
});