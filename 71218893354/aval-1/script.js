
let produtos = [];
let proximoCodigo = 1;

// Validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "Descrição deve ter no mínimo cinco caracteres."
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
    mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");
}

// Listar produtos
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.replaceChildren();

    produtos.forEach(produto => {
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

        valores.forEach(valor => {
            const coluna = document.createElement("td");
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });

        const colunaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnValor = document.createElement("button");
        btnValor.textContent = "Preço";
        btnValor.className = "btn-editar";
        btnValor.type = "button";
        btnValor.addEventListener("click", () => {
            const novoValor = prompt("Digite o novo preço:");

            if (novoValor === null || novoValor.trim() === "") {
                return;
            }

            atualizarValor(produto.codigo, Number(novoValor));
        });

        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "Estoque";
        btnQuantidade.className = "btn-quantidade";
        btnQuantidade.type = "button";
        btnQuantidade.addEventListener("click", () => {
            const novaQuantidade = prompt("Digite a nova quantidade:");

            if (
                novaQuantidade === null ||
                novaQuantidade.trim() === ""
            ) {
                return;
            }

            atualizarQuantidade(
                produto.codigo,
                Number(novaQuantidade)
            );
        });

        acoes.append(btnValor, btnQuantidade);
        colunaAcoes.appendChild(acoes);
        linha.appendChild(colunaAcoes);
        lista.appendChild(linha);
    });
}

// Atualizar valor do produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        mostrarMensagem(
            "Valor deve ser maior ou igual a zero.",
            "erro"
        );
        return;
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    produto.valor = novoValor;

    listarProdutos();
    mostrarMensagem("Preço atualizado com sucesso!", "sucesso");
}

// Atualizar quantidade do produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        mostrarMensagem(
            "Quantidade deve ser um número inteiro maior que zero.",
            "erro"
        );
        return;
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "erro");
        return;
    }

    produto.quantidade = novaQuantidade;

    listarProdutos();
    mostrarMensagem(
        "Quantidade atualizada com sucesso!",
        "sucesso"
    );
}

// Mostrar mensagens na tela
function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Receber os dados do formulário
document
    .getElementById("formProduto")
    .addEventListener("submit", function(event) {
        event.preventDefault();

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
            this.reset();
        } catch (erro) {
            mostrarMensagem(erro.message, "erro");
        }
    });

// Exibir a tabela inicialmente
listarProdutos();
