const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const result = document.getElementById('result');

async function getWeather(city) {
    result.textContent = 'Загрузка...';
    try {
        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru`
        );
        const geoData = await geoRes.json();

        if (!geoData.results) {
            result.textContent = 'Город не найден';
            return;
        }

        const { latitude, longitude, name } = geoData.results[0];
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
        );
        const weather = await weatherRes.json();

        result.innerHTML = `
            <h2>${name}</h2>
            <p class="temp">${weather.current.temperature_2m}°C</p>
            <p>Ветер: ${weather.current.wind_speed_10m} км/ч</p>
        `;
    } catch (error) {
        result.textContent = 'Ошибка. Проверьте интернет.';
    }
}

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') getWeather(city);
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') searchButton.click();
});
