// Imagens desenhadas em código (SVG) que sempre carregam offline e online
const imagensSVG = {
    mesa: `<svg viewBox="0 0 220 130">
        <rect x="10" y="15" width="200" height="100" rx="12" fill="#5c3a21" stroke="#3b2312" stroke-width="4"/>
        <rect x="24" y="29" width="172" height="72" rx="4" fill="#1b8a36"/>
        <circle cx="24" cy="29" r="7" fill="#111"/>
        <circle cx="110" cy="27" r="6" fill="#111"/>
        <circle cx="196" cy="29" r="7" fill="#111"/>
        <circle cx="24" cy="101" r="7" fill="#111"/>
        <circle cx="110" cy="103" r="6" fill="#111"/>
        <circle cx="196" cy="101" r="7" fill="#111"/>
        <circle cx="65" cy="65" r="5" fill="#fff"/>
        <circle cx="145" cy="65" r="5" fill="#e53935"/>
        <circle cx="155" cy="59" r="5" fill="#fdd835"/>
        <circle cx="155" cy="71" r="5" fill="#1e88e5"/>
    </svg>`,

    taco: `<svg viewBox="0 0 220 130">
        <g transform="rotate(-25 110 65)">
            <polygon points="10,61 120,62 120,68 10,69" fill="#3e2723"/>
            <polygon points="120,62 200,63.5 200,66.5 120,68" fill="#deb887"/>
            <rect x="200" y="63.5" width="6" height="3" fill="#ffffff"/>
            <rect x="206" y="63.5" width="4" height="3" fill="#1e88e5"/>
        </g>
    </svg>`,

    bola8: `<svg viewBox="0 0 220 130">
        <circle cx="80" cy="68" r="36" fill="#181818"/>
        <circle cx="80" cy="68" r="15" fill="#ffffff"/>
        <text x="80" y="74" font-size="18" font-weight="bold" text-anchor="middle" fill="#111">8</text>
        <circle cx="145" cy="72" r="32" fill="#f5f5f5" stroke="#ddd" stroke-width="2"/>
        <ellipse cx="70" cy="50" rx="8" ry="4" transform="rotate(-30 70 50)" fill="rgba(255,255,255,0.25)"/>
    </svg>`,

    jogoBolas: `<svg viewBox="0 0 220 130">
        <polygon points="110,18 62,105 158,105" fill="none" stroke="#8d6e63" stroke-width="6" stroke-linejoin="round"/>
        <circle cx="110" cy="42" r="11" fill="#fdd835"/>
        <circle cx="98" cy="63" r="11" fill="#1e88e5"/>
        <circle cx="122" cy="63" r="11" fill="#e53935"/>
        <circle cx="86" cy="84" r="11" fill="#8e24aa"/>
        <circle cx="110" cy="84" r="11" fill="#181818"/>
        <circle cx="134" cy="84" r="11" fill="#fb8c00"/>
    </svg>`,

    giz: `<svg viewBox="0 0 220 130">
        <rect x="65" y="40" width="42" height="42" rx="4" fill="#1565c0" stroke="#0d47a1" stroke-width="2"/>
        <circle cx="86" cy="61" r="13" fill="#42a5f5"/>
        <rect x="118" y="48" width="42" height="42" rx="4" fill="#1976d2" stroke="#0d47a1" stroke-width="2"/>
        <circle cx="139" cy="69" r="13" fill="#64b5f6"/>
    </svg>`,

    triangulo: `<svg viewBox="0 0 220 130">
        <polygon points="110,20 55,108 165,108" fill="none" stroke="#6d4c41" stroke-width="10" stroke-linejoin="round"/>
        <polygon points="110,20 55,108 165,108" fill="none" stroke="#a1887f" stroke-width="3" stroke-linejoin="round"/>
    </svg>`
};

// Banco de dados dos produtos
const produtos = [
    { id: 1, nome: "Mesa de Sinuca Oficial Feltro Verde", categoria: "mesas", preco: 2490.00, imagem: imagensSVG.mesa },
    { id: 2, nome: "Taco Profissional Goiabão 1,45m", categoria: "tacos", preco: 289.90, imagem: imagensSVG.taco },
    { id: 3, nome: "Taco Bipartido Ash Inglês Rosca 3/4", categoria: "tacos", preco: 450.00, imagem: imagensSVG.taco },
    { id: 4, nome: "Jogo Completo Bolas Numeradas (1 a 15)", categoria: "bolas", preco: 199.90, imagem: imagensSVG.jogoBolas },
    { id: 5, nome: "Kit Bola 8 e Bola Branca Oficial 54mm", categoria: "bolas", preco: 65.00, imagem: imagensSVG.bola8 },
    { id: 6, nome: "Giz Azul Master Profissional (Par)", categoria: "acessorios", preco: 18.50, imagem: imagensSVG.giz },
    { id: 7, nome: "Triângulo de Madeira Maciça Oficial", categoria: "acessorios", preco: 55.00, imagem: imagensSVG.triangulo }
];

let carrinho = [];

function exibirProdutos(lista) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    if (lista.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Nenhum produto encontrado.</p>';
        return;
    }

    lista.forEach(prod => {
        grid.innerHTML += `
            <div class="card">
                <div class="card-img-box">
                    ${prod.imagem}
                </div>
                <div class="card-body">
                    <span class="card-category">${prod.categoria}</span>
                    <h3 class="card-title">${prod.nome}</h3>
                    <p class="card-price">R$ ${prod.preco.toFixed(2).replace('.', ',')}</p>
                    <button class="add-btn" onclick="adicionarAoCarrinho(${prod.id})">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
    });
}

function filtrarProdutos(categoria, botao) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    botao.classList.add('active');

    if (categoria === 'todos') {
        exibirProdutos(produtos);
    } else {
        const filtrados = produtos.filter(p => p.categoria === categoria);
        exibirProdutos(filtrados);
    }
}

function buscarProduto() {
    const termo = document.getElementById('search-input').value.toLowerCase();
    const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
    exibirProdutos(filtrados);
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    document.getElementById('cart-count').innerText = carrinho.length;
    const listaCarrinho = document.getElementById('cart-items');
    listaCarrinho.innerHTML = '';

    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;
        listaCarrinho.innerHTML += `
            <div class="cart-item">
                <span>${item.nome}</span>
                <span>
                    R$ ${item.preco.toFixed(2).replace('.', ',')}
                    <button class="remove-btn" onclick="removerItem(${index})">✖</button>
                </span>
            </div>
        `;
    });

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
    }

    document.getElementById('cart-total').innerText = total.toFixed(2).replace('.', ',');
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function abrirCarrinho() {
    atualizarCarrinho();
    document.getElementById('cart-modal').style.display = 'flex';
}

function fecharCarrinho() {
    document.getElementById('cart-modal').style.display = 'none';
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Adicione produtos antes de finalizar!');
        return;
    }
    alert('Pedido realizado com sucesso! Obrigado por comprar no Rei da Sinuca.');
    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}

exibirProdutos(produtos);
