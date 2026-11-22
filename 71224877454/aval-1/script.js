
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
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

        listarProdutos();

        alert("Produto cadastrado com sucesso!");

    } catch (erro) {
        alert(erro.message);
    }
}

function listarProdutos() {
    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        lista.innerHTML += `
            <div class="produto">
                <p>Código: ${produto.codigo}</p>
                <p>Descrição: ${produto.descricao}</p>
                <p>Quantidade: ${produto.quantidade}</p>
                <p>Valor: R$ ${produto.valor.toFixed(2)}</p>
            </div>
        `;
    });
}

function atualizarValor() {
    let codigo = Number(document.getElementById("codigoValor").value);
    let novoValor = Number(document.getElementById("novoValor").value);

    if (novoValor < 0) {
        alert("Valor deve ser maior ou igual a zero");
        return;
    }

    let produto = produtos.find(prod => prod.codigo === codigo);

    if (produto) {
        produto.valor = novoValor;
        listarProdutos();
        alert("Valor atualizado com sucesso!");
    } else {
        alert("Produto não encontrado");
    }
}

function atualizarQuantidade() {
    let codigo = Number(document.getElementById("codigoQuantidade").value);
    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    if (novaQuantidade < 1) {
        alert("Quantidade deve ser maior que zero");
        return;
    }

    let produto = produtos.find(prod => prod.codigo === codigo);

    if (produto) {
        produto.quantidade += novaQuantidade;
        listarProdutos();
        alert("Quantidade atualizada com sucesso!");
    } else {
        alert("Produto não encontrado");
    }
}
