const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabela-pessoas");

const CHAVE_PESSOAS = "pessoas";
let contadorCodigo = 0;
let pessoas = [];

function gerarCodigo() {
  return ++contadorCodigo;
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

function salvar() {
  localStorage.setItem(CHAVE_PESSOAS, JSON.stringify(pessoas));
}

function carregarPessoas() {
  const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);
  if (!dadosSalvos) {
    return [];
  }

  try {
    const lista = JSON.parse(dadosSalvos);
    if (Array.isArray(lista)) {
      return lista;
    }
    return [];
  } catch (erro) {
    console.error("Erro ao carregar pessoas do localStorage:", erro);
    return [];
  }
}

function calcularImc(peso, altura) {
  return peso / (altura * altura);
}

function classificarImc(imc) {
  if (imc < 18.5) return { texto: "Abaixo do peso", classe: "abaixo" };
  if (imc < 25) return { texto: "Peso normal", classe: "normal" };
  if (imc < 30) return { texto: "Sobrepeso", classe: "sobrepeso" };
  if (imc < 35) return { texto: "Obesidade grau I", classe: "obesidade" };
  if (imc < 40) return { texto: "Obesidade grau II", classe: "obesidade" };
  return { texto: "Obesidade grau III", classe: "obesidade" };
}

function formatar(valor, casas) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

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
    return "Informe o nome com no mínimo duas letras.";
  }
  if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
    return "A idade deve ser um número inteiro entre 1 e 120.";
  }
  if (Number.isNaN(dados.altura) || dados.altura < 0.5 || dados.altura > 2.5) {
    return "A altura deve estar entre 0,50m e 2,50m.";
  }
  if (Number.isNaN(dados.peso) || dados.peso < 2 || dados.peso > 500) {
    return "O peso deve estar entre 2kg e 500kg.";
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

function adicionarPessoa(dados) {
  pessoas.push({
    id: gerarCodigo(),
    nome: dados.nome,
    idade: dados.idade,
    altura: dados.altura,
    peso: dados.peso
  });
}

function removerPessoa(id) {
  pessoas = pessoas.filter((pessoa) => pessoa.id !== id);
  salvar();
  render();
}

function criarCelula(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

function criarLinha(pessoa) {
  const tr = document.createElement("tr");
  tr.dataset.id = pessoa.id;

  const imc = calcularImc(pessoa.peso, pessoa.altura);
  const classificacao = classificarImc(imc);

  tr.appendChild(criarCelula(pessoa.nome));
  tr.appendChild(criarCelula(pessoa.idade));
  tr.appendChild(criarCelula(`${formatar(pessoa.altura, 2)} m`));
  tr.appendChild(criarCelula(`${formatar(pessoa.peso, 1)} kg`));
  tr.appendChild(criarCelula(formatar(imc, 1)));

  const tdClassificacao = document.createElement("td");
  const selo = document.createElement("span");
  selo.classList.add("selo", classificacao.classe);
  selo.textContent = classificacao.texto;
  tdClassificacao.appendChild(selo);
  tr.appendChild(tdClassificacao);

  const tdAcoes = document.createElement("td");
  const btnApagar = document.createElement("button");
  btnApagar.type = "button";
  btnApagar.textContent = "Apagar";
  btnApagar.classList.add("btn", "btn-apagar");
  btnApagar.addEventListener("click", () => removerPessoa(pessoa.id));
  tdAcoes.appendChild(btnApagar);
  tr.appendChild(tdAcoes);

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
    const linha = criarLinha(pessoa);
    tabelaPessoas.appendChild(linha);
  });
}

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

formPessoa.addEventListener("reset", () => {
  limparErro();
});

pessoas = carregarPessoas();
ajustarContadorCodigo();
render();