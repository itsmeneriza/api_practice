const searchButton = document.querySelector('.search-button');
const locationInput = document.querySelector('.location-input');
const temperature = document.querySelector('.temp');
const summary = document.querySelector('.summary');
const loc = document.querySelector('.location');
const icon = document.querySelector('.icon');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    const base = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true`; // Example coordinates

    fetch(base)
        .then(response => response.json())
        .then(data => {
            temperature.textContent = `${data.current_weather.temperature}°C`;
            summary.textContent = data.current_weather.weathercode; // Adjust based on actual data structure
            loc.textContent = `Location: Berlin, DE`; // Adjust based on actual data
            icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.current_weather.weathercode}.png" alt="Weather Icon" />`; // Adjust based on actual data
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
});
