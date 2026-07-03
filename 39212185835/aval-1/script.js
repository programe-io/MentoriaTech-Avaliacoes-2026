// BANCO DE DADOS LOCAL DE PRODUTOS
const PRODUTOS_PADRAO = [
    { id: 1, nome: "iPhone 13 Apple (128GB) Estelar", categoria: "smartphones", preco: 3899.00, imagem: "https://images.unsplash.com/photo-1632922267756-9b71242b1592?w=400", destaque: true, desc: "Câmera dupla avançada, chip A15 Bionic e excelente autonomia." },
    { id: 2, nome: "Notebook UltraBook Pro i7 16GB", categoria: "notebooks", preco: 5199.00, imagem: "https://images.unsplash.com/photo-1496181130204-7552cc1524e2?w=400", destaque: true, desc: "Performance extrema com SSD NVMe de 512GB e tela IPS Full HD." },
    { id: 3, nome: "Headphone Bluetooth Noise Cancelling", categoria: "audio", preco: 549.00, imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400", destaque: true, desc: "Isolamento acústico ativo inteligente e bateria de até 30 horas." },
    { id: 4, nome: "Smartwatch Sport Series V2", categoria: "audio", preco: 1099.00, imagem: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400", destaque: false, desc: "GPS integrado, sensores de saúde e resistência à água de até 50m." }
];

// VARIÁVEIS DE ESTADO (ESTRUTURADAS EM LOCALSTORAGE)
let estado = {
    carrinho: JSON.parse(localStorage.getItem('ts_cart')) || [],
    favoritos: JSON.parse(localStorage.getItem('ts_favs')) || [],
    usuario: JSON.parse(localStorage.getItem('ts_user')) || null,
    pedidos: JSON.parse(localStorage.getItem('ts_orders')) || [],
    categoriaFiltro: 'todos',
    ordenacao: 'padrao',
    frete: 0,
    desconto: 0
};

// INICIALIZAÇÃO DO SISTEMA
document.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.getItem('ts_products')) {
        localStorage.setItem('ts_products', JSON.stringify(PRODUTOS_PADRAO));
    }
    configurarBusca();
    atualizarUI();
    renderizarHome();
});

// ROUTER / NAVEGAÇÃO INTERNA (SPA)
function navegar(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) targetView.classList.remove('hidden');

    // Carregamento dinâmico específico de visões
    if(viewName === 'produtos') renderizarCatalogo();
    if(viewName === 'carrinho') renderizarCarrinho();
    if(viewName === 'checkout') renderizarCheckout();
    if(viewName === 'perfil') renderizarPerfil();

    // Fecha menu hambúrguer no mobile pós-clique
    document.getElementById('nav-menu').classList.remove('active');
}

// SINCRONIZAÇÃO E CONTADORES DA INTERFACE
function atualizarUI() {
    localStorage.setItem('ts_cart', JSON.stringify(estado.carrinho));
    localStorage.setItem('ts_favs', JSON.stringify(estado.favoritos));
    localStorage.setItem('ts_user', JSON.stringify(estado.usuario));
    localStorage.setItem('ts_orders', JSON.stringify(estado.pedidos));

    document.getElementById('cart-count').textContent = estado.carrinho.reduce((a, b) => a + b.qtd, 0);
    document.getElementById('fav-count').textContent = estado.favoritos.length;
}

