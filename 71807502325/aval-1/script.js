
// ======================================
// SISTEMA DE CONTROLE DE ESTOQUE
// ======================================

// Array de produtos
let produtos = [];

// Contador de códigos
let proximoCodigo = 1;

// Elementos HTML
const formulario = document.getElementById("formProduto");

const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");


// ======================================
// 1. VALIDAR PRODUTO
// ======================================

function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error("A descrição deve ter pelo menos 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser um número inteiro maior que zero.");
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

}


// ======================================
// 2. CADASTRAR PRODUTO
// ======================================

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


// ======================================
// 3. LISTAR PRODUTOS
// ======================================

function listarProdutos() {

    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {

        listaProdutos.innerHTML = `
            <tr>
                <td colspan="5">Nenhum produto cadastrado.</td>
            </tr>
        `;

        return;
    }

    produtos.forEach((produto) => {

        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        const descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const valor = document.createElement("td");
        valor.textContent = produto.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const acoes = document.createElement("td");

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "btn-editar";

        botaoEditar.addEventListener("click", () => {
            editarProduto(produto.codigo);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn-excluir";

        botaoExcluir.addEventListener("click", () => {
            excluirProduto(produto.codigo);
        });

        acoes.appendChild(botaoEditar);
        acoes.appendChild(botaoExcluir);

        linha.appendChild(codigo);
        linha.appendChild(descricao);
        linha.appendChild(quantidade);
        linha.appendChild(valor);
        linha.appendChild(acoes);

        listaProdutos.appendChild(linha);

    });

}


// ======================================
// 4. BUSCAR PRODUTO POR CÓDIGO
// ======================================

function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(
        (produto) => produto.codigo === codigoProduto
    );

}


// ======================================
// 5. ATUALIZAR VALOR
// ======================================

function atualizarValor(codigoProduto, novoValor) {

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.valor = novoValor;

    listarProdutos();

}


// ======================================
// 6. ATUALIZAR QUANTIDADE
// ======================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("A quantidade deve ser um inteiro maior que zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    produto.quantidade += novaQuantidade;

    listarProdutos();

}


// ======================================
// 7. EDITAR PRODUTO
// ======================================

function editarProduto(codigoProduto) {

    try {

        const produto = buscarProdutoPorCodigo(codigoProduto);

        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        const novoValor = prompt(
            `Informe o novo valor de ${produto.descricao}:`,
            produto.valor
        );

        if (novoValor === null) return;

        const valor = Number(novoValor);

        atualizarValor(codigoProduto, valor);

        alert("Valor atualizado com sucesso!");

    } catch (erro) {

        alert(erro.message);

    }

}


// ======================================
// 8. EXCLUIR PRODUTO
// ======================================

function excluirProduto(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado.");
        return;
    }

    const confirmar = confirm(
        `Deseja excluir o produto ${produto.descricao}?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(
        (produto) => produto.codigo !== codigoProduto
    );

    listarProdutos();

    alert("Produto excluído com sucesso!");

}


// ======================================
// 9. EVENTO DE CADASTRO
// ======================================

formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    try {

        const descricao = campoDescricao.value;

        const quantidade = Number(campoQuantidade.value);

        const valor = Number(campoValor.value);

        cadastrarProduto(descricao, quantidade, valor);

        alert("Produto cadastrado com sucesso!");

        formulario.reset();

    } catch (erro) {

        alert(erro.message);

    }

});


// ======================================
// 10. INICIALIZAR SISTEMA
// ======================================

listarProdutos();
