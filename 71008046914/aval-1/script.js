const perguntas = [
    {
        pergunta: "O intercâmbio da SEDUC tem como objetivo principal:",
        opcoes: [
            "Passeio turístico",
            "Desenvolvimento educacional e cultural",
            "Jogos esportivos",
            "Férias escolares"
        ],
        correta: 1
    },
    {
        pergunta: "Como os alunos são selecionados?",
        opcoes: [
            "Sorteio aleatório",
            "Bom desempenho escolar e provas",
            "Indicação de amigos",
            "Compra de vaga"
        ],
        correta: 1
    },
    {
        pergunta: "O intercâmbio ajuda o estudante a:",
        opcoes: [
            "Aprender novos idiomas e culturas",
            "Ficar fora da escola",
            "Jogar videogame",
            "Evitar estudar"
        ],
        correta: 0
    },
    {
        pergunta: "Quem organiza o programa?",
        opcoes: [
            "SEDUC",
            "Clubes esportivos",
            "Empresas privadas de jogos",
            "Redes sociais"
        ],
        correta: 0
    }
];

let atual = 0;
let pontos = 0;

// elementos do HTML
const perguntaEl = document.getElementById("pergunta");
const pontosEl = document.getElementById("pontos");

// sons (opcional)
const somAcerto = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
const somErro = new Audio("https://www.soundjay.com/buttons/sounds/button-10.mp3");

// iniciar quiz
function iniciar() {
    atual = 0;
    pontos = 0;
    pontosEl.textContent = pontos;
    mostrarPergunta();
}

// mostrar pergunta
function mostrarPergunta() {
    if (atual >= perguntas.length) {
        perguntaEl.textContent = "🎉 Fim do quiz! Sua pontuação foi: " + pontos;
        return;
    }

    let q = perguntas[atual];

    perguntaEl.innerHTML = `
        <strong>${q.pergunta}</strong><br><br>
        A) ${q.opcoes[0]}<br>
        B) ${q.opcoes[1]}<br>
        C) ${q.opcoes[2]}<br>
        D) ${q.opcoes[3]}
    `;
}

// responder
function responder(opcao) {
    if (perguntas[atual].correta === opcao) {
        pontos++;
        somAcerto.play();
        alert("✔ Resposta correta!");
    } else {
        somErro.play();
        alert("❌ Resposta errada!");
    }

    pontosEl.textContent = pontos;
    atual++;
    mostrarPergunta();
}