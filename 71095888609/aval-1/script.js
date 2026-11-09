
let produtos = [];

const formulario = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    if (!descricao || quantidade < 0 || valor < 0 ||
        !Number.isInteger(quantidade) ||
        !Number.isFinite(valor)) {
        alert("Preencha os campos corretamente!");
        return;
    }

    produtos.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    formulario.reset();
    listarProdutos();
});

function listarProdutos() {
    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5">Nenhum produto cadastrado.</td>
            </tr>
        `;
        return;
    }

    produtos.forEach((produto, indice) => {
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

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "btn-editar";
        editar.onclick = () => alterarProduto(indice);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "btn-excluir";
        excluir.onclick = () => excluirProduto(indice);

        acoes.appendChild(editar);
        acoes.appendChild(excluir);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    });
}

function alterarProduto(indice) {
    const produto = produtos[indice];

    const novoValor = prompt(
        "Digite o novo valor:",
        produto.valor
    );

    if (novoValor === null) return;

    const valor = Number(novoValor);

    if (novoValor.trim() === "" || !Number.isFinite(valor) || valor < 0) {
        alert("Valor inválido!");
        return;
    }

    const novaQuantidade = prompt(
        "Digite a nova quantidade:",
        produto.quantidade
    );

    if (novaQuantidade === null) return;

    const quantidade = Number(novaQuantidade);

    if (
        novaQuantidade.trim() === "" ||
        !Number.isInteger(quantidade) ||
        quantidade < 0
    ) {
        alert("Quantidade inválida!");
        return;
    }

    produto.valor = valor;
    produto.quantidade = quantidade;

    listarProdutos();

    alert("Produto atualizado com sucesso!");
}

function excluirProduto(indice) {
    const confirmar = confirm("Deseja excluir este produto?");

    if (confirmar) {
        produtos.splice(indice, 1);
        listarProdutos();
    }
}
