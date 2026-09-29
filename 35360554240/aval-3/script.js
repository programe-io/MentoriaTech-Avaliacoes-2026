// Suas perguntas — edite, adicione ou remova livremente!
const perguntas = [
    {
        pergunta: "Qual é o maior oceano do mundo?",
        respostas: [
            { texto: "Oceano Atlântico", correta: false },
            { texto: "Oceano Índico", correta: false },
            { texto: "Oceano Pacífico", correta: true },
            { texto: "Oceano Ártico", correta: false }
        ]
    },
    {
        pergunta: "Quantos meses têm 28 dias?",
        respostas: [
            { texto: "Apenas 1", correta: false },
            { texto: "12", correta: true },
            { texto: "2", correta: false },
            { texto: "0", correta: false }
        ]
    },
    {
        pergunta: "Qual é o símbolo químico do ouro?",
        respostas: [
            { texto: "Go", correta: false },
            { texto: "Ag", correta: false },
            { texto: "Au", correta: true },
            { texto: "Fe", correta: false }
        ]
    },
    {
        pergunta: "Quem pintou a Mona Lisa?",
        respostas: [
            { texto: "Van Gogh", correta: false },
            { texto: "Picasso", correta: false },
            { texto: "Leonardo da Vinci", correta: true },
            { texto: "Michelangelo", correta: false }
        ]
    },
    {
        pergunta: "Qual é o planeta mais próximo do Sol?",
        respostas: [
            { texto: "Vênus", correta: false },
            { texto: "Mercúrio", correta: true },
            { texto: "Marte", correta: false },
            { texto: "Júpiter", correta: false }
        ]
    }
];

// Elementos
const elPergunta = document.getElementById('pergunta');
const elOpcoes = document.getElementById('opcoes');
const btnAcao = document.getElementById('btn-acao');
const elPontos = document.getElementById('pontos');
const elContador = document.getElementById('contador-perguntas');
const elProgresso = document.getElementById('progresso');

// Estado
let indiceAtual = 0;
let pontos = 0;

// Inicia o jogo
function iniciar() {
    indiceAtual = 0;
    pontos = 0;
    elPontos.textContent = '0';
    btnAcao.textContent = 'Próxima ➡️';
    btnAcao.classList.add('escondido');
    mostrarPergunta();
}

function mostrarPergunta() {
    limpar();
    
    const pergunta = perguntas[indiceAtual];
    const total = perguntas.length;
    
    // Atualiza contador e barra
    elContador.textContent = `${indiceAtual + 1} / ${total}`;
    elProgresso.style.width = `${((indiceAtual + 1) / total) * 100}%`;
    
    elPergunta.textContent = `${indiceAtual + 1}. ${pergunta.pergunta}`;
    
    // Cria os botões
    pergunta.respostas.forEach(resp => {
        const btn = document.createElement('button');
        btn.className = 'botao-opcao';
        btn.textContent = resp.texto;
        if (resp.correta) btn.dataset.correta = 'true';
        btn.addEventListener('click', escolher);
        elOpcoes.appendChild(btn);
    });
}

function limpar() {
    btnAcao.classList.add('escondido');
    elOpcoes.innerHTML = '';
}

function escolher(e) {
    const botao = e.target;
    const acertou = botao.dataset.correta === 'true';
    
    if (acertou) {
        botao.classList.add('correto');
        pontos += 10;
        elPontos.textContent = pontos;
    } else {
        botao.classList.add('errado');
    }
    
    // Mostra a correta e bloqueia
    Array.from(elOpcoes.children).forEach(b => {
        if (b.dataset.correta === 'true') b.classList.add('correto');
        b.disabled = true;
    });
    
    btnAcao.classList.remove('escondido');
}

// Ação do botão
btnAcao.addEventListener('click', () => {
    indiceAtual++;
    
    if (indiceAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

function mostrarResultado() {
    limpar();
    const totalPontos = perguntas.length * 10;
    const porcentagem = (pontos / totalPontos) * 100;
    
    let mensagem = '';
    if (porcentagem === 100) {
        mensagem = '🏆 Perfeito! Você sabe tudo!';
    } else if (porcentagem >= 60) {
        mensagem = '🎉 Parabéns! Bom conhecimento!';
    } else {
        mensagem = '💫 Continue estudando! Você consegue!';
    }
    
    elPergunta.innerHTML = `
        <div class="resultado-final">
            ${mensagem}
            <span class="destaque-nota">${pontos} / ${totalPontos} pontos</span>
        </div>
    `;
    
    btnAcao.textContent = 'Jogar Novamente 🔄';
    btnAcao.classList.remove('escondido');
    btnAcao.onclick = () => {
        btnAcao.onclick = null;
        iniciar();
    };
}

// Inicia ao carregar
iniciar();