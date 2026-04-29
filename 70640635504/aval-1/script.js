// Dados da Yasmin
const nome = "Yasmin";
const curso = "Desenvolvimento de Sistemas (DS)";
const ano = "2º ano";
const escola = "Escola Trindade";

// Mensagem de boas-vindas
window.onload = function() {
    const mensagem = `Olá! Meu nome é ${nome}.
Sou estudante do ${ano} de ${curso}
e estudo na ${escola}.`;

    alert(mensagem);
}

// Mostrar informações na página
const card = document.querySelector(".card");

const infoExtra = document.createElement("p");
infoExtra.textContent = `Tenho interesse em programação e estou aprendendo a criar sites!`;

card.appendChild(infoExtra);

// Evento ao clicar no card
card.addEventListener("click", function() {
    card.style.border = "3px solid #6c63ff";
    card.style.transform = "scale(1.05)";
    card.style.transition = "0.3s";
});