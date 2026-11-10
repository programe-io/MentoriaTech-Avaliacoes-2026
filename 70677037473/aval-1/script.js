
// Array que armazena os produtos
let produtos = [];

// Cadastrar produto
document.getElementById("formProduto")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let codigo = document.getElementById("codigo").value.trim();
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    // Verificar código duplicado
    let existe = produtos.some(
        produto => produto.codigo === codigo
    );

    if (existe) {
        alert("Este código já está cadastrado!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    this.reset();

    listarProdutos();
});

// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    document.getElementById("total").textContent =
        produtos.length;

    if (produtos.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    produtos.forEach(function(produto) {

        let linha = document.createElement("tr");

        function criarCelula(valor) {
            let celula = document.createElement("td");
            celula.textContent = valor;
            return celula;
        }

        linha.appendChild(criarCelula(produto.codigo));
        linha.appendChild(criarCelula(produto.descricao));
        linha.appendChild(criarCelula(produto.quantidade));

        linha.appendChild(criarCelula(
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ));

        let acoes = document.createElement("td");
        acoes.className = "acoes";

        let btnValor = document.createElement("button");
        btnValor.textContent = "Alterar valor";
        btnValor.onclick = function() {
            alterarValor(produto.codigo);
        };

        let btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "Alterar quantidade";
        btnQuantidade.onclick = function() {
            alterarQuantidade(produto.codigo);
        };

        let btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "excluir";
        btnExcluir.onclick = function() {
            excluirProduto(produto.codigo);
        };

        acoes.append(btnValor, btnQuantidade, btnExcluir);
        linha.appendChild(acoes);
        tabela.appendChild(linha);
    });
}

// Alterar valor do produto
function alterarValor(codigo) {

    let produto = produtos.find(
        p => p.codigo === codigo
    );

    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor atualizado com sucesso!");

    listarProdutos();
}

// Alterar quantidade do produto
function alterarQuantidade(codigo) {

    let produto = produtos.find(
        p => p.codigo === codigo
    );

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade atualizada com sucesso!");

    listarProdutos();
}

// Excluir produto
function excluirProduto(codigo) {

    let confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) return;

    produtos = produtos.filter(
        p => p.codigo !== codigo
    );

    listarProdutos();

    alert("Produto excluído com sucesso!");
}
