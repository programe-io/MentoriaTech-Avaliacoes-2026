const form = document.getElementById("form-imc");
const btnLimpar = document.getElementById("btn-limpar");
const mensagemErro = document.getElementById("mensagem-erro");
const resultadoSection = document.getElementById("resultado");

const resNome = document.getElementById("res-nome");
const resMedidas = document.getElementById("res-medidas");
const resImc = document.getElementById("res-imc");
const resBadge = document.getElementById("res-badge");
const resObservacao = document.getElementById("res-observacao");
const resFaixaPeso = document.getElementById("res-faixa-peso");

const CLASSES_STATUS = [
  "status-baixo",
  "status-normal",
  "status-sobrepeso",
  "status-obesidade1",
  "status-obesidade2",
  "status-obesidade3",
];

function parseNumeroBR(valorTexto) {
  const normalizado = valorTexto.trim().replace(",", ".");
  if (!normalizado) return NaN;
  return Number(normalizado);
}

function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificarIMC(imc) {
  if (imc < 18.5) {
    return {
      categoria: "Abaixo do peso",
      observacao: "Atenção: o índice está abaixo da faixa recomendada para adultos.",
      classeStatus: "status-baixo",
    };
  }
  if (imc < 25.0) {
    return {
      categoria: "Peso normal",
      observacao: "O índice está dentro da faixa considerada saudável para adultos.",
      classeStatus: "status-normal",
    };
  }
  if (imc < 30.0) {
    return {
      categoria: "Sobrepeso",
      observacao: "Atenção: o índice indica excesso de peso leve/moderado.",
      classeStatus: "status-sobrepeso",
    };
  }
  if (imc < 35.0) {
    return {
      categoria: "Obesidade grau I",
      observacao: "Alerta: recomenda-se acompanhamento nutricional e médico.",
      classeStatus: "status-obesidade1",
    };
  }
  if (imc < 40.0) {
    return {
      categoria: "Obesidade grau II",
      observacao: "Alerta elevado: recomenda-se acompanhamento multiprofissional.",
      classeStatus: "status-obesidade2",
    };
  }
  return {
    categoria: "Obesidade grau III",
    observacao: "Alerta grave: procure orientação médica especializada.",
    classeStatus: "status-obesidade3",
  };
}

function mostrarErro(texto) {
  mensagemErro.textContent = texto;
  mensagemErro.classList.remove("oculto");
  resultadoSection.classList.add("oculto");
}

function esconderErro() {
  mensagemErro.textContent = "";
  mensagemErro.classList.add("oculto");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  esconderErro();

  const nome = document.getElementById("nome").value.trim();
  const peso = parseNumeroBR(document.getElementById("peso").value);
  const altura = parseNumeroBR(document.getElementById("altura").value);

  if (!nome) {
    mostrarErro("Por favor, informe o nome do paciente.");
    return;
  }

  if (!Number.isFinite(peso) || peso <= 0 || peso > 500) {
    mostrarErro("Digite um peso válido em kg (maior que 0).");
    return;
  }

  if (!Number.isFinite(altura) || altura <= 0 || altura > 3) {
    mostrarErro("Digite uma altura válida em metros, ex.: 1,70.");
    return;
  }

  const imc = calcularIMC(peso, altura);
  const info = classificarIMC(imc);
  const pesoMin = (18.5 * altura * altura).toFixed(1).replace(".", ",");
  const pesoMax = (24.9 * altura * altura).toFixed(1).replace(".", ",");

  resultadoSection.classList.remove(...CLASSES_STATUS);
  resultadoSection.classList.add(info.classeStatus);

  resNome.textContent = nome;
  resMedidas.textContent = `Peso: ${peso.toFixed(1).replace(".", ",")} kg • Altura: ${altura
    .toFixed(2)
    .replace(".", ",")} m`;
  resImc.textContent = imc.toFixed(2).replace(".", ",");
  resBadge.textContent = info.categoria;
  resObservacao.textContent = info.observacao;
  resFaixaPeso.textContent = `${pesoMin} kg a ${pesoMax} kg`;

  resultadoSection.classList.remove("oculto");
});

btnLimpar.addEventListener("click", () => {
  form.reset();
  esconderErro();
  resultadoSection.classList.add("oculto");
  document.getElementById("nome").focus();
});