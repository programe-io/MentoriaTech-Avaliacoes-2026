```javascript
// ===============================
// PERGUNTAS DO QUIZ
// ===============================

const perguntas = [

    {
        pergunta: "Qual é o maior planeta do nosso Sistema Solar?",
        respostas: [
            { texto: "Terra", correta: false },
            { texto: "Júpiter", correta: true },
            { texto: "Saturno", correta: false },
            { texto: "Marte", correta: false }
        ]
    },

    {
        pergunta: "Quanto é 8 x 7?",
        respostas: [
            { texto: "54", correta: false },
            { texto: "56", correta: true },
            { texto: "64", correta: false },
            { texto: "48", correta: false }
        ]
    },

    {
        pergunta: "Qual animal é conhecido como o 'Rei da Selva'?",
        respostas: [
            { texto: "Tigre", correta: false },
            { texto: "Elefante", correta: false },
            { texto: "Leão", correta: true },
            { texto: "Gorila", correta: false }
        ]
    },

    {
        pergunta: "Qual linguagem é utilizada para deixar páginas web interativas?",
        respostas: [
            { texto: "JavaScript", correta: true },
            { texto: "HTML", correta: false },
            { texto: "CSS", correta: false },
            { texto: "SQL", correta: false }
        ]
    },

    {
        pergunta: "Qual planeta é conhecido como Planeta Vermelho?",
        respostas: [
            { texto: "Vênus", correta: false },
            { texto: "Marte", correta: true },
            { texto: "Netuno", correta: false },
            { texto: "Mercúrio", correta: false }
        ]
    }

];


// ===============================
// ELEMENTOS
// ===============================

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

const barraProgresso =
    document.getElementById("barra-progresso");

const btnMusica =
    document.getElementById("btn-musica");

const visualizador =
    document.getElementById("visualizador");


// ===============================
// VARIÁVEIS
// ===============================

let indicePerguntaAtual = 0;
let pontos = 0;
let musicaTocando = false;


// ===============================
// INICIAR QUIZ
// ===============================

function iniciarQuiz() {

    indicePerguntaAtual = 0;
    pontos = 0;

    displayPontos.textContent = pontos;

    btnProximo.textContent =
        "Próxima pergunta ➜";

    btnProximo.classList.add("escondido");

    mostrarPergunta();
}


// ===============================
// MOSTRAR PERGUNTA
// ===============================

function mostrarPergunta() {

    limparEstado();

    const perguntaAtual =
        perguntas[indicePerguntaAtual];

    elementoPergunta.textContent =
        `${indicePerguntaAtual + 1}. ${perguntaAtual.pergunta}`;

    numeroPergunta.textContent =
        `${indicePerguntaAtual + 1} / ${perguntas.length}`;

    const progresso =
        ((indicePerguntaAtual + 1) / perguntas.length) * 100;

    barraProgresso.style.width =
        `${progresso}%`;


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


// ===============================
// LIMPAR ESTADO
// ===============================

function limparEstado() {

    btnProximo.classList.add("escondido");

    while (caixaOpcoes.firstChild) {
        caixaOpcoes.removeChild(
            caixaOpcoes.firstChild
        );
    }
}


// ===============================
// SELECIONAR RESPOSTA
// ===============================

function selecionarResposta(evento) {

    const botaoSelecionado =
        evento.target;

    const correta =
        botaoSelecionado.dataset.correta === "true";


    if (correta) {

        botaoSelecionado.classList.add("correto");

        pontos += 10;

        displayPontos.textContent =
            pontos;

    } else {

        botaoSelecionado.classList.add("errado");
    }


    // Mostra a resposta correta
    Array.from(
        caixaOpcoes.children
    ).forEach(botao => {

        if (
            botao.dataset.correta === "true"
        ) {
            botao.classList.add("correto");
        }

        botao.disabled = true;
    });


    btnProximo.classList.remove(
        "escondido"
    );
}


// ===============================
// PRÓXIMA PERGUNTA
// ===============================

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


// ===============================
// RESULTADO
// ===============================

function mostrarResultado() {

    limparEstado();

    const total =
        perguntas.length * 10;

    const porcentagem =
        Math.round(
            (pontos / total) * 100
        );


    elementoPergunta.innerHTML = `
        <div class="resultado">

            <div class="emoji">🏆</div>

            <h2>Quiz concluído!</h2>

            <p>
                Você conseguiu
                <strong>${pontos}</strong>
                de
                <strong>${total}</strong>
                pontos.
            </p>

            <div class="porcentagem">
                ${porcentagem}%
            </div>

        </div>
    `;


    btnProximo.textContent =
        "🔄 Jogar novamente";

    btnProximo.classList.remove(
        "escondido"
    );


    btnProximo.onclick = () => {

        btnProximo.onclick = null;

        iniciarQuiz();
    };
}


// ===============================
// MÚSICA ORIGINAL
// ===============================

let audioContext;
let intervaloMusical;

function iniciarMusica() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }


    const notas = [
        261.63,
        329.63,
        392.00,
        329.63,
        293.66,
        349.23,
        440.00,
        349.23
    ];

    let indiceNota = 0;


    intervaloMusical =
        setInterval(() => {

            const oscilador =
                audioContext.createOscillator();

            const volume =
                audioContext.createGain();


            oscilador.frequency.value =
                notas[indiceNota];

            oscilador.type =
                "sine";


            volume.gain.setValueAtTime(
                0.08,
                audioContext.currentTime
            );

            volume.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.3
            );


            oscilador.connect(volume);

            volume.connect(
                audioContext.destination
            );


            oscilador.start();

            oscilador.stop(
                audioContext.currentTime + 0.3
            );


            indiceNota++;

            if (
                indiceNota >= notas.length
            ) {
                indiceNota = 0;
            }

        }, 350);
}


// ===============================
// PARAR MÚSICA
// ===============================

function pararMusica() {

    clearInterval(
        intervaloMusical
    );

    intervaloMusical = null;
}


// ===============================
// BOTÃO DA MÚSICA
// ===============================

btnMusica.addEventListener(
    "click",
    () => {

        if (!musicaTocando) {

            iniciarMusica();

            musicaTocando = true;

            btnMusica.textContent =
                "⏸ Pausar música";

            visualizador.classList.add(
                "tocando"
            );

        } else {

            pararMusica();

            musicaTocando = false;

            btnMusica.textContent =
                "▶ Tocar música";

            visualizador.classList.remove(
                "tocando"
            );
        }
    }
);


// ===============================
// INICIAR
// ===============================

iniciarQuiz();
```
