// MOTO POWER - JAVASCRIPT

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao MOTO POWER!");
});

// BOTÕES DE CONTATO WHATSAPP
const botoes = document.querySelectorAll(".btn");

botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        console.log("Cliente interessado em uma moto!");
    });
});

// ANIMAÇÃO DOS CARTÕES
const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {
    card.addEventListener("mouseenter", function() {
        card.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function() {
        card.style.transform = "translateY(0)";
    });
});

// BOTÃO VOLTAR AO TOPO
const voltarTopo = document.createElement("button");

voltarTopo.innerHTML = "⬆ Voltar ao topo";
voltarTopo.id = "voltarTopo";

voltarTopo.style.position = "fixed";
voltarTopo.style.bottom = "20px";
voltarTopo.style.right = "20px";
voltarTopo.style.padding = "12px 18px";
voltarTopo.style.background = "#e60000";
voltarTopo.style.color = "white";
voltarTopo.style.border = "none";
voltarTopo.style.borderRadius = "8px";
voltarTopo.style.cursor = "pointer";
voltarTopo.style.display = "none";

document.body.appendChild(voltarTopo);

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        voltarTopo.style.display = "block";
    } else {
        voltarTopo.style.display = "none";
    }
});

voltarTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ANO AUTOMÁTICO NO RODAPÉ
const ano = new Date().getFullYear();

const rodape = document.querySelector("footer p");

if (rodape) {
    rodape.innerHTML =
        "© " + ano + " MOTO POWER - Todos os direitos reservados.";
}