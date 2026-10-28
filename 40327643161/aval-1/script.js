
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter no mínimo 5 caracteres."
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

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length
            ? Math.max(...produtos.map(p => p.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    listarProdutos();
}

function listarProdutos() {
    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td></td>
            <td>${produto.quantidade}</td>
            <td>${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>
            <td>
                <div class="acoes">
                    <button type="button"
                        onclick="editarValor(${produto.codigo})">
                        Alterar valor
                    </button>
                    <button type="button"
                        onclick="editarQuantidade(${produto.codigo})">
                        Adicionar quantidade
                    </button>
                </div>
            </td>
        `;

        linha.children[1].textContent = produto.descricao;
        tabela.appendChild(linha);
    });
}

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
    listarProdutos();
}

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
    listarProdutos();
}

function editarValor(codigo) {
    const resposta = prompt("Digite o novo valor do produto:");

    if (resposta === null || resposta.trim() === "") {
        return;
    }

    try {
        const valor = Number(resposta);

        if (!Number.isFinite(valor)) {
            throw new Error("Digite um valor numérico válido.");
        }

        atualizarValor(codigo, valor);
        mostrarMensagem("Valor atualizado com sucesso!", true);
    } catch (erro) {
        mostrarMensagem(erro.message, false);
    }
}

function editarQuantidade(codigo) {
    const resposta = prompt("Quantas unidades deseja adicionar?");

    if (resposta === null || resposta.trim() === "") {
        return;
    }

    try {
        if (!/^\d+$/.test(resposta.trim())) {
            throw new Error("Digite uma quantidade inteira válida.");
        }

        atualizarQuantidade(codigo, Number(resposta));
        mostrarMensagem("Quantidade atualizada com sucesso!", true);
    } catch (erro) {
        mostrarMensagem(erro.message, false);
    }
}

function mostrarMensagem(texto, sucesso) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = sucesso ? "green" : "red";
}

document.getElementById("formProduto").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const descricao = document.getElementById("descricao").value;
        const quantidade = Number(
            document.getElementById("quantidade").value
        );
        const valor = Number(
            document.getElementById("valor").value
        );

        try {
            cadastrarProduto(descricao, quantidade, valor);

            mostrarMensagem("Produto cadastrado com sucesso!", true);
            this.reset();
        } catch (erro) {
            mostrarMensagem(erro.message, false);
        }
    }
);
