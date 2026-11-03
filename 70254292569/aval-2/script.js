
// Mensagem de boas-vindas
window.addEventListener("load", function() {
    alert("🍽️ Bem-vindo ao site Sabores do Brasil!");
});

// Efeito nos cartões das comidas
const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {

    card.addEventListener("mouseenter", function() {
        card.style.transform = "scale(1.04)";
        card.style.transition = "0.3s";
    });

    card.addEventListener("mouseleave", function() {
        card.style.transform = "scale(1)";
    });

});

// Mensagem ao clicar nas comidas
cards.forEach(function(card) {

    card.addEventListener("click", function() {
        const nome = card.querySelector("h3").textContent;

        alert("😋 Você escolheu conhecer: " + nome);
    });

});

// Botão de voltar ao topo
const voltarTopo = document.createElement("button");

voltarTopo.textContent = "⬆ Voltar ao topo";

voltarTopo.style.background = "#8b351c";
voltarTopo.style.color = "white";
voltarTopo.style.padding = "12px 20px";
voltarTopo.style.border = "none";
voltarTopo.style.borderRadius = "20px";
voltarTopo.style.cursor = "pointer";
voltarTopo.style.display = "block";
voltarTopo.style.margin = "20px auto";

document.body.appendChild(voltarTopo);

voltarTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Mensagem no console
console.log("Site Sabores do Brasil carregado com sucesso!");