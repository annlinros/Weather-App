
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
            weatherIcon(data)
            showWeather(data)
        })
} 
function weatherIcon(weather){
/*     debugger;
 */
    const main = weather.weather[0].main;
    let icon = "";

    switch(main) {
        case "Rain" : icon +=  "weather_icons/rainy-3.svg";
                    break;
        case "Thunderstorm" : icon +=  "weather_icons/thunder.svg";
                    break;
        case "Drizzle" : icon +=  "weather_icons/rainy-3.svg";
                    break;
        case "Snow" : icon +=  "weather_icons/snowy-6.svg";
                    break;
        case "Atmosphere" : icon +=  "http://openweathermap.org/img/w/${weather.weather[0].icon}.png";
                    break;
        case "Clear" : icon +=  "weather_icons/day.svg";
                    break;
        case "Clouds" : icon +=  "weather_icons/cloudy.svg";
                    break;  
    }
    return icon;
    console.log(main);
    console.log(icon);


}         
/* Displaying the weather information */
function showWeather(weather){

/*     const weatherIcon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
 */  
    document.querySelector(".output").innerHTML = 
    
        `<div class="weather_results">
            <h2 class="city">${weather.name}, ${weather.sys.country}</h2>
            <div class="temp">${Math.round(weather.main.temp)}°C</div>
            <div class="weather_details">
                <span class="weather_description">${weather.weather[0].description}</span>
                <img src= ${weatherIcon(weather)} class="weather_icon">
            </div>
        </div>
        <hr>
        <div class="other">
            <p>Winds at ${weather.wind.speed} m/s</p>
            <p>Humidity levels at ${weather.main.humidity}%</p>
        </div>`


}
/* Event Listener for Enter key up */      
document.querySelector(".user_search").addEventListener("keyup", searchWeather);