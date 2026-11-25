/* =========================================================
   Calculadora de IMC - lógica da aplicação
   ========================================================= */

const CHAVE_STORAGE = "imc-pacientes";

// ---------- Estado ----------
let pessoas = carregar();
let contador = pessoas.reduce((maior, p) => Math.max(maior, p.id), 0);
let editandoId = null;

// ---------- Referências ao DOM ----------
const tabelaPessoas = document.getElementById("tabela-pessoas");
const form = document.getElementById("form-pessoa");
const campos = {
  nome: document.getElementById("nome"),
  idade: document.getElementById("idade"),
  altura: document.getElementById("altura"),
  peso: document.getElementById("peso"),
};
const erro = document.getElementById("erro");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const tituloForm = document.getElementById("titulo-form");

const previa = document.getElementById("previa");
const previaValor = document.getElementById("previa-valor");
const previaClasse = document.getElementById("previa-classe");
const previaDica = document.getElementById("previa-dica");
const marcador = document.getElementById("marcador");

// =========================================================
// INÍCIO: funções de regra de negócio
// =========================================================

// Gera o identificador único (contador pré-incrementado)
function gerarCodigo() {
  return ++contador;
}

// Peso dividido pela altura ao quadrado
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

// Retorna texto descritivo e classe de formatação
function classificarIMC(imc) {
  if (imc < 18.5) return { texto: "Abaixo do peso", classe: "abaixo" };
  if (imc < 25) return { texto: "Peso normal", classe: "normal" };
  if (imc < 30) return { texto: "Sobrepeso", classe: "sobrepeso" };
  if (imc < 35) return { texto: "Obesidade grau 1", classe: "ob1" };
  if (imc < 40) return { texto: "Obesidade grau 2", classe: "ob2" };
  return { texto: "Obesidade grau 3", classe: "ob3" };
}

// Formata números no padrão brasileiro (vírgula decimal)
function formatar(valor, casas = 2) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

// FIM: funções de regra de negócio
// =========================================================

// ---------- Persistência (os dados sobrevivem ao recarregar a página) ----------
function carregar() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
  } catch {
    return [];
  }
}

function salvarNoNavegador() {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(pessoas));
  } catch {
    /* sem armazenamento disponível: segue só em memória */
  }
}

