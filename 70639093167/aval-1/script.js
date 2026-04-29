// Informações pessoais
const nome = "Maria Eduarda";
const curso = "Desenvolvimento de Sistemas (DS)";
const serie = "2º ano";
const escola = "CETI Francisca Trindade";

// Função para mostrar mensagem
function mostrarMensagem() {
    alert(`Olá! Meu nome é ${nome}.
Sou estudante do ${serie} do curso de ${curso}.
Estudo na escola ${escola}.`);
}

// Função para escrever na página
function mostrarNaTela() {
    const container = document.querySelector(".container");

    const info = document.createElement("p");
    info.innerHTML = `👋 Olá! Eu sou <strong>${nome}</strong>, estudante do ${serie} de ${curso} na escola ${escola}.`;

    container.appendChild(info);
}

// Executa quando a página carregar
window.onload = function() {
    mostrarNaTela();
};

// Evento de clique
document.addEventListener("click", function() {
    console.log("Você clicou na página!");
});