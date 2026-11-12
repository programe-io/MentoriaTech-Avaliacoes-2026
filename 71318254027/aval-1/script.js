
let produtos = [];

const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar se o código já existe
    if (produtos.some(produto => produto.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    formulario.reset();

    listarProdutos();
    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>
                <div class="acoes">
                    <button class="btn-alterar" onclick="alterarValor(${produto.codigo})">
                        Valor
                    </button>

                    <button class="btn-alterar" onclick="alterarQuantidade(${produto.codigo})">
                        Quantidade
                    </button>

                    <button class="btn-excluir" onclick="excluirProduto(${produto.codigo})">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });
}

// Alterar valor do produto
function alterarValor(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        const novoValor = prompt("Digite o novo valor:");

        if (novoValor === null || novoValor.trim() === "") return;

        const valor = Number(novoValor.replace(",", "."));

        if (!Number.isFinite(valor) || valor < 0) {
            alert("Digite um valor válido!");
            return;
        }

        produto.valor = valor;

        listarProdutos();
        alert("Valor alterado com sucesso!");
    }
}

// Alterar quantidade do produto
function alterarQuantidade(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        const novaQuantidade = prompt("Digite a nova quantidade:");

        if (novaQuantidade === null || novaQuantidade.trim() === "") return;

        const quantidade = Number(novaQuantidade);

        if (!Number.isInteger(quantidade) || quantidade < 0) {
            alert("Digite uma quantidade válida!");
            return;
        }

        produto.quantidade = quantidade;

        listarProdutos();
        alert("Quantidade alterada com sucesso!");
    }
}

// Excluir produto
function excluirProduto(codigo) {
    const confirmar = confirm("Deseja excluir este produto?");

    if (confirmar) {
        produtos = produtos.filter(p => p.codigo !== codigo);

        listarProdutos();
        alert("Produto excluído com sucesso!");
    }
}
