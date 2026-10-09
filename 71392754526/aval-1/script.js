
let produtos = [];
let proximoCodigo = 1;

const formCadastro = document.getElementById("formCadastro");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const campoCodigo = document.getElementById("codigoAlterar");
const campoNovoValor = document.getElementById("novoValor");
const campoNovaQuantidade = document.getElementById("novaQuantidade");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Cadastrar um novo produto
formCadastro.addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = campoDescricao.value.trim();
    const quantidade = Number(campoQuantidade.value);
    const valor = Number(campoValor.value);

    if (descricao.length < 5) {
        mostrarMensagem("A descrição deve ter no mínimo 5 caracteres.");
        return;
    }

    if (campoQuantidade.value === "" ||
        !Number.isInteger(quantidade) || quantidade < 0) {
        mostrarMensagem("A quantidade deve ser um número inteiro igual ou maior que zero.");
        return;
    }

    if (campoValor.value === "" ||
        !Number.isFinite(valor) || valor <= 0) {
        mostrarMensagem("O valor deve ser maior que zero.");
        return;
    }

    const produto = {
        codigo: proximoCodigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);
    proximoCodigo++;

    listarProdutos();
    formCadastro.reset();

    mostrarMensagem("Produto cadastrado com sucesso!");
});

// Listar os produtos cadastrados
function listarProdutos() {
    listaProdutos.replaceChildren();

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const valores = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        valores.forEach(function(valor) {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        listaProdutos.appendChild(linha);
    });

    document.getElementById("totalProdutos").textContent =
        "Total de produtos cadastrados: " + produtos.length;
}

// Procurar um produto pelo código
function buscarProduto(codigo) {
    return produtos.find(function(produto) {
        return produto.codigo === codigo;
    });
}

// Alterar o valor de um produto
document.getElementById("btnValor").addEventListener("click", function() {
    const codigo = Number(campoCodigo.value);
    const novoValor = Number(campoNovoValor.value);

    if (campoCodigo.value === "" ||
        !Number.isInteger(codigo) || codigo < 1) {
        mostrarMensagem("Digite um código válido.");
        return;
    }

    if (campoNovoValor.value === "" ||
        !Number.isFinite(novoValor) || novoValor <= 0) {
        mostrarMensagem("Digite um valor maior que zero.");
        return;
    }

    const produto = buscarProduto(codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.");
        return;
    }

    produto.valor = novoValor;
    listarProdutos();

    campoNovoValor.value = "";
    mostrarMensagem("Valor alterado com sucesso!");
});

// Alterar a quantidade de um produto
document.getElementById("btnQuantidade").addEventListener("click", function() {
    const codigo = Number(campoCodigo.value);
    const novaQuantidade = Number(campoNovaQuantidade.value);

    if (campoCodigo.value === "" ||
        !Number.isInteger(codigo) || codigo < 1) {
        mostrarMensagem("Digite um código válido.");
        return;
    }

    if (campoNovaQuantidade.value === "" ||
        !Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        mostrarMensagem("A quantidade deve ser um número inteiro igual ou maior que zero.");
        return;
    }

    const produto = buscarProduto(codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.");
        return;
    }

    produto.quantidade = novaQuantidade;
    listarProdutos();

    campoNovaQuantidade.value = "";
    mostrarMensagem("Quantidade alterada com sucesso!");
});

// Exibir mensagens para o usuário
function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}