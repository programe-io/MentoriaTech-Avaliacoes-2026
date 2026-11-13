// Sistema de estoque: cadastro, listagem e atualização de produtos.
const CHAVE_ARMAZENAMENTO = 'estoqueFacilProdutos';
let produtos = carregarProdutos();
let temporizadorMensagem;

const formularioProduto = document.querySelector('#form-produto');
const corpoTabela = document.querySelector('#lista-produtos');
const elementoMensagem = document.querySelector('#mensagem');

const formatoMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

const formatoNumero = new Intl.NumberFormat('pt-BR');

// Aceita valores como 12,50 ou 12.50.
function converterParaNumero(texto) {
  let normalizado = String(texto).trim().replace(/\s/g, '');

  if (normalizado.includes(',') && normalizado.includes('.')) {
    normalizado = normalizado.replace(/\./g, '').replace(',', '.');
  } else {
    normalizado = normalizado.replace(',', '.');
  }

  return Number(normalizado);
}

function carregarProdutos() {
  try {
    const dadosSalvos = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!dadosSalvos) return [];

    const dados = JSON.parse(dadosSalvos);
    if (!Array.isArray(dados)) return [];

    return dados
      .filter((produto) => (
        produto &&
        typeof produto.codigo === 'string' &&
        typeof produto.descricao === 'string' &&
        Number.isInteger(Number(produto.quantidade)) &&
        Number(produto.quantidade) >= 0 &&
        Number.isFinite(Number(produto.valor)) &&
        Number(produto.valor) >= 0
      ))
      .map((produto) => ({
        codigo: produto.codigo,
        descricao: produto.descricao,
        quantidade: Number(produto.quantidade),
        valor: Number(produto.valor)
      }));
  } catch (erro) {
    console.warn('O armazenamento local não está disponível:', erro);
    return [];
  }
}

function guardarProdutos() {
  try {
    window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(produtos));
    return true;
  } catch (erro) {
    console.warn('Não foi possível guardar os produtos no navegador:', erro);
    return false;
  }
}

