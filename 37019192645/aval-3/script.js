// 1. Crie suas perguntas aqui! Você pode adicionar quantas quiser.
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
    }
];

// 2. Selecionando os elementos na tela
const elementoPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const btnProximo = document.getElementById('btn-proximo');
const displayPontos = document.getElementById('pontos');

// Variáveis para controlar o estado do jogo
let indicePerguntaAtual = 0;
let pontos = 0;

// 3. Inicia ou Reinicia o Quiz
function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontos = 0;
    displayPontos.textContent = pontos;
    btnProximo.textContent = "Próxima Pergunta ➔";
    btnProximo.classList.add('escondido');
    mostrarPergunta();
}

// 4. Mostra a pergunta atual e cria os botões de resposta
function mostrarPergunta() {
    limparEstado();
    
    // Pega a pergunta atual na lista
    let perguntaAtual = perguntas[indicePerguntaAtual];
    // Exibe o texto da pergunta
    elementoPergunta.textContent = `${indicePerguntaAtual + 1}. ${perguntaAtual.pergunta}`;

    // Cria um botão para cada opção de resposta
    perguntaAtual.respostas.forEach(resposta => {
        const botao = document.createElement('button');
        botao.textContent = resposta.texto;
        botao.classList.add('btn-opcao');
        
        // Se essa for a resposta correta, guardamos essa informação escondida no botão
        if (resposta.correta) {
            botao.dataset.correta = resposta.correta;
        }
        
        botao.addEventListener('click', selecionarResposta);
        caixaOpcoes.appendChild(botao);
    });
}

// Limpa os botões antigos antes de mostrar a nova pergunta
function limparEstado() {
    btnProximo.classList.add('escondido');
    while (caixaOpcoes.firstChild) {
        caixaOpcoes.removeChild(caixaOpcoes.firstChild);
    }
}

// 5. Avalia a resposta do aluno quando ele clica
function selecionarResposta(evento) {
    const botaoSelecionado = evento.target;
    const isCorreta = botaoSelecionado.dataset.correta === "true";
    
    if (isCorreta) {
        botaoSelecionado.classList.add('correto'); // Fica verde
        pontos += 10;
        displayPontos.textContent = pontos;
    } else {
        botaoSelecionado.classList.add('errado'); // Fica vermelho
    }

    // Mostra qual era a certa e desativa todos os botões para não clicar duas vezes
    Array.from(caixaOpcoes.children).forEach(botao => {
        if (botao.dataset.correta === "true") {
            botao.classList.add('correto');
        }
        botao.disabled = true;
    });
    
    // Mostra o botão para ir para a próxima fase
    btnProximo.classList.remove('escondido');
}

// 6. Ação do botão "Próximo"
btnProximo.addEventListener('click', () => {
    indicePerguntaAtual++;
    
    // Verifica se ainda tem perguntas
    if (indicePerguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// 7. Fim de jogo
function mostrarResultado() {
    limparEstado();
    elementoPergunta.innerHTML = `🎉 Parabéns! Você terminou.<br>Sua pontuação foi: <span style="color:#ff6b6b">${pontos} pontos!</span>`;
    btnProximo.textContent = "Jogar Novamente 🔄";
    btnProximo.classList.remove('escondido');
    
    // Se ele clicar em jogar novamente, reinicia o quiz
    btnProximo.onclick = () => {
        btnProximo.onclick = null; // Remove o evento de reiniciar
        iniciarQuiz();
    };
}

// Inicia o jogo assim que a página carrega
iniciarQuiz();