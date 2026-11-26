
// 💗 SISTEMA DE FAVORITOS

function favoritar(grupo) {
    const mensagem = document.getElementById("mensagem");

    mensagem.innerHTML =
        "🎀 Você favoritou " + grupo + "! 💗";

    alert("Você adicionou " + grupo + " aos seus favoritos! ♡");
}

// 🎵 MENSAGEM DE BOAS-VINDAS

window.addEventListener("load", function() {
    console.log("Bem-vinda ao K-Pop World! 💜");
});

// ✨ EFEITO NOS CARDS

const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {
    card.addEventListener("mouseenter", function() {
        card.style.transition = "0.3s";
    });
});

// 💕 BOTÃO DE VOLTAR AO TOPO

function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
