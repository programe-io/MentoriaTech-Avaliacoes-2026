
let produtos = [];
let proximoCodigo = 1;

const formulario = document.getElementById("form-produto");
const lista = document.getElementById("lista-produtos");
const mensagem = document.getElementById("mensagem");

// Validar os dados do produto
function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter pelo menos 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();
}

// Listar produtos
function listarProdutos() {

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5">Nenhum produto cadastrado.</td>
            </tr>
        `;
        return;
    }

    produtos.forEach((produto) => {

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td></td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.valor)}</td>
            <td>
                <div class="acoes">
                    <button onclick="solicitarNovoValor(${produto.codigo})">
                        Alterar valor
                    </button>

                    <button onclick="solicitarQuantidade(${produto.codigo})">
                        Adicionar quantidade
                    </button>

                    <button class="excluir"
                        onclick="excluirProduto(${produto.codigo})">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        linha.children[1].textContent = produto.descricao;

        lista.appendChild(linha);
    });
}

// Buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(
        (produto) => produto.codigo === codigoProduto
    );
}

// Atualizar valor
function atualizarValor(codigoProduto, novoValor) {

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("Valor inválido.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado.");
    }

    listarProdutos();
}

// Atualizar quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("Quantidade inválida.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.quantidade =
            produto.quantidade + novaQuantidade;
    } else {
        throw new Error("Produto não encontrado.");
    }

    listarProdutos();
}

// Solicitar novo valor
function solicitarNovoValor(codigo) {

    const produto = buscarProdutoPorCodigo(codigo);

    const resposta = prompt("Informe o novo valor:");

    if (resposta === null || resposta.trim() === "") return;

    try {
        atualizarValor(
            codigo,
            Number(resposta.replace(",", "."))
        );

        mostrarMensagem("Valor atualizado com sucesso!");

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

// Solicitar quantidade
function solicitarQuantidade(codigo) {

    const resposta = prompt("Informe a quantidade a adicionar:");

    if (resposta === null || resposta.trim() === "") return;

    try {
        atualizarQuantidade(codigo, Number(resposta));

        mostrarMensagem("Quantidade atualizada com sucesso!");

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

// Excluir produto
function excluirProduto(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", true);
        return;
    }

    if (confirm("Deseja excluir este produto?")) {

        produtos = produtos.filter(
            (produto) => produto.codigo !== codigoProduto
        );

        listarProdutos();

        mostrarMensagem("Produto excluído com sucesso!");
    }
}

// Formatar valor em reais
function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Exibir mensagens
function mostrarMensagem(texto, erro = false) {

    mensagem.textContent = texto;
    mensagem.style.color = erro ? "red" : "green";
}

// Evento de cadastro
formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(
        document.getElementById("valor").value
    );

    try {

        cadastrarProduto(descricao, quantidade, valor);

        formulario.reset();

        mostrarMensagem("Produto cadastrado com sucesso!");

    } catch (erro) {

        mostrarMensagem(erro.message, true);
    }
});

// Inicializar lista
listarProdutos();
