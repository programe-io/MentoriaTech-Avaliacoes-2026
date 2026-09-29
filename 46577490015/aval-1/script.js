const valorEl = document.getElementById("valor");
const historicoEl = document.getElementById("historico");
const teclado = document.querySelector(".teclado");
const simbolos = { "+": "+", "-": "−", "*": "×", "/": "÷", "%": "%" };

let atual = "0";       // número sendo digitado
let anterior = null;   // primeiro operando
let operador = null;   // operação pendente
let novoNumero = true; // próximo dígito começa um número novo

const paraNumero = (texto) => parseFloat(texto.replace(",", "."));
const paraTexto = (numero) =>
  String(parseFloat(numero.toPrecision(12))).replace(".", ",");

function atualizarTela() {
  valorEl.textContent = atual;
  historicoEl.textContent =
    anterior !== null && operador ? `${anterior} ${simbolos[operador]}` : "";

  document.querySelectorAll(".tecla--operador").forEach((botao) => {
    botao.classList.toggle(
      "is-ativo",
      novoNumero && botao.dataset.op === operador
    );
  });
}

function digitar(d) {
  if (novoNumero) {
    atual = d === "," ? "0," : d;
    novoNumero = false;
  } else if (d === ",") {
    if (!atual.includes(",")) atual += ",";
  } else {
    atual = atual === "0" ? d : atual + d;
  }
  atualizarTela();
}

function calcular(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? NaN : a / b;
    case "%": return a % b;
  }
}

function resolver() {
  if (!operador || anterior === null) return;
  const resultado = calcular(paraNumero(anterior), paraNumero(atual), operador);
  atual = Number.isFinite(resultado) ? paraTexto(resultado) : "Erro";
  anterior = null;
  operador = null;
  novoNumero = true;
}

function escolherOperador(op) {
  if (operador && !novoNumero) resolver();
  anterior = atual;
  operador = op;
  novoNumero = true;
  atualizarTela();
}

function limpar() {
  atual = "0";
  anterior = null;
  operador = null;
  novoNumero = true;
  atualizarTela();
}

function apagar() {
  if (novoNumero || atual === "Erro") return limpar();
  atual = atual.length > 1 ? atual.slice(0, -1) : "0";
  atualizarTela();
}

// Cliques nos botões
teclado.addEventListener("click", (e) => {
  const botao = e.target.closest("button");
  if (!botao) return;

  if (atual === "Erro" && !botao.dataset.acao) limpar();

  if (botao.dataset.num) {
    digitar(botao.dataset.num);
  } else if (botao.dataset.op) {
    escolherOperador(botao.dataset.op);
  } else if (botao.dataset.acao === "igual") {
    resolver();
    atualizarTela();
  } else if (botao.dataset.acao === "limpar") {
    limpar();
  } else if (botao.dataset.acao === "apagar") {
    apagar();
  }
});

// Teclado físico
document.addEventListener("keydown", (e) => {
  const k = e.key;
  let seletor = null;

  if (/^[0-9]$/.test(k)) seletor = `[data-num="${k}"]`;
  else if (k === "," || k === ".") seletor = `[data-num=","]`;
  else if ("+-*/%".includes(k)) seletor = `[data-op="${k}"]`;
  else if (k === "Enter" || k === "=") seletor = `[data-acao="igual"]`;
  else if (k === "Backspace") seletor = `[data-acao="apagar"]`;
  else if (k === "Escape") seletor = `[data-acao="limpar"]`;

  if (!seletor) return;

  e.preventDefault();
  const botao = document.querySelector(seletor);
  botao.classList.add("is-pressionada");
  setTimeout(() => botao.classList.remove("is-pressionada"), 100);
  botao.click();
});

atualizarTela();