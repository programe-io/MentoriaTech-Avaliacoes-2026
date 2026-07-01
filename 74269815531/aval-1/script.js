// DADOS Da VSPOTS
const produtos = [
    {
        id: 1,
        nome: "Chuteira Campo Pro",
        desc: "Trava mista, couro sintético premium",
        preco: 249.90,
        categoria: "futebol",
        img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSsMGuwpXd6ITS2yWVD-D4-hkVguGYLDYM6jd99p3iwdZQO3pCO_MkS4I8fmTTr8n2hAbNcIjjZVYxjpIBG4igur9VsrRfyt6oj4Zwwi2BnqbF59wq6kYQeKQ&usqp=CAc"
    },
    {
        id: 2,
        nome: "Bola Futebol Oficial",
        desc: "FIFA Quality Pro, 32 gomos",
        preco: 129.90,
        categoria: "futebol",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-eCEpzn8s8h-pqkxFLa0YkJERxPmM4e1x71yX23jWwg&s=10"
    },
    {
        id: 3,
        nome: "Tênis Corrida Air",
        desc: "Amortecimento máximo, leveza extrema",
        preco: 389.90,
        categoria: "corrida",
        img: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=200"
    },
    {
        id: 4,
        nome: "Camisa Dry Fit",
        desc: "Respirável, anti-odor. Várias cores",
        preco: 89.90,
        categoria: "corrida",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZjmEe9YzR5Uwmk_vCP7wo_2RvTQs7YDmom3iQ62JVw&s=10"
    },
    {
        id: 5,
        nome: "Kit 3 Pares Meia",
        desc: "Esportiva cano médio, algodão",
        preco: 49.90,
        categoria: "ofertas",
        img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSlIv-u7QlVswkG-vaKlF3q8FrdwYDEzn3qPZFaljmy7Ggjr0CdjIwjgXdpLGKgu3F2r1u1H6rwNdboNLCUJq8HXs6sN3KKpRVXi2lVWaYHzCuhrbhAs59zqguj2cG9yMgoY_YHaYWtdxs&usqp=CAc"
    },
    {
        id: 6,
        nome: "Combo Vspots Futebol",
        desc: "Bola + Meião + Caneleira | -20%",
        preco: 159.90,
        categoria: "ofertas",
        img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=200"
    }
];

// CONFIGURAÇÕES
const NUMERO_WHATSAPP = "5589999221649";
const FRETE = 15.00;
let carrinho = [];
let categoriaAtual = 'todos';

// DOM ELEMENTS
const listaProdutosEl = document.getElementById('lista-produtos');
const buscaInputEl = document.getElementById('busca-input');
const categoriasNavEl = document.getElementById('categorias-nav');
const totalCarrinhoEl = document.getElementById('total-carrinho');
const totalFinalEl = document.getElementById('total-final');
const modalSubtotalEl = document.getElementById('modal-subtotal');
const modalTotalEl = document.getElementById('modal-total');
const carrinhoFixoEl = document.getElementById('carrinho-fixo');
const itensCarrinhoEl = document.getElementById('itens-carrinho');
const modalCarrinhoEl = document.getElementById('modal-carrinho');
const taxaEntregaTxtEl = document.getElementById('taxa-entrega-txt');

// INIT
document.addEventListener('DOMContentLoaded', () => {
    taxaEntregaTxtEl.innerText = `R$ ${FRETE.toFixed(2).replace('.', ',')}`;
    renderizarProdutos();
    addEventListeners();
});

function addEventListeners() {
    buscaInputEl.addEventListener('keyup', filtrarProdutos);
    categoriasNavEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('categoria')) {
            filtrarCategoria(e.target.dataset.cat, e.target);
        }
    });
    document.getElementById('abrir-carrinho-btn').addEventListener('click', abrirCarrinho);
    document.getElementById('fechar-carrinho-btn').addEventListener('click', fecharCarrinho);
    document.getElementById('finalizar-btn-fixo').addEventListener('click', finalizarPedido);
    document.getElementById('finalizar-btn-modal').addEventListener('click', finalizarPedido);
    listaProdutosEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) {
            adicionarCarrinho(parseInt(e.target.dataset.id), e.target);
        }
    });
    itensCarrinhoEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            removerCarrinho(parseInt(e.target.dataset.id));
        }
    });
}

