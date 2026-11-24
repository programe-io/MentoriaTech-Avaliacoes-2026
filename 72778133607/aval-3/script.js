const STORAGE_KEY = "historico_imc_v1";

const form = document.getElementById("imcForm");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");
const erroMsg = document.getElementById("erroMsg");
const btnLimpar = document.getElementById("btnLimpar");

const resultadoBox = document.getElementById("resultadoBox");
const imcValorEl = document.getElementById("imcValor");
const imcBadgeEl = document.getElementById("imcBadge");
const scaleMarkerEl = document.getElementById("scaleMarker");
const pesoIdealTextoEl = document.getElementById("pesoIdealTexto");

const historicoListaEl = document.getElementById("historicoLista");
const historicoVazioEl = document.getElementById("historicoVazio");
const btnLimparHistorico = document.getElementById("btnLimparHistorico");
const linhasTabela = document.querySelectorAll("tbody tr[data-faixa]");

let historico = carregarHistorico();

function carregarHistorico() {
  try {
    const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(salvo) ? salvo : [];
  } catch {
    return [];
  }
}

function salvarHistorico() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historico));
}

function classificarIMC(imc) {
  if (imc < 18.5) {
    return { faixa: "abaixo", label: "Abaixo do peso", classe: "badge-baixo" };
  }
  if (imc < 25) {
    return { faixa: "normal", label: "Peso normal", classe: "badge-normal" };
  }
  if (imc < 30) {
    return { faixa: "sobrepeso", label: "Sobrepeso", classe: "badge-sobrepeso" };
  }
  if (imc < 35) {
    return { faixa: "obesidade1", label: "Obesidade grau I", classe: "badge-obesidade" };
  }
  if (imc < 40) {
    return { faixa: "obesidade2", label: "Obesidade grau II", classe: "badge-obesidade" };
  }
  return { faixa: "obesidade3", label: "Obesidade grau III", classe: "badge-obesidade" };
}

function destacarLinhaTabela(faixaAtiva) {
  linhasTabela.forEach((tr) => {
    tr.classList.toggle("ativo", tr.dataset.faixa === faixaAtiva);
  });
}

function calcularPosicaoMarcador(imc) {
  // Mapeia IMC de 12 até 42 para 0%–100% na barra
  const min = 12;
  const max = 42;
  const pct = ((imc - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, pct));
}

function mostrarErro(mensagem) {
  erroMsg.textContent = mensagem;
  erroMsg.classList.remove("hidden");
}

function esconderErro() {
  erroMsg.textContent = "";
  erroMsg.classList.add("hidden");
}

function exibirResultado(peso, altura, imc) {
  const info = classificarIMC(imc);
  const pesoMinIdeal = (18.5 * altura * altura).toFixed(1).replace(".", ",");
  const pesoMaxIdeal = (24.9 * altura * altura).toFixed(1).replace(".", ",");

  imcValorEl.textContent = imc.toFixed(1).replace(".", ",");
  imcBadgeEl.textContent = info.label;
  imcBadgeEl.className = `badge ${info.classe}`;
  scaleMarkerEl.style.left = `${calcularPosicaoMarcador(imc)}%`;
  pesoIdealTextoEl.textContent = `Faixa de peso saudável para ${altura.toFixed(2).replace(".", ",")} m: ${pesoMinIdeal} kg a ${pesoMaxIdeal} kg.`;

  destacarLinhaTabela(info.faixa);
  resultadoBox.classList.remove("hidden");
}

function renderizarHistorico() {
  historicoListaEl.innerHTML = "";
  historicoVazioEl.classList.toggle("hidden", historico.length > 0);

  historico.forEach((item) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `
      <div class="history-main">
        <strong>IMC ${item.imc.toFixed(1).replace(".", ",")}</strong> — <span>${item.classificacao}</span>
        <span class="history-sub">${item.peso.toFixed(1).replace(".", ",")} kg · ${item.altura.toFixed(2).replace(".", ",")} m · ${item.data}</span>
      </div>
      <button type="button" class="btn-remove" data-id="${item.id}" title="Remover item" aria-label="Remover item">✕</button>
    `;
    historicoListaEl.appendChild(li);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  esconderErro();

  // Aceita vírgula ou ponto caso o usuário digite manualmente
  const peso = Number.parseFloat(String(pesoInput.value).replace(",", "."));
  let altura = Number.parseFloat(String(alturaInput.value).replace(",", "."));

  // Se alguém digitar altura em cm (ex: 175), converte para metros
  if (!Number.isNaN(altura) && altura > 3 && altura <= 280) {
    altura = altura / 100;
    alturaInput.value = altura.toFixed(2);
  }

  if (Number.isNaN(peso) || peso <= 0 || peso > 500) {
    mostrarErro("Informe um peso válido entre 1 kg e 500 kg.");
    pesoInput.focus();
    return;
  }

  if (Number.isNaN(altura) || altura < 0.4 || altura > 2.8) {
    mostrarErro("Informe uma altura válida em metros (ex: 1.75) ou centímetros (ex: 175).");
    alturaInput.focus();
    return;
  }

  const imc = peso / (altura * altura);
  const info = classificarIMC(imc);

  exibirResultado(peso, altura, imc);

  historico.unshift({
    id: crypto.randomUUID(),
    peso,
    altura,
    imc,
    classificacao: info.label,
    data: new Date().toLocaleDateString("pt-BR")
  });

  if (historico.length > 20) {
    historico = historico.slice(0, 20);
  }

  salvarHistorico();
  renderizarHistorico();
});

btnLimpar.addEventListener("click", () => {
  form.reset();
  esconderErro();
  resultadoBox.classList.add("hidden");
  destacarLinhaTabela(null);
  pesoInput.focus();
});

historicoListaEl.addEventListener("click", (event) => {
  const btn = event.target.closest("button[data-id]");
  if (!btn) return;
  historico = historico.filter((item) => item.id !== btn.dataset.id);
  salvarHistorico();
  renderizarHistorico();
});

btnLimparHistorico.addEventListener("click", () => {
  historico = [];
  salvarHistorico();
  renderizarHistorico();
});

renderizarHistorico();