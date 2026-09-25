```javascript
const perguntas = document.querySelectorAll(".pergunta");

const barra = document.getElementById("barra");

const contador = document.getElementById("contador");

const porcentagem =
    document.getElementById("porcentagem");

const btnProximo =
    document.getElementById("proximo");

const btnVoltar =
    document.getElementById("voltar");

const quiz =
    document.getElementById("quiz");

const final =
    document.getElementById("final");

const reiniciar =
    document.getElementById("reiniciar");

let perguntaAtual = 0;


/* =========================
   SELEÇÃO DAS OPÇÕES
========================= */

document.querySelectorAll(".opcao").forEach(opcao => {

    opcao.addEventListener("click", () => {

        const grupo =
            opcao.parentElement;

        grupo
            .querySelectorAll(".opcao")
            .forEach(item => {

                item.classList.remove(
                    "selecionada"
                );

            });

        opcao.classList.add(
            "selecionada"
        );

    });

});


/* =========================
   ATUALIZAR TELA
========================= */

function atualizarTela() {

    perguntas.forEach((pergunta, index) => {

        pergunta.classList.toggle(
            "ativa",
            index === perguntaAtual
        );

    });

    const progresso =
        ((perguntaAtual + 1) /
        perguntas.length) * 100;

    barra.style.width =
        `${progresso}%`;

    contador.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    porcentagem.textContent =
        `${Math.round(progresso)}%`;

    btnVoltar.disabled =
        perguntaAtual === 0;

    if (
        perguntaAtual ===
        perguntas.length - 1
    ) {

        btnProximo.textContent =
            "Finalizar ✓";

    } else {

        btnProximo.textContent =
            "Próxima →";

    }

}


/* =========================
   VALIDAR PERGUNTA
========================= */

function validarPergunta() {

    const atual =
        perguntas[perguntaAtual];

    // Verifica textarea
    const textarea =
        atual.querySelector("textarea");

    if (
        textarea &&
        textarea.value.trim() === ""
    ) {

        textarea.focus();

        alert(
            "Digite uma resposta antes de continuar."
        );

        return false;

    }

    // Verifica opção
    const opcoes =
        atual.querySelectorAll(".opcao");

    if (
        opcoes.length > 0 &&
        !atual.querySelector(
            ".opcao.selecionada"
        )
    ) {

        alert(
            "Selecione uma opção antes de continuar."
        );

        return false;

    }

    return true;

}


/* =========================
   PRÓXIMA PERGUNTA
========================= */

btnProximo.addEventListener(
    "click",
    () => {

        if (!validarPergunta()) {
            return;
        }

        if (
            perguntaAtual <
            perguntas.length - 1
        ) {

            perguntaAtual++;

            atualizarTela();

        } else {

            finalizar();

        }

    }
);


/* =========================
   VOLTAR
========================= */

btnVoltar.addEventListener(
    "click",
    () => {

        if (perguntaAtual > 0) {

            perguntaAtual--;

            atualizarTela();

        }

    }
);


/* =========================
   FINALIZAR
========================= */

function finalizar() {

    quiz.style.display =
        "none";

    document.querySelector(
        "header"
    ).style.display = "none";

    document.querySelector(
        ".progresso-container"
    ).style.display = "none";

    final.classList.add(
        "ativo"
    );

}


/* =========================
   REINICIAR
========================= */

reiniciar.addEventListener(
    "click",
    () => {

        perguntaAtual = 0;

        quiz.reset();

        document
            .querySelectorAll(".opcao")
            .forEach(opcao => {

                opcao.classList.remove(
                    "selecionada"
                );

            });

        quiz.style.display =
            "block";

        document.querySelector(
            "header"
        ).style.display = "block";

        document.querySelector(
            ".progresso-container"
        ).style.display = "block";

        final.classList.remove(
            "ativo"
        );

        atualizarTela();

    }
);


/* =========================
   INICIAR
========================= */

atualizarTela();
```
