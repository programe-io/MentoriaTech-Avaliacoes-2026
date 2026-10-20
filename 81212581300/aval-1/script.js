
const botoes = document.querySelectorAll(".btn-jogar");
const mensagem = document.getElementById("mensagem");

botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const jogo = botao.dataset.jogo;

        mensagem.textContent =
            "🎮 Você escolheu " + jogo +
            "! Prepare-se para a aventura.";

        // Destaca o botão selecionado
        botoes.forEach(function(outroBotao) {
            outroBotao.textContent = "Ver jogo";
        });

        botao.textContent = "Jogo selecionado ✓";
    });
});
