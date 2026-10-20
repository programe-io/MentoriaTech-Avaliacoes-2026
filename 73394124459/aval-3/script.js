
const perfumes = [
    {
        id: 1,
        nome: "Essência Dourada",
        descricao: "Fragrância elegante para ocasiões especiais.",
        preco: 129.90,
        antigo: 159.90,
        selo: "OFERTA",
        imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        nome: "Noite de Luxo",
        descricao: "Aroma marcante e sofisticado.",
        preco: 189.90,
        antigo: null,
        selo: "DESTAQUE",
        imagem: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        nome: "Floral Encanto",
        descricao: "Notas florais delicadas e femininas.",
        preco: 99.90,
        antigo: 119.90,
        selo: "OFERTA",
        imagem: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        nome: "Madeira Nobre",
        descricao: "Fragrância intensa com estilo amadeirado.",
        preco: 149.90,
        antigo: null,
        selo: "",
        imagem: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        nome: "Brisa Tropical",
        descricao: "Aroma fresco para todos os momentos.",
        preco: 89.90,
        antigo: 109.90,
        selo: "PROMOÇÃO",
        imagem: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        nome: "Âmbar Imperial",
        descricao: "Notas quentes e elegantes.",
        preco: 179.90,
        antigo: null,
        selo: "PREMIUM",
        imagem: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        nome: "Jardim Secreto",
        descricao: "Uma combinação delicada e envolvente.",
        preco: 119.90,
        antigo: 139.90,
        selo: "OFERTA",
        imagem: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        nome: "Urban Black",
        descricao: "Personalidade e intensidade em cada nota.",
        preco: 159.90,
        antigo: null,
        selo: "",
        imagem: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        nome: "Doce Tentação",
        descricao: "Aroma adocicado e irresistível.",
        preco: 109.90,
        antigo: 129.90,
        selo: "QUERIDINHO",
        imagem: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        nome: "Royal Collection",
        descricao: "Uma fragrância para momentos inesquecíveis.",
        preco: 219.90,
        antigo: 259.90,
        selo: "EXCLUSIVO",
        imagem: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=600&q=80"
    }
];

let carrinho = [];

const listaProdutos = document.getElementById("lista-produtos");
const itensCarrinho = document.getElementById("itens-carrinho");
const contador = document.getElementById("contador");
const totalElemento = document.getElementById("total");

// FORMATA PREÇOS EM REAL
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// MOSTRA OS 10 PERFUMES
function mostrarPerfumes() {
    listaProdutos.innerHTML = perfumes.map(perfume => `
        <article class="produto">
            <div class="imagem-produto">
                <img
                    src="${perfume.imagem}"
                    alt="${perfume.nome}"
                    loading="lazy"
                >

                ${perfume.selo
                    ? `<span class="selo">${perfume.selo}</span>`
                    : ""}
            </div>

            <div class="produto-info">
                <h3>${perfume.nome}</h3>
                <p class="descricao">${perfume.descricao}</p>

                ${perfume.antigo
                    ? `<p class="preco-antigo">${formatarMoeda(perfume.antigo)}</p>`
                    : ""}

                <p class="preco">${formatarMoeda(perfume.preco)}</p>

                <button
                    type="button"
                    class="botao"
                    data-adicionar="${perfume.id}"
                >
                    Adicionar ao carrinho
                </button>
            </div>
        </article>
    `).join("");
}

// ADICIONA PERFUME
function adicionarAoCarrinho(id) {
    const perfume = perfumes.find(item => item.id === id);
    const item = carrinho.find(item => item.id === id);

    if (!perfume) return;

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...perfume,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

// ALTERA A QUANTIDADE
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

// REMOVE UM ITEM
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

// ATUALIZA O CARRINHO E O TOTAL
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
            '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        return;
    }

    itensCarrinho.innerHTML = carrinho.map(item => `
        <div class="item-carrinho">
            <div>
                <strong>${item.nome}</strong>
                <p>Unitário: ${formatarMoeda(item.preco)}</p>
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

// CLIQUES NOS PRODUTOS
listaProdutos.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-adicionar]");

    if (botao) {
        adicionarAoCarrinho(Number(botao.dataset.adicionar));
    }
});

// CLIQUES NO CARRINHO
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
        alert("Seu carrinho está vazio! Escolha seu perfume favorito.");
        return;
    }

    const resumo = carrinho.map(item =>
        `${item.nome} - ${item.quantidade} unidade(s)`
    ).join("\n");

    alert(
        "RESUMO DO PEDIDO\n\n" +
        resumo +
        "\n\nTotal: " + totalElemento.textContent +
        "\n\nEsta é uma demonstração. Para receber pagamentos, " +
        "integre um sistema de checkout."
    );
});

// INICIA A LOJA
mostrarPerfumes();
atualizarCarrinho();
