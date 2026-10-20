
const botaoJogar = document.getElementById("botaoJogar");
const mensagem = document.getElementById("mensagem");

const botoesPersonagem = document.querySelectorAll(
    ".btn-personagem"
);

// Botão principal
botaoJogar.addEventListener("click", function() {
    mensagem.textContent =
        "🔥 Prepare-se para a batalha! Escolha seu personagem abaixo.";

    document.getElementById("personagens").scrollIntoView({
        behavior: "smooth"
    });
});

// Seleção de personagens
botoesPersonagem.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const personagem = botao.dataset.personagem;

        botoesPersonagem.forEach(function(outroBotao) {
            outroBotao.textContent = "Selecionar";
        });

        botao.textContent = "Selecionado ✓";

        mensagem.textContent =
            "⚔️ Você selecionou " + personagem +
            "! Boa sorte na batalha.";
    });
});
