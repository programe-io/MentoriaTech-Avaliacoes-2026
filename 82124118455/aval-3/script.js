
const conteudos = {
    operacoes: {
        titulo: "Operações básicas",
        texto: "Adição: 5 + 3 = 8. Subtração: 9 - 4 = 5. " +
            "Multiplicação: 6 × 3 = 18. Divisão: 20 ÷ 4 = 5. " +
            "Dica: pratique cada operação com números diferentes."
    },

    porcentagem: {
        titulo: "Porcentagem",
        texto: "Porcentagem representa uma parte de 100. " +
            "Para calcular 20% de 150, faça 150 × 20 ÷ 100. " +
            "O resultado é 30."
    },

    equacoes: {
        titulo: "Equações",
        texto: "Uma equação tem uma igualdade com um valor desconhecido. " +
            "Exemplo: x + 5 = 12. Subtraindo 5 dos dois lados, " +
            "encontramos x = 7."
    },

    geometria: {
        titulo: "Geometria",
        texto: "A área de um retângulo é calculada multiplicando " +
            "a base pela altura. Exemplo: base 6 cm e altura 4 cm. " +
            "Área = 6 × 4 = 24 cm²."
    }
};

function mostrarConteudo(materia) {
    const conteudo = conteudos[materia];

    document.getElementById("titulo-conteudo").textContent =
        conteudo.titulo;

    document.getElementById("texto-conteudo").textContent =
        conteudo.texto;

    document.getElementById("explicacao").hidden = false;

    document.getElementById("explicacao").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

const questoes = [
    {
        pergunta: "Quanto é 25 + 17?",
        opcoes: ["32", "42", "43", "52"],
        correta: 1,
        explicacao: "25 + 17 = 42."
    },
    {
        pergunta: "Quanto é 9 × 6?",
        opcoes: ["45", "52", "54", "63"],
        correta: 2,
        explicacao: "9 multiplicado por 6 é igual a 54."
    },
    {
        pergunta: "Quanto é 10% de 200?",
        opcoes: ["10", "20", "25", "40"],
        correta: 1,
        explicacao: "200 × 10 ÷ 100 = 20."
    },
    {
        pergunta: "Se x + 8 = 15, qual é o valor de x?",
        opcoes: ["5", "6", "7", "8"],
        correta: 2,
        explicacao: "Subtraindo 8 dos dois lados, x = 15 - 8 = 7."
    },
    {
        pergunta: "Qual é a área de um retângulo de base 5 cm e altura 3 cm?",
        opcoes: ["8 cm²", "15 cm²", "16 cm²", "20 cm²"],
        correta: 1,
        explicacao: "A área é base × altura: 5 × 3 = 15 cm²."
    }
];

let indice = 0;
let pontos = 0;
let respondida = false;

function mostrarQuestao() {
    respondida = false;

    const questao = questoes[indice];

    document.getElementById("numero-questao").textContent =
        "Questão " + (indice + 1) + " de " + questoes.length;

    document.getElementById("pergunta").textContent =
        questao.pergunta;

    document.getElementById("resultado").textContent = "";
    document.getElementById("proximo").hidden = true;
    document.getElementById("reiniciar").hidden = true;

    const alternativas = document.getElementById("alternativas");
    alternativas.replaceChildren();

    questao.opcoes.forEach(function(opcao, i) {
        const botao = document.createElement("button");

        botao.textContent = opcao;
        botao.className = "alternativa";
        botao.type = "button";

        botao.addEventListener("click", function() {
            verificarResposta(i);
        });

        alternativas.appendChild(botao);
    });
}

function verificarResposta(escolha) {
    if (respondida) return;

    respondida = true;

    const questao = questoes[indice];
    const botoes = document.querySelectorAll(".alternativa");
    const resultado = document.getElementById("resultado");

    botoes.forEach(function(botao, i) {
        botao.disabled = true;

        if (i === questao.correta) {
            botao.classList.add("correta");
        }
    });

    if (escolha === questao.correta) {
        pontos++;
        resultado.textContent = "✅ Muito bem! " + questao.explicacao;
        resultado.style.color = "#176b55";
    } else {
        botoes[escolha].classList.add("errada");

        resultado.textContent =
            "❌ Resposta incorreta. " + questao.explicacao;

        resultado.style.color = "#b42323";
    }

    if (indice < questoes.length - 1) {
        document.getElementById("proximo").hidden = false;
    } else {
        finalizarQuiz();
    }
}

function proximaQuestao() {
    if (!respondida || indice >= questoes.length - 1) return;

    indice++;
    mostrarQuestao();
}

function finalizarQuiz() {
    document.getElementById("pergunta").textContent =
        "🎉 Você terminou o simulado!";

    document.getElementById("alternativas").replaceChildren();

    document.getElementById("numero-questao").textContent =
        "Resultado: " + pontos + " de " + questoes.length +
        " acertos (" + Math.round(pontos / questoes.length * 100) + "%).";

    document.getElementById("resultado").textContent =
        pontos === questoes.length
            ? "Excelente! Você acertou todas as questões!"
            : pontos >= 3
                ? "Muito bem! Continue praticando para melhorar."
                : "Continue estudando e tente novamente!";

    document.getElementById("proximo").hidden = true;
    document.getElementById("reiniciar").hidden = false;
}

function reiniciarQuiz() {
    indice = 0;
    pontos = 0;
    mostrarQuestao();
}

mostrarQuestao();
