// ===================================================
// Ficha de Anamnese - Controle de IMC (Parte 2)
// ===================================================

// ---------- Referências do DOM ----------
const formPessoa = document.getElementById('form-pessoa');
const inputNome = document.getElementById('input-nome');
const inputIdade = document.getElementById('input-idade');
const inputAltura = document.getElementById('input-altura');
const inputPeso = document.getElementById('input-peso');
const mensagemDeErro = document.getElementById('erro');
const tabelaCorpo = document.getElementById('tabela-corpo');

// ---------- Estado da aplicação ----------
const chavePessoas = 'pessoas'; // chave usada no localStorage
let pessoas = [];
let proximoId = 1;

// ---------- Funções da aula anterior ----------

// Calcula o IMC: peso / (altura * altura)
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

// Classifica o IMC e devolve o texto e a classe CSS (cor do selo)
function classificarIMC(imc) {
  if (imc < 18.5) return { texto: 'Abaixo do peso', classe: 'abaixo' };
  if (imc < 25) return { texto: 'Peso normal', classe: 'normal' };
  if (imc < 30) return { texto: 'Sobrepeso', classe: 'sobrepeso' };
  return { texto: 'Obesidade', classe: 'obesidade' };
}

// Formata um número com N casas decimais no padrão brasileiro (vírgula)
function formatar(valor, casas) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

// ---------- Renderização da tabela ----------

// Monta uma linha (tr) com todos os dados de uma pessoa
function criarLinha(pessoa) {
  const imc = calcularIMC(pessoa.peso, pessoa.altura);
  const classificacao = classificarIMC(imc);

  const tr = document.createElement('tr');

  const tdNome = document.createElement('td');
  tdNome.textContent = pessoa.nome;
  tr.appendChild(tdNome);

  const tdIdade = document.createElement('td');
  tdIdade.textContent = pessoa.idade;
  tr.appendChild(tdIdade);

  const tdAltura = document.createElement('td');
  tdAltura.textContent = formatar(pessoa.altura, 2) + ' m';
  tr.appendChild(tdAltura);

  const tdPeso = document.createElement('td');
  tdPeso.textContent = formatar(pessoa.peso, 1) + ' KG';
  tr.appendChild(tdPeso);

  const tdIMC = document.createElement('td');
  tdIMC.textContent = formatar(imc, 1);
  tr.appendChild(tdIMC);

  const tdClassificacao = document.createElement('td');
  const selo = document.createElement('span');
  selo.classList.add('selo', classificacao.classe);
  selo.textContent = classificacao.texto;
  tdClassificacao.appendChild(selo);
  tr.appendChild(tdClassificacao);

  // Desafio: botão de apagar
  const tdAcoes = document.createElement('td');
  const botaoApagar = document.createElement('button');
  botaoApagar.type = 'button';
  botaoApagar.classList.add('botao-apagar');
  botaoApagar.textContent = 'Apagar';
  botaoApagar.addEventListener('click', function () {
    apagarPessoa(pessoa.id);
  });
  tdAcoes.appendChild(botaoApagar);
  tr.appendChild(tdAcoes);

  return tr;
}

// Apenas renderiza: limpa a tabela e desenha cada pessoa
function render() {
  tabelaCorpo.innerHTML = '';

  if (pessoas.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 7;
    td.classList.add('vazio');
    td.textContent = 'Nenhuma pessoa cadastrada.';
    tr.appendChild(td);
    tabelaCorpo.appendChild(tr);
    return;
  }

  pessoas.forEach(function (pessoa) {
    tabelaCorpo.appendChild(criarLinha(pessoa));
  });
}

// ---------- Formulário ----------

// Lê os campos do formulário e devolve um objeto
function lerFormulario() {
  return {
    nome: inputNome.value.trim(),
    idade: Number(inputIdade.value),
    altura: Number(inputAltura.value),
    peso: Number(inputPeso.value),
  };
}

// Adiciona uma pessoa ao array, com id gerado automaticamente
function adicionarPessoa(dados) {
  pessoas.push({
    id: proximoId++,
    nome: dados.nome,
    idade: dados.idade,
    altura: dados.altura,
    peso: dados.peso,
  });
}

// Remove uma pessoa da lista e do localStorage (desafio da aula)
function apagarPessoa(id) {
  pessoas = pessoas.filter(function (pessoa) {
    return pessoa.id !== id;
  });
  salvar();
  render();
}

// ---------- Validação e mensagens de erro ----------

// Retorna uma mensagem de erro, ou string vazia se os dados forem válidos
function validarDados(dados) {
  if (dados.nome.length < 2) {
    return 'Informe o nome com no mínimo de duas letras.';
  }
  if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
    return 'A idade deve ser um número inteiro entre 1 e 120.';
  }
  if (Number.isNaN(dados.altura) || dados.altura < 0.5 || dados.altura > 2.5) {
    return 'A altura deve ser um número entre 0,5 e 2,5 metros.';
  }
  if (Number.isNaN(dados.peso) || dados.peso < 2 || dados.peso > 500) {
    return 'O peso deve ser um número entre 2 e 500 kg.';
  }
  return '';
}

function mostrarErro(mensagem) {
  mensagemDeErro.textContent = mensagem;
  mensagemDeErro.hidden = false;
}

function limparErro() {
  mensagemDeErro.hidden = true;
}

// ---------- localStorage ----------

// Salva a lista de pessoas como texto (JSON)
function salvar() {
  localStorage.setItem(chavePessoas, JSON.stringify(pessoas));
}

// Carrega as pessoas salvas; se não houver nada (ou estiver inválido), devolve []
function carregarPessoas() {
  const texto = localStorage.getItem(chavePessoas);
  if (texto === null) {
    return [];
  }

  try {
    const lista = JSON.parse(texto);
    if (Array.isArray(lista)) {
      return lista;
    }
    return [];
  } catch (erro) {
    console.error('Não foi possível ler os dados salvos:', erro);
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

// ---------- Evento de envio do formulário ----------
formPessoa.addEventListener('submit', function (e) {
  e.preventDefault();

  const dados = lerFormulario();
  const erro = validarDados(dados);

  if (erro !== '') {
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

// ---------- Inicialização ----------
pessoas = carregarPessoas();
ajustarContador();
render();