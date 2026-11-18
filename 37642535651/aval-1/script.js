
// Lista (Array) de produtos
let produtos = [];

// Função para validar os dados do produto
function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    return novoProduto;
}

// Função para listar produtos
function listarProdutos() {
    console.log(produtos);
    return produtos;
}

// Função para atualizar o valor
function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produtoEncontrado = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produtoEncontrado) {
        produtoEncontrado.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Função para atualizar a quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produtoEncontrado = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produtoEncontrado) {
        produtoEncontrado.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Função para mostrar os produtos na tela
function mostrarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>
                <hr>
            </div>
        `;

    });
}

// Integração com o botão de cadastrar
function cadastrarProdutoHTML() {

    try {
        const descricao = document.getElementById("descricao").value.trim();
        const quantidade = Number(document.getElementById("quantidade").value);
        const valor = Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        alert("Produto cadastrado com sucesso!");

        mostrarProdutos();

        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

    } catch (erro) {
        alert(erro.message);
    }
}

// Integração com o botão de listar
function listarProdutosHTML() {

    if (produtos.length === 0) {
        alert("Nenhum produto cadastrado!");
        return;
    }

    mostrarProdutos();
}

// Integração com o botão de atualizar valor
function atualizarValorHTML() {

    try {
        const codigo = Number(document.getElementById("codigo").value);
        const novoValor = Number(document.getElementById("novoValor").value);

        atualizarValor(codigo, novoValor);

        alert("Valor atualizado com sucesso!");

        mostrarProdutos();

    } catch (erro) {
        alert(erro.message);
    }
}

// Integração com o botão de atualizar quantidade
function atualizarQuantidadeHTML() {

    try {
        const codigo = Number(document.getElementById("codigo").value);
        const novaQuantidade = Number(document.getElementById("novaQuantidade").value);

        atualizarQuantidade(codigo, novaQuantidade);

        alert("Quantidade atualizada com sucesso!");

        mostrarProdutos();

    } catch (erro) {
        alert(erro.message);
    }
}
