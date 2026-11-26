
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("A descrição deve ter pelo menos 5 caracteres.");
    }

    if (quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }

    if (valor < 0) {
        throw new Error("O valor não pode ser negativo.");
    }
}

function cadastrarProduto() {
    try {
        let descricao = document.getElementById("descricao").value;
        let quantidade = Number(document.getElementById("quantidade").value);
        let valor = Number(document.getElementById("valor").value);

        validarProduto(descricao, quantidade, valor);

        let novoProduto = {
            codigo: produtos.length + 1,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        };

        produtos.push(novoProduto);

        alert("Produto cadastrado com sucesso!");

        listarProdutos();

        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

    } catch (erro) {
        alert(erro.message);
    }
}

function listarProdutos() {
    let lista = document.getElementById("produtos");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${produto.codigo}</p>
                <p><strong>Descrição:</strong> ${produto.descricao}</p>
                <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${produto.valor.toFixed(2)}</p>
            </div>
        `;
    });
}

function atualizarValor() {
    try {
        let codigo = Number(document.getElementById("codigo").value);
        let novoValor = Number(document.getElementById("novoValor").value);

        if (novoValor < 0 || document.getElementById("novoValor").value === "") {
            throw new Error("Informe um valor válido.");
        }

        const produto = produtos.find(prod => prod.codigo === codigo);

        if (produto) {
            produto.valor = novoValor;
            alert("Valor atualizado com sucesso!");
            listarProdutos();
        } else {
            throw new Error("Produto não encontrado.");
        }

    } catch (erro) {
        alert(erro.message);
    }
}

function atualizarQuantidade() {
    try {
        let codigo = Number(document.getElementById("codigoQuantidade").value);
        let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

        if (novaQuantidade < 1 || document.getElementById("novaQuantidade").value === "") {
            throw new Error("Informe uma quantidade válida.");
        }

        const produto = produtos.find(prod => prod.codigo === codigo);

        if (produto) {
            produto.quantidade += novaQuantidade;
            alert("Quantidade atualizada com sucesso!");
            listarProdutos();
        } else {
            throw new Error("Produto não encontrado.");
        }

    } catch (erro) {
        alert(erro.message);
    }
}
