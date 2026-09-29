const perguntas = [
    {
        pergunta: "Qual é a capital do Brasil?",
        respostas: [
            { texto: "São Paulo", correta: false },
            { texto: "Rio de Janeiro", correta: false },
            { texto: "Brasília", correta: true },
            { texto: "Salvador", correta: false }
        ]
    },
    {
        pergunta: "Quantos meses tem um ano bissexto?",
        respostas: [
            { texto: "12", correta: true },
            { texto: "13", correta: false },
            { texto: "11", correta: false },
            { texto: "10", correta: false }
        ]
    },
    {
        pergunta: "Qual é o metal cujo símbolo químico é Au?",
        respostas: [
            { texto: "Prata", correta: false },
            { texto: "Ouro", correta: true },
            { texto: "Cobre", correta: false },
            { texto: "Alumínio", correta: false }
        ]
    },
    {
        pergunta: "Qual é o maior oceano do planeta Terra?",
        respostas: [
            { texto: "Oceano Atlântico", correta: false },
            { texto: "Oceano Índico", correta: false },
            { texto: "Oceano Glacial Ártico", correta: false },
            { texto: "Oceano Pacífico", correta: true }
        ]
    },
    {
        pergunta: "Pergunta de R$ 1 Milhão: Qual é o número primo mais próximo de 100?",
        respostas: [
            { texto: "97", correta: true },
            { texto: "99", correta: false },
            { texto: "101", correta: false },
            { texto: "103", correta: false }
        ]
    }
];

// Valores dos prêmios
const valores = [1000, 10000, 50000, 100000, 1000000];

// Elementos HTML
const elementoPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const btnProximo = document.getElementById('btn-proximo');
const btnParar = document.getElementById('btn-parar');
const displayPontos = document.getElementById('pontos');

const btnUniversitarios = document.getElementById('btn-universitarios');
const btnCartas = document.getElementById('btn-cartas');
const btnPular = document.getElementById('btn-pular');
const displayPulos = document.getElementById('pulos-restantes');
const msgAjuda = document.getElementById('mensagem-ajuda');

// Variáveis do estado do jogo
let indicePerguntaAtual = 0;
let pulosRestantes = 3;
let ajudaUniversitariosUsada = false;
let ajudaCartasUsada = false;

function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pulosRestantes = 3;
    ajudaUniversitariosUsada = false;
    ajudaCartasUsada = false;

    btnUniversitarios.disabled = false;
    btnCartas.disabled = false;
    btnPular.disabled = false;
    btnParar.classList.remove('escondido');
    displayPulos.textContent = pulosRestantes;

    atualizarPontuacao();
    btnProximo.textContent = "Próxima Pergunta ➔";
    btnProximo.onclick = proximaPergunta;
    mostrarPergunta();
}

function atualizarPontuacao() {
    const premioAtual = indicePerguntaAtual > 0 ? valores[indicePerguntaAtual - 1] : 0;
    displayPontos.textContent = `R$ ${premioAtual.toLocaleString('pt-BR')}`;
}

function mostrarPergunta() {
    limparEstado();
    const perguntaAtual = perguntas[indicePerguntaAtual];
    const valorPergunta = valores[indicePerguntaAtual];
    
    elementoPergunta.innerHTML = `<small style="color:#ffd700">Valendo R$ ${valorPergunta.toLocaleString('pt-BR')}</small><br>${indicePerguntaAtual + 1}. ${perguntaAtual.pergunta}`;

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
    msgAjuda.classList.add('escondido');
    msgAjuda.textContent = "";
    while (caixaOpcoes.firstChild) {
        caixaOpcoes.removeChild(caixaOpcoes.firstChild);
    }
}

function selecionarResposta(evento) {
    const botaoSelecionado = evento.target;
    const isCorreta = botaoSelecionado.dataset.correta === "true";
    
    if (isCorreta) {
        botaoSelecionado.classList.add('correto');
        atualizarPontuacao();
    } else {
        botaoSelecionado.classList.add('errado');
        const valorPerda = indicePerguntaAtual > 0 ? valores[indicePerguntaAtual - 1] / 2 : 0;
        
        setTimeout(() => {
            mostrarResultado(`❌ Você errou! Saiu com R$ ${valorPerda.toLocaleString('pt-BR')}`);
        }, 1200);
        
        desativarOpcoes();
        return;
    }

    desativarOpcoes();
    
    if (indicePerguntaAtual === perguntas.length - 1) {
        setTimeout(() => {
            mostrarResultado("🏆 INCRÍVEL! Você ganhou R$ 1.000.000!");
        }, 1000);
    } else {
        btnProximo.classList.remove('escondido');
    }
}

function desativarOpcoes() {
    Array.from(caixaOpcoes.children).forEach(botao => {
        if (botao.dataset.correta === "true") {
            botao.classList.add('correto');
        }
        botao.disabled = true;
    });
}

function proximaPergunta() {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        atualizarPontuacao();
        mostrarPergunta();
    }
}

// Lógica de Ajudas
btnUniversitarios.addEventListener('click', () => {
    if (ajudaUniversitariosUsada) return;
    ajudaUniversitariosUsada = true;
    btnUniversitarios.disabled = true;

    const correta = perguntas[indicePerguntaAtual].respostas.find(r => r.correta).texto;
    msgAjuda.textContent = `🎓 Os universitários acham que a resposta certa é: "${correta}"`;
    msgAjuda.classList.remove('escondido');
});

btnCartas.addEventListener('click', () => {
    if (ajudaCartasUsada) return;
    ajudaCartasUsada = true;
    btnCartas.disabled = true;

    // Remove 2 respostas erradas
    let eliminadas = 0;
    const botoes = Array.from(caixaOpcoes.children);
    
    for (let botao of botoes) {
        if (botao.dataset.correta !== "true" && eliminadas < 2) {
            botao.style.visibility = "hidden";
            eliminadas++;
        }
    }

    msgAjuda.textContent = "🃏 Duas opções erradas foram eliminadas!";
    msgAjuda.classList.remove('escondido');
});

btnPular.addEventListener('click', () => {
    if (pulosRestantes <= 0) return;
    pulosRestantes--;
    displayPulos.textContent = pulosRestantes;

    if (pulosRestantes === 0) {
        btnPular.disabled = true;
    }

    proximaPergunta();
});

btnParar.addEventListener('click', () => {
    const premioParar = indicePerguntaAtual > 0 ? valores[indicePerguntaAtual - 1] : 0;
    mostrarResultado(`✋ Você parou! Levou para casa R$ ${premioParar.toLocaleString('pt-BR')}`);
});

function mostrarResultado(mensagem) {
    limparEstado();
    elementoPergunta.innerHTML = mensagem;
    btnParar.classList.add('escondido');
    btnProximo.textContent = "Jogar Novamente 🔄";
    btnProximo.classList.remove('escondido');
    
    btnProximo.onclick = () => {
        iniciarQuiz();
    };
}

// Inicializar
iniciarQuiz();