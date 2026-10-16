
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="GreenStore: tecnologia, acessórios e produtos para o seu dia a dia.">
<title>GreenStore | Sua loja online</title>

<style>
:root {
    --verde: #16834a;
    --verde-escuro: #103b28;
    --verde-claro: #e8f6ed;
    --fundo: #f6f8f6;
    --branco: #ffffff;
    --texto: #202923;
    --cinza: #6b756e;
    --borda: #e1e8e2;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: var(--fundo);
    color: var(--texto);
}

button, input, select {
    font: inherit;
}

button, a {
    -webkit-tap-highlight-color: transparent;
}

button {
    cursor: pointer;
}

a {
    color: inherit;
    text-decoration: none;
}

.container {
    width: min(1180px, 92%);
    margin: auto;
}

.topbar {
    background: var(--verde-escuro);
    color: white;
    text-align: center;
    padding: 10px;
    font-size: 13px;
}

header {
    background: white;
    border-bottom: 1px solid var(--borda);
    position: sticky;
    top: 0;
    z-index: 5;
}

.header-content {
    min-height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
}

.logo {
    font-size: 26px;
    font-weight: 900;
    color: var(--verde);
    white-space: nowrap;
}

.logo span {
    color: var(--verde-escuro);
}

.search {
    display: flex;
    flex: 1;
    max-width: 460px;
    border: 1px solid var(--borda);
    border-radius: 10px;
    overflow: hidden;
    background: #fafcfa;
}

.search input {
    width: 100%;
    min-width: 0;
    border: none;
    outline: none;
    padding: 13px;
    background: transparent;
}

.search button {
    border: none;
    background: var(--verde);
    color: white;
    padding: 0 17px;
}

.header-actions {
    display: flex;
    gap: 10px;
}

.header-btn {
    border: 1px solid var(--borda);
    border-radius: 9px;
    padding: 11px 13px;
    background: white;
    color: var(--texto);
}

.header-btn strong {
    color: var(--verde);
}

nav {
    border-top: 1px solid #f0f2f0;
}

.nav-content {
    display: flex;
    gap: 28px;
    padding: 13px 0;
    overflow-x: auto;
    white-space: nowrap;
    font-size: 14px;
    color: #4d594f;
}

.nav-content a:hover {
    color: var(--verde);
}

