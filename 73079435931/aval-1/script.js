// ==========================================
// 1. LISTA DE PRODUTOS
// ==========================================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let proximoCodigo = Number(localStorage.getItem("proximoCodigo")) ||
    (produtos.reduce((maior, produto) =>
        Math.max(maior, produto.codigo), 0) + 1);


// ==========================================
// 2. SALVAR DADOS
// ==========================================

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("proximoCodigo", proximoCodigo);
}


// ==========================================
// 3. VALIDAR PRODUTO
// ==========================================

function validarProduto(descricao, quantidade, valor) {

    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error("A descrição deve ter, no mínimo, cinco caracteres.");
    }

    if (!Number.isSafeInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser um número inteiro maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}


// ==========================================
// 4. CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    proximoCodigo++;

    salvarDados();

    listarProdutos();

    atualizarDashboard();

    return novoProduto;
}


// ==========================================
// 5. LISTAR PRODUTOS
// ==========================================

function listarProdutos(filtro = "") {

    const lista = document.getElementById("listaProdutos");
    const mensagem = document.getElementById("mensagemVazia");

    lista.replaceChildren();

    const produtosFiltrados = produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
        String(produto.codigo).includes(filtro)
    );

    mensagem.style.display =
        produtosFiltrados.length === 0 ? "block" : "none";

    if (produtos.length === 0) {
        mensagem.textContent = "Nenhum produto cadastrado.";
    } else {
        mensagem.textContent = "Nenhum produto encontrado.";
    }

    produtosFiltrados.forEach(produto => {

        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarMoeda(produto.valor),
            formatarMoeda(produto.quantidade * produto.valor)
        ];

        dados.forEach(dado => {
            const coluna = document.createElement("td");
            coluna.textContent = dado;
            linha.appendChild(coluna);
        });

        const colunaAcoes = document.createElement("td");
        const acoes = document.createElement("div");

        acoes.className = "actions";

        acoes.appendChild(criarBotao("Preço", "btn-price", "preco", produto.codigo));
        acoes.appendChild(criarBotao("Estoque +", "btn-quantity", "quantidade", produto.codigo));
        acoes.appendChild(criarBotao("Excluir", "btn-delete", "excluir", produto.codigo));

        colunaAcoes.appendChild(acoes);
        linha.appendChild(colunaAcoes);

        lista.appendChild(linha);
    });
}


// ==========================================
// 6. CRIAR BOTÕES DE AÇÃO
// ==========================================

function criarBotao(texto, classe, acao, codigo) {

    const botao = document.createElement("button");

    botao.textContent = texto;
    botao.className = `btn-action ${classe}`;
    botao.dataset.acao = acao;
    botao.dataset.codigo = codigo;

    return botao;
}


// ==========================================
// 7. BUSCAR PRODUTO PELO CÓDIGO
// ==========================================

function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(produto =>
        produto.codigo === codigoProduto
    );
}


// ==========================================
// 8. ATUALIZAR VALOR DO PRODUTO
// ==========================================

function atualizarValor(codigoProduto, novoValor) {

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        produto.valor = novoValor;

        salvarDados();

        listarProdutos();

        atualizarDashboard();

    } else {

        throw new Error("Produto não encontrado.");
    }
}


// ==========================================
// 9. ATUALIZAR QUANTIDADE
// ==========================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (!Number.isSafeInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("A quantidade deve ser um número inteiro maior que zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {

        produto.quantidade += novaQuantidade;

        salvarDados();

        listarProdutos();

        atualizarDashboard();

    } else {

        throw new Error("Produto não encontrado.");
    }
}


// ==========================================
// 10. EXCLUIR PRODUTO
// ==========================================

function excluirProduto(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    const confirmar = confirm(
        `Deseja realmente excluir o produto ${produto.descricao}?`
    );

    if (confirmar) {

        produtos = produtos.filter(produto =>
            produto.codigo !== codigoProduto
        );

        salvarDados();

        listarProdutos();

        atualizarDashboard();
    }
}


// ==========================================
// 11. ATUALIZAR INDICADORES
// ==========================================

function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorEstoque = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.valor,
        0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);
}


// ==========================================
// 12. FORMATAR VALORES EM REAL
// ==========================================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ==========================================
// 13. FORMULÁRIO DE CADASTRO
// ==========================================

document.getElementById("formProduto").addEventListener("submit", function(event) {

    event.preventDefault();

    const descricao = document.getElementById("descricao").value;

    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    const valor = Number(
        document.getElementById("valor").value
    );

    try {

        cadastrarProduto(descricao, quantidade, valor);

        alert("Produto cadastrado com sucesso!");

        this.reset();

        document.getElementById("descricao").focus();

    } catch (erro) {

        alert(erro.message);
    }
});


// ==========================================
// 14. AÇÕES DOS BOTÕES
// ==========================================

document.getElementById("listaProdutos").addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    const codigo = Number(botao.dataset.codigo);

    const acao = botao.dataset.acao;

    const produto = buscarProdutoPorCodigo(codigo);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    try {

        if (acao === "preco") {

            const resposta = prompt(
                `Preço atual: ${formatarMoeda(produto.valor)}\nDigite o novo valor:`
            );

            if (resposta === null || resposta.trim() === "") return;

            const novoValor = Number(resposta.replace(",", "."));

            atualizarValor(codigo, novoValor);

            alert("Valor atualizado com sucesso!");

        }

        else if (acao === "quantidade") {

            const resposta = prompt(
                `Estoque atual: ${produto.quantidade}\nQuantas unidades deseja adicionar?`
            );

            if (resposta === null || resposta.trim() === "") return;

            const novaQuantidade = Number(resposta);

            atualizarQuantidade(codigo, novaQuantidade);

            alert("Estoque atualizado com sucesso!");

        }

        else if (acao === "excluir") {

            excluirProduto(codigo);
        }

    } catch (erro) {

        alert(erro.message);
    }
});


// ==========================================
// 15. PESQUISAR PRODUTOS
// ==========================================

document.getElementById("pesquisa").addEventListener("input", function() {

    listarProdutos(this.value.trim());
});


// ==========================================
// 16. INICIALIZAR SISTEMA
// ==========================================

listarProdutos();

atualizarDashboard();

salvarDados();
