
"use strict";

// Estado da aplicação
const produtos = [];
let proximoCodigo = 1;

// Elementos do HTML
const form = document.getElementById("produtoForm");
const campoCodigo = document.getElementById("codigo");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");
const estadoVazio = document.getElementById("estadoVazio");
const busca = document.getElementById("busca");
const mensagem = document.getElementById("mensagem");

const tituloFormulario = document.getElementById("tituloFormulario");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

// Formatação de valores monetários
const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

// Validação dos dados
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve ter pelo menos 5 caracteres."
        );
    }

    if (descricao.trim().length > 100) {
        throw new Error(
            "A descrição deve ter no máximo 100 caracteres."
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

    // Evita valores com mais de duas casas decimais.
    if (Math.round(valor * 100) / 100 !== valor) {
        throw new Error(
            "O valor deve ter no máximo duas casas decimais."
        );
    }
}

// Busca um produto pelo código
function buscarProdutoPorCodigo(codigo) {
    return produtos.find(produto => produto.codigo === codigo);
}

// Cadastra um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade,
        valor
    };

    produtos.push(novoProduto);
    return novoProduto;
}

// Atualiza o valor unitário
function atualizarValor(codigoProduto, novoValor) {
    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }

    if (Math.round(novoValor * 100) / 100 !== novoValor) {
        throw new Error(
            "O valor deve ter no máximo duas casas decimais."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;
}

// Soma unidades ao estoque existente
function atualizarQuantidade(codigoProduto, quantidadeAdicional) {
    if (
        !Number.isSafeInteger(quantidadeAdicional) ||
        quantidadeAdicional < 1
    ) {
        throw new Error(
            "A quantidade adicional deve ser um inteiro maior que zero."
        );
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    if (
        !Number.isSafeInteger(produto.quantidade + quantidadeAdicional)
    ) {
        throw new Error("A quantidade final é muito grande.");
    }

    produto.quantidade += quantidadeAdicional;
}

// Atualiza a descrição de um produto
function atualizarDescricao(codigoProduto, novaDescricao) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    validarProduto(novaDescricao, produto.quantidade, produto.valor);
    produto.descricao = novaDescricao.trim();
}

// Exclui um produto
function excluirProduto(codigoProduto) {
    const indice = produtos.findIndex(
        produto => produto.codigo === codigoProduto
    );

    if (indice === -1) {
        throw new Error("Produto não encontrado.");
    }

    produtos.splice(indice, 1);
}

// Exibe mensagens de feedback
function mostrarMensagem(texto, tipo = "success") {
    mensagem.textContent = texto;
    mensagem.className = `message ${tipo}`;
}

// Limpa o formulário e sai do modo de edição
function limparFormulario() {
    form.reset();
    campoCodigo.value = "";
    tituloFormulario.textContent = "Cadastrar produto";
    btnSalvar.textContent = "Cadastrar produto";
    btnCancelar.hidden = true;
}

// Renderiza a tabela e os indicadores
function renderizarProdutos() {
    const termo = busca.value.trim().toLocaleLowerCase("pt-BR");

    const produtosFiltrados = produtos.filter(produto => {
        return (
            produto.descricao.toLocaleLowerCase("pt-BR").includes(termo) ||
            String(produto.codigo).includes(termo)
        );
    });

    // Cria as linhas com elementos DOM, sem inserir dados do usuário
    // diretamente em HTML.
    const fragmento = document.createDocumentFragment();

    produtosFiltrados.forEach(produto => {
        const linha = document.createElement("tr");

        const valores = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            moeda.format(produto.valor),
            moeda.format(produto.quantidade * produto.valor)
        ];

        valores.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = String(valor);
            linha.appendChild(celula);
        });

        const celulaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "actions";

        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.className = "btn btn-small btn-edit";
        btnEditar.textContent = "Editar";
        btnEditar.setAttribute(
            "aria-label",
            `Editar ${produto.descricao}`
        );
        btnEditar.addEventListener("click", () => editarProduto(produto.codigo));

        const btnExcluir = document.createElement("button");
        btnExcluir.type = "button";
        btnExcluir.className = "btn btn-small btn-delete";
        btnExcluir.textContent = "Excluir";
        btnExcluir.setAttribute(
            "aria-label",
            `Excluir ${produto.descricao}`
        );
        btnExcluir.addEventListener("click", () => {
            const confirmado = window.confirm(
                `Deseja excluir o produto "${produto.descricao}"?`
            );

            if (!confirmado) return;

            try {
                excluirProduto(produto.codigo);

                if (Number(campoCodigo.value) === produto.codigo) {
                    limparFormulario();
                }

                renderizarProdutos();
                mostrarMensagem("Produto excluído com sucesso.");
            } catch (erro) {
                mostrarMensagem(erro.message, "error");
            }
        });

        acoes.append(btnEditar, btnExcluir);
        celulaAcoes.appendChild(acoes);
        linha.appendChild(celulaAcoes);
        fragmento.appendChild(linha);
    });

    listaProdutos.replaceChildren(fragmento);

    estadoVazio.hidden = produtosFiltrados.length > 0;
    estadoVazio.textContent = produtos.length === 0
        ? "Nenhum produto cadastrado."
        : "Nenhum produto corresponde à busca.";

    // Indicadores do estoque
    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorTotal = produtos.reduce(
        (total, produto) => total + produto.quantidade * produto.valor,
        0
    );

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        totalUnidades.toLocaleString("pt-BR");

    document.getElementById("valorEstoque").textContent =
        moeda.format(valorTotal);
}

