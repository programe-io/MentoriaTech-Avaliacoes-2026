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
        'codigo': produtos.length + 1,
        'descricao': descricao,
        'quantidade': quantidade,
        'valor': valor
    };
    produtos.push(novoProduto);
    renderizarTabela(); // Atualiza a tela
}

// Atualiza o HTML com a lista de produtos
function renderizarTabela() {
    const tabelaBody = document.getElementById("tabela-produtos");
    tabelaBody.innerHTML = "";

    produtos.forEach(prod => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${prod.codigo}</td>
            <td>${prod.descricao}</td>
            <td>${prod.quantidade}</td>
            <td>R$ ${prod.valor.toFixed(2)}</td>
        `;
        tabelaBody.appendChild(tr);
    });
}

// Evento de submissão do formulário
document.getElementById("form-produto").addEventListener("submit", function(event) {
    event.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);
    const msgDiv = document.getElementById("mensagem");

    try {
        cadastrarProduto(descricao, quantidade, valor);
        
        // Exibe mensagem de sucesso
        msgDiv.className = "mensagem sucesso";
        msgDiv.innerText = "Produto cadastrado com sucesso!";
        
        // Limpa o formulário
        this.reset();
    } catch (erro) {
        // Exibe mensagem de erro capturada pelo throw new Error
        msgDiv.className = "mensagem erro";
        msgDiv.innerText = erro.message;
    }
});

// Cadastros iniciais para teste
cadastrarProduto("Cadeira gamer Husky", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);
cadastrarProduto("Headset gamer Redragon", 27, 360.00);
cadastrarProduto("Teclado gamer mecânico Machenike", 15, 213.00);