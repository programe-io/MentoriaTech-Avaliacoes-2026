css

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f3f5f9;
    color: #263247;
}

header {
    background: #17365d;
    color: white;
    padding: 28px 20px;
    text-align: center;
}

header h1 {
    margin-bottom: 8px;
}

main {
    width: 92%;
    max-width: 1200px;
    margin: 30px auto;
}

.resumo {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-bottom: 25px;
}

.card, .painel {
    background: white;
    padding: 22px;
    border-radius: 10px;
    box-shadow: 0 3px 12px #0000000c;
}

.card h3 {
    font-size: 15px;
    color: #64748b;
    margin-bottom: 12px;
}

.card p {
    font-size: 25px;
    font-weight: bold;
    color: #17365d;
}

.painel {
    margin-bottom: 25px;
}

.painel h2 {
    font-size: 21px;
    margin-bottom: 20px;
}

#formProduto {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.campo {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

label {
    font-weight: bold;
    font-size: 14px;
}

input {
    width: 100%;
    padding: 11px;
    border: 1px solid #ccd4df;
    border-radius: 6px;
    font-size: 15px;
    background: white;
}

input:focus {
    outline: 2px solid #9dc5ff;
    border-color: #3978c5;
}

button {
    padding: 12px 16px;
    border: none;
    border-radius: 6px;
    background: #2166b1;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
}

#formProduto button {
    align-self: end;
}

button:hover {
    filter: brightness(0.92);
}

#busca {
    margin-bottom: 18px;
}

.tabela-container {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 760px;
}

th, td {
    padding: 13px 12px;
    text-align: left;
    border-bottom: 1px solid #e6eaf0;
    font-size: 14px;
}

th {
    background: #edf2f8;
    color: #17365d;
}

tr:hover td {
    background: #f8fafc;
}

.acoes {
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
}

.btn-valor {
    background: #287a50;
}

.btn-quantidade {
    background: #b7791f;
}

.btn-excluir {
    background: #c0392b;
}

#mensagemVazia {
    padding: 20px 0;
    text-align: center;
    color: #64748b;
}

footer {
    text-align: center;
    padding: 20px;
    color: #64748b;
    font-size: 13px;
}

@media (max-width: 700px) {
    .resumo {
        grid-template-columns: 1fr;
    }

    #formProduto {
        grid-template-columns: 1fr;
    }

    main {
        width: 95%;
    }

    .card, .painel {
        padding: 16px;
    }
}
4. JavaScript — script.js

javascript

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const busca = document.getElementById("busca");

let produtos = [];

try {
    const dadosSalvos = JSON.parse(
        localStorage.getItem("produtosEstoque") || "[]"
    );

    produtos = Array.isArray(dadosSalvos) ? dadosSalvos : [];
} catch {
    produtos = [];
}

function salvarProdutos() {
    localStorage.setItem("produtosEstoque", JSON.stringify(produtos));
}

function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Cadastrar produto
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo")
        .value.trim();

    const descricao = document.getElementById("descricao")
        .value.trim();

    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    const valor = Number(
        document.getElementById("valor").value
    );

    if (!codigo || !descricao) {
        alert("Preencha o código e a descrição.");
        return;
    }

    if (
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        alert("Informe uma quantidade inteira e um valor válido.");
        return;
    }

    const existe = produtos.some(
        produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
    );

    if (existe) {
        alert("Já existe um produto com esse código.");
        return;
    }

    produtos.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    salvarProdutos();
    renderizarProdutos();
    form.reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function renderizarProdutos() {
    const termo = busca.value.trim().toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.codigo.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo)
    );

    lista.replaceChildren();

    filtrados.forEach(produto => {
        const linha = document.createElement("tr");

        const valores = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            moeda(produto.valor),
            moeda(produto.quantidade * produto.valor)
        ];

        valores.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const acoes = document.createElement("td");
        const grupoBotoes = document.createElement("div");
        grupoBotoes.className = "acoes";

        const botaoValor = criarBotao(
            "Alterar valor",
            "btn-valor",
            () => alterarValor(produto.codigo)
        );

        const botaoQuantidade = criarBotao(
            "Alterar qtd.",
            "btn-quantidade",
            () => alterarQuantidade(produto.codigo)
        );

        const botaoExcluir = criarBotao(
            "Excluir",
            "btn-excluir",
            () => excluirProduto(produto.codigo)
        );

        grupoBotoes.append(
            botaoValor,
            botaoQuantidade,
            botaoExcluir
        );

        acoes.appendChild(grupoBotoes);
        linha.appendChild(acoes);
        lista.appendChild(linha);
    });

    document.getElementById("mensagemVazia").style.display =
        filtrados.length === 0 ? "block" : "none";

    atualizarResumo();
}

function criarBotao(texto, classe, acao) {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.textContent = texto;
    botao.className = classe;
    botao.addEventListener("click", acao);

    return botao;
}

// Alterar o valor de um produto
function alterarValor(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) return;

    const entrada = prompt(
        `Novo valor de ${produto.descricao} (R$):`,
        produto.valor.toFixed(2)
    );

    if (entrada === null || entrada.trim() === "") return;

    const novoValor = Number(entrada.replace(",", "."));

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Informe um valor válido, maior ou igual a zero.");
        return;
    }

    produto.valor = novoValor;

    salvarProdutos();
    renderizarProdutos();

    alert("Valor atualizado com sucesso!");
}

// Alterar a quantidade de um produto
function alterarQuantidade(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) return;

    const entrada = prompt(
        `Nova quantidade de ${produto.descricao}:`,
        produto.quantidade
    );

    if (entrada === null || entrada.trim() === "") return;

    const novaQuantidade = Number(entrada);

    if (
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 0
    ) {
        alert("Informe uma quantidade inteira maior ou igual a zero.");
        return;
    }

    produto.quantidade = novaQuantidade;

    salvarProdutos();
    renderizarProdutos();

    alert("Quantidade atualizada com sucesso!");
}

// Excluir produto
function excluirProduto(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) return;

    const confirmou = confirm(
        `Deseja excluir o produto "${produto.descricao}"?`
    );

    if (!confirmou) return;

    produtos = produtos.filter(p => p.codigo !== codigo);

    salvarProdutos();
    renderizarProdutos();
}

// Atualizar indicadores do estoque
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
        moeda(valorTotal);
}

// Buscar produtos
busca.addEventListener("input", renderizarProdutos);

// Mostrar os produtos salvos ao abrir a página
renderizarProdutos();