.hero {
    margin-top: 28px;
    border-radius: 20px;
    padding: 52px;
    min-height: 340px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    overflow: hidden;
    background: linear-gradient(120deg, #103b28, #16834a);
    color: white;
}

.hero-content {
    max-width: 570px;
}

.hero-label {
    display: inline-block;
    color: #c4f4d2;
    background: #ffffff16;
    padding: 8px 13px;
    border-radius: 30px;
    font-size: 13px;
    margin-bottom: 18px;
}

.hero h1 {
    font-size: clamp(32px, 5vw, 52px);
    line-height: 1.12;
    margin-bottom: 16px;
}

.hero p {
    color: #e0f2e5;
    line-height: 1.7;
    margin-bottom: 25px;
}

.primary-btn {
    display: inline-block;
    padding: 14px 20px;
    background: white;
    color: var(--verde-escuro);
    border: none;
    border-radius: 9px;
    font-weight: bold;
    transition: .2s;
}

.primary-btn:hover {
    transform: translateY(-2px);
}

.hero-art {
    font-size: clamp(90px, 14vw, 155px);
    min-width: 150px;
    text-align: center;
    filter: drop-shadow(0 12px 12px #0003);
}

.benefits {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin: 24px 0 55px;
}

.benefit {
    background: white;
    border: 1px solid var(--borda);
    border-radius: 12px;
    padding: 19px 13px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.benefit-icon {
    font-size: 27px;
}

.benefit strong {
    display: block;
    font-size: 13px;
    margin-bottom: 5px;
}

.benefit p {
    color: var(--cinza);
    font-size: 11px;
    line-height: 1.5;
}

.section-heading {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 15px;
    margin-bottom: 24px;
}

.section-heading h2 {
    font-size: 28px;
    margin-bottom: 6px;
}

.section-heading p {
    color: var(--cinza);
    font-size: 14px;
}

.text-link {
    color: var(--verde);
    font-size: 14px;
    font-weight: bold;
}

.categories {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    margin-bottom: 60px;
}

.category {
    border: 1px solid var(--borda);
    border-radius: 14px;
    background: white;
    padding: 22px 10px;
    text-align: center;
    transition: .2s;
}

.category:hover, .category.selected {
    border-color: var(--verde);
    background: var(--verde-claro);
    transform: translateY(-3px);
}

.category-icon {
    font-size: 38px;
    margin-bottom: 10px;
}

.category strong {
    font-size: 14px;
}

.products-section {
    padding-bottom: 65px;
}

.product-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.product-toolbar select {
    border: 1px solid var(--borda);
    background: white;
    border-radius: 8px;
    padding: 10px;
    max-width: 100%;
}

.products {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
}

.product {
    background: white;
    border: 1px solid var(--borda);
    border-radius: 14px;
    overflow: hidden;
    transition: .2s;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.product:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px #173d2410;
}

.product-picture {
    height: 190px;
    background: #edf5ef;
    position: relative;
    display: grid;
    place-items: center;
    overflow: hidden;
}

.product-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.product-emoji {
    font-size: 78px;
}

.product-tag {
    position: absolute;
    left: 10px;
    top: 10px;
    padding: 6px 9px;
    border-radius: 6px;
    background: var(--verde);
    color: white;
    font-size: 11px;
    font-weight: bold;
}

.product-info {
    padding: 15px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.product-category {
    color: var(--cinza);
    font-size: 11px;
    text-transform: uppercase;
    margin-bottom: 8px;
}

.product h3 {
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 10px;
}

.rating {
    color: #d69b19;
    font-size: 12px;
    margin-bottom: 12px;
}

.old-price {
    color: #89918b;
    text-decoration: line-through;
    font-size: 12px;
    margin-bottom: 4px;
}

.price {
    font-size: 22px;
    color: var(--verde-escuro);
    font-weight: 800;
}

.installments {
    font-size: 11px;
    color: var(--cinza);
    margin-top: 5px;
    margin-bottom: 15px;
}

.add-btn {
    width: 100%;
    padding: 12px 8px;
    background: var(--verde);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    margin-top: auto;
}

.add-btn:hover {
    background: #106c3b;
}

.empty {
    grid-column: 1 / -1;
    background: white;
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    color: var(--cinza);
}

.promo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background: #e1f3e6;
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 65px;
}

.promo h2 {
    color: var(--verde-escuro);
    margin-bottom: 8px;
}

.promo p {
    color: #526657;
    line-height: 1.6;
    font-size: 14px;
}

.promo .primary-btn {
    background: var(--verde);
    color: white;
    white-space: nowrap;
}

footer {
    background: #103b28;
    color: white;
    padding: 45px 0 20px;
}

.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 35px;
    margin-bottom: 35px;
}

footer h3 {
    margin-bottom: 15px;
}

footer p, footer a {
    color: #d1e4d6;
    font-size: 13px;
    line-height: 1.9;
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.copyright {
    border-top: 1px solid #ffffff25;
    padding-top: 18px;
    text-align: center;
    color: #c5d8ca;
    font-size: 12px;
}

.overlay {
    position: fixed;
    inset: 0;
    background: #0008;
    z-index: 10;
    display: none;
}

.overlay.open {
    display: block;
}

.cart-panel {
    position: fixed;
    top: 0;
    right: -450px;
    height: 100%;
    width: min(420px, 100%);
    z-index: 11;
    background: white;
    color: var(--texto);
    display: flex;
    flex-direction: column;
    transition: right .25s;
    box-shadow: -10px 0 40px #0002;
}

.cart-panel.open {
    right: 0;
}

.cart-header {
    padding: 22px;
    border-bottom: 1px solid var(--borda);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.cart-header h2 {
    font-size: 21px;
}

.close-btn {
    border: none;
    background: none;
    font-size: 27px;
    color: var(--texto);
}

.cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
}

.cart-item {
    display: grid;
    grid-template-columns: 55px minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid var(--borda);
}

.cart-item-icon {
    width: 55px;
    height: 55px;
    display: grid;
    place-items: center;
    background: var(--verde-claro);
    border-radius: 10px;
    font-size: 29px;
    overflow: hidden;
}

.cart-item-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cart-item h4 {
    font-size: 13px;
    margin-bottom: 7px;
}

.cart-item p {
    font-size: 13px;
    color: var(--verde);
    font-weight: bold;
}

.quantity {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
}

.quantity button {
    border: 1px solid var(--borda);
    background: white;
    border-radius: 5px;
    width: 25px;
    height: 25px;
}

.remove-btn {
    color: #bc3535;
    background: none;
    border: none;
    font-size: 12px;
}

.cart-bottom {
    padding: 20px;
    border-top: 1px solid var(--borda);
}

.total-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.cart-note {
    font-size: 12px;
    color: var(--cinza);
    margin-bottom: 15px;
    line-height: 1.5;
}

.checkout-btn {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 9px;
    background: var(--verde);
    color: white;
    font-weight: bold;
}

.empty-cart {
    text-align: center;
    color: var(--cinza);
    padding: 45px 10px;
    line-height: 1.8;
}

@media (max-width: 950px) {
    .products {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .layout-placeholder {
        display: none;
    }

    .benefits {
        grid-template-columns: repeat(2, 1fr);
    }

    .header-content {
        flex-wrap: wrap;
        padding: 14px 0;
    }

    .search {
        order: 3;
        max-width: none;
        flex-basis: 100%;
    }
}

@media (max-width: 620px) {
    .hero {
        padding: 30px 23px;
        min-height: auto;
    }

    .hero-art {
        min-width: 75px;
    }

    .categories {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 9px;
    }

    .category {
        padding: 16px 5px;
    }

    .category-icon {
        font-size: 30px;
    }

    .products {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
    }

    .product-picture {
        height: 145px;
    }

    .product-emoji {
        font-size: 60px;
    }

    .product-info {
        padding: 11px;
    }

    .product h3 {
        font-size: 13px;
    }

    .price {
        font-size: 19px;
    }

    .promo {
        padding: 23px;
        flex-direction: column;
        align-items: flex-start;
    }

    .footer-grid {
        grid-template-columns: 1fr 1fr;
    }

    .footer-grid > div:first-child {
        grid-column: 1 / -1;
    }

    .section-heading h2 {
        font-size: 23px;
    }

    .product-toolbar {
        align-items: flex-start;
        flex-direction: column;
    }

    .header-actions {
        gap: 5px;
    }

    .header-btn {
        padding: 9px;
        font-size: 12px;
    }
}
</style>
</head>

<body>

<div class="topbar">
    🌿 Bem-vindo à GreenStore! Ofertas especiais em produtos selecionados.
</div>

<header>
    <div class="container header-content">
        <a class="logo" href="#">🌿 Green<span>Store</span></a>

        <form class="search" id="searchForm">
            <input id="searchInput" type="search"
                placeholder="O que você está procurando?"
                aria-label="Pesquisar produtos">
            <button type="submit">🔎</button>
        </form>

        <div class="header-actions">
            <button class="header-btn" onclick="abrirCarrinho()">
                🛒 Carrinho <strong id="cartCount">0</strong>
            </button>
        </div>
    </div>

    <nav>
        <div class="container nav-content">
            <a href="#inicio">Início</a>
            <a href="#categorias">Categorias</a>
            <a href="#produtos" onclick="mostrarTodos()">Produtos</a>
            <a href="#ofertas" onclick="filtrarOfertas()">Ofertas</a>
            <a href="#rodape">Contato</a>
        </div>
    </nav>
</header>

<main class="container">

    <section class="hero" id="inicio">
        <div class="hero-content">
            <span class="hero-label">✨ SUA EXPERIÊNCIA DE COMPRA</span>
            <h1>Encontre o que você ama.</h1>
            <p>
                Tecnologia, acessórios e produtos selecionados
                para deixar seu dia a dia melhor. Explore nossa
                vitrine e encontre seu próximo favorito.
            </p>
            <a class="primary-btn" href="#produtos">Explorar produtos →</a>
        </div>

        <div class="hero-art" aria-hidden="true">🛍️</div>
    </section>

    <section class="benefits">
        <div class="benefit">
            <span class="benefit-icon">🚚</span>
            <div>
                <strong>Entrega</strong>
                <p>Consulte condições</p>
            </div>
        </div>

        <div class="benefit">
            <span class="benefit-icon">🔒</span>
            <div>
                <strong>Compra segura</strong>
                <p>Ambiente demonstrativo</p>
            </div>
        </div>

        <div class="benefit">
            <span class="benefit-icon">💚</span>
            <div>
                <strong>Bom atendimento</strong>
                <p>Cliente em primeiro lugar</p>
            </div>
        </div>

        <div class="benefit">
            <span class="benefit-icon">🏷️</span>
            <div>
                <strong>Ofertas especiais</strong>
                <p>Confira a nossa seleção</p>
            </div>
        </div>
    </section>

    <section id="categorias">
        <div class="section-heading">
            <div>
                <h2>Compre por categoria</h2>
                <p>Encontre rapidamente o que procura.</p>
            </div>
        </div>

        <div class="categories">
            <button class="category" onclick="selecionarCategoria('Tecnologia',this)">
                <div class="category-icon">🎧</div>
                <strong>Tecnologia</strong>
            </button>

            <button class="category" onclick="selecionarCategoria('Acessórios',this)">
                <div class="category-icon">⌚</div>
                <strong>Acessórios</strong>
            </button>

            <button class="category" onclick="selecionarCategoria('Casa',this)">
                <div class="category-icon">🏠</div>
                <strong>Casa</strong>
            </button>

            <button class="category" onclick="selecionarCategoria('Games',this)">
                <div class="category-icon">🎮</div>
                <strong>Games</strong>
            </button>

            <button class="category" onclick="selecionarCategoria('Todos',this)">
                <div class="category-icon">🛍️</div>
                <strong>Todos</strong>
            </button>
        </div>
    </section>

    <section class="products-section" id="produtos">
        <div class="section-heading">
            <div>
                <h2>Nossos produtos</h2>
                <p>Confira os destaques da GreenStore.</p>
            </div>
            <a href="#produtos" class="text-link" onclick="mostrarTodos()">
                Ver todos →
            </a>
        </div>

        <div class="product-toolbar">
            <span id="resultCount">Produtos disponíveis</span>

            <select id="sortSelect" aria-label="Ordenar produtos">
                <option value="default">Ordenar por: padrão</option>
                <option value="low">Menor preço</option>
                <option value="high">Maior preço</option>
                <option value="name">Nome A–Z</option>
            </select>
        </div>

        <div class="products" id="productGrid"></div>
    </section>

    <section class="promo" id="ofertas">
        <div>
            <h2>🌱 Ofertas para descobrir</h2>
            <p>
                Explore produtos selecionados e encontre opções
                interessantes para sua próxima compra.
            </p>
        </div>
        <button class="primary-btn" onclick="filtrarOfertas()">
            Ver ofertas →
        </button>
    </section>

</main>

<footer id="rodape">
    <div class="container">
        <div class="footer-grid">
            <div>
                <h3 class="logo" style="color:#72e69c">🌿 GreenStore</h3>
                <p>
                    Uma loja virtual demonstrativa criada para
                    apresentar produtos e simular uma experiência
                    de compra online.
                </p>
            </div>

            <div>
                <h3>Institucional</h3>
                <div class="footer-links">
                    <a href="#inicio">Sobre a loja</a>
                    <a href="#produtos">Produtos</a>
                    <a href="#categorias">Categorias</a>
                </div>
            </div>

            <div>
                <h3>Atendimento</h3>
                <div class="footer-links">
                    <a href="#rodape" onclick="mostrarContato()">Contato</a>
                    <a href="#rodape" onclick="mostrarAjuda()">Ajuda</a>
                    <a href="#rodape" onclick="mostrarPrivacidade()">Privacidade</a>
                </div>
            </div>
        </div>

        <div class="copyright">
            © 2026 GreenStore. Projeto demonstrativo de loja virtual.
        </div>
    </div>
</footer>

<div class="overlay" id="overlay" onclick="fecharCarrinho()"></div>

<aside class="cart-panel" id="cartPanel" aria-label="Carrinho de compras">
    <div class="cart-header">
        <h2>🛒 Meu carrinho</h2>
        <button class="close-btn" onclick="fecharCarrinho()">×</button>
    </div>

    <div class="cart-items" id="cartItems"></div>

    <div class="cart-bottom">
        <div class="total-row">
            <span>Subtotal</span>
            <strong id="subtotal">R$ 0,00</strong>
        </div>

        <div class="total-row">
            <span>Entrega</span>
            <strong>A calcular</strong>
        </div>

        <p class="cart-note">
            A entrega e o pagamento não são processados nesta demonstração.
        </p>

        <button class="checkout-btn" onclick="finalizarCompra()">
            Continuar compra →
        </button>
    </div>
</aside>

<script>
const produtos = [
    {
        id: 1,
        nome: "Fone Bluetooth",
        categoria: "Tecnologia",
        preco: 89.90,
        antigo: 119.90,
        emoji: "🎧",
        tag: "OFERTA",
        avaliacao: 4.8
    },
    {
        id: 2,
        nome: "Smartwatch Esportivo",
        categoria: "Acessórios",
        preco: 149.90,
        antigo: 199.90,
        emoji: "⌚",
        tag: "POPULAR",
        avaliacao: 4.7
    },
    {
        id: 3,
        nome: "Teclado Gamer",
        categoria: "Games",
        preco: 129.90,
        antigo: 159.90,
        emoji: "⌨️",
        tag: "OFERTA",
        avaliacao: 4.9
    },
    {
        id: 4,
        nome: "Luminária de Mesa",
        categoria: "Casa",
        preco: 59.90,
        antigo: 79.90,
        emoji: "💡",
        tag: "DESTAQUE",
        avaliacao: 4.6
    },
    {
        id: 5,
        nome: "Mouse sem Fio",
        categoria: "Tecnologia",
        preco: 49.90,
        antigo: 69.90,
        emoji: "🖱️",
        tag: "OFERTA",
        avaliacao: 4.8
    },
    {
        id: 6,
        nome: "Mochila Casual",
        categoria: "Acessórios",
        preco: 99.90,
        antigo: 129.90,
        emoji: "🎒",
        tag: "POPULAR",
        avaliacao: 4.5
    },
    {
        id: 7,
        nome: "Controle para Games",
        categoria: "Games",
        preco: 119.90,
        antigo: 149.90,
        emoji: "🎮",
        tag: "OFERTA",
        avaliacao: 4.9
    },
    {
        id: 8,
        nome: "Garrafa Térmica",
        categoria: "Casa",
        preco: 39.90,
        antigo: 54.90,
        emoji: "🧴",
        tag: "DESTAQUE",
        avaliacao: 4.6
    }
];

let carrinho = [];
let categoriaAtual = "Todos";
let buscaAtual = "";
let somenteOfertas = false;

const grade = document.getElementById("productGrid");
const campoBusca = document.getElementById("searchInput");
const seletorOrdenacao = document.getElementById("sortSelect");

function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function renderizarProdutos() {
    let lista = produtos.filter(p => {
        const correspondeCategoria =
            categoriaAtual === "Todos" || p.categoria === categoriaAtual;

        const texto = (p.nome + " " + p.categoria).toLocaleLowerCase("pt-BR");
        const correspondeBusca = texto.includes(buscaAtual);

        const correspondeOferta = !somenteOfertas || p.antigo > p.preco;

        return correspondeCategoria && correspondeBusca && correspondeOferta;
    });

    const ordem = seletorOrdenacao.value;

    if (ordem === "low") lista.sort((a,b) => a.preco-b.preco);
    if (ordem === "high") lista.sort((a,b) => b.preco-a.preco);
    if (ordem === "name") lista.sort((a,b) => a.nome.localeCompare(b.nome,"pt-BR"));

    grade.innerHTML = "";
    document.getElementById("resultCount").textContent =
        lista.length + (lista.length === 1 ? " produto encontrado" : " produtos encontrados");

    if (lista.length === 0) {
        const vazio = document.createElement("div");
        vazio.className = "empty";
        vazio.textContent = "Nenhum produto encontrado. Tente outra pesquisa.";
        grade.appendChild(vazio);
        return;
    }

    lista.forEach(p => {
        const card = document.createElement("article");
        card.className = "product";

        const picture = document.createElement("div");
        picture.className = "product-picture";

        const emoji = document.createElement("span");
        emoji.className = "product-emoji";
        emoji.textContent = p.emoji;
        picture.appendChild(emoji);

        const tag = document.createElement("span");
        tag.className = "product-tag";
        tag.textContent = p.tag;
        picture.appendChild(tag);

        const info = document.createElement("div");
        info.className = "product-info";

        const category = document.createElement("p");
        category.className = "product-category";
        category.textContent = p.categoria;

        const name = document.createElement("h3");
        name.textContent = p.nome;

        const rating = document.createElement("div");
        rating.className = "rating";
        rating.textContent = "★ " + p.avaliacao + " / 5";

        const old = document.createElement("p");
        old.className = "old-price";
        old.textContent = dinheiro(p.antigo);

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = dinheiro(p.preco);

        const installments = document.createElement("p");
        installments.className = "installments";
        installments.textContent = "Preço demonstrativo";

        const add = document.createElement("button");
        add.className = "add-btn";
        add.textContent = "🛒 Adicionar ao carrinho";
        add.onclick = () => adicionarCarrinho(p.id);

        info.append(category, name, rating, old, price, installments, add);
        card.append(picture, info);
        grade.appendChild(card);
    });
}

function selecionarCategoria(categoria, botao) {
    categoriaAtual = categoria;
    somenteOfertas = false;

    document.querySelectorAll(".category").forEach(el =>
        el.classList.remove("selected")
    );

    botao.classList.add("selected");
    renderizarProdutos();
    document.getElementById("produtos").scrollIntoView({behavior:"smooth"});
}

function mostrarTodos() {
    categoriaAtual = "Todos";
    somenteOfertas = false;
    document.querySelectorAll(".category").forEach(el =>
        el.classList.remove("selected")
    );
    renderizarProdutos();
}

function filtrarOfertas() {
    categoriaAtual = "Todos";
    somenteOfertas = true;
    campoBusca.value = "";
    buscaAtual = "";
    renderizarProdutos();
    document.getElementById("produtos").scrollIntoView({behavior:"smooth"});
}

document.getElementById("searchForm").addEventListener("submit", e => {
    e.preventDefault();
    buscaAtual = campoBusca.value.trim().toLocaleLowerCase("pt-BR");
    categoriaAtual = "Todos";
    somenteOfertas = false;

    document.querySelectorAll(".category").forEach(el =>
        el.classList.remove("selected")
    );

    renderizarProdutos();
    document.getElementById("produtos").scrollIntoView({behavior:"smooth"});
});

campoBusca.addEventListener("input", () => {
    buscaAtual = campoBusca.value.trim().toLocaleLowerCase("pt-BR");
    somenteOfertas = false;
    renderizarProdutos();
});

seletorOrdenacao.addEventListener("change", renderizarProdutos);

function adicionarCarrinho(id) {
    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade++;
    } else {
        const produto = produtos.find(p => p.id === id);
        if (!produto) return;
        carrinho.push({...produto, quantidade: 1});
    }

    atualizarCarrinho();
    abrirCarrinho();
}

function alterarQuantidade(id, delta) {
    const item = carrinho.find(p => p.id === id);
    if (!item) return;

    item.quantidade += delta;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(p => p.id !== id);
    }

    atualizarCarrinho();
}

function removerItem(id) {
    carrinho = carrinho.filter(p => p.id !== id);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("cartItems");
    lista.innerHTML = "";

    const quantidade = carrinho.reduce((s,p) => s+p.quantidade, 0);
    const total = carrinho.reduce((s,p) => s+p.preco*p.quantidade, 0);

    document.getElementById("cartCount").textContent = quantidade;
    document.getElementById("subtotal").textContent = dinheiro(total);

    if (carrinho.length === 0) {
        const vazio = document.createElement("div");
        vazio.className = "empty-cart";
        vazio.textContent = "🛒 Seu carrinho está vazio. Explore nossos produtos!";
        lista.appendChild(vazio);
        return;
    }

    carrinho.forEach(p => {
        const item = document.createElement("div");
        item.className = "cart-item";

        const icon = document.createElement("div");
        icon.className = "cart-item-icon";
        icon.textContent = p.emoji;

        const details = document.createElement("div");
        const name = document.createElement("h4");
        name.textContent = p.nome;

        const price = document.createElement("p");
        price.textContent = dinheiro(p.preco*p.quantidade);

        const quantity = document.createElement("div");
        quantity.className = "quantity";

        const minus = document.createElement("button");
        minus.textContent = "−";
        minus.setAttribute("aria-label","Diminuir quantidade");
        minus.onclick = () => alterarQuantidade(p.id,-1);

        const number = document.createElement("span");
        number.textContent = p.quantidade;

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.setAttribute("aria-label","Aumentar quantidade");
        plus.onclick = () => alterarQuantidade(p.id,1);

        quantity.append(minus,number,plus);
        details.append(name,price,quantity);

        const remove = document.createElement("button");
        remove.className = "remove-btn";
        remove.textContent = "Excluir";
        remove.onclick = () => removerItem(p.id);

        item.append(icon,details,remove);
        lista.appendChild(item);
    });
}

function abrirCarrinho() {
    document.getElementById("cartPanel").classList.add("open");
    document.getElementById("overlay").classList.add("open");
}

function fecharCarrinho() {
    document.getElementById("cartPanel").classList.remove("open");
    document.getElementById("overlay").classList.remove("open");
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Adicione algum produto ao carrinho primeiro.");
        return;
    }

    const resumo = carrinho.map(p =>
        p.quantidade + "x " + p.nome + " — " +
        dinheiro(p.preco*p.quantidade)
    ).join("\n");

    const total = carrinho.reduce((s,p) => s+p.preco*p.quantidade,0);

    alert(
        "RESUMO DO PEDIDO — DEMONSTRAÇÃO\n\n" +
        resumo + "\n\nTotal dos produtos: " + dinheiro(total) +
        "\n\nEste site ainda não processa pagamentos nem cria pedidos reais."
    );
}

function mostrarContato() {
    alert("Contato demonstrativo: configure aqui o e-mail ou WhatsApp da sua loja.");
}

function mostrarAjuda() {
    alert("Central de ajuda demonstrativa da GreenStore.");
}

function mostrarPrivacidade() {
    alert("Esta versão não coleta nem envia dados para um servidor.");
}

renderizarProdutos();
atualizarCarrinho();
</script>

</body>
</html>