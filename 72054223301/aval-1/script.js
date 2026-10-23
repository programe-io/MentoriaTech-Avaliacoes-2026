
let produtos = [];

// Valida os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" ||
        descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter, no mínimo, cinco caracteres."
        );
    }

    if (!Number.isSafeInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "Quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "Valor deve ser um número maior ou igual a zero."
        );
    }
}

// Cadastra um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length
            ? Math.max(...produtos.map(prod => prod.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    listarProdutos();

    return novoProduto;
}

// Atualiza o valor unitário
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
    listarProdutos();

    return produto;
}

// Adiciona unidades ao estoque
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isSafeInteger(novaQuantidade) ||
        novaQuantidade < 1) {
        throw new Error(
            "Quantidade deve ser um número inteiro maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    if (!Number.isSafeInteger(
        produto.quantidade + novaQuantidade
    )) {
        throw new Error("Quantidade final inválida.");
    }

    produto.quantidade += novaQuantidade;
    listarProdutos();

    return produto;
}

// Busca um produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        prod => prod.codigo === codigoProduto
    );
}

// Formata os valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Exibe mensagens de sucesso ou erro
function mostrarMensagem(texto, tipo = "sucesso") {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Atualiza a tabela de produtos
function listarProdutos() {
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

        const valores = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarMoeda(produto.valor),
            formatarMoeda(produto.quantidade * produto.valor)
        ];

        valores.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        lista.appendChild(linha);
    });
}

// Evento: cadastrar produto
document.getElementById("formCadastro")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        try {
            const descricao =
                document.getElementById("descricao").value;

            const quantidade =
                Number(document.getElementById("quantidade").value);

            const valor =
                Number(document.getElementById("valor").value);

            const produto = cadastrarProduto(
                descricao,
                quantidade,
                valor
            );

            mostrarMensagem(
                `Produto "${produto.descricao}" cadastrado com sucesso! Código: ${produto.codigo}.`
            );

            this.reset();
        } catch (erro) {
            mostrarMensagem(erro.message, "erro");
        }
    });

// Evento: buscar produto
document.getElementById("formBusca")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const codigo = Number(
            document.getElementById("codigoBusca").value
        );

        const resultado = document.getElementById("resultadoBusca");
        resultado.replaceChildren();

        const produto = buscarProdutoPorCodigo(codigo);

        if (!Number.isSafeInteger(codigo) || codigo < 1 || !produto) {
            resultado.textContent = "Produto não encontrado.";
            mostrarMensagem("Não foi encontrado um produto com esse código.", "erro");
            return;
        }

        const painel = document.createElement("div");
        painel.className = "resultado";

        const dados = [
            `Código: ${produto.codigo}`,
            `Descrição: ${produto.descricao}`,
            `Quantidade em estoque: ${produto.quantidade}`,
            `Valor unitário: ${formatarMoeda(produto.valor)}`,
            `Valor total em estoque: ${formatarMoeda(produto.quantidade * produto.valor)}`
        ];

        dados.forEach(texto => {
            const paragrafo = document.createElement("p");
            paragrafo.textContent = texto;
            painel.appendChild(paragrafo);
        });

        resultado.appendChild(painel);
        mostrarMensagem("Produto encontrado com sucesso!");
    });

// Evento: atualizar preço
document.getElementById("formPreco")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        try {
            const codigo = Number(
                document.getElementById("codigoPreco").value
            );

            const valor = Number(
                document.getElementById("novoValor").value
            );

            if (!Number.isSafeInteger(codigo) || codigo < 1) {
                throw new Error("Informe um código válido.");
            }

            atualizarValor(codigo, valor);

            mostrarMensagem("Preço atualizado com sucesso!");
            this.reset();
        } catch (erro) {
            mostrarMensagem(erro.message, "erro");
        }
    });

// Evento: adicionar quantidade ao estoque
document.getElementById("formEstoque")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        try {
            const codigo = Number(
                document.getElementById("codigoEstoque").value
            );

            const quantidade = Number(
                document.getElementById("novaQuantidade").value
            );

            if (!Number.isSafeInteger(codigo) || codigo < 1) {
                throw new Error("Informe um código válido.");
            }

            atualizarQuantidade(codigo, quantidade);

            mostrarMensagem("Estoque atualizado com sucesso!");
            this.reset();
        } catch (erro) {
            mostrarMensagem(erro.message, "erro");
        }
    });

// Exibe a tabela inicial
listarProdutos();