// RENDERIZAR CARDS DE PRODUTOS
function criarCardProduto(p) {
    const isFav = estado.favoritos.includes(p.id) ? 'active' : '';
    const iconClass = estado.favoritos.includes(p.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    return `
        <div class="product-card">
            <button class="fav-card-btn ${isFav}" onclick="toggleFavorito(${p.id})"><i class="${iconClass}"></i></button>
            <img src="${p.imagem}" alt="${p.nome}" onclick="verDetalheProduto(${p.id})">
            <h3 onclick="verDetalheProduto(${p.id})">${p.nome}</h3>
            <div class="price-box">
                <div class="price-current">R$ ${p.preco.toFixed(2).replace('.',',')}</div>
                <button class="btn btn-primary" style="width:100%; margin-top:10px; padding:6px;" onclick="adicionarAoCarrinho(${p.id})">Adicionar</button>
            </div>
        </div>
    `;
}

// REGRAS DAS PÁGINAS DE PRODUTOS
function renderizarHome() {
    const produtos = JSON.parse(localStorage.getItem('ts_products'));
    const destacados = produtos.filter(p => p.destaque);
    document.getElementById('featured-products').innerHTML = destacados.map(criarCardProduto).join('');
}

function renderizarCatalogo() {
    const produtos = JSON.parse(localStorage.getItem('ts_products'));
    let filtrados = produtos.filter(p => estado.categoriaFiltro === 'todos' || p.categoria === estado.categoriaFiltro);
    
    if(estado.ordenacao === 'menor') filtrados.sort((a,b) => a.preco - b.preco);
    if(estado.ordenacao === 'maior') filtrados.sort((a,b) => b.preco - a.preco);

    document.getElementById('catalog-grid').innerHTML = filtrados.length ? filtrados.map(criarCardProduto).join('') : `<p>Nenhum produto encontrado.</p>`;
}

function filtrarCategoria(cat, elemento) {
    estado.categoriaFiltro = cat;
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    elemento.classList.add('active');
    document.getElementById('catalog-title').textContent = cat === 'todos' ? 'Todos os Produtos' : cat.toUpperCase();
    renderizarCatalogo();
}

function ordenarProdutos(valor) {
    estado.ordenacao = valor;
    renderizarCatalogo();
}

function filtrarFavoritos() {
    const produtos = JSON.parse(localStorage.getItem('ts_products'));
    const favs = produtos.filter(p => estado.favoritos.includes(p.id));
    document.getElementById('catalog-title').textContent = "Meus Favoritos";
    document.getElementById('catalog-grid').innerHTML = favs.length ? favs.map(criarCardProduto).join('') : `<p>Você não possui itens favoritados.</p>`;
    navegar('produtos');
}

// PÁGINA INDIVIDUAL DO PRODUTO
function verDetalheProduto(id) {
    const produtos = JSON.parse(localStorage.getItem('ts_products'));
    const p = produtos.find(item => item.id === id);
    if(!p) return;

    document.getElementById('view-produto-detalhe').innerHTML = `
        <div class="detail-layout">
            <img src="${p.imagem}" alt="${p.nome}" class="detail-img">
            <div class="detail-info">
                <h2>${p.nome}</h2>
                <p style="color:var(--muted); margin: 10px 0;">Categoria: ${p.categoria}</p>
                <div class="price-current" style="font-size:2rem; margin:15px 0;">R$ ${p.preco.toFixed(2).replace('.',',')}</div>
                <p style="margin-bottom:20px;">${p.desc}</p>
                <button class="btn btn-primary" onclick="adicionarAoCarrinho(${p.id})"><i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho</button>
                <button class="btn btn-secondary" onclick="navegar('produtos')" style="margin-left:10px;">Voltar</button>
            </div>
        </div>
    `;
    navegar('produto-detalhe');
}

// REGRAS DO CARRINHO
function adicionarAoCarrinho(id) {
    const produtos = JSON.parse(localStorage.getItem('ts_products'));
    const itemExistente = estado.carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.qtd++;
    } else {
        const p = produtos.find(prod => prod.id === id);
        estado.carrinho.push({ id: p.id, nome: p.nome, preco: p.preco, imagem: p.imagem, qtd: 1 });
    }
    atualizarUI();
    alert("Produto adicionado ao carrinho!");
}

