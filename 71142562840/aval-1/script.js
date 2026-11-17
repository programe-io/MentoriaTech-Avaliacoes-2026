
let produtos = [];

try {
    produtos = JSON.parse(localStorage.getItem("produtos")) || [];
} catch (erro) {
    produtos = [];
}

const formulario = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

// CADASTRAR PRODUTO
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!codigo || descricao.length < 2) {
        alert("Preencha o código e a descrição corretamente!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Informe uma quantidade válida!");
        return;
    }

    if (!Number.isFinite(valor) || valor <= 0) {
        alert("Informe um valor válido!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    const produto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);

    salvar();
    listar();

    formulario.reset();

    alert("Produto cadastrado com sucesso!");
});

// SALVAR NO NAVEGADOR
function salvar() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// LISTAR PRODUTOS
function listar() {
    lista.innerHTML = "";

    produtos.forEach((produto, index) => {
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
            const coluna = document.createElement("td");
            coluna.textContent = dado;
            linha.appendChild(coluna);
        });

        const colunaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnValor = document.createElement("button");
        btnValor.textContent = "Valor";
        btnValor.className = "btn-editar";
        btnValor.onclick = () => alterarValor(index);

        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "Quantidade";
        btnQuantidade.className = "btn-editar";
        btnQuantidade.onclick = () => alterarQuantidade(index);

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";
        btnExcluir.onclick = () => excluirProduto(index);

        acoes.append(btnValor, btnQuantidade, btnExcluir);
        colunaAcoes.appendChild(acoes);
        linha.appendChild(colunaAcoes);

        lista.appendChild(linha);
    });

    if (produtos.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;
    }

    atualizarResumo();
}

// ALTERAR VALOR
function alterarValor(index) {
    const novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") return;

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor <= 0) {
        alert("Valor inválido!");
        return;
    }

    produtos[index].valor = valor;

    salvar();
    listar();

    alert("Valor alterado com sucesso!");
}

// ALTERAR QUANTIDADE
function alterarQuantidade(index) {
    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produtos[index].quantidade = quantidade;

    salvar();
    listar();

    alert("Quantidade alterada com sucesso!");
}

// EXCLUIR PRODUTO
function excluirProduto(index) {
    if (confirm("Deseja excluir este produto?")) {
        produtos.splice(index, 1);

        salvar();
        listar();

        alert("Produto excluído!");
    }
}

// ATUALIZAR RESUMO
function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (total, p) => total + p.quantidade, 0
    );

    const valorTotal = produtos.reduce(
        (total, p) => total + (p.quantidade * p.valor), 0
    );

    document.getElementById("totalProdutos").textContent = totalProdutos;

    document.getElementById("totalItens").textContent = totalItens;

    document.getElementById("valorEstoque").textContent =
        valorTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

// INICIAR SISTEMA
listar();
