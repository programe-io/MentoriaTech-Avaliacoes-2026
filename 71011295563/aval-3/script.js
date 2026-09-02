const bancoQuestoes = [
    {
        pergunta: "Você recebe uma notícia impressionante no WhatsApp sem fonte. O que deve fazer primeiro?",
        opcoes: [
            "Compartilhar imediatamente com os amigos",
            "Checar em sites de notícias confiáveis antes de enviar",
            "Ignorar totalmente e deletar o aplicativo",
            "Comentar na publicação dizendo que é verdade"
        ],
        correta: 1,
        explicacao: "💡 Sempre verifique a informação em veículos de comunicação confiáveis antes de repassar qualquer notícia."
    },
    {
        pergunta: "Qual das opções abaixo é uma boa prática para criar uma senha segura?",
        opcoes: [
            "Usar '123456' ou a data de aniversário",
            "Anotar a senha em um papel na mesa de estudos",
            "Misturar letras maiúsculas, minúsculas, números e símbolos",
            "Usar a mesma senha simples para todas as contas"
        ],
        correta: 2,
        explicacao: "💡 Senhas fortes combinam caracteres variados para dificultar o acesso de invasores."
    },
    {
        pergunta: "O que caracteriza a prática de Cyberbullying?",
        opcoes: [
            "Enviar uma mensagem de parabéns a um colega",
            "Usar a internet para humilhar, perseguir ou ofender alguém",
            "Jogar partidas online com amigos da escola",
            "Pesquisar sobre matérias escolares na internet"
        ],
        correta: 1,
        explicacao: "💡 O Cyberbullying envolve agressões intencionais e repetidas praticadas por meio de tecnologias digitais."
    }
];

let indice = 0;
let pontos = 0;

// Revela a área do quiz e rola suavemente até ela
function iniciarQuiz() {
    const secaoQuiz = document.getElementById("quiz-anchor");
    secaoQuiz.classList.remove("escondido");
    secaoQuiz.scrollIntoView({ behavior: 'smooth' });
    carregarQuestao();
}

function carregarQuestao() {
    const q = bancoQuestoes[indice];
    document.getElementById("contador").innerText = `Pergunta ${indice + 1}/${bancoQuestoes.length}`;
    document.getElementById("pergunta").innerText = q.pergunta;
    
    const container = document.getElementById("opcoes");
    container.innerHTML = "";
    document.getElementById("feedback").classList.add("escondido");

    q.opcoes.forEach((opcao, idx) => {
        const btn = document.createElement("button");
        btn.innerText = opcao;
        btn.onclick = () => selecionarResposta(idx, btn);
        container.appendChild(btn);
    });
}

function selecionarResposta(indiceSelecionado, botaoClicado) {
    const q = bancoQuestoes[indice];
    const todosBotoes = document.querySelectorAll("#opcoes button");
    
    todosBotoes.forEach(b => b.disabled = true);

    if (indiceSelecionado === q.correta) {
        botaoClicado.classList.add("correta");
        pontos += 10;
        document.getElementById("pontuacao-atual").innerText = `Pontos: ${pontos}`;
    } else {
        botaoClicado.classList.add("incorreta");
        todosBotoes[q.correta].classList.add("correta");
    }

    document.getElementById("texto-explicacao").innerText = q.explicacao;
    document.getElementById("feedback").classList.remove("escondido");
}

function proximaPergunta() {
    indice++;
    if (indice < bancoQuestoes.length) {
        carregarQuestao();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    document.getElementById("quiz-body").classList.add("escondido");
    document.getElementById("feedback").classList.add("escondido");
    document.getElementById("quiz-header").classList.add("escondido");
    
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.classList.remove("escondido");
    
    document.getElementById("mensagem-final").innerText = 
        `Parabéns! Você somou ${pontos} pontos de um total de ${bancoQuestoes.length * 10} possíveis!`;
}

function reiniciarQuiz() {
    indice = 0;
    pontos = 0;
    document.getElementById("pontuacao-atual").innerText = `Pontos: 0`;
    document.getElementById("quiz-body").classList.remove("escondido");
    document.getElementById("quiz-header").classList.remove("escondido");
    document.getElementById("resultado").classList.add("escondido");
    carregarQuestao();
}