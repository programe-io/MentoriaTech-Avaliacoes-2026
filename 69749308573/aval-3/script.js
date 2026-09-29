// Rodadas do jogo com Temas de Moda e opções de outfits
const rodadas = [
    {
        tema: "💃 Festa de Gala Elegante",
        respostas: [
            { texto: "👗 Vestido Longo de Seda com Salto Alto", correta: true },
            { texto: "🩳 Shorts Jeans e Camiseta Larga", correta: false },
            { texto: "🥋 Kimono de Karatê", correta: false },
            { texto: "🥾 Bota de Trilha e Jaqueta Corta-Vento", correta: false }
        ]
    },
    {
        tema: "🏖️ Dia de Verão na Praia",
        respostas: [
            { texto: "🧥 Casaco de Lã e Cachecol", correta: false },
            { texto: "👙 Biquíni/Sunga, Óculos de Sol e Chapéu", correta: true },
            { texto: "🐧 Fantasia Inflável de Pinguim", correta: false },
            { texto: "👔 Terno Completo com Gravata Borboleta", correta: false }
        ]
    },
    {
        tema: "🤖 Estilo Cyberpunk / Futuro",
        respostas: [
            { texto: "🧑‍🌾 Macacão Jeans de Fazendeiro", correta: false },
            { texto: "👑 Vestido Estilo Princesa Medieval", correta: false },
            { texto: "⚡ Jaqueta Neon de Couro e Óculos LED", correta: true },
            { texto: "🩴 Chinelo de Borracha e Pijama", correta: false }
        ]
    },
    {
        tema: "🧺 Piquenique de Primavera",
        respostas: [
            { texto: "👗 Vestido Floral Leve e Chapéu de Palha", correta: true },
            { texto: "🥷 Traje de Ninja Preto", correta: false },
            { texto: "🤿 Roupa de Mergulho Profissional", correta: false },
            { texto: "🦺 Colete Refletivo de Obras", correta: false }
        ]
    },
    {
        tema: "🎸 Show de Rock Pesado",
        respostas: [
            { texto: "🩰 Tutu de Balé Rosa Chiclete", correta: false },
            { texto: "🖤 Jaqueta de Couro Preta e Botas", correta: true },
            { texto: "🥼 Jaleco Branco de Médico", correta: false },
            { texto: "🎓 Túnica de Formatura", correta: false }
        ]
    }
];

// Elementos da Interface
const elementoTema = document.getElementById('tema-titulo');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const btnProximo = document.getElementById('btn-proximo');
const displayPontos = document.getElementById('pontos');

let indiceRodadaAtual = 0;
let pontos = 0;

function iniciarJogo() {
    indiceRodadaAtual = 0;
    pontos = 0;
    displayPontos.textContent = pontos;
    btnProximo.textContent = "Próxima Rodada ➔";
    btnProximo.classList.add('escondido');
    mostrarRodada();
}

function mostrarRodada() {
    limparEstado();
    
    let rodadaAtual = rodadas[indiceRodadaAtual];
    elementoTema.textContent = rodadaAtual.tema;

    rodadaAtual.respostas.forEach(resposta => {
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
    
    if (isCorreta) {
        botaoSelecionado.classList.add('correto');
        pontos += 5; // Adiciona 5 estrelas/pontos de fama
        displayPontos.textContent = pontos;
    } else {
        botaoSelecionado.classList.add('errado');
    }

    // Desativa botões e destaca a opção certa
    Array.from(caixaOpcoes.children).forEach(botao => {
        if (botao.dataset.correta === "true") {
            botao.classList.add('correto');
        }
        botao.disabled = true;
    });
    
    btnProximo.classList.remove('escondido');
}

btnProximo.addEventListener('click', () => {
    indiceRodadaAtual++;
    
    if (indiceRodadaAtual < rodadas.length) {
        mostrarRodada();
    } else {
        mostrarResultado();
    }
});

function mostrarResultado() {
    limparEstado();
    
    let mensagemFinal = "";
    let estrelas = "⭐".repeat(Math.min(5, Math.floor(pontos / 5)));

    if (pontos === 25) {
        mensagemFinal = "👑 TOP MODEL! Você arrasou em todos os temas!";
    } else if (pontos >= 15) {
        mensagemFinal = "✨ FASHIONISTA! Seu senso de estilo é incrível!";
    } else {
        mensagemFinal = "💅 AINDA APRENDENDO... Tente novamente para criar combinações melhores!";
    }

    document.getElementById('area-quiz').innerHTML = `
        <div style="padding: 20px 0;">
            <h2 style="color:#ff66c4; font-size:2rem; margin-bottom:10px;">Desfile Concluído!</h2>
            <div style="font-size:2.5rem; margin:15px 0;">${estrelas}</div>
            <p style="font-size:1.3rem; color:#fff; margin-bottom:15px;">${mensagemFinal}</p>
            <p style="font-size:1.1rem; color:#ccaaff;">Pontuação total: <strong>${pontos} pontos de Fama</strong></p>
        </div>
    `;

    btnProximo.textContent = "Novo Desfile 🔄";
    btnProximo.classList.remove('escondido');
    
    btnProximo.onclick = () => {
        location.reload(); // Recarrega a página para reiniciar o jogo de forma limpa
    };
}

// Inicia o jogo ao carregar
iniciarJogo();