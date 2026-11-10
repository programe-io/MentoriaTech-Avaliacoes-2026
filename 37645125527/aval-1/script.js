// 4. Criação da lista de produtos (Array inicial vazio)
let produtos = [];

// Funções de Ajuda / Melhorias (Seção 21)
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find((prod) => prod.codigo === codigoProduto);
}

// 6. Função para validar produto
function validarProduto(descricao, quantidade, valor) {
    // 7. Validação da descrição (Mínimo de 5 caracteres)
    if (!descricao || descricao.trim().length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
    }

    // 8. Validação da quantidade (Maior que zero no cadastro)
    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    // 9. Validação do valor (Maior ou igual a zero)
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// 10. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    // Executa as validações
    validarProduto(descricao, quantidade, valor);

    // 11 e 12. Criação do objeto produto e geração automática do código
    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao.trim(),
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    // 13. Adição do produto ao array
    produtos.push(novoProduto);
}

// 14. Função para listar produtos (recursão visual na tabela)
function listarProdutos() {
    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = '';

    if (produtos.length === 0) {
        corpoTabela.innerHTML = '<tr><td colspan="5" style="text-align:center;">Nenhum produto cadastrado.</td></tr>';
        return;
    }

    produtos.forEach(prod => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${prod.codigo}</td>
            <td>${prod.descricao}</td>
            <td>${prod.quantidade}</td>
            <td>R$ ${prod.valor.toFixed(2)}</td>
            <td>
                <button class="btn btn-action" onclick="abrirModalValor(${prod.codigo})">Alterar Valor</button>
                <button class="btn btn-action btn-action-qtd" onclick="abrirModalQtd(${prod.codigo})">Somar Qtd</button>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });
}

// 16. Função para atualizar o valor do produto
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    // 17 e 18. Busca de produto com find e tratamento de produto não encontrado
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        // 20. O valor antigo é substituído pelo novo valor
        produto.valor = Number(novoValor);
    } else {
        throw new Error("Produto não encontrado");
    }
}

// 19. Função para atualizar a quantidade do produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        // 20. A quantidade informada é SOMADA à quantidade existente
        produto.quantidade = produto.quantidade + Number(novaQuantidade);
    } else {
        throw new Error("Produto não encontrado");
    }
}

// --- INTEGRAÇÃO COM A INTERFACE GRÁFICA (DOM) ---

function exibeMensagem(texto, tipo) {
    const divMsg = document.getElementById('mensagem');
    divMsg.innerText = texto;
    divMsg.className = `mensagem ${tipo}`;
    setTimeout(() => {
        divMsg.className = 'mensagem oculto';
    }, 4000);
}

// Evento de Cadastro
document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valor = parseFloat(document.getElementById('valor').value);

    try {
        cadastrarProduto(descricao, quantidade, valor);
        listarProdutos();
        exibeMensagem("Produto cadastrado com sucesso!", "sucesso");
        this.reset();
    } catch (erro) {
        exibeMensagem(erro.message, "erro");
    }
});

// Evento para Listar Produtos Manualmente
document.getElementById('btnAtualizarLista').addEventListener('click', () => {
    listarProdutos();
    console.log("Produtos cadastrados:", produtos); // 14. Exibe no console conforme a aula
});

// Modais e Atualizações
function fecharModais() {
    document.getElementById('modalValor').classList.add('oculto');
    document.getElementById('modalQuantidade').classList.add('oculto');
}

function abrirModalValor(codigo) {
    document.getElementById('modalValorCodigo').value = codigo;
    document.getElementById('novoValorInput').value = '';
    document.getElementById('modalValor').classList.remove('oculto');
}

function abrirModalQtd(codigo) {
    document.getElementById('modalQtdCodigo').value = codigo;
    document.getElementById('novaQtdInput').value = '';
    document.getElementById('modalQuantidade').classList.remove('oculto');
}

document.getElementById('formAtualizarValor').addEventListener('submit', function(e) {
    e.preventDefault();
    const codigo = parseInt(document.getElementById('modalValorCodigo').value);
    const novoValor = parseFloat(document.getElementById('novoValorInput').value);

    try {
        atualizarValor(codigo, novoValor);
        listarProdutos();
        fecharModais();
        exibeMensagem("Valor do produto atualizado com sucesso!", "sucesso");
    } catch (erro) {
        exibeMensagem(erro.message, "erro");
    }
});

document.getElementById('formAtualizarQuantidade').addEventListener('submit', function(e) {
    e.preventDefault();
    const codigo = parseInt(document.getElementById('modalQtdCodigo').value);
    const novaQtd = parseInt(document.getElementById('novaQtdInput').value);

    try {
        atualizarQuantidade(codigo, novaQtd);
        listarProdutos();
        fecharModais();
        exibeMensagem("Quantidade somada ao estoque com sucesso!", "sucesso");
    } catch (erro) {
        exibeMensagem(erro.message, "erro");
    }
});

// Inicialização da Tabela
listarProdutos();