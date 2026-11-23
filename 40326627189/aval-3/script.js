'use strict';

// Referências aos elementos do HTML (DOM)
const formPessoa = document.getElementById('formPessoa');
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const inputAltura = document.getElementById('altura');
const inputPeso = document.getElementById('peso');

const tabelaPessoas = document.getElementById('tabelaPessoas');
const mensagemDeErro = document.getElementById('erro');
const totalPessoas = document.getElementById('totalPessoas');

const CHAVE_PESSOAS = 'pessoas';

let proximoId = 1;

// Lê os dados digitados no formulário.
function lerFormulario() {
  return {
    nome: inputNome.value.trim(),
    idade: Number(inputIdade.value),
    altura: Number(inputAltura.value),
    peso: Number(inputPeso.value)
  };
}

// Valida os campos antes de cadastrar.
function validarDados(dados) {

  if (dados.nome.length < 2) {
    return 'Informe o nome com no mínimo duas letras.';
  }

  if (
    !Number.isInteger(dados.idade) ||
    dados.idade < 1 ||
    dados.idade > 120
  ) {
    return 'A idade deve ser um número inteiro entre 1 e 120.';
  }

  if (
    !Number.isFinite(dados.altura) ||
    dados.altura < 0.5 ||
    dados.altura > 2.5
  ) {
    return 'A altura deve estar entre 0,50 m e 2,50 m.';
  }

  if (
    !Number.isFinite(dados.peso) ||
    dados.peso < 2 ||
    dados.peso > 500
  ) {
    return 'O peso deve estar entre 2 kg e 500 kg.';
  }

  return '';
}

// Exibe mensagens de erro.
function mostrarErro(mensagem) {
  mensagemDeErro.textContent = mensagem;
  mensagemDeErro.hidden = false;
}

// Limpa as mensagens de erro.
function limparErro() {
  mensagemDeErro.textContent = '';
  mensagemDeErro.hidden = true;
}

// Calcula o IMC.
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

// Classifica o resultado do IMC.
function classificarIMC(imc, idade) {

  if (idade < 18) {
    return {
      texto: 'Avaliação por idade',
      classe: 'selo-neutro'
    };
  }

  if (imc < 18.5) {
    return {
      texto: 'Abaixo do peso',
      classe: 'selo-alerta'
    };
  }

  if (imc < 25) {
    return {
      texto: 'Faixa adequada',
      classe: 'selo-normal'
    };
  }

  if (imc < 30) {
    return {
      texto: 'Sobrepeso',
      classe: 'selo-alerta'
    };
  }

  return {
    texto: 'Obesidade',
    classe: 'selo-risco'
  };
}

// Formata os valores numéricos.
function formatar(valor, casas) {
  return valor.toFixed(casas).replace('.', ',');
}

// Adiciona uma pessoa à lista.
function adicionarPessoa(dados) {

  const pessoa = {
    id: proximoId++,
    ...dados
  };

  pessoas.push(pessoa);

  salvarPessoas();
  render();
}

// Cria uma célula da tabela.
function criarCelula(texto, classe = '') {

  const td = document.createElement('td');

  td.textContent = texto;

  if (classe) {
    td.className = classe;
  }

  return td;
}

// Cria uma linha completa da tabela.
function criarLinha(pessoa) {

  const linha = document.createElement('tr');

  const imc = calcularIMC(
    pessoa.peso,
    pessoa.altura
  );

  const classificacao = classificarIMC(
    imc,
    pessoa.idade
  );

  linha.appendChild(
    criarCelula(
      String(pessoa.id).padStart(3, '0'),
      'code-cell'
    )
  );

  linha.appendChild(
    criarCelula(pessoa.nome, 'patient-name')
  );

  linha.appendChild(
    criarCelula(`${pessoa.idade} anos`)
  );

  linha.appendChild(
    criarCelula(`${formatar(pessoa.altura, 2)} m`)
  );

  linha.appendChild(
    criarCelula(`${formatar(pessoa.peso, 1)} kg`)
  );

  linha.appendChild(
    criarCelula(formatar(imc, 1))
  );

  // Cria a classificação colorida.
  const tdClassificacao = document.createElement('td');

  const selo = document.createElement('span');

  selo.classList.add(
    'selo',
    classificacao.classe
  );

  selo.textContent = classificacao.texto;

  tdClassificacao.appendChild(selo);

  linha.appendChild(tdClassificacao);

  // Cria o botão de excluir.
  const tdAcao = document.createElement('td');

  const botaoExcluir = document.createElement('button');

  botaoExcluir.type = 'button';
  botaoExcluir.className = 'delete-button';
  botaoExcluir.textContent = 'Excluir';

  botaoExcluir.setAttribute(
    'aria-label',
    `Excluir cadastro de ${pessoa.nome}`
  );

  botaoExcluir.addEventListener('click', () => {
    excluirPessoa(pessoa.id);
  });

  tdAcao.appendChild(botaoExcluir);

  linha.appendChild(tdAcao);

  return linha;
}

// Atualiza a tabela na tela.
function render() {

  tabelaPessoas.replaceChildren();

  if (pessoas.length === 0) {

    const linhaVazia = document.createElement('tr');

    linhaVazia.className = 'empty-row';

    const celula = document.createElement('td');

    celula.colSpan = 8;

    celula.textContent =
      'Nenhum paciente cadastrado. Adicione o primeiro registro acima.';

    linhaVazia.appendChild(celula);

    tabelaPessoas.appendChild(linhaVazia);

  } else {

    pessoas.forEach(pessoa => {
      tabelaPessoas.appendChild(
        criarLinha(pessoa)
      );
    });

  }

  totalPessoas.textContent = String(pessoas.length);
}

// Salva os dados no localStorage.
function salvarPessoas() {

  try {

    localStorage.setItem(
      CHAVE_PESSOAS,
      JSON.stringify(pessoas)
    );

  } catch (erro) {

    mostrarErro(
      'Não foi possível salvar os dados neste navegador.'
    );

    console.error('Erro ao salvar:', erro);
  }
}

// Recupera os dados salvos.
function carregarPessoas() {

  try {

    const dadosSalvos = localStorage.getItem(
      CHAVE_PESSOAS
    );

    if (dadosSalvos === null) {
      return [];
    }

    const dadosConvertidos = JSON.parse(dadosSalvos);

    return Array.isArray(dadosConvertidos)
      ? dadosConvertidos
      : [];

  } catch (erro) {

    console.error(
      'Não foi possível carregar os registros:',
      erro
    );

    return [];
  }
}

// Ajusta o contador de códigos.
function ajustarContador() {

  let maior = 0;

  pessoas.forEach(pessoa => {

    if (
      Number.isInteger(pessoa.id) &&
      pessoa.id > maior
    ) {
      maior = pessoa.id;
    }

  });

  proximoId = maior + 1;
}

// Exclui uma pessoa pelo ID.
function excluirPessoa(id) {

  pessoas = pessoas.filter(
    pessoa => pessoa.id !== id
  );

  salvarPessoas();
  render();
}

// Evento de envio do formulário.
formPessoa.addEventListener('submit', evento => {

  evento.preventDefault();

  const dados = lerFormulario();

  const erro = validarDados(dados);

  if (erro !== '') {

    mostrarErro(erro);

    return;
  }

  limparErro();

  adicionarPessoa(dados);

  formPessoa.reset();

  inputNome.focus();

});

// Inicialização da aplicação.
let pessoas = carregarPessoas();

ajustarContador();

render();