let weather = {
  apikey: "5bc2b4f40acfffa046713955a4370d52",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apikey
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    if (data.cod == "200") {
      getweather(data);
    }
    else if (data.cod == "400") {
      noinput(data);
    }
    else{
      citynotfound(data);
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") weather.search();
  });
weather.fetchWeather("Greater Noida");


function getweather(data){
  const { name } = data;
  const { description, icon } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  // console.log(name, icon, description, temp, humidity, speed);
  document.querySelector(".location-city").innerHTML = "Weather in " + name;
  document.querySelector(".icon").style.backgroundImage = "url(https://openweathermap.org/img/wn/" + icon + "@2x.png)";
  document.querySelector(".temperature-degree").innerHTML = temp + "°C";
  document.querySelector(".weather-description").innerHTML = description;
  document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerHTML = "Wind: " + speed + "Km/hr";
  document.querySelector(".weather ").classList.remove("loading");
  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')";
}

function noinput(data){
  document.querySelector(".location-city").innerHTML = "Something went wrong!";
  document.querySelector(".temperature-degree").remove()
  document.querySelector(".humidity").remove()
  document.querySelector(".wind").remove()
}

function citynotfound(data){
  document.querySelector(".location-city").innerHTML = "City not found";
  document.querySelector(".temperature-degree").remove()
  document.querySelector(".humidity").remove()
  document.querySelector(".wind").remove()
}
