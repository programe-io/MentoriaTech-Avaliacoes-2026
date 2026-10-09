// Lista de produtos
let produtos = [];

// Gera códigos únicos durante a execução
let proximoCodigo = 1;

// Valida os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter pelo menos 5 caracteres."
        );
    }

    if (
        !Number.isInteger(quantidade) ||
        quantidade < 1
    ) {
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
    renderizarProdutos();
}

// Lista os produtos
function listarProdutos() {
    console.log(produtos);
    renderizarProdutos();
}

// Atualiza o preço de um produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "Digite um valor válido, maior ou igual a zero."
        );
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
    renderizarProdutos();
}

// Adiciona unidades ao estoque
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 1
    ) {
        throw new Error(
            "Digite uma quantidade inteira maior que zero."
        );
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;
    renderizarProdutos();
}

// Exibe mensagens na tela
function mostrarMensagem(texto, tipo = "sucesso") {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Executa uma operação e captura possíveis erros
function executar(operacao) {
    try {
        operacao();
    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}

// Formata o valor em reais
function formatarValor(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Cria a tabela de produtos
function renderizarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        const colunaCodigo = document.createElement("td");
        colunaCodigo.textContent = produto.codigo;

        const colunaDescricao = document.createElement("td");
        colunaDescricao.textContent = produto.descricao;

        const colunaQuantidade = document.createElement("td");
        colunaQuantidade.textContent = produto.quantidade;

        const colunaValor = document.createElement("td");
        colunaValor.textContent = formatarValor(produto.valor);

        const colunaAcoes = document.createElement("td");
        colunaAcoes.className = "acoes";

        // Botão para alterar preço
        const btnValor = document.createElement("button");
        btnValor.type = "button";
        btnValor.className = "btn-valor";
        btnValor.textContent = "Alterar valor";

        btnValor.addEventListener("click", function () {
            const resposta = prompt(
                `Novo valor para ${produto.descricao}:`,
                produto.valor.toFixed(2)
            );

            if (resposta === null || resposta.trim() === "") {
                return;
            }

            executar(() => {
                // Aceita tanto 150.50 quanto 150,50
                const textoValor = resposta.trim().replace(",", ".");
                const novoValor = Number(textoValor);

                if (textoValor === "" || !Number.isFinite(novoValor)) {
                    throw new Error("Digite um valor numérico válido.");
                }

                atualizarValor(produto.codigo, novoValor);
                mostrarMensagem("Valor atualizado com sucesso!");
            });
        });

        // Botão para adicionar estoque
        const btnQuantidade = document.createElement("button");
        btnQuantidade.type = "button";
        btnQuantidade.className = "btn-quantidade";
        btnQuantidade.textContent = "Adicionar estoque";

        btnQuantidade.addEventListener("click", function () {
            const resposta = prompt(
                `Quantas unidades deseja adicionar a ${produto.descricao}?`
            );

            if (resposta === null || resposta.trim() === "") {
                return;
            }

            executar(() => {
                const novaQuantidade = Number(resposta.trim());

                atualizarQuantidade(
                    produto.codigo,
                    novaQuantidade
                );

                mostrarMensagem("Estoque atualizado com sucesso!");
            });
        });

        colunaAcoes.append(btnValor, btnQuantidade);

        linha.append(
            colunaCodigo,
            colunaDescricao,
            colunaQuantidade,
            colunaValor,
            colunaAcoes
        );

        lista.appendChild(linha);
    });
}

// Evento do formulário de cadastro
document.getElementById("formProduto").addEventListener(
    "submit",
    function (evento) {
        evento.preventDefault();

        executar(() => {
            const descricao =
                document.getElementById("descricao").value;

            const quantidadeTexto =
                document.getElementById("quantidade").value;

            const valorTexto =
                document.getElementById("valor").value;

            if (
                quantidadeTexto.trim() === "" ||
                valorTexto.trim() === ""
            ) {
                throw new Error(
                    "Preencha todos os campos corretamente."
                );
            }

            const quantidade = Number(quantidadeTexto);
            const valor = Number(valorTexto);

            cadastrarProduto(descricao, quantidade, valor);

            this.reset();

            mostrarMensagem("Produto cadastrado com sucesso!");
        });
    }
);

// Produtos iniciais do exemplo
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);