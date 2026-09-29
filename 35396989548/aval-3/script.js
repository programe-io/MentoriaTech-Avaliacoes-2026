// 1. Banco de perguntas em ordem de dificuldade até 1 Milhão
const perguntas = [
    {
        pergunta: "Qual é o animal terrestre mais rápido do mundo?",
        respostas: [
            { texto: "Guepardo", correta: true },
            { texto: "Leão", correta: false },
            { texto: "Coelho", correta: false },
            { texto: "Gazela", correta: false }
        ]
    },
    {
        pergunta: "Qual é a capital do Brasil?",
        respostas: [
            { texto: "São Paulo", correta: false },
            { texto: "Brasília", correta: true },
            { texto: "Rio de Janeiro", correta: false },
            { texto: "Salvador", correta: false }
        ]
    },
    {
        pergunta: "Quantos lados tem um hexágono?",
        respostas: [
            { texto: "5", correta: false },
            { texto: "6", correta: true },
            { texto: "8", correta: false },
            { texto: "4", correta: false }
        ]
    },
    {
        pergunta: "Qual elemento químico tem o símbolo 'O'?",
        respostas: [
            { texto: "Ouro", correta: false },
            { texto: "Oxigênio", correta: true },
            { texto: "Osvaldo", correta: false },
            { texto: "Ozônio", correta: false }
        ]
    },
    {
        pergunta: "Em que país fica a Torre Eiffel?",
        respostas: [
            { texto: "Itália", correta: false },
            { texto: "França", correta: true },
            { texto: "Espanha", correta: false },
            { texto: "Inglaterra", correta: false }
        ]
    },
    {
        pergunta: "Quem pintou a obra 'Mona Lisa'?",
        respostas: [
            { texto: "Pablo Picasso", correta: false },
            { texto: "Leonardo da Vinci", correta: true },
            { texto: "Vincent van Gogh", correta: false },
            { texto: "Michelangelo", correta: false }
        ]
    },
    {
        pergunta: "Qual é o maior planeta do Sistema Solar?",
        respostas: [
            { texto: "Terra", correta: false },
            { texto: "Júpiter", correta: true },
            { texto: "Saturno", correta: false },
            { texto: "Marte", correta: false }
        ]
    },
    {
        pergunta: "Em que ano o homem pisou na Lua pela primeira vez?",
        respostas: [
            { texto: "1959", correta: false },
            { texto: "1969", correta: true },
            { texto: "1975", correta: false },
            { texto: "1980", correta: false }
        ]
    },
    {
        pergunta: "Qual metal tem o símbolo químico 'Au'?",
        respostas: [
            { texto: "Prata", correta: false },
            { texto: "Ouro", correta: true },
            { texto: "Alumínio", correta: false },
            { texto: "Cobre", correta: false }
        ]
    },
    {
        pergunta: "Qual é a fórmula química da água?",
        respostas: [
            { texto: "CO2", correta: false },
            { texto: "H2O", correta: true },
            { texto: "NaCl", correta: false },
            { texto: "O2", correta: false }
        ]
    },
    {
        pergunta: "Qual oceano banha o litoral do Brasil?",
        respostas: [
            { texto: "Pacífico", correta: false },
            { texto: "Atlântico", correta: true },
            { texto: "Índico", correta: false },
            { texto: "Ártico", correta: false }
        ]
    },
    {
        pergunta: "Qual é o maior país do mundo em extensão territorial?",
        respostas: [
            { texto: "Canadá", correta: false },
            { texto: "Rússia", correta: true },
            { texto: "China", correta: false },
            { texto: "EUA", correta: false }
        ]
    },
    {
        pergunta: "Quantos ossos tem o corpo humano adulto?",
        respostas: [
            { texto: "300", correta: false },
            { texto: "206", correta: true },
            { texto: "150", correta: false },
            { texto: "210", correta: false }
        ]
    },
    {
        pergunta: "Qual é o livro mais vendido no mundo depois da Bíblia?",
        respostas: [
            { texto: "O Senhor dos Anéis", correta: false },
            { texto: "Dom Quixote", correta: true },
            { texto: "O Pequeno Príncipe", correta: false },
            { texto: "Harry Potter", correta: false }
        ]
    },
    {
        pergunta: "Em que ano terminou a Segunda Guerra Mundial?",
        respostas: [
            { texto: "1939", correta: false },
            { texto: "1945", correta: true },
            { texto: "1918", correta: false },
            { texto: "1950", correta: false }
        ]
    },
    {
        pergunta: "PERGUNTA DO MILHÃO: Qual é o menor país do mundo em área territorial?",
        respostas: [
            { texto: "Mônaco", correta: false },
            { texto: "Vaticano", correta: true },
            { texto: "Nauru", correta: false },
            { texto: "San Marino", correta: false }
        ]
    }
];

// 2. Tabela de valores (16 etapas)
const valores = [
    1000, 2000, 3000, 4000, 5000,
    10000, 20000, 30000, 40000, 50000,
    100000, 200000, 300000, 400000, 500000,
    1000000
];

// Elementos da interface
const elementoPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const areaQuiz = document.getElementById('area-quiz');
const ajudasContainer = document.getElementById('ajudas-container');
const telaFim = document.getElementById('tela-fim');
const mensagemFim = document.getElementById('mensagem-fim');
const premioFinalDisplay = document.getElementById('premio-final');
const btnReiniciar = document.getElementById('btn-reiniciar');

