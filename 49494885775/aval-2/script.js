
const perguntas = [
    {
        pergunta: "Qual linguagem estrutura páginas web?",
        opcoes: ["Python", "HTML", "Java"],
        correta: 1
    },
    {
        pergunta: "Qual linguagem adiciona interatividade às páginas?",
        opcoes: ["JavaScript", "CSS", "SQL"],
        correta: 0
    },
    {
        pergunta: "Qual comando mostra mensagens no console?",
        opcoes: ["print()", "echo()", "console.log()"],
        correta: 2
    },
    {
        pergunta: "Qual linguagem estiliza páginas web?",
        opcoes: ["CSS", "HTML", "C++"],
        correta: 0
    },
    {
        pergunta: "Qual estrutura repete comandos?",
        opcoes: ["if", "for", "const"],
        correta: 1
    }
];

let indice = 0;
let pontos = 0;
let respondendo = false;

function mostrarPergunta() {
    respondendo = false;

    document.getElementById("resultado").textContent = "";
    document.getElementById("progresso").textContent =
        `Pergunta ${indice + 1} de ${perguntas.length}`;

    document.getElementById("pergunta").textContent =
        perguntas[indice].pergunta;

    const opcoes = document.getElementById("opcoes");
    opcoes.replaceChildren();

    perguntas[indice].opcoes.forEach((opcao, i) => {
        const botao = document.createElement("button");
        botao.textContent = opcao;

        botao.onclick = () => verificarResposta(i);
        opcoes.appendChild(botao);
    });
}

function verificarResposta(escolha) {
    if (respondendo) return;
    respondendo = true;

    const correta = perguntas[indice].correta;
    const resultado = document.getElementById("resultado");

    if (escolha === correta) {
        pontos += 10;
        resultado.textContent = "✅ Correto! Você ganhou 10 pontos!";
    } else {
        resultado.textContent =
            "❌ Errado! Resposta certa: " +
            perguntas[indice].opcoes[correta];
    }

    document.getElementById("pontuacao").textContent =
        `Pontos: ${pontos}`;

    const botao = document.createElement("button");

    botao.textContent =
        indice < perguntas.length - 1
            ? "Próxima pergunta"
            : "Ver resultado";

    botao.onclick = proximaPergunta;
    document.getElementById("opcoes").replaceChildren(botao);
}

function proximaPergunta() {
    indice++;

    if (indice < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    document.getElementById("progresso").textContent =
        "Desafio concluído!";

    document.getElementById("pergunta").textContent =
        `Você fez ${pontos} de 50 pontos!`;

    document.getElementById("opcoes").replaceChildren();

    document.getElementById("resultado").textContent =
        pontos === 50
            ? "🏆 Excelente! Você acertou todas!"
            : "👏 Parabéns por completar o desafio!";

    document.getElementById("reiniciar").hidden = false;
}

function reiniciarJogo() {
    indice = 0;
    pontos = 0;

    document.getElementById("pontuacao").textContent = "Pontos: 0";
    document.getElementById("reiniciar").hidden = true;

    mostrarPergunta();
}

mostrarPergunta();
