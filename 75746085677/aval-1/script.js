
// Banco de dados local
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Elementos do sistema
const form = document.getElementById("formProduto");

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Atualizar dashboard e tabela
function atualizarTela() {
    const lista = document.getElementById("listaProdutos");
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    lista.innerHTML = "";

    let totalQuantidade = 0;
    let estoqueBaixo = 0;

    produtos.forEach((produto, index) => {
        totalQuantidade += produto.quantidade;

        if (produto.quantidade <= 5) {
            estoqueBaixo++;
        }

        if (
            !produto.nome.toLowerCase().includes(pesquisa) &&
            !produto.categoria.toLowerCase().includes(pesquisa)
        ) {
            return;
        }

        const linha = document.createElement("tr");

        const nome = document.createElement("td");
        nome.textContent = produto.nome;

        const categoria = document.createElement("td");
        categoria.textContent = produto.categoria;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const preco = document.createElement("td");
        preco.textContent = produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const valorTotal = document.createElement("td");
        valorTotal.textContent =
            (produto.quantidade * produto.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        const acoes = document.createElement("td");

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "editar";
        editar.onclick = () => editarProduto(index);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";
        excluir.onclick = () => excluirProduto(index);

        const entrada = document.createElement("button");
        entrada.textContent = "+ Entrada";
        entrada.className = "entrada";
        entrada.onclick = () => movimentar(index, "entrada");

        const saida = document.createElement("button");
        saida.textContent = "- Saída";
        saida.className = "saida";
        saida.onclick = () => movimentar(index, "saida");

        acoes.append(editar, excluir, entrada, saida);

        linha.append(
            nome,
            categoria,
            quantidade,
            preco,
            valorTotal,
            acoes
        );

        lista.appendChild(linha);
    });

    document.getElementById("totalProdutos").textContent = produtos.length;

    document.getElementById("totalQuantidade").textContent =
        totalQuantidade;

    // Exibe alerta de estoque baixo no console
    console.log("Produtos com estoque baixo:", estoqueBaixo);
}

// Cadastrar e atualizar produtos
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();

    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    const preco = Number(
        document.getElementById("preco").value
    );

    const indice = document.getElementById("indice").value;

    if (!nome || !categoria || !Number.isInteger(quantidade) ||
        quantidade < 0 || !Number.isFinite(preco) || preco < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const produto = {
        id: indice === "" ? Date.now() : produtos[Number(indice)].id,
        nome,
        categoria,
        quantidade,
        preco
    };

    if (indice === "") {
        produtos.push(produto);
        alert("Produto cadastrado com sucesso!");
    } else {
        produtos[Number(indice)] = produto;
        alert("Produto atualizado com sucesso!");
    }

    salvarDados();
    atualizarTela();
    form.reset();

    document.getElementById("indice").value = "";
    document.getElementById("btnSalvar").textContent =
        "Cadastrar Produto";
});

// Editar produto
function editarProduto(index) {
    const produto = produtos[index];

    document.getElementById("nome").value = produto.nome;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("preco").value = produto.preco;

    document.getElementById("indice").value = index;

    document.getElementById("btnSalvar").textContent =
        "Salvar Alterações";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Excluir produto
function excluirProduto(index) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        produtos.splice(index, 1);

        salvarDados();
        atualizarTela();

        alert("Produto excluído!");
    }
}

// Entrada e saída de estoque
function movimentar(index, tipo) {
    const quantidade = Number(
        prompt("Digite a quantidade:")
    );

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    if (tipo === "entrada") {
        produtos[index].quantidade += quantidade;
    } else {
        if (quantidade > produtos[index].quantidade) {
            alert("Quantidade insuficiente no estoque!");
            return;
        }

        produtos[index].quantidade -= quantidade;
    }

    salvarDados();
    atualizarTela();

    alert("Movimentação realizada com sucesso!");
}

// Pesquisa
document.getElementById("pesquisa").addEventListener(
    "input",
    atualizarTela
);

// Inicialização
atualizarTela();
