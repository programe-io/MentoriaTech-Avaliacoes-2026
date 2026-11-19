// ===== Controle de código (ID) =====
let contadorCodigo = 0;

function gerarCodigo() {
  return ++contadorCodigo;
}

// ===== Referências do DOM =====
const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");
const mensagemDeErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabela-pessoas");

// ===== Armazenamento =====
const chavePessoas = "pessoas";

// ===== Funções de regra de negócio (início) =====
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificarIMC(imc) {
  if (imc < 18.5) return { texto: "Abaixo do peso", classe: "abaixo" };
  if (imc < 25) return { texto: "Peso normal", classe: "normal" };
  if (imc < 30) return { texto: "Sobrepeso", classe: "sobrepeso" };
  if (imc < 35) return { texto: "Obesidade grau I", classe: "obesidade" };
  if (imc < 40) return { texto: "Obesidade grau II", classe: "obesidade" };
  return { texto: "Obesidade grau III", classe: "obesidade" };
}

function formatar(valor, casas) {
  return Number(valor).toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}
// ===== Funções de regra de negócio (fim) =====

// ===== Renderização =====
function criarCelula(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

function criarLinha(pessoa) {
  const imc = calcularIMC(pessoa.peso, pessoa.altura);
  const classificacao = classificarIMC(imc);

  const tr = document.createElement("tr");
  tr.dataset.id = pessoa.id;

  tr.appendChild(criarCelula(pessoa.nome));
  tr.appendChild(criarCelula(pessoa.idade));
  tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
  tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " KG"));
  tr.appendChild(criarCelula(formatar(imc, 1)));

  const tdClassificacao = document.createElement("td");
  const selo = document.createElement("span");
  selo.classList.add("selo", classificacao.classe);
  selo.textContent = classificacao.texto;
  tdClassificacao.appendChild(selo);
  tr.appendChild(tdClassificacao);

  return tr;
}

function render() {
  tabelaPessoas.innerHTML = "";

  if (pessoas.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 7;
    td.classList.add("vazio");
    td.textContent = "Nenhuma pessoa cadastrada ainda";
    tr.appendChild(td);
    tabelaPessoas.appendChild(tr);
    return;
  }

  pessoas.forEach((pessoa) => {
    tabelaPessoas.appendChild(criarLinha(pessoa));
  });
}

// ===== Formulário =====
function lerFormulario() {
  return {
    nome: inputNome.value.trim(),
    idade: Number(inputIdade.value),
    altura: Number(inputAltura.value),
    peso: Number(inputPeso.value),
  };
}

function adicionarPessoa(dados) {
  pessoas.push({
    id: gerarCodigo(),
    nome: dados.nome,
    idade: dados.idade,
    altura: dados.altura,
    peso: dados.peso,
  });
}

function validarDados(dados) {
  if (dados.nome.length < 2) {
    return "Informe o nome com no mínimo duas letras.";
  }
  if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
    return "A idade deve ser um número inteiro entre 1 e 120.";
  }
  if (!(dados.altura >= 0.5 && dados.altura <= 2.5)) {
    return "A altura deve estar entre 0,5 e 2,5 metros.";
  }
  if (!(dados.peso >= 2 && dados.peso <= 500)) {
    return "O peso deve estar entre 2 e 500 kg.";
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

// ===== localStorage =====
function salvar() {
  localStorage.setItem(chavePessoas, JSON.stringify(pessoas));
}

function carregarPessoas() {
  const texto = localStorage.getItem(chavePessoas);
  if (texto === null) return [];

  try {
    const dados = JSON.parse(texto);
    if (Array.isArray(dados)) return dados;
    throw new Error("Os dados salvos não são uma lista.");
  } catch (erro) {
    console.error("Erro ao carregar as pessoas salvas:", erro);
    return [];
  }
}

function ajustarContadorCodigo() {
  let maior = 0;
  pessoas.forEach((pessoa) => {
    if (pessoa.id > maior) maior = pessoa.id;
  });
  contadorCodigo = maior;
}

// ===== Evento de envio =====
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
ajustarContadorCodigo();
render();