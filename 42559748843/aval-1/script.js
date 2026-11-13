
// Recuperar produtos salvos no navegador
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Salvar produtos no LocalStorage
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Cadastrar produto
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar se o código já existe
    const existe = produtos.some(
        produto => produto.codigo === codigo
    );

    if (existe) {
        alert("Este produto já está cadastrado!");
        return;
    }

    // Verificar dados
    if (
        codigo === "" ||
        descricao === "" ||
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Criar produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adicionar produto à lista
    produtos.push(produto);

    // Salvar no navegador
    salvarProdutos();

    alert("Produto cadastrado com sucesso!");

    formulario.reset();

    listarProdutos();

});

// Listar produtos
function listarProdutos() {

    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        mensagem.textContent = "Nenhum produto cadastrado.";
        return;
    }

    mensagem.textContent = "";

    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        dados.forEach(function(dado) {

            const coluna = document.createElement("td");

            coluna.textContent = dado;

            linha.appendChild(coluna);

        });

        // Coluna de ações
        const colunaAcoes = document.createElement("td");

        // Alterar valor
        const botaoValor = document.createElement("button");

        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "editar";

        botaoValor.addEventListener("click", function() {
            alterarValor(produto.codigo);
        });

        // Alterar quantidade
        const botaoQuantidade = document.createElement("button");

        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.className = "editar";

        botaoQuantidade.addEventListener("click", function() {
            alterarQuantidade(produto.codigo);
        });

        // Excluir produto
        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirProduto(produto.codigo);
        });

        colunaAcoes.appendChild(botaoValor);
        colunaAcoes.appendChild(botaoQuantidade);
        colunaAcoes.appendChild(botaoExcluir);

        linha.appendChild(colunaAcoes);

        listaProdutos.appendChild(linha);

    });

}

// Alterar valor
function alterarValor(codigo) {

    const produto = produtos.find(
        item => item.codigo === codigo
    );

    const novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = valor;

    salvarProdutos();

    listarProdutos();

    alert("Valor atualizado com sucesso!");

}

// Alterar quantidade
function alterarQuantidade(codigo) {

    const produto = produtos.find(
        item => item.codigo === codigo
    );

    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produto.quantidade = quantidade;

    salvarProdutos();

    listarProdutos();

    alert("Quantidade atualizada com sucesso!");

}

// Excluir produto
function excluirProduto(codigo) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(
        produto => produto.codigo !== codigo
    );

    salvarProdutos();

    listarProdutos();

    alert("Produto excluído com sucesso!");

}

// Mostrar produtos ao abrir a página
listarProdutos();
