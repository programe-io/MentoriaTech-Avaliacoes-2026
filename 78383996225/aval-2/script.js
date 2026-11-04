
// MENSAGEM DOS JOGOS
function lerMais(jogo) {
    alert("🎮 Você selecionou " + jogo +
    "! Em breve teremos mais novidades.");
}

// SISTEMA DE PESQUISA
function pesquisarJogo() {
    let pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let nome = card.querySelector("h3")
            .textContent.toLowerCase();

        if (nome.includes(pesquisa)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("🎮 Bem-vindo ao GameZone!");
});

// BOTÃO DE VOLTAR AO TOPO
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ANO AUTOMÁTICO NO RODAPÉ
document.addEventListener("DOMContentLoaded", function() {
    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }
});
