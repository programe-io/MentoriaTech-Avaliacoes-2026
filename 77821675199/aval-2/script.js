/* =========================
   ARCOS
========================= */

const arcos = {

    Toman: {
        titulo: "Tokyo Manji Gang",
        texto:
            "A Tokyo Manji Gang é uma das organizações centrais " +
            "da história e está ligada a diversos acontecimentos importantes."
    },

    Moebius: {
        titulo: "Moebius",
        texto:
            "O conflito envolvendo a Moebius coloca diferentes " +
            "personagens em situações que mudam o desenvolvimento da história."
    },

    Valhalla: {
        titulo: "Valhalla",
        texto:
            "O arco de Valhalla apresenta conflitos importantes " +
            "e aprofunda a relação entre vários personagens."
    },

    BlackDragon: {
        titulo: "Black Dragon",
        texto:
            "A Black Dragon possui um papel importante nos acontecimentos " +
            "que Takemichi tenta modificar."
    },

    Tenjiku: {
        titulo: "Tenjiku",
        texto:
            "O conflito com Tenjiku reúne diversos personagens " +
            "e representa uma fase importante da história."
    }

};


function mostrarArco(nome) {

    const info = document.getElementById("info-arco");

    const arco = arcos[nome];

    info.innerHTML = `
        <h3>${arco.titulo}</h3>
        <p>${arco.texto}</p>
    `;

}


/* =========================
   CURIOSIDADES
========================= */

const curiosidades = [

    "Tokyo Revengers foi criado por Ken Wakui.",

    "A história combina ação, drama e viagem no tempo.",

    "Takemichi consegue retornar ao passado para tentar mudar acontecimentos.",

    "A Tokyo Manji Gang é conhecida como Toman.",

    "Amizade e lealdade são temas importantes da história.",

    "Mikey é o apelido de Manjiro Sano.",

    "Draken é o apelido de Ken Ryuguji."

];


function novaCuriosidade() {

    const elemento =
        document.getElementById("curiosidade");

    const indice =
        Math.floor(Math.random() * curiosidades.length);

    elemento.textContent =
        curiosidades[indice];

}


/* =========================
   QUIZ
========================= */

function responderQuiz(resposta) {

    const resultado =
        document.getElementById("resultado");

    if (resposta === "b") {

        resultado.textContent =
            "✓ Resposta correta! Mikey é Manjiro Sano.";

        resultado.style.color = "#35d46b";

    } else {

        resultado.textContent =
            "✗ Resposta incorreta. Tente novamente!";

        resultado.style.color = "#e00000";

    }

}