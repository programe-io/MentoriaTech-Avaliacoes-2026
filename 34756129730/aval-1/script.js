```javascript
// Lista que armazenará os produtos
let produtos = [];


// CADASTRAR PRODUTO
function cadastrarProduto() {

    let codigo = document.getElementById("codigo").value.trim();
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);


    // Verificar se os campos estão preenchidos
    if (
        codigo === "" ||
        descricao === "" ||
        isNaN(quantidade) ||
        isNaN(valor)
    ) {
        alert("Preencha todos os campos!");
        return;
    }


    // Verificar se o código já existe
    let produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {
        alert("Já existe um produto com esse código!");
        return;
    }


    // Criar produto
    let produto = {
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

    let lista = document.getElementById("listaProdutos");
    let mensagem = document.getElementById("mensagemVazia");
    let total = document.getElementById("totalProdutos");


    // Limpar tabela
    lista.innerHTML = "";


    // Mostrar quantidade de produtos
    total.textContent = produtos.length + 
        (produtos.length === 1 ? " produto" : " produtos");


    // Verificar se está vazio
    if (produtos.length === 0) {
        mensagem.style.display = "block";
        return;
    }


    mensagem.style.display = "none";


    // Mostrar cada produto
    produtos.forEach((produto, indice) => {

        let linha = document.createElement("tr");


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

    let produto = produtos[indice];


    let novoValor = prompt(
        "Digite o novo valor do produto " +
        produto.descricao + ":"
    );


    if (novoValor === null) {
        return;
    }


    novoValor = Number(novoValor);


    if (isNaN(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }


    produto.valor = novoValor;


    alert("Valor alterado com sucesso!");


    listarProdutos();
}



// ALTERAR QUANTIDADE
function alterarQuantidade(indice) {

    let produto = produtos[indice];


    let novaQuantidade = prompt(
        "Digite a nova quantidade do produto " +
        produto.descricao + ":"
    );


    if (novaQuantidade === null) {
        return;
    }


    novaQuantidade = Number(novaQuantidade);


    if (
        isNaN(novaQuantidade) ||
        novaQuantidade < 0 ||
        !Number.isInteger(novaQuantidade)
    ) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }


    produto.quantidade = novaQuantidade;


    alert("Quantidade alterada com sucesso!");


    listarProdutos();
}


// Mostrar a lista ao abrir a página
listarProdutos();
```
