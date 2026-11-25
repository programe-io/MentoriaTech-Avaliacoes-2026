// ===================================
// SISTEMA DE LOJA VIRTUAL
// ===================================

// CARRINHO DE COMPRAS
let carrinho = [];

// PRODUTOS
const produtos = [
    {
        id: 1,
        nome: "Relógio Moderno",
        preco: 149.90,
        imagem: "relogio.jpg"
    },
    {
        id: 2,
        nome: "Fone de Ouvido",
        preco: 99.90,
        imagem: "fone.jpg"
    },
    {
        id: 3,
        nome: "Tênis Esportivo",
        preco: 199.90,
        imagem: "tenis.jpg"
    },
    {
        id: 4,
        nome: "Câmera Digital",
        preco: 299.90,
        imagem: "camera.jpg"
    }
];

// FORMATAR PREÇO
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// ADICIONAR PRODUTO AO CARRINHO
function adicionarCarrinho(id) {
    const produto = produtos.find(item => item.id === id);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();

    alert(produto.nome + " foi adicionado ao carrinho!");
}

// REMOVER PRODUTO
function removerProduto(id) {
    carrinho = carrinho.filter(item => item.id !== id);

    atualizarCarrinho();
}

// ALTERAR QUANTIDADE
function alterarQuantidade(id, quantidade) {
    const produto = carrinho.find(item => item.id === id);

    if (!produto) return;

    produto.quantidade += quantidade;

    if (produto.quantidade <= 0) {
        removerProduto(id);
        return;
    }

    atualizarCarrinho();
}

// CALCULAR TOTAL
function calcularTotal() {
    return carrinho.reduce((total, produto) => {
        return total + produto.preco * produto.quantidade;
    }, 0);
}

// CONTAR ITENS
function contarItens() {
    return carrinho.reduce((total, produto) => {
        return total + produto.quantidade;
    }, 0);
}

// ATUALIZAR CARRINHO NA TELA
function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const total = document.getElementById("total");
    const quantidade = document.getElementById("quantidadeCarrinho");

    if (!lista) return;

    lista.innerHTML = "";

    carrinho.forEach(produto => {
        const item = document.createElement("li");

        const nome = document.createElement("span");
        nome.textContent = produto.nome;

        const preco = document.createElement("span");
        preco.textContent = formatarPreco(produto.preco);

        const quantidadeProduto = document.createElement("span");
        quantidadeProduto.textContent = "Quantidade: " + produto.quantidade;

        const remover = document.createElement("button");
        remover.textContent = "Remover";
        remover.onclick = () => removerProduto(produto.id);

        item.append(nome, preco, quantidadeProduto, remover);
        lista.appendChild(item);
    });

    if (total) {
        total.textContent = formatarPreco(calcularTotal());
    }

    if (quantidade) {
        quantidade.textContent = contarItens();
    }

    salvarCarrinho();
}

// PESQUISAR PRODUTOS
function pesquisarProduto() {
    const campo = document.getElementById("pesquisa");

    if (!campo) return;

    const pesquisa = campo.value.toLowerCase();

    const resultados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(pesquisa)
    );

    mostrarProdutos(resultados);
}

// MOSTRAR PRODUTOS
function mostrarProdutos(listaProdutos = produtos) {
    const container = document.getElementById("produtos");

    if (!container) return;

    container.innerHTML = "";

    listaProdutos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto";

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        imagem.alt = produto.nome;

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;

        const preco = document.createElement("p");
        preco.textContent = formatarPreco(produto.preco);

        const botao = document.createElement("button");
        botao.textContent = "Adicionar ao carrinho";
        botao.onclick = () => adicionarCarrinho(produto.id);

        card.append(imagem, nome, preco, botao);
        container.appendChild(card);
    });
}

// SALVAR CARRINHO
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// CARREGAR CARRINHO
function carregarCarrinho() {
    const dados = localStorage.getItem("carrinho");

    if (dados) {
        try {
            carrinho = JSON.parse(dados);

            if (!Array.isArray(carrinho)) {
                carrinho = [];
            }
        } catch {
            carrinho = [];
        }
    }

    atualizarCarrinho();
}

// LIMPAR CARRINHO
function limparCarrinho() {
    carrinho = [];

    atualizarCarrinho();
}

// FINALIZAR COMPRA
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert(
        "Resumo da compra:\n" +
        "Produtos: " + contarItens() + "\n" +
        "Total: " + formatarPreco(calcularTotal())
    );

    // A integração com pagamento deve ser feita
    // através de um provedor de pagamentos seguro.
}

// INICIALIZAR LOJA
document.addEventListener("DOMContentLoaded", () => {
    mostrarProdutos();
    carregarCarrinho();
});