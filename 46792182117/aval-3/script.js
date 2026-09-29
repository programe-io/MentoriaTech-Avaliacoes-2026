// =============================================
// BANCO DE PERGUNTAS — ENEM (10 questões)
// =============================================
const perguntas = [
    {
        materia: "📖 Linguagens e Códigos",
        pergunta: "Na linguagem informal, é comum o uso de expressões como 'cara, beleza?'. Em relação à norma-padrão da língua portuguesa, essa prática demonstra:",
        respostas: [
            { texto: "Desvio que revela incapacidade de escrita.", correta: false },
            { texto: "Variação linguística natural do uso da língua.", correta: true },
            { texto: "Erro gramatical que deve ser corrigido sempre.", correta: false },
            { texto: "Falta de escolaridade do falante.", correta: false }
        ]
    },
    {
        materia: "📖 Linguagens e Códigos",
        pergunta: "Assinale a alternativa em que a concordância verbal está CORRETA:",
        respostas: [
            { texto: "Fazem dois anos que não viajo.", correta: false },
            { texto: "Houveram muitos problemas na reunião.", correta: false },
            { texto: "Existem várias soluções para o caso.", correta: true },
            { texto: "Aluga-se casas neste bairro.", correta: false }
        ]
    },
    {
        materia: "🌍 Ciências Humanas",
        pergunta: "A independência do Brasil, proclamada em 1822, foi influenciada por diversos fatores. Dentre eles, destaca-se:",
        respostas: [
            { texto: "A vontade das massas populares de acabar com a monarquia.", correta: false },
            { texto: "A pressão da Inglaterra para que o Brasil se tornasse colônia.", correta: false },
            { texto: "O enfraquecimento da metrópole e os interesses da elite brasileira.", correta: true },
            { texto: "A invasão napoleônica que já havia libertado outras colônias.", correta: false }
        ]
    },
    {
        materia: "🌍 Ciências Humanas",
        pergunta: "O aquecimento global é um fenômeno climático causado principalmente pela:",
        respostas: [
            { texto: "Libertação de gases de efeito estufa pela atividade humana.", correta: true },
            { texto: "Proximidade da Lua com a Terra.", correta: false },
            { texto: "Erupção de vulcões no fundo dos oceanos.", correta: false },
            { texto: "Diminuição da quantidade de raios solares.", correta: false }
        ]
    },
    {
        materia: "🔬 Ciências da Natureza",
        pergunta: "Os seres produtores de um ecossistema são aqueles que:",
        respostas: [
            { texto: "Se alimentam de outros seres vivos.", correta: false },
            { texto: "Realizam a decomposição da matéria orgânica.", correta: false },
            { texto: "Produzem seu próprio alimento através da fotossíntese.", correta: true },
            { texto: "Vivem em simbiose com os fungos.", correta: false }
        ]
    },
    {
        materia: "🔬 Ciências da Natureza",
        pergunta: "Um corpo tem massa de 10 kg e é acelerado a 5 m/s². Qual é a força aplicada sobre ele?",
        respostas: [
            { texto: "2 N", correta: false },
            { texto: "15 N", correta: false },
            { texto: "50 N", correta: true },
            { texto: "0,5 N", correta: false }
        ]
    },
    {
        materia: "🔬 Ciências da Natureza",
        pergunta: "Na tabela periódica, os elementos estão dispostos em ordem crescente de:",
        respostas: [
            { texto: "Massa atômica.", correta: false },
            { texto: "Número atômico.", correta: true },
            { texto: "Eletronegatividade.", correta: false },
            { texto: "Ponto de fusão.", correta: false }
        ]
    },
    {
        materia: "📐 Matemática",
        pergunta: "Se um produto custa R$ 200,00 e recebe um desconto de 15%, qual será o novo preço?",
        respostas: [
            { texto: "R$ 170,00", correta: true },
            { texto: "R$ 185,00", correta: false },
            { texto: "R$ 150,00", correta: false },
            { texto: "R$ 160,00", correta: false }
        ]
    },
    {
        materia: "📐 Matemática",
        pergunta: "Qual é a raiz da equação 2x - 6 = 0?",
        respostas: [
            { texto: "x = 2", correta: false },
            { texto: "x = 3", correta: true },
            { texto: "x = 6", correta: false },
            { texto: "x = -3", correta: false }
        ]
    },
    {
        materia: "📐 Matemática",
        pergunta: "Um triângulo tem base 1 cm e altura 8 cm. Sua área é:",
        respostas: [
            { texto: "88 cm²", correta: false },
            { texto: "44 cm²", correta: true },
            { texto: "19 cm²", correta: false },
            { texto: "22 cm²", correta: false }
        ]
    }
];

