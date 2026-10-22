
function estudar(materia) {
    const conteudos = {
        "Matemática":
            "Revise as quatro operações, frações, porcentagens e equações. Depois, pratique exercícios para fixar o conteúdo.",

        "Português":
            "Estude interpretação de texto, classes gramaticais, pontuação e ortografia.",

        "História":
            "Revise as datas, os acontecimentos importantes e as causas e consequências dos fatos históricos.",

        "Ciências":
            "Estude o corpo humano, os seres vivos, o meio ambiente e os conceitos científicos vistos em aula."
    };

    alert("📚 Vamos estudar " + materia + "!\n\n" + conteudos[materia]);
}

const perguntas = [
    {
        pergunta: "Quanto é 8 × 7?",
        opcoes: ["54", "56", "64", "48"],
        correta: 1
    },
    {
        pergunta: "Qual palavra é um substantivo?",
        opcoes: ["Correr", "Bonito", "Casa", "Rapidamente"],
        correta: 2
    },
    {
        pergunta: "Qual planeta é conhecido como Planeta Vermelho?",
        opcoes: ["Vênus", "Marte", "Júpiter", "Saturno"],
        correta: 1
    },
    {
        pergunta: "Quantos lados tem um triângulo?",
        opcoes: ["Dois", "Quatro", "Cinco", "Três"],
        correta: 3
    },
    {
        pergunta: "Qual é o maior oceano da Terra?",
        opcoes: [
            "Oceano Atlântico",
            "Oceano Índico",
            "Oceano Pacífico",
            "Oceano Ártico"
        ],
        correta: 2
    }
];

let indice = 0;
let pontos = 0;
let respondida = false;

function mostrarPergunta() {
    respondida = false;

    const perguntaAtual = perguntas[indice];

    document.getElementById("texto-pergunta").textContent =
        perguntaAtual.pergunta;

    document.getElementById("progresso").textContent =
        "Pergunta " + (indice + 1) + " de " + perguntas.length;

    document.getElementById("feedback").textContent = "";
    document.getElementById("proximo").hidden = true;
    document.getElementById("reiniciar").hidden = true;

    const areaOpcoes = document.getElementById("opcoes");
    areaOpcoes.replaceChildren();

    perguntaAtual.opcoes.forEach(function(opcao, i) {
        const botao = document.createElement("button");

        botao.textContent = opcao;
        botao.className = "opcao";
        botao.type = "button";

        botao.addEventListener("click", function() {
            verificarResposta(i);
        });

        areaOpcoes.appendChild(botao);
    });
}

function verificarResposta(escolha) {
    if (respondida) return;

    respondida = true;

    const perguntaAtual = perguntas[indice];
    const botoes = document.querySelectorAll(".opcao");
    const feedback = document.getElementById("feedback");

    botoes.forEach(function(botao, i) {
        botao.disabled = true;

        if (i === perguntaAtual.correta) {
            botao.classList.add("correta");
        }
    });

    if (escolha === perguntaAtual.correta) {
        pontos++;
        feedback.textContent = "✅ Muito bem! Você acertou!";
        feedback.style.color = "#176b32";
    } else {
        botoes[escolha].classList.add("errada");

        feedback.textContent =
            "❌ Não foi dessa vez. A resposta correta é: " +
            perguntaAtual.opcoes[perguntaAtual.correta] + ".";

        feedback.style.color = "#a21c1c";
    }

    if (indice < perguntas.length - 1) {
        document.getElementById("proximo").hidden = false;
    } else {
        finalizarQuiz();
    }
}

function proximaPergunta() {
    if (!respondida || indice >= perguntas.length - 1) return;

    indice++;
    mostrarPergunta();
}

function finalizarQuiz() {
    document.getElementById("texto-pergunta").textContent =
        "🎉 Simulado concluído!";

    document.getElementById("opcoes").replaceChildren();

    document.getElementById("progresso").textContent =
        "Você acertou " + pontos + " de " + perguntas.length + " questões.";

    const percentual = Math.round(pontos / perguntas.length * 100);

    let mensagem;

    if (percentual === 100) {
        mensagem = "Excelente! Você acertou todas as questões!";
    } else if (percentual >= 60) {
        mensagem = "Muito bem! Continue estudando para melhorar ainda mais.";
    } else {
        mensagem = "Continue praticando! Revise os conteúdos e tente novamente.";
    }

    document.getElementById("feedback").textContent = mensagem;
    document.getElementById("proximo").hidden = true;
    document.getElementById("reiniciar").hidden = false;
}

function reiniciarQuiz() {
    indice = 0;
    pontos = 0;
    mostrarPergunta();
}

mostrarPergunta();
