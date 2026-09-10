// ===============================
// SISTEMA DE ESTOQUE
// ===============================

let produtos = [];


// Pegando os elementos do HTML
const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const contador = document.querySelector(".contador");


// ===============================
// CADASTRAR PRODUTO
// ===============================

formProduto.addEventListener("submit", function(event) {

    // Impede a página de recarregar
    event.preventDefault();

    // Pegando os valores dos campos
    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verifica se o código já existe
    const produtoExistente = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (produtoExistente) {
        alert("Já existe um produto com esse código!");
        return;
    }

    // Criando o objeto produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adicionando o produto ao array
    produtos.push(produto);

    // Atualiza a tabela
    listarProdutos();

    // Limpa o formulário
    formProduto.reset();

    alert("Produto cadastrado com sucesso!");
});


// ===============================
// LISTAR PRODUTOS
// ===============================

function listarProdutos() {

    // Limpa a tabela
    listaProdutos.innerHTML = "";

    // Se não houver produtos
    if (produtos.length === 0) {

        listaProdutos.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        atualizarContador();
        return;
    }


    // Percorre todos os produtos
    produtos.forEach(function(produto, index) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>R$ ${produto.valor.toFixed(2)}</td>

            <td>
                <button 
                    onclick="alterarValor(${index})"
                    class="btn-acao"
                >
                    Alterar valor
                </button>

                <button 
                    onclick="alterarQuantidade(${index})"
                    class="btn-acao"
                >
                    Alterar quantidade
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });

    atualizarContador();
}


// ===============================
// ALTERAR VALOR
// ===============================

function alterarValor(index) {

    const produto = produtos[index];

    const novoValor = prompt(
        `Digite o novo valor para "${produto.descricao}":`
    );

    // Se o usuário cancelar
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

    // Atualiza a tabela
    listarProdutos();

    alert("Valor alterado com sucesso!");
}


// ===============================
// ALTERAR QUANTIDADE
// ===============================

function alterarQuantidade(index) {

    const produto = produtos[index];

    const novaQuantidade = prompt(
        `Digite a nova quantidade para "${produto.descricao}":`
    );

    // Se o usuário cancelar
    if (novaQuantidade === null) {
        return;
    }

    const quantidade = Number(novaQuantidade);

    // Verifica se a quantidade é válida
    if (isNaN(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    // Altera a quantidade
    produto.quantidade = quantidade;

    // Atualiza a tabela
    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}


// ===============================
// ATUALIZAR CONTADOR
// ===============================

function atualizarContador() {

    const total = produtos.length;

    if (total === 1) {
        contador.textContent = "1 produto";
    } else {
        contador.textContent = `${total} produtos`;
    }
}


// ===============================
// INICIAR SISTEMA
// ===============================

listarProdutos();