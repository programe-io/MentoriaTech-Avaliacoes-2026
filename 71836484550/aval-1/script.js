// ============================================
// ARRAY QUE ARMAZENA OS PRODUTOS
// ============================================

let produtos = [];


// ============================================
// ELEMENTOS DO HTML
// ============================================

const formProduto = document.getElementById("formProduto");

const codigoInput = document.getElementById("codigo");
const descricaoInput = document.getElementById("descricao");
const quantidadeInput = document.getElementById("quantidade");
const valorInput = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");
const mensagemVazia = document.getElementById("mensagemVazia");

const totalProdutos = document.getElementById("totalProdutos");
const totalItens = document.getElementById("totalItens");
const valorEstoque = document.getElementById("valorEstoque");


// ============================================
// CADASTRAR PRODUTO
// ============================================

formProduto.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = codigoInput.value.trim();
    const descricao = descricaoInput.value.trim();
    const quantidade = Number(quantidadeInput.value);
    const valor = Number(valorInput.value);


    // Verifica se o código já existe

    const produtoExiste = produtos.some(function(produto) {
        return produto.codigo.toLowerCase() === codigo.toLowerCase();
    });


    if (produtoExiste) {
        alert("Já existe um produto cadastrado com esse código!");
        return;
    }


    // Cria o produto

    const novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };


    // Adiciona ao array

    produtos.push(novoProduto);


    // Limpa o formulário

    formProduto.reset();


    // Atualiza a tabela

    atualizarTabela();


    alert("Produto cadastrado com sucesso!");
});


// ============================================
// LISTAR PRODUTOS
// ============================================

function atualizarTabela() {

    listaProdutos.innerHTML = "";


    // Se não existir nenhum produto

    if (produtos.length === 0) {

        mensagemVazia.style.display = "block";

    } else {

        mensagemVazia.style.display = "none";
    }


    // Percorre todos os produtos

    produtos.forEach(function(produto, index) {

        const linha = document.createElement("tr");


        linha.innerHTML = `
            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>${formatarMoeda(produto.valor)}</td>

            <td>
                <div class="acoes">

                    <button
                        class="btn btn-valor"
                        onclick="alterarValor(${index})">
                        Alterar valor
                    </button>

                    <button
                        class="btn btn-quantidade"
                        onclick="alterarQuantidade(${index})">
                        Alterar quantidade
                    </button>

                    <button
                        class="btn btn-excluir"
                        onclick="excluirProduto(${index})">
                        Excluir
                    </button>

                </div>
            </td>
        `;


        listaProdutos.appendChild(linha);
    });


    atualizarResumo();
}


// ============================================
// ALTERAR VALOR DO PRODUTO
// ============================================

function alterarValor(index) {

    const produto = produtos[index];


    const novoValor = prompt(
        `Digite o novo valor para "${produto.descricao}":`,
        produto.valor.toFixed(2)
    );


    // Usuário cancelou

    if (novoValor === null) {
        return;
    }


    const valor = Number(novoValor);


    // Verifica se o valor é válido

    if (isNaN(valor) || valor < 0) {

        alert("Digite um valor válido!");

        return;
    }


    // Altera o valor

    produto.valor = valor;


    atualizarTabela();


    alert("Valor alterado com sucesso!");
}


// ============================================
// ALTERAR QUANTIDADE
// ============================================

function alterarQuantidade(index) {

    const produto = produtos[index];


    const novaQuantidade = prompt(
        `Digite a nova quantidade para "${produto.descricao}":`,
        produto.quantidade
    );


    // Usuário cancelou

    if (novaQuantidade === null) {
        return;
    }


    const quantidade = Number(novaQuantidade);


    // Verifica se é válida

    if (
        isNaN(quantidade) ||
        quantidade < 0 ||
        !Number.isInteger(quantidade)
    ) {

        alert("Digite uma quantidade inteira válida!");

        return;
    }


    // Altera a quantidade

    produto.quantidade = quantidade;


    atualizarTabela();


    alert("Quantidade alterada com sucesso!");
}


// ============================================
// EXCLUIR PRODUTO
// ============================================

function excluirProduto(index) {

    const produto = produtos[index];


    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.descricao}"?`
    );


    if (!confirmar) {
        return;
    }


    produtos.splice(index, 1);


    atualizarTabela();


    alert("Produto excluído com sucesso!");
}


// ============================================
// ATUALIZAR RESUMO
// ============================================

function atualizarResumo() {

    // Total de produtos

    totalProdutos.textContent = produtos.length;


    // Total de itens

    const quantidadeTotal = produtos.reduce(
        function(total, produto) {
            return total + produto.quantidade;
        },
        0
    );


    totalItens.textContent = quantidadeTotal;


    // Valor total do estoque