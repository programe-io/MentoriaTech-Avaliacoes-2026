
let produtos = [];

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Cadastrar produto
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (
        !Number.isSafeInteger(codigo) || codigo <= 0 ||
        !descricao ||
        !Number.isSafeInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0
    ) {
        mensagem.textContent = "Preencha os campos corretamente!";
        return;
    }

    // Verificar se o código já existe
    if (produtos.some(p => p.codigo === codigo)) {
        mensagem.textContent = "Esse código já está cadastrado!";
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    form.reset();
    mensagem.textContent = "Produto cadastrado com sucesso!";

    listarProdutos();
});

// Listar produtos
function listarProdutos() {
    lista.innerHTML = "";

    produtos.forEach(function(produto) {
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
            const coluna = document.createElement("td");
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });

        const acoes = document.createElement("td");

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar Valor";
        botaoValor.className = "editar";
        botaoValor.addEventListener("click", function() {
            alterarValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar Quantidade";
        botaoQuantidade.className = "editar";
        botaoQuantidade.addEventListener("click", function() {
            alterarQuantidade(produto.codigo);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.addEventListener("click", function() {
            excluirProduto(produto.codigo);
        });

        acoes.append(botaoValor, botaoQuantidade, botaoExcluir);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    });
}

// Alterar valor
function alterarValor(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    const novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") return;

    const valor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = valor;

    mensagem.textContent = "Valor alterado com sucesso!";
    listarProdutos();
}

// Alterar quantidade
function alterarQuantidade(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const quantidade = Number(novaQuantidade);

    if (!Number.isSafeInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = quantidade;

    mensagem.textContent = "Quantidade alterada com sucesso!";
    listarProdutos();
}

// Excluir produto
function excluirProduto(codigo) {
    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (confirmar) {
        produtos = produtos.filter(p => p.codigo !== codigo);

        mensagem.textContent = "Produto excluído com sucesso!";
        listarProdutos();
    }
}
