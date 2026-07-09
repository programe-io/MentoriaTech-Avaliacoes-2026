// --- ESTADO GLOBAL ---
let produtos = [];
// Criamos um contador incremental que nunca diminui, garantindo IDs únicos
let proximoCodigo = 1; 

// --- VALIDAÇÕES E BUSCAS ---
function validarDescricao(descricao) {
    if (!descricao || descricao.trim().length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres.");
    }
}

function validarQuantidade(quantidade) {
    if (isNaN(quantidade) || quantidade < 1) {
        throw new Error("Quantidade deve ser um número maior que zero.");
    }
}

function validarValor(valor) {
    if (isNaN(valor) || valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
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
        codigo: proximoCodigo++, // Usa o código atual e incrementa para o próximo
        descricao: descricao.trim(),
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    produtos.push(novoProduto);
    logImprimir(`Sucesso: Produto "${novoProduto.descricao}" cadastrado com código ${novoProduto.codigo}!`, "sucesso");
}

function atualizarValor(codigoProduto, novoValor) {
    validarValor(novoValor);
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = Number(novoValor);
        logImprimir(`Sucesso: Valor do produto #${codigoProduto} alterado para R$ ${produto.valor.toFixed(2)}.`, "sucesso");
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
    const valorInput = document.getElementById("altValor").value;

    try {
        if (isNaN(codigo)) throw new Error("Informe o código do produto.");
        if (valorInput.trim() === "") throw new Error("Informe o novo valor para atualizar.");
        
        const valor = parseFloat(valorInput);
        atualizarValor(codigo, valor);
        document.getElementById("altValor").value = "";
    } catch (erro) {
        logImprimir(erro.message, "erro");
    }
}

function interfaceAtualizarQuantidade() {
    const codigo = parseInt(document.getElementById("altCodigo").value, 10);
    const qtdInput = document.getElementById("altQuantidade").value;

    try {
        if (isNaN(codigo)) throw new Error("Informe o código do produto.");
        if (qtdInput.trim() === "") throw new Error("Informe a quantidade que deseja somar.");
        
        const qtd = parseInt(qtdInput, 10);
        atualizarQuantidade(codigo, qtd);
        document.getElementById("altQuantidade").value = "";
    } catch (erro) {
        logImprimir(erro.message, "erro");
    }
}