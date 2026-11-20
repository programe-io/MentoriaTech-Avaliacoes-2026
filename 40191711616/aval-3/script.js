const formImc = document.getElementById('form-imc');
const tabelaPessoas = document.getElementById('tabela-pessoas');
const mensagemVazia = document.getElementById('mensagem-vazia');

let pessoas = JSON.parse(localStorage.getItem('pessoas_imc')) || [];

function obterDadosIMC(peso, altura) {
  const imc = peso / (altura ** 2);
  let classificacao = '';

  if (imc < 18.5) {
    classificacao = 'Abaixo do peso';
  } else if (imc < 25) {
    classificacao = 'Peso normal';
  } else if (imc < 30) {
    classificacao = 'Sobrepeso';
  } else if (imc < 35) {
    classificacao = 'Obesidade Grau I';
  } else if (imc < 40) {
    classificacao = 'Obesidade Grau II';
  } else {
    classificacao = 'Obesidade Grau III';
  }

  return {
    valor: imc.toFixed(2),
    classificacao
  };
}

function salvarNoStorage() {
  localStorage.setItem('pessoas_imc', JSON.stringify(pessoas));
}

function criarCelula(texto) {
  const td = document.createElement('td');
  td.textContent = texto;
  return td;
}

function renderizarTabela() {
  tabelaPessoas.innerHTML = '';

  if (pessoas.length === 0) {
    mensagemVazia.classList.remove('oculto');
    return;
  }

  mensagemVazia.classList.add('oculto');

  pessoas.forEach((pessoa) => {
    const tr = document.createElement('tr');
    tr.dataset.id = pessoa.id;

    const dadosIMC = obterDadosIMC(pessoa.peso, pessoa.altura);

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(`${pessoa.idade} anos`));
    tr.appendChild(criarCelula(`${pessoa.altura.toFixed(2)} m`));
    tr.appendChild(criarCelula(`${pessoa.peso.toFixed(1)} kg`));
    tr.appendChild(criarCelula(dadosIMC.valor));
    tr.appendChild(criarCelula(dadosIMC.classificacao));

    const tdAcoes = document.createElement('td');
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.classList.add('btn-excluir');
    tdAcoes.appendChild(btnExcluir);
    tr.appendChild(tdAcoes);

    tabelaPessoas.appendChild(tr);
  });
}

formImc.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const idade = Number(document.getElementById('idade').value);
  const altura = Number(document.getElementById('altura').value);
  const peso = Number(document.getElementById('peso').value);

  if (!nome || idade <= 0 || altura <= 0 || peso <= 0) {
    alert('Preencha todos os campos com valores válidos.');
    return;
  }

  const novaPessoa = {
    id: Date.now(),
    nome,
    idade,
    altura,
    peso
  };

  pessoas.push(novaPessoa);
  salvarNoStorage();
  renderizarTabela();
  formImc.reset();
});

tabelaPessoas.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('btn-excluir')) {
    const linha = evento.target.closest('tr');
    const id = Number(linha.dataset.id);

    pessoas = pessoas.filter((pessoa) => pessoa.id !== id);
    salvarNoStorage();
    renderizarTabela();
  }
});

renderizarTabela();