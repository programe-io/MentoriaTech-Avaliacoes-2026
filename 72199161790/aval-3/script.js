// Lista para armazenar os pacientes avaliados
let pacientes = [];

// Elementos do DOM
const formImc = document.getElementById("form-imc");
const erroEl = document.getElementById("erro");
const cardResultado = document.getElementById("card-resultado");
const infoResultado = document.getElementById("info-resultado");
const tabelaPacientes = document.getElementById("tabela-pacientes");
const listaVazia = document.getElementById("lista-vazia");
const btnLimpar = document.getElementById("btn-limpar");

// Classifica o IMC segundo a tabela padrão da OMS
function classificarIMC(imc) {
  if (imc < 18.5) {
    return {
      texto: "Abaixo do peso",
      classe: "imc-baixo",
      orientacao: "Atenção: o índice está abaixo da faixa considerada ideal.",
    };
  } else if (imc < 25) {
    return {
      texto: "Peso normal",
      classe: "imc-normal",
      orientacao: "Parabéns! O índice está dentro da faixa considerada saudável.",
    };
  } else if (imc < 30) {
    return {
      texto: "Sobrepeso",
      classe: "imc-sobrepeso",
      orientacao: "Atenção: o índice indica sobrepeso em relação à altura.",
    };
  } else if (imc < 35) {
    return {
      texto: "Obesidade Grau I",
      classe: "imc-obesidade",
      orientacao: "Alerta: índice compatível com obesidade grau I.",
    };
  } else if (imc < 40) {
    return {
      texto: "Obesidade Grau II",
      classe: "imc-obesidade",
      orientacao: "Alerta: índice compatível com obesidade grau II.",
    };
  } else {
    return {
      texto: "Obesidade Grau III",
      classe: "imc-obesidade",
      orientacao: "Alerta: índice compatível com obesidade grau III.",
    };
  }
}

// Evento de envio do formulário
formImc.addEventListener("submit", function (evento) {
  evento.preventDefault();
  erroEl.textContent = "";

  const nome = document.getElementById("nome").value.trim();
  const peso = Number(document.getElementById("peso").value);
  const altura = Number(document.getElementById("altura").value);

  // Validações básicas
  if (nome.length < 2) {
    erroEl.textContent = "Por favor, informe um nome válido para o paciente.";
    return;
  }

  if (peso <= 0 || altura <= 0) {
    erroEl.textContent = "Peso e altura devem ser maiores que zero.";
    return;
  }

  // Cálculo do IMC: peso / (altura * altura)
  const imc = peso / (altura * altura);
  const classificacao = classificarIMC(imc);

  const registro = {
    nome,
    peso,
    altura,
    imc,
    classificacao,
  };

  pacientes.push(registro);

  exibirResultadoAtual(registro);
  atualizarTabela();
  formImc.reset();
});

// Exibe o card com as informações completas do paciente recém-calculado
function exibirResultadoAtual(paciente) {
  cardResultado.classList.remove("resultado-oculto");

  infoResultado.innerHTML = `
    <p><strong>Paciente:</strong> ${paciente.nome}</p>
    <p><strong>Dados informados:</strong> ${paciente.peso.toFixed(1)} kg | ${paciente.altura.toFixed(2)} m</p>
    <p><strong>IMC Calculado:</strong> <span class="valor-imc">${paciente.imc.toFixed(2)}</span></p>
    <p><strong>Classificação:</strong> <span class="tag ${paciente.classificacao.classe}">${paciente.classificacao.texto}</span></p>
    <p style="margin-top: 8px; color: #4b5563;">${paciente.classificacao.orientacao}</p>
  `;
}

// Atualiza a tabela de histórico na tela
function atualizarTabela() {
  tabelaPacientes.innerHTML = "";

  if (pacientes.length === 0) {
    listaVazia.style.display = "block";
    return;
  }

  listaVazia.style.display = "none";

  pacientes.forEach((p) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${p.nome}</td>
      <td>${p.peso.toFixed(1)} kg</td>
      <td>${p.altura.toFixed(2)} m</td>
      <td><strong>${p.imc.toFixed(2)}</strong></td>
      <td><span class="tag ${p.classificacao.classe}">${p.classificacao.texto}</span></td>
    `;
    tabelaPacientes.appendChild(linha);
  });
}

// Limpa o histórico de pacientes
btnLimpar.addEventListener("click", function () {
  pacientes = [];
  cardResultado.classList.add("resultado-oculto");
  atualizarTabela();
});