const formImc = document.getElementById("form-imc");
const nomeInput = document.getElementById("nome");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");
const btnLimpar = document.getElementById("btn-limpar");

const resultadoSection = document.getElementById("resultado");
const pacienteNomeEl = document.getElementById("paciente-nome");
const classificacaoBadgeEl = document.getElementById("classificacao-badge");
const imcValorEl = document.getElementById("imc-valor");
const pesoExibidoEl = document.getElementById("peso-exibido");
const alturaExibidaEl = document.getElementById("altura-exibida");
const faixaPesoIdealEl = document.getElementById("faixa-peso-ideal");
const observacaoImcEl = document.getElementById("observacao-imc");

const BADGE_CLASSES = [
  "badge--baixo-peso",
  "badge--normal",
  "badge--sobrepeso",
  "badge--obesidade-1",
  "badge--obesidade-2",
  "badge--obesidade-3",
];

function parseNumeroPositivo(valorBruto) {
  if (typeof valorBruto !== "string") return NaN;
  const normalizado = valorBruto.trim().replace(",", ".");
  if (!normalizado) return NaN;
  const numero = Number(normalizado);
  return Number.isFinite(numero) && numero > 0 ? numero : NaN;
}

function calcularImc(peso, altura) {
  return peso / (altura * altura);
}

function classificarImc(imc) {
  if (imc < 18.5) {
    return {
      categoria: "Abaixo do peso",
      badgeClass: "badge--baixo-peso",
      observacao:
        "Pode indicar baixo peso constitucional ou necessidade de avaliação nutricional.",
    };
  }
  if (imc < 25.0) {
    return {
      categoria: "Peso normal",
      badgeClass: "badge--normal",
      observacao:
        "Faixa associada a menor risco metabólico na maioria dos adultos.",
    };
  }
  if (imc < 30.0) {
    return {
      categoria: "Sobrepeso",
      badgeClass: "badge--sobrepeso",
      observacao:
        "Atenção a hábitos alimentares, atividade física e composição corporal.",
    };
  }
  if (imc < 35.0) {
    return {
      categoria: "Obesidade Grau I",
      badgeClass: "badge--obesidade-1",
      observacao:
        "Recomenda-se acompanhamento médico e nutricional para avaliação de riscos.",
    };
  }
  if (imc < 40.0) {
    return {
      categoria: "Obesidade Grau II",
      badgeClass: "badge--obesidade-2",
      observacao:
        "Acompanhamento multiprofissional indicado para manejo de saúde e comorbidades.",
    };
  }
  return {
    categoria: "Obesidade Grau III",
    badgeClass: "badge--obesidade-3",
    observacao: "Acompanhamento médico e nutricional prioritário.",
  };
}

function atualizarBadge(badgeClass) {
  classificacaoBadgeEl.classList.remove(...BADGE_CLASSES);
  classificacaoBadgeEl.classList.add(badgeClass);
}

function exibirResultado({ nome, peso, altura, imc }) {
  const { categoria, badgeClass, observacao } = classificarImc(imc);
  const pesoMinIdeal = 18.5 * altura * altura;
  const pesoMaxIdeal = 24.9 * altura * altura;

  pacienteNomeEl.textContent = nome;
  imcValorEl.textContent = imc.toFixed(2);
  pesoExibidoEl.textContent = `${peso.toFixed(2)} kg`;
  alturaExibidaEl.textContent = `${altura.toFixed(2)} m`;
  faixaPesoIdealEl.textContent = `${pesoMinIdeal.toFixed(1)} a ${pesoMaxIdeal.toFixed(1)} kg`;
  observacaoImcEl.textContent = observacao;

  classificacaoBadgeEl.textContent = categoria;
  atualizarBadge(badgeClass);

  resultadoSection.hidden = false;
  resultadoSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function limparResultado() {
  resultadoSection.hidden = true;
  nomeInput.focus();
}

formImc.addEventListener("submit", (event) => {
  event.preventDefault();

  const nomeDigitado = nomeInput.value.trim();
  const nome = nomeDigitado || "Paciente não identificado";
  const peso = parseNumeroPositivo(pesoInput.value);
  const altura = parseNumeroPositivo(alturaInput.value);

  if (Number.isNaN(peso) || peso < 0.5 || peso > 500) {
    alert("Informe um peso válido em kg (entre 0,5 e 500).");
    pesoInput.focus();
    return;
  }

  if (Number.isNaN(altura) || altura < 0.3 || altura > 3) {
    alert("Informe uma altura válida em metros (entre 0,30 e 3,00).");
    alturaInput.focus();
    return;
  }

  const imc = calcularImc(peso, altura);
  exibirResultado({ nome, peso, altura, imc });
});

btnLimpar.addEventListener("click", () => {
  limparResultado();
});