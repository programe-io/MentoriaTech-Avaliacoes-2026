// ==========================================
// 1. CONSTANTES E REFERÊNCIAS DO DOM
// ==========================================
const CHAVE_PESSOAS = "pessoas";

const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");
const mensagemDeErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabela-pessoas");

let contadorCodigo = 0;

// ==========================================
// 2. FUNÇÕES DE CÁLCULO E FORMATAÇÃO (PARTE 1)
// ==========================================
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificarIMC(imc) {
  if (imc < 18.5) {
    return { texto: "Abaixo do peso", classe: "azul" };
  }
  if (imc < 25) {
    return { texto: "Peso normal", classe: "verde" };
  }
  if (imc < 30) {
    return { texto: "Sobrepeso", classe: "amarelo" };
  }
  return { texto: "Obesidade", classe: "vermelho" };
}

function formatar(valor, casasDecimais) {
  return valor.toFixed(casasDecimais).replace(".", ",");
}

// ==========================================
// 3. PERSISTÊNCIA COM LOCALSTORAGE
// ==========================================
function salvar() {
  localStorage.setItem(CHAVE_PESSOAS, JSON.stringify(pessoas));
}

function carregarPessoas() {
  const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);

  if (dadosSalvos === null) {
    return [];
  }

  try {
    const lista = JSON.parse(dadosSalvos);
    if (Array.isArray(lista)) {
      return lista;
    }
    return [];
  } catch (erro) {
    console.error("Erro ao carregar dados do localStorage:", erro);
    return [];
  }
}

function ajustarContadorCodigo() {
  let maior = 0;

  pessoas.forEach((pessoa) => {
    if (pessoa.id > maior) {
      maior = pessoa.id;
    }
  });

  contadorCodigo = maior;
}

// ==========================================
// 4. LEITURA, VALIDAÇÃO E ERROS DO FORMULÁRIO
// ==========================================
function lerFormulario() {
  return {
    nome: inputNome.value.trim(),
    idade: Number(inputIdade.value),
    altura: Number(inputAltura.value),
    peso: Number(inputPeso.value)
  };
}

function validarDados(dados) {
  if (dados.nome.length < 2) {
    return "Informe o nome com no mínimo de duas letras.";
  }

  if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
    return "A idade deve ser um número inteiro entre 1 e 120.";
  }

  if (isNaN(dados.altura) || dados.altura < 0.5 || dados.altura > 2.5) {
    return "A altura deve ser um número entre 0.5 e 2.5 metros.";
  }

  if (isNaN(dados.peso) || dados.peso < 2 || dados.peso > 500) {
    return "O peso deve ser um número entre 2 e 500 kg.";
  }

  return "";
}

function mostrarErro(texto) {
  mensagemDeErro.textContent = texto;
  mensagemDeErro.hidden = false;
}

function limparErro() {
  mensagemDeErro.textContent = "";
  mensagemDeErro.hidden = true;
}

// ==========================================
// 5. MANIPULAÇÃO DA LISTA E RENDERIZAÇÃO
// ==========================================
function adicionarPessoa(dados) {
  contadorCodigo++;

  const novaPessoa = {
    id: contadorCodigo,
    nome: dados.nome,
    idade: dados.idade,
    altura: dados.altura,
    peso: dados.peso
  };

  pessoas.push(novaPessoa);
}

// Desafio final da aula: função para apagar registro
function apagarPessoa(id) {
  pessoas = pessoas.filter((pessoa) => pessoa.id !== id);
  salvar();
  render();
}

function criarLinha(pessoa) {
  const tr = document.createElement("tr");

  const imc = calcularIMC(pessoa.peso, pessoa.altura);
  const classificacao = classificarIMC(imc);

  const tdId = document.createElement("td");
  tdId.textContent = pessoa.id;

  const tdNome = document.createElement("td");
  tdNome.textContent = pessoa.nome;

  const tdIdade = document.createElement("td");
  tdIdade.textContent = `${pessoa.idade} anos`;

  const tdAltura = document.createElement("td");
  tdAltura.textContent = `${formatar(pessoa.altura, 2)} m`;

  const tdPeso = document.createElement("td");
  tdPeso.textContent = `${formatar(pessoa.peso, 1)} KG`;

  const tdImc = document.createElement("td");
  tdImc.textContent = formatar(imc, 1);

  // Criação da coluna de classificação com o selo colorido
  const tdClassificacao = document.createElement("td");
  const selo = document.createElement("span");
  selo.classList.add("selo", classificacao.classe);
  selo.textContent = classificacao.texto;
  tdClassificacao.appendChild(selo);

  // Coluna de ação (botão apagar)
  const tdAcoes = document.createElement("td");
  const btnApagar = document.createElement("button");
  btnApagar.textContent = "Apagar";
  btnApagar.classList.add("btn-apagar");
  btnApagar.addEventListener("click", () => apagarPessoa(pessoa.id));
  tdAcoes.appendChild(btnApagar);

  tr.appendChild(tdId);
  tr.appendChild(tdNome);
  tr.appendChild(tdIdade);
  tr.appendChild(tdAltura);
  tr.appendChild(tdPeso);
  tr.appendChild(tdImc);
  tr.appendChild(tdClassificacao);
  tr.appendChild(tdAcoes);

  return tr;
}

function render() {
  tabelaPessoas.innerHTML = "";

  pessoas.forEach((pessoa) => {
    const linha = criarLinha(pessoa);
    tabelaPessoas.appendChild(linha);
  });
}

// ==========================================
// 6. EVENTOS E INICIALIZAÇÃO DA APLICAÇÃO
// ==========================================
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

// Inicialização ao abrir a página
let pessoas = carregarPessoas();
ajustarContadorCodigo();
render();
