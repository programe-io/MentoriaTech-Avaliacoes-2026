// Lista inicial de livros da loja
let produtos = [
    {
        codigo: "L001",
        descricao: "A Hipótese do Amor",
        quantidade: 1,
        valor: 59.90
    },
    {
        codigo: "L002",
        descricao: "Amor Teoricamente",
        quantidade: 1,
        valor: 53.50
    },
    {
        codigo: "L003",
        descricao: "A Razão do Amor (Edição especial)",
        quantidade: 1,
        valor: 119.00
    },
    {
        codigo: "L004",
        descricao: "Noiva",
        quantidade: 1,
        valor: 60.00
    },
    {
        codigo: "L005",
        descricao: "Xeque-Mate",
        quantidade: 1,
        valor: 55.00
    },
    {
        codigo: "L006",
        descricao: "No Fundo é Amor",
        quantidade: 1,
        valor: 49.90
    },
    {
        codigo: "L007",
        descricao: "Não é amor",
        quantidade: 1,
        valor: 57.00
    }
];


// Função para mostrar mensagens
function mostrarMensagem(texto, tipo) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;

    mensagem.className = tipo;

    setTimeout(function () {

        mensagem.className = "";

        mensagem.textContent = "";

    }, 3000);
}


// Formata o valor para Real brasileiro
function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


// Cadastrar produto
function cadastrarProduto() {

    const codigo =
        document.getElementById("codigo").value.trim();

    const descricao =
        document.getElementById("descricao").value.trim();

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const valor =
        Number(document.getElementById("valor").value);


    // Verificar se os campos foram preenchidos
    if (
        codigo === "" ||
        descricao === "" ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === ""
    ) {

        mostrarMensagem(
            "Preencha todos os campos!",
            "erro"
        );

        return;
    }


    // Verificar valores inválidos ou negativos
    if (
        !Number.isInteger(quantidade) ||
        !Number.isFinite(valor) ||
        quantidade < 0 ||
        valor < 0
    ) {

        mostrarMensagem(
            "Digite uma quantidade inteira e um valor válidos!",
            "erro"
        );

        return;
    }


    // Verificar se o código já existe
    const produtoExistente = produtos.find(function(produto) {

        return produto.codigo === codigo;

    });


    if (produtoExistente) {

        mostrarMensagem(
            "Já existe um produto com esse código!",
            "erro"
        );

        return;
    }


    // Criar o produto
    const produto = {

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };


    // Adicionar produto na lista
    produtos.push(produto);


    // Atualizar tabela
    listarProdutos();


    // Limpar campos
    limparCampos();


    mostrarMensagem(
        "Produto cadastrado com sucesso!",
        "sucesso"
    );
}


// Listar produtos
function listarProdutos() {

    const lista =
        document.getElementById("listaProdutos");

    lista.innerHTML = "";


    let valorTotal = 0;


    produtos.forEach(function(produto, index) {

        const totalProduto =
            produto.quantidade * produto.valor;


        valorTotal += totalProduto;


        const linha =
            document.createElement("tr");


        linha.innerHTML = `

            <td>${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.quantidade}</td>

            <td>${formatarMoeda(produto.valor)}</td>

            <td>${formatarMoeda(totalProduto)}</td>

            <td>
                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${index})">

                    Excluir

                </button>
            </td>

        `;


        lista.appendChild(linha);

    });


    document.getElementById("valorTotal").textContent =
        formatarMoeda(valorTotal);
}


// Alterar valor
function alterarValor() {

    const codigo =
        prompt("Digite o código do produto:");


    if (codigo === null || codigo.trim() === "") {

        return;

    }


    const produto =
        produtos.find(function(produto) {

            return produto.codigo === codigo.trim();

        });


    if (!produto) {

        mostrarMensagem(
            "Produto não encontrado!",
            "erro"
        );

        return;
    }


    const novoValor =
        prompt(
            "Digite o novo valor do produto:"
        );


    if (novoValor === null || novoValor.trim() === "") {

        return;

    }


    const valor =
        Number(novoValor.replace(",", "."));


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


// Alterar quantidade
function alterarQuantidade() {

    const codigo =
        prompt("Digite o código do produto:");


    if (codigo === null || codigo.trim() === "") {

        return;

    }


    const produto =
        produtos.find(function(produto) {

            return produto.codigo === codigo.trim();

        });


    if (!produto) {

        mostrarMensagem(
            "Produto não encontrado!",
            "erro"
        );

        return;
    }


    const novaQuantidade =
        prompt(
            "Digite a nova quantidade:"
        );


    if (
        novaQuantidade === null ||
        novaQuantidade.trim() === ""
    ) {

        return;

    }


    const quantidade =
        Number(novaQuantidade);


    if (
        !Number.isInteger(quantidade) ||
        quantidade < 0
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


// Excluir produto
function excluirProduto(index) {

    const produto = produtos[index];


    const confirmar =
        confirm(
            "Deseja excluir o produto " +
            produto.descricao +
            "?"
        );


    if (!confirmar) {

        return;

    }


    produtos.splice(index, 1);


    listarProdutos();


    mostrarMensagem(
        "Produto excluído com sucesso!",
        "sucesso"
    );
}


// Limpar campos
function limparCampos() {

    document.getElementById("codigo").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("quantidade").value = "";

    document.getElementById("valor").value = "";

}


// Mostrar os produtos ao carregar a página
listarProdutos();