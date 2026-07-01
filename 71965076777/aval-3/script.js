// Mensagem de boas-vindas
function mostrarMensagem() {
    alert("👕 Bem-vindo(a) à Fashion Style!\nConfira nossa nova coleção de roupas.");
}

// Exibe a data e hora da última visita ao carregar a página
window.onload = function () {
    const data = new Date();

    const opcoes = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    };

    const elemento = document.getElementById("dataHora");

    if (elemento) {
        elemento.innerHTML = "Última atualização: " + data.toLocaleString("pt-BR", opcoes);
    }
};

// Destaca os cartões quando o mouse passa sobre eles
const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {
    card.addEventListener("mouseenter", function() {
        card.style.transform = "scale(1.05)";
    });

    card.addEventListener("mouseleave", function() {
        card.style.transform = "scale(1)";
    });
});