document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '382d7f816c95929a607837c53b38d222'; 
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('city');
    const weatherInfo = document.getElementById('weather-info');
    const resetButton = document.getElementById('resetButton');
    const morningImage = document.querySelector('.bg-image.left');
    const nightImage = document.querySelector('.bg-image.right');

    const iconMapping = {
        '01d': 'custom-icons/clear-sky-day.png',
        '02d': 'custom-icons/few-clouds-day.png',
        '03d': 'custom-icons/scattered-clouds.png',
        '04d': 'custom-icons/broken-clouds.png',
        '09d': 'custom-icons/shower-rain.png',
        '10d': 'custom-icons/rain-day.png',
        '11d': 'custom-icons/thunderstorm.png',
        '13d': 'custom-icons/snow.png',
        '50d': 'custom-icons/mist.png',
        '01n': 'custom-icons/clear-sky-night.png',
        '02n': 'custom-icons/few-clouds-night.png',
        '03n': 'custom-icons/scattered-clouds-night.png',
        '04n': 'custom-icons/broken-clouds-night.png',
        '09n': 'custom-icons/shower-rain-night.png',
        '10n': 'custom-icons/rain-night.png',
        '11n': 'custom-icons/thunderstorm-night.png',
        '13n': 'custom-icons/snow-night.png',
        '50n': 'custom-icons/mist-night.png'
    };

    searchButton.addEventListener('click', () => {
        const cityName = cityInput.value;
        if (cityName) {
            fetchWeather(cityName);
        } else {
            alert('Please enter a city name.');
        }
    });

    resetButton.addEventListener('click', () => {
        morningImage.style.width = '50%';
        morningImage.style.transform = 'translateX(0)';
        nightImage.style.width = '50%';
        nightImage.style.transform = 'translateX(0)';
        weatherInfo.style.display = 'none';
        weatherInfo.innerHTML = '';
        cityInput.value = '';
    });

    async function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            console.log(response); 
            if (response.ok) {
                const data = await response.json();
                console.log(data); 
                displayWeather(data);
            } else {
                alert('City not found.');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error); 
            alert('Failed to fetch weather data. Please try again later.');
        }
    }

    function displayWeather(data) {
        const { name, main, weather, timezone } = data;
        const temperature = main.temp;
        const humidity = main.humidity;
        const description = weather[0].description;
        const iconCode = weather[0].icon;
        const customIconUrl = iconMapping[iconCode];
        const localTime = new Date(new Date().getTime() + timezone * 1000);
        const hours = localTime.getUTCHours();
        const minutes = localTime.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; 
        const formattedMinutes = minutes.toString().padStart(2, '0');

        weatherInfo.innerHTML = `
            <img src="${customIconUrl}" alt="Weather icon" width="2cm" height="3cm">
            <div class="text">
                <h2>${name}</h2>
                <p>${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Description: ${description}</p>
                <p>Local Time: ${formattedHours}:${formattedMinutes} ${ampm}</p>
            </div>
        `;
        weatherInfo.style.display = 'flex';

        if (hours >= 6 && hours < 18) {
            morningImage.style.width = '100%';
            nightImage.style.width = '0';
        } else {
            morningImage.style.width = '0';
            nightImage.style.width = '100%';
        }
    }
});
