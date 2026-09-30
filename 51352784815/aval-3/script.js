// Perguntas focadas em Matemática
const perguntas = [
    {
        pergunta: "Quanto é 12 x 8?",
        respostas: [
            { texto: "86", correta: false },
            { texto: "96", correta: true },
            { texto: "104", correta: false },
            { texto: "92", correta: false }
        ]
    },
    {
        pergunta: "Qual é a raiz quadrada de 144?",
        respostas: [
            { texto: "10", correta: false },
            { texto: "11", correta: false },
            { texto: "12", correta: true },
            { texto: "14", correta: false }
        ]
    },
    {
        pergunta: "Quanto é 15% de 200?",
        respostas: [
            { texto: "20", correta: false },
            { texto: "25", correta: false },
            { texto: "30", correta: true },
            { texto: "35", correta: false }
        ]
    },
    {
        pergunta: "Qual é o resultado da expressão: 5 + 3 x 4?",
        respostas: [
            { texto: "32", correta: false },
            { texto: "17", correta: true },
            { texto: "23", correta: false },
            { texto: "20", correta: false }
        ]
    },
    {
        pergunta: "Se um triângulo tem lados de 3cm, 4cm e 5cm, qual é o seu perímetro?",
        respostas: [
            { texto: "12 cm", correta: true },
            { texto: "15 cm", correta: false },
            { texto: "60 cm", correta: false },
            { texto: "9 cm", correta: false }
        ]
    }
];

// Seleção de elementos no DOM
const elementoPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const btnProximo = document.getElementById('btn-proximo');
const displayPontos = document.getElementById('pontos');

let indicePerguntaAtual = 0;
let pontos = 0;

// Inicialização
function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontos = 0;
    displayPontos.textContent = pontos;
    btnProximo.textContent = "Próxima Pergunta ➔";
    btnProximo.classList.add('escondido');
    mostrarPergunta();
}

function mostrarPergunta() {
    limparEstado();
    
    let perguntaAtual = perguntas[indicePerguntaAtual];
    elementoPergunta.textContent = `${indicePerguntaAtual + 1}. ${perguntaAtual.pergunta}`;

    perguntaAtual.respostas.forEach(resposta => {
        const botao = document.createElement('button');
        botao.textContent = resposta.texto;
        botao.classList.add('btn-opcao');
        
        if (resposta.correta) {
            botao.dataset.correta = resposta.correta;
        }
        
        botao.addEventListener('click', selecionarResposta);
        caixaOpcoes.appendChild(botao);
    });
}

function limparEstado() {
    btnProximo.classList.add('escondido');
    while (caixaOpcoes.firstChild) {
        caixaOpcoes.removeChild(caixaOpcoes.firstChild);
    }
}

function selecionarResposta(evento) {
    const botaoSelecionado = evento.target;
    const isCorreta = botaoSelecionado.dataset.correta === "true";
    
    if (isCorreta) {
        botaoSelecionado.classList.add('correto');
        pontos += 10;
        displayPontos.textContent = pontos;
    } else {
        botaoSelecionado.classList.add('errado');
    }

    Array.from(caixaOpcoes.children).forEach(botao => {
        if (botao.dataset.correta === "true") {
            botao.classList.add('correto');
        }
        botao.disabled = true;
    });
    
    btnProximo.classList.remove('escondido');
}

btnProximo.addEventListener('click', () => {
    indicePerguntaAtual++;
    
    if (indicePerguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

function mostrarResultado() {
    limparEstado();
    elementoPergunta.innerHTML = `🎉 Excelente! Você concluiu o Quiz.<br>Sua pontuação final foi: <span style="color:#00d2ff">${pontos} pontos!</span>`;
    btnProximo.textContent = "Jogar Novamente 🔄";
    btnProximo.classList.remove('escondido');
    
    btnProximo.onclick = () => {
        btnProximo.onclick = null;
        iniciarQuiz();
    };
}

iniciarQuiz();