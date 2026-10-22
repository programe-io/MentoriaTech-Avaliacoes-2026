const questoes = [
    { pergunta: "Quanto é 7 + 5?", resposta: 12 },
    { pergunta: "Quanto é 15 - 8?", resposta: 7 },
    { pergunta: "Quanto é 6 × 4?", resposta: 24 },
    { pergunta: "Quanto é 36 ÷ 6?", resposta: 6 },
    { pergunta: "Quanto é 9 + 8?", resposta: 17 }
];

let indice = 0;
let pontos = 0;

const pergunta = document.getElementById("pergunta");
const progresso = document.getElementById("progresso");
const formulario = document.getElementById("formulario");
const resposta = document.getElementById("resposta");
const resultado = document.getElementById("resultado");
const pontuacao = document.getElementById("pontuacao");
const reiniciar = document.getElementById("reiniciar");

function mostrarQuestao() {
    pergunta.textContent = questoes[indice].pergunta;
    progresso.textContent =
        `Questão ${indice + 1} de ${questoes.length}`;

    resposta.value = "";
    resposta.disabled = false;
    resultado.textContent = "";
    formulario.hidden = false;
    resposta.focus();
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const valor = Number(resposta.value);

    if (resposta.value.trim() === "") {
        resultado.textContent = "Digite uma resposta!";
        return;
    }

    if (valor === questoes[indice].resposta) {
        pontos++;
        resultado.textContent = "🎉 Muito bem! Resposta correta!";
        resultado.style.color = "#15803d";
    } else {
        resultado.textContent =
            `❌ Não foi dessa vez! A resposta correta é ${questoes[indice].resposta}.`;
        resultado.style.color = "#dc2626";
    }

    pontuacao.textContent =
        `Pontos: ${pontos} de ${questoes.length}`;

    indice++;
    resposta.disabled = true;
    formulario.hidden = true;

    if (indice < questoes.length) {
        const proximo = document.createElement("button");
        proximo.textContent = "Próxima questão";
        proximo.type = "button";
        proximo.id = "proxima";
        formulario.after(proximo);

        proximo.addEventListener("click", function() {
            proximo.remove();
            mostrarQuestao();
        });
    } else {
        pergunta.textContent = "🏆 Você terminou os exercícios!";
        progresso.textContent = "Atividade concluída!";
        resultado.textContent =
            `Você acertou ${pontos} de ${questoes.length} questões!`;
        reiniciar.hidden = false;
    }
});

reiniciar.addEventListener("click", function() {
    indice = 0;
    pontos = 0;
    pontuacao.textContent = "Pontos: 0";
    reiniciar.hidden = true;

    const proxima = document.getElementById("proxima");
    if (proxima) {
        proxima.remove();
    }

    mostrarQuestao();
});

mostrarQuestao();