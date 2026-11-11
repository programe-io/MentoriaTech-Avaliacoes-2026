
let produtos = [];
let geradorDeCodigo = 0;

// Função para cadastrar produto
function cadastrarProduto() {

    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (descricao.trim() === "" || quantidade < 0 || valor < 0 ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "") {

        mostrarMensagem("Preencha os dados corretamente!", "red");
        return;
    }

    let produto = {
        codigo: ++geradorDeCodigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    listarProdutos();

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    mostrarMensagem("Produto cadastrado com sucesso!", "green");
}

// Função para listar produtos
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    for (let i = 0; i < produtos.length; i++) {

        lista.innerHTML += `
            <tr>
                <td>${produtos[i].codigo}</td>
                <td>${produtos[i].descricao}</td>
                <td>${produtos[i].quantidade}</td>
                <td>R$ ${produtos[i].valor.toFixed(2)}</td>
                <td>
                    <button onclick="alterarValor(${produtos[i].codigo})">
                        Alterar valor
                    </button>

                    <button onclick="alterarQuantidade(${produtos[i].codigo})">
                        Alterar quantidade
                    </button>
                </td>
            </tr>
        `;
    }
}

// Função para buscar produto pelo código
function buscarProduto(codigo) {

    return produtos.find(produto => produto.codigo === codigo);

}

// Função para alterar valor
function alterarValor(codigo) {

    let produto = buscarProduto(codigo);

    if (produto === undefined) {
        mostrarMensagem("Produto não encontrado!", "red");
        return;
    }

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "" ||
        !Number.isFinite(Number(novoValor)) || Number(novoValor) < 0) {
        mostrarMensagem("Valor inválido!", "red");
        return;
    }

    produto.valor = Number(novoValor);

    listarProdutos();

    mostrarMensagem("Valor alterado com sucesso!", "green");
}

// Função para alterar quantidade
function alterarQuantidade(codigo) {

    let produto = buscarProduto(codigo);

    if (produto === undefined) {
        mostrarMensagem("Produto não encontrado!", "red");
        return;
    }

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "" ||
        !Number.isInteger(Number(novaQuantidade)) ||
        Number(novaQuantidade) < 0) {
        mostrarMensagem("Quantidade inválida!", "red");
        return;
    }

    produto.quantidade = Number(novaQuantidade);

    listarProdutos();

    mostrarMensagem("Quantidade alterada com sucesso!", "green");
}

// Função para mostrar mensagens
function mostrarMensagem(texto, cor) {

    let mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = cor;

}
