// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // 1. Lista de Perguntas — Adicione quantas quiser aqui!
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
            pergunta: "Quantos dias tem uma semana?",
            respostas: [
                { texto: "5 dias", correta: false },
                { texto: "6 dias", correta: false },
                { texto: "7 dias", correta: true },
                { texto: "10 dias", correta: false }
            ]
        },
        {
            pergunta: "Qual é a capital do Brasil?",
            respostas: [
                { texto: "São Paulo", correta: false },
                { texto: "Rio de Janeiro", correta: false },
                { texto: "Brasília", correta: true },
                { texto: "Salvador", correta: false }
            ]
        }
    ];

    // 2. Elementos da página
    const elementoPergunta = document.getElementById('pergunta');
    const caixaOpcoes = document.getElementById('caixa-opcoes');
    const btnProximo = document.getElementById('btn-proximo');
    const displayPontos = document.getElementById('pontos');

    // Estado do jogo
    let indicePerguntaAtual = 0;
    let pontos = 0;

    // 3. Inicia ou reinicia o jogo
    function iniciarQuiz() {
        indicePerguntaAtual = 0;
        pontos = 0;
        displayPontos.textContent = pontos;
        btnProximo.textContent = "Próxima Pergunta ➔";
        btnProximo.classList.add('escondido');
        btnProximo.onclick = proximaPergunta;
        mostrarPergunta();
    }

    // 4. Exibe a pergunta atual e gera os botões
    function mostrarPergunta() {
        limparEstado();
        
        const perguntaAtual = perguntas[indicePerguntaAtual];
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
    }

    // Limpa os botões antigos
    function limparEstado() {
        btnProximo.classList.add('escondido');
        while (caixaOpcoes.firstChild) {
            caixaOpcoes.removeChild(caixaOpcoes.firstChild);
        }
    }

    // 5. Processa a resposta escolhida
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

        // Mostra a resposta correta e bloqueia os botões
        Array.from(caixaOpcoes.children).forEach(botao => {
            if (botao.dataset.correta === "true") {
                botao.classList.add('correto');
            }
            botao.disabled = true;
        });

        btnProximo.classList.remove('escondido');
    }

    // 6. Avança para a próxima pergunta ou mostra resultado
    function proximaPergunta() {
        indicePerguntaAtual++;
        
        if (indicePerguntaAtual < perguntas.length) {
            mostrarPergunta();
        } else {
            mostrarResultadoFinal();
        }
    }

    // 7. Tela final com a pontuação
    function mostrarResultadoFinal() {
        limparEstado();
        elementoPergunta.innerHTML = `
            🎉 Parabéns! Você terminou!<br>
            Sua pontuação foi: <span style="color:#ffd700; font-size: 1.5rem">${pontos} pontos!</span>
        `;
        btnProximo.textContent = "Jogar Novamente 🔄";
        btnProximo.classList.remove('escondido');
        btnProximo.onclick = iniciarQuiz;
    }

    // Inicia o jogo!
    iniciarQuiz();
});