
let produtos = [];
let proximoCodigo = 1;

const formProduto = document.getElementById("formProduto");
const formAtualizar = document.getElementById("formAtualizar");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Exibir mensagens na página
function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (
        typeof descricao !== "string" ||
        descricao.trim().length < 5
    ) {
        throw new Error(
            "A descrição deve ter no mínimo cinco caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
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

    return novoProduto;
}

// Listar produtos na tabela
function listarProdutos() {
    listaProdutos.replaceChildren();

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 4;
        celula.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(celula);
        listaProdutos.appendChild(linha);
        return;
    }

    produtos.forEach(function (produto) {
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

        valores.forEach(function (valor) {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        listaProdutos.appendChild(linha);
    });
}

// Atualizar valor
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
}

// Atualizar quantidade
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

    produto.quantidade = novaQuantidade;
}

// Evento do formulário de cadastro
formProduto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    try {
        const descricao =
            document.getElementById("descricao").value;

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        formProduto.reset();

        exibirMensagem(
            "Produto cadastrado com sucesso!",
            "sucesso"
        );
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Evento do formulário de atualização
formAtualizar.addEventListener("submit", function (evento) {
    evento.preventDefault();

    try {
        const codigo = Number(
            document.getElementById("codigoAtualizar").value
        );

        const campoValor = document.getElementById("novoValor");
        const campoQuantidade =
            document.getElementById("novaQuantidade");

        const valorInformado = campoValor.value.trim() !== "";
        const quantidadeInformada =
            campoQuantidade.value.trim() !== "";

        if (!valorInformado && !quantidadeInformada) {
            throw new Error(
                "Informe um novo valor ou uma nova quantidade."
            );
        }

        // Verificar se o produto existe antes de atualizar
        const produto = produtos.find(
            prod => prod.codigo === codigo
        );

        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        // Validar todas as alterações antes de aplicar
        let novoValor;
        let novaQuantidade;

        if (valorInformado) {
            novoValor = Number(campoValor.value);

            if (!Number.isFinite(novoValor) || novoValor < 0) {
                throw new Error(
                    "O valor deve ser maior ou igual a zero."
                );
            }
        }

        if (quantidadeInformada) {
            novaQuantidade = Number(campoQuantidade.value);

            if (
                !Number.isInteger(novaQuantidade) ||
                novaQuantidade < 1
            ) {
                throw new Error(
                    "A quantidade deve ser um inteiro maior que zero."
                );
            }
        }

        if (valorInformado) {
            atualizarValor(codigo, novoValor);
        }

        if (quantidadeInformada) {
            atualizarQuantidade(codigo, novaQuantidade);
        }

        listarProdutos();
        formAtualizar.reset();

        exibirMensagem(
            "Produto atualizado com sucesso!",
            "sucesso"
        );
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Exibir a lista inicial
listarProdutos();
