
// ======================================
// 1. CRIAÇÃO DA LISTA DE PRODUTOS
// ======================================

let produtos = [];

let contadorCodigo = 0;


// ======================================
// 2. MAPEAMENTO DOS ELEMENTOS HTML
// ======================================

const formProduto = document.getElementById("formProduto");

const descricaoInput = document.getElementById("descricao");

const quantidadeInput = document.getElementById("quantidade");

const valorInput = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");

const mensagem = document.getElementById("mensagem");


// ======================================
// 3. FUNÇÃO PARA VALIDAR PRODUTO
// ======================================

function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, cinco caracteres."
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


// ======================================
// 4. GERAÇÃO AUTOMÁTICA DO CÓDIGO
// ======================================

function gerarCodigo() {

    contadorCodigo++;

    return contadorCodigo;
}


// ======================================
// 5. FUNÇÃO PARA CADASTRAR PRODUTO
// ======================================

function cadastrarProduto(descricao, quantidade, valor) {

    // Valida os dados
    validarProduto(descricao, quantidade, valor);

    // Cria o objeto produto
    let novoProduto = {

        codigo: gerarCodigo(),

        descricao: descricao.trim(),

        quantidade: quantidade,

        valor: valor

    };

    // Adiciona ao array
    produtos.push(novoProduto);

    // Atualiza a listagem
    listarProdutos();
}


// ======================================
// 6. FUNÇÃO PARA LISTAR PRODUTOS
// ======================================

function listarProdutos() {

    // Limpa a tabela
    listaProdutos.innerHTML = "";

    // Percorre o array
    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        const descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const valor = document.createElement("td");
        valor.textContent = "R$ " + produto.valor.toFixed(2);

        const acoes = document.createElement("td");

        // Botão para alterar valor
        const botaoValor = document.createElement("button");

        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "editar";

        botaoValor.addEventListener("click", function() {
            atualizarValor(produto.codigo);
        });

        // Botão para adicionar quantidade
        const botaoQuantidade = document.createElement("button");

        botaoQuantidade.textContent = "Entrada";
        botaoQuantidade.className = "entrada";

        botaoQuantidade.addEventListener("click", function() {
            atualizarQuantidade(produto.codigo);
        });

        // Adiciona os botões
        acoes.appendChild(botaoValor);
        acoes.appendChild(botaoQuantidade);

        // Adiciona as células à linha
        linha.appendChild(codigo);
        linha.appendChild(descricao);
        linha.appendChild(quantidade);
        linha.appendChild(valor);
        linha.appendChild(acoes);

        // Adiciona a linha à tabela
        listaProdutos.appendChild(linha);

    });

    // Atualiza os totais
    document.getElementById("totalProdutos").textContent =
        produtos.length;

    const totalUnidades = produtos.reduce(function(total, produto) {
        return total + produto.quantidade;
    }, 0);

    document.getElementById("totalUnidades").textContent =
        totalUnidades;
}


// ======================================
// 7. BUSCAR PRODUTO PELO CÓDIGO
// ======================================

function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(function(produto) {

        return produto.codigo === codigoProduto;

    });
}


// ======================================
// 8. ATUALIZAR VALOR DO PRODUTO
// ======================================

function atualizarValor(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {

        alert("Produto não encontrado!");

        return;
    }

    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {

        alert("O valor deve ser maior ou igual a zero!");

        return;
    }

    // Substitui o valor antigo
    produto.valor = novoValor;

    listarProdutos();

    alert("Valor atualizado com sucesso!");
}


// ======================================
// 9. ATUALIZAR QUANTIDADE DO PRODUTO
// ======================================

function atualizarQuantidade(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {

        alert("Produto não encontrado!");

        return;
    }

    let novaQuantidade = prompt(
        "Digite a quantidade que deseja adicionar:"
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {

        alert("A quantidade deve ser maior que zero!");

        return;
    }

    // Soma a quantidade ao estoque existente
    produto.quantidade =
        produto.quantidade + novaQuantidade;

    listarProdutos();

    alert("Quantidade atualizada com sucesso!");
}


// ======================================
// 10. EVENTO DE CADASTRO DO FORMULÁRIO
// ======================================

formProduto.addEventListener("submit", function(event) {

    event.preventDefault();

    try {

        const descricao = descricaoInput.value;

        const quantidade = Number(quantidadeInput.value);

        const valor = Number(valorInput.value);

        cadastrarProduto(descricao, quantidade, valor);

        mensagem.textContent =
            "Produto cadastrado com sucesso!";

        mensagem.style.color = "green";

        formProduto.reset();

    } catch (erro) {

        mensagem.textContent = erro.message;

        mensagem.style.color = "red";

    }

});


// ======================================
// 11. INICIALIZAÇÃO DO SISTEMA
// ======================================

listarProdutos();
