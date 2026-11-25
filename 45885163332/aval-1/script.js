
/* ==========================================
   SHOPMAX - JAVASCRIPT DA LOJA VIRTUAL
========================================== */

/* 1. BANCO DE PRODUTOS */

const produtos = [
    {
        id: 1,
        nome: "Fone Bluetooth Premium",
        preco: 129.90,
        categoria: "eletronicos",
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        descricao: "Fone sem fio com excelente qualidade de áudio.",
        estoque: 15,
        avaliacao: 4.8
    },
    {
        id: 2,
        nome: "Relógio Moderno",
        preco: 199.90,
        categoria: "acessorios",
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        descricao: "Relógio elegante para todas as ocasiões.",
        estoque: 10,
        avaliacao: 4.9
    },
    {
        id: 3,
        nome: "Tênis Esportivo",
        preco: 249.90,
        categoria: "roupas",
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        descricao: "Tênis confortável para o dia a dia.",
        estoque: 20,
        avaliacao: 4.7
    },
    {
        id: 4,
        nome: "Óculos de Sol",
        preco: 89.90,
        categoria: "acessorios",
        imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
        descricao: "Óculos moderno com proteção solar.",
        estoque: 12,
        avaliacao: 4.6
    },
    {
        id: 5,
        nome: "Smartphone",
        preco: 1499.90,
        categoria: "eletronicos",
        imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        descricao: "Smartphone moderno e tecnológico.",
        estoque: 8,
        avaliacao: 4.9
    },
    {
        id: 6,
        nome: "Camiseta Casual",
        preco: 79.90,
        categoria: "roupas",
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        descricao: "Camiseta confortável e estilosa.",
        estoque: 25,
        avaliacao: 4.5
    }
];


/* 2. DADOS DO CLIENTE E CARRINHO */

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

let categoriaAtual = "todos";

let termoPesquisa = "";

let cupomAtivo = null;


/* 3. FORMATAÇÃO DE PREÇOS */

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* 4. SALVAR DADOS */

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function salvarFavoritos() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}


/* 5. MOSTRAR PRODUTOS */

function mostrarProdutos(lista = produtos) {

    const container = document.getElementById("listaProdutos");

    if (!container) return;

    container.innerHTML = "";

    if (lista.length === 0) {
        container.innerHTML = `
            <p>Nenhum produto encontrado.</p>
        `;
        return;
    }

    lista.forEach(produto => {

        container.innerHTML += `
            <div class="produto">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    loading="lazy"
                >

                <div class="produto-info">

                    <h3>${produto.nome}</h3>

                    <p>${produto.descricao}</p>

                    <p>⭐ ${produto.avaliacao}</p>

                    <div class="preco">
                        ${formatarPreco(produto.preco)}
                    </div>

                    <button onclick="adicionarCarrinho(${produto.id})">
                        🛒 Adicionar ao carrinho
                    </button>

                    <button onclick="alternarFavorito(${produto.id})">
                        ${favoritos.includes(produto.id)
                            ? "❤️ Favoritado"
                            : "🤍 Favoritar"}
                    </button>

                </div>
            </div>
        `;
    });
}


/* 6. ADICIONAR AO CARRINHO */

function adicionarCarrinho(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    const item = carrinho.find(p => p.id === id);

    const quantidadeAtual = item ? item.quantidade : 0;

    if (quantidadeAtual >= produto.estoque) {
        alert("Estoque insuficiente!");
        return;
    }

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    salvarCarrinho();

    atualizarCarrinho();

    alert("Produto adicionado ao carrinho!");
}


/* 7. ATUALIZAR CARRINHO */

function atualizarCarrinho() {

    const quantidade = carrinho.reduce(
        (total, item) => total + item.quantidade, 0
    );

    const contador = document.getElementById("quantidade");

    if (contador) {
        contador.textContent = quantidade;
    }

    const container = document.getElementById("itensCarrinho");

    if (!container) return;

    container.innerHTML = "";

    carrinho.forEach(item => {

        container.innerHTML += `
            <div class="item-carrinho">

                <div>
                    <strong>${item.nome}</strong>

                    <p>${formatarPreco(item.preco)}</p>

                    <p>Quantidade: ${item.quantidade}</p>

                    <button onclick="alterarQuantidade(${item.id}, -1)">
                        -
                    </button>

                    <button onclick="alterarQuantidade(${item.id}, 1)">
                        +
                    </button>
                </div>

                <button onclick="removerProduto(${item.id})">
                    🗑 Remover
                </button>

            </div>
        `;
    });

    calcularTotal();
}


