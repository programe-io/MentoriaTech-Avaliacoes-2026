
const perguntas = [
    {
        pergunta: "O que é a Internet?",
        alternativas: [
            "Um sistema global de redes interligadas",
            "Um programa de computador",
            "Uma rede social",
            "Um navegador"
        ],
        correta: 0
    },
    {
        pergunta: "Em qual década surgiu a ARPANET?",
        alternativas: [
            "Década de 1980",
            "Década de 1960",
            "Década de 1990",
            "Década de 2000"
        ],
        correta: 1
    },
    {
        pergunta: "Qual era o principal objetivo da ARPANET?",
        alternativas: [
            "Criar redes sociais",
            "Desenvolver jogos",
            "Conectar centros de pesquisa",
            "Criar sites comerciais"
        ],
        correta: 2
    },
    {
        pergunta: "Qual infraestrutura transporta grande parte dos dados entre continentes?",
        alternativas: [
            "Antenas de televisão",
            "Cabos submarinos de fibra óptica",
            "Cabos de energia",
            "Satélites exclusivamente"
        ],
        correta: 1
    },
    {
        pergunta: "O que significa World Wide Web?",
        alternativas: [
            "Rede Mundial de Computadores",
            "Sistema Operacional",
            "Rede Mundial de Documentos",
            "Protocolo de Internet"
        ],
        correta: 2
    },
    {
        pergunta: "Quem criou a World Wide Web?",
        alternativas: [
            "Bill Gates",
            "Steve Jobs",
            "Tim Berners-Lee",
            "Mark Zuckerberg"
        ],
        correta: 2
    },
    {
        pergunta: "Qual é a função do HTML?",
        alternativas: [
            "Criar bancos de dados",
            "Estruturar páginas web",
            "Conectar cabos submarinos",
            "Proteger computadores"
        ],
        correta: 1
    },
    {
        pergunta: "O que significa HTTP?",
        alternativas: [
            "Hypertext Transfer Protocol",
            "High Technology Transfer Program",
            "Hyperlink Text Terminal",
            "Home Tool Transfer Protocol"
        ],
        correta: 0
    },
    {
        pergunta: "Qual é a função de um servidor?",
        alternativas: [
            "Apenas navegar na internet",
            "Armazenar e fornecer conteúdos",
            "Criar cabos de fibra óptica",
            "Substituir o navegador"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é a principal diferença entre Internet e Web?",
        alternativas: [
            "São exatamente iguais",
            "A Web é a infraestrutura física",
            "A Internet é uma rede social",
            "A Internet é a infraestrutura e a Web é um serviço que funciona sobre ela"
        ],
        correta: 3
    }
];

let indiceAtual = 0;
let pontos = 0;
let respondeu = false;

function iniciarJogo() {
    indiceAtual = 0;
    pontos = 0;

    document.getElementById("inicio").classList.add("escondido");
    document.getElementById("resultado").classList.add("escondido");
    document.getElementById("quiz").classList.remove("escondido");

    mostrarPergunta();
}

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[indiceAtual];

    document.getElementById("pergunta").textContent =
        atual.pergunta;

    document.getElementById("progresso").textContent =
        `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

    document.getElementById("pontuacao").textContent =
        `Pontos: ${pontos}`;

    document.getElementById("progresso-barra").style.width =
        `${((indiceAtual + 1) / perguntas.length) * 100}%`;

    document.getElementById("feedback").textContent = "";

    const area = document.getElementById("alternativas");

    area.innerHTML = "";

    document.getElementById("proximo").disabled = true;

    atual.alternativas.forEach((alternativa, indice) => {

        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.classList.add("alternativa");

        botao.onclick = () => verificarResposta(indice);

        area.appendChild(botao);

    });
}

function verificarResposta(escolha) {

    if (respondeu) return;

    respondeu = true;

    const atual = perguntas[indiceAtual];

    const botoes = document.querySelectorAll(".alternativa");

    botoes.forEach((botao, indice) => {

        botao.disabled = true;

        if (indice === atual.correta) {
            botao.classList.add("correta");
        }

        if (indice === escolha && escolha !== atual.correta) {
            botao.classList.add("errada");
        }

    });

    const feedback = document.getElementById("feedback");

    if (escolha === atual.correta) {

        pontos++;

        feedback.textContent = "✅ Muito bem! Resposta correta!";

        feedback.style.color = "#16a34a";

    } else {

        feedback.textContent = "❌ Resposta incorreta! Tente a próxima.";

        feedback.style.color = "#dc2626";

    }

    document.getElementById("pontuacao").textContent =
        `Pontos: ${pontos}`;

    document.getElementById("proximo").disabled = false;
}

function proximaPergunta() {

    indiceAtual++;

    if (indiceAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        finalizarJogo();

    }
}

function finalizarJogo() {

    document.getElementById("quiz").classList.add("escondido");

    document.getElementById("resultado").classList.remove("escondido");

    document.getElementById("pontuacao-final").textContent =
        `${pontos} de ${perguntas.length} pontos`;

    let mensagem;

    if (pontos === 10) {
        mensagem = "🏆 Excelente! Você domina o assunto!";
    } else if (pontos >= 7) {
        mensagem = "👏 Muito bem! Você conhece bastante sobre Internet e Web!";
    } else if (pontos >= 5) {
        mensagem = "👍 Bom trabalho! Continue estudando!";
    } else {
        mensagem = "📚 Continue aprendendo! Você consegue melhorar!";
    }

    document.getElementById("mensagem-final").textContent =
        mensagem;
}

function reiniciarJogo() {

    document.getElementById("resultado").classList.add("escondido");

    iniciarJogo();

}
