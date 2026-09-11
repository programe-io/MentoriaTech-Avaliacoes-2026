// Base de dados (Array de produtos)
let produtos = [];

// ================================================
// FUNÇÕES AUXILIARES / MELHORIAS
// ================================================

// Função reutilizável para busca (Sugerida no item 21)
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find((prod) => prod.codigo === Number(codigoProduto));
}

// Exibe mensagens visuais na tela ao invés de usar alert
function exibirMensagem(texto, tipo = "sucesso") {
    const msgElemento = document.getElementById("mensagem");
    msgElemento.textContent = texto;
    msgElemento.className = `mensagem ${tipo}`;
    
    setTimeout(() => {
        msgElemento.className = "mensagem hidden";
    }, 4000);
}

// ================================================
// FUNÇÕES CORE DO SISTEMA
// ================================================

// Validar Produto (Itens 6, 7, 8 e 9)
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("A descrição deve ter, no mínimo, 5 caracteres.");
    }
    if (quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }
    if (valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

// Cadastrar Produto (Itens 10, 11, 12 e 13)
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1, // Gerador automático
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
    listarProdutos();
}

// Listar Produtos (Item 14)
function listarProdutos() {
    const corpoTabela = document.getElementById("lista-corpo");
    corpoTabela.innerHTML = "";

    produtos.forEach((prod) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td><strong>#${prod.codigo}</strong></td>
            <td>${prod.descricao}</td>
            <td>${prod.quantidade}</td>
            <td>R$ ${prod.valor.toFixed(2)}</td>
        `;
        corpoTabela.appendChild(linha);
    });
}

// Atualizar Valor (Itens 16, 17 e 18)
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = Number(novoValor); // Substitui o valor
        listarProdutos();
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Atualizar Quantidade (Itens 19 e 20)
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("A quantidade a somar deve ser maior que zero.");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.quantidade += Number(novaQuantidade); // Soma à quantidade existente
        listarProdutos();
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// ================================================
// CAPTURA DOS EVENTOS DOM (INTEGRAÇÃO COM A TELA)
// ================================================

// Evento: Cadastrar
document.getElementById("form-cadastro").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const desc = document.getElementById("descricao").value.trim();
        const qtd = Number(document.getElementById("quantidade").value);
        const val = Number(document.getElementById("valor").value);

        cadastrarProduto(desc, qtd, val);
        exibirMensagem("Produto cadastrado com sucesso!", "sucesso");
        e.target.reset(); // Limpa o formulário
    } catch (error) {
        exibirMensagem(error.message, "erro");
    }
});

// Evento: Atualizar Valor
document.getElementById("form-atualizar-valor").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const cod = document.getElementById("codigo-val").value;
        const val = document.getElementById("novo-valor").value;

        atualizarValor(cod, val);
        exibirMensagem(`Valor do produto #${cod} atualizado com sucesso!`, "sucesso");
        e.target.reset();
    } catch (error) {
        exibirMensagem(error.message, "erro");
    }
});

// Evento: Somar Quantidade
document.getElementById("form-atualizar-qtd").addEventListener("submit", (e) => {
    e.preventDefault();
    try {
        const cod = document.getElementById("codigo-qtd").value;
        const qtd = document.getElementById("nova-qtd").value;

        atualizarQuantidade(cod, qtd);
        exibirMensagem(`Quantidade somada ao produto #${cod} com sucesso!`, "sucesso");
        e.target.reset();
    } catch (error) {
        exibirMensagem(error.message, "erro");
    }
});