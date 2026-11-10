
let produtos = [];
let geradorDeCodigo = 1;

// CADASTRAR PRODUTO
function cadastrarProduto() {
    let descricao = document.getElementById("descricao").value.trim();
    let quantidadeTexto = document.getElementById("quantidade").value;
    let valorTexto = document.getElementById("valor").value;

    let quantidade = Number(quantidadeTexto);
    let valor = Number(valorTexto);

    if (descricao.length < 5 ||
        quantidadeTexto === "" ||
        valorTexto === "" ||
        !Number.isFinite(quantidade) ||
        !Number.isFinite(valor) ||
        quantidade < 0 ||
        valor <= 0) {

        alert("Preencha os campos corretamente!");
        return;
    }

    let produto = {
        codigo: geradorDeCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}

// LISTAR PRODUTOS
function listarProdutos() {
    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    if (produtos.length === 0) {
        let linha = document.createElement("tr");
        let coluna = document.createElement("td");

        coluna.colSpan = 5;
        coluna.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(coluna);
        tabela.appendChild(linha);

        return;
    }

    produtos.forEach(produto => {
        let linha = document.createElement("tr");

        let codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        let descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        let quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        let valor = document.createElement("td");
        valor.textContent = "R$ " + produto.valor.toFixed(2);

        let acoes = document.createElement("td");

        let botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "btn-alterar";

        botaoValor.onclick = function() {
            alterarValor(produto.codigo);
        };

        let botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.className = "btn-alterar";

        botaoQuantidade.onclick = function() {
            alterarQuantidade(produto.codigo);
        };

        acoes.appendChild(botaoValor);
        acoes.appendChild(botaoQuantidade);

        linha.appendChild(codigo);
        linha.appendChild(descricao);
        linha.appendChild(quantidade);
        linha.appendChild(valor);
        linha.appendChild(acoes);

        tabela.appendChild(linha);
    });
}

// BUSCAR PRODUTO PELO CÓDIGO
function buscarProduto(codigo) {
    return produtos.find(produto => produto.codigo === codigo);
}

// ALTERAR VALOR DO PRODUTO
function alterarValor(codigo) {
    let produto = buscarProduto(codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor <= 0) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor atualizado com sucesso!");

    listarProdutos();
}

// ALTERAR QUANTIDADE DO PRODUTO
function alterarQuantidade(codigo) {
    let produto = buscarProduto(codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novaQuantidade = prompt(
        "Digite a quantidade que deseja adicionar ao estoque:"
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isFinite(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade += novaQuantidade;

    alert("Quantidade atualizada com sucesso!");

    listarProdutos();
}

// EXIBIR A LISTA INICIAL
listarProdutos();
