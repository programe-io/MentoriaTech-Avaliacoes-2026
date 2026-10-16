
let produtos = [];
let proximoCodigo = 1;

// Elementos do HTML
const formProduto = document.getElementById("formProduto");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const buscaCodigo = document.getElementById("buscaCodigo");

let codigoFiltrado = null;

// Exibe mensagens na tela
function exibirMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Valida os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" ||
        descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, cinco caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O valor deve ser um número maior ou igual a zero."
        );
    }
}

// Cadastra um novo produto
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

// Formata valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Lista os produtos na tabela
function listarProdutos() {
    listaProdutos.replaceChildren();

    const produtosExibidos = codigoFiltrado === null
        ? produtos
        : produtos.filter(
            produto => produto.codigo === codigoFiltrado
        );

    if (produtosExibidos.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 6;
        celula.className = "vazio";
        celula.textContent = produtos.length === 0
            ? "Nenhum produto cadastrado."
            : "Nenhum produto encontrado.";

        linha.appendChild(celula);
        listaProdutos.appendChild(linha);
        return;
    }

    produtosExibidos.forEach(produto => {
        const linha = document.createElement("tr");

        // Cria as células da tabela
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

        // Botões de ações
        const celulaAcoes = document.createElement("td");
        const divAcoes = document.createElement("div");
        divAcoes.className = "acoes";

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.className = "btn btn-editar";
        botaoEditar.textContent = "Alterar valor";
        botaoEditar.addEventListener("click", () => {
            solicitarNovoValor(produto.codigo);
        });

        const botaoEstoque = document.createElement("button");
        botaoEstoque.type = "button";
        botaoEstoque.className = "btn btn-estoque";
        botaoEstoque.textContent = "Adicionar estoque";
        botaoEstoque.addEventListener("click", () => {
            solicitarQuantidade(produto.codigo);
        });

        divAcoes.append(botaoEditar, botaoEstoque);
        celulaAcoes.appendChild(divAcoes);
        linha.appendChild(celulaAcoes);

        listaProdutos.appendChild(linha);
    });
}

// Busca produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(
        produto => produto.codigo === codigoProduto
    );
}

// Atualiza o preço de um produto
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
    listarProdutos();

    return produto;
}

// Adiciona unidades ao estoque existente
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) ||
        novaQuantidade < 1) {
        throw new Error(
            "A quantidade deve ser um inteiro maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;
    listarProdutos();

    return produto;
}

// Valida uma nova descrição
function validarDescricao(descricao) {
    if (typeof descricao !== "string" ||
        descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter, no mínimo, cinco caracteres."
        );
    }
}

// Recebe os dados do formulário
formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const descricao = campoDescricao.value;
        const quantidade = Number(campoQuantidade.value);
        const valor = Number(campoValor.value);

        if (
            campoQuantidade.value.trim() === "" ||
            campoValor.value.trim() === ""
        ) {
            throw new Error("Preencha todos os campos.");
        }

        const produto = cadastrarProduto(
            descricao,
            quantidade,
            valor
        );

        exibirMensagem(
            `Produto "${produto.descricao}" cadastrado com sucesso!`
        );

        formProduto.reset();
        campoDescricao.focus();

    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Busca ao clicar no botão
document.getElementById("btnBuscar").addEventListener(
    "click",
    function() {
        const codigo = Number(buscaCodigo.value);

        if (
            buscaCodigo.value.trim() === "" ||
            !Number.isInteger(codigo) ||
            codigo < 1
        ) {
            exibirMensagem(
                "Digite um código válido.",
                "erro"
            );
            return;
        }

        const produto = buscarProdutoPorCodigo(codigo);

        if (!produto) {
            codigoFiltrado = codigo;
            listarProdutos();
            exibirMensagem("Produto não encontrado.", "erro");
            return;
        }

        codigoFiltrado = codigo;
        listarProdutos();

        exibirMensagem(
            `Produto encontrado: ${produto.descricao}`
        );
    }
);

// Mostra novamente todos os produtos
document.getElementById("btnMostrarTodos").addEventListener(
    "click",
    function() {
        codigoFiltrado = null;
        buscaCodigo.value = "";
        listarProdutos();
        exibirMensagem("Todos os produtos estão sendo exibidos.");
    }
);

// Solicita um novo preço
function solicitarNovoValor(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const entrada = prompt(
        `Novo valor para ${produto.descricao} (R$):`,
        produto.valor.toFixed(2)
    );

    if (entrada === null) return;

    // Aceita ponto ou vírgula como separador decimal
    const texto = entrada.trim();

    if (!/^\d+([.,]\d{1,2})?$/.test(texto)) {
        exibirMensagem(
            "Digite um valor válido, com até duas casas decimais.",
            "erro"
        );
        return;
    }

    const novoValor = Number(texto.replace(",", "."));

    try {
        atualizarValor(codigoProduto, novoValor);
        exibirMensagem("Valor atualizado com sucesso!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Solicita unidades para adicionar ao estoque
function solicitarQuantidade(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        exibirMensagem("Produto não encontrado.", "erro");
        return;
    }

    const entrada = prompt(
        `Quantas unidades deseja adicionar a ${produto.descricao}?`
    );

    if (entrada === null) return;

    if (!/^\d+$/.test(entrada.trim())) {
        exibirMensagem(
            "Digite uma quantidade inteira válida.",
            "erro"
        );
        return;
    }

    const quantidade = Number(entrada);

    try {
        atualizarQuantidade(codigoProduto, quantidade);
        exibirMensagem("Estoque atualizado com sucesso!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Limpa mensagens ao reiniciar o formulário
formProduto.addEventListener("reset", function() {
    exibirMensagem("");
});

// Exibe a tabela inicial
listarProdutos();
