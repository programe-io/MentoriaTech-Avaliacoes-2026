/* =================================
   CONSTRULAR - LOJA DE MATERIAIS
   ================================= */

// Lista de produtos da loja
const produtos = [
    {
        id: 1,
        nome: "Cimento 50kg",
        preco: 39.90,
        categoria: "cimento"
    },
    {
        id: 2,
        nome: "Tijolo",
        preco: 1.20,
        categoria: "tijolos"
    },
    {
        id: 3,
        nome: "Areia para Construção",
        preco: 180.00,
        categoria: "areia"
    },
    {
        id: 4,
        nome: "Tinta de Parede",
        preco: 89.90,
        categoria: "tintas"
    },
    {
        id: 5,
        nome: "Kit de Ferramentas",
        preco: 119.90,
        categoria: "ferramentas"
    },
    {
        id: 6,
        nome: "Telha",
        preco: 4.50,
        categoria: "telhas"
    }
];

// Carrinho salvo no navegador
let carrinho = JSON.parse(
    localStorage.getItem("carrinhoConstrular")
) || [];


/* =================================
   FORMATAR PREÇOS
   ================================= */

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* =================================
   ADICIONAR PRODUTO AO CARRINHO
   ================================= */

function comprar(id) {

    const produto = produtos.find(
        item => item.id === Number(id)
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const itemExistente = carrinho.find(
        item => item.id === produto.id
    );

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarCarrinho();

    alert(produto.nome + " foi adicionado ao carrinho!");
}


/* =================================
   SALVAR CARRINHO
   ================================= */

function salvarCarrinho() {

    localStorage.setItem(
        "carrinhoConstrular",
        JSON.stringify(carrinho)
    );
}


/* =================================
   ATUALIZAR CARRINHO
   ================================= */

function atualizarCarrinho() {

    const quantidadeElemento =
        document.getElementById("quantidade");

    const totalElemento =
        document.getElementById("total");

    const listaCarrinho =
        document.getElementById("itens-carrinho");

    let quantidadeTotal = 0;
    let valorTotal = 0;

    carrinho.forEach(item => {

        quantidadeTotal += item.quantidade;

        valorTotal +=
            item.preco * item.quantidade;

    });

    if (quantidadeElemento) {
        quantidadeElemento.textContent =
            quantidadeTotal;
    }

    if (totalElemento) {
        totalElemento.textContent =
            formatarPreco(valorTotal);
    }

    // Mostrar produtos dentro do carrinho
    if (listaCarrinho) {

        listaCarrinho.innerHTML = "";

        carrinho.forEach(item => {

            const div = document.createElement("div");

            div.className = "item-carrinho";

            div.innerHTML = `
                <h3>${item.nome}</h3>

                <p>
                    ${formatarPreco(item.preco)}
                    x ${item.quantidade}
                </p>

                <p>
                    Subtotal:
                    ${formatarPreco(
                        item.preco * item.quantidade
                    )}
                </p>

                <button onclick="removerProduto(${item.id})">
                    Remover
                </button>
            `;

            listaCarrinho.appendChild(div);

        });
    }
}


/* =================================
   REMOVER PRODUTO
   ================================= */

function removerProduto(id) {

    carrinho = carrinho.filter(
        item => item.id !== Number(id)
    );

    salvarCarrinho();
    atualizarCarrinho();
}


/* =================================
   LIMPAR CARRINHO
   ================================= */

function limparCarrinho() {

    if (carrinho.length === 0) {
        alert("O carrinho já está vazio!");
        return;
    }

    const confirmar = confirm(
        "Deseja realmente limpar o carrinho?"
    );

    if (confirmar) {

        carrinho = [];

        salvarCarrinho();
        atualizarCarrinho();

        alert("Carrinho limpo com sucesso!");
    }
}


/* =================================
   PESQUISAR PRODUTOS
   ================================= */

function pesquisarProdutos() {

    const campoBusca =
        document.getElementById("busca");

    if (!campoBusca) return;

    const texto = campoBusca.value
        .toLowerCase()
        .trim();

    const cards =
        document.querySelectorAll(".produto");

    cards.forEach(card => {

        const nome = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (nome.includes(texto)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
}


/* =================================
   FILTRAR POR CATEGORIA
   ================================= */

function filtrarCategoria(categoria) {

    const cards =
        document.querySelectorAll(".produto");

    cards.forEach(card => {

        const categoriaProduto =
            card.dataset.categoria;

        if (
            categoria === "todos" ||
            categoriaProduto === categoria
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
}


/* =================================
   FINALIZAR PEDIDO PELO WHATSAPP
   ================================= */

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem =
        "Olá! Gostaria de fazer um pedido na Constrular:%0A%0A";

    let total = 0;

    carrinho.forEach(item => {

        const subtotal =
            item.preco * item.quantidade;

        total += subtotal;

        mensagem +=
            "- " + item.nome +
            " | Quantidade: " + item.quantidade +
            " | " + formatarPreco(subtotal) +
            "%0A";

    });

    mensagem +=
        "%0ATotal do pedido: " +
        formatarPreco(total);

    // TROQUE PELO NÚMERO DA SUA LOJA
    const telefone = "5599999999999";

    const link =
        "https://wa.me/" +
        telefone +
        "?text=" +
        mensagem;

    window.open(link, "_blank");
}


/* =================================
   INICIALIZAR LOJA
   ================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        atualizarCarrinho();

        const campoBusca =
            document.getElementById("busca");

        if (campoBusca) {

            campoBusca.addEventListener(
                "input",
                pesquisarProdutos
            );

        }

    }
);