// ==========================================
// SKYCAST
// Painel de previsão do tempo
// ==========================================


// ==========================================
// ELEMENTOS
// ==========================================

const cityInput =
    document.getElementById("cityInput");

const searchButton =
    document.getElementById("searchButton");

const searchMessage =
    document.getElementById("searchMessage");

const cityName =
    document.getElementById("cityName");

const updatedAt =
    document.getElementById("updatedAt");

const temperature =
    document.getElementById("temperature");

const feelsLike =
    document.getElementById("feelsLike");

const weatherIcon =
    document.getElementById("weatherIcon");

const humidity =
    document.getElementById("humidity");

const wind =
    document.getElementById("wind");

const visibility =
    document.getElementById("visibility");

const pressure =
    document.getElementById("pressure");

const hourlyList =
    document.getElementById("hourlyList");

const forecastList =
    document.getElementById("forecastList");

const themeButton =
    document.getElementById("themeButton");

const unitButtons =
    document.querySelectorAll(".unit-button");


// ==========================================
// DADOS SIMULADOS
// ==========================================

const cities = {

    teresina: {
        name: "Teresina, PI",
        temperature: 31,
        feels: 34,
        condition: "Ensolarado",
        icon: "☀️",
        humidity: 62,
        wind: 14,
        visibility: 10,
        pressure: 1012
    },

    saoPaulo: {
        name: "São Paulo, SP",
        temperature: 22,
        feels: 22,
        condition: "Parcialmente nublado",
        icon: "⛅",
        humidity: 71,
        wind: 12,
        visibility: 8,
        pressure: 1015
    },

    rio: {
        name: "Rio de Janeiro, RJ",
        temperature: 28,
        feels: 30,
        condition: "Ensolarado",
        icon: "☀️",
        humidity: 68,
        wind: 16,
        visibility: 11,
        pressure: 1013
    },

    brasilia: {
        name: "Brasília, DF",
        temperature: 25,
        feels: 25,
        condition: "Nublado",
        icon: "☁️",
        humidity: 59,
        wind: 10,
        visibility: 12,
        pressure: 1017
    },

    fortaleza: {
        name: "Fortaleza, CE",
        temperature: 29,
        feels: 32,
        condition: "Parcialmente nublado",
        icon: "⛅",
        humidity: 73,
        wind: 20,
        visibility: 10,
        pressure: 1011
    }

};


// ==========================================
// ESTADO
// ==========================================

let currentCity =
    cities.teresina;

let currentUnit = "c";


// ==========================================
// CONVERSÃO
// ==========================================

function celsiusToFahrenheit(value) {

    return Math.round(
        (value * 9 / 5) + 32
    );
}


function convertTemperature(value) {

    if (currentUnit === "f") {

        return celsiusToFahrenheit(value);

    }

    return value;
}


// ==========================================
// ATUALIZAR CLIMA
// ==========================================

function updateWeather() {

    const data =
        currentCity;


    cityName.textContent =
        data.name;


    temperature.textContent =
        convertTemperature(
            data.temperature
        );


    feelsLike.textContent =
        `${convertTemperature(
            data.feels
        )}°`;


    weatherIcon.textContent =
        data.icon;


    document.querySelector(
        ".weather-description"
    ).textContent =
        data.condition;


    humidity.textContent =
        `${data.humidity}%`;


    wind.textContent =
        `${data.wind} km/h`;


    visibility.textContent =
        `${data.visibility} km`;


    pressure.textContent =
        `${data.pressure} hPa`;


    updatedAt.textContent =
        `Atualizado às ${getCurrentTime()}`;


    renderHourly();

    renderForecast();

}


// ==========================================
// HORÁRIO ATUAL
// ==========================================

function getCurrentTime() {

    const now =
        new Date();

    return now.toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


// ==========================================
// PREVISÃO POR HORA
// ==========================================

function renderHourly() {

    hourlyList.innerHTML = "";


    const baseTemperature =
        currentCity.temperature;


    const icons = [
        "☀️",
        "☀️",
        "⛅",
        "⛅",
        "☁️",
        "🌧️",
        "🌧️",
        "☁️"
    ];


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const hour =
            new Date();

        hour.setHours(
            hour.getHours() + i
        );


        const item =
            document.createElement("div");


        item.className =
            "hour";


        if (i === 0) {
            item.classList.add("current");
        }


        const variation =
            Math.round(
                Math.sin(i) * 2
            );


        const temp =
            baseTemperature +
            variation;


        item.innerHTML = `

            <span class="hour-time">
                ${
                    i === 0
                        ? "Agora"
                        : formatHour(hour)
                }
            </span>

            <span class="hour-icon">
                ${icons[i]}
            </span>

            <strong class="hour-temp">
                ${convertTemperature(temp)}°
            </strong>

        `;


        hourlyList.appendChild(item);

    }

}


