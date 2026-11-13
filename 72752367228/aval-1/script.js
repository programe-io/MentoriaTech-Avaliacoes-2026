
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 ||
        !Number.isFinite(quantidade) || !Number.isFinite(valor) ||
        valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
        alert("Código já cadastrado!");
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

    limparCampos();
    listarProdutos();
}

// Limpar formulário
function limparCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(produto => {

        let linha = `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>
                    <button class="btn-editar"
                        onclick="alterarValor(${produto.codigo})">
                        Alterar Valor
                    </button>

                    <button class="btn-editar"
                        onclick="alterarQuantidade(${produto.codigo})">
                        Alterar Quantidade
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirProduto(${produto.codigo})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;

        tabela.innerHTML += linha;
    });
}

// Alterar valor
function alterarValor(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {

        let novoValor = prompt("Digite o novo valor:");

        if (novoValor === null || novoValor.trim() === "") return;

        novoValor = Number(novoValor);

        if (!Number.isFinite(novoValor) || novoValor < 0) {
            alert("Valor inválido!");
            return;
        }

        produto.valor = novoValor;

        alert("Valor alterado com sucesso!");

        listarProdutos();
    }
}

// Alterar quantidade
function alterarQuantidade(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {

        let novaQuantidade = prompt("Digite a nova quantidade:");

        if (novaQuantidade === null || novaQuantidade.trim() === "") return;

        novaQuantidade = Number(novaQuantidade);

        if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
            alert("Quantidade inválida!");
            return;
        }

        produto.quantidade = novaQuantidade;

        alert("Quantidade alterada com sucesso!");

        listarProdutos();
    }
}

// Excluir produto
function excluirProduto(codigo) {

    let confirmar = confirm("Deseja excluir este produto?");

    if (confirmar) {

        produtos = produtos.filter(p => p.codigo !== codigo);

        alert("Produto excluído!");

        listarProdutos();
    }
}
