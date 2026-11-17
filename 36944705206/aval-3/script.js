// ===== Referências do DOM =====
const formPessoa     = document.getElementById("form-pessoa");
const inputNome      = document.getElementById("nome");
const inputIdade     = document.getElementById("idade");
const inputAltura    = document.getElementById("altura");
const inputPeso      = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const tbody          = document.getElementById("tbody");

// ===== Estado =====
const chavePessoas = "pessoas";
let pessoas = [];
let proximoId = 1;

// ===== Funções da aula anterior =====
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificarIMC(imc) {
  if (imc < 18.5) return { texto: "Abaixo do peso", classe: "azul" };
  if (imc < 25)   return { texto: "Peso normal",    classe: "verde" };
  if (imc < 30)   return { texto: "Sobrepeso",      classe: "amarelo" };
  return { texto: "Obesidade", classe: "vermelho" };
}

function formatar(valor, casas) {
  return Number(valor).toFixed(casas).replace(".", ",");
}

// ===== Leitura do formulário =====
function lerFormulario() {
  return {
    nome: inputNome.value.trim(),
    idade: Number(inputIdade.value),
    altura: Number(inputAltura.value),
    peso: Number(inputPeso.value),
  };
}

// ===== Validação =====
function validarDados(dados) {
  if (dados.nome.length < 2) {
    return "Informe o nome com no mínimo duas letras.";
  }
  if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
    return "A idade deve ser um número inteiro entre 1 e 120.";
  }
  if (!(dados.altura >= 0.5 && dados.altura <= 2.5)) {
    return "A altura deve estar entre 0,5 m e 2,5 m.";
  }
  if (!(dados.peso >= 2 && dados.peso <= 500)) {
    return "O peso deve estar entre 2 kg e 500 kg.";
  }
  return "";
}

// ===== Mensagens de erro =====
function mostrarErro(mensagem) {
  mensagemDeErro.textContent = mensagem;
  mensagemDeErro.hidden = false;
}

function limparErro() {
  mensagemDeErro.hidden = true;
}

// ===== localStorage =====
function salvar() {
  localStorage.setItem(chavePessoas, JSON.stringify(pessoas));
}

function carregarPessoas() {
  const texto = localStorage.getItem(chavePessoas);
  if (texto === null) return [];

  try {
    const lista = JSON.parse(texto);
    if (Array.isArray(lista)) return lista;
    throw new Error("Formato inválido");
  } catch (erro) {
    console.error("Erro ao carregar os dados salvos:", erro);
    return [];
  }
}

function ajustarContadorCodigo() {
  let maior = 0;
  pessoas.forEach((pessoa) => {
    if (pessoa.id > maior) maior = pessoa.id;
  });
  proximoId = maior + 1;
}

// ===== Adicionar e apagar =====
function adicionarPessoa(dados) {
  pessoas.push({
    id: proximoId++,
    nome: dados.nome,
    idade: dados.idade,
    altura: dados.altura,
    peso: dados.peso,
  });
}

// Desafio da aula: apagar da lista e do localStorage
function apagarPessoa(id) {
  pessoas = pessoas.filter((pessoa) => pessoa.id !== id);
  salvar();
  render();
}

// ===== Renderização =====
function criarLinha(pessoa) {
  const imc = calcularIMC(pessoa.peso, pessoa.altura);
  const classificacao = classificarIMC(imc);

  const tr = document.createElement("tr");

  const tdNome = document.createElement("td");
  tdNome.textContent = pessoa.nome;

  const tdIdade = document.createElement("td");
  tdIdade.textContent = pessoa.idade;

  const tdAltura = document.createElement("td");
  tdAltura.textContent = formatar(pessoa.altura, 2) + " m";

  const tdPeso = document.createElement("td");
  tdPeso.textContent = formatar(pessoa.peso, 1) + " KG";

  const tdIMC = document.createElement("td");
  tdIMC.textContent = formatar(imc, 1);

  const tdClassificacao = document.createElement("td");
  const selo = document.createElement("span");
  selo.classList.add("selo", classificacao.classe);
  selo.textContent = classificacao.texto;
  tdClassificacao.appendChild(selo);

  const tdAcao = document.createElement("td");
  const btnApagar = document.createElement("button");
  btnApagar.type = "button";
  btnApagar.classList.add("btn-apagar");
  btnApagar.textContent = "Apagar";
  btnApagar.addEventListener("click", () => apagarPessoa(pessoa.id));
  tdAcao.appendChild(btnApagar);

  tr.appendChild(tdNome);
  tr.appendChild(tdIdade);
  tr.appendChild(tdAltura);
  tr.appendChild(tdPeso);
  tr.appendChild(tdIMC);
  tr.appendChild(tdClassificacao);
  tr.appendChild(tdAcao);
  return tr;
}

function render() {
  tbody.innerHTML = "";
  pessoas.forEach((pessoa) => tbody.appendChild(criarLinha(pessoa)));
}

// ===== Evento de envio do formulário =====
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

// ===== Inicialização =====
pessoas = carregarPessoas();
ajustarContadorCodigo();
render();