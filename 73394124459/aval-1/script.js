
const biblias = [
    { id: 1, nome: "Bíblia Sagrada Clássica", preco: 49.90, cor: "5424a8" },
    { id: 2, nome: "Bíblia de Estudo", preco: 89.90, cor: "173f35" },
    { id: 3, nome: "Bíblia Infantil", preco: 39.90, cor: "f7b731" },
    { id: 4, nome: "Bíblia Feminina", preco: 69.90, cor: "dc6c9b" },
    { id: 5, nome: "Bíblia de Luxo", preco: 119.90, cor: "222222" },
    { id: 6, nome: "Bíblia Letra Grande", preco: 79.90, cor: "275dad" },
    { id: 7, nome: "Bíblia para Jovens", preco: 59.90, cor: "00a896" },
    { id: 8, nome: "Bíblia de Bolso", preco: 29.90, cor: "704214" },
    { id: 9, nome: "Bíblia Capa Dura", preco: 54.90, cor: "8b43dc" },
    { id: 10, nome: "Bíblia Presente Especial", preco: 99.90, cor: "9f2042" }
];

let carrinho = [];

const listaProdutos = document.getElementById("lista-produtos");
const itensCarrinho = document.getElementById("itens-carrinho");
const contador = document.getElementById("contador");
const totalElemento = document.getElementById("total");

function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos() {
    listaProdutos.innerHTML = biblias.map(biblia => `
        <article class="produto">
            <img
                src="https://placehold.co/400x300/${biblia.cor}/ffffff?text=Biblia"
                alt="${biblia.nome}"
                loading="lazy"
            >

            <div class="produto-info">
                <h3>${biblia.nome}</h3>
                <p>Ideal para sua leitura e estudo bíblico.</p>
                <p class="preco">${moeda(biblia.preco)}</p>

                <button
                    class="botao"
                    type="button"
                    data-adicionar="${biblia.id}"
                >
                    Adicionar ao carrinho
                </button>
            </div>
        </article>
    `).join("");
}

function adicionarAoCarrinho(id) {
    const produto = biblias.find(b => b.id === id);
    const item = carrinho.find(b => b.id === id);

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

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const quantidade = carrinho.reduce(
        (soma, item) => soma + item.quantidade, 0
    );

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );

    contador.textContent = quantidade;
    totalElemento.textContent = moeda(total);

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
        return;
    }

    itensCarrinho.innerHTML = carrinho.map(item => `
        <div class="item-carrinho">
            <div>
                <strong>${item.nome}</strong>
                <p>${item.quantidade} x ${moeda(item.preco)}</p>
            </div>

            <button
                type="button"
                data-remover="${item.id}"
            >
                Remover
            </button>
        </div>
    `).join("");
}

listaProdutos.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-adicionar]");

    if (botao) {
        adicionarAoCarrinho(Number(botao.dataset.adicionar));
    }
});

itensCarrinho.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-remover]");

    if (botao) {
        removerDoCarrinho(Number(botao.dataset.remover));
    }
});

document.getElementById("finalizar").addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert(
        "Pedido demonstrativo!\nTotal: " + totalElemento.textContent +
        "\nÉ necessário integrar um sistema de pagamento para concluir a compra."
    );
});

mostrarProdutos();
atualizarCarrinho();
