"use strict";

/* ---------- Referências do DOM ---------- */
const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const tabela = document.getElementById("tabela");
const vazio = document.getElementById("vazio");

/* ---------- Estado ---------- */
const chavePessoas = "pessoas";
let proximoId = 1;
let pessoas = carregarPessoas();
ajustarContador();

/* ---------- Cálculos e formatação ---------- */
const formatar = (valor, casas) => Number(valor).toFixed(casas);

function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificarIMC(imc) {
  if (imc < 18.5) return { texto: "Abaixo do peso", classe: "abaixo" };
  if (imc < 25) return { texto: "Peso normal", classe: "normal" };
  if (imc < 30) return { texto: "Sobrepeso", classe: "sobrepeso" };
  return { texto: "Obesidade", classe: "obesidade" };
}

/* ---------- Renderização ---------- */
function criarTd(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

function criarLinha(pessoa) {
  const imc = calcularIMC(pessoa.peso, pessoa.altura);
  const classificacao = classificarIMC(imc);

  const tr = document.createElement("tr");
  tr.append(
    criarTd(pessoa.nome),
    criarTd(pessoa.idade),
    criarTd(formatar(pessoa.altura, 2) + " m"),
    criarTd(formatar(pessoa.peso, 1) + " KG"),
    criarTd(formatar(imc, 1))
  );

  const tdClassificacao = document.createElement("td");
  const selo = document.createElement("span");
  selo.classList.add("selo", classificacao.classe);
  selo.textContent = classificacao.texto;
  tdClassificacao.appendChild(selo);
  tr.appendChild(tdClassificacao);

  const tdAcao = document.createElement("td");
  const btnApagar = document.createElement("button");
  btnApagar.type = "button";
  btnApagar.className = "btn-apagar";
  btnApagar.textContent = "Apagar";
  btnApagar.addEventListener("click", () => apagarPessoa(pessoa.id));
  tdAcao.appendChild(btnApagar);
  tr.appendChild(tdAcao);

  return tr;
}

function render() {
  tabela.replaceChildren(...pessoas.map(criarLinha));
  vazio.hidden = pessoas.length > 0;
}

/* ---------- Formulário ---------- */
function lerFormulario() {
  return {
    nome: inputNome.value.trim(),
    idade: Number(inputIdade.value),
    altura: Number(inputAltura.value),
    peso: Number(inputPeso.value),
  };
}

function validarDados({ nome, idade, altura, peso }) {
  if (nome.length < 2) return "Informe o nome com no mínimo duas letras.";
  if (!Number.isInteger(idade) || idade < 1 || idade > 120)
    return "A idade deve ser um número inteiro entre 1 e 120.";
  if (!(altura >= 0.5 && altura <= 2.5))
    return "A altura deve estar entre 0,5 m e 2,5 m.";
  if (!(peso >= 2 && peso <= 500))
    return "O peso deve estar entre 2 kg e 500 kg.";
  return "";
}

function mostrarErro(texto) {
  mensagemDeErro.textContent = texto;
  mensagemDeErro.hidden = false;
}

function limparErro() {
  mensagemDeErro.hidden = true;
}

function adicionarPessoa({ nome, idade, altura, peso }) {
  pessoas.push({ id: proximoId++, nome, idade, altura, peso });
}

function apagarPessoa(id) {
  pessoas = pessoas.filter((p) => p.id !== id);
  salvar();
  render();
}

/* ---------- localStorage ---------- */
function salvar() {
  localStorage.setItem(chavePessoas, JSON.stringify(pessoas));
}

function carregarPessoas() {
  const texto = localStorage.getItem(chavePessoas);
  if (texto === null) return [];
  try {
    const dados = JSON.parse(texto);
    if (!Array.isArray(dados)) throw new Error("Formato inválido");
    return dados;
  } catch (e) {
    console.error("Erro ao carregar pessoas salvas:", e);
    return [];
  }
}

function ajustarContador() {
  let maior = 0;
  pessoas.forEach((p) => {
    if (p.id > maior) maior = p.id;
  });
  proximoId = maior + 1;
}

/* ---------- Eventos ---------- */
formPessoa.addEventListener("submit", (e) => {
  e.preventDefault();

  const dados = lerFormulario();
  const erro = validarDados(dados);
  if (erro !== "") {
    mostrarErro(erro);
    return;
  }

  limparErro();
  adicionarPessoa(dados);
  salvar();
  formPessoa.reset();
  inputNome.focus();
  render();
});

/* ---------- Início ---------- */
render();