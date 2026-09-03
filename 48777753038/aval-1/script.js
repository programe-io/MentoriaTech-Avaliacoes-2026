// ================================
// CONTROLE DE ESTOQUE - 2A TDS
// ================================


// Carrega os produtos salvos no navegador
let produtos = JSON.parse(
    localStorage.getItem("produtosEstoque")
) || [];


// ================================
// SALVAR PRODUTOS
// ================================

function salvarProdutos() {

    localStorage.setItem(
        "produtosEstoque",
        JSON.stringify(produtos)
    );

}


// ================================
// CADASTRAR PRODUTO
// ================================

function cadastrarProduto() {

    const codigo = document
        .getElementById("codigo")
        .value
        .trim();

    const descricao = document
        .getElementById("descricao")
        .value
        .trim();

    const quantidadeTexto = document
        .getElementById("quantidade")
        .value
        .trim();

    const valorTexto = document
        .getElementById("valor")
        .value
        .trim()
        .replace(",", ".");


    const quantidade = Number(quantidadeTexto);
    const valor = Number(valorTexto);


    // Validação
    if (
        codigo === "" ||
        descricao === "" ||
        quantidadeTexto === "" ||
        valorTexto === "" ||
        !Number.isFinite(quantidade) ||
        !Number.isFinite(valor) ||
        quantidade < 0 ||
        valor < 0
    ) {

        alert("Preencha todos os campos corretamente!");

        return;
    }


    // Cria o produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };


    // Adiciona na lista
    produtos.push(produto);


    // Salva no navegador
    salvarProdutos();


    // Limpa os campos
    limparCampos();


    // Atualiza a tabela
    listarProdutos();

}


// ================================
// LISTAR PRODUTOS
// ================================

function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";


    // Caso não tenha produtos
    if (produtos.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="5" class="mensagem-vazia">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }


    // Percorre os produtos
    produtos.forEach((produto, index) => {

        const linha = document.createElement("tr");


        // Código
        const tdCodigo = document.createElement("td");
        tdCodigo.textContent = produto.codigo;


        // Descrição
        const tdDescricao = document.createElement("td");
        tdDescricao.textContent = produto.descricao;


        // Quantidade
        const tdQuantidade = document.createElement("td");
        tdQuantidade.textContent = produto.quantidade;


        // Valor
        const tdValor = document.createElement("td");

        tdValor.textContent =
            "R$ " +
            Number(produto.valor)
                .toFixed(2)
                .replace(".", ",");


        // Ações
        const tdAcoes = document.createElement("td");


        // Botão alterar valor
        const btnValor = document.createElement("button");

        btnValor.className = "editar";
        btnValor.textContent = "💰 Alterar Valor";

        btnValor.addEventListener("click", function () {
            alterarValor(index);
        });


        // Botão alterar quantidade
        const btnQuantidade = document.createElement("button");

        btnQuantidade.className = "editar";
        btnQuantidade.textContent = "📦 Alterar Quantidade";

        btnQuantidade.addEventListener("click", function () {
            alterarQuantidade(index);
        });


        // Botão excluir
        const btnExcluir = document.createElement("button");

        btnExcluir.className = "excluir";
        btnExcluir.textContent = "🗑️ Excluir";

        btnExcluir.addEventListener("click", function () {
            excluirProduto(index);
        });


        // Adiciona os botões
        tdAcoes.appendChild(btnValor);
        tdAcoes.appendChild(btnQuantidade);
        tdAcoes.appendChild(btnExcluir);


        // Monta a linha
        linha.appendChild(tdCodigo);
        linha.appendChild(tdDescricao);
        linha.appendChild(tdQuantidade);
        linha.appendChild(tdValor);
        linha.appendChild(tdAcoes);


        // Adiciona na tabela
        lista.appendChild(linha);

    });

}


// ================================
// ALTERAR VALOR
// ================================

function alterarValor(index) {

    const novoValor = prompt(
        "Informe o novo valor:"
    );


    if (novoValor === null) {
        return;
    }


    const valorTexto = novoValor
        .trim()
        .replace(",", ".");


    const valor = Number(valorTexto);


    if (
        valorTexto === "" ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {

        alert("Informe um valor válido!");

        return;
    }


    produtos[index].valor = valor;


    salvarProdutos();

    listarProdutos();

}


// ================================
// ALTERAR QUANTIDADE
// ================================

function alterarQuantidade(index) {

    const novaQuantidade = prompt(
        "Informe a nova quantidade:"
    );


    if (novaQuantidade === null) {
        return;
    }


    const quantidadeTexto = novaQuantidade.trim();

    const quantidade = Number(quantidadeTexto);


    if (
        quantidadeTexto === "" ||
        !Number.isFinite(quantidade) ||
        quantidade < 0
    ) {

        alert("Informe uma quantidade válida!");

        return;
    }


    produtos[index].quantidade = quantidade;


    salvarProdutos();

    listarProdutos();

}


// ================================
// EXCLUIR PRODUTO
// ================================

function excluirProduto(index) {

    const confirmar = confirm(
        "Deseja realmente remover este produto?"
    );


    if (!confirmar) {
        return;
    }


    produtos.splice(index, 1);


    salvarProdutos();

    listarProdutos();

}


// ================================
// LIMPAR CAMPOS
// ================================

function limparCampos() {

    document.getElementById("codigo").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("quantidade").value = "";

    document.getElementById("valor").value = "";

}


// ================================
// BOTÃO ADICIONAR
// ================================

document
    .getElementById("btnAdicionar")
    .addEventListener("click", cadastrarProduto);


// ================================
// INICIALIZAÇÃO
// ================================

listarProdutos();