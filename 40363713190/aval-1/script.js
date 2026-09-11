// ========================================
// SISTEMA DE ESTOQUE
// ========================================

// Array que armazenará os produtos
let produtos = [];


// ========================================
// ELEMENTOS DO HTML
// ========================================

const formProduto = document.getElementById("formProduto");

const codigoInput = document.getElementById("codigo");
const descricaoInput = document.getElementById("descricao");
const quantidadeInput = document.getElementById("quantidade");
const valorInput = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");
const semProdutos = document.getElementById("semProdutos");


// ========================================
// CADASTRAR PRODUTO
// ========================================

formProduto.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const codigo = codigoInput.value.trim();
    const descricao = descricaoInput.value.trim();
    const quantidade = Number(quantidadeInput.value);
    const valor = Number(valorInput.value);


    // Verifica se o código já existe
    const produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );


    if (produtoExistente) {

        mostrarMensagem(
            "Já existe um produto com esse código!",
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


    // Adiciona o produto ao array
    produtos.push(produto);


    // Atualiza a tabela
    listarProdutos();


    // Limpa o formulário
    formProduto.reset();


    mostrarMensagem(
        "Produto cadastrado com sucesso!",
        "sucesso"
    );

});


// ========================================
// LISTAR PRODUTOS
// ========================================

function listarProdutos() {

    // Limpa a tabela
    listaProdutos.innerHTML = "";


    // Atualiza o contador
    if (produtos.length === 1) {
        contador.textContent = "1 produto";
    } else {
        contador.textContent = `${produtos.length} produtos`;
    }


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
                R$ ${produto.valor.toFixed(2).replace(".", ",")}
            </td>

            <td>

                <div class="acoes">

                    <button
                        class="btn btn-editar"
                        onclick="alterarValor(${index})">
                        Alterar Valor
                    </button>

                    <button
                        class="btn btn-editar"
                        onclick="alterarQuantidade(${index})">
                        Alterar Quantidade
                    </button>

                    <button
                        class="btn btn-excluir"
                        onclick="excluirProduto(${index})">
                        Excluir
                    </button>

                </div>

            </td>
        `;


        listaProdutos.appendChild(linha);

    });

}


// ========================================
// ALTERAR VALOR
// ========================================

function alterarValor(index) {

    const produto = produtos[index];


    const novoValor = prompt(
        `Digite o novo valor para "${produto.descricao}":`,
        produto.valor
    );


    // Se o usuário cancelar
    if (novoValor === null) {
        return;
    }


    const valor = Number(novoValor);


    if (isNaN(valor) || valor < 0) {

        mostrarMensagem(
            "Digite um valor válido!",
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

}


// ========================================
// ALTERAR QUANTIDADE
// ========================================

function alterarQuantidade(index) {

    const produto = produtos[index];


    const novaQuantidade = prompt(
        `Digite a nova quantidade para "${produto.descricao}":`,
        produto.quantidade
    );


    // Se o usuário cancelar
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
            "Digite uma quantidade inteira válida!",
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

}


// ========================================
// EXCLUIR PRODUTO
// ========================================

function excluirProduto(index) {

    const produto = produtos[index];


    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.descricao}"?`
    );


    if (confirmar) {

        produtos.splice(index, 1);

        listarProdutos();

        mostrarMensagem(
            "Produto excluído com sucesso!",
            "sucesso"
        );

    }

}


// ========================================
// MOSTRAR MENSAGEM
// ========================================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = tipo;


    // Remove a mensagem depois de 3 segundos
    setTimeout(() => {

        mensagem.textContent = "";
        mensagem.className = "";

    }, 3000);

}


// ========================================
// INICIALIZAÇÃO
// ========================================

listarProdutos();