function escaparHTML(texto) {
  const caracteresSeguros = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return String(texto).replace(/[&<>"']/g, (caractere) => caracteresSeguros[caractere]);
}

function mostrarMensagem(texto, tipo = 'sucesso') {
  window.clearTimeout(temporizadorMensagem);
  elementoMensagem.textContent = texto;
  elementoMensagem.classList.toggle('error', tipo === 'erro');
  elementoMensagem.hidden = false;

  temporizadorMensagem = window.setTimeout(() => {
    elementoMensagem.hidden = true;
  }, 4200);
}

function confirmarGravacao() {
  if (guardarProdutos()) return true;

  mostrarMensagem(
    'A alteração foi feita, mas o navegador não conseguiu guardá-la. Os dados podem desaparecer ao fechar a página.',
    'erro'
  );
  return false;
}

function renderizarProdutos() {
  const totalProdutos = produtos.length;
  const totalUnidades = produtos.reduce(
    (total, produto) => total + produto.quantidade,
    0
  );
  const valorTotal = produtos.reduce(
    (total, produto) => total + produto.quantidade * produto.valor,
    0
  );

  document.querySelector('#total-produtos').textContent =
    formatoNumero.format(totalProdutos);
  document.querySelector('#total-unidades').textContent =
    formatoNumero.format(totalUnidades);
  document.querySelector('#valor-total').textContent =
    formatoMoeda.format(valorTotal);
  document.querySelector('#contador-lista').textContent =
    `${totalProdutos} ${totalProdutos === 1 ? 'produto' : 'produtos'}`;

  if (produtos.length === 0) {
    corpoTabela.innerHTML = `
      <tr>
        <td class="empty-state" colspan="3">
          <strong>Nenhum produto cadastrado</strong>
          <span>Use o formulário ao lado para adicionar o primeiro item.</span>
        </td>
      </tr>`;
    return;
  }

  corpoTabela.innerHTML = produtos.map((produto, indice) => {
    const codigoSeguro = escaparHTML(produto.codigo);
    const descricaoSegura = escaparHTML(produto.descricao);

    return `
      <tr>
        <td class="product-cell">
          <span class="product-name" title="${descricaoSegura}">${descricaoSegura}</span>
          <span class="product-code">Cód. ${codigoSeguro}</span>
        </td>
        <td>
          <form class="edit-form" data-field="quantidade" data-code="${codigoSeguro}" novalidate>
            <input
              id="quantidade-${indice}"
              class="edit-input"
              type="number"
              min="0"
              step="1"
              value="${produto.quantidade}"
              aria-label="Nova quantidade para ${descricaoSegura}"
              required>
            <button class="button button-small" type="submit" aria-label="Atualizar quantidade de ${descricaoSegura}">Atualizar</button>
          </form>
        </td>
        <td>
          <form class="edit-form" data-field="valor" data-code="${codigoSeguro}" novalidate>
            <input
              id="valor-${indice}"
              class="edit-input value-input"
              type="text"
              inputmode="decimal"
              value="${produto.valor}"
              aria-label="Novo valor unitário para ${descricaoSegura}"
              required>
            <button class="button button-small" type="submit" aria-label="Atualizar valor de ${descricaoSegura}">Atualizar</button>
          </form>
        </td>
      </tr>`;
  }).join('');
}

function adicionarProduto() {
  const campoCodigo = document.querySelector('#codigo');
  const campoDescricao = document.querySelector('#descricao');
  const campoQuantidade = document.querySelector('#quantidade');
  const campoValor = document.querySelector('#valor');

  const codigo = campoCodigo.value.trim();
  const descricao = campoDescricao.value.trim();
  const quantidadeTexto = campoQuantidade.value.trim();
  const valorTexto = campoValor.value.trim();

  const quantidade = Number(quantidadeTexto);
  const valor = converterParaNumero(valorTexto);

  if (!codigo || !descricao || quantidadeTexto === '' || valorTexto === '') {
    mostrarMensagem('Preencha todos os campos do produto.', 'erro');
    return;
  }

  if (!Number.isInteger(quantidade) || quantidade < 0) {
    mostrarMensagem('A quantidade deve ser um número inteiro igual ou maior que zero.', 'erro');
    campoQuantidade.focus();
    return;
  }

  if (!Number.isFinite(valor) || valor < 0) {
    mostrarMensagem('O valor unitário deve ser igual ou maior que zero.', 'erro');
    campoValor.focus();
    return;
  }

  const codigoExiste = produtos.some(
    (produto) => produto.codigo.toLowerCase() === codigo.toLowerCase()
  );

  if (codigoExiste) {
    mostrarMensagem('Já existe um produto cadastrado com esse código.', 'erro');
    campoCodigo.focus();
    return;
  }

  produtos.push({ codigo, descricao, quantidade, valor });

  const gravou = confirmarGravacao();
  renderizarProdutos();
  formularioProduto.reset();
  campoCodigo.focus();

  if (gravou) {
    mostrarMensagem(`Produto "${descricao}" cadastrado com sucesso.`);
  }
}

// O botão chama diretamente a função de cadastro.
document.querySelector('#btn-adicionar').addEventListener('click', adicionarProduto);

// Também permite cadastrar pressionando Enter num campo do formulário.
formularioProduto.addEventListener('submit', (evento) => {
  evento.preventDefault();
  adicionarProduto();
});

corpoTabela.addEventListener('submit', (evento) => {
  const formularioEdicao = evento.target.closest('form[data-field]');
  if (!formularioEdicao) return;

  evento.preventDefault();

  const codigo = formularioEdicao.dataset.code;
  const campo = formularioEdicao.dataset.field;
  const campoEntrada = formularioEdicao.querySelector('input');
  const texto = campoEntrada.value.trim();

  const novoValor = campo === 'valor'
    ? converterParaNumero(texto)
    : Number(texto);

  const produto = produtos.find((item) => item.codigo === codigo);

  if (!produto) {
    mostrarMensagem('Não foi possível encontrar esse produto.', 'erro');
    return;
  }

  if (texto === '' || !Number.isFinite(novoValor) || novoValor < 0) {
    mostrarMensagem('Digite um valor igual ou maior que zero.', 'erro');
    campoEntrada.focus();
    return;
  }

  if (campo === 'quantidade' && !Number.isInteger(novoValor)) {
    mostrarMensagem('A quantidade deve ser um número inteiro.', 'erro');
    campoEntrada.focus();
    return;
  }

  produto[campo] = novoValor;
  const gravou = confirmarGravacao();
  renderizarProdutos();

  if (gravou) {
    const nomeCampo = campo === 'quantidade' ? 'Quantidade' : 'Valor unitário';
    mostrarMensagem(`${nomeCampo} do produto "${produto.descricao}" atualizado com sucesso.`);
  }
});

renderizarProdutos();
