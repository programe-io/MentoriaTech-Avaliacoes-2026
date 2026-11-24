// ==========================================
// SISTEMA DE ESTOQUE
// ==========================================


// Array que armazenará os produtos
let produtos = [];


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto() {

    // Receber os dados
    let codigo = document
        .getElementById("codigo")
        .value
        .trim();

    let descricao = document
        .getElementById("descricao")
        .value
        .trim();

    let quantidade = parseInt(
        document.getElementById("quantidade").value
    );

    let valor = parseFloat(
        document.getElementById("valor").value
    );


    // ==========================================
    // VALIDAR DADOS
    // ==========================================

    if (codigo === "") {
        mostrarMensagem(
            "Digite o código do produto.",
            "erro"
        );
        return;
    }

    if (descricao === "") {
        mostrarMensagem(
            "Digite a descrição do produto.",
            "erro"
        );
        return;
    }

    if (isNaN(quantidade) || quantidade < 0) {
        mostrarMensagem(
            "Digite uma quantidade válida.",
            "erro"
        );
        return;
    }

    if (isNaN(valor) || valor < 0) {
        mostrarMensagem(
            "Digite um valor válido.",
            "erro"
        );
        return;
    }


    // ==========================================
    // VERIFICAR CÓDIGO DUPLICADO
    // ==========================================

    let produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {

        mostrarMensagem(
            "Já existe um produto com esse código.",
            "erro"
        );

        return;
    }


    // ==========================================
    // CRIAR NOVO PRODUTO
    // ==========================================

    let produto = {

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };


    // Adicionar produto ao array
    produtos.push(produto);


    // Limpar os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";


    // Atualizar lista
    listarProdutos();


    mostrarMensagem(
        "Produto cadastrado com sucesso!",
        "sucesso"
    );
}



// ==========================================
// LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    let lista = document.getElementById(
        "listaProdutos"
    );

    let total = document.getElementById(
        "totalProdutos"
    );


    // Limpar lista
    lista.innerHTML = "";


    // Atualizar quantidade de produtos
    total.textContent =
        produtos.length +
        (produtos.length === 1
            ? " produto"
            : " produtos");


    // Verificar se existem produtos
    if (produtos.length === 0) {

        lista.innerHTML = `
            <div class="mensagem-vazia">
                Nenhum produto cadastrado.
            </div>
        `;

        return;
    }


    // Criar os produtos na tela
    produtos.forEach(function(produto) {

        let elemento = document.createElement(
            "div"
        );

        elemento.classList.add("produto");


        elemento.innerHTML = `

            <div class="produto-item">

                <span class="titulo">
                    Código
                </span>

                <span class="valor codigo">
                    ${produto.codigo}
                </span>

            </div>


            <div class="produto-item">

                <span class="titulo">
                    Descrição
                </span>

                <span class="valor">
                    ${produto.descricao}
                </span>

            </div>


            <div class="produto-item">

                <span class="titulo">
                    Quantidade
                </span>

                <span class="valor quantidade">
                    ${produto.quantidade}
                </span>

            </div>


            <div class="produto-item">

                <span class="titulo">
                    Valor
                </span>

                <span class="valor preco">
                    ${formatarMoeda(produto.valor)}
                </span>

            </div>

        `;


        lista.appendChild(elemento);

    });
}



// ==========================================
// ALTERAR VALOR
// ==========================================

function alterarValor() {

    let codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    let novoValor = parseFloat(
        document.getElementById("novoValor").value
    );


    // Validar código
    if (codigo === "") {

        mostrarMensagem(
            "Digite o código do produto.",
            "erro"
        );

        return;
    }


    // Validar valor
    if (isNaN(novoValor) || novoValor < 0) {

        mostrarMensagem(
            "Digite um novo valor válido.",
            "erro"
        );

        return;
    }


    // Procurar produto
    let produto = produtos.find(
        produto => produto.codigo === codigo
    );


    // Verificar produto
    if (!produto) {

        mostrarMensagem(
            "Produto não encontrado.",
            "erro"
        );

        return;
    }


    // Alterar valor
    produto.valor = novoValor;


    // Atualizar lista
    listarProdutos();


    // Limpar campos
    document.getElementById(
        "codigoAlteracao"
    ).value = "";

    document.getElementById(
        "novoValor"
    ).value = "";


    mostrarMensagem(
        "Valor alterado com sucesso!",
        "sucesso"
    );
}



// ==========================================
// ALTERAR QUANTIDADE
// ==========================================

function alterarQuantidade() {

    let codigo = document
        .getElementById("codigoAlteracao")
        .value
        .trim();

    let novaQuantidade = parseInt(
        document.getElementById("novaQuantidade").value
    );


    // Validar código
    if (codigo === "") {

        mostrarMensagem(
            "Digite o código do produto.",
            "erro"
        );

        return;
    }


    // Validar quantidade
    if (
        isNaN(novaQuantidade) ||
        novaQuantidade < 0
    ) {

        mostrarMensagem(
            "Digite uma quantidade válida.",
            "erro"
        );

        return;
    }


    // Procurar produto
    let produto = produtos.find(
        produto => produto.codigo === codigo
    );


    // Verificar produto
    if (!produto) {

        mostrarMensagem(
            "Produto não encontrado.",
            "erro"
        );

        return;
    }


    // Alterar quantidade
    produto.quantidade = novaQuantidade;


    // Atualizar lista
    listarProdutos();


    // Limpar campos
    document.getElementById(
        "codigoAlteracao"
    ).value = "";

    document.getElementById(
        "novaQuantidade"
    ).value = "";


    mostrarMensagem(
        "Quantidade alterada com sucesso!",
        "sucesso"
    );
}



// ==========================================
// FORMATAR VALOR EM REAL
// ==========================================

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}



// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(texto, tipo) {

    let mensagem = document.getElementById(
        "mensagem"
    );


    mensagem.textContent = texto;

    mensagem.style.display = "block";


    if (tipo === "sucesso") {

        mensagem.style.backgroundColor =
            "#2e7d32";

    } else {

        mensagem.style.backgroundColor =
            "#c62828";

    }


    // Esconder depois de 3 segundos
    setTimeout(function() {

        mensagem.style.display = "none";

    }, 3000);
}



// ==========================================
// INICIAR SISTEMA
// ==========================================

listarProdutos();