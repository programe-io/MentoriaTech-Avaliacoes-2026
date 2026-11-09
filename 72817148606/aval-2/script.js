const perguntas = [
  {
    pergunta: "O que significa HTML?",
    opcoes: [
      "HyperText Markup Language",
      "High Text Machine Language",
      "Home Tool Markup Language"
    ],
    resposta: 0
  },
  {
    pergunta: "Qual linguagem estiliza páginas?",
    opcoes: ["Java", "CSS", "Python"],
    resposta: 1
  },
  {
    pergunta: "Qual linguagem adiciona interatividade?",
    opcoes: ["JavaScript", "HTML", "SQL"],
    resposta: 0
  }
];

let atual = 0;
let pontos = 0;
let respondeu = false;

function mostrar() {
  respondeu = false;

  const p = perguntas[atual];
  document.getElementById("pergunta").textContent = p.pergunta;

  const opcoes = document.getElementById("opcoes");
  opcoes.innerHTML = "";

  p.opcoes.forEach((opcao, i) => {
    const botao = document.createElement("button");
    botao.textContent = opcao;

    botao.onclick = () => responder(i);

    opcoes.appendChild(botao);
  });

  document.getElementById("resultado").textContent =
    "Pontuação: " + pontos;
}

function responder(escolha) {
  if (respondeu) return;
  respondeu = true;

  if (escolha === perguntas[atual].resposta) {
    pontos++;
    document.getElementById("resultado").textContent = "Resposta correta!";
  } else {
    document.getElementById("resultado").textContent = "Resposta incorreta!";
  }
}

function proxima() {
  if (!respondeu) {
    alert("Responda à pergunta primeiro!");
    return;
  }

  atual++;

  if (atual >= perguntas.length) {
    document.querySelector(".quiz").innerHTML =
      "<h1>Quiz finalizado!</h1><h2>Pontuação: " +
      pontos + "/" + perguntas.length + "</h2>";
    return;
  }

  mostrar();
}

mostrar();