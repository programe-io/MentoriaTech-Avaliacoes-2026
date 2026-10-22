
let produtos = [];
let proximoCodigo = 1;

const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

// Exibe mensagens na tela.
function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.classList.toggle("error", erro);
}

// Valida os dados do produto.
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
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
            "O valor deve ser maior ou igual a zero."
        );
    }
}

// Cadastra um novo produto.
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
    atualizarResumo();

    return novoProduto;
}

// Formata valores em reais.
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Lista os produtos cadastrados.
function listarProdutos() {
    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        listaProdutos.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.className = "code";
        codigo.textContent = "#" + produto.codigo;

        const descricao = document.createElement("td");
        descricao.className = "product-name";
        descricao.textContent = produto.descricao;

        const quantidade = document.createElement("td");
        const etiqueta = document.createElement("span");
        etiqueta.className = "quantity";
        etiqueta.textContent = produto.quantidade;
        quantidade.appendChild(etiqueta);

        const valor = document.createElement("td");
        valor.textContent = formatarMoeda(produto.valor);

        const total = document.createElement("td");
        total.textContent = formatarMoeda(
            produto.quantidade * produto.valor
        );

        const acoes = document.createElement("td");
        const botoes = document.createElement("div");
        botoes.className = "actions";

        const botaoValor = document.createElement("button");
        botaoValor.className = "btn-edit";
        botaoValor.textContent = "Preço";
        botaoValor.title = "Atualizar preço";
        botaoValor.addEventListener("click", function() {
            solicitarNovoValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.className = "btn-add";
        botaoQuantidade.textContent = "+ Estoque";
        botaoQuantidade.title = "Adicionar unidades";
        botaoQuantidade.addEventListener("click", function() {
            solicitarQuantidade(produto.codigo);
        });

        botoes.append(botaoValor, botaoQuantidade);
        acoes.appendChild(botoes);

        linha.append(
            codigo,
            descricao,
            quantidade,
            valor,
            total,
            acoes
        );

        listaProdutos.appendChild(linha);
    });
}

// Atualiza o valor total e as quantidades do painel.
function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(function(total, produto) {
        return total + produto.quantidade;
    }, 0);

    const valorEstoque = produtos.reduce(function(total, produto) {
        return total + produto.quantidade * produto.valor;
    }, 0);

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);
}

// Busca um produto pelo código.
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(function(produto) {
        return produto.codigo === codigoProduto;
    });
}

// Atualiza o preço do produto.
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("O preço não pode ser negativo.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;

    listarProdutos();
    atualizarResumo();
}

// Adiciona unidades à quantidade existente.
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error(
            "Informe uma quantidade inteira maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade = produto.quantidade + novaQuantidade;

    listarProdutos();
    atualizarResumo();
}

// Solicita um novo preço ao usuário.
function solicitarNovoValor(codigo) {
    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", true);
        return;
    }

    const entrada = prompt(
        `Novo preço para ${produto.descricao}:`,
        produto.valor.toFixed(2)
    );

    if (entrada === null) return;

    const novoValor = entrada.trim() === ""
        ? NaN
        : Number(entrada.replace(",", "."));

    try {
        atualizarValor(codigo, novoValor);
        mostrarMensagem("Preço atualizado com sucesso!");
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

// Solicita quantas unidades serão adicionadas.
function solicitarQuantidade(codigo) {
    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", true);
        return;
    }

    const entrada = prompt(
        `Quantas unidades deseja adicionar a ${produto.descricao}?`
    );

    if (entrada === null) return;

    const quantidade = entrada.trim() === ""
        ? NaN
        : Number(entrada);

    try {
        atualizarQuantidade(codigo, quantidade);
        mostrarMensagem("Estoque atualizado com sucesso!");
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

// Recebe os dados do formulário.
formulario.addEventListener("submit", function(evento) {
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

        formulario.reset();

        mostrarMensagem("Produto cadastrado com sucesso!");
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});

// Inicializa a tela.
listarProdutos();
atualizarResumo();
