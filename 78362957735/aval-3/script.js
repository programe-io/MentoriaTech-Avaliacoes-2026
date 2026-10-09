```javascript
const produtos = [
    {
        id: 1,
        nome: "Sérum Facial Vitamina C",
        preco: 39.90,
        antigo: 54.90,
        estoque: 15,
        categoria: "Skincare • 30 ml",
        imagem: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80",
        promo: true
    },
    {
        id: 2,
        nome: "Batom Matte Rosé",
        preco: 24.90,
        antigo: 34.90,
        estoque: 20,
        categoria: "Maquiagem • Matte",
        imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=80",
        promo: true
    },
    {
        id: 3,
        nome: "Creme Hidratante",
        preco: 32.90,
        antigo: null,
        estoque: 12,
        categoria: "Hidratação • 200 g",
        imagem: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80",
        promo: false
    },
    {
        id: 4,
        nome: "Paleta de Sombras",
        preco: 49.90,
        antigo: 64.90,
        estoque: 8,
        categoria: "Maquiagem • Tons versáteis",
        imagem: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80",
        promo: true
    },
    {
        id: 5,
        nome: "Perfume Floral",
        preco: 89.90,
        antigo: 109.90,
        estoque: 6,
        categoria: "Fragrância • Floral",
        imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80",
        promo: true
    },
    {
        id: 6,
        nome: "Máscara para Cílios",
        preco: 29.90,
        antigo: null,
        estoque: 18,
        categoria: "Maquiagem • Volume",
        imagem: "https://images.unsplash.com/photo-1631214540242-9c6a2b5e8d8f?auto=format&fit=crop&w=700&q=80",
        promo: false
    },
    {
        id: 7,
        nome: "Protetor Solar Facial",
        preco: 44.90,
        antigo: 54.90,
        estoque: 10,
        categoria: "Skincare • Uso diário",
        imagem: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80",
        promo: true
    },
    {
        id: 8,
        nome: "Óleo Capilar",
        preco: 35.90,
        antigo: null,
        estoque: 4,
        categoria: "Cabelos • Brilho e maciez",
        imagem: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80",
        promo: false
    },
    {
        id: 9,
        nome: "Gloss Labial",
        preco: 19.90,
        antigo: 26.90,
        estoque: 25,
        categoria: "Maquiagem • Efeito brilho",
        imagem: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=700&q=80",
        promo: true
    },
    {
        id: 10,
        nome: "Água Micelar",
        preco: 27.90,
        antigo: null,
        estoque: 14,
        categoria: "Limpeza facial • 200 ml",
        imagem: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80",
        promo: false
    }
];

const carrinho = {};

function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// EXIBIR OS 10 PRODUTOS
function mostrarProdutos() {
    const lista = document.getElementById("lista-produtos");

    lista.innerHTML = produtos.map(p => `
        <article class="produto">
            <div class="produto-foto">
                <img
                    src="${p.imagem}"
                    alt="${p.nome}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://placehold.co/600x700/f7dce6/30232b?text=GLOW+BEAUTY'"
                >

                ${p.promo
                    ? '<span class="selo">PROMOÇÃO</span>'
                    : ""}
            </div>

            <div class="produto-info">
                <h3>${p.nome}</h3>
                <p class="descricao">${p.categoria}</p>

                <div class="precos">
                    <span class="preco">${dinheiro(p.preco)}</span>
                    ${p.antigo
                        ? `<span class="preco-antigo">${dinheiro(p.antigo)}</span>`
                        : ""}
                </div>

                <p class="estoque ${p.estoque <= 5 ? "baixo" : ""}">
                    ${p.estoque > 0
                        ? `Estoque: ${p.estoque} unidade(s)`
                        : "Esgotado"}
                </p>

                <button
                    class="adicionar"
                    onclick="adicionar(${p.id})"
                    ${p.estoque === 0 ? "disabled" : ""}>
                    Adicionar ao carrinho
                </button>
            </div>
        </article>
    `).join("");
}

// ADICIONAR AO CARRINHO
function adicionar(id) {
    const produto = produtos.find(p => p.id === id);

    if ((carrinho[id] || 0) >= produto.estoque) {
        alert("Quantidade máxima disponível no estoque atingida.");
        return;
    }

    carrinho[id] = (carrinho[id] || 0) + 1;
    atualizarCarrinho();
}

// AUMENTAR OU DIMINUIR QUANTIDADE
function alterar(id, valor) {
    const produto = produtos.find(p => p.id === id);
    const novaQuantidade = (carrinho[id] || 0) + valor;

    if (novaQuantidade <= 0) {
        delete carrinho[id];
    } else if (novaQuantidade <= produto.estoque) {
        carrinho[id] = novaQuantidade;
    } else {
        alert("Não há mais unidades disponíveis.");
    }

    atualizarCarrinho();
}

// REMOVER ITEM
function remover(id) {
    delete carrinho[id];
    atualizarCarrinho();
}

// ATUALIZAR CARRINHO E TOTAL
function atualizarCarrinho() {
    const ids = Object.keys(carrinho);

    const quantidadeTotal = ids.reduce(
        (soma, id) => soma + carrinho[id],
        0
    );

    document.getElementById("contador").textContent = quantidadeTotal;

    const area = document.getElementById("itens-carrinho");

    if (ids.length === 0) {
        area.innerHTML =
            '<p class="vazio">Seu carrinho está vazio.</p>';
    } else {
        area.innerHTML = ids.map(id => {
            const p = produtos.find(item => item.id === Number(id));
            const quantidade = carrinho[id];

            return `
                <div class="item-carrinho">
                    <div>
                        <strong>${p.nome}</strong>
                        <small>${dinheiro(p.preco)} cada</small>

                        <div class="controle">
                            <button class="remover"
                                onclick="alterar(${p.id}, -1)">−</button>

                            ${quantidade}

                            <button class="remover"
                                onclick="alterar(${p.id}, 1)">+</button>
                        </div>
                    </div>

                    <div>
                        <strong>${dinheiro(p.preco * quantidade)}</strong>
                        <br>
                        <button class="remover"
                            onclick="remover(${p.id})">Remover</button>
                    </div>
                </div>
            `;
        }).join("");
    }

    const total = ids.reduce((soma, id) => {
        const p = produtos.find(item => item.id === Number(id));
        return soma + p.preco * carrinho[id];
    }, 0);

    document.getElementById("total").textContent = dinheiro(total);
}

// ABRIR E FECHAR CARRINHO
const painel = document.getElementById("painel-carrinho");
const sombra = document.getElementById("sombra-carrinho");

function abrirCarrinho() {
    painel.classList.add("ativo");
    sombra.classList.add("ativo");
}

function fecharCarrinho() {
    painel.classList.remove("ativo");
    sombra.classList.remove("ativo");
}

document.getElementById("abrir-carrinho")
    .addEventListener("click", abrirCarrinho);

document.getElementById("fechar-carrinho")
    .addEventListener("click", fecharCarrinho);

sombra.addEventListener("click", fecharCarrinho);

// FINALIZAR PELO WHATSAPP
document.getElementById("finalizar").addEventListener("click", () => {
    const ids = Object.keys(carrinho);

    if (ids.length === 0) {
        alert("Adicione produtos ao carrinho antes de finalizar.");
        return;
    }

    const linhas = ids.map(id => {
        const p = produtos.find(item => item.id === Number(id));

        return `${carrinho[id]}x ${p.nome} - ${
            dinheiro(p.preco * carrinho[id])
        }`;
    });

    const total = ids.reduce((soma, id) => {
        const p = produtos.find(item => item.id === Number(id));
        return soma + p.preco * carrinho[id];
    }, 0);

    const mensagem =
        "Olá! Quero fazer um pedido na Glow Beauty:\n\n" +
        linhas.join("\n") +
        "\n\nTotal: " + dinheiro(total);

    // TROQUE PELO WHATSAPP REAL DA LOJA
    const telefone = "5500000000000";

    const url = "https://wa.me/" + telefone +
        "?text=" + encodeURIComponent(mensagem);

    window.open(url, "_blank");
});

// ANO ATUAL NO RODAPÉ
document.getElementById("ano").textContent =
    new Date().getFullYear();

// INICIAR SITE
mostrarProdutos();
atualizarCarrinho();
```
