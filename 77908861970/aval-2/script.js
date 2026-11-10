
function mostrar(id) {
    const elemento = document.getElementById(id);

    if (elemento.style.display === "block") {
        elemento.style.display = "none";
    } else {
        elemento.style.display = "block";
    }
}

let pontuacao = 0;
let respondidas = [];

function responder(correto, pergunta) {

    if (respondidas.includes(pergunta)) {
        document.getElementById("resultado").innerText =
        "Você já respondeu essa pergunta! 💜";
        return;
    }

    respondidas.push(pergunta);

    if (correto) {
        pontuacao++;
    }

    if (respondidas.length === 3) {
        document.getElementById("resultado").innerText =
        "Você acertou " + pontuacao +
        " de 3 perguntas! 💜 Parabéns, ARMY!";
    } else {
        document.getElementById("resultado").innerText =
        "Resposta registrada! Continue o quiz 💜";
    }
}
