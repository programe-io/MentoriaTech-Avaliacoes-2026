
let produtos = JSON.parse(
    localStorage.getItem("produtos")
) || [];

let proximoCodigo = produtos.reduce(
    (maior, produto) => Math.max(maior, produto.codigo),
    0
) + 1;

// SALVAR PRODUTOS
function salvarProdutos() {
    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );
}

// VALIDAR PRODUTO
function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter no mínimo 5 caracteres"
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "Quantidade deve ser um número inteiro maior que zero"
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero"
        );
    }
}

// CADASTRAR PRODUTO
function cadastrarProduto(descricao, quantidade, valor) {

    descricao = descricao.trim();

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    salvarProdutos();
    listarProdutos();
}

// BUSCAR PRODUTO
function buscarProdutoPorCodigo(codigo) {

    return produtos.find(
        produto => produto.codigo === codigo
    );
}

// LISTAR PRODUTOS
function listarProdutos(filtro = "") {

    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    const encontrados = produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(
            filtro.toLowerCase()
        )
    );

    encontrados.forEach(produto => {

        const linha = document.createElement("tr");

        const celulas = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        celulas.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            linha.appendChild(td);
        });

        const acoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-editar";

        btnEditar.onclick = () => atualizarValor(produto.codigo);

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";

        btnExcluir.onclick = () => excluirProduto(produto.codigo);

        acoes.appendChild(btnEditar);
        acoes.appendChild(btnExcluir);

        linha.appendChild(acoes);

        tabela.appendChild(linha);
    });

    atualizarResumo();
}

// ATUALIZAR VALOR
function atualizarValor(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado");
        return;
    }

    const novoValor = Number(
        prompt("Digite o novo valor:")
    );

    if (prompt === null) return;

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = novoValor;

    salvarProdutos();
    listarProdutos();
}

// ADICIONAR QUANTIDADE
function atualizarQuantidade(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado");
        return;
    }

    const quantidade = Number(
        prompt("Quantas unidades deseja adicionar?")
    );

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade += quantidade;

    salvarProdutos();
    listarProdutos();
}

// EXCLUIR PRODUTO
function excluirProduto(codigoProduto) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) return;

    produtos = produtos.filter(
        produto => produto.codigo !== codigoProduto
    );

    salvarProdutos();
    listarProdutos();
}

// ATUALIZAR RESUMO
function atualizarResumo() {

    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.valor,
        0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("valorEstoque").textContent =
        valorTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

// EVENTO DE CADASTRO
document.getElementById("formProduto").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const descricao =
            document.getElementById("descricao").value;

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        try {

            cadastrarProduto(descricao, quantidade, valor);

            alert("Produto cadastrado com sucesso!");

            this.reset();

        } catch (erro) {

            alert(erro.message);

        }
    }
);

// EVENTO DE PESQUISA
document.getElementById("pesquisa").addEventListener(
    "input",
    function() {
        listarProdutos(this.value);
    }
);

// INICIALIZAR SISTEMA
listarProdutos();
