// ================================
// SISTEMA DE ESTOQUE
// ================================

// Carrega os produtos salvos no navegador
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Elementos da página
const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

const totalProdutos = document.getElementById("totalProdutos");
const totalItens = document.getElementById("totalItens");


// ================================
// SALVAR NO LOCALSTORAGE
// ================================

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


// ================================
// CADASTRAR PRODUTO
// ================================

formProduto.addEventListener("submit", function (event) {

    event.preventDefault();

    // Pega os valores dos campos
    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Validação
    if (codigo === "") {
        mostrarMensagem("Digite o código do produto.", "erro");
        return;
    }

    if (descricao === "") {
        mostrarMensagem("Digite a descrição do produto.", "erro");
        return;
    }

    if (quantidade < 0 || isNaN(quantidade)) {
        mostrarMensagem("Digite uma quantidade válida.", "erro");
        return;
    }

    if (valor < 0 || isNaN(valor)) {
        mostrarMensagem("Digite um valor válido.", "erro");
        return;
    }

    // Verifica código duplicado
    const existe = produtos.some(
        produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
    );

    if (existe) {
        mostrarMensagem("Já existe um produto com esse código.", "erro");
        return;
    }

    // Cria o produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adiciona ao array
    produtos.push(produto);

    // Salva no navegador
    salvarProdutos();

    // Atualiza a tabela
    atualizarTabela();

    // Limpa o formulário
    formProduto.reset();

    mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");
});


// ================================
// LISTAR PRODUTOS
// ================================

function atualizarTabela() {

    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {

        listaProdutos.innerHTML = `
            <tr class="empty">
                <td colspan="5">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        atualizarResumo();
        return;
    }

    produtos.forEach(function (produto, indice) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>
                <span class="quantidade">
                    ${produto.quantidade}
                </span>
            </td>

            <td class="valor">
                ${formatarMoeda(produto.valor)}
            </td>

            <td>
                <div class="acoes">

                    <button
                        class="btn-acao btn-valor"
                        onclick="alterarValor(${indice})">
                        Alterar valor
                    </button>

                    <button
                        class="btn-acao btn-quantidade"
                        onclick="alterarQuantidade(${indice})">
                        Alterar quantidade
                    </button>

                    <button
                        class="btn-acao btn-excluir"
                        onclick="excluirProduto(${indice})">
                        Excluir
                    </button>

                </div>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });

    atualizarResumo();
}


// ================================
// ALTERAR VALOR
// ================================

function alterarValor(indice) {

    const produto = produtos[indice];

    const novoValor = prompt(
        "Digite o novo valor:",
        produto.valor
    );

    if (novoValor === null) {
        return;
    }

    const valor = Number(novoValor);

    if (isNaN(valor) || valor < 0) {
        mostrarMensagem("Digite um valor válido.", "erro");
        return;
    }

    produto.valor = valor;

    salvarProdutos();
    atualizarTabela();

    mostrarMensagem(
        "Valor alterado com sucesso!",
        "sucesso"
    );
}


// ================================
// ALTERAR QUANTIDADE
// ================================

function alterarQuantidade(indice) {

    const produto = produtos[indice];

    const novaQuantidade = prompt(
        "Digite a nova quantidade:",
        produto.quantidade
    );

    if (novaQuantidade === null) {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (
        isNaN(quantidade) ||
        quantidade < 0 ||
        !Number.isInteger(quantidade)
    ) {
        mostrarMensagem(
            "Digite uma quantidade inteira válida.",
            "erro"
        );

        return;
    }

    produto.quantidade = quantidade;

    salvarProdutos();
    atualizarTabela();

    mostrarMensagem(
        "Quantidade alterada com sucesso!",
        "sucesso"
    );
}


// ================================
// EXCLUIR PRODUTO
// ================================

function excluirProduto(indice) {

    const produto = produtos[indice];

    const confirmar = confirm(
        `Deseja excluir "${produto.descricao}"?`
    );

    if (!confirmar) {
        return;
    }

    produtos.splice(indice, 1);

    salvarProdutos();
    atualizarTabela();

    mostrarMensagem(
        "Produto excluído com sucesso!",
        "sucesso"
    );
}


// ================================
// ATUALIZAR RESUMO
// ================================

function atualizarResumo() {

    totalProdutos.textContent = produtos.length;

    const quantidadeTotal = produtos.reduce(
        function (total, produto) {
            return total + produto.quantidade;
        },
        0
    );

    totalItens.textContent = quantidadeTotal;
}


// ================================
// FORMATAR MOEDA
// ================================

function formatarMoeda(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ================================
// MENSAGEM
// ================================

function mostrarMensagem(texto, tipo) {

    mensagem.innerHTML = `
        <div class="mensagem ${tipo}">
            ${texto}
        </div>
    `;

    setTimeout(function () {
        mensagem.innerHTML = "";
    }, 3000);
}


// ================================
// INICIAR SISTEMA
// ================================

atualizarTabela();