/* 8. ALTERAR QUANTIDADE */

function alterarQuantidade(id, alteracao) {

    const item = carrinho.find(p => p.id === id);

    if (!item) return;

    const produto = produtos.find(p => p.id === id);

    const novaQuantidade = item.quantidade + alteracao;

    if (novaQuantidade > produto.estoque) {
        alert("Estoque insuficiente!");
        return;
    }

    if (novaQuantidade <= 0) {
        removerProduto(id);
        return;
    }

    item.quantidade = novaQuantidade;

    salvarCarrinho();

    atualizarCarrinho();
}


/* 9. REMOVER PRODUTOS */

function removerProduto(id) {

    carrinho = carrinho.filter(item => item.id !== id);

    salvarCarrinho();

    atualizarCarrinho();
}


/* 10. CALCULAR TOTAL */

function calcularTotal() {

    let total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    if (cupomAtivo === "SHOP10") {
        total *= 0.90;
    }

    const elemento = document.getElementById("total");

    if (elemento) {
        elemento.textContent = formatarPreco(total);
    }

    return total;
}


/* 11. ABRIR E FECHAR CARRINHO */

function abrirCarrinho() {

    document.getElementById("modalCarrinho").style.display = "flex";
}

function fecharCarrinho() {

    document.getElementById("modalCarrinho").style.display = "none";
}


/* 12. FILTRAR CATEGORIAS */

function filtrar(categoria) {

    categoriaAtual = categoria;

    aplicarFiltros();
}


/* 13. PESQUISAR PRODUTOS */

function pesquisarProdutos(termo) {

    termoPesquisa = termo.toLowerCase().trim();

    aplicarFiltros();
}


/* 14. APLICAR FILTROS */

function aplicarFiltros() {

    let resultado = [...produtos];

    if (categoriaAtual !== "todos") {
        resultado = resultado.filter(
            p => p.categoria === categoriaAtual
        );
    }

    if (termoPesquisa) {
        resultado = resultado.filter(p =>
            p.nome.toLowerCase().includes(termoPesquisa) ||
            p.descricao.toLowerCase().includes(termoPesquisa)
        );
    }

    mostrarProdutos(resultado);
}


/* 15. FAVORITOS */

function alternarFavorito(id) {

    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
    } else {
        favoritos.push(id);
    }

    salvarFavoritos();

    aplicarFiltros();
}


/* 16. APLICAR CUPOM */

function aplicarCupom(codigo) {

    if (codigo.trim().toUpperCase() === "SHOP10") {

        cupomAtivo = "SHOP10";

        calcularTotal();

        alert("Cupom aplicado! Você ganhou 10% de desconto.");

    } else {

        alert("Cupom inválido!");

    }
}


/* 17. FINALIZAR COMPRA */

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = calcularTotal();

    const confirmar = confirm(
        "Deseja continuar com o pedido de " +
        formatarPreco(total) + "?"
    );

    if (!confirmar) return;

    alert(
        "Pedido preparado com sucesso!\n" +
        "Total: " + formatarPreco(total) +
        "\n\nPara receber pagamentos reais, conecte um gateway de pagamento."
    );

    // Não apagar o carrinho antes da confirmação
    // do pagamento pelo servidor.
}


/* 18. FECHAR MODAL AO CLICAR FORA */

window.addEventListener("click", function(event) {

    const modal = document.getElementById("modalCarrinho");

    if (event.target === modal) {
        fecharCarrinho();
    }

});


/* 19. INICIALIZAR PESQUISA */

const campoPesquisa = document.getElementById("pesquisa");

if (campoPesquisa) {

    campoPesquisa.addEventListener("input", function() {

        pesquisarProdutos(this.value);

    });

}


/* 20. INICIALIZAR LOJA */

document.addEventListener("DOMContentLoaded", function() {

    mostrarProdutos();

    atualizarCarrinho();

    console.log("ShopMax iniciada com sucesso!");

});