// RENDERIZA PRODUTOS NA TELA
function renderizarProdutos() {
    const busca = buscaInputEl.value.toLowerCase();
    
    let produtosFiltrados = produtos.filter(p => {
        const matchCategoria = categoriaAtual === 'todos' || p.categoria === categoriaAtual;
        const matchBusca = p.nome.toLowerCase().includes(busca) || p.desc.toLowerCase().includes(busca);
        return matchCategoria && matchBusca;
    });

    listaProdutosEl.innerHTML = '<img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600" alt="Banner Vspots com equipamentos esportivos" class="banner"><h2 class="secao-titulo">Mais Vendidos</h2>';
    
    if (produtosFiltrados.length === 0) {
        listaProdutosEl.innerHTML += `<p style="text-align:center; padding: 20px; color: var(--cor-destaque);">Nenhum produto encontrado.</p>`;
        return;
    }

    produtosFiltrados.forEach(produto => {
        listaProdutosEl.innerHTML += `
            <div class="card">
                <img src="${produto.img}" alt="${produto.nome}" loading="lazy">
                <div class="card-info">
                    <div>
                        <div class="card-titulo">${produto.nome}</div>
                        <div class="card-desc">${produto.desc}</div>
                    </div>
                    <div class="card-footer">
                        <div class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
                        <button class="add-btn" data-id="${produto.id}">Adicionar</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// ADICIONAR AO CARRINHO
function adicionarCarrinho(id, btn) {
    const produto = produtos.find(p => p.id === id);
    const itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.qtd++;
    } else {
        carrinho.push({...produto, qtd: 1});
    }
    
    atualizarCarrinho();
    
    btn.innerText = "Adicionado ✓";
    btn.style.background = "#555";
    btn.disabled = true;
    setTimeout(() => {
        btn.innerText = "Adicionar";
        btn.style.background = "";
        btn.disabled = false;
    }, 800);
}

// REMOVER DO CARRINHO
function removerCarrinho(id) {
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.qtd--;
        if (itemExistente.qtd === 0) {
            carrinho = carrinho.filter(item => item.id !== id);
        }
    }
    atualizarCarrinho();
}

// ATUALIZA OS VALORES DA INTERFACE
function atualizarCarrinho() {
    const totalProdutos = carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0);
    const totalComFrete = totalProdutos + FRETE;
    
    totalCarrinhoEl.innerText = totalProdutos.toFixed(2).replace('.', ',');
    totalFinalEl.innerText = totalComFrete.toFixed(2).replace('.', ',');
    modalSubtotalEl.innerText = "R$ " + totalProdutos.toFixed(2).replace('.', ',');
    modalTotalEl.innerText = "R$ " + totalComFrete.toFixed(2).replace('.', ',');
    
    carrinhoFixoEl.classList.toggle('ativo', carrinho.length > 0);
    
    const itensHtml = carrinho.map(item => `
        <div class="item-carrinho">
            <span>${item.qtd}x ${item.nome}</span>
            <div class="item-acoes">
                <span>R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}</span>
                <button class="remove-btn" data-id="${item.id}">X</button>
            </div>
        </div>
    `).join('');
    
    itensCarrinhoEl.innerHTML = itensHtml || '<p style="color:var(--cor-destaque); text-align:center; padding: 20px 0;">Seu carrinho está vazio</p>';
}

// CONTROLE DE CATEGORIAS E BUSCA
function filtrarCategoria(cat, btnAtivo) {
    categoriaAtual = cat;
    document.querySelectorAll('.categoria').forEach(btn => btn.classList.remove('ativa'));
    btnAtivo.classList.add('ativa');
    renderizarProdutos();
}
function filtrarProdutos() { renderizarProdutos(); }

// CONTROLE
function abrirCarrinho() { modalCarrinhoEl.style.display = 'block'; }
function fecharCarrinho() { modalCarrinhoEl.style.display = 'none'; }

// WHATSAPP
function finalizarPedido() {
    if (carrinho.length === 0) return;
    
    let msg = "Olá! Quero fazer um pedido na Vspots:\n\n";
    carrinho.forEach(item => {
        const subtotalItem = (item.preco * item.qtd).toFixed(2).replace('.', ',');
        msg += `${item.qtd}x ${item.nome} - R$ ${subtotalItem}\n`;
    });
    
    const totalGeral = carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0) + FRETE;
    msg += `\nFrete: R$ ${FRETE.toFixed(2).replace('.', ',')}\n`;
    msg += `*Total: R$ ${totalGeral.toFixed(2).replace('.', ',')}*\n\n`;
    msg += "Endereço para entrega: ";
    
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(msg)}`;
    window.location.href = urlWhatsApp;
}