function alterarQtdCarrinho(id, delta) {
    const item = estado.carrinho.find(i => i.id === id);
    if(item) {
        item.qtd += delta;
        if(item.qtd <= 0) estado.carrinho = estado.carrinho.filter(i => i.id !== id);
    }
    atualizarUI();
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const itemsCont = document.getElementById('cart-items');
    if(!estado.carrinho.length) {
        itemsCont.innerHTML = `<p style="padding:20px; text-align:center;">Seu carrinho está vazio.</p>`;
        atualizarTotaisCarrinho();
        return;
    }

    itemsCont.innerHTML = estado.carrinho.map(item => `
        <div class="cart-item">
            <img src="${item.imagem}">
            <div style="flex:1;">
                <h4>${item.nome}</h4>
                <div style="color:var(--primary); font-weight:700;">R$ ${item.preco.toFixed(2).replace('.',',')}</div>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <button class="btn" style="padding:2px 8px;" onclick="alterarQtdCarrinho(${item.id}, -1)">-</button>
                <span>${item.qtd}</span>
                <button class="btn" style="padding:2px 8px;" onclick="alterarQtdCarrinho(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');
    atualizarTotaisCarrinho();
}

function calcularFrete() {
    const input = document.getElementById('cep-input').value.trim();
    if(input.length >= 8) {
        estado.frete = 22.00;
        alert("Simulação de Frete Concluída! Adicionado R$ 22,00.");
        renderizarCarrinho();
    }
}

function aplicarCupom() {
    const input = document.getElementById('coupon-input').value.trim().toUpperCase();
    if(input === "TECH10") {
        const subtotal = estado.carrinho.reduce((a,b) => a + (b.preco * b.qtd), 0);
        estado.desconto = subtotal * 0.10;
        alert("Cupom de 10% de desconto validado!");
        renderizarCarrinho();
    } else {
        alert("Cupom inválido.");
    }
}

function atualizarTotaisCarrinho() {
    const subtotal = estado.carrinho.reduce((a,b) => a + (b.preco * b.qtd), 0);
    const total = subtotal + estado.frete - estado.desconto;

    document.getElementById('cart-subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.',',')}`;
    document.getElementById('cart-shipping').textContent = `R$ ${estado.frete.toFixed(2).replace('.',',')}`;
    document.getElementById('cart-discount').textContent = `- R$ ${estado.desconto.toFixed(2).replace('.',',')}`;
    document.getElementById('cart-total').textContent = `R$ ${Math.max(0, total).toFixed(2).replace('.',',')}`;
}

// VALIDAÇÃO E LOGIN / CADASTRO
let modoCadastro = false;
function alternarAbasAuth() {
    modoCadastro = !modoCadastro;
    document.getElementById('auth-title').textContent = modoCadastro ? "Criar Nova Conta" : "Acessar Conta";
    document.getElementById('group-nome').style.display = modoCadastro ? "block" : "none";
    document.getElementById('btn-auth-submit').textContent = modoCadastro ? "Cadastrar" : "Entrar";
    document.getElementById('auth-toggle-text').textContent = modoCadastro ? "Já tem conta? Faça Login" : "Não tem conta? Cadastre-se";
}

function processarAutenticacao(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const nome = modoCadastro ? document.getElementById('auth-nome').value : "Cliente TechStore";

    estado.usuario = { nome, email };
    atualizarUI();
    alert(modoCadastro ? "Cadastro efetuado!" : "Login realizado com sucesso!");
    navegar('perfil');
}

function logout() {
    estado.usuario = null;
    atualizarUI();
    navegar('home');
}

// CHECKOUT & COMPRA REALIZADA
function renderizarCheckout() {
    const subtotal = estado.carrinho.reduce((a,b) => a + (b.preco * b.qtd), 0);
    const total = subtotal + estado.frete - estado.desconto;
    
    document.getElementById('checkout-summary-box').innerHTML = `
        <h3>Resumo da Compra</h3>
        <p style="margin: 10px 0;">Total de Itens: <b>${estado.carrinho.reduce((a,b) => a + b.qtd, 0)}</b></p>
        <div class="price-current" style="font-size:1.4rem;">Total Geral: R$ ${total.toFixed(2).replace('.',',')}</div>
    `;
}

function finalizarPedido(e) {
    e.preventDefault();
    if(!estado.carrinho.length) return alert("Seu carrinho está vazio!");
    
    const novoPedido = {
        id: Math.floor(Math.random() * 90000) + 10000,
        data: new Date().toLocaleDateString('pt-BR'),
        itens: estado.carrinho.reduce((a,b) => a + b.qtd, 0),
        total: estado.carrinho.reduce((a,b) => a + (b.preco * b.qtd), 0) + estado.frete - estado.desconto
    };

    estado.pedidos.unshift(novoPedido);
    estado.carrinho = [];
    estado.frete = 0;
    estado.desconto = 0;
    
    atualizarUI();
    alert(`Compra Realizada com sucesso!\nPedido número #${novoPedido.id} registrado.`);
    navegar('perfil');
}

function renderizarPerfil() {
    if(!estado.usuario) {
        navegar('login');
        return;
    }
    document.getElementById('user-display-name').textContent = estado.usuario.nome;
    document.getElementById('user-display-email').textContent = estado.usuario.email;

    const histCont = document.getElementById('order-history');
    if(!estado.pedidos.length) {
        histCont.innerHTML = "Você não realizou compras recentes.";
        return;
    }

    histCont.innerHTML = estado.pedidos.map(p => `
        <div style="border:1px solid var(--border); padding:10px; border-radius:6px; margin-bottom:8px; font-size:0.9rem; background: var(--bg);">
            <div><b>Pedido #${p.id}</b> - ${p.data}</div>
            <div style="color:var(--muted);">${p.itens} item(ns) | Total: R$ ${p.total.toFixed(2).replace('.',',')}</div>
        </div>
    `).join('');
}

// FAVORITAR GLOBAL
function toggleFavorito(id) {
    const index = estado.favoritos.indexOf(id);
    if(index > -1) {
        estado.favoritos.splice(index, 1);
    } else {
        estado.favoritos.push(id);
    }
    atualizarUI();
    
    // Atualiza dinamicamente a tela atual ativa
    if(!document.getElementById('view-home').classList.contains('hidden')) renderInitializeHome();
    const catTitle = document.getElementById('catalog-title').textContent;
    if(catTitle === "Meus Favoritos") filtrarFavoritos(); else renderarCatalogoCompleto();
}

// Atalhos internos para evitar quebras de mutabilidade
function renderInitializeHome() { renderizarHome(); }
function renderarCatalogoCompleto() { if(!document.getElementById('view-produtos').classList.contains('hidden')) renderizarCatalogo(); }

// SISTEMA DE PESQUISA EM TEMPO REAL EM DROP-DOWN
function configurarBusca() {
    const input = document.getElementById('search-input');
    const drop = document.getElementById('search-results-dropdown');

    input.addEventListener('input', (e) => {
        const txt = e.target.value.toLowerCase().trim();
        if(txt.length < 2) { drop.classList.add('hidden'); return; }

        const produtos = JSON.parse(localStorage.getItem('ts_products')) || PRODUTOS_PADRAO;
        const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(txt));

        if(!filtrados.length) {
            drop.innerHTML = `<div style="padding:10px; font-size:0.9rem; color:var(--muted);">Nenhum resultado...</div>`;
        } else {
            drop.innerHTML = filtrados.map(p => `
                <div class="search-item" onclick="verDetalheProduto(${p.id}); document.getElementById('search-results-dropdown').classList.add('hidden');">
                    <img src="${p.imagem}">
                    <div>
                        <div style="font-size:0.85rem; font-weight:600; line-height:1.2;">${p.nome}</div>
                        <div style="font-size:0.8rem; color:var(--primary); font-weight:700;">R$ ${p.preco.toFixed(2).replace('.',',')}</div>
                    </div>
                </div>
            `).join('');
        }
        drop.classList.remove('hidden');
    });

    document.addEventListener("click", (e) => {
        if(!input.contains(e.target) && !drop.contains(e.target)) drop.classList.add('hidden');
    });
}