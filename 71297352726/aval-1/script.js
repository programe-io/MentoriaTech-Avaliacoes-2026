let produtos = [];

// Valida os dados antes de cadastrar
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter no mínimo cinco caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}

// Cadastra um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length > 0
            ? Math.max(...produtos.map(prod => prod.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    listarProduto();

    mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");
}

// Exibe os produtos na tabela
function listarProduto() {
    const lista = document.getElementById("listaProdutos");

    lista.replaceChildren();

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(celula);
        lista.appendChild(linha);

        return;
    }

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarMoeda(produto.valor),
            formatarMoeda(produto.quantidade * produto.valor)
        ];

        dados.forEach(dado => {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        lista.appendChild(linha);
    });
}

// Formata os valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Exibe mensagens na página
function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = "mensagem " + tipo;
}

// Atualiza o preço de um produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;

    listarProduto();

    mostrarMensagem("Preço atualizado com sucesso!", "sucesso");
}

// Adiciona unidades ao estoque
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;

    listarProduto();

    mostrarMensagem("Estoque atualizado com sucesso!", "sucesso");
}

// Trata erros sem interromper a página
function executarAcao(acao) {
    try {
        acao();
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}

// Evento de cadastro
document.getElementById("formCadastro").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const descricao =
            document.getElementById("descricao").value;

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        executarAcao(() => {
            cadastrarProduto(descricao, quantidade, valor);

            this.reset();
        });
    }
);

// Evento de atualização de preço
document.getElementById("formAtualizacao").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const codigo = Number(
            document.getElementById("codigoAtualizacao").value
        );

        const novoValor = Number(
            document.getElementById("novoValor").value
        );

        executarAcao(() => {
            if (!Number.isInteger(codigo) || codigo < 1) {
                throw new Error("Informe um código válido.");
            }

            atualizarValor(codigo, novoValor);

            this.reset();
        });
    }
);

// Evento de adição de quantidade
document.getElementById("formQuantidade").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const codigo = Number(
            document.getElementById("codigoQuantidade").value
        );

        const quantidade = Number(
            document.getElementById("novaQuantidade").value
        );

        executarAcao(() => {
            if (!Number.isInteger(codigo) || codigo < 1) {
                throw new Error("Informe um código válido.");
            }

            atualizarQuantidade(codigo, quantidade);

            this.reset();
        });
    }
);

// Produtos iniciais do exemplo original
cadastrarProduto("Cadeira gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);
listarProduto();