
const produtos = [
    {
        id: 1,
        nome: "Batom Matte Glam",
        descricao: "Acabamento matte e longa duração.",
        preco: 29.90,
        antigo: 39.90,
        selo: "OFERTA",
        imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        nome: "Paleta de Sombras",
        descricao: "Cores incríveis para criar looks.",
        preco: 59.90,
        antigo: 74.90,
        selo: "MAIS VENDIDO",
        imagem: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        nome: "Base Líquida",
        descricao: "Cobertura uniforme e natural.",
        preco: 49.90,
        antigo: null,
        selo: "",
        imagem: "https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        nome: "Kit de Pincéis",
        descricao: "Precisão para uma maquiagem perfeita.",
        preco: 39.90,
        antigo: 54.90,
        selo: "OFERTA",
        imagem: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        nome: "Máscara para Cílios",
        descricao: "Volume e destaque para o olhar.",
        preco: 24.90,
        antigo: null,
        selo: "",
        imagem: "https://images.unsplash.com/photo-1631214540242-9a6e8c5e9e27?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        nome: "Blush Rosado",
        descricao: "Um toque de cor e luminosidade.",
        preco: 27.90,
        antigo: 35.90,
        selo: "OFERTA",
        imagem: "https://images.unsplash.com/photo-1596704017254-9b121068ec31?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        nome: "Iluminador Glow",
        descricao: "Brilho sofisticado para sua pele.",
        preco: 34.90,
        antigo: null,
        selo: "",
        imagem: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        nome: "Gloss Labial",
        descricao: "Lábios brilhantes e hidratados.",
        preco: 19.90,
        antigo: 26.90,
        selo: "QUERIDINHO",
        imagem: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        nome: "Pó Compacto",
        descricao: "Acabamento suave e aveludado.",
        preco: 32.90,
        antigo: null,
        selo: "",
        imagem: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        nome: "Kit Maquiagem Luxo",
        descricao: "Um presente especial para você.",
        preco: 99.90,
        antigo: 129.90,
        selo: "DESTAQUE",
        imagem: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80"
    }
];

let carrinho = [];

const listaProdutos = document.getElementById("lista-produtos");
const itensCarrinho = document.getElementById("itens-carrinho");
const contador = document.getElementById("contador");
const totalElemento = document.getElementById("total");

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// EXIBE OS 10 PRODUTOS
function mostrarProdutos() {
    listaProdutos.innerHTML = produtos.map(produto => `
        <article class="produto">
            <div class="imagem-produto">
                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    loading="lazy"
                >
                ${produto.selo
                    ? `<span class="selo">${produto.selo}</span>`
                    : ""}
            </div>

            <div class="produto-info">
                <h3>${produto.nome}</h3>
                <p class="descricao">${produto.descricao}</p>

                ${produto.antigo
                    ? `<p class="preco-antigo">${formatarMoeda(produto.antigo)}</p>`
                    : ""}

                <p class="preco">${formatarMoeda(produto.preco)}</p>

                <button
                    type="button"
                    class="botao"
                    data-adicionar="${produto.id}"
                >
                    Adicionar 🛍️
                </button>
            </div>
        </article>
    `).join("");
}

// ADICIONA UM PRODUTO AO CARRINHO
function adicionarAoCarrinho(id) {
    const produto = produtos.find(item => item.id === id);
    const item = carrinho.find(item => item.id === id);

    if (!produto) return;

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

// ALTERA A QUANTIDADE DE UM PRODUTO
function alterarQuantidade(id, variacao) {
    const item = carrinho.find(item => item.id === id);

    if (!item) return;

    item.quantidade += variacao;

    if (item.quantidade <= 0) {
        removerDoCarrinho(id);
        return;
    }

    atualizarCarrinho();
}

// REMOVE UM PRODUTO
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

// ATUALIZA CARRINHO E TOTAL
function atualizarCarrinho() {
    const quantidadeTotal = carrinho.reduce(
        (soma, item) => soma + item.quantidade,
        0
    );

    const valorTotal = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    contador.textContent = quantidadeTotal;
    totalElemento.textContent = formatarMoeda(valorTotal);

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML =
            '<p class="carrinho-vazio">Seu carrinho está vazio. 💗</p>';
        return;
    }

    itensCarrinho.innerHTML = carrinho.map(item => `
        <div class="item-carrinho">
            <div>
                <strong>${item.nome}</strong>
                <p>${formatarMoeda(item.preco)} por unidade</p>
                <p>Subtotal: ${formatarMoeda(item.preco * item.quantidade)}</p>
            </div>

            <div class="controles-quantidade">
                <button
                    type="button"
                    data-diminuir="${item.id}"
                    aria-label="Diminuir quantidade"
                >−</button>

                <span>${item.quantidade}</span>

                <button
                    type="button"
                    data-aumentar="${item.id}"
                    aria-label="Aumentar quantidade"
                >+</button>

                <button
                    type="button"
                    class="remover"
                    data-remover="${item.id}"
                >Remover</button>
            </div>
        </div>
    `).join("");
}

// EVENTOS DOS BOTÕES DOS PRODUTOS
listaProdutos.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-adicionar]");

    if (botao) {
        adicionarAoCarrinho(Number(botao.dataset.adicionar));
    }
});

// EVENTOS DOS CONTROLES DO CARRINHO
itensCarrinho.addEventListener("click", evento => {
    const aumentar = evento.target.closest("[data-aumentar]");
    const diminuir = evento.target.closest("[data-diminuir]");
    const remover = evento.target.closest("[data-remover]");

    if (aumentar) {
        alterarQuantidade(Number(aumentar.dataset.aumentar), 1);
    } else if (diminuir) {
        alterarQuantidade(Number(diminuir.dataset.diminuir), -1);
    } else if (remover) {
        removerDoCarrinho(Number(remover.dataset.remover));
    }
});

// FINALIZAÇÃO DEMONSTRATIVA
document.getElementById("finalizar").addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Escolha seus produtos favoritos.");
        return;
    }

    const resumo = carrinho.map(item =>
        `${item.nome} - ${item.quantidade} unidade(s)`
    ).join("\n");

    alert(
        "RESUMO DO PEDIDO\n\n" +
        resumo +
        "\n\nTotal: " + totalElemento.textContent +
        "\n\nEste é um pedido demonstrativo. " +
        "Para receber pagamentos, conecte um checkout."
    );
});

// INICIALIZA A LOJA
mostrarProdutos();
atualizarCarrinho();