// =============================================
// VARIÁVEIS ELEMENTOS DA TELA
// =============================================
const elementoMateria = document.getElementById('nome-materia');
const elementoPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const btnProximo = document.getElementById('btn-proximo');
const displayPontos = document.getElementById('pontos');
const contadorPerguntas = document.getElementById('contador-perguntas');
const barraProgresso = document.getElementById('preencher-progresso');

let indicePerguntaAtual = 0;
let pontos = 0;

// =============================================
// FUNÇÕES PRINCIPAIS
// =============================================
function iniciarQuiz() {
    indicePerguntaAtual = 0;
    pontos = 0;
    displayPontos.textContent = pontos;
    btnProximo.textContent = "Próxima ➔";
    btnProximo.classList.add('escondido');
    mostrarPergunta();
}

function mostrarPergunta() {
    limparEstado();
    
    const perguntaAtual = perguntas[indicePerguntaAtual];
    
    // Atualiza matéria, pergunta e contador
    elementoMateria.textContent = perguntaAtual.materia;
    elementoPergunta.textContent = perguntaAtual.pergunta;
    contadorPerguntas.textContent = `${indicePerguntaAtual + 1} / ${perguntas.length}`;
    
    // Atualiza barra de progresso
    barraProgresso.style.width = `${((indicePerguntaAtual + 1) / perguntas.length) * 100}%`;
    
    // Cria botões de resposta
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
        pontos += 10;
        displayPontos.textContent = pontos;
    } else {
        botaoSelecionado.classList.add('errado');
    }
    
    // Mostra a correta e bloqueia escolhas
    Array.from(caixaOpcoes.children).forEach(botao => {
        if (botao.dataset.correta === "true") {
            botao.classList.add('correto');
        }
        botao.disabled = true;
    });
    
    btnProximo.classList.remove('escondido');
}

// =============================================
// NAVEGAÇÃO E RESULTADO
// =============================================
btnProximo.addEventListener('click', () => {
    indicePerguntaAtual++;
    
    if (indicePerguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultadoFinal();
    }
});

function mostrarResultadoFinal() {
    limparEstado();
    
    const porcentagem = Math.round((pontos / (perguntas.length * 10)) * 100);
    let mensagem = "";
    
    if (porcentagem >= 90) {
        mensagem = "🏆 Excelente! Você está muito bem preparado(a)!";
    } else if (porcentagem >= 70) {
        mensagem = "👏 Muito bom! Continue praticando!";
    } else if (porcentagem >= 50) {
        mensagem = "📚 Bom esforço! Revise os conteúdos e tente novamente.";
    } else {
        mensagem = "💪 Não desista! Estude mais e você vai conseguir!";
    }
    
    elementoPergunta.innerHTML = `
        <div class="texto-resultado">
            ${mensagem}<br><br>
            <strong>Pontuação:</strong> ${pontos} de ${perguntas.length * 10} (${porcentagem}%)
        </div>
    `;
    
    elementoMateria.textContent = "Resultado Final";
    contadorPerguntas.textContent = "";
    barraProgresso.style.width = "100%";
    
    btnProximo.textContent = "Jogar Novamente 🔄";
    btnProximo.classList.remove('escondido');
    
    btnProximo.onclick = () => {
        btnProximo.onclick = null;
        iniciarQuiz();
    };
}

// =============================================
// INICIAR O QUIZ! 🚀
// =============================================
iniciarQuiz();