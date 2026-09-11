// Lista de produtos
let produtos = [];


// PEGAR O FORMULÁRIO
const formulario = document.getElementById("formProduto");


// QUANDO CLICAR EM CADASTRAR
formulario.addEventListener("submit", function(event) {

    // Impede a página de recarregar
    event.preventDefault();


    // Pegar os valores
    let codigo = document.getElementById("codigo").value.trim();

    let descricao = document.getElementById("descricao").value.trim();

    let quantidade = Number(
        document.getElementById("quantidade").value
    );

    // Aceita vírgula ou ponto
    let valorTexto = document.getElementById("valor").value;

    valorTexto = valorTexto.replace(",", ".");

    let valor = Number(valorTexto);


    // Verificar campos
    if (
        codigo === "" ||
        descricao === "" ||
        isNaN(quantidade) ||
        isNaN(valor)
    ) {

        alert("Preencha todos os campos corretamente!");

        return;
    }


    // Verificar quantidade
    if (quantidade < 0) {

        alert("A quantidade não pode ser negativa!");

        return;
    }


    // Verificar valor
    if (valor < 0) {

        alert("O valor não pode ser negativo!");

        return;
    }


    // Verificar código duplicado
    let existe = produtos.some(function(produto) {

        return produto.codigo === codigo;

    });


    if (existe) {

        alert("Esse código já está cadastrado!");

        return;
    }


    // Criar produto
    let produto = {

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };


    // Adicionar produto
    produtos.push(produto);


    // Mensagem
    alert("✅ Produto cadastrado com sucesso!");


    // Limpar formulário
    formulario.reset();


    // Atualizar tabela
    listarProdutos();

});


// ====================================
// LISTAR PRODUTOS
// ====================================

function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    let semProdutos = document.getElementById("semProdutos");

    let total = document.getElementById("total");


    // Limpar lista
    lista.innerHTML = "";


    // Atualizar contador
    total.textContent =
        produtos.length +
        (produtos.length === 1 ? " produto" : " produtos");


    // Se não tiver produto
    if (produtos.length === 0) {

        semProdutos.style.display = "block";

        return;
    }


    semProdutos.style.display = "none";


    // Criar linhas
    produtos.forEach(function(produto, indice) {

        let linha = document.createElement("tr");


        linha.innerHTML = `

            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>R$ ${produto.valor.toFixed(2).replace(".", ",")}</td>

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


// ====================================
// ALTERAR VALOR
// ====================================

function alterarValor(indice) {

    let produto = produtos[indice];


    let novoValor = prompt(
        "Digite o novo valor para " +
        produto.descricao +
        ":"
    );


    if (novoValor === null) {

        return;
    }


    // Aceita 49,99
    novoValor = novoValor.replace(",", ".");

    novoValor = Number(novoValor);


    if (isNaN(novoValor) || novoValor < 0) {

        alert("Digite um valor válido!");

        return;
    }


    produto.valor = novoValor;


    alert("✅ Valor alterado com sucesso!");


    listarProdutos();

}


// ====================================
// ALTERAR QUANTIDADE
// ====================================

function alterarQuantidade(indice) {

    let produto = produtos[indice];


    let novaQuantidade = prompt(
        "Digite a nova quantidade para " +
        produto.descricao +
        ":"
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


    alert("✅ Quantidade alterada com sucesso!");


    listarProdutos();

}


// Mostrar produtos ao abrir
listarProdutos();