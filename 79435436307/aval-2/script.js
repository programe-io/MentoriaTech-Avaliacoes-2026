
const botao = document.getElementById("botaoJogar");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function () {
    mensagem.textContent =
        "Prepare-se, agente! A batalha está esperando por você.";

    botao.textContent = "BORA JOGAR!";
});

// Efeito no título da página
document.title = "VALORANT | Página Gamer";
