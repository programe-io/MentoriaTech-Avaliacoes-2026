
// Quiz de Conhecimentos Gerais

let pontos = 0;

function verificarResposta(resposta) {

    if (resposta === "Brasília") {
        pontos++;
        alert("Parabéns! Resposta correta! 🎉");
    } else {
        alert("Resposta incorreta! Tente novamente.");
    }

    document.getElementById("pontos").innerHTML =
        "Sua pontuação: " + pontos;
}

function novaPergunta() {
    document.getElementById("pergunta").innerHTML =
        "Qual é o maior planeta do Sistema Solar?";

    document.getElementById("respostas").innerHTML = `
        <button onclick="verificarPlaneta('Terra')">Terra</button>
        <button onclick="verificarPlaneta('Júpiter')">Júpiter</button>
        <button onclick="verificarPlaneta('Marte')">Marte</button>
    `;
}

function verificarPlaneta(resposta) {
    if (resposta === "Júpiter") {
        pontos++;
        alert("Muito bem! Você acertou! 🚀");
    } else {
        alert("Que pena! A resposta era Júpiter.");
    }

    document.getElementById("pontos").innerHTML =
        "Sua pontuação: " + pontos;
}
