// Perguntas do Show do Milhão
const perguntas = [
    {
        pergunta: "Qual é a capital do Brasil?",
        respostas: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        correta: 2
    },
    {
        pergunta: "Qual elemento químico tem o símbolo 'O'?",
        respostas: ["Ouro", "Oxigênio", "Osvaldo", "Ozônio"],
        correta: 1
    },
    {
        pergunta: "Quantos anos durou a Guerra dos Cem Anos?",
        respostas: ["100 anos", "116 anos", "99 anos", "105 anos"],
        correta: 1
    },
    {
        pergunta: "Qual o livro mais vendido no mundo depois da Bíblia?",
        respostas: ["O Senhor dos Anéis", "Dom Quixote", "O Pequeno Príncipe", "Harry Potter"],
        correta: 1
    },
    {
        pergunta: "PERGUNTA DO MILHÃO: Qual é o país com maior área territorial do planeta?",
        respostas: ["Canadá", "Estados Unidos", "China", "Rússia"],
        correta: 3
    }
];

// Escala de valores dos prêmios
const valores = [
    "R$ 1.000",
    "R$ 10.000",
    "R$ 50.000",
    "R$ 250.000",
    "R$ 1.000.000"
];

// Elementos da interface
const elementoPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const valorAtualDisplay = document.getElementById('valor-atual');
const valorProximoDisplay = document.getElementById('valor-proximo');
const btnEliminar = document.getElementById('btn-eliminar');
const btnPular = document.getElementById('btn-pular');
const btnParar = document.getElementById('btn-parar');
const pulosRestantesDisplay = document.getElementById('pulos-restantes');

// Variáveis de estado do jogo
let indicePergunta = 0;
let pulosRestantes = 1;
let ajudaEliminarDisponivel = true;

function iniciarJogo() {
    indicePergunta = 0;
    pulosRestantes = 1;
    ajudaEliminarDisponivel = true;
    btnEliminar.disabled = false;
    btnPular.disabled = false;
    btnParar.disabled = false;
    pulosRestantesDisplay.textContent = pulosRestantes;
    
    atualizarValores();
    mostrarPergunta();
}

function atualizarValores() {
    const valorAtual = indicePergunta === 0 ? "R$ 0" : valores[indicePergunta - 1];
    const valorProximo = valores[indicePergunta];

    valorAtualDisplay.textContent = valorAtual;
    valorProximoDisplay.textContent = valorProximo;
}

function mostrarPergunta() {
    limparOpcoes();
    const q = perguntas[indicePergunta];
    elementoPergunta.textContent = `${indicePergunta + 1}. ${q.pergunta}`;

    q.respostas.forEach((texto, index) => {
        const botao = document.createElement('button');
        botao.textContent = `${String.fromCharCode(65 + index)}) ${texto}`;
        botao.classList.add('btn-opcao');
        botao.dataset.index = index;
        botao.addEventListener('click', selecionarResposta);
        caixaOpcoes.appendChild(botao);
    });
}

function limparOpcoes() {
    while (caixaOpcoes.firstChild) {
        caixaOpcoes.removeChild(caixaOpcoes.firstChild);
    }
}

function selecionarResposta(e) {
    const botaoSelecionado = e.target;
    const indiceSelecionado = parseInt(botaoSelecionado.dataset.index);
    const correta = perguntas[indicePergunta].correta;

    desativarBotoes();

    if (indiceSelecionado === correta) {
        botaoSelecionado.classList.add('correto');
        
        setTimeout(() => {
            indicePergunta++;
            if (indicePergunta < perguntas.length) {
                atualizarValores();
                mostrarPergunta();
            } else {
                finalizarJogo(true, "R$ 1.000.000");
            }
        }, 1200);
    } else {
        botaoSelecionado.classList.add('errado');
        // Destaca a opção correta
        caixaOpcoes.children[correta].classList.add('correto');

        const premioConsolacao = indicePergunta === 0 ? "R$ 0" : "R$ 500";
        setTimeout(() => {
            finalizarJogo(false, premioConsolacao);
        }, 1500);
    }
}

function desativarBotoes() {
    Array.from(caixaOpcoes.children).forEach(b => b.disabled = true);
}

// Ajuda: Eliminar 2 alternativas incorretas
btnEliminar.addEventListener('click', () => {
    if (!ajudaEliminarDisponivel) return;

    const correta = perguntas[indicePergunta].correta;
    let eliminadas = 0;
    const botoes = Array.from(caixaOpcoes.children);

    for (let b of botoes) {
        const idx = parseInt(b.dataset.index);
        if (idx !== correta && eliminadas < 2) {
            b.disabled = true;
            b.style.opacity = "0.2";
            eliminadas++;
        }
    }

    ajudaEliminarDisponivel = false;
    btnEliminar.disabled = true;
});

// Ajuda: Pular pergunta
btnPular.addEventListener('click', () => {
    if (pulosRestantes > 0) {
        pulosRestantes--;
        pulosRestantesDisplay.textContent = pulosRestantes;
        if (pulosRestantes === 0) btnPular.disabled = true;
        
        mostrarPergunta();
    }
});

// Ação: Parar o jogo
btnParar.addEventListener('click', () => {
    const valorParada = indicePergunta === 0 ? "R$ 0" : valores[indicePergunta - 1];
    finalizarJogo(null, valorParada);
});

function finalizarJogo(venceu, premioFinal) {
    limparOpcoes();
    btnEliminar.disabled = true;
    btnPular.disabled = true;
    btnParar.disabled = true;

    if (venceu === true) {
        elementoPergunta.innerHTML = `🏆 PARABÉNS! VOCÊ GANHOU O <span style="color:#ffcc00">${premioFinal}</span>!`;
    } else if (venceu === false) {
        elementoPergunta.innerHTML = `❌ Resposta incorreta! Você saiu com <span style="color:#ef4444">${premioFinal}</span>.`;
    } else {
        elementoPergunta.innerHTML = `✋ Você decidiu parar! Seu prêmio acumulado é de <span style="color:#22c55e">${premioFinal}</span>!`;
    }

    const btnReiniciar = document.createElement('button');
    btnReiniciar.textContent = "Jogar Novamente 🔄";
    btnReiniciar.classList.add('btn-parar');
    btnReiniciar.style.marginTop = "20px";
    btnReiniciar.style.width = "100%";
    btnReiniciar.addEventListener('click', iniciarJogo);
    caixaOpcoes.appendChild(btnReiniciar);
}

iniciarJogo();