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
const todayIcon = document.querySelector('.todayIcon');
const todayText = document.querySelector('.todayText');
const todayRain = document.querySelector('.todayRain');
const todayHumidity = document.querySelector('.todayHumidity')
const todayMin = document.querySelector('.todayMin');
const todayMax = document.querySelector('.todayMax');
//tomorrow
const tomorrowIcon = document.querySelector('.tomorrowIcon');
const tomorrowText = document.querySelector('.tomorrowText');
const tomorrowRain = document.querySelector('.tomorrowRain');
const tomorrowHumidity = document.querySelector('.tomorrowHumidity');
const tomorrowMin = document.querySelector('.tomorrowMin');
const tomorrowMax = document.querySelector('.tomorrowMax');
//third day
const thirdIcon = document.querySelector('.thirdIcon');
const thirdText = document.querySelector('.thirdText');
const thirdRain = document.querySelector('.thirdRain');
const thirdHumidity = document.querySelector('.thirdHumidity');
const thirdMin = document.querySelector('.thirdMin');
const thirdMax = document.querySelector('.thirdMax');

async function weatherData(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9e97e3eef3a742f485f164452231307&q=${location}&days=3&aqi=yes&alerts=no`, {mode: 'cors'});
    let weather = await response.json();
    let forecast = forecastData(weather);
    let current = currentData(weather);
    currentLocation.textContent = location;
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

    todayIcon.src = forecast.today.condition.icon;
    todayText.textContent = forecast.today.condition.text;
    todayRain.textContent = forecast.today.rain;
    todayHumidity.textContent = forecast.today.humidity;
    todayMin.textContent = forecast.today.mintemp;
    todayMax.textContent = forecast.today.maxtemp;

    tomorrowIcon.src = forecast.tomorrow.condition.icon;
    tomorrowText.textContent = forecast.tomorrow.condition.text;
    tomorrowRain.textContent = forecast.tomorrow.rain;
    tomorrowHumidity.textContent = forecast.tomorrow.humidity;
    tomorrowMin.textContent = forecast.tomorrow.mintemp;
    tomorrowMax.textContent = forecast.tomorrow.maxtemp;

    thirdIcon.src = forecast.third.condition.icon;
    thirdText.textContent = forecast.third.condition.text;
    thirdRain.textContent = forecast.third.rain;
    thirdHumidity.textContent = forecast.third.humidity;
    thirdMin.textContent = forecast.third.mintemp;
    thirdMax.textContent = forecast.third.maxtemp;

}

weatherData("New York")
let btn = document.querySelector('button');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let location = document.querySelector('input').value;
    weatherData(location);
})
