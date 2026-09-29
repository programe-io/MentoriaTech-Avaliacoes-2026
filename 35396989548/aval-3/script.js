// Tabela de prêmios por pergunta
const premios = [
    1000, 2000, 3000, 4000, 5000,
    10000, 20000, 30000, 40000, 50000,
    100000, 200000, 300000, 400000, 500000,
    1000000
];

// Lista de Perguntas
const perguntas = [
    {
        pergunta: "Qual é a capital do Brasil?",
        respostas: [
            { texto: "A) São Paulo", correta: false },
            { texto: "B) Rio de Janeiro", correta: false },
            { texto: "C) Brasília", correta: true },
            { texto: "D) Salvador", correta: false }
        ]
    },
    {
        pergunta: "Qual é o maior planeta do nosso Sistema Solar?",
        respostas: [
            { texto: "A) Terra", correta: false },
            { texto: "B) Júpiter", correta: true },
            { texto: "C) Saturno", correta: false },
            { texto: "D) Marte", correta: false }
        ]
    },
    {
        pergunta: "Quanto é 8 x 7?",
        respostas: [
            { texto: "A) 54", correta: false },
            { texto: "B) 56", correta: true },
            { texto: "C) 64", correta: false },
            { texto: "D) 48", correta: false }
        ]
    },
    {
        pergunta: "Quem pintou a obra 'Mona Lisa'?",
        respostas: [
            { texto: "A) Vincent van Gogh", correta: false },
            { texto: "B) Pablo Picasso", correta: false },
            { texto: "C) Leonardo da Vinci", correta: true },
            { texto: "D) Michelangelo", correta: false }
        ]
    },
    {
        pergunta: "Qual elemento químico é representado pela letra 'O'?",
        respostas: [
            { texto: "A) Ouro", correta: false },
            { texto: "B) Oxigênio", correta: true },
            { texto: "C) Osvaldo", correta: false },
            { texto: "D) Ozônio", correta: false }
        ]
    },
    {
        pergunta: "Em qual país surgiram os Jogos Olímpicos da Antiguidade?",
        respostas: [
            { texto: "A) Itália", correta: false },
            { texto: "B) Grécia", correta: true },
            { texto: "C) Egito", correta: false },
            { texto: "D) França", correta: false }
        ]
    },
    {
        pergunta: "Qual é o único metal líquido em temperatura ambiente?",
        respostas: [
            { texto: "A) Ferro", correta: false },
            { texto: "B) Mercúrio", correta: true },
            { texto: "C) Chumbo", correta: false },
            { texto: "D) Cobre", correta: false }
        ]
    },
    {
        pergunta: "Qual é a velocidade da luz no vácuo, aproximadamente?",
        respostas: [
            { texto: "A) 300.000 km/s", correta: true },
            { texto: "B) 150.000 km/s", correta: false },
            { texto: "C) 1.000.000 km/s", correta: false },
            { texto: "D) 30.000 km/s", correta: false }
        ]
    }
];

// Elementos HTML
const elementoPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const btnProximo = document.getElementById('btn-proximo');
const valorPremio = document.getElementById('valor-premio');

const btnPular = document.getElementById('btn-pular');
const btnCartas = document.getElementById('btn-cartas');
const btnUniversitarios = document.getElementById('btn-universitarios');
const btnParar = document.getElementById('btn-parar');
const pulosRestantesSpan = document.getElementById('pulos-restantes');

const modal = document.getElementById('modal-ajuda');
const modalTitulo = document.getElementById('modal-titulo');
const modalTexto = document.getElementById('modal-texto');
const btnFecharModal = document.getElementById('btn-fechar-modal');

// Estado do Jogo
let indicePerguntaAtual = 0;
let pulosRestantes = 3;
let ajudaCartasUsada = false;
let ajudaUniversitariosUsada = false;

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pulosRestantes = 3;
    ajudaCartasUsada = false;
    ajudaUniversitariosUsada = false;
    
    pulosRestantesSpan.textContent = pulosRestantes;
    btnPular.disabled = false;
    btnCartas.disabled = false;
    btnUniversitarios.disabled = false;
    btnParar.disabled = false;
    
    btnProximo.textContent = "Próxima Pergunta ➔";
    btnProximo.classList.add('escondido');
    mostrarPergunta();
}

