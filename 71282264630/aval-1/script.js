// 4. Criação da lista de produtos (array global)[cite: 3]
let produtos = [];

// 21. Função auxiliar para buscar produto por código (melhoria recomendada)[cite: 16]
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find((prod) => prod.codigo === codigoProduto);[cite: 12, 13, 16]
}

// 6. Função para validar produto[cite: 3, 4]
function validarProduto(descricao, quantidade, valor) {
    // 7. Validação da descrição (mínimo 5 caracteres)
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres");[cite: 4, 5]
    }
    // 8. Validação da quantidade (maior que zero)
    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");[cite: 4, 5]
    }
    // 9. Validação do valor (maior ou igual a zero)
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");[cite: 4, 6]
    }
}

// 10. Função para cadastrar produto[cite: 3, 7]
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);[cite: 4, 7]

    // 11 e 12. Criação do objeto e geração automática do código (length + 1)
    let novoProduto = {
        codigo: produtos.length + 1,[cite: 7, 8]
        descricao: descricao,[cite: 7, 8]
        quantidade: quantidade,[cite: 7, 8]
        valor: valor[cite: 7, 8]
    };

    // 13. Adição do produto ao array[cite: 7, 9]
    produtos.push(novoProduto);[cite: 7, 9]
}

// 14. Função para listar produtos (no console e na interface HTML)[cite: 3, 10]
function listarProdutos() {
    console.log(produtos);[cite: 10]
    atualizarTabelaDOM();
}

// 16. Função para atualizar o valor do produto (substitui o valor antigo)[cite: 3, 12, 15]
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");[cite: 12]
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);[cite: 12, 16]

    if (produto) {
        produto.valor = novoValor; // Substitui o valor anterior[cite: 12, 15]
    } else {
        throw new Error("Produto não encontrado");[cite: 12, 13]
    }
}

// 19. Função para atualizar a quantidade do produto (soma ao estoque existente)[cite: 3, 14, 15]
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");[cite: 14]
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);[cite: 14, 16]

    if (produto) {
        produto.quantidade = produto.quantidade + novaQuantidade; // Soma à quantidade existente[cite: 14, 15]
    } else {
        throw new Error("Produto não encontrado");[cite: 14]
    }
}

// --- Integração com a Interface Web (DOM) ---

function exibirMensagem(texto, tipo) {
    const divMensagem = document.getElementById("mensagem");
    divMensagem.textContent = texto;
    divMensagem.className = `mensagem ${tipo}`;
    setTimeout(() => {
        divMensagem.className = "mensagem hidden";
    }, 4000);
}

function atualizarTabelaDOM() {
    const tbody = document.getElementById("tabela-produtos");
    tbody.innerHTML = "";

    produtos.forEach((prod) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${prod.codigo}</td>
            <td>${prod.descricao}</td>
            <td>${prod.quantidade}</td>
            <td>R$ ${prod.valor.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Evento: Cadastrar Produto
document.getElementById("form-cadastro").addEventListener("submit", function (e) {
    e.preventDefault();
    const descricao = document.getElementById("descricao").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const valor = parseFloat(document.getElementById("valor").value);

    try {
        cadastrarProduto(descricao, quantidade, valor);[cite: 7]
        listarProdutos();[cite: 10]
        exibirMensagem("Produto cadastrado com sucesso!", "sucesso");
        this.reset();
    } catch (error) {
        exibirMensagem(error.message, "erro");
    }
});

// Evento: Atualizar Valor
document.getElementById("form-atualizar-valor").addEventListener("submit", function (e) {
    e.preventDefault();
    const codigo = parseInt(document.getElementById("codigo-val").value);
    const novoValor = parseFloat(document.getElementById("novo-valor").value);

    try {
        atualizarValor(codigo, novoValor);[cite: 12]
        listarProdutos();[cite: 10]
        exibirMensagem("Valor atualizado com sucesso!", "sucesso");
        this.reset();
    } catch (error) {
        exibirMensagem(error.message, "erro");
    }
});

// Evento: Atualizar Quantidade
document.getElementById("form-atualizar-qtd").addEventListener("submit", function (e) {
    e.preventDefault();
    const codigo = parseInt(document.getElementById("codigo-qtd").value);
    const novaQtd = parseInt(document.getElementById("nova-qtd").value);

    try {
        atualizarQuantidade(codigo, novaQtd);[cite: 14]
        listarProdutos();[cite: 10]
        exibirMensagem("Quantidade somada ao estoque com sucesso!", "sucesso");
        this.reset();
    } catch (error) {
        exibirMensagem(error.message, "erro");
    }
});