// ---------- Tabela: células, linhas e renderização ----------
function criarCelula(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

function criarLinha(pessoa) {
  const tr = document.createElement("tr");
  tr.dataset.id = pessoa.id;
  if (pessoa.id === editandoId) tr.classList.add("editando");

  const imc = calcularIMC(pessoa.peso, pessoa.altura);
  const classificacao = classificarIMC(imc);

  tr.appendChild(criarCelula(pessoa.nome));
  tr.appendChild(criarCelula(pessoa.idade));
  tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
  tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
  tr.appendChild(criarCelula(formatar(imc, 2)));

  // Classificação com selo colorido
  const tdClasse = document.createElement("td");
  const selo = document.createElement("span");
  selo.className = "selo " + classificacao.classe;
  selo.textContent = classificacao.texto;
  tdClasse.appendChild(selo);
  tr.appendChild(tdClasse);

  // Ações
  const tdAcoes = document.createElement("td");
  tdAcoes.className = "acoes";
  tdAcoes.innerHTML =
    '<button class="acao editar" data-acao="editar">Editar</button>' +
    '<button class="acao excluir" data-acao="excluir">Excluir</button>';
  tr.appendChild(tdAcoes);

  return tr;
}

function render() {
  tabelaPessoas.innerHTML = "";

  if (pessoas.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 7;
    td.className = "vazio";
    td.textContent = "Nenhuma pessoa cadastrada ainda";
    tr.appendChild(td);
    tabelaPessoas.appendChild(tr);
  } else {
    pessoas.forEach((pessoa) => tabelaPessoas.appendChild(criarLinha(pessoa)));
  }

  atualizarResumo();
}

function atualizarResumo() {
  document.getElementById("res-total").textContent = pessoas.length;
  const media = pessoas.length
    ? pessoas.reduce((soma, p) => soma + calcularIMC(p.peso, p.altura), 0) / pessoas.length
    : null;
  document.getElementById("res-media").textContent = media ? formatar(media, 1) : "--";
}

// ---------- Prévia ao vivo (escala de IMC) ----------
function atualizarPrevia() {
  const peso = parseFloat(campos.peso.value);
  const altura = parseFloat(campos.altura.value);

  if (!(peso > 0) || !(altura > 0)) {
    previa.hidden = true;
    return;
  }

  const imc = calcularIMC(peso, altura);
  const c = classificarIMC(imc);

  previa.hidden = false;
  previaValor.textContent = "IMC " + formatar(imc, 1);
  previaClasse.textContent = c.texto;
  previaClasse.className = "selo " + c.classe;

  // posição do marcador: escala de 15 a 45
  const pct = Math.min(100, Math.max(0, ((imc - 15) / 30) * 100));
  marcador.style.left = pct + "%";

  // faixa de peso considerada normal para essa altura
  const min = 18.5 * altura * altura;
  const max = 24.9 * altura * altura;
  previaDica.textContent =
    "Para " + formatar(altura, 2) + " m, a faixa de peso normal vai de " +
    formatar(min, 1) + " a " + formatar(max, 1) + " kg.";
}

// ---------- Formulário ----------
function mostrarErro(mensagem, campo) {
  erro.textContent = mensagem;
  Object.values(campos).forEach((el) => el.classList.remove("invalido"));
  if (campo) {
    campo.classList.add("invalido");
    campo.focus();
  }
}

function validar() {
  const nome = campos.nome.value.trim();
  const idade = parseInt(campos.idade.value, 10);
  const altura = parseFloat(campos.altura.value);
  const peso = parseFloat(campos.peso.value);

  if (nome.length < 2) return mostrarErro("Informe o nome do paciente.", campos.nome);
  if (!(idade >= 1 && idade <= 120)) return mostrarErro("A idade deve estar entre 1 e 120 anos.", campos.idade);
  if (!(altura >= 0.5 && altura <= 2.5)) return mostrarErro("A altura deve estar entre 0,50 e 2,50 m.", campos.altura);
  if (!(peso >= 2 && peso <= 500)) return mostrarErro("O peso deve estar entre 2 e 500 kg.", campos.peso);

  mostrarErro("");
  return { nome, idade, altura, peso };
}

function limparFormulario() {
  form.reset();
  editandoId = null;
  tituloForm.textContent = "Novo paciente";
  btnSalvar.textContent = "Salvar paciente";
  mostrarErro("");
  atualizarPrevia();
  render();
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const dados = validar();
  if (!dados) return;

  if (editandoId !== null) {
    const indice = pessoas.findIndex((p) => p.id === editandoId);
    pessoas[indice] = { id: editandoId, ...dados };
  } else {
    pessoas.push({ id: gerarCodigo(), ...dados });
  }

  salvarNoNavegador();
  limparFormulario();
});

btnCancelar.addEventListener("click", limparFormulario);

campos.peso.addEventListener("input", atualizarPrevia);
campos.altura.addEventListener("input", atualizarPrevia);

// ---------- Ações da tabela (editar / excluir) ----------
tabelaPessoas.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;

  const id = Number(botao.closest("tr").dataset.id);
  const pessoa = pessoas.find((p) => p.id === id);

  if (botao.dataset.acao === "excluir") {
    if (!confirm("Excluir " + pessoa.nome + "?")) return;
    pessoas = pessoas.filter((p) => p.id !== id);
    if (editandoId === id) editandoId = null;
    salvarNoNavegador();
    limparFormulario();
    return;
  }

  // editar: devolve os dados ao formulário
  editandoId = id;
  campos.nome.value = pessoa.nome;
  campos.idade.value = pessoa.idade;
  campos.altura.value = pessoa.altura;
  campos.peso.value = pessoa.peso;
  tituloForm.textContent = "Editando " + pessoa.nome;
  btnSalvar.textContent = "Atualizar paciente";
  atualizarPrevia();
  render();
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  campos.nome.focus();
});

// ---------- Início ----------
render();
