// --- Dados e ID automático ---
let codigo = 0;
let pessoas = [];

function gerarCodigo() {
  return ++codigo; // pré-incremento: 1, 2, 3...
}

const tabelaPessoas = document.getElementById('tabelaPessoas');

// --- Criação da tabela ---
function criarCelula(conteudo, classe = '') {
  const td = document.createElement('td');
  td.textContent = conteudo;
  if (classe) td.classList.add(classe);
  return td;
}

function criarLinha(pessoa) {
  const tr = document.createElement('tr');
  tr.dataset.id = pessoa.id;

  const imc = calcularIMC(pessoa.peso, pessoa.altura);
  const classificacao = classificarIMC(imc);

  tr.appendChild(criarCelula(pessoa.nome));
  tr.appendChild(criarCelula(pessoa.idade));
  tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + ' m'));
  tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + ' kg'));
  tr.appendChild(criarCelula(formatar(imc, 2)));
  tr.appendChild(criarCelula(classificacao.texto, classificacao.classe));

  // Coluna Ações
  const tdAcoes = document.createElement('td');
  const btnExcluir = document.createElement('button');
  btnExcluir.textContent = 'Excluir';
  btnExcluir.onclick = () => {
    pessoas = pessoas.filter(p => p.id !== pessoa.id);
    render();
  };
  tdAcoes.appendChild(btnExcluir);
  tr.appendChild(tdAcoes);

  return tr;
}

function render() {
  tabelaPessoas.innerHTML = ''; // limpa antes de reconstruir

  if (pessoas.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 7;
    td.classList.add('vazio');
    td.textContent = 'Nenhuma pessoa cadastrada ainda';
    tr.appendChild(td);
    tabelaPessoas.appendChild(tr);
    return;
  }

  pessoas.forEach(pessoa => {
    tabelaPessoas.appendChild(criarLinha(pessoa));
  });
}

// ========== INÍCIO FUNÇÕES DE NEGÓCIO ==========
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificarIMC(imc) {
  if (imc < 18.5) return { texto: 'Abaixo do peso', classe: 'abaixo-peso' };
  if (imc < 25) return { texto: 'Peso normal', classe: 'normal' };
  if (imc < 30) return { texto: 'Sobrepeso', classe: 'sobrepeso' };
  if (imc < 35) return { texto: 'Obesidade grau 1', classe: 'obesidade-1' };
  if (imc < 40) return { texto: 'Obesidade grau 2', classe: 'obesidade-2' };
  return { texto: 'Obesidade grau 3', classe: 'obesidade-3' };
}

function formatar(valor, casas) {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}
// ========== FIM FUNÇÕES DE NEGÓCIO ==========

// --- Salvar / Cancelar ---
const formPessoa = document.getElementById('formPessoa');
const erro = document.getElementById('erro');

formPessoa.addEventListener('submit', (e) => {
  e.preventDefault();
  erro.textContent = '';

  const nome = document.getElementById('nome').value.trim();
  const idade = Number(document.getElementById('idade').value);
  const altura = Number(document.getElementById('altura').value);
  const peso = Number(document.getElementById('peso').value);

  if (!nome || !idade || !altura || !peso) {
    erro.textContent = 'Preencha todos os campos!';
    return;
  }
  if (idade < 1 || idade > 120) {
    erro.textContent = 'Idade deve ser entre 1 e 120.';
    return;
  }

  pessoas.push({ id: gerarCodigo(), nome, idade, altura, peso });
  render();
  formPessoa.reset();
});

document.getElementById('btnCancelar').addEventListener('click', () => {
  formPessoa.reset();
  erro.textContent = '';
});

// Chamada inicial
render();