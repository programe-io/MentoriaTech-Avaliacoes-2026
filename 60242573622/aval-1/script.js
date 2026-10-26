
'use strict';

const PRODUCTS_KEY = 'stockflow_products_v1';
const MOVEMENTS_KEY = 'stockflow_movements_v1';

const load = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

let products = load(PRODUCTS_KEY);
let movements = load(MOVEMENTS_KEY);
let currentMovementId = null;

const $ = id => document.getElementById(id);
const money = value => new Intl.NumberFormat('pt-BR', {
  style: 'currency', currency: 'BRL'
}).format(value);
const date = value => new Date(value).toLocaleString('pt-BR');

const save = () => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  localStorage.setItem(MOVEMENTS_KEY, JSON.stringify(movements));
};

const el = (tag, text, className) => {
  const node = document.createElement(tag);
  node.textContent = String(text);
  if (className) node.className = className;
  return node;
};

function toast(message) {
  const t = $('toast');
  t.textContent = message;
  t.style.display = 'block';
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.style.display = 'none', 3000);
}

function status(p) {
  return p.quantity === 0
    ? ['Sem estoque', 'out']
    : p.quantity <= p.minimum
      ? ['Estoque baixo', 'low']
      : ['Disponível', ''];
}

function show(view) {
  document.querySelectorAll('.view').forEach(v =>
    v.classList.toggle('hidden', v.id !== view)
  );
  document.querySelectorAll('.nav').forEach(n =>
    n.classList.toggle('active', n.dataset.view === view)
  );

  const headings = {
    dashboard: ['Dashboard', 'Acompanhe seu estoque em tempo real.'],
    products: ['Produtos', 'Cadastre, pesquise e gerencie seus produtos.'],
    movements: ['Movimentações', 'Consulte o histórico de entradas e saídas.']
  };

  $('page-title').textContent = headings[view][0];
  $('page-subtitle').textContent = headings[view][1];
  render();
}

function render() {
  const units = products.reduce((s, p) => s + p.quantity, 0);
  $('stat-products').textContent = products.length;
  $('stat-units').textContent = units.toLocaleString('pt-BR');
  $('stat-value').textContent = money(
    products.reduce((s, p) => s + p.quantity * p.price, 0)
  );

  const low = products.filter(p => p.quantity <= p.minimum);
  $('stat-low').textContent = low.length;

  renderMini(
    'low-list',
    low.slice(0, 6).map(p => ({
      title: p.name,
      detail: `${p.quantity} unidade(s) · mínimo ${p.minimum}`,
      right: status(p)[0]
    })),
    'Nenhum produto com estoque baixo.'
  );

  renderMini(
    'recent-list',
    movements.slice(0, 5).map(m => ({
      title: m.productName,
      detail: date(m.date),
      right: `${m.type === 'entrada' ? '+' : '−'}${m.quantity} un.`
    })),
    'Nenhuma movimentação registrada.'
  );

  const categories = [...new Set(products.map(p => p.category))]
    .sort((a, b) => a.localeCompare(b));

  const selected = $('category-filter').value;
  $('category-filter').replaceChildren(
    new Option('Todas as categorias', ''),
    ...categories.map(c => new Option(c, c))
  );
  $('category-filter').value = categories.includes(selected) ? selected : '';

  renderProducts();
  renderMovements();
}

function renderMini(id, items, empty) {
  const box = $(id);
  box.replaceChildren();

  if (!items.length) {
    box.append(el('div', empty, 'empty'));
    return;
  }

  items.forEach(item => {
    const row = el('div', '', 'mini-row');
    const left = el('div', '');
    left.append(el('strong', item.title), el('small', item.detail));
    row.append(left, el('strong', item.right));
    box.append(row);
  });
}

function renderProducts() {
  const term = $('search').value.trim().toLocaleLowerCase('pt-BR');
  const cat = $('category-filter').value;

  const filtered = products.filter(p =>
    (p.name.toLocaleLowerCase('pt-BR').includes(term) ||
     p.code.toLocaleLowerCase('pt-BR').includes(term)) &&
    (!cat || p.category === cat)
  );

  const body = $('product-rows');
  body.replaceChildren();

  if (!filtered.length) {
    const tr = el('tr', '');
    const td = el('td', 'Nenhum produto encontrado.');
    td.colSpan = 7;
    td.className = 'empty';
    tr.append(td);
    body.append(tr);
    return;
  }

  filtered.forEach(p => {
    const tr = el('tr', '');

    [p.name, p.code, p.category, p.quantity, money(p.price)]
      .forEach(value => tr.append(el('td', value)));

    const state = status(p);
    const td = el('td', '');
    td.append(el('span', state[0], `pill ${state[1]}`));
    tr.append(td);

    const actions = el('td', '');
    [['Movimentar', 'move'], ['Editar', 'edit'], ['Excluir', 'delete']]
      .forEach(([label, action]) => {
        const b = el('button', label,
          `action ${action === 'delete' ? 'danger' : ''}`);
        b.type = 'button';
        b.addEventListener('click', () => handleAction(action, p.id));
        actions.append(b);
      });
    tr.append(actions);
    body.append(tr);
  });
}

