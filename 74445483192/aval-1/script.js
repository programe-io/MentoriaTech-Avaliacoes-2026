let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres.");
    }
    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}

function listarProdutos() {
    const tabela = document.getElementById("tabelaProdutos");

    if (produtos.length === 0) {
        tabela.innerHTML = `<p class="erro">Nenhum produto cadastrado.</p>`;
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
    `;

    produtos.forEach(produto => {
        html += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${Number(produto.valor).toFixed(2)}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    tabela.innerHTML = html;
}

function atualizarValor(codigoProduto, novoValor) {
    const produto = produtos.find(function(produto) {
        return produto.codigo === codigoProduto;
    });

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }

    produto.valor = novoValor;

    listarProdutos();
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    const produto = produtos.find(function(produto) {
        return produto.codigo === codigoProduto;
    });

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que 0.");
    }

    produto.quantidade += novaQuantidade;

    listarProdutos();
}

function mostrarTela(telaEscolhida) {
    const telas = document.querySelectorAll(".tela");

    telas.forEach(function(tela) {
        tela.classList.add("escondido");
    });

    document.getElementById(telaEscolhida).classList.remove("escondido");

    if (telaEscolhida === "lista") {
        listarProdutos();
    }

    limparMensagem();
}

function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");

    mensagem.innerHTML = `
        <div class="${tipo}">
            ${texto}
        </div>
    `;

    setTimeout(function() {
        mensagem.innerHTML = "";
    }, 3000);
}

function limparMensagem() {
    document.getElementById("mensagem").innerHTML = "";
}

document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const descricao = document.getElementById("descricao").value.trim();
        const quantidade = Number(document.getElementById("quantidade").value);
        const valor = Number(document.getElementById("valor").value);

        cadastrarProduto(descricao, quantidade, valor);

        mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");

        document.getElementById("formCadastro").reset();

    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

document.getElementById("formValor").addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const codigo = Number(document.getElementById("codigoValor").value);
        const novoValor = Number(document.getElementById("novoValor").value);

        atualizarValor(codigo, novoValor);

        mostrarMensagem("Valor atualizado com sucesso!", "sucesso");

        document.getElementById("formValor").reset();

    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});

document.getElementById("formQuantidade").addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const codigo = Number(document.getElementById("codigoQuantidade").value);
        const novaQuantidade = Number(document.getElementById("novaQuantidade").value);

        atualizarQuantidade(codigo, novaQuantidade);

        mostrarMensagem("Quantidade atualizada com sucesso!", "sucesso");

        document.getElementById("formQuantidade").reset();

    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});