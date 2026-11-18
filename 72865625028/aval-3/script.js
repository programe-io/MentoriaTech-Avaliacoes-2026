
async function buscarClima() {
    const cidade = document.getElementById("cidade").value.trim();

    if (!cidade) {
        alert("Digite o nome de uma cidade!");
        return;
    }

    try {
        // Busca as coordenadas da cidade
        const respostaCidade = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`
        );

        const dadosCidade = await respostaCidade.json();

        if (!dadosCidade.results) {
            alert("Cidade não encontrada!");
            return;
        }

        const local = dadosCidade.results[0];

        // Busca os dados meteorológicos
        const respostaClima = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${local.latitude}&longitude=${local.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
        );

        const dados = await respostaClima.json();
        const clima = dados.current;

        document.getElementById("nomeCidade").textContent =
            local.name + ", " + local.country;

        document.getElementById("temperatura").textContent =
            Math.round(clima.temperature_2m) + "°C";

        document.getElementById("umidade").textContent =
            clima.relative_humidity_2m + "%";

        document.getElementById("vento").textContent =
            clima.wind_speed_10m + " km/h";

        const codigo = clima.weather_code;

        const condicoes = {
            0: ["☀️", "Céu limpo"],
            1: ["🌤️", "Predominantemente limpo"],
            2: ["⛅", "Parcialmente nublado"],
            3: ["☁️", "Nublado"],
            45: ["🌫️", "Neblina"],
            48: ["🌫️", "Nevoeiro"],
            51: ["🌦️", "Garoa leve"],
            53: ["🌦️", "Garoa moderada"],
            55: ["🌧️", "Garoa intensa"],
            61: ["🌧️", "Chuva leve"],
            63: ["🌧️", "Chuva moderada"],
            65: ["🌧️", "Chuva forte"],
            71: ["🌨️", "Neve leve"],
            73: ["❄️", "Neve moderada"],
            75: ["❄️", "Neve forte"],
            80: ["🌦️", "Pancadas de chuva"],
            81: ["🌧️", "Chuva intensa"],
            82: ["⛈️", "Chuva muito intensa"],
            95: ["⛈️", "Tempestade"]
        };

        const resultado = condicoes[codigo] || ["🌡️", "Condição variável"];

        document.getElementById("icone").textContent = resultado[0];
        document.getElementById("descricao").textContent = resultado[1];

    } catch (erro) {
        alert("Erro ao consultar o clima. Tente novamente!");
        console.error(erro);
    }
}

// Pesquisar pressionando Enter
document.getElementById("cidade").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        buscarClima();
    }
});