function renderMovements() {
  const body = $('movement-rows');
  body.replaceChildren();

  if (!movements.length) {
    const tr = el('tr', '');
    const td = el('td', 'Nenhuma movimentação registrada.');
    td.colSpan = 5;
    td.className = 'empty';
    tr.append(td);
    body.append(tr);
    return;
  }

  movements.forEach(m => {
    const tr = el('tr', '');
    tr.append(el('td', date(m.date)), el('td', m.productName));

    const td = el('td', '');
    td.append(el('span', m.type === 'entrada' ? 'Entrada' : 'Saída',
      `pill ${m.type === 'entrada' ? 'in' : 'out'}`));

    tr.append(td, el('td', m.quantity), el('td', m.note || '—'));
    body.append(tr);
  });
}

function openProduct(p = null) {
  $('product-form').reset();
  $('product-id').value = p?.id || '';
  $('form-title').textContent = p ? 'Editar produto' : 'Novo produto';
  $('name').value = p?.name || '';
  $('code').value = p?.code || '';
  $('category').value = p?.category || '';
  $('quantity').value = p?.quantity ?? 0;
  $('minimum').value = p?.minimum ?? 5;
  $('price').value = p?.price ?? 0;
  $('product-dialog').showModal();
}

function handleAction(action, id) {
  const p = products.find(p => p.id === id);
  if (!p) return;

  if (action === 'edit') openProduct(p);

  if (action === 'move') {
    currentMovementId = id;
    $('movement-form').reset();
    $('movement-product').textContent =
      `Produto: ${p.name} · Saldo atual: ${p.quantity}`;
    $('movement-dialog').showModal();
  }

  if (action === 'delete' &&
      confirm(`Excluir o produto "${p.name}"? O histórico de movimentações será preservado.`)) {
    products = products.filter(item => item.id !== id);
    save();
    render();
    toast('Produto excluído.');
  }
}

$('product-form').addEventListener('submit', e => {
  e.preventDefault();

  const id = $('product-id').value;
  const name = $('name').value.trim();
  const code = $('code').value.trim();
  const category = $('category').value.trim();
  const quantity = Number($('quantity').value);
  const minimum = Number($('minimum').value);
  const price = Number($('price').value);

  if (!name || !code || !category ||
      ![quantity, minimum, price].every(Number.isFinite) ||
      ![quantity, minimum].every(Number.isSafeInteger) ||
      quantity < 0 || minimum < 0 || price < 0) {
    toast('Confira os dados informados.');
    return;
  }

  if (products.some(p =>
    p.code.toLowerCase() === code.toLowerCase() && p.id !== id)) {
    toast('Já existe um produto com esse código.');
    return;
  }

  if (id) {
    const p = products.find(p => p.id === id);
    if (!p) return;

    const oldQuantity = p.quantity;
    Object.assign(p, { name, code, category, quantity, minimum, price });

    if (oldQuantity !== quantity) {
      movements.unshift({
        id: crypto.randomUUID(),
        productId: id,
        productName: name,
        type: quantity > oldQuantity ? 'entrada' : 'saida',
        quantity: Math.abs(quantity - oldQuantity),
        note: 'Ajuste manual no cadastro',
        date: new Date().toISOString()
      });
    }
  } else {
    const newId = crypto.randomUUID();
    products.unshift({
      id: newId, name, code, category, quantity, minimum, price
    });

    if (quantity > 0) {
      movements.unshift({
        id: crypto.randomUUID(),
        productId: newId,
        productName: name,
        type: 'entrada',
        quantity,
        note: 'Saldo inicial',
        date: new Date().toISOString()
      });
    }
  }

  save();
  $('product-dialog').close();
  render();
  toast('Produto salvo com sucesso!');
});

$('movement-form').addEventListener('submit', e => {
  e.preventDefault();
  const p = products.find(p => p.id === currentMovementId);
  if (!p) return;

  const quantity = Number($('movement-quantity').value);
  const type = $('movement-type').value;

  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    toast('Informe uma quantidade inteira positiva.');
    return;
  }

  if (type === 'saida' && quantity > p.quantity) {
    toast('Estoque insuficiente para esta saída.');
    return;
  }

  p.quantity += type === 'entrada' ? quantity : -quantity;

  movements.unshift({
    id: crypto.randomUUID(),
    productId: p.id,
    productName: p.name,
    type,
    quantity,
    note: $('movement-note').value.trim(),
    date: new Date().toISOString()
  });

  save();
  $('movement-dialog').close();
  render();
  toast('Movimentação registrada!');
});

$('export-btn').addEventListener('click', () => {
  const rows = [
    ['Código', 'Produto', 'Categoria', 'Quantidade',
     'Estoque mínimo', 'Preço unitário', 'Valor total'],
    ...products.map(p => [
      p.code, p.name, p.category, p.quantity, p.minimum,
      p.price.toFixed(2), (p.quantity * p.price).toFixed(2)
    ])
  ];

  const csv = '\uFEFF' + rows.map(row =>
    row.map(v => '"' + String(v).replaceAll('"', '""') + '"').join(';')
  ).join('\r\n');

  const url = URL.createObjectURL(
    new Blob([csv], { type: 'text/csv;charset=utf-8' })
  );

  const a = document.createElement('a');
  a.href = url;
  a.download = 'relatorio_estoque.csv';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

document.querySelectorAll('.nav').forEach(b =>
  b.addEventListener('click', () => show(b.dataset.view))
);
document.querySelectorAll('[data-go]').forEach(b =>
  b.addEventListener('click', () => show(b.dataset.go))
);
document.querySelectorAll('[data-close]').forEach(b =>
  b.addEventListener('click', () => $(b.dataset.close).close())
);

$('add-btn').addEventListener('click', () => openProduct());
$('search').addEventListener('input', renderProducts);
$('category-filter').addEventListener('change', renderProducts);

render();
