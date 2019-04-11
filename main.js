
const apiKey = "8f7dfcf3b43d0c401d33a212979b7e78";
const units = "Metric";

/* When enter key is up, fire getWeather() */
function searchWeather(){
    if (event.keyCode === 13) {getWeather()};
}

/* Fetching weather information from API */
function getWeather(){
    const searchItem = document.querySelector(".user_search").value;
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${searchItem}&APPID=${apiKey}&units=${units}`
        
    fetch(weatherApi)
        .then(response => response.json())
        .then(data =>  {
            console.log(data)
            showWeather(data)
        })
} 
            
/* Displaying the weather information */
function showWeather(weather){

    const weatherIcon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  
    document.querySelector(".output").innerHTML = `
        <div class="weather_results">
            <h2 class="city">${weather.name}</h2>
            <div class="weather_details">
                <span class="temp">${Math.round(weather.main.temp)}°C</span>
                <span>${weather.weather[0].description}</span>
                <img src= ${weatherIcon}>
            </div>
        </div>
        <hr>
        <div class="other">
            <p>Winds at ${weather.wind.speed} m/s</p>
            <p>Humidity levels at ${weather.main.humidity}%</p>
        </div> `

    document.querySelector(".output").style.display = "block"; 
}
/* Event Listener for Enter key up */      
document.querySelector(".user_search").addEventListener("keyup", searchWeather);