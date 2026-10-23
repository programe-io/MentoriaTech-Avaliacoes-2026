// 4. Criação da lista de produtos (Array Global)
let produtos = [];

// 12. Controle de geração de ID automático sequencial
let proximoCodigo = 1;

// 6, 7, 8, 9. Função para validar produto
function validarProduto(descricao, quantidade, valor) {
    if (!descricao || descricao.trim() === "") {
        throw new Error("A descrição do produto não pode ser vazia.");
    }
    if (isNaN(quantidade) || quantidade < 0) {
        throw new Error("A quantidade deve ser um número maior ou igual a zero.");
    }
    if (isNaN(valor) || valor <= 0) {
        throw new Error("O valor do produto deve ser maior que zero.");
    }
    return true;
}

// 10, 11, 13. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    // Valida os dados antes de prosseguir
    validarProduto(descricao, quantidade, valor);

    // 11. Criação do objeto produto + 12. ID Automático
    let novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor)
    };

    // 13. Adição de produtos ao array
    produtos.push(novoProduto);
    return novoProduto;
}

// 14. Função para listar produtos na tabela HTML
function listarProdutos() {
    const tbody = document.getElementById("lista-produtos");
    tbody.innerHTML = ""; // Limpa a tabela

    produtos.forEach(produto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>#${produto.codigo}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade} un</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>
                <button class="btn-edit" onclick="acaoAtualizarValor(${produto.codigo})">Alterar Preço</button>
                <button class="btn-edit" onclick="acaoAtualizarQtd(${produto.codigo})">Somar Qtd</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 16, 17, 18. Função para atualizar o valor do produto
function atualizarValor(codigoProduto, novoValor) {
    // 17. Busca de produto com find
    let produto = produtos.find(p => p.codigo === codigoProduto);
    
    // 18. Tratamento de produto não encontrado
    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (isNaN(novoValor) || novoValor <= 0) {
        alert("O novo valor deve ser maior que zero.");
        return;
    }

    produto.valor = parseFloat(novoValor);
}

// 19, 20. Função para atualizar a quantidade (Somando ao estoque atual)
function atualizarQuantidade(codigoProduto, quantidadeAAdicionar) {
    let produto = produtos.find(p => p.codigo === codigoProduto);
    
    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (isNaN(quantidadeAAdicionar) || quantidadeAAdicionar <= 0) {
        alert("Digite uma quantidade válida para somar.");
        return;
    }

    // 20. Diferença entre alterar valor (substitui) e somar quantidade (acumula)
    produto.quantidade += parseInt(quantidadeAAdicionar);
}

// --- FUNÇÕES DE INTERAÇÃO COM A INTERFACE INTERNA (UI) ---

function acaoCadastrar() {
    const descInput = document.getElementById("desc");
    const qtdInput = document.getElementById("qtd");
    const valorInput = document.getElementById("valor");
    const msgErro = document.getElementById("msg-erro");

    try {
        msgErro.innerText = ""; // Limpa erros anteriores
        
        cadastrarProduto(descInput.value, qtdInput.value, valorInput.value);
        
        // Limpa os campos do formulário
        descInput.value = "";
        qtdInput.value = "";
        valorInput.value = "";
        
        // Atualiza a tabela
        listarProdutos();
    } catch (error) {
        msgErro.innerText = error.message;
    }
}

function acaoAtualizarValor(codigo) {
    const novoPreco = prompt("Digite o novo preço para este produto:");
    if (novoPreco !== null) {
        atualizarValor(codigo, novoPreco);
        listarProdutos();
    }
}

function acaoAtualizarQtd(codigo) {
    const qtdSomar = prompt("Quantas unidades deseja ADICIONAR ao estoque atual?");
    if (qtdSomar !== null) {
        atualizarQuantidade(codigo, qtdSomar);
        listarProdutos();
    }
}
