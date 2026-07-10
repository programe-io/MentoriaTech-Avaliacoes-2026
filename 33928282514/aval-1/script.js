// --- ESTADO GLOBAL ---
let produtos = [];
let proximoCodigo = 1; // Garante códigos únicos, mesmo se houver exclusão no futuro

// --- VALIDAÇÕES E BUSCAS ---
function validarDescricao(descricao) {
    if (!descricao || descricao.trim().length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres.");
    }
}

function validarQuantidade(quantidade) {
    // Adicionado teste para garantir que não seja NaN antes de testar se é menor que 1
    if (isNaN(quantidade) || quantidade < 1) {
        throw new Error("Quantidade inválida. Digite um número maior que zero.");
    }
}

function validarValor(valor) {
    if (isNaN(valor) || valor < 0) {
        throw new Error("Valor inválido. O valor deve ser maior ou igual a zero.");
    }
}

function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find((prod) => prod.codigo === codigoProduto);
}

// --- FUNÇÕES DE REGRAS DE NEGÓCIO ---
function cadastrarProduto(descricao, quantidade, valor) {
    validarDescricao(descricao);
    validarQuantidade(quantidade);
    validarValor(valor);

    let novoProduto = {
        codigo: proximoCodigo++, // Usa o contador global e incrementa para o próximo
        descricao: descricao.trim(),
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    produtos.push(novoProduto);
    logImprimir(`Sucesso: Produto "${descricao}" cadastrado com código ${novoProduto.codigo}!`, "sucesso");
}

function atualizarValor(codigoProduto, novoValor) {
    validarValor(novoValor);
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = Number(novoValor);
        logImprimir(`Sucesso: Valor do produto #${codigoProduto} alterado para R$ ${novoValor.toFixed(2)}.`, "sucesso");
    } else {
        throw new Error(`Produto com código #${codigoProduto} não foi encontrado.`);
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    validarQuantidade(novaQuantidade);
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.quantidade += Number(novaQuantidade);
        logImprimir(`Sucesso: Adicionadas ${novaQuantidade} unidades ao produto #${codigoProduto}. Total: ${produto.quantidade}.`, "sucesso");
    } else {
        throw new Error(`Produto com código #${codigoProduto} não foi encontrado.`);
    }
}

// --- FUNÇÕES DE INTERAÇÃO COM A TELA (HTML/DOM) ---
function logImprimir(mensagem, tipo = "") {
    const output = document.getElementById("output");
    if (tipo === "erro") {
        output.innerHTML = `<span class="erro">[ERRO]: ${mensagem}</span>\n` + output.innerHTML;
    } else if (tipo === "sucesso") {
        output.innerHTML = `<span class="sucesso">${mensagem}</span>\n` + output.innerHTML;
    } else {
        output.innerHTML = mensagem + "\n" + output.innerHTML;
    }
    atualizarVisualizacaoEstoque();
}

function atualizarVisualizacaoEstoque() {
    const estoqueLista = document.getElementById("estoqueLista");
    estoqueLista.textContent = JSON.stringify(produtos, null, 4);
}

function interfaceCadastrar() {
    const desc = document.getElementById("cadDescricao").value;
    const qtd = parseInt(document.getElementById("cadQuantidade").value, 10);
    const val = parseFloat(document.getElementById("cadValor").value);

    try {
        cadastrarProduto(desc, qtd, val);
        // Limpa campos após sucesso
        document.getElementById("cadDescricao").value = "";
        document.getElementById("cadQuantidade").value = "";
        document.getElementById("cadValor").value = "";
    } catch (erro) {
        logImprimir(erro.message, "erro");
    }
}

function interfaceAtualizarValor() {
    const codigo = parseInt(document.getElementById("altCodigo").value, 10);
    const valor = parseFloat(document.getElementById("altValor").value);

    try {
        if (isNaN(codigo)) throw new Error("Informe um código de produto válido.");
        atualizarValor(codigo, valor);
        document.getElementById("altValor").value = "";
    } catch (erro) {
        logImprimir(erro.message, "erro");
    }
}

// Passando 10 como segundo parâmetro no parseInt garante a conversão correta na base decimal
function interfaceAtualizarQuantidade() {
    const codigo = parseInt(document.getElementById("altCodigo").value, 10);
    const qtd = parseInt(document.getElementById("altQuantidade").value, 10);

    try {
        if (isNaN(codigo)) throw new Error("Informe um código de produto válido.");
        atualizarQuantidade(codigo, qtd);
        document.getElementById("altQuantidade").value = "";
    } catch (erro) {
        logImprimir(erro.message, "erro");
    }
}