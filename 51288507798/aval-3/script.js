// Lista de desafios matemáticos
const perguntas = [
    {
        categoria: "Expressão Numérica",
        pergunta: "Qual é o resultado de 7 + 3 × 4?",
        explicacao: "A multiplicação deve ser feita primeiro: 3 × 4 = 12. Depois somamos: 7 + 12 = 19.",
        respostas: [
            { texto: "40", correta: false },
            { texto: "19", correta: true },
            { texto: "26", correta: false },
            { texto: "33", correta: false }
        ]
    },
    {
        categoria: "Porcentagem",
        pergunta: "Quanto é 25% de 160?",
        explicacao: "25% equivale a 1/4 do total. Basta dividir 160 por 4: 160 ÷ 4 = 40.",
        respostas: [
            { texto: "30", correta: false },
            { texto: "35", correta: false },
            { texto: "40", correta: true },
            { texto: "50", correta: false }
        ]
    },
    {
        categoria: "Álgebra BÁSICA",
        pergunta: "Se 2x + 5 = 17, qual é o valor de x?",
        explicacao: "Subtraia 5 de ambos os lados: 2x = 12. Depois divida por 2: x = 6.",
        respostas: [
            { texto: "x = 5", correta: false },
            { texto: "x = 6", correta: true },
            { texto: "x = 7", correta: false },
            { texto: "x = 8", correta: false }
        ]
    },
    {
        categoria: "Potenciação",
        pergunta: "Qual é o valor de 2⁵?",
        explicacao: "2⁵ = 2 × 2 × 2 × 2 × 2 = 32.",
        respostas: [
            { texto: "10", correta: false },
            { texto: "25", correta: false },
            { texto: "32", correta: true },
            { texto: "64", correta: false }
        ]
    },
    {
        categoria: "Raiz Quadrada",
        pergunta: "Qual é a raiz quadrada de 144?",
        explicacao: "Pois 12 × 12 = 144.",
        respostas: [
            { texto: "11", correta: false },
            { texto: "12", correta: true },
            { texto: "14", correta: false },
            { texto: "16", correta: false }
        ]
    },
    {
        categoria: "Raciocínio Lógico",
        pergunta: "Qual é o próximo número na sequência: 2, 6, 18, 54, ...?",
        explicacao: "Cada número é multiplicado por 3: 54 × 3 = 162.",
        respostas: [
            { texto: "108", correta: false },
            { texto: "150", correta: false },
            { texto: "162", correta: true },
            { texto: "180", correta: false }
        ]
    }
];

// Elementos do DOM
const elementoPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const btnProximo = document.getElementById('btn-proximo');
const displayPontos = document.getElementById('pontos');
const displayCombo = document.getElementById('combo');
const categoriaBadge = document.getElementById('categoria-badge');
const barraTempo = document.getElementById('barra-tempo');
const tempoTexto = document.getElementById('tempo-texto');
const caixaExplicacao = document.getElementById('caixa-explicacao');
const textoExplicacao = document.getElementById('texto-explicacao');

// Variáveis de Controle
let indicePerguntaAtual = 0;
let pontos = 0;
let combo = 1;
let tempoRestante = 15;
let intervaloTempo = null;
const TEMPO_MAXIMO = 15;

function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontos = 0;
    combo = 1;
    atualizarPlacar();
    btnProximo.textContent = "Próximo Desafio ➔";
    mostrarPergunta();
}

function mostrarPergunta() {
    limparEstado();
    
    let perguntaAtual = perguntas[indicePerguntaAtual];
    categoriaBadge.textContent = perguntaAtual.categoria;
    elementoPergunta.textContent = `${indicePerguntaAtual + 1}. ${perguntaAtual.pergunta}`;

    perguntaAtual.respostas.forEach(resposta => {
        const botao = document.createElement('button');
        botao.textContent = resposta.texto;
        botao.classList.add('btn-opcao');
        
        if (resposta.correta) {
            botao.dataset.correta = "true";
        }
        
        botao.addEventListener('click', selecionarResposta);
        caixaOpcoes.appendChild(botao);
    });

    iniciarCronometro();
}

function iniciarCronometro() {
    tempoRestante = TEMPO_MAXIMO;
    tempoTexto.textContent = `${tempoRestante}s`;
    barraTempo.style.width = '100%';
    barraTempo.style.backgroundColor = '#00d2ff';

    clearInterval(intervaloTempo);
    intervaloTempo = setInterval(() => {
        tempoRestante--;
        tempoTexto.textContent = `${tempoRestante}s`;
        
        const porcentagem = (tempoRestante / TEMPO_MAXIMO) * 100;
        barraTempo.style.width = `${porcentagem}%`;

        if (tempoRestante <= 5) {
            barraTempo.style.backgroundColor = '#ff3838';
        }

        if (tempoRestante <= 0) {
            clearInterval(intervaloTempo);
            tempoEsgotado();
        }
    }, 1000);
}

function tempoEsgotado() {
    combo = 1;
    atualizarPlacar();
    revelarRespostas(null);
}

function selecionarResposta(evento) {
    clearInterval(intervaloTempo);
    const botaoSelecionado = evento.target;
    const ehCorreta = botaoSelecionado.dataset.correta === "true";

    if (ehCorreta) {
        botaoSelecionado.classList.add('correto');
        // Bônus por rapidez
        const bonusTempo = tempoRestante * 2;
        pontos += (10 + bonusTempo) * combo;
        combo++;
    } else {
        botaoSelecionado.classList.add('errado');
        combo = 1; // Reseta o combo
    }

    atualizarPlacar();
    revelarRespostas(botaoSelecionado);
}

function revelarRespostas(botaoClicado) {
    Array.from(caixaOpcoes.children).forEach(botao => {
        if (botao.dataset.correta === "true") {
            botao.classList.add('correto');
        }
        botao.disabled = true;
    });

    // Exibe a explicação da resposta
    const perguntaAtual = perguntas[indicePerguntaAtual];
    textoExplicacao.textContent = perguntaAtual.explicacao;
    caixaExplicacao.classList.remove('escondido');

    btnProximo.classList.remove('escondido');
}

function atualizarPlacar() {
    displayPontos.textContent = pontos;
    displayCombo.textContent = combo;
}

function limparEstado() {
    clearInterval(intervaloTempo);
    btnProximo.classList.add('escondido');
    caixaExplicacao.classList.add('escondido');
    while (caixaOpcoes.firstChild) {
        caixaOpcoes.removeChild(caixaOpcoes.firstChild);
    }
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
    categoriaBadge.textContent = "Fim de Jogo";
    tempoTexto.textContent = "---";
    barraTempo.style.width = '0%';
    
    elementoPergunta.innerHTML = `
        🏆 <strong>Quiz Concluído!</strong><br><br>
        Sua pontuação final foi de: <span style="color:#00d2ff">${pontos} pontos</span>
    `;

    btnProximo.textContent = "Jogar Novamente 🔄";
    btnProximo.classList.remove('escondido');
    
    btnProximo.onclick = () => {
        btnProximo.onclick = null;
        iniciarQuiz();
    };
}

// Inicia o jogo automaticamente ao carregar a página
iniciarQuiz();