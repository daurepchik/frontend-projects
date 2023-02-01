import { settings, translations } from "./index.js";

const city = document.querySelector('.city'),
    weatherIcon = document.querySelector('.weather-icon'),
    weatherError = document.querySelector('.weather-error'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    wind = document.querySelector('.wind'),
    humidity = document.querySelector('.humidity');

city.value = translations.getLang.defaultCity;

export const getWeather = async () => {
    city.placeholder = translations.getLang.cityPlaceholder;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${settings.language}&appid=7cc15ab788cbbe2c725a8b10244b8f4c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404" || city.value === '') {
        weatherIcon.className = 'weather-icon owf';
        weatherError.textContent = translations.getLang.weatherError;
        temperature.textContent = '';
        weatherDescription.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
    } else {
        weatherError.textContent = '';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${translations.getLang.wind}: ${Math.round(data.wind.speed)}m/s`;
        humidity.textContent = `${translations.getLang.humidity}: ${data.main.humidity}%`;
    }
}

const setCity = (e) => {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            city.blur();
            getWeather();
        }
    } else {
        localStorage.setItem('city', city.value);
    }
}

function getCity() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    getWeather();
}

city.addEventListener('keypress', setCity);
window.addEventListener('beforeunload', setCity);
document.addEventListener('DOMContentLoaded', getCity);