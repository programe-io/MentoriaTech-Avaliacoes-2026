// 1. Crie suas perguntas aqui! Você pode adicionar quantas quiser.
const perguntas = [
    {
        pergunta: "Qual é o país com a maior população do mundo atualmente?",
        respostas: [
            { texto: "China", correta: false },
            { texto: "Índia", correta: true },
            { texto: "Estados Unidos", correta: false },
            { texto: "Indonésia", correta: false }
        ]
    },
    {
        pergunta: "Quem pintou a obra 'Mona Lisa'?",
        respostas: [
            { texto: "Vincent van Gogh", correta: false },
            { texto: "Pablo Picasso", correta: false },
            { texto: "Leonardo da Vinci", correta: true },
            { texto: "Michelangelo", correta: false }
        ]
    },
    {
        pergunta: "Qual é o rio mais extenso do mundo?",
        respostas: [
            { texto: "Rio Nilo", correta: false },
            { texto: "Rio Amazonas", correta: true },
            { texto: "Rio Yangtzé", correta: false },
            { texto: "Rio Mississippi", correta: false }
        ]
    },
    {
        pergunta: "Em que ano o homem pisou na Lua pela primeira vez?",
        respostas: [
            { texto: "1965", correta: false },
            { texto: "1969", correta: true },
            { texto: "1972", correta: false },
            { texto: "1961", correta: false }
        ]
    },
    {
        pergunta: "Qual é o elemento químico representado pelo símbolo 'O'?",
        respostas: [
            { texto: "Ouro", correta: false },
            { texto: "Ósmio", correta: false },
            { texto: "Oxigênio", correta: true },
            { texto: "Hidrogênio", correta: false }
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