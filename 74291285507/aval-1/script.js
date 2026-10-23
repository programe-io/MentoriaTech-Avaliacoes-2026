
"use strict";

// Estado da aplicação
const produtos = [];
let proximoCodigo = 1;

// Elementos da página
const formProduto = document.querySelector("#formProduto");
const listaProdutos = document.querySelector("#listaProdutos");
const listaVazia = document.querySelector("#listaVazia");
const mensagem = document.querySelector("#mensagem");
const busca = document.querySelector("#busca");

const totalProdutos = document.querySelector("#totalProdutos");
const totalUnidades = document.querySelector("#totalUnidades");
const valorEstoque = document.querySelector("#valorEstoque");

// Formatação monetária brasileira
const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

// Validação dos dados
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" ||
        descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter pelo menos cinco caracteres."
        );
    }

    if (!Number.isSafeInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O valor deve ser um número maior ou igual a zero."
        );
    }

    if (!Number.isFinite(quantidade * valor)) {
        throw new Error("O valor total do produto é inválido.");
    }
}

// Exibe mensagens para o usuário
function exibirMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Cadastra um produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade,
        valor
    };

    produtos.push(novoProduto);

    renderizarProdutos();
    atualizarIndicadores();

    return novoProduto;
}

// Localiza um produto pelo código
function buscarProduto(codigo) {
    const produto = produtos.find(
        (item) => item.codigo === codigo
    );

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    return produto;
}

// Atualiza o valor unitário
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "O valor deve ser um número maior ou igual a zero."
        );
    }

    const produto = buscarProduto(codigoProduto);

    if (!Number.isFinite(produto.quantidade * novoValor)) {
        throw new Error("O valor total do estoque é inválido.");
    }

    produto.valor = novoValor;

    renderizarProdutos();
    atualizarIndicadores();

    return produto;
}

// Adiciona unidades ao estoque existente
function atualizarQuantidade(codigoProduto, quantidadeAdicional) {
    if (!Number.isSafeInteger(quantidadeAdicional) ||
        quantidadeAdicional < 1) {
        throw new Error(
            "A quantidade adicional deve ser um inteiro maior que zero."
        );
    }

    const produto = buscarProduto(codigoProduto);
    const novaQuantidade = produto.quantidade + quantidadeAdicional;

    if (!Number.isSafeInteger(novaQuantidade) ||
        !Number.isFinite(novaQuantidade * produto.valor)) {
        throw new Error("A quantidade final é inválida.");
    }

    produto.quantidade = novaQuantidade;

    renderizarProdutos();
    atualizarIndicadores();

    return produto;
}

// Exclui um produto
function excluirProduto(codigoProduto) {
    const indice = produtos.findIndex(
        (item) => item.codigo === codigoProduto
    );

    if (indice === -1) {
        throw new Error("Produto não encontrado.");
    }

    produtos.splice(indice, 1);

    renderizarProdutos();
    atualizarIndicadores();
}

// Cria uma célula de texto com segurança
function criarCelula(texto) {
    const celula = document.createElement("td");
    celula.textContent = texto;
    return celula;
}

// Cria um botão de ação
function criarBotao(texto, classe, acao) {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.textContent = texto;
    botao.className = `botao ${classe}`;
    botao.addEventListener("click", acao);

    return botao;
}

// Renderiza a tabela de produtos
function renderizarProdutos() {
    const termo = busca.value.trim().toLocaleLowerCase("pt-BR");

    const produtosFiltrados = produtos.filter((produto) =>
        produto.descricao.toLocaleLowerCase("pt-BR").includes(termo)
    );

    listaProdutos.replaceChildren();

    listaVazia.hidden = produtosFiltrados.length > 0;
    listaVazia.textContent = produtos.length === 0
        ? "Nenhum produto cadastrado."
        : "Nenhum produto encontrado para essa busca.";

    produtosFiltrados.forEach((produto) => {
        const linha = document.createElement("tr");

        linha.append(
            criarCelula(String(produto.codigo)),
            criarCelula(produto.descricao),
            criarCelula(String(produto.quantidade)),
            criarCelula(formatarMoeda(produto.valor)),
            criarCelula(formatarMoeda(
                produto.quantidade * produto.valor
            ))
        );

        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        acoes.append(
            criarBotao("Editar valor", "botao-editar", () => {
                editarValorProduto(produto.codigo);
            }),

            criarBotao("Adicionar estoque", "botao-estoque", () => {
                adicionarEstoque(produto.codigo);
            }),

            criarBotao("Excluir", "botao-excluir", () => {
                removerProduto(produto.codigo);
            })
        );

        celulaAcoes.append(acoes);
        linha.append(celulaAcoes);
        listaProdutos.append(linha);
    });
}

// Atualiza os cartões de resumo
function atualizarIndicadores() {
    const unidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.valor,
        0
    );

    totalProdutos.textContent = produtos.length;
    totalUnidades.textContent = unidades;
    valorEstoque.textContent = formatarMoeda(valorTotal);
}

// Edita o preço de um produto
function editarValorProduto(codigo) {
    const produto = buscarProduto(codigo);

    const resposta = prompt(
        `Novo valor unitário de "${produto.descricao}" (R$):`,
        produto.valor.toFixed(2)
    );

    if (resposta === null) return;

    // Aceita valores como 99,90 ou 99.90
    const texto = resposta.trim();

    if (!/^\d+(?:[.,]\d{1,2})?$/.test(texto)) {
        exibirMensagem(
            "Informe um valor válido, com até duas casas decimais.",
            "erro"
        );
        return;
    }

    try {
        atualizarValor(codigo, Number(texto.replace(",", ".")));
        exibirMensagem("Valor atualizado com sucesso!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Adiciona quantidade ao estoque
function adicionarEstoque(codigo) {
    const produto = buscarProduto(codigo);

    const resposta = prompt(
        `Quantas unidades deseja adicionar a "${produto.descricao}"?`,
        "1"
    );

    if (resposta === null) return;

    if (!/^\d+$/.test(resposta.trim())) {
        exibirMensagem(
            "Informe uma quantidade inteira válida.",
            "erro"
        );
        return;
    }

    try {
        atualizarQuantidade(codigo, Number(resposta));
        exibirMensagem("Estoque atualizado com sucesso!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Confirma e exclui um produto
function removerProduto(codigo) {
    const produto = buscarProduto(codigo);

    const confirmado = confirm(
        `Deseja excluir o produto "${produto.descricao}"?`
    );

    if (!confirmado) return;

    try {
        excluirProduto(codigo);
        exibirMensagem("Produto excluído com sucesso!");
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
}

// Evento de cadastro
formProduto.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const dados = new FormData(formProduto);

    const descricao = dados.get("descricao");
    const quantidadeTexto = dados.get("quantidade");
    const valorTexto = dados.get("valor");

    // Evita aceitar campos numéricos vazios como zero
    if (
        quantidadeTexto.trim() === "" ||
        valorTexto.trim() === ""
    ) {
        exibirMensagem(
            "Preencha todos os campos corretamente.",
            "erro"
        );
        return;
    }

    const quantidade = Number(quantidadeTexto);
    const valor = Number(valorTexto);

    try {
        cadastrarProduto(descricao, quantidade, valor);

        formProduto.reset();
        exibirMensagem("Produto cadastrado com sucesso!");

        document.querySelector("#descricao").focus();
    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Pesquisa em tempo real
busca.addEventListener("input", renderizarProdutos);

// Estado inicial
renderizarProdutos();
atualizarIndicadores();
