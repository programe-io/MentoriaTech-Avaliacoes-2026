
let produtos = [
    {
        codigo: 1,
        descricao: "Cadeira Gamer",
        quantidade: 12,
        valor: 699.00
    },
    {
        codigo: 2,
        descricao: "Mouse Logi",
        quantidade: 38,
        valor: 99.00
    }
];

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Formata os valores como moeda brasileira.
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Valida os dados do produto.
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
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
            "O valor deve ser maior ou igual a zero."
        );
    }
}

// Exibe mensagens de sucesso ou erro.
function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;
}

// Cadastra um novo produto.
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length > 0
            ? Math.max(...produtos.map(p => p.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    listarProduto();

    exibirMensagem("Produto cadastrado com sucesso!", "sucesso");
}

// Lista os produtos na tabela HTML.
function listarProduto() {
    listaProdutos.replaceChildren();

    if (produtos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 6;
        celula.textContent = "Nenhum produto cadastrado.";

        linha.appendChild(celula);
        listaProdutos.appendChild(linha);
        return;
    }

    produtos.forEach(produto => {
        const linha = document.createElement("tr");

        const valores = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarMoeda(produto.valor),
            formatarMoeda(produto.quantidade * produto.valor)
        ];

        valores.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const botaoPreco = document.createElement("button");
        botaoPreco.textContent = "Alterar preço";
        botaoPreco.className = "btn-preco";
        botaoPreco.addEventListener("click", () => {
            solicitarNovoValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Estoque";
        botaoQuantidade.className = "btn-quantidade";
        botaoQuantidade.addEventListener("click", () => {
            solicitarQuantidade(produto.codigo);
        });

        acoes.append(botaoPreco, botaoQuantidade);
        linha.appendChild(acoes);

        listaProdutos.appendChild(linha);
    });
}

// Atualiza o valor de um produto.
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
    listarProduto();

    exibirMensagem("Preço atualizado com sucesso!", "sucesso");
}

// Atualiza a quantidade do estoque.
// Quantidade positiva adiciona unidades; negativa retira.
function atualizarQuantidade(codigoProduto, alteracao) {
    if (!Number.isInteger(alteracao) || alteracao === 0) {
        throw new Error(
            "Informe uma quantidade inteira diferente de zero."
        );
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    if (produto.quantidade + alteracao < 0) {
        throw new Error(
            "O estoque não pode ficar negativo."
        );
    }

    produto.quantidade += alteracao;
    listarProduto();

    exibirMensagem("Estoque atualizado com sucesso!", "sucesso");
}

// Solicita um novo preço.
function solicitarNovoValor(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const entrada = prompt(
        `Novo preço para ${produto.descricao}:`,
        produto.valor.toFixed(2)
    );

    if (entrada === null) return;

    try {
        const valor = entrada.trim();

        if (valor === "") {
            throw new Error("Informe um preço válido.");
        }

        const novoValor = Number(valor.replace(",", "."));
        atualizarValor(codigo, novoValor);
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Solicita a alteração do estoque.
function solicitarQuantidade(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const entrada = prompt(
        `Estoque atual: ${produto.quantidade}\n` +
        `Digite um número positivo para adicionar ou negativo para retirar:`
    );

    if (entrada === null) return;

    try {
        const texto = entrada.trim();

        if (texto === "") {
            throw new Error("Informe uma quantidade válida.");
        }

        const alteracao = Number(texto);

        atualizarQuantidade(codigo, alteracao);
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Trata o envio do formulário.
formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const descricao =
            document.getElementById("descricao").value;

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        formProduto.reset();
        document.getElementById("descricao").focus();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Mostra os produtos iniciais ao abrir a página.
listarProduto();
