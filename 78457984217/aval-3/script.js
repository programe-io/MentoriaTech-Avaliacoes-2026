document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const cityInput = document.getElementById("city-input");

    // Banco de dados simulado para alternar os climas
    const weatherData = {
        "sao paulo": { name: "São Paulo, BR", temp: "22°C", cond: "Nublado", icon: "☁️", hum: "80%", wind: "18 km/h" },
        "rio de janeiro": { name: "Rio de Janeiro, BR", temp: "28°C", cond: "Ensolarado", icon: "☀️", hum: "65%", wind: "14 km/h" },
        "curitiba": { name: "Curitiba, BR", temp: "14°C", cond: "Chuvoso", icon: "🌧️", hum: "92%", wind: "22 km/h" }
    };

    searchBtn.addEventListener("click", () => {
        const cityKey = cityInput.value.toLowerCase().trim();

        if (weatherData[cityKey]) {
            const data = weatherData[cityKey];
            document.getElementById("city-name").textContent = data.name;
            document.getElementById("temperature").textContent = data.temp;
            document.getElementById("condition").textContent = data.cond;
            document.getElementById("weather-icon").textContent = data.icon;
            document.getElementById("humidity").textContent = data.hum;
            document.getElementById("wind").textContent = data.wind;
        } else {
            alert("Cidade não encontrada! Experimente testar: 'Sao Paulo' ou 'Curitiba'.");
        }
    });
});
