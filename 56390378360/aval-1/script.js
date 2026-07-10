
let produtos = [];
let proximoCodigo = 1;  (Auto-Increment)

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
        throw new Error("Valor deve ser um número maior ou igual a zero.");
    }
}

function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find((prod) => prod.codigo === codigoProduto);
}


/**
 * Cadastra um novo produto no array global
 * @param {string} descricao 
 * @param {number} quantidade 
 * @param {number} valor 
 */
function cadastrarProduto(descricao, quantidade, valor) {
    validarDescricao(descricao);
    validarQuantidade(quantidade);
    validarValor(valor);

    let novoProduto = {
        codigo: proximoCodigo++,  
        descricao: descricao.trim(),
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    produtos.push(novoProduto);
    logImprimir(`Sucesso: Produto "${novoProduto.descricao}" cadastrado com código ${novoProduto.codigo}!`, "sucesso");
}

/**
 * Substitui o valor de um produto existente
 * @param {number} codigoProduto 
 * @param {number} novoValor 
 */
function atualizarValor(codigoProduto, novoValor) {
    validarValor(novoValor);
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = Number(novoValor);
        logImprimir(`Sucesso: Valor do produto #${codigoProduto} alterado para R$ ${produto.valor.toFixed(2)}.`, "sucesso");
    } else {
        throw new Error(`Produto com código #${codigoProduto} não encontrado.`);
    }
}

/**
 * Soma uma quantidade informada ao estoque atual do produto
 * @param {number} codigoProduto 
 * @param {number} novaQuantidade 
 */
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    validarQuantidade(novaQuantidade);
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.quantidade += Number(novaQuantidade);
        logImprimir(`Sucesso: Adicionadas ${novaQuantidade} unidades ao produto #${codigoProduto}. Total: ${produto.quantidade}.`, "sucesso");
    } else {
        throw new Error(`Produto com código #${codigoProduto} não encontrado.`);
    }
}



/**
 * Controla a exibição de logs na tela e atualiza o JSON visual
 */
function logImprimir(mensagem, tipo = "") {
    const output = document.getElementById("output");
    
    o no Node), faz apenas console.log
    if (!output) {
        console.log(`[${tipo.toUpperCase()}]: ${mensagem}`);
        return;
    }

    if (tipo === "erro") {
        output.innerHTML = `<span class="erro">[ERRO]: ${mensagem}</span>\n` + output.innerHTML;
    } else if (tipo === "sucesso") {
        output.innerHTML = `<span class="sucesso">${mensagem}</span>\n` + output.innerHTML;
    } else {
        output.innerHTML = mensagem + "\n" + output.innerHTML;
    }
    
    atualizarVisualizacaoEstoque();
}

/**
 * Atualiza o container de visualização do JSON do estoque
 */