// =====================================================
// Projeto Controle de IMC - Ficha de Anamnese
// =====================================================

// ---------- Referências do DOM ----------
const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const corpoTabela = document.getElementById("corpo-tabela");
const mensagemVazio = document.getElementById("vazio");
const botaoVerificar = document.getElementById("btn-verificar");
const areaResultado = document.getElementById("resultado");

// ---------- Estado da aplicação ----------
const chavePessoas = "pessoas"; // chave usada no localStorage
let pessoas = [];
let proximoId = 1;

// ---------- Funções da aula anterior ----------

// Formata um número com a quantidade de casas decimais desejada
function formatar(valor, casas) {
  return valor.toFixed(casas).replace(".", ",");
}

// IMC = peso / (altura * altura)
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

// Retorna o texto e a classe CSS (cor) de acordo com o IMC
function classificarIMC(imc) {
  if (imc < 18.5) {
    return { texto: "Abaixo do peso", classe: "abaixo" };
  }
  if (imc < 25) {
    return { texto: "Peso normal", classe: "normal" };
  }
  if (imc < 30) {
    return { texto: "Sobrepeso", classe: "sobrepeso" };
  }
  return { texto: "Obesidade", classe: "obesidade" };
}

// ---------- Renderização ----------

// Monta uma linha (tr) da tabela com os dados de uma pessoa
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

  // Coluna de classificação com o "selo" colorido
  const tdClassificacao = document.createElement("td");
  const selo = document.createElement("span");
  selo.classList.add("selo");
  selo.classList.add(classificacao.classe);
  selo.textContent = classificacao.texto;
  tdClassificacao.appendChild(selo);

  // Coluna do botão apagar (desafio proposto na aula)
  const tdAcao = document.createElement("td");
  const botaoApagar = document.createElement("button");
  botaoApagar.type = "button";
  botaoApagar.classList.add("apagar");
  botaoApagar.textContent = "Apagar";
  botaoApagar.addEventListener("click", function () {
    apagarPessoa(pessoa.id);
  });
  tdAcao.appendChild(botaoApagar);

  tr.appendChild(tdNome);
  tr.appendChild(tdIdade);
  tr.appendChild(tdAltura);
  tr.appendChild(tdPeso);
  tr.appendChild(tdIMC);
  tr.appendChild(tdClassificacao);
  tr.appendChild(tdAcao);

  return tr;
}

// Apenas desenha as linhas na tela
function render() {
  corpoTabela.innerHTML = "";
  pessoas.forEach(function (pessoa) {
    corpoTabela.appendChild(criarLinha(pessoa));
  });
  mensagemVazio.hidden = pessoas.length > 0;
}

// ---------- Captura e adição de dados ----------

// Converte texto em número aceitando vírgula ou ponto (1,70 ou 1.70)
function lerNumero(texto) {
  return Number(texto.trim().replace(",", "."));
}

// Lê os campos do formulário e devolve um objeto
function lerFormulario() {
  return {
    nome: inputNome.value.trim(),
    idade: Number(inputIdade.value),
    altura: lerNumero(inputAltura.value),
    peso: lerNumero(inputPeso.value)
  };
}

// Insere uma nova pessoa no array
function adicionarPessoa(dados) {
  pessoas.push({
    id: proximoId++,
    nome: dados.nome,
    idade: dados.idade,
    altura: dados.altura,
    peso: dados.peso
  });
}

// ---------- Validação ----------

// Retorna uma mensagem de erro, ou "" quando os dados são válidos
function validarDados(dados) {
  if (dados.nome.length < 2) {
    return "Informe o nome com no mínimo duas letras.";
  }
  if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
    return "A idade deve ser um número inteiro entre 1 e 120.";
  }
  return validarMedidas(dados);
}

// Valida somente altura e peso (usada também no botão Verificar peso)
function validarMedidas(dados) {
  if (!(dados.altura >= 0.5 && dados.altura <= 2.5)) {
    return "A altura deve estar entre 0,5 m e 2,5 m.";
  }
  if (!(dados.peso >= 2 && dados.peso <= 500)) {
    return "O peso deve estar entre 2 kg e 500 kg.";
  }
  return "";
}

function mostrarErro(mensagem) {
  mensagemDeErro.textContent = mensagem;
  mensagemDeErro.hidden = false;
}

function limparErro() {
  mensagemDeErro.hidden = true;
}

// ---------- localStorage ----------

function salvar() {
  localStorage.setItem(chavePessoas, JSON.stringify(pessoas));
}

function carregarPessoas() {
  const texto = localStorage.getItem(chavePessoas);

  if (texto === null) {
    return [];
  }

  try {
    const lista = JSON.parse(texto);
    if (Array.isArray(lista)) {
      // descarta registros incompletos (ex.: dados antigos de outro projeto)
      return lista.filter(function (p) {
        return p && typeof p.nome === "string" &&
          typeof p.idade === "number" &&
          typeof p.altura === "number" &&
          typeof p.peso === "number" &&
          typeof p.id === "number";
      });
    }
    return [];
  } catch (erro) {
    console.error("Não foi possível ler os dados salvos:", erro);
    return [];
  }
}

// Garante que o próximo id seja maior que qualquer id já existente
function ajustarContador() {
  let maior = 0;
  pessoas.forEach(function (pessoa) {
    if (pessoa.id > maior) {
      maior = pessoa.id;
    }
  });
  proximoId = maior + 1;
}

// Desafio: remove da lista exibida e do localStorage
function apagarPessoa(id) {
  pessoas = pessoas.filter(function (pessoa) {
    return pessoa.id !== id;
  });
  salvar();
  render();
}

// ---------- Botão Verificar peso ----------

function mostrarResultado(dados) {
  const imc = calcularIMC(dados.peso, dados.altura);
  const classificacao = classificarIMC(imc);

  areaResultado.innerHTML = "";

  const texto = document.createElement("span");
  if (classificacao.classe === "normal") {
    texto.textContent = "Seu peso está normal. IMC: " + formatar(imc, 1) + " ";
  } else {
    texto.textContent = "Seu peso não está na faixa normal. IMC: " + formatar(imc, 1) + " ";
  }

  const selo = document.createElement("span");
  selo.classList.add("selo");
  selo.classList.add(classificacao.classe);
  selo.textContent = classificacao.texto;

  areaResultado.appendChild(texto);
  areaResultado.appendChild(selo);
  areaResultado.hidden = false;
}

botaoVerificar.addEventListener("click", function () {
  const dados = lerFormulario();
  const erro = validarMedidas(dados);

  if (erro !== "") {
    areaResultado.hidden = true;
    mostrarErro(erro);
    return;
  }

  limparErro();
  mostrarResultado(dados);
});

// ---------- Evento de envio do formulário ----------

formPessoa.addEventListener("submit", function (e) {
  e.preventDefault(); // impede o recarregamento da página

  const dados = lerFormulario();
  const erro = validarDados(dados);

  if (erro !== "") {
    mostrarErro(erro);
    return;
  }

  limparErro();
  areaResultado.hidden = true;
  adicionarPessoa(dados);
  salvar();
  formPessoa.reset();
  inputNome.focus();
  render();
});

// ---------- Inicialização ----------

pessoas = carregarPessoas();
ajustarContador();
render();