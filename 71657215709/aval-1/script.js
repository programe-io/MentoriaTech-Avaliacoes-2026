```javascript
let produtos = [];


// Validar produto
function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        console.log("Descrição deve ter no mínimo 5 caracteres!");
        return false;
    }

    if (quantidade < 1) {
        console.log("Quantidade deve ser maior que zero!");
        return false;
    }

    if (valor < 0) {
        console.log("Valor deve ser maior ou igual a zero!");
        return false;
    }

    return true;
}


// Cadastrar produto
function cadastrarProduto() {

    let descricao = document.getElementById("descricao").value;

    let quantidade = Number(
        document.getElementById("quantidade").value
    );

    let valor = Number(
        document.getElementById("valor").value
    );


    if (!validarProduto(descricao, quantidade, valor)) {

        document.getElementById("mensagem").innerHTML =
            "Verifique os dados informados!";

        return;
    }


    let novoProduto = {

        codigo: produtos.length + 1,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor
    };


    produtos.push(novoProduto);


    document.getElementById("mensagem").innerHTML =
        "Produto cadastrado com sucesso!";


    listarProdutos();


    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}


// Listar produtos
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";


    produtos.forEach(function(produto) {

        lista.innerHTML += `

            <div class="produto">

                <strong>Código:</strong>
                ${produto.codigo}

                <br>

                <strong>Descrição:</strong>
                ${produto.descricao}

                <br>

                <strong>Quantidade:</strong>
                ${produto.quantidade}

                <br>

                <strong>Valor:</strong>
                R$ ${produto.valor.toFixed(2)}

            </div>

        `;
    });
}


// Atualizar valor
function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {

        console.log("Valor deve ser maior ou igual a zero!");

        return;
    }


    const produto = produtos.find(
        produto => produto.codigo === codigoProduto
    );


    if (produto) {

        produto.valor = novoValor;

        console.log("Valor atualizado com sucesso!");

        listarProdutos();

    } else {

        console.log("Produto não encontrado!");
    }
}
```
