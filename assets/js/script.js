var APIKey = "2f735215f00473540945e4506349df07"

function getCoord(q) {
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + q + "&appid=" + APIKey
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (jsonBody) {
            return {
                lat: jsonBody[0].lat,
                lon: jsonBody[0].lon
            }
        })
}

function getWeather(coords) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coords.lat + "&lon=" + coords.lon + "&appid=" + APIKey + "&units=imperial&exclude=minutely,hourly,alerts"
    return fetch(url)
        .then(function (response) {
            return response.json()
        })
}

function updateDisplay(weather, day) {
    const temp = day === 0 ? weather.temp : weather.temp.day

    const parentElement = document.querySelector('[forecast-day="' + day + '"]')
    const forecastTemp = parentElement.querySelector("[forecast-temp]")
    forecastTemp.innerText = temp
    const forecastWind = parentElement.querySelector("[forecast-wind]")
    forecastWind.innerText = weather.wind_speed
    const forecastHumidity = parentElement.querySelector("[forecast-humidity]")
    forecastHumidity.innerText = weather.humidity
    const forecastUvi = parentElement.querySelector("[forecast-uv-index]")
    forecastUvi.innerText = weather.uvi
}

const locationForm = document.querySelector("#location-form")
locationForm.addEventListener("submit", function(evnt) {
    evnt.preventDefault()
    
    console.log(locationForm.location.value)
    getCoord(locationForm.location.value)
        .then(function (coords) {
            return getWeather(coords)
        })
        .then(function (weather) {
            console.log(weather)
            updateDisplay(weather.current,0)
            for (var i = 1; i < 6 ; i++ ) {
                updateDisplay(weather.daily[i-1], i)
            }
        })
})

