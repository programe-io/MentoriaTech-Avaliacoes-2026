const perguntas = [
    {
        pergunta: "Quanto tempo uma garrafa PET leva para se decompor na natureza?",
        opcoes: ["Aproximadamente 10 anos", "Cerca de 100 anos", "Mais de 400 anos", "1000 anos"],
        correta: 2
    },
    {
        pergunta: "Qual das opções é uma fonte de energia renovável?",
        opcoes: ["Carvão mineral", "Energia Solar", "Petróleo", "Gás Natural"],
        correta: 1
    },
    {
        pergunta: "O que significa a regra dos 3 R's da sustentabilidade?",
        opcoes: ["Reciclar, Reorganizar, Recuperar", "Reduzir, Reutilizar, Reciclar", "Refazer, Recolher, Resgatar", "Reter, Reformar, Renovado"],
        correta: 1
    }
];

let indiceAtual = 0;
let pontuacao = 0;

function carregarPergunta() {
    const q = perguntas[indiceAtual];
    document.getElementById("pergunta").innerText = q.pergunta;
    
    const containerOpcoes = document.getElementById("opcoes");
    containerOpcoes.innerHTML = "";

    q.opcoes.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.innerText = opcao;
        btn.onclick = () => verificarResposta(index);
        containerOpcoes.appendChild(btn);
    });
}

function verificarResposta(selecionada) {
    if (selecionada === perguntas[indiceAtual].correta) {
        pontuacao++;
    }

    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById("quiz").classList.add("escondido");
    document.getElementById("resultado").classList.remove("escondido");
    
    const msg = document.getElementById("mensagem-final");
    msg.innerText = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
}

function reiniciarQuiz() {
    indiceAtual = 0;
    pontuacao = 0;
    document.getElementById("resultado").classList.add("escondido");
    document.getElementById("quiz").classList.remove("escondido");
    carregarPergunta();
}

// Inicializa a primeira pergunta
carregarPergunta();