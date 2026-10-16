
let produtos = [];
let proximoCodigo = 1;

const form = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Exibir mensagens
function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" ||
        descricao.trim().length < 5) {
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
            "O valor deve ser um número maior ou igual a zero."
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

    exibirMensagem("Produto cadastrado com sucesso!", "sucesso");
}

// Listar produtos
function listarProdutos() {
    listaProdutos.replaceChildren();

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        dados.forEach(dado => {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "btn-editar";
        botaoValor.addEventListener("click", () => {
            atualizarValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.className = "btn-quantidade";
        botaoQuantidade.addEventListener("click", () => {
            atualizarQuantidade(produto.codigo);
        });

        acoes.append(botaoValor, botaoQuantidade);
        celulaAcoes.appendChild(acoes);
        linha.appendChild(celulaAcoes);

        listaProdutos.appendChild(linha);
    });
}

// Buscar produto pelo código
function buscarProduto(codigoProduto) {
    const produto = produtos.find(
        item => item.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    return produto;
}

// Atualizar valor do produto
function atualizarValor(codigoProduto) {
    try {
        const produto = buscarProduto(codigoProduto);
        const entrada = prompt(
            `Novo valor para ${produto.descricao}:`,
            produto.valor
        );

        if (entrada === null) return;

        if (entrada.trim() === "") {
            throw new Error("Informe um valor válido.");
        }

        const novoValor = Number(entrada);

        if (!Number.isFinite(novoValor) || novoValor < 0) {
            throw new Error(
                "O valor deve ser um número maior ou igual a zero."
            );
        }

        produto.valor = novoValor;
        listarProdutos();

        exibirMensagem("Valor atualizado com sucesso!", "sucesso");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Atualizar quantidade do produto
function atualizarQuantidade(codigoProduto) {
    try {
        const produto = buscarProduto(codigoProduto);
        const entrada = prompt(
            `Nova quantidade para ${produto.descricao}:`,
            produto.quantidade
        );

        if (entrada === null) return;

        if (entrada.trim() === "") {
            throw new Error("Informe uma quantidade válida.");
        }

        const novaQuantidade = Number(entrada);

        if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
            throw new Error(
                "A quantidade deve ser um número inteiro maior que zero."
            );
        }

        produto.quantidade = novaQuantidade;
        listarProdutos();

        exibirMensagem(
            "Quantidade atualizada com sucesso!",
            "sucesso"
        );
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Evento de cadastro
form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    try {
        const descricao = campoDescricao.value;
        const quantidade = Number(campoQuantidade.value);
        const valor = Number(campoValor.value);

        cadastrarProduto(descricao, quantidade, valor);
        form.reset();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});
