
function boasVindas() {
    alert("🎮 Bem-vindo ao blog NextPlay!");
}

function pesquisarJogos() {
    const texto = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {
        const nome = card.querySelector("h3")
            .textContent.toLowerCase();

        card.style.display = nome.includes(texto)
            ? "block"
            : "none";
    });
}

function curtirJogo(botao) {
    botao.textContent = "❤️ Curtido!";
    botao.disabled = true;
}
