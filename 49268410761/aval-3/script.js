const selecoes = [
    "🇧🇷 Brasil",
    "🇦🇷 Argentina",
    "🇫🇷 França",
    "🇩🇪 Alemanha",
    "🇪🇸 Espanha",
    "🇵🇹 Portugal"
];

let indice = 0;

function mostrarSelecao() {
    const titulo = document.querySelector("h1");

    if (titulo) {
        titulo.textContent = selecoes[indice];
    }

    indice++;

    if (indice >= selecoes.length) {
        indice = 0;
    }
}

function mensagemCopa() {
    alert("⚽ Viva a Copa do Mundo! Que vença o melhor!");
}

function iniciarCopa() {
    console.log("🏆 Bem-vindo à página da Copa do Mundo!");

    const botao = document.querySelector(".botao");

    if (botao) {
        botao.addEventListener("click", function(event) {
            event.preventDefault();
            mensagemCopa();
        });
    }
}

// Inicia o JavaScript quando a página carregar
document.addEventListener("DOMContentLoaded", iniciarCopa);
