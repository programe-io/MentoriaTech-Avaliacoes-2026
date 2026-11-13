// BOTÕES DOS PERSONAGENS

const botoes = document.querySelectorAll(".btn-info");

botoes.forEach((botao) => {
    botao.addEventListener("click", () => {

        const card = botao.closest(".card");
        const informacao = card.querySelector(".extra");

        if (informacao.hidden) {
            informacao.hidden = false;
            botao.textContent = "VER MENOS -";
        } else {
            informacao.hidden = true;
            botao.textContent = "CONHECER MAIS +";
        }

    });
});

// ESCOLHA DO UNIVERSO FAVORITO

const botaoVoto = document.getElementById("botaoVoto");
const resultado = document.getElementById("resultado");

botaoVoto.addEventListener("click", () => {

    const escolha = prompt(
        "Qual universo você prefere?\n\n1 - Marvel\n2 - DC Comics"
    );

    if (escolha === "1") {
        resultado.textContent =
            "Você escolheu MARVEL! Que comece a aventura!";
    }

    else if (escolha === "2") {
        resultado.textContent =
            "Você escolheu DC COMICS! Um universo lendário!";
    }

    else if (escolha !== null) {
        resultado.textContent =
            "Opção inválida. Escolha 1 ou 2.";
    }

});

// ANIMAÇÃO DOS PERSONAGENS

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
        }

    });

}, {
    threshold: 0.1
});

document.querySelectorAll(".card, .curiosidade").forEach((elemento) => {
    observador.observe(elemento);
});

