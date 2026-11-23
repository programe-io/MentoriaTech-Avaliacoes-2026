
// Capturando o formulário
const form = document.getElementById("formIMC");

// Evento de envio do formulário
form.addEventListener("submit", function(event) {

  event.preventDefault();

  // Recebendo os dados do paciente
  const nome = document.getElementById("nome").value.trim();

  const peso = Number(
    document.getElementById("peso").value.replace(",", ".")
  );

  let altura = Number(
    document.getElementById("altura").value.replace(",", ".")
  );

  // Elementos da tela
  const erro = document.getElementById("erro");
  const resultado = document.getElementById("resultado");

  // Limpando mensagens anteriores
  erro.textContent = "";
  resultado.style.display = "none";

  // Validando os dados
  if (
    nome === "" ||
    !Number.isFinite(peso) ||
    !Number.isFinite(altura) ||
    peso <= 0 ||
    altura <= 0
  ) {

    erro.textContent = "Preencha todos os campos corretamente!";
    return;

  }

  // Convertendo centímetros para metros
  if (altura > 3) {
    altura = altura / 100;
  }

  // Validando altura após conversão
  if (altura < 0.5 || altura > 2.5) {

    erro.textContent = "Informe uma altura válida.";
    return;

  }

  // Calculando o IMC
  const imc = peso / (altura * altura);

  let classificacao = "";
  let mensagem = "";

  // Identificando a classificação do IMC
  if (imc < 18.5) {

    classificacao = "Abaixo do peso";

    mensagem = "Seu IMC está abaixo da faixa de referência. Procure orientação de um profissional de saúde.";

  } else if (imc < 25) {

    classificacao = "Peso normal";

    mensagem = "Seu IMC está dentro da faixa de referência considerada adequada para adultos.";

  } else if (imc < 30) {

    classificacao = "Sobrepeso";

    mensagem = "Seu IMC está na faixa de sobrepeso. Um profissional de saúde pode orientar você.";

  } else if (imc < 35) {

    classificacao = "Obesidade grau I";

    mensagem = "Seu IMC está na faixa de obesidade grau I. Busque acompanhamento profissional.";

  } else if (imc < 40) {

    classificacao = "Obesidade grau II";

    mensagem = "Seu IMC está na faixa de obesidade grau II. É importante procurar orientação profissional.";

  } else {

    classificacao = "Obesidade grau III";

    mensagem = "Seu IMC está na faixa de obesidade grau III. Procure acompanhamento de um profissional de saúde.";

  }

  // Exibindo o nome do paciente
  document.getElementById("nomeResultado").textContent =
    "Paciente: " + nome;

  // Exibindo o valor do IMC
  document.getElementById("valorIMC").textContent =
    imc.toFixed(2).replace(".", ",");

  // Exibindo a classificação
  document.getElementById("classificacao").textContent =
    classificacao;

  // Exibindo a mensagem
  document.getElementById("mensagem").textContent =
    mensagem;

  // Mostrando o resultado na tela
  resultado.style.display = "block";

});
