let produtos = [];
let proximoCodigo = 1;

const formCadastro = document.getElementById("formCadastro");
const formAtualizacao = document.getElementById("formAtualizacao");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const busca = document.getElementById("busca");

const formatoMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

// Exibir mensagens na tela
function mostrarMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Validar os dados de um produto
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error("A descrição deve ter pelo menos cinco caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser um número inteiro maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser um número válido maior ou igual a zero.");
    }
}

// Buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(produto => produto.codigo === codigoProduto);
}

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProdutos();
    atualizarResumo();

    return novoProduto;
}

// Listar produtos e aplicar a pesquisa
function listarProdutos() {
    const termo = busca.value.trim().toLocaleLowerCase("pt-BR");

    const produtosFiltrados = produtos.filter(produto =>
        produto.descricao.toLocaleLowerCase("pt-BR").includes(termo) ||
        String(produto.codigo).includes(termo)
    );

    listaProdutos.replaceChildren();

    if (produtosFiltrados.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.className = "vazio";
        celula.textContent = produtos.length === 0
            ? "Nenhum produto cadastrado."
            : "Nenhum produto encontrado.";

        linha.appendChild(celula);
        listaProdutos.appendChild(linha);
        return;
    }

    produtosFiltrados.forEach(produto => {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatoMoeda.format(produto.valor),
            formatoMoeda.format(produto.valor * produto.quantidade)
        ];

        dados.forEach(dado => {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        listaProdutos.appendChild(linha);
    });
}

// Atualizar o resumo do estoque
function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorEstoque = produtos.reduce(
        (total, produto) => total + produto.quantidade * produto.valor,
        0
    );

    document.getElementById("totalProdutos").textContent = totalProdutos;
    document.getElementById("totalUnidades").textContent = totalUnidades;
    document.getElementById("valorEstoque").textContent =
        formatoMoeda.format(valorEstoque);
}

// Atualizar o valor de um produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("O novo valor deve ser maior ou igual a zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
    return produto;
}

// Adicionar unidades ao estoque
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("A quantidade adicionada deve ser um inteiro maior que zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;
    return produto;
}

// Evento do formulário de cadastro
formCadastro.addEventListener("submit", function(evento) {
    evento.preventDefault();

    try {
        const descricao = document.getElementById("descricao").value;
        const quantidade = Number(document.getElementById("quantidade").value);
        const valor = Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        formCadastro.reset();
        mostrarMensagem("Produto cadastrado com sucesso!");
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Evento do formulário de atualização
formAtualizacao.addEventListener("submit", function(evento) {
    evento.preventDefault();

    try {
        const codigoTexto = document.getElementById("codigoAtualizacao").value;
        const valorTexto = document.getElementById("novoValor").value;
        const quantidadeTexto = document.getElementById("novaQuantidade").value;

        const codigo = Number(codigoTexto);

        if (!Number.isInteger(codigo) || codigo < 1) {
            throw new Error("Informe um código de produto válido.");
        }

        if (valorTexto === "" && quantidadeTexto === "") {
            throw new Error("Informe um novo valor ou uma quantidade para adicionar.");
        }

        // Verifica o produto antes de realizar as alterações
        const produto = buscarProdutoPorCodigo(codigo);

        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        // Validar todas as entradas antes de alterar os dados
        let novoValor;
        let novaQuantidade;

        if (valorTexto !== "") {
            novoValor = Number(valorTexto);

            if (!Number.isFinite(novoValor) || novoValor < 0) {
                throw new Error("Informe um valor válido maior ou igual a zero.");
            }
        }

        if (quantidadeTexto !== "") {
            novaQuantidade = Number(quantidadeTexto);

            if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
                throw new Error("A quantidade deve ser um inteiro maior que zero.");
            }
        }

        if (valorTexto !== "") {
            atualizarValor(codigo, novoValor);
        }

        if (quantidadeTexto !== "") {
            atualizarQuantidade(codigo, novaQuantidade);
        }

        listarProdutos();
        atualizarResumo();
        formAtualizacao.reset();

        mostrarMensagem("Produto atualizado com sucesso!");
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Pesquisa em tempo real
busca.addEventListener("input", listarProdutos);

// Inicializar a interface
listarProdutos();
atualizarResumo();