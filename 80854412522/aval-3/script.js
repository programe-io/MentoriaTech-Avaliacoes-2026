
const listaProdutos = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");
const painel = document.getElementById("painelCarrinho");
const itensCarrinho = document.getElementById("itensCarrinho");

const quantidade = document.getElementById("quantidade");
const totalElemento = document.getElementById("total");

const carrinho = [];

const moeda = valor => valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});

// Adicionar produtos ao carrinho
listaProdutos.addEventListener("click", event => {
    const botao = event.target.closest(".adicionar");
    if (!botao) return;

    const produto = botao.closest(".produto");
    const id = produto.dataset.id;

    const existente = carrinho.find(item => item.id === id);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({
            id,
            nome: produto.dataset.nome,
            preco: Number(produto.dataset.preco),
            quantidade: 1
        });
    }

    atualizarCarrinho();
    botao.textContent = "Adicionado ✓";

    setTimeout(() => {
        botao.textContent = "Adicionar ao carrinho";
    }, 900);
});

// Atualizar carrinho e valores
function atualizarCarrinho() {
    itensCarrinho.replaceChildren();

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        quantidadeTotal += item.quantidade;

        const linha = document.createElement("div");
        linha.className = "item-carrinho";

        const info = document.createElement("div");
        const nome = document.createElement("strong");
        nome.textContent = item.nome;

        const detalhe = document.createElement("p");
        detalhe.textContent =
            `${item.quantidade} x ${moeda(item.preco)}`;

        info.append(nome, detalhe);

        const remover = document.createElement("button");
        remover.textContent = "Remover";
        remover.addEventListener("click", () => {
            const indice = carrinho.findIndex(produto => produto.id === item.id);
            if (indice !== -1) {
                carrinho.splice(indice, 1);
            }
            atualizarCarrinho();
        });

        linha.append(info, remover);
        itensCarrinho.appendChild(linha);
    });

    if (carrinho.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Seu carrinho está vazio.";
        itensCarrinho.appendChild(mensagem);
    }

    quantidade.textContent = quantidadeTotal;
    totalElemento.textContent = moeda(total);
}

// Abrir e fechar carrinho
document.getElementById("abrirCarrinho").addEventListener("click", () => {
    painel.hidden = false;
});

document.getElementById("fecharCarrinho").addEventListener("click", () => {
    painel.hidden = true;
});

// Pesquisar produtos
pesquisa.addEventListener("input", () => {
    const termo = pesquisa.value.toLowerCase().trim();
    let encontrados = 0;

    listaProdutos.querySelectorAll(".produto").forEach(produto => {
        const corresponde = produto.textContent.toLowerCase().includes(termo);
        produto.hidden = !corresponde;
        if (corresponde) encontrados++;
    });

    document.getElementById("semResultados").hidden = encontrados > 0;
});

// Finalização demonstrativa
document.getElementById("finalizar").addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Adicione pelo menos um produto ao carrinho!");
        return;
    }

    const resumo = carrinho.map(item =>
        `${item.nome} (${item.quantidade}x)`
    ).join("\n");

    alert(
        "RESUMO DO PEDIDO\n\n" +
        resumo +
        "\n\nTotal: " + totalElemento.textContent +
        "\n\nEsta é uma demonstração. Nenhum pagamento foi realizado."
    );
});
