
let selecionada = null;
let quantidade = 0;

const frutas = {
    0: "🍓",
    1: "🍌",
    2: "🍉",
    3: "🍊"
};

const nomes = {
    0: "Morango",
    1: "Banana",
    2: "Melancia",
    3: "Laranja"
};

const pecas = document.querySelectorAll(".peca");
const espacos = document.querySelectorAll(".espaco");
const mensagem = document.getElementById("mensagem");

// Selecionar uma peça
pecas.forEach(peca => {
    peca.addEventListener("click", () => {

        if (peca.classList.contains("usada")) return;

        pecas.forEach(p => p.classList.remove("selecionada"));

        selecionada = Number(peca.dataset.id);

        peca.classList.add("selecionada");

        mensagem.textContent =
            "Você escolheu " + nomes[selecionada] + "! Escolha onde encaixar.";
    });
});

// Encaixar a peça
espacos.forEach(espaco => {
    espaco.addEventListener("click", () => {

        if (selecionada === null) {
            mensagem.textContent = "Primeiro escolha uma fruta!";
            return;
        }

        if (espaco.classList.contains("ocupado")) {
            mensagem.textContent = "Esse espaço já está ocupado!";
            return;
        }

        const posicao = Number(espaco.dataset.pos);

        if (selecionada === posicao) {

            espaco.textContent = frutas[selecionada];
            espaco.classList.add("ocupado");

            document.querySelector(
                `.peca[data-id="${selecionada}"]`
            ).classList.add("usada");

            quantidade++;

            mensagem.textContent = "Muito bem! Você encaixou " +
                nomes[selecionada] + "! 🎉";

            selecionada = null;

            pecas.forEach(p => p.classList.remove("selecionada"));

            if (quantidade === 4) {
                mensagem.innerHTML =
                    "🎉 PARABÉNS! VOCÊ COMPLETOU O TRUTIFRUTI! 🍓🍉🍌🍊";
            }

        } else {
            mensagem.textContent =
                "Ops! Essa não é a posição correta. Tente novamente! 😊";
        }
    });
});

// Reiniciar
function reiniciarJogo() {

    quantidade = 0;
    selecionada = null;

    espacos.forEach(espaco => {
        espaco.textContent = "?";
        espaco.classList.remove("ocupado");
    });

    pecas.forEach(peca => {
        peca.classList.remove("usada");
        peca.classList.remove("selecionada");
    });

    mensagem.textContent =
        "Clique em uma peça e depois no espaço onde deseja encaixá-la!";
}
