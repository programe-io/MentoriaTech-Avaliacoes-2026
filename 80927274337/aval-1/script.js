
const areaJogo = document.getElementById("area-jogo");
const tituloJogo = document.getElementById("titulo-jogo");
const mensagemJogo = document.getElementById("mensagem-jogo");
const acaoJogo = document.getElementById("acao-jogo");

let pontos = 0;
let desafioIniciado = false;

function abrirJogo(nome) {
    areaJogo.hidden = false;
    tituloJogo.textContent = nome;
    mensagemJogo.textContent =
        "Clique em começar para iniciar o desafio!";
    acaoJogo.textContent = "Começar desafio";

    pontos = 0;
    desafioIniciado = false;

    areaJogo.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function iniciarDesafio() {
    pontos = 0;
    desafioIniciado = true;

    mensagemJogo.textContent =
        "Seus pontos: " + pontos;

    acaoJogo.textContent = "Ganhar 1 ponto";
}

acaoJogo.addEventListener("click", function () {
    if (!desafioIniciado) {
        iniciarDesafio();
        return;
    }

    pontos++;

    mensagemJogo.textContent =
        "Seus pontos: " + pontos;

    if (pontos >= 10) {
        mensagemJogo.textContent =
            "🏆 Parabéns! Você venceu com " +
            pontos + " pontos!";

        desafioIniciado = false;
        acaoJogo.textContent = "Jogar novamente";
    }
});

function fecharJogo() {
    areaJogo.hidden = true;
    desafioIniciado = false;
}
