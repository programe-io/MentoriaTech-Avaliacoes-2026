let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
    }
    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);
    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    };
    produtos.push(novoProduto);
}

function listarProdutos() {
    console.log(produtos);
    atualizarTabelaVisual();
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
    const produto = produtos.find((prod) => prod.codigo === codigoProduto);
    if (produto) {
        produto.valor = Number(novoValor);
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    const produto = produtos.find((prod) => prod.codigo === codigoProduto);
    if (produto) {
        produto.quantidade = produto.quantidade + Number(novaQuantidade);
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Função auxiliar para renderizar a tabela no HTML
function atualizarTabelaVisual() {
    const container = document.getElementById("lista-produtos");
    
    if (produtos.length === 0) {
        container.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>Qtd</th>
                    <th>Valor (R$)</th>
                </tr>
            </thead>
            <tbody>
    `;

    produtos.forEach(prod => {
        html += `
            <tr>
                <td>${prod.codigo}</td>
                <td>${prod.descricao}</td>
                <td>${prod.quantidade}</td>
                <td>R$ ${prod.valor.toFixed(2)}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// Integração com o formulário do HTML
document.getElementById("form-cadastrar").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const descricao = document.getElementById("descricao").value;
    const quantidade = document.getElementById("quantidade").value;
    const valor = document.getElementById("valor").value;
    const msgErro = document.getElementById("mensagem-erro");

    msgErro.textContent = "";

    try {
        cadastrarProduto(descricao, quantidade, valor);
        listarProdutos();
        this.reset(); // Limpa o formulário
        document.getElementById("quantidade").value = 1;
        document.getElementById("valor").value = 0;
    } catch (error) {
        msgErro.textContent = error.message;
    }
});

// Exemplo inicial de cadastro válido (corrigido o erro do microfone que faltava parâmetros)
try {
    cadastrarProduto("Cadeira gamer", 12, 699);
    cadastrarProduto("Microfone gamer", 5, 250);
    listarProdutos();
} catch (e) {
    console.error(e.message);
}