
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("🎮 Bem-vindo ao GameWorld!");
});

// PESQUISAR JOGOS
function pesquisarJogos() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const jogos = document.querySelectorAll(".card");

    jogos.forEach(function(jogo) {
        const nome = jogo.querySelector("h3")
            .textContent.toLowerCase();

        if (nome.includes(pesquisa)) {
            jogo.style.display = "block";
        } else {
            jogo.style.display = "none";
        }
    });
}

// MOSTRAR DETALHES DO JOGO
function verJogo(nome) {
    alert("🎮 Você escolheu: " + nome);
}

// BOTÃO DE VOLTAR AO TOPO
function voltarTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ANO AUTOMÁTICO NO RODAPÉ
document.getElementById("ano").textContent =
    new Date().getFullYear();
