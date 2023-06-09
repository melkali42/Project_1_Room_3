// FAVORITES LIST

var favButton = document.getElementById("favorites-button");
var removeButton = document.getElementById("remove-button");
var cityName = document.getElementById("search-input").value;
var favCities = JSON.parse(localStorage.getItem('favorites')) || [];

function addFavorite(){
  // checking if city is already in favs list
  if(favCities.includes(document.getElementById("search-input").value)){
    console.log(document.getElementById("search-input").value + " is already in favorites list")

  // adding city to favs list
  }else{
    console.log("Adding " + document.getElementById("search-input").value + " to favorites list...");
    favCities.push(document.getElementById("search-input").value);
    localStorage.setItem('favorites', JSON.stringify(favCities));
    console.log('favs list updated!');
    console.log(favCities);
  }
}

  // Fav button click listener
favButton.addEventListener("click", addFavorite);

  //Creating list of favorites
var listFavs = document.getElementById("favs-list");

favCities.forEach((item) => {
  let li = document.createElement("ul");

  let cityButton = document.createElement("button");
  cityButton.innerText = item;
  cityButton.classList.add("city-button");
  cityButton.value = item;
  cityButton.addEventListener("click", function() {
    getCurrentWeatherInfo(this.value);
  });
  li.appendChild(cityButton);

  let removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.classList.add("remove-button");
  removeButton.addEventListener("click", function() {
    removeFavorite(item);
    li.remove();
  });
  li.appendChild(removeButton);

  listFavs.appendChild(li);
});

// Creating Remove from Favorites button
function removeFavorite(){
  var index = favCities.indexOf(city);
  if (index !== -1) {
    favCities.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favCities));
    console.log('Favorites list updated!');
    console.log(favCities);
  }
}

// SEARCH BAR
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
      displayCurrentWeather(data)
    });

}

function displayCurrentWeather(data) {
  const { name } = data;
  const description = data.weather[0].description;
  const { temp, humidity } = data.main;
  console.log(temp, humidity)
  const { speed } = data.wind;
  const icon  = data.weather[0].icon;
  const UVI = data.uvi;
  const sunriseTimestamp = data.sys.sunrise;
  const sunsetTimestamp = data.sys.sunset;
  const sunriseTime = new Date(sunriseTimestamp * 1000);
  const sunsetTime = new Date(sunsetTimestamp * 1000);
  
  // console.log(UVI)

  // To display weather on the site
  document.querySelector(".city").innerText = "Weather in " + name;
  // document.querySelector("weather-icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector(".short").innerText = description;
  document.querySelector(".temperature").innerText = temp + "°F";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind-speed").innerText = "Wind Speed: " + speed + " MPH";
  document.querySelector(".sunrise").innerText = "Sunrise time: " + sunriseTime;
  document.querySelector(".sunset").innerText = "Sunset time: " + sunsetTime
  document.querySelector(".sunset").innerText = "Sunset time: " + sunsetTime;
  document.querySelector(".weather-today").classList.remove("loading");
  document.querySelector(".weather-icon").src = "http://openweathermap.org/img/wn/"+ icon +".png";
  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')";
  console.log(icon);
}

//   document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";

form.addEventListener ("submit", function (event) {
  event.preventDefault();
  var cityName = searchInput.value;
  console.log(cityName);
  getCurrentWeatherInfo(cityName);
});

var toDoButton = document.getElementById("toDoButton")

var toDoButton = document.getElementById("toDoButton")

function toDo(event) {
  const urlBoredApi = 'http://www.boredapi.com/api/activity?participants=1'
  fetch(urlBoredApi)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      var data = responseData; // Assign response data to 'data' variable
      console.log(data);
      document.querySelector("#toDoButton").innerText = data.activity;
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

toDoButton.addEventListener("click", toDo);

form.addEventListener("submit", function(event) {
  const quoteText = document.getElementById("inspirationalQuote");

  function inspirationalQuote() {
    const urlInspirational = 'https://type.fit/api/quotes';
    fetch(urlInspirational)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        const randomIndex = Math.floor(Math.random() * data.length);
        quoteText.innerText = data[randomIndex].text;
      });
  }

  inspirationalQuote(); // Call the function immediately
});
