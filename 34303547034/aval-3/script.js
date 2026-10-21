
const titulo = document.querySelector("#meu-titulo");
const paragrafo = document.querySelector("#meu-paragrafo");

const botaoAdicionar = document.querySelector("#botaoAdicionar");
const botaoRemover = document.querySelector("#botaoRemover");
const botaoAlternar = document.querySelector("#botaoAlternar");
const botaoEstilo = document.querySelector("#botaoEstilo");
const botaoSituacoes = document.querySelector("#botaoSituacoes");

// Adiciona uma classe CSS ao parágrafo
botaoAdicionar.addEventListener("click", function() {
    paragrafo.classList.add("formatacao");
});

// Remove a classe CSS do parágrafo
botaoRemover.addEventListener("click", function() {
    paragrafo.classList.remove("formatacao");
});

// Alterna a presença da classe CSS
botaoAlternar.addEventListener("click", function() {
    paragrafo.classList.toggle("formatacao");
});

// Modifica diretamente os estilos usando JavaScript
botaoEstilo.addEventListener("click", function() {
    titulo.style.color = "#dc2626";
    titulo.style.backgroundColor = "#fee2e2";
    titulo.style.padding = "15px";
    titulo.style.border = "2px solid #dc2626";
});

// Seleciona todas as células com a classe situacao
botaoSituacoes.addEventListener("click", function() {
    const situacoes = document.getElementsByClassName("situacao");

    // Percorre os elementos e aplica estilos condicionais
    for (const situacao of situacoes) {
        const texto = situacao.textContent.trim();

        if (texto === "Normal") {
            situacao.style.color = "green";
            situacao.style.fontWeight = "bold";
        } else if (texto === "Sobrepeso") {
            situacao.style.color = "red";
            situacao.style.fontWeight = "bold";
        }
    }
});
