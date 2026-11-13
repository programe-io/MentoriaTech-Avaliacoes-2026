
// Recupera os produtos salvos no navegador
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Elementos da página
const formulario = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

// Salvar produtos no navegador
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar se o código já existe
    if (produtos.some(p => p.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    salvarProdutos();
    listarProdutos();

    formulario.reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
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

    produtos.forEach(function(produto, indice) {
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

        valores.forEach(function(valor) {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const botaoValor = document.createElement("button");
        botaoValor.className = "editar";
        botaoValor.textContent = "Alterar valor";
        botaoValor.addEventListener("click", () => alterarValor(indice));

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.className = "editar";
        botaoQuantidade.textContent = "Alterar qtd.";
        botaoQuantidade.addEventListener("click", () => alterarQuantidade(indice));

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "excluir";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", () => excluirProduto(indice));

        acoes.append(botaoValor, botaoQuantidade, botaoExcluir);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    });
}

// Alterar valor do produto
function alterarValor(indice) {
    const novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") return;

    const valor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[indice].valor = valor;

    salvarProdutos();
    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade do produto
function alterarQuantidade(indice) {
    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produtos[indice].quantidade = quantidade;

    salvarProdutos();
    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}

// Excluir produto
function excluirProduto(indice) {
    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (confirmar) {
        produtos.splice(indice, 1);

        salvarProdutos();
        listarProdutos();

        alert("Produto excluído!");
    }
}

// Mostrar produtos ao abrir o sistema
listarProdutos();
