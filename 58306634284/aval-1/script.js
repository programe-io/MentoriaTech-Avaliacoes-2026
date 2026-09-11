/*
SISTEMA DE ESTOQUE

```
Cada produto possui:
- código
- descrição
- quantidade
- valor
```

*/

let produtos = [];

// Elementos HTML
const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const estoqueVazio = document.getElementById("estoqueVazio");
const totalProdutos = document.getElementById("totalProdutos");

// ========================================
// CADASTRAR PRODUTO
// ========================================

formProduto.addEventListener("submit", function (event) {

```
event.preventDefault();

const codigo = document.getElementById("codigo").value.trim();
const descricao = document.getElementById("descricao").value.trim();
const quantidade = Number(document.getElementById("quantidade").value);
const valor = Number(document.getElementById("valor").value);


// Verifica se o código já existe
const produtoExistente = produtos.find(
    produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
);

if (produtoExistente) {
    mostrarMensagem(
        "Já existe um produto cadastrado com esse código.",
        "erro"
    );

    return;
}


// Cria o produto
const produto = {
    codigo: codigo,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
};


// Adiciona ao estoque
produtos.push(produto);


// Atualiza a tabela
listarProdutos();


// Limpa o formulário
formProduto.reset();


mostrarMensagem(
    "Produto cadastrado com sucesso!",
    "sucesso"
);
```

});

// ========================================
// LISTAR PRODUTOS
// ========================================

function listarProdutos() {

```
listaProdutos.innerHTML = "";


// Se não houver produtos
if (produtos.length === 0) {

    estoqueVazio.style.display = "block";

    totalProdutos.textContent =
        "0 produto(s) cadastrado(s)";

    return;
}


estoqueVazio.style.display = "none";


totalProdutos.textContent =
    `${produtos.length} produto(s) cadastrado(s)`;


produtos.forEach((produto, indice) => {

    const linha = document.createElement("tr");


    linha.innerHTML = `
        <td>${produto.codigo}</td>

        <td>${produto.descricao}</td>

        <td>${produto.quantidade}</td>

        <td>${formatarMoeda(produto.valor)}</td>

        <td class="acoes">

            <button
                class="btn btn-editar"
                onclick="alterarValor(${indice})">
                Alterar valor
            </button>

            <button
                class="btn btn-quantidade"
                onclick="alterarQuantidade(${indice})">
                Alterar quantidade
            </button>

        </td>
    `;


    listaProdutos.appendChild(linha);
});
```

}

// ========================================
// ALTERAR VALOR
// ========================================

function alterarValor(indice) {

```
const produto = produtos[indice];


const novoValor = prompt(
    `Digite o novo valor para "${produto.descricao}":`,
    produto.valor.toFixed(2)
);


// Cancelou a operação
if (novoValor === null) {
    return;
}


const valor = Number(novoValor);


if (isNaN(valor) || valor < 0) {

    mostrarMensagem(
        "Digite um valor válido.",
        "erro"
    );

    return;
}


produto.valor = valor;


listarProdutos();


mostrarMensagem(
    "Valor alterado com sucesso!",
    "sucesso"
);
```

}

// ========================================
// ALTERAR QUANTIDADE
// ========================================

function alterarQuantidade(indice) {

```
const produto = produtos[indice];


const novaQuantidade = prompt(
    `Digite a nova quantidade para "${produto.descricao}":`,
    produto.quantidade
);


// Cancelou a operação
if (novaQuantidade === null) {
    return;
}


const quantidade = Number(novaQuantidade);


if (
    isNaN(quantidade) ||
    quantidade < 0 ||
    !Number.isInteger(quantidade)
) {

    mostrarMensagem(
        "Digite uma quantidade inteira válida.",
        "erro"
    );

    return;
}


produto.quantidade = quantidade;


listarProdutos();


mostrarMensagem(
    "Quantidade alterada com sucesso!",
    "sucesso"
);
```

}

// ========================================
// FORMATAR VALOR EM REAL
// ========================================

function formatarMoeda(valor) {

```
return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
});
```

}

// ========================================
// EXIBIR MENSAGEM
// ========================================

function mostrarMensagem(texto, tipo) {

```
mensagem.textContent = texto;

mensagem.className = `mensagem ${tipo}`;


// Remove a mensagem depois de 3 segundos
setTimeout(() => {

    mensagem.textContent = "";
    mensagem.className = "mensagem";

}, 3000);
```

}

// ========================================
// INICIALIZAÇÃO
// ========================================

listarProdutos();
