
let produtos = [];
let proximoCodigo = 1;

// Formatar valores em reais
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter pelo menos 5 caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O preço deve ser maior ou igual a zero."
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
}

// Listar produtos na tabela
function listarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.replaceChildren();

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(celula);
        lista.appendChild(linha);
    }

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarPreco(produto.valor)
        ];

        dados.forEach(function(dado) {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnPreco = document.createElement("button");
        btnPreco.textContent = "Alterar preço";
        btnPreco.className = "btn-preco";
        btnPreco.addEventListener("click", function() {
            atualizarValor(produto.codigo);
        });

        const btnQuantidade = document.createElement("button");
        btnQuantidade.textContent = "Adicionar estoque";
        btnQuantidade.className = "btn-quantidade";
        btnQuantidade.addEventListener("click", function() {
            atualizarQuantidade(produto.codigo);
        });

        acoes.append(btnPreco, btnQuantidade);
        celulaAcoes.appendChild(acoes);
        linha.appendChild(celulaAcoes);

        lista.appendChild(linha);
    });

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    const totalUnidades = produtos.reduce(function(total, produto) {
        return total + produto.quantidade;
    }, 0);

    document.getElementById("totalUnidades").textContent =
        totalUnidades;
}

// Atualizar preço do produto
function atualizarValor(codigoProduto) {
    const produto = produtos.find(function(prod) {
        return prod.codigo === codigoProduto;
    });

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const entrada = prompt(
        "Digite o novo preço:",
        produto.valor
    );

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    const novoValor = Number(entrada);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Informe um preço válido, maior ou igual a zero.");
        return;
    }

    produto.valor = novoValor;

    listarProdutos();
    alert("Preço atualizado com sucesso!");
}

// Adicionar unidades ao estoque
function atualizarQuantidade(codigoProduto) {
    const produto = produtos.find(function(prod) {
        return prod.codigo === codigoProduto;
    });

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const entrada = prompt("Quantas unidades deseja adicionar?");

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    const quantidade = Number(entrada);

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        alert("Informe uma quantidade inteira maior que zero.");
        return;
    }

    produto.quantidade += quantidade;

    listarProdutos();
    alert("Estoque atualizado com sucesso!");
}

// Evento do formulário de cadastro
document.getElementById("formProduto").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const descricao =
            document.getElementById("descricao").value;

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        try {
            cadastrarProduto(descricao, quantidade, valor);

            document.getElementById("formProduto").reset();

            alert("Produto cadastrado com sucesso!");
        } catch (erro) {
            alert(erro.message);
        }
    }
);

// Mostrar o estoque inicial
listarProdutos();
