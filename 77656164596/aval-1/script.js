// Banco de dados simulado para demonstração
const mockWeatherData = {
    "sao paulo": { name: "São Paulo, BR", temp: 24, desc: "Nublado", humidity: "75%", wind: "12 km/h", type: "clouds" },
    "rio de janeiro": { name: "Rio de Janeiro, BR", temp: 32, desc: "Ensolarado", humidity: "50%", wind: "18 km/h", type: "clear" },
    "londres": { name: "Londres, UK", temp: 14, desc: "Chuva Leve", humidity: "90%", wind: "22 km/h", type: "rain" },
    "nova york": { name: "Nova York, US", temp: 19, desc: "Céu Limpo", humidity: "45%", wind: "10 km/h", type: "clear" }
};

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const errorMsg = document.getElementById('error-message');

// Ícones correspondentes
const icons = {
    clear: "fa-sun",
    clouds: "fa-cloud",
    rain: "fa-cloud-showers-heavy"
};

function searchWeather() {
    const cityName = cityInput.value.toLowerCase().trim();
    
    if (cityName === "") return;

    if (mockWeatherData[cityName]) {
        const data = mockWeatherData[cityName];
        
        // Atualiza os textos
        document.getElementById('city-name').innerText = data.name;
        document.getElementById('temperature').innerText = `${data.temp}°C`;
        document.getElementById('weather-description').innerText = data.desc;
        document.getElementById('humidity').innerText = data.humidity;
        document.getElementById('wind-speed').innerText = data.wind;
        
        // Atualiza o ícone do clima
        const iconElement = document.getElementById('weather-icon');
        iconElement.className = `fa-solid ${icons[data.type]}`;

        // Altera o plano de fundo dinamicamente
        document.body.className = `bg-${data.type}`;

        // Mostra o cartão e esconde o erro
        weatherCard.classList.remove('hidden');
        errorMsg.classList.add('hidden');
    } else {
        // Cidade não encontrada no mock
        weatherCard.classList.add('hidden');
        errorMsg.classList.remove('hidden');
        document.body.className = 'bg-default';
    }
}

// Eventos de clique e tecla Enter
searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});