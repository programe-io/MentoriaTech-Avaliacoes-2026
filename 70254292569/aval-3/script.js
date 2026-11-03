const perguntas = [
    {
        pergunta: "Qual é o personagem principal do Mario?",
        respostas: ["Luigi", "Mario", "Yoshi"],
        correta: "Mario"
    },
    {
        pergunta: "Qual empresa criou o PlayStation?",
        respostas: ["Nintendo", "Sony", "Microsoft"],
        correta: "Sony"
    },
    {
        pergunta: "Qual jogo tem blocos para construir?",
        respostas: ["Minecraft", "FIFA", "Free Fire"],
        correta: "Minecraft"
    }
];

let perguntaAtual = 0;
let pontos = 0;

const pergunta = document.getElementById("pergunta");
const respostas = document.getElementById("respostas");
const pontuacao = document.getElementById("pontuacao");
const botaoComecar = document.getElementById("comecar");
const botaoProximo = document.getElementById("proximo");

function iniciarJogo() {
    perguntaAtual = 0;
    pontos = 0;

    botaoComecar.style.display = "none";
    botaoProximo.style.display = "none";

    mostrarPergunta();
}

function mostrarPergunta() {
    respostas.innerHTML = "";
    pontuacao.textContent = "Pontos: " + pontos;

    if (perguntaAtual >= perguntas.length) {
        pergunta.textContent = "Fim do jogo! Você fez " + pontos + " pontos!";
        botaoProximo.style.display = "none";
        botaoComecar.textContent = "Jogar novamente";
        botaoComecar.style.display = "inline-block";
        return;
    }

    pergunta.textContent = perguntas[perguntaAtual].pergunta;

    perguntas[perguntaAtual].respostas.forEach(function(resposta) {
        const botao = document.createElement("button");
        botao.textContent = resposta;

        botao.addEventListener("click", function() {
            verificarResposta(resposta);
        });

        respostas.appendChild(botao);
    });
}

function verificarResposta(respostaEscolhida) {
    const correta = perguntas[perguntaAtual].correta;

    if (respostaEscolhida === correta) {
        pontos++;
        alert("Resposta correta!");
    } else {
        alert("Resposta errada! A resposta certa era " + correta);
    }

    document.querySelectorAll("#respostas button").forEach(function(botao) {
        botao.disabled = true;
    });

    pontuacao.textContent = "Pontos: " + pontos;
    botaoProximo.style.display = "inline-block";
}

function proximaPergunta() {
    perguntaAtual++;
    botaoProximo.style.display = "none";
    mostrarPergunta();
}

botaoComecar.addEventListener("click", iniciarJogo);
botaoProximo.addEventListener("click", proximaPergunta);