function mostrarPergunta() {
    limparEstado();
    
    let perguntaAtual = perguntas[indicePerguntaAtual];
    valorPremio.textContent = `Valendo: ${formatarMoeda(premios[indicePerguntaAtual])}`;
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
    
    desativarAjudas();

    if (isCorreta) {
        botaoSelecionado.classList.add('correto');
        
        if (indicePerguntaAtual === perguntas.length - 1) {
            setTimeout(() => {
                mostrarResultado(true);
            }, 1000);
            return;
        }
        
        btnProximo.classList.remove('escondido');
    } else {
        botaoSelecionado.classList.add('errado');
        
        Array.from(caixaOpcoes.children).forEach(botao => {
            if (botao.dataset.correta === "true") {
                botao.classList.add('correto');
            }
            botao.disabled = true;
        });

        const valorPerda = indicePerguntaAtual > 0 ? premios[indicePerguntaAtual - 1] / 2 : 0;
        setTimeout(() => {
            exibirModal("Você errou!", `Que pena! Você errou a pergunta e levou para casa: <strong>${formatarMoeda(valorPerda)}</strong>.`, () => {
                mostrarResultado(false, valorPerda);
            });
        }, 1200);
    }
}

function desativarAjudas() {
    btnPular.disabled = true;
    btnCartas.disabled = true;
    btnUniversitarios.disabled = true;
    btnParar.disabled = true;
    Array.from(caixaOpcoes.children).forEach(botao => botao.disabled = true);
}

// Ajudas
btnPular.addEventListener('click', () => {
    if (pulosRestantes > 0) {
        pulosRestantes--;
        pulosRestantesSpan.textContent = pulosRestantes;
        if (pulosRestantes === 0) btnPular.disabled = true;
        
        indicePerguntaAtual = (indicePerguntaAtual + 1) % perguntas.length;
        mostrarPergunta();
    }
});

btnCartas.addEventListener('click', () => {
    if (ajudaCartasUsada) return;
    ajudaCartasUsada = true;
    btnCartas.disabled = true;

    const qtdEliminar = Math.floor(Math.random() * 3) + 1;
    const botoesIncorretos = Array.from(caixaOpcoes.children).filter(b => b.dataset.correta !== "true");
    
    botoesIncorretos.sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(qtdEliminar, botoesIncorretos.length); i++) {
        botoesIncorretos[i].style.visibility = "hidden";
    }

    exibirModal("🃏 Cartas", `O baralho eliminou <strong>${Math.min(qtdEliminar, botoesIncorretos.length)}</strong> opção(ões) incorreta(s)!`);
});

btnUniversitarios.addEventListener('click', () => {
    if (ajudaUniversitariosUsada) return;
    ajudaUniversitariosUsada = true;
    btnUniversitarios.disabled = true;

    const perguntaAtual = perguntas[indicePerguntaAtual];
    const corretaIndex = perguntaAtual.respostas.findIndex(r => r.correta);
    const opcoes = ["A", "B", "C", "D"];
    
    exibirModal("🎓 Universitários", `Os 3 universitários indicam que a resposta certa é a alternativa <strong>${opcoes[corretaIndex]}</strong>!`);
});

btnParar.addEventListener('click', () => {
    const valorGarantido = indicePerguntaAtual > 0 ? premios[indicePerguntaAtual - 1] : 0;
    exibirModal("🛑 Parar o Jogo", `Você decidiu parar! Você leva para casa o prêmio acumulado de <strong>${formatarMoeda(valorGarantido)}</strong>!`, () => {
        mostrarResultado(false, valorGarantido, true);
    });
});

function exibirModal(titulo, texto, callbackFechar = null) {
    modalTitulo.textContent = titulo;
    modalTexto.innerHTML = texto;
    modal.classList.remove('escondido');

    const novoFechar = () => {
        modal.classList.add('escondido');
        btnFecharModal.removeEventListener('click', novoFechar);
        if (callbackFechar) callbackFechar();
    };
    btnFecharModal.onclick = novoFechar;
}

btnProximo.addEventListener('click', () => {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        if (pulosRestantes > 0) btnPular.disabled = false;
        if (!ajudaCartasUsada) btnCartas.disabled = false;
        if (!ajudaUniversitariosUsada) btnUniversitarios.disabled = false;
        btnParar.disabled = false;

        mostrarPergunta();
    } else {
        mostrarResultado(true);
    }
});

function mostrarResultado(vitoria = false, premioFinal = 0, parou = false) {
    limparEstado();
    desativarAjudas();

    if (vitoria) {
        elementoPergunta.innerHTML = `🏆 PARABÉNS! VOCÊ É O NOVO MILIONÁRIO! 🎉<br><br><span style="color:#f5c518; font-size: 1.8rem;">Você ganhou R$ 1.000.000!</span>`;
    } else if (parou) {
        elementoPergunta.innerHTML = `🛑 Jogo encerrado por decisão do jogador.<br><br>Você levou: <span style="color:#00d2ff">${formatarMoeda(premioFinal)}</span>`;
    } else {
        elementoPergunta.innerHTML = `💥 Fim de jogo!<br><br>Sua premiação final foi: <span style="color:#ff3838">${formatarMoeda(premioFinal)}</span>`;
    }

    btnProximo.textContent = "Jogar Novamente 🔄";
    btnProximo.classList.remove('escondido');
    
    btnProximo.onclick = () => {
        btnProximo.onclick = null;
        iniciarQuiz();
    };
}

iniciarQuiz();