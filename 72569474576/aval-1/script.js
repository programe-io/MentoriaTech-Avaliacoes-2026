
// Array para armazenar os produtos
let produtos = [];


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    // Verificar se os campos estão preenchidos
    if (
        codigo === "" ||
        descricao === "" ||
        quantidade === "" ||
        valor === ""
    ) {
        mostrarMensagem(
            "Preencha todos os campos.",
            "red"
        );
        return;
    }

    // Verificar se o código já existe
    let existe = produtos.some(function(produto) {
        return produto.codigo == codigo;
    });

    if (existe) {
        mostrarMensagem(
            "Já existe um produto com esse código.",
            "red"
        );
        return;
    }

    // Validar quantidade
    if (Number(quantidade) < 0) {
        mostrarMensagem(
            "A quantidade não pode ser negativa.",
            "red"
        );
        return;
    }

    // Validar valor
    if (Number(valor) < 0) {
        mostrarMensagem(
            "O valor não pode ser negativo.",
            "red"
        );
        return;
    }

    // Criar produto
    let produto = {
        codigo: Number(codigo),
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    // Adicionar produto
    produtos.push(produto);

    mostrarMensagem(
        "Produto cadastrado com sucesso!",
        "green"
    );

    // Limpar campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    // Atualizar lista
    listarProdutos();
}


// ==========================================
// LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(function(produto) {

        lista.innerHTML += `
            <div class="produto">

                <h3>${produto.descricao}</h3>

                <p>
                    <strong>Código:</strong>
                    ${produto.codigo}
                </p>

                <p>
                    <strong>Quantidade:</strong>
                    ${produto.quantidade}
                </p>

                <p>
                    <strong>Valor:</strong>
                    R$ ${produto.valor.toFixed(2)}
                </p>

                <div class="acoes">

                    <button
                        class="btn-valor"
                        onclick="alterarValor(${produto.codigo})">
                        Alterar valor
                    </button>

                    <button
                        class="btn-quantidade"
                        onclick="alterarQuantidade(${produto.codigo})">
                        Alterar quantidade
                    </button>

                </div>

            </div>
        `;
    });
}


// ==========================================
// ALTERAR VALOR
// ==========================================

function alterarValor(codigo) {

    let produto = produtos.find(function(produto) {
        return produto.codigo == codigo;
    });

    if (!produto) {
        mostrarMensagem(
            "Produto não encontrado.",
            "red"
        );
        return;
    }

    let novoValor = prompt(
        "Digite o novo valor do produto:"
    );

    if (novoValor === null) {
        return;
    }

    novoValor = Number(novoValor);

    if (isNaN(novoValor) || novoValor < 0) {
        mostrarMensagem(
            "Digite um valor válido.",
            "red"
        );
        return;
    }

    produto.valor = novoValor;

    mostrarMensagem(
        "Valor alterado com sucesso!",
        "green"
    );

    listarProdutos();
}


// ==========================================
// ALTERAR QUANTIDADE
// ==========================================

function alterarQuantidade(codigo) {

    let produto = produtos.find(function(produto) {
        return produto.codigo == codigo;
    });

    if (!produto) {
        mostrarMensagem(
            "Produto não encontrado.",
            "red"
        );
        return;
    }

    let novaQuantidade = prompt(
        "Digite a nova quantidade:"
    );

    if (novaQuantidade === null) {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (
        isNaN(novaQuantidade) ||
        novaQuantidade < 0 ||
        !Number.isInteger(novaQuantidade)
    ) {
        mostrarMensagem(
            "Digite uma quantidade inteira válida.",
            "red"
        );
        return;
    }

    produto.quantidade = novaQuantidade;

    mostrarMensagem(
        "Quantidade alterada com sucesso!",
        "green"
    );

    listarProdutos();
}


// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(texto, cor) {

    let mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = cor;

    setTimeout(function() {
        mensagem.textContent = "";
    }, 3000);
}


// ==========================================
// INICIAR SISTEMA
// ==========================================

listarProdutos();
