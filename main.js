
/* API Key */
const apiKey = "8f7dfcf3b43d0c401d33a212979b7e78";
const units = "Metric";

                        /*  WEATHER API   */

/* When enter key is up, getWeather() fires */
function searchWeather(){
    if (event.keyCode === 13) {getWeather()};
}

/* Fetches weather information from API */

function getWeather(){
    const searchItem = document.querySelector(".search").value;
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${searchItem}&APPID=${apiKey}&units=${units}`
        
    fetch(weatherApi)
        .then(response => response.json())
        .then(data =>  {
            weatherIcon(data)
            displayWeather(data)
        })
        .catch(error => {
            invalidInput()
        })
} 
/* A function to generate different weather icons according to the output from the API */
function weatherIcon(weather){
      
    const mainweather = weather.weather[0].main;
    const weather_icon = weather.weather[0].icon;
    let icon = "";

    switch(mainweather) {
        case "Rain": if(weather_icon === "09d") { icon += "weather_icons/rainy-7.svg"}
                    else { icon +=  "weather_icons/rainy-1.svg"};
                    break;
        case "Thunderstorm": icon +=  "weather_icons/thunder.svg";
                    break;
        case "Drizzle": icon +=  "weather_icons/rainy-4.svg";
                    break;
        case "Snow": icon +=  "weather_icons/snowy-6.svg";
                    break;
        case "Haze": icon +=  "weather_icons/haze.png";
                    break;
        case "Clear": if(weather_icon === "01d") {icon +=  "weather_icons/day.svg"}
                    else { icon +=  "weather_icons/night.svg"};
                    break;
        case "Clouds": if(weather_icon === "02d" || "04d") { icon += "weather_icons/cloudy-day-3.svg"}
                    else if( weather_icon === "02n" || "04n"){ icon +=  "weather_icons/cloudy-night-3.svg"}
                    else { icon +=  "weather_icons/cloudy.svg" };
                    break; 
        default: icon +=  "weather_icons/mist.svg";
                    break;
    }
    return icon;
}  

/* Displays weather information */
function displayWeather(weather){

    document.querySelector(".output").innerHTML =   `<div class="weather_results">                                             
                                                        <h2 class="city">${weather.name}, ${weather.sys.country}</h2>
                                                        <div class="temp">${Math.round(weather.main.temp)}°C</div>
                                                        <div class="weather_details">
                                                            <span class="weather_description">${weather.weather[0].description}</span>
                                                            <img class="weather_icon" src= ${weatherIcon(weather)}>
                                                        </div>
                                                    </div>
                                                    <hr>
                                                    <div class="other">
                                                        <p>Winds at ${weather.wind.speed} m/s</p>
                                                        <p>Humidity levels at ${weather.main.humidity}%</p>
                                                    </div>`;

    document.querySelector(".forecast_search").style.display = "block";
    document.querySelector(".forecast_output").innerHTML = "";
}

                    /*  FORECAST API   */

/* Fetches forecast information from API */
function getForecast(){
    const searchItem = document.querySelector(".search").value;
    const forecastApi = `http://api.openweathermap.org/data/2.5/forecast?q=${searchItem}&APPID=${apiKey}&units=${units}`;

    fetch(forecastApi)
        .then(response => response.json())
        .then(data =>  {
            displayForecast(data)
        })
        .catch(error => {
            invalidInput()
        })
}

/* Displays forecast information */
function displayForecast(forecast){
    const days =  (forecast.list).filter(days => days.dt_txt.includes("12:00:00"))
    document.querySelector(".forecast_output").innerHTML = days.map(day =>  
                                                                        `<div class="forecast_results">
                                                                            <p class="forecast_day">${(day.dt_txt).slice(8,10)}th</p>
                                                                            <p class="forecast_temp">${Math.round(day.main.temp)}°C</p>
                                                                            <img class="icon" src= ${weatherIcon(day)}>
                                                                        </div>`).join(""); 

    document.querySelector(".forecast_search").style.display = "none";
}

/* When the user input is not found/valid */
function invalidInput(){
    document.querySelector(".output").innerHTML = `<p class="alert"> Sorry! City is not found.`
    document.querySelector(".forecast_search").style.display = "none";
    document.querySelector(".forecast_output").innerHTML = "";

}

/* Event Listener for Enter key up */      
document.querySelector(".search").addEventListener("keyup", searchWeather);

/* Event listener for 5 days forecast */
document.querySelector(".forecast_search").addEventListener("click", getForecast);
 