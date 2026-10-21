
let produtos = [];

// Valida os dados antes do cadastro
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, cinco caracteres."
        );
    }

    if (!Number.isSafeInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser um número inteiro maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

// Cadastra um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    return novoProduto;
}

// Lista os produtos cadastrados
function listarProdutos() {
    console.log(produtos);
    renderizarProdutos();
    atualizarResumo();
}

// Busca um produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        (prod) => prod.codigo === codigoProduto
    );
}

// Atualiza o valor do produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isSafeInteger(codigoProduto) || codigoProduto < 1) {
        throw new Error("Informe um código de produto válido.");
    }

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Adiciona novas unidades ao estoque existente
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isSafeInteger(codigoProduto) || codigoProduto < 1) {
        throw new Error("Informe um código de produto válido.");
    }

    if (!Number.isSafeInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("A quantidade deve ser um número inteiro maior que zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        if (!Number.isSafeInteger(produto.quantidade + novaQuantidade)) {
            throw new Error("A quantidade final ultrapassa o limite permitido.");
        }

        produto.quantidade = produto.quantidade + novaQuantidade;
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Formata valores monetários em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Exibe mensagens na tela
function mostrarMensagem(texto, tipo = "sucesso") {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Atualiza os cartões de resumo
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
        formatarMoeda(valorEstoque);
}

// Mostra os produtos na tabela
function renderizarProdutos() {
    const lista = document.getElementById("listaProdutos");
    const listaVazia = document.getElementById("listaVazia");
    const pesquisa = document.getElementById("pesquisa").value
        .trim()
        .toLowerCase();

    lista.replaceChildren();

    const produtosFiltrados = produtos.filter((produto) =>
        produto.descricao.toLowerCase().includes(pesquisa) ||
        String(produto.codigo).includes(pesquisa)
    );

    produtosFiltrados.forEach((produto) => {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarMoeda(produto.valor),
            formatarMoeda(produto.quantidade * produto.valor)
        ];

        dados.forEach((dado) => {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        lista.appendChild(linha);
    });

    listaVazia.hidden = produtosFiltrados.length > 0;

    if (produtos.length > 0 && produtosFiltrados.length === 0) {
        listaVazia.textContent = "Nenhum produto encontrado na pesquisa.";
    } else {
        listaVazia.textContent = "Nenhum produto cadastrado.";
    }
}

// Evento de cadastro
document.getElementById("formCadastro").addEventListener("submit", (evento) => {
    evento.preventDefault();

    try {
        const descricao = document.getElementById("descricao").value;
        const quantidade = Number(
            document.getElementById("quantidade").value
        );
        const valor = Number(
            document.getElementById("valor").value
        );

        const produto = cadastrarProduto(descricao, quantidade, valor);

        listarProdutos();

        mostrarMensagem(
            `Produto "${produto.descricao}" cadastrado com sucesso! Código: ${produto.codigo}.`
        );

        evento.target.reset();
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Evento para alterar o valor
document.getElementById("btnValor").addEventListener("click", () => {
    try {
        const codigo = Number(
            document.getElementById("codigoAtualizar").value
        );
        const novoValor = Number(
            document.getElementById("novoValor").value
        );

        if (
            document.getElementById("codigoAtualizar").value.trim() === "" ||
            document.getElementById("novoValor").value.trim() === ""
        ) {
            throw new Error("Preencha o código e o novo valor.");
        }

        atualizarValor(codigo, novoValor);
        listarProdutos();

        mostrarMensagem("Valor do produto atualizado com sucesso!");

        document.getElementById("novoValor").value = "";
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Evento para adicionar quantidade
document.getElementById("btnQuantidade").addEventListener("click", () => {
    try {
        const codigo = Number(
            document.getElementById("codigoAtualizar").value
        );
        const novaQuantidade = Number(
            document.getElementById("novaQuantidade").value
        );

        if (
            document.getElementById("codigoAtualizar").value.trim() === "" ||
            document.getElementById("novaQuantidade").value.trim() === ""
        ) {
            throw new Error("Preencha o código e a quantidade recebida.");
        }

        atualizarQuantidade(codigo, novaQuantidade);
        listarProdutos();

        mostrarMensagem("Estoque atualizado com sucesso!");

        document.getElementById("novaQuantidade").value = "";
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

// Pesquisa produtos por descrição ou código
document.getElementById("pesquisa").addEventListener("input", () => {
    renderizarProdutos();
});

// Inicializa a interface
listarProdutos();
