document.getElementById('fetch-weather').addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or other error: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = ''; // Clear previous weather info

    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'weather-info';
    weatherInfo.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
    weatherContainer.appendChild(weatherInfo);
}
