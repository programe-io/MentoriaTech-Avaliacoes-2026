// Mensagem ao abrir o site
window.onload = function () {
    alert("⚽ Bem-vindo ao Futebol Total!");
};

// Mensagem ao clicar em uma notícia
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", function () {
        alert("Você abriu uma notícia sobre futebol!");
    });
});

// Relógio
function atualizarRelogio() {
    const agora = new Date();

    const hora = agora.toLocaleTimeString("pt-BR");

    const relogio = document.getElementById("relogio");

    if (relogio) {
        relogio.innerHTML = "🕒 " + hora;
    }
}

setInterval(atualizarRelogio, 1000);

// Contador de visitantes (simulado)
let visitas = localStorage.getItem("visitas");

if (visitas === null) {
    visitas = 1;
} else {
    visitas = Number(visitas) + 1;
}

localStorage.setItem("visitas", visitas);

window.addEventListener("load", () => {
    const contador = document.getElementById("contador");

    if (contador) {
        contador.innerHTML = `👥 Você já visitou este site ${visitas} vez(es).`;
    }
});