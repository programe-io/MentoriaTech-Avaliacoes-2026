
let produtos = [];

// CADASTRAR PRODUTO
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    // Verificar dados
    if (!Number.isInteger(codigo) || codigo <= 0 ||
        !descricao ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0) {

        alert("Preencha os dados corretamente!");
        return;
    }

    // Verificar se o código já existe
    let existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
        alert("Código já cadastrado!");
        return;
    }

    // Adicionar produto ao array
    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    alert("Produto cadastrado com sucesso!");

    limparCampos();
    listarProdutos();
}


// LISTAR PRODUTOS
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(p => {

        tabela.innerHTML += `
            <tr>
                <td>${p.codigo}</td>
                <td>${p.descricao}</td>
                <td>${p.quantidade}</td>
                <td>R$ ${p.valor.toFixed(2)}</td>

                <td class="acoes">
                    <button class="btn-alterar"
                        onclick="alterarValor(${p.codigo})">
                        Alterar Valor
                    </button>

                    <button class="btn-alterar"
                        onclick="alterarQuantidade(${p.codigo})">
                        Alterar Quantidade
                    </button>
                </td>
            </tr>
        `;
    });
}


// ALTERAR VALOR
function alterarValor(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {

        let novoValor = prompt("Digite o novo valor:");

        if (novoValor === null || novoValor.trim() === "") {
            return;
        }

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


// ALTERAR QUANTIDADE
function alterarQuantidade(codigo) {

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {

        let novaQuantidade = prompt("Digite a nova quantidade:");

        if (novaQuantidade === null || novaQuantidade.trim() === "") {
            return;
        }

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


// LIMPAR CAMPOS
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}
