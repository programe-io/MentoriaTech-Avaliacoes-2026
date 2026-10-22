
const questoes = [
    {
        pergunta: "Quanto é 8 × 7?",
        alternativas: ["54", "56", "64", "48"],
        correta: 1
    },
    {
        pergunta: "Quanto é 144 ÷ 12?",
        alternativas: ["10", "11", "12", "14"],
        correta: 2
    },
    {
        pergunta: "Qual é a raiz quadrada de 81?",
        alternativas: ["7", "8", "9", "10"],
        correta: 2
    },
    {
        pergunta: "Quanto é 25% de 200?",
        alternativas: ["25", "40", "50", "75"],
        correta: 2
    },
    {
        pergunta: "Resolva: 5²",
        alternativas: ["10", "15", "20", "25"],
        correta: 3
    }
];

let indiceAtual = 0;
let pontuacao = 0;
let respondida = false;

const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");
const resultadoEl = document.getElementById("resultado");
const pontuacaoEl = document.getElementById("pontuacao");
const progressoEl = document.getElementById("progresso");
const proximoBtn = document.getElementById("proximo");
const reiniciarBtn = document.getElementById("reiniciar");

// Exibe a questão atual
function mostrarQuestao() {
    respondida = false;

    const questao = questoes[indiceAtual];

    perguntaEl.textContent =
        `${indiceAtual + 1}. ${questao.pergunta}`;

    alternativasEl.innerHTML = "";
    resultadoEl.textContent = "";
    proximoBtn.style.display = "none";

    questao.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.className = "alternativa";
        botao.type = "button";

        botao.addEventListener("click", () => {
            verificarResposta(indice, botao);
        });

        alternativasEl.appendChild(botao);
    });

    atualizarProgresso();
}

// Verifica a resposta escolhida
function verificarResposta(indice, botaoEscolhido) {
    if (respondida) return;

    respondida = true;

    const questao = questoes[indiceAtual];
    const botoes = alternativasEl.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (indice === questao.correta) {
        pontuacao += 10;
        resultadoEl.textContent = "🎉 Resposta correta! Muito bem!";
        resultadoEl.style.color = "#16803c";
        botaoEscolhido.style.background = "#20a464";
    } else {
        resultadoEl.textContent =
            `❌ Resposta incorreta. A correta é ${questao.alternativas[questao.correta]}.`;
        resultadoEl.style.color = "#d62828";

        botaoEscolhido.style.background = "#d62828";
        botoes[questao.correta].style.background = "#20a464";
    }

    pontuacaoEl.textContent = `Pontuação: ${pontuacao}`;
    proximoBtn.style.display = "inline-block";

    if (indiceAtual === questoes.length - 1) {
        proximoBtn.textContent = "Ver resultado";
    } else {
        proximoBtn.textContent = "Próxima questão";
    }
}

// Atualiza a barra de progresso
function atualizarProgresso() {
    const porcentagem =
        (indiceAtual / questoes.length) * 100;

    progressoEl.style.width = `${porcentagem}%`;
}

// Avança para a próxima questão
proximoBtn.addEventListener("click", () => {
    if (!respondida) return;

    indiceAtual++;

    if (indiceAtual < questoes.length) {
        mostrarQuestao();
    } else {
        mostrarResultadoFinal();
    }
});

// Mostra o resultado final
function mostrarResultadoFinal() {
    perguntaEl.textContent = "🏆 Quiz concluído!";
    alternativasEl.innerHTML = "";
    resultadoEl.textContent =
        `Você fez ${pontuacao} de ${questoes.length * 10} pontos!`;

    progressoEl.style.width = "100%";
    proximoBtn.style.display = "none";
    reiniciarBtn.style.display = "inline-block";

    if (pontuacao === questoes.length * 10) {
        resultadoEl.textContent += " Excelente! Você acertou tudo!";
    } else if (pontuacao >= questoes.length * 6) {
        resultadoEl.textContent += " Muito bem! Continue praticando!";
    } else {
        resultadoEl.textContent += " Continue estudando. Você consegue!";
    }
}

// Reinicia o quiz
reiniciarBtn.addEventListener("click", () => {
    indiceAtual = 0;
    pontuacao = 0;

    pontuacaoEl.textContent = "Pontuação: 0";
    reiniciarBtn.style.display = "none";

    proximoBtn.textContent = "Próxima questão";

    mostrarQuestao();
});

// Inicia o quiz
mostrarQuestao();
