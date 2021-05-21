var forecast = document.getElementById(".five-day-forecast");
var cityArray = [];
var todayDate = moment();
var displayTodayDate = document.getElementById("today-date")

displayTodayDate.innerHTML = todayDate.format("LL");

if (localStorage.getItem("searchHistory")) {
    cityArray = JSON.parse(localStorage.getItem("searchHistory"));
    writeSearchHistory(cityArray);
} 
else {
    cityArray = [];
};

const weather = {
    "apiKey": "6ba6a286a7d20b197ca3b0261cde6813",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
         + city 
         + "&units=metric&appid=" 
         + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    // data weather lines in card functions and input
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        const {feels_like} = data.main;
        document.querySelector(".city").innerText = name + " Weather";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
        document.querySelector(".feels-like").innerText = "Feels Like: " + feels_like + "°C";
        // hides weather on page load
        document.querySelector(".weather").classList.remove("loading");
        // loads a background picture of city that you search
        document.body.style.backgroundImage= "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

var forecast = {
    
}


// listens for click of mouse to search
document.querySelector(".search button").addEventListener("click", function() {
weather.search();
});
// ability to hit enter as well to search
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});



weather.fetchWeather("Indianapolis")
