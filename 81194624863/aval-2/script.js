
const perguntas = [
  {
    pergunta: "1. O que significa CPU?",
    opcoes: [
      "Central de Processamento Universal",
      "Unidade Central de Processamento",
      "Controle Pessoal Universal",
      "Computador Pessoal Único"
    ],
    correta: 1
  },
  {
    pergunta: "2. Qual componente armazena arquivos?",
    opcoes: ["Memória RAM", "Processador", "SSD ou HD", "Monitor"],
    correta: 2
  },
  {
    pergunta: "3. Para que serve um navegador?",
    opcoes: ["Acessar sites", "Editar hardware", "Carregar bateria", "Limpar teclado"],
    correta: 0
  },
  {
    pergunta: "4. Qual é um sistema operacional?",
    opcoes: ["YouTube", "Google", "Windows", "WhatsApp"],
    correta: 2
  },
  {
    pergunta: "5. O que é phishing?",
    opcoes: [
      "Um jogo",
      "Uma fraude para roubar dados",
      "Um navegador",
      "Um monitor"
    ],
    correta: 1
  },
  {
    pergunta: "6. Qual senha é mais segura?",
    opcoes: ["123456", "senha", "meunome", "T9!vQ2#pL8@z"],
    correta: 3
  },
  {
    pergunta: "7. O que é backup?",
    opcoes: [
      "Apagar arquivos",
      "Criar uma cópia de segurança",
      "Desligar o computador",
      "Excluir senhas"
    ],
    correta: 1
  },
  {
    pergunta: "8. Qual é um dispositivo de entrada?",
    opcoes: ["Monitor", "Impressora", "Teclado", "Alto-falante"],
    correta: 2
  },
  {
    pergunta: "9. O que é computação em nuvem?",
    opcoes: [
      "Usar servidores remotos para dados e serviços",
      "Um teclado especial",
      "Um cabo de energia",
      "Uma impressora"
    ],
    correta: 0
  },
  {
    pergunta: "10. Como se proteger em uma rede Wi-Fi pública?",
    opcoes: [
      "Compartilhar senhas",
      "Abrir todos os links",
      "Desativar a segurança",
      "Evitar operações sensíveis e verificar a conexão"
    ],
    correta: 3
  }
];

const area = document.getElementById("perguntas");

if (area) {
  perguntas.forEach((q, i) => {
    const bloco = document.createElement("div");
    bloco.className = "questao";

    const titulo = document.createElement("h3");
    titulo.textContent = q.pergunta;
    bloco.appendChild(titulo);

    q.opcoes.forEach((opcao, j) => {
      const label = document.createElement("label");
      label.className = "opcao";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "pergunta" + i;
      radio.value = j;

      label.appendChild(radio);
      label.appendChild(document.createTextNode(" " + opcao));
      bloco.appendChild(label);
    });

    area.appendChild(bloco);
  });
}

function corrigirAvaliacao() {
  const nome = document.getElementById("aluno");
  const resultado = document.getElementById("resultado");
  const notaElemento = document.getElementById("nota");
  const detalhes = document.getElementById("detalhes");

  if (!resultado || !notaElemento) {
    alert("Verifique se o HTML possui os elementos resultado e nota.");
    return;
  }

  if (nome && nome.value.trim() === "") {
    alert("Digite o nome do aluno antes de corrigir.");
    nome.focus();
    return;
  }

  let acertos = 0;
  let explicacao = "";

  perguntas.forEach((q, i) => {
    const resposta = document.querySelector(
      'input[name="pergunta' + i + '"]:checked'
    );

    const acertou = resposta &&
      Number(resposta.value) === q.correta;

    if (acertou) acertos++;

    explicacao +=
      "<p><strong>" + q.pergunta + "</strong><br>" +
      (acertou ? "✅ Resposta correta!" : "❌ Resposta incorreta ou em branco.") +
      "<br>Resposta certa: " + q.opcoes[q.correta] +
      "</p>";
  });

  notaElemento.textContent = acertos.toFixed(1) + " / 10";

  const mensagem = document.getElementById("mensagem");
  if (mensagem) {
    mensagem.textContent =
      "Aluno: " + (nome ? nome.value.trim() : "Não informado") +
      " | Acertos: " + acertos + " de 10" +
      " | Aproveitamento: " + (acertos * 10) + "%";
  }

  if (detalhes) {
    detalhes.innerHTML = explicacao;
  }

  resultado.style.display = "block";
  resultado.scrollIntoView({ behavior: "smooth" });
}

const botao = document.getElementById("corrigir");

if (botao) {
  botao.addEventListener("click", corrigirAvaliacao);
}
