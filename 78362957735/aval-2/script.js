```javascript
const produtos = [
    {
        id: 1, nome: "Camiseta Básica",
        preco: 49.90, antigo: 69.90, estoque: 18,
        cores: "Preta e branca", tamanhos: "P, M, G e GG",
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
        promocao: true
    },
    {
        id: 2, nome: "Jaqueta Jeans",
        preco: 159.90, antigo: 199.90, estoque: 7,
        cores: "Azul jeans", tamanhos: "P, M e G",
        imagem: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80",
        promocao: true
    },
    {
        id: 3, nome: "Vestido Floral",
        preco: 119.90, antigo: 149.90, estoque: 12,
        cores: "Estampado", tamanhos: "P, M, G e GG",
        imagem: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
        promocao: true
    },
    {
        id: 4, nome: "Moletom Urban",
        preco: 99.90, antigo: null, estoque: 9,
        cores: "Cinza e preto", tamanhos: "P, M, G e GG",
        imagem: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
        promocao: false
    },
    {
        id: 5, nome: "Calça Wide Leg",
        preco: 139.90, antigo: 169.90, estoque: 5,
        cores: "Azul e preta", tamanhos: "36 ao 44",
        imagem: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
        promocao: true
    },
    {
        id: 6, nome: "Camisa Social",
        preco: 89.90, antigo: null, estoque: 14,
        cores: "Branca e azul", tamanhos: "P, M, G e GG",
        imagem: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
        promocao: false
    },
    {
        id: 7, nome: "Shorts Casual",
        preco: 69.90, antigo: 89.90, estoque: 11,
        cores: "Bege e preto", tamanhos: "P, M, G e GG",
        imagem: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
        promocao: true
    },
    {
        id: 8, nome: "Blazer Moderno",
        preco: 189.90, antigo: null, estoque: 4,
        cores: "Preto e areia", tamanhos: "P, M e G",
        imagem: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
        promocao: false
    },
    {
        id: 9, nome: "Regata Canelada",
        preco: 39.90, antigo: 49.90, estoque: 20,
        cores: "Várias cores", tamanhos: "P, M, G e GG",
        imagem: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
        promocao: true
    },
    {
        id: 10, nome: "Calça Cargo",
        preco: 129.90, antigo: null, estoque: 8,
        cores: "Verde e preta", tamanhos: "38 ao 46",
        imagem: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=600&q=80",
        promocao: false
    }
];

const carrinho = {};

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos() {
    const lista = document.getElementById("lista-produtos");

    lista.innerHTML = produtos.map(produto => `
        <article class="produto">
            <div class="produto-imagem">
                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://placehold.co/600x800/f8f4ef/191919?text=STYLE+MODA'"
                >

                ${produto.promocao
                    ? '<span class="etiqueta">PROMOÇÃO</span>'
                    : ''}
            </div>

            <div class="produto-info">
                <h3>${produto.nome}</h3>

                <p class="descricao">Cores: ${produto.cores}</p>
                <p class="descricao">Tamanhos: ${produto.tamanhos}</p>

                <p>
                    <span class="preco">
                        ${formatarPreco(produto.preco)}
                    </span>

                    ${produto.antigo
                        ? `<span class="preco-antigo">
                            ${formatarPreco(produto.antigo)}
                           </span>`
                        : ''}
                </p>

                <p class="estoque ${produto.estoque <= 5
                    ? 'estoque-baixo' : ''}">
                    ${produto.estoque > 0
                        ? `Estoque: ${produto.estoque} unidade(s)`
                        : 'Produto esgotado'}
                </p>

                <button
                    class="adicionar"
                    onclick="adicionarCarrinho(${produto.id})"
                    ${produto.estoque === 0 ? 'disabled' : ''}>
                    Adicionar ao carrinho
                </button>
            </div>
        </article>
    `).join("");
}

function adicionarCarrinho(id) {
    const produto = produtos.find(item => item.id === id);
    const quantidadeAtual = carrinho[id] || 0;

    if (quantidadeAtual >= produto.estoque) {
        alert("Você atingiu a quantidade disponível em estoque!");
        return;
    }

    carrinho[id] = quantidadeAtual + 1;
    atualizarCarrinho();
}

function alterarQuantidade(id, variacao) {
    const produto = produtos.find(item => item.id === id);
    const novaQuantidade = (carrinho[id] || 0) + variacao;

    if (novaQuantidade <= 0) {
        delete carrinho[id];
    } else if (novaQuantidade <= produto.estoque) {
        carrinho[id] = novaQuantidade;
    } else {
        alert("Não há mais unidades disponíveis.");
    }

    atualizarCarrinho();
}

function removerProduto(id) {
    delete carrinho[id];
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const itens = document.getElementById("itens-carrinho");
    const totalElemento = document.getElementById("total");
    const ids = Object.keys(carrinho);

    const quantidadeTotal = ids.reduce(
        (soma, id) => soma + carrinho[id], 0
    );

    document.getElementById("quantidade-carrinho")
        .textContent = quantidadeTotal;

    if (ids.length === 0) {
        itens.innerHTML =
            '<p class="vazio">Seu carrinho está vazio.</p>';
    } else {
        itens.innerHTML = ids.map(id => {
            const produto = produtos.find(
                item => item.id === Number(id)
            );
            const quantidade = carrinho[id];

            return `
                <div class="item-carrinho">
                    <div>
                        <strong>${produto.nome}</strong>
                        <small>${formatarPreco(produto.preco)} cada</small>

                        <div class="controle-quantidade">
                            <button class="remover"
                                onclick="alterarQuantidade(${produto.id}, -1)">−</button>

                            ${quantidade}

                            <button class="remover"
                                onclick="alterarQuantidade(${produto.id}, 1)">+</button>
                        </div>
                    </div>

                    <div>
                        <strong>
                            ${formatarPreco(produto.preco * quantidade)}
                        </strong>
                        <button class="remover"
                            onclick="removerProduto(${produto.id})">
                            Remover
                        </button>
                    </div>
                </div>
            `;
        }).join("");
    }

    const total = ids.reduce((soma, id) => {
        const produto = produtos.find(
            item => item.id === Number(id)
        );
        return soma + produto.preco * carrinho[id];
    }, 0);

    totalElemento.textContent = formatarPreco(total);
}

const painel = document.getElementById("painel-carrinho");
const fundo = document.getElementById("fundo-carrinho");

function abrirCarrinho() {
    painel.classList.add("ativo");
    fundo.classList.add("ativo");
}

function fecharCarrinho() {
    painel.classList.remove("ativo");
    fundo.classList.remove("ativo");
}

document.getElementById("abrir-carrinho")
    .addEventListener("click", abrirCarrinho);

document.getElementById("fechar-carrinho")
    .addEventListener("click", fecharCarrinho);

fundo.addEventListener("click", fecharCarrinho);

document.getElementById("finalizar-compra")
    .addEventListener("click", function () {
        const ids = Object.keys(carrinho);

        if (ids.length === 0) {
            alert("Adicione produtos ao carrinho antes de finalizar.");
            return;
        }

        const linhas = ids.map(id => {
            const produto = produtos.find(
                item => item.id === Number(id)
            );

            return `${carrinho[id]}x ${produto.nome} - ${
                formatarPreco(produto.preco * carrinho[id])
            }`;
        });

        const total = ids.reduce((soma, id) => {
            const produto = produtos.find(
                item => item.id === Number(id)
            );
            return soma + produto.preco * carrinho[id];
        }, 0);

        const mensagem =
            "Olá! Quero fazer um pedido na STYLE MODA:\n\n" +
            linhas.join("\n") +
            "\n\nTotal: " + formatarPreco(total);

        // Troque pelo número real da loja:
        const telefone = "5500000000000";

        const url = "https://wa.me/" + telefone +
            "?text=" + encodeURIComponent(mensagem);

        window.open(url, "_blank");
    });

document.querySelector("footer p:last-child").innerHTML =
    "&copy; " + new Date().getFullYear() +
    " STYLE MODA - Todos os direitos reservados.";

mostrarProdutos();
atualizarCarrinho();
```
