const weatherUrl = 'https://api.openweathermap.org/data/2.5/';
const geoUrl = 'http://api.openweathermap.org/geo/1.0/'
const key = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; //kendi keyini gir

const setQuery = (e) => {
    if(e.key == 'Enter'){ // Enter'a tiklaninca
        getResult(searchBar.value);  // input value'sunu al
    }
}

const getResult = (cityName = "istanbul") => {
    let weatherQuery = `${weatherUrl}weather?q=${cityName}&appid=${key}&units=metric`
    fetch(weatherQuery)
    .then(weather => {
        return weather.json();
    })
    .then(displayWeatherResult)
}

let displayWeatherResult = (result) => {
    let container = document.querySelector(".container");
    
    container.style.backgroundImage = `url('assets/${result.weather[0].main}.jpg')`

    console.log(result)
    let city = document.querySelector(".city");
    city.innerHTML = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(result.main.temp)}°C`;

    let description = document.querySelector(".description");
    description.innerHTML = result.weather[0].description;

    let minMax = document.querySelector(".minMax");
    minMax.innerHTML = `${parseInt(result.main.temp_min)}°C / ${parseInt(result.main.temp_max)}°C`;
    
}

const searchBar = document.querySelector(".searchBar");
searchBar.addEventListener("keypress",setQuery); // her klavyeye bastiginda