const formulario = document.getElementById("imcForm");
const campoNome = document.getElementById("nome");
const campoPeso = document.getElementById("peso");
const campoAltura = document.getElementById("altura");
const mensagem = document.getElementById("mensagem");

const resultado = document.getElementById("resultado");
const nomeResultado = document.getElementById("nomeResultado");
const valorImc = document.getElementById("valorImc");
const classificacao = document.getElementById("classificacao");
const detalhesResultado = document.getElementById("detalhesResultado");

const corpoHistorico = document.getElementById("corpoHistorico");
const tabelaHistorico = document.getElementById("tabelaHistorico");
const historicoVazio = document.getElementById("historicoVazio");
const botaoLimpar = document.getElementById("limparHistorico");

const CHAVE_HISTORICO = "controle-imc-historico";

// Carrega os registros salvos anteriormente neste navegador.
let historico = carregarHistorico();
renderizarHistorico();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  mensagem.textContent = "";

  const nome = campoNome.value.trim();
  const peso = Number(campoPeso.value);
  const altura = Number(campoAltura.value);

  if (!nome || !Number.isFinite(peso) || !Number.isFinite(altura) ||
      peso <= 0 || altura < 0.5 || altura > 2.7 || peso > 500) {
    mensagem.textContent = "Informe nome, peso e altura com valores válidos.";
    resultado.hidden = true;
    return;
  }

  const imc = peso / (altura * altura);
  const avaliacao = interpretarImc(imc);

  const registro = {
    id: gerarId(),
    nome,
    peso,
    altura,
    imc,
    classificacao: avaliacao.nome,
    data: new Date().toISOString()
  };

  mostrarResultado(registro, avaliacao.descricao);

  // Cada cálculo vira um registro independente no histórico.
  historico.unshift(registro);
  salvarHistorico();
  renderizarHistorico();
});

function interpretarImc(imc) {
  // Faixas de referência para adultos.
  if (imc < 18.5) {
    return { nome: "Abaixo do peso", descricao: "Abaixo da faixa de referência adulta." };
  }
  if (imc < 25) {
    return { nome: "Faixa adequada", descricao: "Dentro da faixa de referência adulta." };
  }
  if (imc < 30) {
    return { nome: "Sobrepeso", descricao: "Na faixa de sobrepeso para adultos." };
  }
  if (imc < 35) {
    return { nome: "Obesidade grau I", descricao: "Na faixa de obesidade grau I para adultos." };
  }
  if (imc < 40) {
    return { nome: "Obesidade grau II", descricao: "Na faixa de obesidade grau II para adultos." };
  }
  return { nome: "Obesidade grau III", descricao: "Na faixa de obesidade grau III para adultos." };
}

function mostrarResultado(registro, descricao) {
  nomeResultado.textContent = registro.nome;
  valorImc.textContent = formatarNumero(registro.imc, 2);
  classificacao.textContent = registro.classificacao;
  detalhesResultado.textContent =
    `${descricao} Peso: ${formatarNumero(registro.peso, 1)} kg • Altura: ${formatarNumero(registro.altura, 2)} m`;
  resultado.hidden = false;
}

function renderizarHistorico() {
  corpoHistorico.replaceChildren();

  historicoVazio.hidden = historico.length > 0;
  tabelaHistorico.hidden = historico.length === 0;

  historico.forEach((registro) => {
    const linha = document.createElement("tr");

    adicionarCelula(linha, formatarData(registro.data));
    adicionarCelula(linha, registro.nome);
    adicionarCelula(linha, `${formatarNumero(registro.peso, 1)} kg`);
    adicionarCelula(linha, `${formatarNumero(registro.altura, 2)} m`);
    adicionarCelula(linha, formatarNumero(registro.imc, 2));
    adicionarCelula(linha, registro.classificacao);

    const celulaAcao = document.createElement("td");
    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.className = "delete-record";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.setAttribute("aria-label", `Excluir registro de ${registro.nome}`);
    botaoExcluir.addEventListener("click", () => excluirRegistro(registro.id));

    celulaAcao.appendChild(botaoExcluir);
    linha.appendChild(celulaAcao);
    corpoHistorico.appendChild(linha);
  });
}

function adicionarCelula(linha, texto) {
  const celula = document.createElement("td");
  celula.textContent = texto;
  linha.appendChild(celula);
}

function excluirRegistro(id) {
  historico = historico.filter((registro) => registro.id !== id);
  salvarHistorico();
  renderizarHistorico();
}

botaoLimpar.addEventListener("click", () => {
  if (historico.length === 0) return;

  const confirmou = confirm("Deseja apagar todo o histórico de IMC?");
  if (!confirmou) return;

  historico = [];
  salvarHistorico();
  renderizarHistorico();
  resultado.hidden = true;
});

function carregarHistorico() {
  try {
    const dados = localStorage.getItem(CHAVE_HISTORICO);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error("Não foi possível carregar o histórico:", erro);
    return [];
  }
}

function salvarHistorico() {
  try {
    localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
  } catch (erro) {
    mensagem.textContent = "Não foi possível salvar o histórico neste navegador.";
    console.error("Erro ao salvar histórico:", erro);
  }
}

function formatarNumero(numero, casas) {
  return numero.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function formatarData(dataIso) {
  return new Date(dataIso).toLocaleString("pt-BR");
}

function gerarId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
