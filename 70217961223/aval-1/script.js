
// Recuperar produtos salvos no navegador
let produtos = JSON.parse(
    localStorage.getItem("produtos")
) || [];

// Salvar produtos
function salvarProdutos() {
    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );
}

// Cadastrar produto
document.getElementById("formProduto")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    if (quantidade < 0 || valor < 0 ||
        !Number.isFinite(quantidade) ||
        !Number.isFinite(valor)) {
        alert("Informe valores válidos!");
        return;
    }

    const produto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);

    salvarProdutos();
    listarProdutos();

    this.reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {

    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    if (produtos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="5">Nenhum produto cadastrado.</td>
            </tr>
        `;
        return;
    }

    produtos.forEach((produto, index) => {

        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        dados.forEach(dado => {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const editar = document.createElement("button");
        editar.textContent = "Valor";
        editar.className = "btn-editar";
        editar.addEventListener("click", () => alterarValor(index));

        const quantidade = document.createElement("button");
        quantidade.textContent = "Estoque";
        quantidade.className = "btn-quantidade";
        quantidade.addEventListener("click", () => alterarQuantidade(index));

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "btn-excluir";
        excluir.addEventListener("click", () => excluirProduto(index));

        acoes.append(editar, quantidade, excluir);
        linha.appendChild(acoes);

        tabela.appendChild(linha);
    });
}

// Alterar valor do produto
function alterarValor(index) {

    const novoValor = prompt(
        "Digite o novo valor do produto (R$):",
        produtos[index].valor
    );

    if (novoValor === null || novoValor.trim() === "") return;

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = valor;

    salvarProdutos();
    listarProdutos();

    alert("Valor atualizado com sucesso!");
}

// Alterar quantidade do produto
function alterarQuantidade(index) {

    const novaQuantidade = prompt(
        "Digite a nova quantidade em estoque:",
        produtos[index].quantidade
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produtos[index].quantidade = quantidade;

    salvarProdutos();
    listarProdutos();

    alert("Quantidade atualizada com sucesso!");
}

// Excluir produto
function excluirProduto(index) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (confirmar) {
        produtos.splice(index, 1);

        salvarProdutos();
        listarProdutos();

        alert("Produto excluído com sucesso!");
    }
}

// Mostrar produtos ao abrir o sistema
listarProdutos();
