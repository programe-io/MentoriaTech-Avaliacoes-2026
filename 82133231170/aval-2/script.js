
let sacola = [];

// ADICIONAR PRODUTO À SACOLA
function adicionarProduto(nome, preco, seletorTamanho) {
    const tamanho = document.getElementById(seletorTamanho).value;

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
        nome + " - tamanho " + tamanho +
        " adicionado à sacola!"
    );
}

// ATUALIZAR QUANTIDADE
function atualizarContador() {
    const quantidade = sacola.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    document.getElementById("contador").textContent = quantidade;
}

// EXIBIR SACOLA
function abrirCarrinho() {
    if (sacola.length === 0) {
        alert("Sua sacola está vazia. Escolha sua camiseta!");
        return;
    }

    let mensagem = "SUA SACOLA VÉRTEX\n\n";
    let subtotal = 0;

    sacola.forEach((produto, indice) => {
        const totalProduto = produto.preco * produto.quantidade;

        subtotal += totalProduto;

        mensagem +=
            (indice + 1) + ". " +
            produto.nome +
            " | Tamanho " + produto.tamanho +
            " | Qtd: " + produto.quantidade +
            " | " + formatarPreco(totalProduto) +
            "\n\n";
    });

    mensagem += "SUBTOTAL: " + formatarPreco(subtotal);
    mensagem += "\n\nCheckout demonstrativo.";

    alert(mensagem);
}

// FORMATAR PREÇOS EM REAIS
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// FILTRAR CAMISETAS
const filtros = document.querySelectorAll(".filter");
const produtos = document.querySelectorAll(".product");

filtros.forEach(botao => {
    botao.addEventListener("click", () => {
        const categoria = botao.dataset.filter;

        filtros.forEach(filtro => {
            filtro.classList.remove("active");
        });

        botao.classList.add("active");

        produtos.forEach(produto => {
            const corresponde =
                categoria === "todas" ||
                produto.dataset.category === categoria;

            produto.hidden = !corresponde;
        });
    });
});