const displayValAcerto = document.getElementById('val-acerto');
const displayValParar = document.getElementById('val-parar');
const displayValErro = document.getElementById('val-erro');

const btnPular = document.getElementById('btn-pular');
const btnEliminar = document.getElementById('btn-eliminar');
const btnParar = document.getElementById('btn-parar');
const pulosRestantesDisplay = document.getElementById('pulos-restantes');

// Variáveis de estado
let indicePerguntaAtual = 0;
let pulosRestantes = 3;
let eliminarUsado = false;

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function iniciarJogo() {
    indicePerguntaAtual = 0;
    pulosRestantes = 3;
    eliminarUsado = false;
    
    pulosRestantesDisplay.textContent = pulosRestantes;
    btnPular.disabled = false;
    btnEliminar.disabled = false;
    btnParar.disabled = false;

    telaFim.classList.add('escondido');
    areaQuiz.classList.remove('escondido');
    ajudasContainer.classList.remove('escondido');
    
    mostrarPergunta();
}

function calcularValores() {
    const valAcerto = valores[indicePerguntaAtual];
    const valAtual = indicePerguntaAtual > 0 ? valores[indicePerguntaAtual - 1] : 0;
    const valParar = valAtual;
    
    // Na pergunta do milhão, se errar perde tudo (R$ 0). Caso contrário, ganha metade do acumulado.
    let valErro = 0;
    if (indicePerguntaAtual === valores.length - 1) {
        valErro = 0;
    } else {
        valErro = Math.floor(valAtual / 2);
    }

    displayValAcerto.textContent = formatarMoeda(valAcerto);
    displayValParar.textContent = formatarMoeda(valParar);
    displayValErro.textContent = formatarMoeda(valErro);

    return { valAcerto, valParar, valErro };
}

function mostrarPergunta() {
    limparEstado();
    calcularValores();

    const perguntaAtual = perguntas[indicePerguntaAtual];
    elementoPergunta.textContent = `${indicePerguntaAtual + 1}. ${perguntaAtual.pergunta}`;

    // Embaralha as respostas
    const respostasEmbaralhadas = [...perguntaAtual.respostas].sort(() => Math.random() - 0.5);

    respostasEmbaralhadas.forEach(resposta => {
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

function limparEstado() {
    while (caixaOpcoes.firstChild) {
        caixaOpcoes.removeChild(caixaOpcoes.firstChild);
    }
}

function selecionarResposta(e) {
    const botaoSelecionado = e.target;
    const eCorreta = botaoSelecionado.dataset.correta === "true";
    const { valAcerto, valErro } = calcularValores();

    Array.from(caixaOpcoes.children).forEach(btn => btn.disabled = true);
    desativarAjudas(true);

    if (eCorreta) {
        botaoSelecionado.classList.add('correto');
        setTimeout(() => {
            indicePerguntaAtual++;
            if (indicePerguntaAtual < perguntas.length) {
                desativarAjudas(false);
                mostrarPergunta();
            } else {
                finalizarJogo(valAcerto, "🏆 PARABÉNS! Você ganhou R$ 1 MILHÃO!");
            }
        }, 1200);
    } else {
        botaoSelecionado.classList.add('errado');
        Array.from(caixaOpcoes.children).forEach(btn => {
            if (btn.dataset.correta === "true") btn.classList.add('correto');
        });
        setTimeout(() => {
            finalizarJogo(valErro, "❌ Você errou a pergunta!");
        }, 1500);
    }
}

function desativarAjudas(status) {
    btnPular.disabled = status || pulosRestantes === 0;
    btnEliminar.disabled = status || eliminarUsado;
    btnParar.disabled = status;
}

// Eventos de Ajuda
btnPular.addEventListener('click', () => {
    if (pulosRestantes > 0) {
        pulosRestantes--;
        pulosRestantesDisplay.textContent = pulosRestantes;
        if (pulosRestantes === 0) btnPular.disabled = true;
        
        indicePerguntaAtual++;
        if (indicePerguntaAtual < perguntas.length) {
            mostrarPergunta();
        } else {
            finalizarJogo(valores[indicePerguntaAtual - 1], "Você pulou até a vitória!");
        }
    }
});

btnEliminar.addEventListener('click', () => {
    if (!eliminarUsado) {
        eliminarUsado = true;
        btnEliminar.disabled = true;

        const botoesIncorretos = Array.from(caixaOpcoes.children).filter(
            btn => btn.dataset.correta !== "true"
        );

        botoesIncorretos.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 2 && i < botoesIncorretos.length; i++) {
            botoesIncorretos[i].style.visibility = 'hidden';
            botoesIncorretos[i].disabled = true;
        }
    }
});

btnParar.addEventListener('click', () => {
    const { valParar } = calcularValores();
    finalizarJogo(valParar, "🛑 Você decidiu parar!");
});

function finalizarJogo(premio, mensagem) {
    areaQuiz.classList.add('escondido');
    ajudasContainer.classList.add('escondido');
    telaFim.classList.remove('escondido');

    mensagemFim.textContent = mensagem;
    premioFinalDisplay.textContent = `Prêmio Final: ${formatarMoeda(premio)}`;
}

btnReiniciar.addEventListener('click', iniciarJogo);

// Inicia o jogo
iniciarJogo();