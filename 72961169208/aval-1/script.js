/* ==========================================================
   SISTEMA DE ESTOQUE
   estrutura: array de objetos { codigo, descricao, quantidade, valor }
   funções pedidas no desafio:
     - cadastrarProduto()
     - listarProdutos()
     - alterarValor()
     - alterarQuantidade()
   ========================================================== */

const estoque = [];

// ---------- utilidades ----------
function formatarMoeda(valor){
  return valor.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
}
function codigoExiste(codigo){
  return estoque.some(p => p.codigo.toLowerCase() === codigo.trim().toLowerCase());
}
function encontrarProduto(codigo){
  return estoque.find(p => p.codigo.toLowerCase() === codigo.trim().toLowerCase());
}

// ---------- funções principais ----------
function cadastrarProduto(codigo, descricao, quantidade, valor){
  if(!codigo || !codigo.trim() || !descricao || !descricao.trim()){
    throw new Error('Código e descrição são obrigatórios.');
  }
  if(codigoExiste(codigo)) throw new Error('Já existe um produto com esse código.');
  if(!Number.isFinite(quantidade) || !Number.isFinite(valor)){
    throw new Error('Quantidade e valor precisam ser números válidos.');
  }
  if(quantidade < 0 || valor < 0) throw new Error('Quantidade e valor não podem ser negativos.');

  estoque.push({
    codigo: codigo.trim(),
    descricao: descricao.trim(),
    quantidade: Number(quantidade),
    valor: Number(valor)
  });
  listarProdutos();
}

function listarProdutos(){
  renderizarLista(estoque);
  atualizarStats();
  return estoque;
}

function alterarValor(codigo, novoValor){
  const produto = encontrarProduto(codigo);
  if(!produto) throw new Error('Produto não encontrado.');
  if(!Number.isFinite(novoValor)) throw new Error('Informe um valor numérico válido.');
  if(novoValor < 0) throw new Error('O valor não pode ser negativo.');
  produto.valor = Number(novoValor);
  listarProdutos();
}

function alterarDescricao(codigo, novaDescricao){
  const produto = encontrarProduto(codigo);
  if(!produto) throw new Error('Produto não encontrado.');
  if(!novaDescricao || !novaDescricao.trim()) throw new Error('A descrição não pode ficar vazia.');
  produto.descricao = novaDescricao.trim();
  listarProdutos();
}

function alterarQuantidade(codigo, novaQuantidade){
  const produto = encontrarProduto(codigo);
  if(!produto) throw new Error('Produto não encontrado.');
  if(!Number.isFinite(novaQuantidade)) throw new Error('Informe uma quantidade numérica válida.');
  if(novaQuantidade < 0) throw new Error('A quantidade não pode ser negativa.');
  produto.quantidade = Number(novaQuantidade);
  listarProdutos();
}

function removerProduto(codigo){
  const i = estoque.findIndex(p => p.codigo.toLowerCase() === codigo.toLowerCase());
  if(i > -1) estoque.splice(i, 1);
  listarProdutos();
}

// ---------- renderização ----------
const listaContainer = document.getElementById('lista-container');

function renderizarLista(produtos){
  if(produtos.length === 0){
    listaContainer.innerHTML = '<div class="empty">Nenhum produto cadastrado ainda.<br>Use o formulário para começar.</div>';
    return;
  }
  listaContainer.innerHTML = '<div class="cards">' + produtos.map(produtoParaHTML).join('') + '</div>';
}

