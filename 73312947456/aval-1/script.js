
let produtos = [];
let proximoCodigo = 1;

// Valida os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter, no mínimo, cinco caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "Quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero."
        );
    }
}

// Cadastra um produto
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
    mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");
}

// Lista os produtos na tabela
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.replaceChildren();

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.className = "vazio";
        celula.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(celula);
        lista.appendChild(linha);

        return;
    }

    produtos.forEach((produto) => {
        const linha = document.createElement("tr");

        adicionarCelula(linha, produto.codigo);
        adicionarCelula(linha, produto.descricao);
        adicionarCelula(linha, produto.quantidade);
        adicionarCelula(
            linha,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        );

        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");

        acoes.className = "acoes";

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "btn-editar";

        botaoValor.addEventListener("click", () => {
            solicitarNovoValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Adicionar estoque";
        botaoQuantidade.className = "btn-quantidade";

        botaoQuantidade.addEventListener("click", () => {
            solicitarQuantidade(produto.codigo);
        });

        acoes.append(botaoValor, botaoQuantidade);
        celulaAcoes.appendChild(acoes);
        linha.appendChild(celulaAcoes);

        lista.appendChild(linha);
    });
}

// Cria uma célula da tabela com segurança
function adicionarCelula(linha, conteudo) {
    const celula = document.createElement("td");
    celula.textContent = conteudo;
    linha.appendChild(celula);
}

// Atualiza o valor de um produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero."
        );
    }

    const produto = produtos.find(
        (prod) => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;

    listarProdutos();
    mostrarMensagem("Valor atualizado com sucesso!", "sucesso");
}

// Adiciona unidades ao estoque atual
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 1
    ) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    const produto = produtos.find(
        (prod) => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;

    listarProdutos();
    mostrarMensagem("Estoque atualizado com sucesso!", "sucesso");
}

// Solicita um novo valor
function solicitarNovoValor(codigo) {
    const produto = produtos.find(
        (prod) => prod.codigo === codigo
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    const entrada = prompt(
        `Novo valor para ${produto.descricao}:`,
        produto.valor.toFixed(2)
    );

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    // Permite digitar 12,50 ou 12.50
    const valor = Number(entrada.trim().replace(",", "."));

    try {
        atualizarValor(codigo, valor);
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}

// Solicita a quantidade que será adicionada ao estoque
function solicitarQuantidade(codigo) {
    const entrada = prompt(
        "Quantas unidades deseja adicionar ao estoque?"
    );

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    const quantidade = Number(entrada.trim());

    try {
        atualizarQuantidade(codigo, quantidade);
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}

// Exibe mensagens de sucesso ou erro
function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = tipo;

    if (tipo === "sucesso") {
        mensagem.classList.add("sucesso");
    } else {
        mensagem.classList.add("erro");
    }
}

// Captura o envio do formulário
document
    .getElementById("formProduto")
    .addEventListener("submit", (evento) => {
        evento.preventDefault();

        const descricao = document
            .getElementById("descricao").value;

        const quantidade = Number(
            document.getElementById("quantidade").value
        );

        const valor = Number(
            document.getElementById("valor").value
        );

        try {
            cadastrarProduto(descricao, quantidade, valor);

            document.getElementById("formProduto").reset();
            document.getElementById("descricao").focus();
        } catch (erro) {
            mostrarMensagem(erro.message, "erro");
        }
    });

// Renderiza a tabela inicial
listarProdutos();
