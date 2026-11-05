
// GAMEZONE - JAVASCRIPT

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", () => {
    console.log("Bem-vindo ao GameZone! 🎮");
});

// PESQUISAR JOGOS
function pesquisar() {
    const campo = document.getElementById("search");
    const termo = campo.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const texto = card.innerText.toLowerCase();

        if (texto.includes(termo)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// LER NOTÍCIAS
function ler(texto) {
    alert(texto);
}

// CONTADOR DE CURTIDAS
let curtidas = 0;

function curtir() {
    curtidas++;

    document.getElementById("curtidas").innerText =
        "❤️ " + curtidas + " curtidas";
}

// MOSTRAR DATA ATUAL
function mostrarData() {
    const data = new Date();

    const dataFormatada = data.toLocaleDateString("pt-BR");

    const elemento = document.getElementById("data");

    if (elemento) {
        elemento.innerText = "📅 " + dataFormatada;
    }
}

mostrarData();

// BOTÃO VOLTAR AO TOPO
function voltarTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ANIMAÇÃO DOS CARDS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visivel");
        }
    });
});

document.querySelectorAll(".card").forEach(card => {
    observer.observe(card);
});
