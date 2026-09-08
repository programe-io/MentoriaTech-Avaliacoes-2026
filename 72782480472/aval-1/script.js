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
const semProdutos = document.getElementById("semProdutos");
const totalProdutos = document.getElementById("totalProdutos");


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

formProduto.addEventListener("submit", function (event) {

    event.preventDefault();

    const codigo = codigoInput.value.trim();
    const descricao = descricaoInput.value.trim();
    const quantidade = Number(quantidadeInput.value);
    const valor = Number(valorInput.value);


    // Validação
    if (codigo === "" || descricao === "") {
        mostrarMensagem("Preencha todos os campos.", "erro");
        return;
    }

    if (quantidade < 0 || valor < 0) {
        mostrarMensagem(
            "Quantidade e valor não podem ser negativos.",
            "erro"
        );
        return;
    }


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


    // Cria o produto
    const novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };


    // Adiciona ao array
    produtos.push(novoProduto);


    // Salva no localStorage
    salvarProdutos();


    // Atualiza a tabela
    mostrarProdutos();


    // Limpa o formulário
    formProduto.reset();


    mostrarMensagem(
        "Produto cadastrado com sucesso!",
        "sucesso"
    );
});


// ==========================================
// MOSTRAR PRODUTOS
// ==========================================

function mostrarProdutos() {

    listaProdutos.innerHTML = "";


    // Atualiza quantidade de produtos
    totalProdutos.textContent =
        produtos.length === 1
            ? "1 produto"
            : `${produtos.length} produtos`;


    // Se não houver produtos
    if (produtos.length === 0) {

        semProdutos.classList.remove("oculto");

        return;
    }


    semProdutos.classList.add("oculto");


    // Percorre os produtos
    produtos.forEach((produto, index) => {

        const linha = document.createElement("tr");


        linha.innerHTML = `
            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>${formatarMoeda(produto.valor)}</td>

            <td>
                <div class="acoes">

                    <button
                        class="btn-acao btn-valor"
                        onclick="alterarValor(${index})"
                    >
                        Alterar valor
                    </button>

                    <button
                        class="btn-acao btn-quantidade"
                        onclick="alterarQuantidade(${index})"
                    >
                        Alterar quantidade
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


    // Validação
    if (novoValor.trim() === "" || isNaN(valor) || valor < 0) {

        alert("Digite um valor válido.");

        return;
    }


    // Atualiza o valor
    produto.valor = valor;


    // Salva
    salvarProdutos();


    // Atualiza tela
    mostrarProdutos();


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


    const quantidade = Number(novaQuantidade);


    // Validação
    if (
        novaQuantidade.trim() === "" ||
        isNaN(quantidade) ||
        quantidade < 0 ||
        !Number.isInteger(quantidade)
    ) {

        alert(
            "Digite uma quantidade válida. " +
            "A quantidade deve ser um número inteiro."
        );

        return;
    }


    // Atualiza quantidade
    produto.quantidade = quantidade;


    // Salva
    salvarProdutos();


    // Atualiza tela
    mostrarProdutos();


    mostrarMensagem(
        "Quantidade alterada com sucesso!",
        "sucesso"
    );
}


// ==========================================
// SALVAR NO LOCAL STORAGE
// ==========================================

function salvarProdutos() {

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );
}


// ==========================================
// FORMATAR VALOR EM REAIS
// ==========================================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;


    mensagem.className =
        tipo === "sucesso"
            ? "mensagem-sucesso"
            : "mensagem-erro";


    // Remove a mensagem depois de 3 segundos
    setTimeout(() => {
        mensagem.textContent = "";
        mensagem.className = "";
    }, 3000);
}


// ==========================================
// CARREGAR PRODUTOS AO ABRIR A PÁGINA
// ==========================================

mostrarProdutos();
