
let produtos = [];

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

const formatarMoeda = valor =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter no mínimo cinco caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser um inteiro maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length
            ? Math.max(...produtos.map(p => p.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade,
        valor
    };

    produtos.push(novoProduto);
    renderizarProdutos();
}

function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    const produto = produtos.find(
        p => p.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
    renderizarProdutos();
}

function atualizarQuantidade(codigoProduto, quantidadeAdicional) {
    if (!Number.isInteger(quantidadeAdicional) ||
        quantidadeAdicional < 1) {
        throw new Error("Informe uma quantidade inteira maior que zero.");
    }

    const produto = produtos.find(
        p => p.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += quantidadeAdicional;
    renderizarProdutos();
}

function renderizarProdutos() {
    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        listaProdutos.innerHTML = `
            <tr>
                <td colspan="6" class="vazio">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;
    }

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        const celulas = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarMoeda(produto.valor),
            formatarMoeda(produto.quantidade * produto.valor)
        ];

        celulas.forEach(texto => {
            const td = document.createElement("td");
            td.textContent = texto;
            linha.appendChild(td);
        });

        const tdAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnEditar = document.createElement("button");
        btnEditar.className = "btn-editar";
        btnEditar.textContent = "Editar valor";

        btnEditar.addEventListener("click", () => {
            const entrada = prompt(
                `Novo valor para ${produto.descricao}:`,
                produto.valor.toFixed(2)
            );

            if (entrada === null || entrada.trim() === "") return;

            const novoValor = Number(entrada.replace(",", "."));

            try {
                atualizarValor(produto.codigo, novoValor);
            } catch (erro) {
                alert(erro.message);
            }
        });

        const btnQuantidade = document.createElement("button");
        btnQuantidade.className = "btn-quantidade";
        btnQuantidade.textContent = "+ Estoque";

        btnQuantidade.addEventListener("click", () => {
            const entrada = prompt(
                `Quantas unidades adicionar a ${produto.descricao}?`
            );

            if (entrada === null || entrada.trim() === "") return;

            const quantidade = Number(entrada);

            try {
                atualizarQuantidade(produto.codigo, quantidade);
            } catch (erro) {
                alert(erro.message);
            }
        });

        acoes.append(btnEditar, btnQuantidade);
        tdAcoes.appendChild(acoes);
        linha.appendChild(tdAcoes);

        listaProdutos.appendChild(linha);
    });

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        produtos.reduce((total, p) => total + p.quantidade, 0);

    const valorTotal = produtos.reduce(
        (total, p) => total + p.quantidade * p.valor,
        0
    );

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorTotal);
}

formProduto.addEventListener("submit", evento => {
    evento.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const valor = Number(
        document.getElementById("valor").value
    );

    try {
        cadastrarProduto(descricao, quantidade, valor);
        formProduto.reset();
        document.getElementById("descricao").focus();
    } catch (erro) {
        alert(erro.message);
    }
});

renderizarProdutos();
