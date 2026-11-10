
const perguntas = [
    {
        pergunta: "1. Qual é a principal função da redação do ENEM?",
        opcoes: [
            "Contar uma história fictícia",
            "Defender um ponto de vista com argumentos",
            "Escrever apenas frases curtas",
            "Fazer uma lista de palavras"
        ],
        correta: 1
    },
    {
        pergunta: "2. Quanto é 20% de 150?",
        opcoes: ["15", "20", "30", "50"],
        correta: 2
    },
    {
        pergunta: "3. Qual disciplina estuda os seres vivos?",
        opcoes: ["Física", "Geografia", "Biologia", "História"],
        correta: 2
    },
    {
        pergunta: "4. Qual destes é um gênero textual?",
        opcoes: ["Crônica", "Multiplicação", "Fotossíntese", "Gravidade"],
        correta: 0
    },
    {
        pergunta: "5. Qual disciplina estuda as sociedades do passado?",
        opcoes: ["Química", "História", "Matemática", "Biologia"],
        correta: 1
    }
];

// CRONÔMETRO DE ESTUDOS
let tempo = 25 * 60;
let intervalo = null;

const visor = document.getElementById("cronometro");
const mensagemTempo = document.getElementById("mensagem-tempo");

function atualizarCronometro() {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;

    visor.textContent =
        String(minutos).padStart(2, "0") + ":" +
        String(segundos).padStart(2, "0");
}

document.getElementById("iniciar").addEventListener("click", () => {
    if (intervalo !== null || tempo <= 0) return;

    mensagemTempo.textContent = "Concentre-se nos seus estudos! 📚";

    intervalo = setInterval(() => {
        tempo--;
        atualizarCronometro();

        if (tempo <= 0) {
            clearInterval(intervalo);
            intervalo = null;
            mensagemTempo.textContent =
                "Parabéns! Seu tempo de estudo terminou. Faça uma pausa!";
        }
    }, 1000);
});

document.getElementById("pausar").addEventListener("click", () => {
    clearInterval(intervalo);
    intervalo = null;
    mensagemTempo.textContent = "Cronômetro pausado.";
});

document.getElementById("reiniciar").addEventListener("click", () => {
    clearInterval(intervalo);
    intervalo = null;
    tempo = 25 * 60;
    atualizarCronometro();
    mensagemTempo.textContent = "Pronto para começar novamente!";
});

atualizarCronometro();


// QUIZ DO ENEM
let indice = 0;
let pontuacao = 0;
let respostaEscolhida = null;
let respostaConfirmada = false;

const perguntaElemento = document.getElementById("pergunta");
const opcoesElemento = document.getElementById("opcoes");
const progressoElemento = document.getElementById("progresso");
const feedbackElemento = document.getElementById("feedback");
const verificarBotao = document.getElementById("verificar");
const proximaBotao = document.getElementById("proxima");
const resultadoFinal = document.getElementById("resultado-final");
const jogarNovamente = document.getElementById("jogar-novamente");

function mostrarPergunta() {
    const atual = perguntas[indice];

    perguntaElemento.textContent = atual.pergunta;
    progressoElemento.textContent =
        `Pergunta ${indice + 1} de ${perguntas.length}`;

    opcoesElemento.innerHTML = "";
    feedbackElemento.textContent = "";
    resultadoFinal.textContent = "";

    respostaEscolhida = null;
    respostaConfirmada = false;

    verificarBotao.hidden = false;
    proximaBotao.hidden = true;
    jogarNovamente.hidden = true;

    atual.opcoes.forEach((opcao, numero) => {
        const botao = document.createElement("button");

        botao.className = "opcao";
        botao.textContent = opcao;
        botao.type = "button";

        botao.addEventListener("click", () => {
            if (respostaConfirmada) return;

            respostaEscolhida = numero;

            document.querySelectorAll(".opcao").forEach(item => {
                item.classList.remove("selecionada");
            });

            botao.classList.add("selecionada");
        });

        opcoesElemento.appendChild(botao);
    });
}

verificarBotao.addEventListener("click", () => {
    if (respostaEscolhida === null) {
        feedbackElemento.textContent =
            "Escolha uma alternativa antes de continuar.";
        return;
    }

    if (respostaConfirmada) return;

    respostaConfirmada = true;

    const atual = perguntas[indice];
    const botoes = document.querySelectorAll(".opcao");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (respostaEscolhida === atual.correta) {
        pontuacao++;
        feedbackElemento.textContent = "✅ Resposta correta! Muito bem!";
    } else {
        feedbackElemento.textContent =
            "❌ Não foi dessa vez! A resposta correta é: " +
            atual.opcoes[atual.correta] + ".";
    }

    verificarBotao.hidden = true;

    if (indice < perguntas.length - 1) {
        proximaBotao.hidden = false;
    } else {
        mostrarResultado();
    }
});

proximaBotao.addEventListener("click", () => {
    indice++;
    mostrarPergunta();
});

function mostrarResultado() {
    perguntaElemento.textContent = "Quiz concluído! 🎓";
    progressoElemento.textContent = "Você terminou as perguntas.";
    opcoesElemento.innerHTML = "";

    feedbackElemento.textContent = "";

    resultadoFinal.textContent =
        `Você acertou ${pontuacao} de ${perguntas.length} questões!`;

    if (pontuacao === perguntas.length) {
        resultadoFinal.textContent += " Excelente desempenho!";
    } else if (pontuacao >= 3) {
        resultadoFinal.textContent += " Continue praticando!";
    } else {
        resultadoFinal.textContent += " Revise os conteúdos e tente novamente!";
    }

    verificarBotao.hidden = true;
    proximaBotao.hidden = true;
    jogarNovamente.hidden = false;
}

jogarNovamente.addEventListener("click", () => {
    indice = 0;
    pontuacao = 0;
    mostrarPergunta();
});

mostrarPergunta();
