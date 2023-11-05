const API_KEY = '3920187c07ee1d1397613db28a2ecc29';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?&units=metric`;

const weather = document.querySelector('.weather');
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const errorMsg = document.querySelector('.error');

const checkWeather = async (city) => {
  const response = await fetch(API_URL + `&q=${city}` + `&appid=${API_KEY}`);

  if (response.status === 404) {
    errorMsg.style.display = 'block';
    weather.style.display = 'none';
  } else {
    errorMsg.style.display = 'none';
    const data = await response.json();
    console.log(data);

    weather.style.display = 'block';
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML =
      Math.round(data.main.temp) + '°c';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    const imgObj = {
      Clear: 'clear',
      Clouds: 'clouds',
      Drizzle: 'drizzle',
      Mist: 'mist',
      Rain: 'rain',
      Snow: 'snow',
      Wind: 'wind',
    };

    weather.src = `images/${imgObj[data.weather[0].main]}.png`;
  }

  searchBox.value = '';
};

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});
