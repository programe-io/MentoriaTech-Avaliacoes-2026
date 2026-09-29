const perguntas = [

    {
        pergunta: "Qual destes grupos tem a música 'God's Menu'?",
        respostas: [
            { texto: "BLACKPINK", correta: false },
            { texto: "Stray Kids", correta: true },
            { texto: "TWICE", correta: false },
            { texto: "IVE", correta: false }
        ]
    },

    {
        pergunta: "Qual destas músicas pertence ao BLACKPINK?",
        respostas: [
            { texto: "DDU-DU DDU-DU", correta: true },
            { texto: "MANIAC", correta: false },
            { texto: "CASE 143", correta: false },
            { texto: "Back Door", correta: false }
        ]
    },

    {
        pergunta: "Quem é conhecido como o líder do Stray Kids?",
        respostas: [
            { texto: "Felix", correta: false },
            { texto: "Hyunjin", correta: false },
            { texto: "Bang Chan", correta: true },
            { texto: "I.N", correta: false }
        ]
    },

    {
        pergunta: "Qual destas integrantes faz parte do BLACKPINK?",
        respostas: [
            { texto: "Sana", correta: false },
            { texto: "Lisa", correta: true },
            { texto: "Karina", correta: false },
            { texto: "Yunjin", correta: false }
        ]
    },

    {
        pergunta: "Qual música pertence ao Stray Kids?",
        respostas: [
            { texto: "LALISA", correta: false },
            { texto: "Pink Venom", correta: false },
            { texto: "MANIAC", correta: true },
            { texto: "How You Like That", correta: false }
        ]
    },

    {
        pergunta: "Quantas integrantes o BLACKPINK possui?",
        respostas: [
            { texto: "4", correta: true },
            { texto: "5", correta: false },
            { texto: "6", correta: false },
            { texto: "8", correta: false }
        ]
    },

    {
        pergunta: "Qual destes integrantes faz parte do Stray Kids?",
        respostas: [
            { texto: "Felix", correta: true },
            { texto: "Jisoo", correta: false },
            { texto: "Jennie", correta: false },
            { texto: "Rosé", correta: false }
        ]
    },

    {
        pergunta: "Qual destas músicas é do BLACKPINK?",
        respostas: [
            { texto: "S-Class", correta: false },
            { texto: "Thunderous", correta: false },
            { texto: "Kill This Love", correta: true },
            { texto: "MIROH", correta: false }
        ]
    },

    {
        pergunta: "Qual destes nomes pertence a uma integrante do BLACKPINK?",
        respostas: [
            { texto: "Changbin", correta: false },
            { texto: "Jisoo", correta: true },
            { texto: "Seungmin", correta: false },
            { texto: "Han", correta: false }
        ]
    },

    {
        pergunta: "Qual grupo lançou a música 'S-Class'?",
        respostas: [
            { texto: "BLACKPINK", correta: false },
            { texto: "Stray Kids", correta: true },
            { texto: "Red Velvet", correta: false },
            { texto: "LE SSERAFIM", correta: false }
        ]
    }

];


const elementoPergunta =
    document.getElementById("pergunta");

const caixaOpcoes =
    document.getElementById("caixa-opcoes");

const btnProximo =
    document.getElementById("btn-proximo");

const displayPontos =
    document.getElementById("pontos");

const numeroPergunta =
    document.getElementById("numero-pergunta");

const resultado =
    document.getElementById("resultado");


let indicePerguntaAtual = 0;

let pontos = 0;


/* INICIA O QUIZ */

function iniciarQuiz() {

    indicePerguntaAtual = 0;

    pontos = 0;

    displayPontos.textContent = pontos;

    resultado.classList.add("escondido");

    document.querySelector("main").classList.remove("escondido");

    btnProximo.classList.add("escondido");

    btnProximo.textContent = "Próxima ➜";

    mostrarPergunta();
}


/* MOSTRA A PERGUNTA */

function mostrarPergunta() {

    limparEstado();

    const perguntaAtual =
        perguntas[indicePerguntaAtual];

    numeroPergunta.textContent =
        indicePerguntaAtual + 1;

    elementoPergunta.textContent =
        perguntaAtual.pergunta;


    perguntaAtual.respostas.forEach(resposta => {

        const botao =
            document.createElement("button");

        botao.textContent =
            resposta.texto;

        botao.classList.add("btn-opcao");


        if (resposta.correta) {
            botao.dataset.correta = "true";
        }


        botao.addEventListener(
            "click",
            selecionarResposta
        );


        caixaOpcoes.appendChild(botao);

    });
}


/* LIMPA AS OPÇÕES */

function limparEstado() {

    btnProximo.classList.add("escondido");

    caixaOpcoes.innerHTML = "";
}


/* SELECIONA UMA RESPOSTA */

function selecionarResposta(evento) {

    const botaoSelecionado =
        evento.target;

    const correta =
        botaoSelecionado.dataset.correta === "true";


    if (correta) {

        botaoSelecionado.classList.add("correto");

        pontos += 10;

        displayPontos.textContent = pontos;

    } else {

        botaoSelecionado.classList.add("errado");

    }


    /* MOSTRA A RESPOSTA CERTA */

    Array.from(caixaOpcoes.children)
        .forEach(botao => {

            if (botao.dataset.correta === "true") {
                botao.classList.add("correto");
            }

            botao.disabled = true;

        });


    btnProximo.classList.remove("escondido");
}


/* PRÓXIMA PERGUNTA */

btnProximo.addEventListener(
    "click",
    proximaPergunta
);


function proximaPergunta() {

    indicePerguntaAtual++;


    if (indicePerguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultado();

    }
}


/* RESULTADO FINAL */

function mostrarResultado() {

    document.querySelector("main")
        .classList.add("escondido");

    btnProximo.classList.add("escondido");

    resultado.classList.remove("escondido");


    resultado.innerHTML = `

        <h2>🎉 Quiz finalizado!</h2>

        <p>
            Você terminou o desafio
            Stray Kids × BLACKPINK!
        </p>

        <div class="nota">
            ${pontos} pontos
        </div>

        <p>
            Você acertou
            ${pontos / 10}
            de
            ${perguntas.length}
            perguntas.
        </p>

        <button id="btn-novamente">
            🔄 Jogar novamente
        </button>

    `;


    document
        .getElementById("btn-novamente")
        .addEventListener(
            "click",
            iniciarQuiz
        );
}


/* COMEÇA AUTOMATICAMENTE */

iniciarQuiz();