// =====================================
// NINTENDO GAME SHOP
// SISTEMA DE CONTROLE DE ESTOQUE
// =====================================


// PRODUTOS QUE JÁ EXISTEM NA LOJA
let produtos = [
    {
        codigo: 1,
        descricao: "Super Mario Bros. Wonder",
        quantidade: 15,
        valor: 299.90
    },
    {
        codigo: 2,
        descricao: "Zelda Tears of the Kingdom",
        quantidade: 10,
        valor: 349.90
    },
    {
        codigo: 3,
        descricao: "Mario Kart 8 Deluxe",
        quantidade: 20,
        valor: 299.90
    },
    {
        codigo: 4,
        descricao: "Pokemon Scarlet",
        quantidade: 12,
        valor: 299.90
    },
    {
        codigo: 5,
        descricao: "Super Smash Bros Ultimate",
        quantidade: 8,
        valor: 299.90
    },
    {
        codigo: 6,
        descricao: "Animal Crossing New Horizons",
        quantidade: 18,
        valor: 299.90
    }
];


// PRÓXIMO CÓDIGO
let proximoCodigo = 7;


// =====================================
// MOSTRAR SEÇÃO
// =====================================

function mostrarSecao(id) {

    // Pega todas as seções
    const secoes = document.querySelectorAll(".secao");

    // Esconde todas
    secoes.forEach(function(secao) {
        secao.classList.add("escondido");
    });

    // Mostra a seção selecionada
    document.getElementById(id).classList.remove("escondido");

    // Se clicar em estoque, atualizar tabela
    if (id === "lista") {
        listarProdutos();
    }
}


// =====================================
// CADASTRAR JOGO
// =====================================

function cadastrarProduto() {

    const descricao = document.getElementById("descricao").value.trim();

    const quantidadeTexto =
        document.getElementById("quantidade").value;

    const valorTexto =
        document.getElementById("valor").value;

    const quantidade = Number(quantidadeTexto);
    const valor = Number(valorTexto);

    const mensagem =
        document.getElementById("mensagemCadastro");


    // VALIDAR NOME
    if (descricao.length < 5) {

        mensagem.textContent =
            "❌ O nome deve ter pelo menos 5 caracteres.";

        mensagem.style.color = "red";
        return;
    }


    // VALIDAR QUANTIDADE
    if (quantidadeTexto === "" || quantidade <= 0) {

        mensagem.textContent =
            "❌ A quantidade deve ser maior que zero.";

        mensagem.style.color = "red";
        return;
    }


    // VALIDAR PREÇO
    if (valorTexto === "" || valor < 0) {

        mensagem.textContent =
            "❌ O preço não pode ser negativo.";

        mensagem.style.color = "red";
        return;
    }


    // CRIAR NOVO PRODUTO
    const novoProduto = {
        codigo: proximoCodigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };


    // ADICIONAR PRODUTO NO ARRAY
    produtos.push(novoProduto);


    // AUMENTAR CÓDIGO
    proximoCodigo++;


    // MENSAGEM
    mensagem.textContent =
        "✅ Jogo cadastrado com sucesso! Código: " +
        novoProduto.codigo;

    mensagem.style.color = "green";


    // LIMPAR CAMPOS
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}


// =====================================
// LISTAR PRODUTOS
// =====================================

function listarProdutos() {

    const tabela =
        document.getElementById("tabelaProdutos");

    // Limpar tabela
    tabela.innerHTML = "";


    // Adicionar todos os jogos
    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        linha.innerHTML = 
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
        ;

        tabela.appendChild(linha);
    });
}


// =====================================
// ATUALIZAR PREÇO
// =====================================

function atualizarPreco() {

    const codigoTexto =
        document.getElementById("codigoPreco").value;

    const precoTexto =
        document.getElementById("novoPreco").value;

    const codigo = Number(codigoTexto);
    const novoPreco = Number(precoTexto);

    const mensagem =
        document.getElementById("mensagemPreco");


    // VALIDAR
    if (codigoTexto === "" || codigo <= 0) {

        mensagem.textContent =
            "❌ Digite um código válido.";

        mensagem.style.color = "red";
        return;
    }

    if (precoTexto === "" || novoPreco < 0) {

        mensagem.textContent =
            "❌ Digite um preço válido.";

        mensagem.style.color = "red";
        return;
    }


    // PROCURAR PRODUTO
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });


    // ATUALIZAR
    if (produto) {

        produto.valor = novoPreco;

        mensagem.textContent =
            "✅ Preço atualizado com sucesso!";

        mensagem.style.color = "green";

    } else {

        mensagem.textContent =
            "❌ Produto não encontrado.";

        mensagem.style.color = "red";
    }


    // LIMPAR
    document.getElementById("codigoPreco").value = "";
    document.getElementById("novoPreco").value = "";
}


// =====================================
// ADICIONAR ESTOQUE
// =====================================

function adicionarEstoque() {

    const codigoTexto =
        document.getElementById("codigoEstoque").value;

    const quantidadeTexto =
        document.getElementById("quantidadeAdicionar").value;

    const codigo = Number(codigoTexto);

    const quantidadeAdicionar =
        Number(quantidadeTexto);

    const mensagem =
        document.getElementById("mensagemEstoque");


    // VALIDAR CÓDIGO
    if (codigoTexto === "" || codigo <= 0) {

        mensagem.textContent =
            "❌ Digite um código válido.";

        mensagem.style.color = "red";
        return;
    }


    // VALIDAR QUANTIDADE
    if (
        quantidadeTexto === "" ||
        quantidadeAdicionar <= 0
    ) {

        mensagem.textContent =
            "❌ A quantidade deve ser maior que zero.";

        mensagem.style.color = "red";
        return;
    }


    // PROCURAR PRODUTO
    const produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });


    // ADICIONAR QUANTIDADE
    if (produto) {

        produto.quantidade += quantidadeAdicionar;

        mensagem.textContent =
            "✅ Estoque atualizado! Nova quantidade: " +
            produto.quantidade;

        mensagem.style.color = "green";

    } else {

        mensagem.textContent =
            "❌ Produto não encontrado.";

        mensagem.style.color = "red";
    }


    // LIMPAR CAMPOS
    document.getElementById("codigoEstoque").value = "";

    document.getElementById(
        "quantidadeAdicionar"
    ).value = "";
}


// =====================================
// INICIAR O SITE
// =====================================

document.addEventListener("DOMContentLoaded", function() {

    mostrarSecao("inicio");

});