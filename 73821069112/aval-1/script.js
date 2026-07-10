// ==========================================
// 1. ESTADO GLOBAL DA APLICAÇÃO
// ==========================================
let produtos = [];

// ==========================================
// 2. FUNÇÕES DE VALIDAÇÃO (Regras de Negócio)
// ==========================================
function validarDescricao(descricao) {
    if (!descricao || descricao.trim().length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
    }
}

function validarQuantidade(quantidade) {
    if (parseInt(quantidade) < 1 || isNaN(quantidade)) {
        throw new Error("Quantidade deve ser maior que zero");
    }
}

function validarValor(valor) {
    if (parseFloat(valor) < 0 || isNaN(valor)) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

function validarProduto(descricao, quantidade, valor) {
    validarDescricao(descricao);
    validarQuantidade(quantidade);
    validarValor(valor);
}

// ==========================================
// 3. OPERAÇÕES DE DADOS (Lógica do Estoque)
// ==========================================
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find((prod) => prod.codigo === parseInt(codigoProduto));
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao.trim(),
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor)
    };

    produtos.push(novoProduto);
}

function atualizarValor(codigoProduto, novoValor) {
    validarValor(novoValor);
    
    const produto = buscarProdutoPorCodigo(codigoProduto);
    if (produto) {
        produto.valor = parseFloat(novoValor);
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, quantidadeAdicionada) {
    if (parseInt(quantidadeAdicionada) < 1 || isNaN(quantidadeAdicionada)) {
        throw new Error("A quantidade a somar deve ser maior que zero");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);
    if (produto) {
        produto.quantidade += parseInt(quantidadeAdicionada);
    } else {
        throw new Error("Produto não encontrado");
    }
}

// ==========================================
// 4. RENDERIZAÇÃO DA INTERFACE (DOM)
// ==========================================
function listarProdutos() {
    const tbody = document.getElementById("lista-produtos-body");
    const emptyMsg = document.getElementById("empty-msg");
    
    tbody.innerHTML = "";

    if (produtos.length === 0) {
        emptyMsg.style.display = "block";
        return;
    }

    emptyMsg.style.display = "none";

    produtos.forEach(produto => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><strong>#${produto.codigo}</strong></td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade} un</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td class="actions-cell" style="justify-content: flex-end;">
                <button class="btn-sm" onclick="promptAtualizarValor(${produto.codigo})">Alterar Preço</button>
                <button class="btn-sm btn-qty" onclick="promptAtualizarQuantidade(${produto.codigo})">+ Entrada Estoque</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ==========================================
// 5. INICIALIZAÇÃO SEGURA DOS EVENTOS
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    
    // Liga o evento de envio do formulário com segurança
    const form = document.getElementById("produto-form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const alertDiv = document.getElementById("form-alert");
            const successDiv = document.getElementById("form-success");
            
            alertDiv.style.display = "none";
            successDiv.style.display = "none";

            const descValue = document.getElementById("descricao").value;
            const qtdValue = document.getElementById("quantidade").value;
            const valorValue = document.getElementById("valor").value;

            try {
                cadastrarProduto(descValue, qtdValue, valorValue);
                
                form.reset();
                successDiv.innerText = "Produto cadastrado com sucesso!";
                successDiv.style.display = "block";
                
                listarProdutos();
            } catch (error) {
                alertDiv.innerText = error.message;
                alertDiv.style.display = "block";
            }
        });
    }

    // Renderiza a tabela inicialmente vazia de forma correta
    listarProdutos();
});

// ==========================================
// 6. FUNÇÕES DOS BOTÕES DA TABELA (Globinho Window)
// ==========================================
function promptAtualizarValor(codigo) {
    const novoValorStr = prompt("Digite o novo valor para o produto:");
    if (novoValorStr === null) return; 

    try {
        atualizarValor(codigo, novoValorStr);
        listarProdutos();
    } catch (error) {
        alert("Erro ao atualizar preço: " + error.message);
    }
}

function promptAtualizarQuantidade(codigo) {
    const qtdSomarStr = prompt("Quantas unidades deseja adicionar ao estoque atual?");
    if (qtdSomarStr === null) return;

    try {
        atualizarQuantidade(codigo, qtdSomarStr);
        listarProdutos();
    } catch (error) {
        alert("Erro ao atualizar estoque: " + error.message);
    }
}