
// SISTEMA DE ESTOQUE

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let proximoId = Number(localStorage.getItem("proximoId")) || 1;

// SALVAR DADOS
function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("proximoId", proximoId);
}

// FORMATAR DINHEIRO
function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// CADASTRAR PRODUTO
document.getElementById("formProduto").addEventListener("submit", function(event) {

    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let preco = Number(document.getElementById("preco").value);
    let quantidade = Number(document.getElementById("quantidade").value);

    if (nome === "" || !Number.isFinite(preco) ||
        preco <= 0 || !Number.isInteger(quantidade) ||
        quantidade < 0) {

        alert("Preencha os dados corretamente!");
        return;
    }

    let produto = {
        id: proximoId++,
        nome: nome,
        preco: preco,
        quantidade: quantidade
    };

    produtos.push(produto);

    salvarDados();

    alert("Produto cadastrado com sucesso!");

    document.getElementById("formProduto").reset();

    listarProdutos();
    relatorio();

});

// LISTAR PRODUTOS
function listarProdutos(lista = produtos) {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    if (lista.length === 0) {
        tabela.innerHTML =
            '<tr><td colspan="7">Nenhum produto cadastrado.</td></tr>';
        return;
    }

    lista.forEach(function(produto) {

        let situacao = produto.quantidade <= 5
            ? "Estoque baixo"
            : "Disponível";

        let linha = document.createElement("tr");

        function criarCelula(valor) {
            let celula = document.createElement("td");
            celula.textContent = valor;
            return celula;
        }

        linha.appendChild(criarCelula(produto.id));
        linha.appendChild(criarCelula(produto.nome));
        linha.appendChild(criarCelula(formatarDinheiro(produto.preco)));
        linha.appendChild(criarCelula(produto.quantidade));
        linha.appendChild(criarCelula(
            formatarDinheiro(produto.preco * produto.quantidade)
        ));
        linha.appendChild(criarCelula(situacao));

        let acoes = document.createElement("td");

        let editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.onclick = function() {
            editarProduto(produto.id);
        };

        let excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.onclick = function() {
            excluirProduto(produto.id);
        };

        acoes.appendChild(editar);
        acoes.appendChild(excluir);

        linha.appendChild(acoes);

        tabela.appendChild(linha);

    });

}

// EDITAR PRODUTO
function editarProduto(id) {

    let produto = produtos.find(p => p.id === id);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novoNome = prompt("Novo nome:", produto.nome);

    if (novoNome === null) return;

    novoNome = novoNome.trim();

    if (novoNome === "") {
        alert("Nome inválido!");
        return;
    }

    let novoPreco = prompt("Novo preço:", produto.preco);

    if (novoPreco === null) return;

    novoPreco = Number(novoPreco);

    if (!Number.isFinite(novoPreco) || novoPreco <= 0) {
        alert("Preço inválido!");
        return;
    }

    let novaQuantidade = prompt(
        "Nova quantidade:",
        produto.quantidade
    );

    if (novaQuantidade === null) return;

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.nome = novoNome;
    produto.preco = novoPreco;
    produto.quantidade = novaQuantidade;

    salvarDados();
    listarProdutos();
    relatorio();

    alert("Produto atualizado com sucesso!");

}

// EXCLUIR PRODUTO
function excluirProduto(id) {

    let confirmar = confirm("Deseja excluir este produto?");

    if (!confirmar) return;

    produtos = produtos.filter(p => p.id !== id);

    salvarDados();
    listarProdutos();
    relatorio();

    alert("Produto excluído com sucesso!");

}

// PESQUISAR PRODUTO
function pesquisarProduto() {

    let nome = document.getElementById("pesquisa")
        .value.trim().toLowerCase();

    let resultado = produtos.filter(function(produto) {
        return produto.nome.toLowerCase().includes(nome);
    });

    listarProdutos(resultado);

}

// ADICIONAR ESTOQUE
function adicionarEstoque() {

    let id = Number(document.getElementById("idMovimento").value);
    let quantidade = Number(
        document.getElementById("quantidadeMovimento").value
    );

    let produto = produtos.find(p => p.id === id);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade válida!");
        return;
    }

    produto.quantidade += quantidade;

    salvarDados();
    listarProdutos();
    relatorio();

    alert("Estoque atualizado com sucesso!");

}

// RETIRAR ESTOQUE
function retirarEstoque() {

    let id = Number(document.getElementById("idMovimento").value);
    let quantidade = Number(
        document.getElementById("quantidadeMovimento").value
    );

    let produto = produtos.find(p => p.id === id);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade válida!");
        return;
    }

    if (quantidade > produto.quantidade) {
        alert("Estoque insuficiente!");
        return;
    }

    produto.quantidade -= quantidade;

    salvarDados();
    listarProdutos();
    relatorio();

    alert("Saída registrada com sucesso!");

}

// RELATÓRIO
function relatorio() {

    let quantidadeTotal = 0;
    let valorTotal = 0;
    let baixoEstoque = 0;

    produtos.forEach(function(produto) {

        quantidadeTotal += produto.quantidade;

        valorTotal += produto.preco * produto.quantidade;

        if (produto.quantidade <= 5) {
            baixoEstoque++;
        }

    });

    document.getElementById("totalProdutos").textContent =
        "Quantidade total de unidades: " + quantidadeTotal;

    document.getElementById("valorEstoque").textContent =
        "Valor total: " + formatarDinheiro(valorTotal);

    document.getElementById("estoqueBaixo").textContent =
        "Produtos com estoque baixo: " + baixoEstoque;

}

// LIMPAR ESTOQUE
function limparEstoque() {

    let confirmar = confirm(
        "Tem certeza que deseja excluir todos os produtos?"
    );

    if (!confirmar) return;

    produtos = [];

    salvarDados();

    listarProdutos();
    relatorio();

    alert("Estoque limpo com sucesso!");

}

// INICIALIZAÇÃO DO SISTEMA
listarProdutos();
relatorio();
salvarDados();
