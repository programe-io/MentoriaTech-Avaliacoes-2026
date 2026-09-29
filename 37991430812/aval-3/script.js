// 1. Perguntas do Quiz de Futebol
const perguntas = [
    {
        pergunta: "Qual país venceu a Copa do Mundo de 2022?",
        respostas: [
            { texto: "França", correta: false },
            { texto: "Argentina", correta: true },
            { texto: "Brasil", correta: false },
            { texto: "Alemanha", correta: false }
        ]
    },
    {
        pergunta: "Qual jogador tem o maior número de Bolas de Ouro da história?",
        respostas: [
            { texto: "Cristiano Ronaldo", correta: false },
            { texto: "Pelé", correta: false },
            { texto: "Lionel Messi", correta: true },
            { texto: "Ronaldinho Gaúcho", correta: false }
        ]
    },
    {
        pergunta: "Quantos títulos de Copa do Mundo a Seleção Brasileira possui?",
        respostas: [
            { texto: "4 Títulos", correta: false },
            { texto: "5 Títulos", correta: true },
            { texto: "6 Títulos", correta: false },
            { texto: "3 Títulos", correta: false }
        ]
    },
    {
        pergunta: "Qual clube possui o maior número de títulos da UEFA Champions League?",
        respostas: [
            { texto: "Barcelona", correta: false },
            { texto: "Bayern de Munique", correta: false },
            { texto: "AC Milan", correta: false },
            { texto: "Real Madrid", correta: true }
        ]
    }
];

// 2. Selecionando os elementos na tela
const elementoPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const btnProximo = document.getElementById('btn-proximo');
const displayPontos = document.getElementById('pontos');

// Variáveis de controle
let indicePerguntaAtual = 0;
let pontos = 0;

// 3. Inicia o Quiz
function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontos = 0;
    displayPontos.textContent = pontos;
    btnProximo.textContent = "Próxima Pergunta ➔";
    btnProximo.classList.add('escondido');
    mostrarPergunta();
}

// 4. Exibe a pergunta atual
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

// Limpa botões antigos
function limparEstado() {
    btnProximo.classList.add('escondido');
    while (caixaOpcoes.firstChild) {
        caixaOpcoes.removeChild(caixaOpcoes.firstChild);
    }
}

// 5. Avalia a resposta escolhida
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

    // Revela a opção certa e bloqueia todas
    Array.from(caixaOpcoes.children).forEach(botao => {
        if (botao.dataset.correta === "true") {
            botao.classList.add('correto');
        }
        botao.disabled = true;
    });
    
    btnProximo.classList.remove('escondido');
}

// 6. Ação do botão "Próximo"
btnProximo.addEventListener('click', () => {
    indicePerguntaAtual++;
    
    if (indicePerguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// 7. Tela de Fim de Jogo
function mostrarResultado() {
    limparEstado();
    const pontuacaoMaxima = perguntas.length * 10;
    
    let mensagemAvaliacao = "";
    if (pontos === pontuacaoMaxima) {
        mensagemAvaliacao = "🏆 Craque do Jogo! Você acertou tudo!";
    } else if (pontos >= pontuacaoMaxima / 2) {
        mensagemAvaliacao = "⚽ Bom resultado! Entende bastante de futebol.";
    } else {
        mensagemAvaliacao = "🟡 Precisa treinar mais a sua tática e conhecimento.";
    }

    elementoPergunta.innerHTML = `${mensagemAvaliacao}<br><br>Sua pontuação final: <span style="color:#52b788">${pontos} / ${pontuacaoMaxima} pontos</span>`;
    btnProximo.textContent = "Jogar Novamente 🔄";
    btnProximo.classList.remove('escondido');
    
    btnProximo.onclick = () => {
        btnProximo.onclick = null;
        iniciarQuiz();
    };
}

// Inicia o jogo ao carregar
iniciarQuiz();