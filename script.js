const currentLocation = document.querySelector('.location')
currentLocation.textContent = "New York"

//current data DOM elements
const lastUpdate = document.querySelector('.lastUpdate');
const currentIcon = document.querySelector('.currentIcon');
const currentText = document.querySelector('.currentText');
const currentHumiditiy = document.querySelector('.currentHumidity');
const currentTemp = document.querySelector('.currentTemp');
const currentFeels = document.querySelector('.currentFeels');

//forecast data

//today

//tomorrow

//third day

async function weatherData(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9e97e3eef3a742f485f164452231307&q=${location}&days=3&aqi=yes&alerts=no`, {mode: 'cors'});
    let weather = await response.json();
    let forecast = forecastData(weather);
    let current = currentData(weather);
    populateDOM(current, forecast);
}

function forecastData(data) {
    console.log(data)
    let forecast = {
        today: {
            date: data.forecast.forecastday[0].date,
            condition: data.forecast.forecastday[0].day.condition,
            rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
            humidity: data.forecast.forecastday[0].day.avghumidity,
            maxtemp: data.forecast.forecastday[0].day.maxtemp_f,
            mintemp: data.forecast.forecastday[0].day.mintemp_f
        },
        tomorrow: {
            date: data.forecast.forecastday[1].date,
            condition: data.forecast.forecastday[1].day.condition,
            rain: data.forecast.forecastday[1].day.daily_chance_of_rain,
            humidity: data.forecast.forecastday[1].day.avghumidity,
            maxtemp: data.forecast.forecastday[1].day.maxtemp_f,
            mintemp: data.forecast.forecastday[1].day.mintemp_f
        },
        third: {
            date: data.forecast.forecastday[2].date,
            condition: data.forecast.forecastday[2].day.condition,
            rain: data.forecast.forecastday[2].day.daily_chance_of_rain,
            humidity: data.forecast.forecastday[2].day.avghumidity,
            maxtemp: data.forecast.forecastday[2].day.maxtemp_f,
            mintemp: data.forecast.forecastday[2].day.mintemp_f
        }
    }
    return forecast
}

function currentData(data) {
    let current = {
        condition: data.current.condition,
        lastUpdate: data.current.last_updated,
        temp: data.current.temp_f,
        feelsLike: data.current.feelslike_f,
        humidity: data.current.humidity
    }
    console.log(current)
    return current
}

function populateDOM(current, forecast) {
    lastUpdate.textContent = current.lastUpdate;
    currentIcon.src = current.condition.icon;
    currentText.textContent = current.condition.text;
    currentHumiditiy.textContent = current.humidity;
    currentTemp.textContent = current.temp;
    currentFeels.textContent = current.feelsLike;

}

weatherData("New York")
let btn = document.querySelector('button');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let location = document.querySelector('input').value;
    weatherData(location);
})
