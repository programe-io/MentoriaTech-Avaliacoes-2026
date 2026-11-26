const form = document.getElementById("imc-form");
const nomeInput = document.getElementById("nome");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");
const erroMsg = document.getElementById("erro-msg");
const btnLimpar = document.getElementById("btn-limpar");

const resultadoSection = document.getElementById("resultado");
const pacienteNomeEl = document.getElementById("paciente-nome");
const imcValorEl = document.getElementById("imc-valor");
const badgeEl = document.getElementById("classificacao-badge");
const resPesoEl = document.getElementById("res-peso");
const resAlturaEl = document.getElementById("res-altura");
const resFaixaIdealEl = document.getElementById("res-faixa-ideal");
const imcDescricaoEl = document.getElementById("imc-descricao");

function classificarIMC(imc) {
  if (imc < 18.5) {
    return {
      categoria: "Abaixo do peso",
      classeCSS: "baixo",
      descricao:
        "O IMC está abaixo da faixa considerada saudável para adultos. Pode indicar baixo peso constitucional ou necessidade de avaliação nutricional e médica para investigar deficiências alimentares ou condições associadas."
    };
  }
  if (imc < 25) {
    return {
      categoria: "Peso normal",
      classeCSS: "normal",
      descricao:
        "O IMC encontra-se dentro da faixa de referência para adultos. Manter alimentação equilibrada, hidratação adequada e prática regular de atividade física ajuda a preservar esse quadro."
    };
  }
  if (imc < 30) {
    return {
      categoria: "Sobrepeso",
      classeCSS: "sobrepeso",
      descricao:
        "O IMC indica excesso de peso em relação à altura. Pequenos ajustes na rotina alimentar e aumento gradual de atividade física podem reduzir riscos metabólicos futuros."
    };
  }
  if (imc < 35) {
    return {
      categoria: "Obesidade Grau I",
      classeCSS: "obesidade-1",
      descricao:
        "O IMC aponta obesidade de grau I. Recomenda-se acompanhamento multiprofissional (médico e nutricionista) para avaliar pressão arterial, glicemia, perfil lipídico e plano de cuidado."
    };
  }
  if (imc < 40) {
    return {
      categoria: "Obesidade Grau II",
      classeCSS: "obesidade-2",
      descricao:
        "O IMC indica obesidade de grau II, com maior risco para comorbidades cardiovasculares e metabólicas. O acompanhamento clínico contínuo é fundamental."
    };
  }
  return {
    categoria: "Obesidade Grau III",
    classeCSS: "obesidade-3",
    descricao:
      "O IMC indica obesidade de grau III. É importante buscar acompanhamento médico e nutricional especializado para avaliação abrangente de saúde e definição de estratégia segura."
  };
}

function validarEntradas(nome, peso, altura) {
  if (!nome.trim()) {
    return "Por favor, informe o nome do paciente.";
  }
  if (Number.isNaN(peso) || peso <= 0 || peso > 500) {
    return "Informe um peso válido em kg (entre 1 e 500).";
  }
  if (Number.isNaN(altura) || altura <= 0 || altura > 3) {
    return "Informe uma altura válida em metros, ex.: 1.70 (entre 0,30 e 3,00).";
  }
  return "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = nomeInput.value.trim();
  const peso = parseFloat(pesoInput.value.replace(",", "."));
  const altura = parseFloat(alturaInput.value.replace(",", "."));

  const erro = validarEntradas(nome, peso, altura);
  if (erro) {
    erroMsg.textContent = erro;
    resultadoSection.classList.add("hidden");
    return;
  }

  erroMsg.textContent = "";

  const imc = peso / (altura * altura);
  const info = classificarIMC(imc);

  // Peso saudável correspondente a IMC 18.5 e 24.9 para a altura informada
  const pesoMinIdeal = (18.5 * altura * altura).toFixed(1).replace(".", ",");
  const pesoMaxIdeal = (24.9 * altura * altura).toFixed(1).replace(".", ",");

  pacienteNomeEl.textContent = nome;
  imcValorEl.textContent = imc.toFixed(1).replace(".", ",");

  badgeEl.textContent = info.categoria;
  badgeEl.className = `badge ${info.classeCSS}`;

  resPesoEl.textContent = `${peso.toFixed(1).replace(".", ",")} kg`;
  resAlturaEl.textContent = `${altura.toFixed(2).replace(".", ",")} m`;
  resFaixaIdealEl.textContent = `${pesoMinIdeal} a ${pesoMaxIdeal} kg`;
  imcDescricaoEl.textContent = info.descricao;

  resultadoSection.classList.remove("hidden");
});

btnLimpar.addEventListener("click", () => {
  form.reset();
  erroMsg.textContent = "";
  resultadoSection.classList.add("hidden");
  nomeInput.focus();
});