// Perguntas temáticas sobre Judô
const perguntas = [
    {
        pergunta: "O que significa a palavra 'Judô' em japonês?",
        respostas: [
            { texto: "Caminho da Suavidade", correta: true },
            { texto: "Arte da Força Bruta", correta: false },
            { texto: "Luta de Solo", correta: false },
            { texto: "Defesa Rápida", correta: false }
        ]
    },
    {
        pergunta: "Qual é a pontuação máxima que um judoca pode obter ao aplicar um golpe perfeito?",
        respostas: [
            { texto: "Waza-ari", correta: false },
            { texto: "Yuko", correta: false },
            { texto: "Ippon", correta: true },
            { texto: "Koka", correta: false }
        ]
    },
    {
        pergunta: "Quem foi o criador do Judô moderno em 1882?",
        respostas: [
            { texto: "Morihei Ueshiba", correta: false },
            { texto: "Jigoro Kano", correta: true },
            { texto: "Gichin Funakoshi", correta: false },
            { texto: "Masutatsu Oyama", correta: false }
        ]
    },
    {
        pergunta: "Como se chama o local onde os judocas treinam e lutam?",
        respostas: [
            { texto: "Ringue", correta: false },
            { texto: "Dojo / Tatame", correta: true },
            { texto: "Arena", correta: false },
            { texto: "Octógono", correta: false }
        ]
    }
];

// Selecionando elementos da tela
const elementoPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const btnProximo = document.getElementById('btn-proximo');
const displayPontos = document.getElementById('pontos');

// Variáveis de controle
let indicePerguntaAtual = 0;
let pontos = 0;

// Inicializa o quiz
function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontos = 0;
    displayPontos.textContent = pontos;
    btnProximo.textContent = "Próxima Pergunta ➔";
    btnProximo.classList.add('escondido');
    mostrarPergunta();
}

// Exibe a pergunta e gera os botões de resposta
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

// Limpa opções antigas
function limparEstado() {
    btnProximo.classList.add('escondido');
    while (caixaOpcoes.firstChild) {
        caixaOpcoes.removeChild(caixaOpcoes.firstChild);
    }
}

// Processa a resposta escolhida
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

    // Mostra a resposta correta caso o aluno erre e trava os botões
    Array.from(caixaOpcoes.children).forEach(botao => {
        if (botao.dataset.correta === "true") {
            botao.classList.add('correto');
        }
        botao.disabled = true;
    });
    
    btnProximo.classList.remove('escondido');
}

// Avança para a próxima pergunta
btnProximo.addEventListener('click', () => {
    indicePerguntaAtual++;
    
    if (indicePerguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// Tela final do quiz
function mostrarResultado() {
    limparEstado();
    elementoPergunta.innerHTML = `🏆 Oss! Você completou o quiz.<br>Sua pontuação final foi: <span style="color:#00d2ff">${pontos} pontos!</span>`;
    btnProximo.textContent = "Recomeçar Quiz 🔄";
    btnProximo.classList.remove('escondido');
    
    btnProximo.onclick = () => {
        btnProximo.onclick = null; 
        iniciarQuiz();
    };
}

// Inicia o jogo ao carregar
iniciarQuiz();