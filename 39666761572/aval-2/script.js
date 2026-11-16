
let produtos = JSON.parse(
    localStorage.getItem("produtosEstoque")
) || [];

let proximoCodigo = Number(
    localStorage.getItem("proximoCodigo")
) || 1;

// Salvar os dados
function salvarDados() {
    localStorage.setItem(
        "produtosEstoque",
        JSON.stringify(produtos)
    );

    localStorage.setItem(
        "proximoCodigo",
        proximoCodigo
    );
}

// Validar produto
function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter no mínimo cinco caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    salvarDados();
    listarProdutos();
}

// Listar produtos
function listarProdutos(filtro = "") {

    let lista = document.getElementById("listaProdutos");

    let filtrados = produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(
            filtro.toLowerCase()
        )
    );

    lista.innerHTML = "";

    if (filtrados.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="6">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;
    }

    filtrados.forEach(produto => {

        let linha = document.createElement("tr");

        let codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        let descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        let quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        let valor = document.createElement("td");
        valor.textContent = formatarMoeda(produto.valor);

        let subtotal = document.createElement("td");
        subtotal.textContent = formatarMoeda(
            produto.quantidade * produto.valor
        );

        let acoes = document.createElement("td");

        let botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.onclick = () => alterarValor(produto.codigo);

        let botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Entrada";
        botaoQuantidade.onclick = () => atualizarQuantidade(produto.codigo);

        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.onclick = () => excluirProduto(produto.codigo);

        acoes.append(
            botaoValor,
            botaoQuantidade,
            botaoExcluir
        );

        linha.append(
            codigo,
            descricao,
            quantidade,
            valor,
            subtotal,
            acoes
        );

        lista.appendChild(linha);
    });

    atualizarResumo();
}

// Buscar produto pelo código
function buscarProdutoPorCodigo(codigo) {
    return produtos.find(
        produto => produto.codigo === codigo
    );
}

// Atualizar valor
function atualizarValor(codigoProduto, novoValor) {

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("Valor inválido.");
    }

    let produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = novoValor;
        salvarDados();
        listarProdutos(document.getElementById("busca").value);
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Alterar valor pelo botão
function alterarValor(codigo) {

    let produto = buscarProdutoPorCodigo(codigo);

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") return;

    try {
        atualizarValor(codigo, Number(novoValor.replace(",", ".")));
    } catch (erro) {
        alert(erro.message);
    }
}

// Atualizar quantidade
function atualizarQuantidade(codigoProduto) {

    let quantidade = prompt("Quantas unidades deseja adicionar?");

    if (quantidade === null || quantidade.trim() === "") return;

    let novaQuantidade = Number(quantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        alert("Digite uma quantidade inteira maior que zero.");
        return;
    }

    let produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.quantidade += novaQuantidade;

        salvarDados();
        listarProdutos(document.getElementById("busca").value);
    } else {
        alert("Produto não encontrado.");
    }
}

// Excluir produto
function excluirProduto(codigo) {

    let confirmar = confirm("Deseja excluir este produto?");

    if (!confirmar) return;

    produtos = produtos.filter(
        produto => produto.codigo !== codigo
    );

    salvarDados();
    listarProdutos(document.getElementById("busca").value);
}

// Resumo do estoque
function atualizarResumo() {

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    let unidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    document.getElementById("totalUnidades").textContent =
        unidades;

    let valorTotal = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.valor,
        0
    );

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorTotal);
}

// Formatar dinheiro
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Evento de cadastro
document.getElementById("formProduto").addEventListener(
    "submit",
    function(evento) {

        evento.preventDefault();

        let descricao =
            document.getElementById("descricao").value;

        let quantidade =
            Number(document.getElementById("quantidade").value);

        let valor =
            Number(document.getElementById("valor").value);

        try {
            cadastrarProduto(descricao, quantidade, valor);

            this.reset();

            document.getElementById("mensagem").textContent =
                "Produto cadastrado com sucesso!";

        } catch (erro) {

            document.getElementById("mensagem").textContent =
                erro.message;
        }
    }
);

// Pesquisa de produtos
document.getElementById("busca").addEventListener(
    "input",
    function() {
        listarProdutos(this.value);
    }
);

// Iniciar sistema
listarProdutos();
