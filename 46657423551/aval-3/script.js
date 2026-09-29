// Perguntas sobre o Flamengo! 🔴⚫
const perguntas = [
    {
        pergunta: "Em que ano o Flamengo conquistou a sua primeira Copa Libertadores?",
        respostas: [
            { texto: "1981", correta: true },
            { texto: "1985", correta: false },
            { texto: "1995", correta: false },
            { texto: "2001", correta: false }
        ]
    },
    {
        pergunta: "Qual é o nome do estádio onde o Flamengo manda seus jogos como principal sede?",
        respostas: [
            { texto: "Arena da Amazônia", correta: false },
            { texto: "Maracanã", correta: true },
            { texto: "Morumbi", correta: false },
            { texto: "Mineirão", correta: false }
        ]
    },
    {
        pergunta: "Qual jogador é considerado um dos maiores ídolos da história do clube e conhecido como 'O Rei'?",
        respostas: [
            { texto: "Romário", correta: false },
            { texto: "Zico", correta: true },
            { texto: "Garrincha", correta: false },
            { texto: "Pelé", correta: false }
        ]
    },
    {
        pergunta: "Quantos títulos do Campeonato Brasileiro o Flamengo tinha até o ano de 2024?",
        respostas: [
            { texto: "5", correta: false },
            { texto: "7", correta: true },
            { texto: "9", correta: false },
            { texto: "12", correta: false }
        ]
    },
    {
        pergunta: "Em 2019, o Flamengo foi campeão da Libertadores e do Brasileirão. Quem foi o técnico?",
        respostas: [
            { texto: "Tite", correta: false },
            { texto: "Jorge Jesus", correta: true },
            { texto: "Abel Ferreira", correta: false },
            { texto: "Dorival Júnior", correta: false }
        ]
    },
    {
        pergunta: "Qual é a cor principal do uniforme titular do Flamengo?",
        respostas: [
            { texto: "Azul e Branco", correta: false },
            { texto: "Verde e Branco", correta: false },
            { texto: "Vermelho e Preto", correta: true },
            { texto: "Amarelo e Preto", correta: false }
        ]
    }
];

// Elementos da tela
const elementoPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('opcoes');
const btnProximo = document.getElementById('btn-proximo');
const displayPontos = document.getElementById('pontos');
const contadorPerguntas = document.getElementById('contador');
const barraPreenchimento = document.getElementById('progresso');

// Estado do jogo
let indicePerguntaAtual = 0;
let pontos = 0;

// Inicia o jogo
function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontos = 0;
    displayPontos.textContent = pontos;
    btnProximo.innerHTML = "Continuar <i class='fas fa-chevron-right'></i>";
    btnProximo.classList.add('oculto');
    mostrarPergunta();
}

// Atualiza a barra de progresso
function atualizarProgresso() {
    const total = perguntas.length;
    const atual = indicePerguntaAtual + 1;
    contadorPerguntas.textContent = `Pergunta ${atual} / ${total}`;
    barraPreenchimento.style.width = `${(atual / total) * 100}%`;
}

// Exibe a pergunta atual
function mostrarPergunta() {
    limparEstado();
    atualizarProgresso();
    
    const perguntaAtual = perguntas[indicePerguntaAtual];
    elementoPergunta.textContent = `${indicePerguntaAtual + 1}. ${perguntaAtual.pergunta}`;
    
    perguntaAtual.respostas.forEach(resposta => {
        const botao = document.createElement('button');
        botao.textContent = resposta.texto;
        botao.classList.add('botao-opcao');
        
        if (resposta.correta) {
            botao.dataset.correta = "true";
        }
        
        botao.addEventListener('click', selecionarResposta);
        caixaOpcoes.appendChild(botao);
    });
}

// Limpa respostas anteriores
function limparEstado() {
    btnProximo.classList.add('oculto');
    while (caixaOpcoes.firstChild) {
        caixaOpcoes.removeChild(caixaOpcoes.firstChild);
    }
}

// Avalia a resposta escolhida
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
    
    // Mostra a correta e bloqueia cliques
    Array.from(caixaOpcoes.children).forEach(botao => {
        if (botao.dataset.correta === "true") {
            botao.classList.add('correto');
        }
        botao.disabled = true;
    });
    
    btnProximo.classList.remove('oculto');
}

// Avança para próxima pergunta
btnProximo.addEventListener('click', () => {
    indicePerguntaAtual++;
    
    if (indicePerguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultadoFinal();
    }
});

// Tela de resultado final
function mostrarResultadoFinal() {
    limparEstado();
    
    let mensagemExtra = "";
    if (pontos === 60) {
        mensagemExtra = "🏆 Você é um verdadeiro Mengão! Tudo certo!";
    } else if (pontos >= 40) {
        mensagemExtra = "🔴⚫ Bom torcedor! Conhece bem o clube!";
    } else {
        mensagemExtra = "📚 Vale estudar mais sobre o nosso clube!";
    }
    
    elementoPergunta.innerHTML = `
        🎉 Fim de Jogo!<br>
        Você fez <span style="color:#ffd700; font-size:1.8rem; font-weight:900">${pontos}</span> pontos!<br>
        <span style="font-size:1rem; color:#b0b0b0; margin-top:10px; display:block">${mensagemExtra}</span>
    `;
    btnProximo.innerHTML = "Jogar Novamente 🔄";
    btnProximo.classList.remove('oculto');
    
    btnProximo.onclick = () => {
        btnProximo.onclick = null;
        iniciarQuiz();
    };
}

// Inicia ao carregar
iniciarQuiz();