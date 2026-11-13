
// Recuperar produtos salvos
let produtos = [];

try {
    produtos = JSON.parse(localStorage.getItem("estoqueProdutos")) || [];
} catch (erro) {
    produtos = [];
}

// Elementos da página
const formulario = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

// Formatar valores em reais
function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Salvar produtos
function salvarProdutos() {
    try {
        localStorage.setItem(
            "estoqueProdutos",
            JSON.stringify(produtos)
        );
    } catch (erro) {
        alert("Não foi possível salvar os dados neste navegador.");
    }
}

// Cadastrar produto
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (
        !Number.isSafeInteger(codigo) ||
        codigo <= 0 ||
        descricao === "" ||
        !Number.isSafeInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const codigoExiste = produtos.some(
        produto => produto.codigo === codigo
    );

    if (codigoExiste) {
        alert("Este código já está cadastrado!");
        return;
    }

    const novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    salvarProdutos();
    mostrarProdutos();

    formulario.reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function mostrarProdutos() {

    lista.innerHTML = "";

    const termo = pesquisa.value.toLowerCase().trim();

    const filtrados = produtos.filter(produto =>
        String(produto.codigo).includes(termo) ||
        produto.descricao.toLowerCase().includes(termo)
    );

    filtrados.forEach(produto => {

        const linha = document.createElement("tr");

        function criarCelula(conteudo) {
            const celula = document.createElement("td");
            celula.textContent = conteudo;
            return celula;
        }

        linha.appendChild(criarCelula(produto.codigo));
        linha.appendChild(criarCelula(produto.descricao));
        linha.appendChild(criarCelula(produto.quantidade));
        linha.appendChild(criarCelula(formatarMoeda(produto.valor)));

        const acoes = document.createElement("td");

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Valor";
        botaoValor.className = "btn-valor";
        botaoValor.addEventListener("click", () => {
            alterarValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Quantidade";
        botaoQuantidade.className = "btn-quantidade";
        botaoQuantidade.addEventListener("click", () => {
            alterarQuantidade(produto.codigo);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn-excluir";
        botaoExcluir.addEventListener("click", () => {
            excluirProduto(produto.codigo);
        });

        acoes.append(
            botaoValor,
            botaoQuantidade,
            botaoExcluir
        );

        linha.appendChild(acoes);
        lista.appendChild(linha);
    });

    document.getElementById("mensagemVazia").style.display =
        filtrados.length === 0 ? "block" : "none";

    atualizarResumo();
}

// Alterar valor
function alterarValor(codigo) {

    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) return;

    const resposta = prompt(
        "Digite o novo valor do produto:"
    );

    if (resposta === null || resposta.trim() === "") return;

    const novoValor = Number(resposta.replace(",", "."));

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = novoValor;

    salvarProdutos();
    mostrarProdutos();

    alert("Valor atualizado com sucesso!");
}

// Alterar quantidade
function alterarQuantidade(codigo) {

    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) return;

    const resposta = prompt(
        "Digite a nova quantidade do produto:"
    );

    if (resposta === null || resposta.trim() === "") return;

    const novaQuantidade = Number(resposta);

    if (!Number.isSafeInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    salvarProdutos();
    mostrarProdutos();

    alert("Quantidade atualizada com sucesso!");
}

// Excluir produto
function excluirProduto(codigo) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) return;

    produtos = produtos.filter(
        produto => produto.codigo !== codigo
    );

    salvarProdutos();
    mostrarProdutos();

    alert("Produto excluído com sucesso!");
}

// Atualizar cartões do painel
function atualizarResumo() {

    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.valor,
        0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorTotal);
}

// Pesquisar produtos
pesquisa.addEventListener("input", mostrarProdutos);

// Carregar produtos ao abrir a página
mostrarProdutos();
