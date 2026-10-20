// 4. Criação da lista de produtos (Array em memória)
const listaProdutos = [];
let contadorCodigo = 1; // 12. Controle para geração automática do código

// 14. Função para listar produtos na tabela HTML
function listarProdutos() {
    const corpoTabela = document.getElementById('lista-produtos-corpo');
    corpoTabela.innerHTML = ''; // Limpa a tabela antes de renderizar

    if (listaProdutos.length === 0) {
        corpoTabela.innerHTML = `<tr><td colspan="5" style="text-align:center; color: #94a3b8;">Nenhum produto cadastrado.</td></tr>`;
        return;
    }

    listaProdutos.forEach(produto => {
        const linha = document.createElement('tr');
        
        const totalEstoque = produto.quantidade * produto.valor;

        linha.innerHTML = `
            <td><strong>${produto.codigo}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td><strong>R$ ${totalEstoque.toFixed(2)}</strong></td>
        `;
        corpoTabela.appendChild(linha);
    });
}

// Helper para exibir alertas de sucesso ou erro na tela
function exibirMensagem(texto, tipo) {
    const box = document.getElementById('mensagem');
    box.innerText = texto;
    box.style.display = 'block';
    
    if (tipo === 'erro') {
        box.style.backgroundColor = '#fee2e2';
        box.style.color = '#dc2626';
    } else {
        box.style.backgroundColor = '#dcfce7';
        box.style.color = '#15803d';
    }
}

// 6, 7, 8, 9. Funções de Validação de dados
function validarDescricao(desc) {
    return desc && desc.trim().length >= 3;
}

function validarQuantidade(qtd) {
    return Number.isInteger(qtd) && qtd >= 0;
}

function validarValor(val) {
    return !isNaN(val) && val > 0;
}

// 10. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    // Validações individuais
    if (!validarDescricao(descricao)) {
        exibirMensagem("Erro: Descrição inválida (mínimo 3 caracteres).", "erro");
        return false;
    }
    if (!validarQuantidade(quantidade)) {
        exibirMensagem("Erro: Quantidade deve ser um número inteiro maior ou igual a 0.", "erro");
        return false;
    }
    if (!validarValor(valor)) {
        exibirMensagem("Erro: O valor do produto deve ser estritamente maior que zero.", "erro");
        return false;
    }

    // 12. Geração automática do código
    const codigo = `PROD-${contadorCodigo++}`;

    // 11 e 13. Criação do objeto e adição ao Array
    const novoProduto = {
        codigo: codigo,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: parseFloat(valor)
    };

    listaProdutos.push(novoProduto);
    exibirMensagem(`Produto ${codigo} cadastrado com sucesso!`, "sucesso");
    listarProdutos();
    return true;
}

// 16 e 17. Função para atualizar o VALOR do produto (Substituição)
function atualizarValorProduto(codigo, novoValor) {
    if (!validarValor(novoValor)) {
        exibirMensagem("Erro: Novo valor inserido é inválido.", "erro");
        return;
    }

    // 17. Busca com find
    const produto = listaProdutos.find(p => p.codigo.toUpperCase() === codigo.trim().toUpperCase());

    // 18. Tratamento de produto não encontrado
    if (!produto) {
        exibirMensagem(`Erro: Produto com código ${codigo} não foi localizado.`, "erro");
        return;
    }

    // 20. Alterar valor (Substituição direta)
    produto.valor = parseFloat(novoValor);
    exibirMensagem(`Preço do produto ${produto.codigo} atualizado para R$ ${produto.valor.toFixed(2)}`, "sucesso");
    listarProdutos();
}

// 19 e 20. Função para atualizar QUANTIDADE (Somar ao estoque atual)
function somarQuantidadeProduto(codigo, qtdParaSomar) {
    const qtdInt = parseInt(qtdParaSomar);
    if (isNaN(qtdInt) || qtdInt <= 0) {
        exibirMensagem("Erro: A quantidade a somar deve ser um número inteiro positivo.", "erro");
        return;
    }

    const produto = listaProdutos.find(p => p.codigo.toUpperCase() === codigo.trim().toUpperCase());

    if (!produto) {
        exibirMensagem(`Erro: Produto com código ${codigo} não foi localizado.`, "erro");
        return;
    }

    // 20. Somar quantidade (Acumulação incremental)
    produto.quantidade += qtdInt;
    exibirMensagem(`Estoque do produto ${produto.codigo} aumentado em +${qtdInt} unidades.`, "sucesso");
    listarProdutos();
}

// --- INTERCEPTADORES DE EVENTO DE TELA (Listeners) ---

// Escuta envio do Formulário de Cadastro
document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    const desc = document.getElementById('descricao').value;
    const qtd = parseInt(document.getElementById('quantidade').value);
    const val = parseFloat(document.getElementById('valor').value);

    if (cadastrarProduto(desc, qtd, val)) {
        this.reset(); // Limpa campos do formulário se cadastrou com sucesso
    }
});

// Escuta envio do painel Alterar Valor
document.getElementById('form-valor').addEventListener('submit', function(e) {
    e.preventDefault();
    const cod = document.getElementById('alt-valor-codigo').value;
    const val = parseFloat(document.getElementById('alt-valor-novo').value);
    atualizarValorProduto(cod, val);
    this.reset();
});

// Escuta envio do painel Somar Estoque
document.getElementById('form-qtd').addEventListener('submit', function(e) {
    e.preventDefault();
    const cod = document.getElementById('alt-qtd-codigo').value;
    const qtd = parseInt(document.getElementById('alt-qtd-nova').value);
    somarQuantidadeProduto(cod, qtd);
    this.reset();
});

// 15. Inicialização da listagem de testes em tela vazia
listarProdutos();
