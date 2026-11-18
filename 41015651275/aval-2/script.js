
/* ==================================
   ALMEIDA JOIAS
   SISTEMA INTERATIVO DA LOJA
================================== */

const whatsapp = "5589981144415";

let carrinho = [];
let favoritos = [];

// ELEMENTOS PRINCIPAIS
const productList = document.querySelector("#product-list");

// Criar área do carrinho
const cartButton = document.createElement("button");
cartButton.innerHTML = "SACOLA (<span id='cart-count'>0</span>)";
cartButton.className = "buy";
cartButton.style.position = "fixed";
cartButton.style.right = "20px";
cartButton.style.bottom = "20px";
cartButton.style.zIndex = "1000";
document.body.appendChild(cartButton);

// Atualizar contador
function atualizarContador() {
    document.querySelector("#cart-count").textContent =
        carrinho.reduce((total, item) => total + item.quantidade, 0);
}

// ADICIONAR PRODUTOS AO CARRINHO
function adicionarCarrinho(nome, preco) {
    const produto = carrinho.find(item => item.nome === nome);

    if (produto) {
        produto.quantidade++;
    } else {
        carrinho.push({
            nome,
            preco,
            quantidade: 1
        });
    }

    atualizarContador();
    notificar(nome + " adicionado à sacola!");
}

// REMOVER PRODUTOS
function removerProduto(nome) {
    carrinho = carrinho.filter(item => item.nome !== nome);
    atualizarContador();
    abrirCarrinho();
}

// ALTERAR QUANTIDADE
function alterarQuantidade(nome, valor) {
    const produto = carrinho.find(item => item.nome === nome);

    if (!produto) return;

    produto.quantidade += valor;

    if (produto.quantidade <= 0) {
        removerProduto(nome);
        return;
    }

    atualizarContador();
    abrirCarrinho();
}

// ABRIR CARRINHO
function abrirCarrinho() {
    let total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );

    const detalhes = carrinho.length
        ? carrinho.map(item => `
            <div class="cart-item">
                <strong>${item.nome}</strong>
                <p>R$ ${(item.preco * item.quantidade).toFixed(2)}</p>

                <button onclick="alterarQuantidade('${item.nome}', -1)">−</button>
                ${item.quantidade}
                <button onclick="alterarQuantidade('${item.nome}', 1)">+</button>

                <button onclick="removerProduto('${item.nome}')">Excluir</button>
            </div>
        `).join("")
        : "<p>Sua sacola está vazia.</p>";

    const janela = document.createElement("div");
    janela.className = "cart-window";

    janela.innerHTML = `
        <div class="cart-content">
            <button onclick="this.closest('.cart-window').remove()">
                ✕
            </button>

            <h2>SUA SACOLA</h2>
            ${detalhes}

            <h3>Total: R$ ${total.toFixed(2)}</h3>

            <button onclick="finalizarCompra()">
                FINALIZAR PEDIDO
            </button>
        </div>
    `;

    document.querySelector(".cart-window")?.remove();
    document.body.appendChild(janela);
}

cartButton.addEventListener("click", abrirCarrinho);

// FINALIZAR COMPRA NO WHATSAPP
function finalizarCompra() {
    if (carrinho.length === 0) {
        notificar("Sua sacola está vazia!");
        return;
    }

    let mensagem = "Olá! Gostaria de fazer um pedido na Almeida Joias:\n\n";

    carrinho.forEach(item => {
        mensagem += `${item.nome} - ${item.quantidade} unidade(s)\n`;
    });

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;
    mensagem += "\n\nGostaria de saber como finalizar o pagamento.";

    window.open(
        `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`,
        "_blank"
    );
}

// SISTEMA DE FAVORITOS
function favoritar(botao, nome) {
    if (favoritos.includes(nome)) {
        favoritos = favoritos.filter(item => item !== nome);
        botao.innerHTML = "♡";
        notificar("Removido dos favoritos");
    } else {
        favoritos.push(nome);
        botao.innerHTML = "♥";
        notificar("Adicionado aos favoritos!");
    }
}

// TRANSFORMAR PRODUTOS EM INTERATIVOS
document.querySelectorAll(".product").forEach(card => {
    const nome = card.querySelector("h3").textContent;
    const textoPreco = card.querySelector("p").textContent;
    const preco = Number(
        textoPreco.replace("R$", "").trim().replace(",", ".")
    );

    const botaoComprar = card.querySelector(".buy");

    botaoComprar?.removeAttribute("href");
    botaoComprar?.removeAttribute("target");

    botaoComprar?.addEventListener("click", event => {
        event.preventDefault();
        adicionarCarrinho(nome, preco);
    });

    const favorito = document.createElement("button");
    favorito.innerHTML = "♡";
    favorito.className = "favorite-button";
    favorito.title = "Adicionar aos favoritos";

    favorito.addEventListener("click", () => {
        favoritar(favorito, nome);
    });

    card.appendChild(favorito);
});

// SISTEMA DE BUSCA
const busca = document.createElement("input");

busca.placeholder = "Pesquisar uma joia...";
busca.type = "search";
busca.className = "search-box";

document.querySelector("#colecao")
    .insertBefore(busca, productList);

busca.addEventListener("input", () => {
    const termo = busca.value.toLowerCase();

    document.querySelectorAll(".product").forEach(card => {
        const nome = card.textContent.toLowerCase();

        card.style.display = nome.includes(termo)
            ? ""
            : "none";
    });
});

// FILTROS POR CATEGORIA
const categorias = [
    "Todas",
    "Anel",
    "Colar",
    "Brinco",
    "Pulseira"
];

const filtros = document.createElement("div");
filtros.className = "category-filters";

categorias.forEach(categoria => {
    const botao = document.createElement("button");

    botao.textContent = categoria;

    botao.addEventListener("click", () => {
        document.querySelectorAll(".product").forEach(card => {
            const nome = card.querySelector("h3").textContent.toLowerCase();

            card.style.display =
                categoria === "Todas" ||
                nome.includes(categoria.toLowerCase())
                    ? ""
                    : "none";
        });
    });

    filtros.appendChild(botao);
});

document.querySelector("#colecao")
    .insertBefore(filtros, productList);

// NOTIFICAÇÕES
function notificar(mensagem) {
    const aviso = document.createElement("div");

    aviso.className = "notification";
    aviso.textContent = mensagem;

    document.body.appendChild(aviso);

    setTimeout(() => aviso.remove(), 2800);
}

// ANIMAÇÃO AO APARECER NA TELA
const observador = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll("section, .product").forEach(elemento => {
    elemento.classList.add("reveal");
    observador.observe(elemento);
});

// BOTÃO VOLTAR AO TOPO
const topo = document.createElement("button");

topo.textContent = "↑";
topo.className = "back-top";
topo.title = "Voltar ao topo";

document.body.appendChild(topo);

window.addEventListener("scroll", () => {
    topo.style.display = window.scrollY > 400 ? "block" : "none";
});

topo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

console.log("Almeida Joias: loja carregada com sucesso!");
