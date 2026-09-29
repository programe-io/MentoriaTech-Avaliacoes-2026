const perguntas = [

    {
        pergunta: "Qual é o maior planeta do nosso Sistema Solar?",
        respostas: [
            { texto: "🌎 Terra", correta: false },
            { texto: "🪐 Júpiter", correta: true },
            { texto: "🪐 Saturno", correta: false },
            { texto: "🔴 Marte", correta: false }
        ]
    },

    {
        pergunta: "Quanto é 8 × 7?",
        respostas: [
            { texto: "54", correta: false },
            { texto: "56", correta: true },
            { texto: "64", correta: false },
            { texto: "48", correta: false }
        ]
    },

    {
        pergunta: "Qual animal é conhecido como o Rei da Selva?",
        respostas: [
            { texto: "🐯 Tigre", correta: false },
            { texto: "🐘 Elefante", correta: false },
            { texto: "🦁 Leão", correta: true },
            { texto: "🦍 Gorila", correta: false }
        ]
    },

    {
        pergunta: "Qual linguagem é muito utilizada para criar interações em páginas web?",
        respostas: [
            { texto: "JavaScript", correta: true },
            { texto: "Photoshop", correta: false },
            { texto: "Excel", correta: false },
            { texto: "PowerPoint", correta: false }
        ]
    },

    {
        pergunta: "Qual destas opções representa uma estrutura de repetição?",
        respostas: [
            { texto: "if", correta: false },
            { texto: "for", correta: true },
            { texto: "return", correta: false },
            { texto: "const", correta: false }
        ]
    }

];


// ELEMENTOS DA PÁGINA

const elementoPergunta =
    document.getElementById("pergunta");

const caixaOpcoes =
    document.getElementById("caixa-opcoes");

const btnProximo =
    document.getElementById("btn-proximo");

const displayPontos =
    document.getElementById("pontos");

const contador =
    document.getElementById("contador");

const vidas =
    document.getElementById("vidas");

const barraProgresso =
    document.getElementById("barra-progresso");

const feedback =
    document.getElementById("feedback");

const areaQuiz =
    document.getElementById("area-quiz");

const resultado =
    document.getElementById("resultado");

const mensagemFinal =
    document.getElementById("mensagem-final");

const pontuacaoFinal =
    document.getElementById("pontuacao-final");

const btnJogarNovamente =
    document.getElementById("btn-jogar-novamente");


// ESTADO DO JOGO

let indicePerguntaAtual = 0;

let pontos = 0;

let vidasRestantes = 3;


// INICIAR

function iniciarQuiz() {

    indicePerguntaAtual = 0;

    pontos = 0;

    vidasRestantes = 3;

    displayPontos.textContent = pontos;

    resultado.classList.add("escondido");

    areaQuiz.classList.remove("escondido");

    mostrarVidas();

    mostrarPergunta();

}


// MOSTRAR PERGUNTA

function mostrarPergunta() {

    limparEstado();

    const perguntaAtual =
        perguntas[indicePerguntaAtual];


    elementoPergunta.textContent =
        `${indicePerguntaAtual + 1}. ${perguntaAtual.pergunta}`;


    contador.textContent =
        `Pergunta ${indicePerguntaAtual + 1} de ${perguntas.length}`;


    const progresso =
        ((indicePerguntaAtual + 1) / perguntas.length) * 100;


    barraProgresso.style.width =
        `${progresso}%`;


    perguntaAtual.respostas.forEach(
        (resposta) => {

            const botao =
                document.createElement("button");


            botao.textContent =
                resposta.texto;


            botao.classList.add(
                "btn-opcao"
            );


            if (resposta.correta) {

                botao.dataset.correta =
                    "true";

            } else {

                botao.dataset.correta =
                    "false";

            }


            botao.addEventListener(
                "click",
                selecionarResposta
            );


            caixaOpcoes.appendChild(
                botao
            );

        }
    );

}


// LIMPAR ESTADO

function limparEstado() {

    btnProximo.classList.add(
        "escondido"
    );

    feedback.textContent = "";

    feedback.className = "";

    caixaOpcoes.innerHTML = "";

}


// SELECIONAR RESPOSTA

function selecionarResposta(evento) {

    const botaoSelecionado =
        evento.target;

    const correta =
        botaoSelecionado.dataset.correta === "true";


    if (correta) {

        botaoSelecionado.classList.add(
            "correto"
        );

        pontos += 10;

        displayPontos.textContent =
            pontos;

        feedback.textContent =
            "🎉 Muito bem! Você acertou!";

        feedback.classList.add(
            "feedback-correto"
        );

    } else {

        botaoSelecionado.classList.add(
            "errado"
        );

        vidasRestantes--;

        mostrarVidas();

        feedback.textContent =
            "❌ Ops! Essa não era a resposta.";

        feedback.classList.add(
            "feedback-errado"
        );

    }


    // Revela a resposta correta

    Array.from(
        caixaOpcoes.children
    ).forEach((botao) => {

        if (
            botao.dataset.correta === "true"
        ) {

            botao.classList.add(
                "correto"
            );

        }

        botao.disabled = true;

    });


    btnProximo.classList.remove(
        "escondido"
    );

}


// MOSTRAR VIDAS

function mostrarVidas() {

    let texto = "";

    for (
        let i = 0;
        i < 3;
        i++
    ) {

        if (i < vidasRestantes) {

            texto += "❤️ ";

        } else {

            texto += "🖤 ";

        }

    }

    vidas.textContent =
        texto.trim();

}


// PRÓXIMA PERGUNTA

btnProximo.addEventListener(
    "click",
    () => {

        indicePerguntaAtual++;


        if (
            indicePerguntaAtual <
            perguntas.length
        ) {

            mostrarPergunta();

        } else {

            mostrarResultado();

        }

    }
);


// RESULTADO

function mostrarResultado() {

    areaQuiz.classList.add(
        "escondido"
    );

    btnProximo.classList.add(
        "escondido"
    );

    resultado.classList.remove(
        "escondido"
    );


    pontuacaoFinal.textContent =
        `${pontos} pontos`;


    if (pontos === perguntas.length * 10) {

        mensagemFinal.textContent =
            "🏆 Perfeito! Você acertou todas as perguntas!";

    } else if (pontos >= 30) {

        mensagemFinal.textContent =
            "👏 Muito bem! Você teve um ótimo desempenho.";

    } else if (pontos >= 20) {

        mensagemFinal.textContent =
            "🙂 Bom trabalho! Continue estudando.";

    } else {

        mensagemFinal.textContent =
            "💪 Continue praticando. Você pode melhorar!";

    }

}


// JOGAR NOVAMENTE

btnJogarNovamente.addEventListener(
    "click",
    iniciarQuiz
);


// COMEÇAR O JOGO

iniciarQuiz();