function escaparHtml(texto){
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function produtoParaHTML(p){
  const cod = escaparHtml(p.codigo);
  const desc = escaparHtml(p.descricao);
  const alerta = p.quantidade <= 5 ? '<span class="low-tag">Estoque baixo</span>' : '';

  return `
    <article class="glass card">
      <button class="remove-btn" title="Remover" data-action="remover" data-codigo="${cod}">&times;</button>
      <div class="card-code">${p.codigo}</div>
      <div class="card-desc-row">
        <div class="card-desc">${p.descricao}</div>
        <button type="button" class="edit-name-btn" title="Editar nome" data-action="editar-desc" data-codigo="${cod}" data-desc="${desc}">✎</button>
      </div>

      <div class="card-row">
        <span class="row-label">Quantidade</span>
        <span class="stepper">
          <button type="button" data-action="dec-qtd" data-codigo="${cod}" data-qtd="${p.quantidade}">&minus;</button>
          <span class="row-value">${p.quantidade}</span>
          <button type="button" data-action="inc-qtd" data-codigo="${cod}" data-qtd="${p.quantidade}">&plus;</button>
        </span>
      </div>

      <div class="card-row">
        <span class="row-label">Valor unit.</span>
        <span class="edit-value">
          <span class="row-value">${formatarMoeda(p.valor)}</span>
          <button type="button" data-action="editar-valor" data-codigo="${cod}" data-valor="${p.valor}">Editar</button>
        </span>
      </div>

      ${alerta}
    </article>
  `;
}

function pedirNovoValor(codigo, valorAtual){
  const entrada = prompt('Novo valor unitário para ' + codigo + ':', valorAtual.toFixed(2));
  if(entrada === null) return;
  const novoValor = parseFloat(entrada.replace(',', '.'));
  if(isNaN(novoValor)){ alert('Valor inválido.'); return; }
  try{ alterarValor(codigo, novoValor); }
  catch(e){ alert(e.message); }
}

function pedirNovaDescricao(codigo, descricaoAtual){
  const entrada = prompt('Novo nome/descrição para ' + codigo + ':', descricaoAtual);
  if(entrada === null) return;
  try{ alterarDescricao(codigo, entrada); }
  catch(e){ alert(e.message); }
}

// ---------- delegação de eventos: um único listener para todos os botões dos cards ----------
// (evita depender de onclick inline, que pode ser bloqueado em alguns ambientes)
listaContainer.addEventListener('click', function(e){
  const btn = e.target.closest('button[data-action]');
  if(!btn) return;

  const acao = btn.dataset.action;
  const codigo = btn.dataset.codigo;

  try{
    if(acao === 'remover'){
      removerProduto(codigo);
    }
    else if(acao === 'dec-qtd'){
      const atual = Number(btn.dataset.qtd);
      alterarQuantidade(codigo, Math.max(0, atual - 1));
    }
    else if(acao === 'inc-qtd'){
      const atual = Number(btn.dataset.qtd);
      alterarQuantidade(codigo, atual + 1);
    }
    else if(acao === 'editar-valor'){
      pedirNovoValor(codigo, Number(btn.dataset.valor));
    }
    else if(acao === 'editar-desc'){
      pedirNovaDescricao(codigo, btn.dataset.desc);
    }
  }catch(err){
    alert(err.message);
  }
});

// ---------- stats do topo ----------
function atualizarStats(){
  const totalProdutos = estoque.length;
  const totalItens = estoque.reduce((s, p) => s + p.quantidade, 0);
  const valorTotal = estoque.reduce((s, p) => s + p.quantidade * p.valor, 0);
  const baixoEstoque = estoque.filter(p => p.quantidade <= 5).length;

  document.getElementById('stat-total').textContent = totalProdutos;
  document.getElementById('stat-itens').textContent = totalItens;
  document.getElementById('stat-valor').textContent = formatarMoeda(valorTotal);
  document.getElementById('stat-baixo').textContent = baixoEstoque;
}

// ---------- formulário ----------
const form = document.getElementById('form-produto');
const msg = document.getElementById('form-msg');
let toastTimer = null;

const campoCodigo = document.getElementById('codigo');
const campoDescricao = document.getElementById('descricao');
const campoQuantidade = document.getElementById('quantidade');
const campoValor = document.getElementById('valor');

function marcarErro(inputEl, temErro){
  const wrapper = inputEl.closest('.field');
  if(!wrapper) return;
  wrapper.classList.toggle('has-error', temErro);
}

// remove o estado de erro assim que a pessoa começa a corrigir o campo
[campoCodigo, campoDescricao, campoQuantidade, campoValor].forEach(el => {
  el.addEventListener('input', () => marcarErro(el, false));
});

function mostrarToast(texto, tipo){
  if(toastTimer){ clearTimeout(toastTimer); toastTimer = null; }
  msg.textContent = texto;
  msg.className = tipo;

  // mensagens de sucesso somem sozinhas; erros ficam até o usuário corrigir
  if(tipo === 'ok'){
    toastTimer = setTimeout(() => {
      msg.textContent = '';
      msg.className = '';
      toastTimer = null;
    }, 3500);
  }
}

form.addEventListener('submit', function(e){
  e.preventDefault();

  const codigo = campoCodigo.value;
  const descricao = campoDescricao.value;
  const quantidadeTexto = campoQuantidade.value.trim();
  const valorTexto = campoValor.value.trim().replace(',', '.');
  const quantidade = parseInt(quantidadeTexto, 10);
  const valor = parseFloat(valorTexto);

  // validação visual: marca cada campo obrigatório vazio ou inválido
  const codigoInvalido = !codigo.trim();
  const descricaoInvalida = !descricao.trim();
  const quantidadeInvalida = quantidadeTexto === '' || !Number.isFinite(quantidade) || quantidade < 0;
  const valorInvalido = valorTexto === '' || !Number.isFinite(valor) || valor < 0;

  marcarErro(campoCodigo, codigoInvalido);
  marcarErro(campoDescricao, descricaoInvalida);
  marcarErro(campoQuantidade, quantidadeInvalida);
  marcarErro(campoValor, valorInvalido);

  if(codigoInvalido || descricaoInvalida || quantidadeInvalida || valorInvalido){
    mostrarToast('Preencha todos os campos obrigatórios corretamente.', 'err');
    return;
  }

  try{
    cadastrarProduto(codigo, descricao, quantidade, valor);
    mostrarToast('Produto cadastrado com sucesso.', 'ok');
    form.reset();
    campoCodigo.focus();
  }catch(err){
    mostrarToast(err.message, 'err');
  }
});

listarProdutos();
