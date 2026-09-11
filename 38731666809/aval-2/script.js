// ==========================================
// SISTEMA DE ESTOQUE
// ==========================================


// Recupera os produtos salvos no navegador
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];


// Elementos do HTML
const formProduto = document.getElementById("formProduto");

const codigoInput = document.getElementById("codigo");
const descricaoInput = document.getElementById("descricao");
const quantidadeInput = document.getElementById("quantidade");
const valorInput = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");
const semProdutos = document.getElementById("semProdutos");


// ==========================================
// SALVAR PRODUTOS NO LOCALSTORAGE
// ==========================================

function salvarProdutos() {

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}


// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(texto, tipo) {

    mensagem.innerHTML = `
        <div class="mensagem ${tipo}">
            ${texto}
        </div>
    `;

    setTimeout(() => {
        mensagem.innerHTML = "";
    }, 3000);

}


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

formProduto.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = codigoInput.value.trim();
    const descricao = descricaoInput.value.trim();

    const quantidade = Number(
        quantidadeInput.value
    );

    const valor = Number(
        valorInput.value
    );


    // Verifica se o código já existe
    const produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );


    if (produtoExistente) {

        mostrarMensagem(
            "Já existe um produto com esse código.",
            "erro"
        );

        return;
    }


    // Verifica valores
    if (quantidade < 0 || valor < 0) {

        mostrarMensagem(
            "Quantidade e valor não podem ser negativos.",
            "erro"
        );

        return;
    }


    // Cria o novo produto
    const novoProduto = {

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };


    // Adiciona o produto na lista
    produtos.push(novoProduto);


    // Salva no navegador
    salvarProdutos();


    // Atualiza a tabela
    listarProdutos();


    // Limpa o formulário
    formProduto.reset();


    mostrarMensagem(
        "Produto cadastrado com sucesso!",
        "sucesso"
    );

});


// ==========================================
// LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    listaProdutos.innerHTML = "";


    // Atualiza contador
    contador.textContent =
        `${produtos.length} ${
            produtos.length === 1
                ? "produto"
                : "produtos"
        }`;


    // Verifica se existem produtos
    if (produtos.length === 0) {

        semProdutos.style.display = "block";

        return;

    }


    semProdutos.style.display = "none";


    // Percorre os produtos
    produtos.forEach((produto, index) => {

        const linha = document.createElement("tr");


        linha.innerHTML = `

            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>
                R$ ${produto.valor.toFixed(2)}
            </td>

            <td>

                <div class="acoes">

                    <button
                        class="btn btn-valor"
                        onclick="alterarValor(${index})"
                    >
                        Alterar valor
                    </button>

                    <button
                        class="btn btn-quantidade"
                        onclick="alterarQuantidade(${index})"
                    >
                        Alterar quantidade
                    </button>

                    <button
                        class="btn btn-excluir"
                        onclick="excluirProduto(${index})"
                    >
                        Excluir
                    </button>

                </div>

            </td>

        `;


        listaProdutos.appendChild(linha);

    });

}


// ==========================================
// ALTERAR VALOR
// ==========================================

function alterarValor(index) {

    const produto = produtos[index];


    const novoValor = prompt(
        `Digite o novo valor para "${produto.descricao}":`,
        produto.valor.toFixed(2)
    );


    // Usuário cancelou
    if (novoValor === null) {
        return;
    }


    const valor = Number(novoValor);


    if (isNaN(valor) || valor < 0) {

        alert(
            "Digite um valor válido."
        );

        return;
    }


    // Atualiza o valor
    produto.valor = valor;


    salvarProdutos();

    listarProdutos();


    mostrarMensagem(
        "Valor alterado com sucesso!",
        "sucesso"
    );

}


// ==========================================
// ALTERAR QUANTIDADE
// ==========================================

function alterarQuantidade(index) {

    const produto = produtos[index];


    const novaQuantidade = prompt(
        `Digite a nova quantidade para "${produto.descricao}":`,
        produto.quantidade
    );


    // Usuário cancelou
    if (novaQuantidade === null) {
        return;
    }


    const quantidade = Number(
        novaQuantidade
    );


    if (
        isNaN(quantidade) ||
        quantidade < 0 ||
        !Number.isInteger(quantidade)
    ) {

        alert(
            "Digite uma quantidade inteira válida."
        );

        return;
    }


    // Atualiza quantidade
    produto.quantidade = quantidade;


    salvarProdutos();

    listarProdutos();


    mostrarMensagem(
        "Quantidade alterada com sucesso!",
        "sucesso"
    );

}


// ==========================================
// EXCLUIR PRODUTO
// ==========================================

function excluirProduto(index) {

    const produto = produtos[index];


    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.descricao}"?`
    );


    if (!confirmar) {
        return;
    }


    produtos.splice(index, 1);


    salvarProdutos();

    listarProdutos();


    mostrarMensagem(
        "Produto excluído com sucesso!",
        "sucesso"
    );

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

listarProdutos();
