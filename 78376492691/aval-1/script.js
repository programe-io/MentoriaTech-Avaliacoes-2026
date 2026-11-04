// IR PARA A SEÇÃO DE JOGOS
function irParaJogos() {
    document.getElementById("jogos").scrollIntoView({
        behavior: "smooth"
    });
}

// MOSTRAR DETALHES DO JOGO
function verJogo(nome) {
    alert("🎮 Você selecionou: " + nome);
}

// PESQUISAR JOGOS
function pesquisarJogos() {
    let pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {
        let nome = card.dataset.nome.toLowerCase();

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