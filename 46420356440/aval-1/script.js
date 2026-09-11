```javascript
// Lista que armazenará os produtos
let produtos = [];


// CADASTRAR PRODUTO
function cadastrarProduto() {

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar se os campos foram preenchidos
    if (codigo === "" || descricao === "" || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar se o código já existe
    const produtoExiste = produtos.some(function(produto) {
        return produto.codigo === codigo;
    });

    if (produtoExiste) {
        alert("Já existe um produto com esse código!");
        return;
    }

    // Criar produto
    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adicionar produto à lista
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpar campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    // Atualizar tabela
    listarProdutos();
}


// LISTAR PRODUTOS
function listarProdutos() {

    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    produtos.forEach(function(produto, indice) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>R$ ${produto.valor.toFixed(2)}</td>

            <td>
                <button 
                    class="btn-valor"
                    onclick="alterarValor(${indice})">
                    Alterar valor
                </button>

                <button 
                    class="btn-quantidade"
                    onclick="alterarQuantidade(${indice})">
                    Alterar quantidade
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });
}


// ALTERAR VALOR
function alterarValor(indice) {

    const novoValor = prompt(
        "Digite o novo valor do produto:"
    );

    if (novoValor === null) {
        return;
    }

    const valor = Number(novoValor);

    if (valor < 0 || isNaN(valor)) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[indice].valor = valor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}


// ALTERAR QUANTIDADE
function alterarQuantidade(indice) {

    const novaQuantidade = prompt(
        "Digite a nova quantidade do produto:"
    );

    if (novaQuantidade === null) {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (quantidade < 0 || isNaN(quantidade)) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[indice].quantidade = quantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}


// Mostrar a lista inicialmente
listarProdutos();
```
