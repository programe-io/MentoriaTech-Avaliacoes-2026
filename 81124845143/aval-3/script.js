const questoes = [
    {
        pergunta: "Quem pintou a Mona Lisa?",
        alternativas: [
            "Pablo Picasso",
            "Leonardo da Vinci",
            "Tarsila do Amaral",
            "Vincent van Gogh"
        ],
        correta: 1
    },
    {
        pergunta: "Quais são as cores primárias no modelo tradicional de pintura?",
        alternativas: [
            "Verde, roxo e laranja",
            "Preto, branco e cinza",
            "Vermelho, amarelo e azul",
            "Rosa, marrom e verde"
        ],
        correta: 2
    },
    {
        pergunta: "Qual artista brasileira pintou a obra Abaporu?",
        alternativas: [
            "Tarsila do Amaral",
            "Anita Malfatti",
            "Lygia Clark",
            "Djanira"
        ],
        correta: 0
    },
    {
        pergunta: "Qual linguagem artística utiliza atores e personagens?",
        alternativas: [
            "Pintura",
            "Escultura",
            "Fotografia",
            "Teatro"
        ],
        correta: 3
    },
    {
        pergunta: "O que é dança?",
        alternativas: [
            "Uma técnica de escrever textos",
            "Uma expressão artística por meio de movimentos corporais",
            "Uma forma de esculpir madeira",
            "Uma técnica de misturar tintas"
        ],
        correta: 1
    }
];

let indice = 0;
let pontos = 0;
let respondida = false;

const pergunta = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");
const numeroQuestao = document.getElementById("numeroQuestao");
const feedback = document.getElementById("feedback");
const pontuacao = document.getElementById("pontos");
const proximo = document.getElementById("proximo");
const reiniciar = document.getElementById("reiniciar");

function mostrarQuestao() {
    respondida = false;

    const atual = questoes[indice];

    numeroQuestao.textContent =
        `Questão ${indice + 1} de ${questoes.length}`;

    pergunta.textContent = atual.pergunta;
    alternativas.replaceChildren();
    feedback.textContent = "";
    proximo.hidden = true;

    atual.alternativas.forEach((opcao, i) => {
        const botao = document.createElement("button");

        botao.textContent = opcao;
        botao.type = "button";

        botao.addEventListener("click", () => verificarResposta(i));

        alternativas.appendChild(botao);
    });

    pontuacao.textContent = `Pontuação: ${pontos}`;
}

function verificarResposta(escolha) {
    if (respondida) return;

    respondida = true;

    const correta = questoes[indice].correta;
    const botoes = alternativas.querySelectorAll("button");

    botoes.forEach((botao, i) => {
        botao.disabled = true;

        if (i === correta) {
            botao.style.background = "#c8f7d2";
            botao.style.borderColor = "#249447";
        }

        if (i === escolha && escolha !== correta) {
            botao.style.background = "#ffd6d6";
            botao.style.borderColor = "#d33";
        }
    });

    if (escolha === correta) {
        pontos++;
        feedback.textContent = "🎉 Parabéns! Você acertou!";
        feedback.style.color = "#16803c";
    } else {
        feedback.textContent =
            `😊 Quase! A resposta correta é: ${questoes[indice].alternativas[correta]}.`;
        feedback.style.color = "#b42332";
    }

    pontuacao.textContent =
        `Pontuação: ${pontos} de ${questoes.length}`;

    if (indice < questoes.length - 1) {
        proximo.hidden = false;
    } else {
        feedback.textContent +=
            ` Resultado final: ${pontos} de ${questoes.length} pontos!`;
        reiniciar.hidden = false;
        numeroQuestao.textContent = "Quiz concluído!";
    }
}

proximo.addEventListener("click", () => {
    if (indice < questoes.length - 1) {
        indice++;
        mostrarQuestao();
    }
});

reiniciar.addEventListener("click", () => {
    indice = 0;
    pontos = 0;
    reiniciar.hidden = true;
    mostrarQuestao();
});

mostrarQuestao();
