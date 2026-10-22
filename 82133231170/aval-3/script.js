
let sacola = [];

// ADICIONAR PRODUTO
function adicionarProduto(nome, preco, seletorTamanho) {
    const campoTamanho = document.getElementById(seletorTamanho);
    const tamanho = campoTamanho.value;

    const existente = sacola.find(produto =>
        produto.nome === nome &&
        produto.tamanho === tamanho
    );

    if (existente) {
        existente.quantidade++;
    } else {
        sacola.push({
            nome: nome,
            preco: preco,
            tamanho: tamanho,
            quantidade: 1
        });
    }

    atualizarContador();

    alert(
        nome + " (tamanho " + tamanho +
        ") foi adicionado à sua sacola!"
    );
}

// ATUALIZAR CONTADOR DA SACOLA
function atualizarContador() {
    const quantidadeTotal = sacola.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    document.getElementById("contador").textContent =
        quantidadeTotal;
}

// ABRIR SACOLA
function abrirSacola() {
    if (sacola.length === 0) {
        alert("Sua sacola está vazia. Escolha sua bermuda BRAVOZ!");
        return;
    }

    let mensagem = "SUA SACOLA BRAVOZ\n\n";
    let subtotal = 0;

    sacola.forEach((produto, indice) => {
        const totalProduto =
            produto.preco * produto.quantidade;

        subtotal += totalProduto;

        mensagem +=
            (indice + 1) + ". " + produto.nome +
            "\nTamanho: " + produto.tamanho +
            "\nQuantidade: " + produto.quantidade +
            "\nPreço: " + formatarPreco(totalProduto) +
            "\n\n";
    });

    mensagem += "SUBTOTAL: " + formatarPreco(subtotal);
    mensagem += "\n\nCompra demonstrativa, sem pagamento.";

    alert(mensagem);
}

// FORMATAR PREÇOS EM REAIS
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// FILTRAR A COLEÇÃO
const botoesFiltro = document.querySelectorAll(".filter");
const produtos = document.querySelectorAll(".product");

botoesFiltro.forEach(botao => {
    botao.addEventListener("click", function () {
        const categoria = this.dataset.filter;

        botoesFiltro.forEach(filtro => {
            filtro.classList.remove("active");
        });

        this.classList.add("active");

        produtos.forEach(produto => {
            const corresponde =
                categoria === "todas" ||
                produto.dataset.category === categoria;

            produto.hidden = !corresponde;
        });
    });
});
