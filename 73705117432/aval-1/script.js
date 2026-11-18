// ===== Dados dos produtos =====
const PRODUTOS = [
  { id: 1, nome: 'Camiseta Básica Algodão', categoria: 'Camisetas', preco: 59.90, cor: '#2f4b7c', desc: 'Algodão penteado, caimento reto.' },
  { id: 2, nome: 'Camiseta Oversized', categoria: 'Camisetas', preco: 79.90, cor: '#c9b79c', desc: 'Modelagem ampla, 100% algodão.' },
  { id: 3, nome: 'Camisa de Linho Manga Longa', categoria: 'Camisas', preco: 149.90, cor: '#8aa39b', desc: 'Leve e fresca para o calor.' },
  { id: 4, nome: 'Camisa Social Slim', categoria: 'Camisas', preco: 129.90, cor: '#dfe6f0', desc: 'Tricoline com elastano.' },
  { id: 5, nome: 'Calça Jeans Reta', categoria: 'Calças', preco: 199.90, cor: '#1f2f52', desc: 'Jeans médio, cintura alta.' },
  { id: 6, nome: 'Calça de Alfaiataria', categoria: 'Calças', preco: 229.90, cor: '#3b3b3b', desc: 'Corte reto, acabamento fino.' },
  { id: 7, nome: 'Vestido Midi Linho', categoria: 'Vestidos', preco: 189.90, cor: '#b5532f', desc: 'Comprimento midi, forro leve.' },
  { id: 8, nome: 'Jaqueta Jeans Clássica', categoria: 'Jaquetas', preco: 259.90, cor: '#4f6d9a', desc: 'Lavagem clara, bolsos frontais.' }
];

const DESCONTO_PIX = 0.05;
const CHAVE = 'linhareta-carrinho';

// ===== Estado =====
let carrinho = carregar();           // { idProduto: quantidade }
let qtdEscolhida = {};               // quantidade selecionada nos cards
let categoriaAtiva = 'Todos';

// ===== Utilitários =====
const $ = (id) => document.getElementById(id);
const reais = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const produto = (id) => PRODUTOS.find((p) => p.id === Number(id));

function carregar() {
  try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch { return {}; }
}
function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(carrinho)); } catch {}
}
function avisar(msg) {
  const el = $('aviso');
  el.textContent = msg;
  el.classList.add('ativo');
  clearTimeout(avisar.t);
  avisar.t = setTimeout(() => el.classList.remove('ativo'), 1800);
}

// ===== Vitrine =====
function renderFiltros() {
  const cats = ['Todos', ...new Set(PRODUTOS.map((p) => p.categoria))];
  $('filtros').innerHTML = cats
    .map((c) => `<button data-cat="${c}" aria-pressed="${c === categoriaAtiva}">${c}</button>`)
    .join('');
}

function renderProdutos() {
  const lista = PRODUTOS.filter((p) => categoriaAtiva === 'Todos' || p.categoria === categoriaAtiva);
  $('produtos').innerHTML = lista.map((p) => {
    const q = qtdEscolhida[p.id] || 1;
    return `
    <article class="produto">
      <div class="amostra" style="background:${p.cor}"><span>${p.categoria}</span></div>
      <div class="corpo">
        <h3>${p.nome}</h3>
        <p class="desc">${p.desc}</p>
        <p class="preco">${reais(p.preco)}</p>
        <div class="acoes">
          <div class="qtd">
            <button data-acao="menos" data-id="${p.id}" aria-label="Diminuir quantidade">−</button>
            <output>${q}</output>
            <button data-acao="mais" data-id="${p.id}" aria-label="Aumentar quantidade">+</button>
          </div>
          <button class="add" data-acao="add" data-id="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>`;
  }).join('');
}

// ===== Carrinho =====
function calcularTotais() {
  const subtotal = Object.entries(carrinho)
    .reduce((soma, [id, q]) => soma + produto(id).preco * q, 0);
  const desconto = $('pix').checked ? subtotal * DESCONTO_PIX : 0;
  return { subtotal, desconto, total: subtotal - desconto };
}

function renderCarrinho() {
  const ids = Object.keys(carrinho);
  const totalItens = ids.reduce((s, id) => s + carrinho[id], 0);
  $('contador').textContent = totalItens;

  $('itens').innerHTML = ids.length
    ? ids.map((id) => {
        const p = produto(id), q = carrinho[id];
        return `
        <div class="item">
          <div class="mini" style="background:${p.cor}"></div>
          <div>
            <h4>${p.nome}</h4>
            <span class="un">${reais(p.preco)} cada</span>
            <div class="linha-qtd">
              <div class="qtd">
                <button data-c="menos" data-id="${id}" aria-label="Diminuir">−</button>
                <output>${q}</output>
                <button data-c="mais" data-id="${id}" aria-label="Aumentar">+</button>
              </div>
              <button class="rm" data-c="remover" data-id="${id}">Remover</button>
            </div>
          </div>
          <div class="sub">${reais(p.preco * q)}</div>
        </div>`;
      }).join('')
    : '<p class="vazio">Seu carrinho está vazio.<br>Escolha uma peça para começar.</p>';

  const t = calcularTotais();
  $('subtotal').textContent = reais(t.subtotal);
  $('desconto').textContent = '− ' + reais(t.desconto);
  $('linhaDesconto').hidden = t.desconto === 0;
  $('total').textContent = reais(t.total);
  $('finalizar').disabled = ids.length === 0;
  $('limpar').hidden = ids.length === 0;
  salvar();
}

function alterar(id, delta) {
  const nova = (carrinho[id] || 0) + delta;
  if (nova <= 0) delete carrinho[id]; else carrinho[id] = nova;
  renderCarrinho();
}

function abrir(abrirTudo) {
  $('carrinho').classList.toggle('aberto', abrirTudo);
  $('fundo').classList.toggle('ativo', abrirTudo);
}

// ===== Eventos =====
$('filtros').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  categoriaAtiva = b.dataset.cat;
  renderFiltros(); renderProdutos();
});

$('produtos').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  const id = Number(b.dataset.id);
  const atual = qtdEscolhida[id] || 1;
  if (b.dataset.acao === 'mais') qtdEscolhida[id] = Math.min(atual + 1, 99);
  if (b.dataset.acao === 'menos') qtdEscolhida[id] = Math.max(atual - 1, 1);
  if (b.dataset.acao === 'add') {
    alterar(id, atual);
    avisar(`${atual}× ${produto(id).nome} no carrinho`);
    qtdEscolhida[id] = 1;
  }
  renderProdutos();
});

$('itens').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  const id = b.dataset.id;
  if (b.dataset.c === 'mais') alterar(id, 1);
  if (b.dataset.c === 'menos') alterar(id, -1);
  if (b.dataset.c === 'remover') alterar(id, -carrinho[id]);
});

$('pix').addEventListener('change', renderCarrinho);
$('abrirCarrinho').addEventListener('click', () => abrir(true));
$('fecharCarrinho').addEventListener('click', () => abrir(false));
$('fundo').addEventListener('click', () => abrir(false));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') abrir(false); });

$('limpar').addEventListener('click', () => { carrinho = {}; renderCarrinho(); });
$('finalizar').addEventListener('click', () => {
  const { total } = calcularTotais();
  avisar(`Pedido de ${reais(total)} recebido. Obrigado pela compra!`);
  carrinho = {}; renderCarrinho(); abrir(false);
});

// ===== Início =====
renderFiltros();
renderProdutos();
renderCarrinho();