// Prepara o formulário para editar um produto
function editarProduto(codigoProduto) {
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        mostrarMensagem("Produto não encontrado.", "error");
        return;
    }

    campoCodigo.value = produto.codigo;
    campoDescricao.value = produto.descricao;
    campoQuantidade.value = produto.quantidade;
    campoValor.value = produto.valor.toFixed(2);

    tituloFormulario.textContent = "Editar produto";
    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;

    form.scrollIntoView({ behavior: "smooth", block: "start" });
    campoDescricao.focus();
}

// Trata o cadastro e a edição pelo mesmo formulário
form.addEventListener("submit", evento => {
    evento.preventDefault();

    const codigo = campoCodigo.value;
    const descricao = campoDescricao.value;
    const quantidade = Number(campoQuantidade.value);
    const valor = Number(campoValor.value);

    try {
        validarProduto(descricao, quantidade, valor);

        if (codigo !== "") {
            const produto = buscarProdutoPorCodigo(Number(codigo));

            if (!produto) {
                throw new Error("Produto não encontrado.");
            }

            // A quantidade digitada passa a ser a quantidade final.
            atualizarDescricao(produto.codigo, descricao);
            atualizarQuantidadeExata(produto, quantidade);
            atualizarValor(produto.codigo, valor);

            mostrarMensagem("Produto atualizado com sucesso.");
        } else {
            cadastrarProduto(descricao, quantidade, valor);
            mostrarMensagem("Produto cadastrado com sucesso.");
        }

        limparFormulario();
        renderizarProdutos();
    } catch (erro) {
        mostrarMensagem(erro.message, "error");
    }
});

// Define a quantidade final durante a edição.
function atualizarQuantidadeExata(produto, novaQuantidade) {
    if (!Number.isSafeInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error(
            "A quantidade deve ser um inteiro maior que zero."
        );
    }

    produto.quantidade = novaQuantidade;
}

// Botão para cancelar a edição
btnCancelar.addEventListener("click", () => {
    limparFormulario();
    mostrarMensagem("Edição cancelada.");
});

// Busca em tempo real
busca.addEventListener("input", renderizarProdutos);

// Ano atual no rodapé
document.getElementById("anoAtual").textContent =
    new Date().getFullYear();

// Dados iniciais de exemplo
cadastrarProduto("Mouse", 20, 55.00);
cadastrarProduto("Fones de ouvido", 20, 33.00);

// Renderização inicial
renderizarProdutos();
