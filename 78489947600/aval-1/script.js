
const botaoFavorito = document.getElementById("favorito");
const botaoImprimir = document.getElementById("imprimir");
const mensagem = document.getElementById("mensagem");

let favorita = false;

// Marcar ou desmarcar como favorita
botaoFavorito.addEventListener("click", function () {
    favorita = !favorita;

    if (favorita) {
        botaoFavorito.textContent = "❤️ Receita favorita";
        mensagem.textContent = "Receita adicionada aos favoritos!";
    } else {
        botaoFavorito.textContent = "🤍 Favoritar receita";
        mensagem.textContent = "Receita removida dos favoritos.";
    }
});

// Imprimir a receita
botaoImprimir.addEventListener("click", function () {
    window.print();
});
