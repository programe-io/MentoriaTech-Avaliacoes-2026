const perguntas = [
    {
        pergunta: "Qual é o nome do personagem que possui a habilidade Drop the Beat?",
        alternativas: ["Alok", "Chrono", "K", "Hayato"],
        correta: 0
    },

    {
        pergunta: "Qual é o objetivo principal do Battle Royale?",
        alternativas: [
            "Encontrar um carro",
            "Ser o último jogador ou equipe sobrevivente",
            "Coletar moedas",
            "Construir uma casa"
        ],
        correta: 1
    },

    {
        pergunta: "Qual item pode criar uma barreira para proteger o jogador?",
        alternativas: [
            "Kit médico",
            "Granada",
            "Parede de Gel",
            "Capacete"
        ],
        correta: 2
    },

    {
        pergunta: "Qual destes é um tipo de arma presente no Free Fire?",
        alternativas: [
            "AR",
            "Martelo mágico",
            "Arco de fogo",
            "Varinha"
        ],
        correta: 0
    },

    {
        pergunta: "O que acontece quando a zona segura diminui?",
        alternativas: [
            "O mapa fica maior",
            "Os jogadores precisam se mover para dentro da área segura",
            "As armas desaparecem",
            "Todos ganham vida"
        ],
        correta: 1
    },

    {
        pergunta: "Qual destes veículos pode ser encontrado no Free Fire?",
        alternativas: [
            "Moto",
            "Avião comercial",
            "Navio de cruzeiro",
            "Submarino"
        ],
        correta: 0
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");
const botaoProxima = document.getElementById("proxima");
const resultadoElemento = document.getElementById("resultado");

function mostrarPergunta() {
    respondeu = false;
    botaoProxima.disabled = true;

    const pergunta = perguntas[perguntaAtual];

    perguntaElemento.textContent =
        `${perguntaAtual + 1}. ${pergunta.pergunta}`;

    alternativasElemento.innerHTML = "";

    pergunta.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.classList.add("alternativa");

        botao.onclick = () => verificarResposta(botao, indice);

        alternativasElemento.appendChild(botao);
    });
}

function verificarResposta(botao, indice) {
    if (respondeu) return;

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll(".alternativa");

    botoes.forEach((b, i) => {
        b.disabled = true;

        if (i === pergunta.correta) {
            b.classList.add("correta");
        }
    });

    if (indice === pergunta.correta) {
        pontuacao++;
    } else {
        botao.classList.add("errada");
    }

    botaoProxima.disabled = false;
}

function proximaPergunta() {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    perguntaElemento.textContent = "🏆 Quiz terminado!";
    alternativasElemento.innerHTML = "";

    botaoProxima.style.display = "none";

    resultadoElemento.textContent =
        `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;

    if (pontuacao === perguntas.length) {
        resultadoElemento.textContent += " 🔥 Mestre do Free Fire!";
    } else if (pontuacao >= 4) {
        resultadoElemento.textContent += " 😎 Mandou muito bem!";
    } else if (pontuacao >= 2) {
        resultadoElemento.textContent += " 👍 Bom trabalho!";
    } else {
        resultadoElemento.textContent += " 🎮 Continue treinando!";
    }
}

mostrarPergunta();