// ===== Referências do DOM =====
const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const tabela = document.getElementById("tabela");
const vazio = document.getElementById("vazio");

// ===== Dados e persistência =====
const chavePessoas = "pessoas";
let proximoId = 1;

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
    console.error("Não foi possível carregar os dados salvos:", e.message);
    return [];
  }
}

// Garante que o próximo código seja maior que qualquer id já existente
function ajustarContadorDeCodigo() {
  let maior = 0;
  pessoas.forEach((p) => {
    if (p.id > maior) maior = p.id;
  });
  proximoId = maior + 1;
}

// ===== Cálculos e formatação (partes da aula anterior) =====
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
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

// ===== Formulário: leitura, validação e adição =====
function lerFormulario() {
  return {
    nome: inputNome.value.trim(),
    idade: Number(inputIdade.value),
    altura: Number(inputAltura.value),
    peso: Number(inputPeso.value)
  };
}

// Retorna string vazia quando os dados são válidos
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

function mostrarErro(texto) {
  mensagemDeErro.textContent = texto;
  mensagemDeErro.hidden = false;
}

function limparErro() {
  mensagemDeErro.hidden = true;
}

function adicionarPessoa(dados) {
  pessoas.push({
    id: proximoId++,
    nome: dados.nome,
    idade: dados.idade,
    altura: dados.altura,
    peso: dados.peso
  });
}

// Desafio da aula: apagar do array, do localStorage e da tela
function removerPessoa(id) {
  pessoas = pessoas.filter((p) => p.id !== id);
  salvar();
  render();
}

// ===== Renderização =====
function criarCelula(texto, classe) {
  const td = document.createElement("td");
  td.textContent = texto;
  if (classe) td.className = classe;
  return td;
}

function criarLinha(pessoa) {
  const imc = calcularIMC(pessoa.peso, pessoa.altura);
  const classificacao = classificarIMC(imc);

  const tr = document.createElement("tr");
  tr.appendChild(criarCelula(pessoa.nome));
  tr.appendChild(criarCelula(pessoa.idade, "num"));
  tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m", "num"));
  tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg", "num"));
  tr.appendChild(criarCelula(formatar(imc, 1), "num"));

  const tdClassificacao = document.createElement("td");
  const selo = document.createElement("span");
  selo.classList.add("selo", classificacao.classe);
  selo.textContent = classificacao.texto;
  tdClassificacao.appendChild(selo);
  tr.appendChild(tdClassificacao);

  const tdAcoes = document.createElement("td");
  const btnApagar = document.createElement("button");
  btnApagar.type = "button";
  btnApagar.className = "ghost";
  btnApagar.textContent = "Apagar";
  btnApagar.addEventListener("click", () => removerPessoa(pessoa.id));
  tdAcoes.appendChild(btnApagar);
  tr.appendChild(tdAcoes);

  return tr;
}

function render() {
  tabela.innerHTML = "";
  vazio.style.display = pessoas.length ? "none" : "block";
  pessoas.forEach((pessoa) => tabela.appendChild(criarLinha(pessoa)));
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
let pessoas = carregarPessoas();
ajustarContadorDeCodigo();
render();