// ==========================================
// FORMATAR HORA
// ==========================================

function formatHour(date) {

    return date.toLocaleTimeString(
        "pt-BR",
        {
            hour: "2-digit"
        }
    ) + "h";

}


// ==========================================
// PREVISÃO DOS DIAS
// ==========================================

function renderForecast() {

    forecastList.innerHTML = "";


    const days = [
        "Hoje",
        "Amanhã",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
        "Domingo"
    ];


    const conditions = [
        {
            icon: "☀️",
            name: "Ensolarado"
        },
        {
            icon: "⛅",
            name: "Parcialmente nublado"
        },
        {
            icon: "☁️",
            name: "Nublado"
        },
        {
            icon: "🌧️",
            name: "Chuva"
        },
        {
            icon: "⛅",
            name: "Parcialmente nublado"
        },
        {
            icon: "☀️",
            name: "Ensolarado"
        },
        {
            icon: "☀️",
            name: "Ensolarado"
        }
    ];


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const date =
            new Date();

        date.setDate(
            date.getDate() + i
        );


        const max =
            currentCity.temperature +
            Math.round(
                Math.sin(i) * 3
            );


        const min =
            max - 5;


        const item =
            document.createElement("div");


        item.className =
            "forecast";


        item.innerHTML = `

            <div>
                <div class="forecast-day">
                    ${days[i]}
                </div>

                <div class="forecast-date">
                    ${formatDate(date)}
                </div>
            </div>


            <div class="forecast-weather">

                <span>
                    ${conditions[i].icon}
                </span>

                <small>
                    ${conditions[i].name}
                </small>

            </div>


            <div class="forecast-temperature">

                <strong>
                    ${convertTemperature(max)}°
                </strong>

                <span>
                    ${convertTemperature(min)}°
                </span>

            </div>


            <div class="forecast-rain">
                ${20 + i * 5}% chuva
            </div>

        `;


        forecastList.appendChild(item);

    }

}


// ==========================================
// FORMATAR DATA
// ==========================================

function formatDate(date) {

    return date.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "short"
        }
    );

}


// ==========================================
// PESQUISA
// ==========================================

searchButton.addEventListener(
    "click",
    searchCity
);


cityInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchCity();

        }

    }
);


function searchCity() {

    const query =
        cityInput.value
            .trim()
            .toLowerCase();


    searchMessage.textContent = "";


    if (!query) {

        searchMessage.textContent =
            "Digite o nome de uma cidade.";

        return;
    }


    const normalized =
        normalizeText(query);


    let found = null;


    Object.values(cities).forEach(
        city => {

            if (
                normalizeText(
                    city.name
                ).includes(normalized)
            ) {

                found = city;

            }

        }
    );


    if (!found) {

        searchMessage.textContent =
            "Cidade não encontrada nos dados demonstrativos.";

        return;
    }


    currentCity =
        found;


    cityInput.value = "";


    updateWeather();

}


// ==========================================
// NORMALIZAÇÃO
// ==========================================

function normalizeText(text) {

    return text
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


// ==========================================
// UNIDADES
// ==========================================

unitButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                unitButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                currentUnit =
                    button.dataset.unit;


                updateWeather();

            }
        );

    }
);


// ==========================================
// MODO ESCURO
// ==========================================

const savedTheme =
    localStorage.getItem(
        "skycast_theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark"
    );

    themeButton.textContent =
        "☀";

}


themeButton.addEventListener(
    "click",
    () => {

        const isDark =
            document.body.classList.toggle(
                "dark"
            );


        localStorage.setItem(
            "skycast_theme",
            isDark
                ? "dark"
                : "light"
        );


        themeButton.textContent =
            isDark
                ? "☀"
                : "☾";

    }
);


// ==========================================
// INICIALIZAÇÃO
// ==========================================

updateWeather();