// ======================================
// CÓDIGOS DE ACESSO
// ======================================

const codigosValidos = [
    "Jonathan",
    "Joseph",
    "Jotaro",
    "Josuke",
    "Giorno",
    "Jolyne",
    "Johnny",
    "Gappy",
    "Jodio"
];


// ======================================
// CARREGAR ESTOQUE
// ======================================

let estoque =
    JSON.parse(
        localStorage.getItem("blackMarketInventory")
    ) || [];


// ======================================
// SALVAR ESTOQUE
// ======================================

function salvarEstoque() {

    localStorage.setItem(
        "blackMarketInventory",
        JSON.stringify(estoque)
    );

}


// ======================================
// AUTENTICAÇÃO
// ======================================

function validarAcesso() {

    const senha =
        document
            .getElementById("senha")
            .value
            .trim();


    const mensagem =
        document
            .getElementById("mensagemLogin");


    if (codigosValidos.includes(senha)) {

        mensagem.textContent =
            "> ACCESS GRANTED :: " +
            senha.toUpperCase();

        mensagem.className =
            "message success";


        setTimeout(() => {

            document
                .getElementById("loginScreen")
                .classList
                .add("hidden");


            document
                .getElementById("menuScreen")
                .classList
                .remove("hidden");

        }, 800);


    } else {

        mensagem.textContent =
            "> ACCESS DENIED :: UNKNOWN IDENTITY";

        mensagem.className =
            "message error";

    }

}


// ======================================
// GERAR CÓDIGO ALEATÓRIO
// ======================================

function gerarCodigo() {

    const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    let codigo;


    do {

        codigo = "";


        for (let i = 0; i < 8; i++) {

            const indice =
                Math.floor(
                    Math.random() *
                    caracteres.length
                );


            codigo += caracteres[indice];

        }

    } while (

        estoque.some(
            produto =>
                produto.codigo === codigo
        )

    );


    return codigo;

}


// ======================================
// CADASTRAR ITEM
// ======================================

function cadastrarItem() {

    const nome =
        document
            .getElementById("nome")
            .value
            .trim();


    const quantidade =
        Number(
            document
                .getElementById("quantidade")
                .value
        );


    const valor =
        Number(
            document
                .getElementById("valor")
                .value
        );


    const mensagem =
        document
            .getElementById("mensagemCadastro");


    // -----------------------------
    // VALIDAR NOME
    // -----------------------------

    if (nome === "") {

        mensagem.textContent =
            "> ERROR :: ITEM DESIGNATION REQUIRED";

        mensagem.className =
            "message error";

        return;

    }


    // -----------------------------
    // VALIDAR QUANTIDADE
    // -----------------------------

    if (
        quantidade <= 0 ||
        !Number.isInteger(quantidade)
    ) {

        mensagem.textContent =
            "> ERROR :: INVALID QUANTITY";

        mensagem.className =
            "message error";

        return;

    }


    // -----------------------------
    // VALIDAR VALOR
    // -----------------------------

    if (
        valor < 0 ||
        isNaN(valor)
    ) {

        mensagem.textContent =
            "> ERROR :: INVALID VALUE";

        mensagem.className =
            "message error";

        return;

    }


    // -----------------------------
    // GERAR CÓDIGO
    // -----------------------------

    const codigo =
        gerarCodigo();


    // -----------------------------
    // CRIAR PRODUTO
    // -----------------------------

    const produto = {

        codigo: codigo,

        nome: nome,

        quantidade: quantidade,

        valor: valor

    };


    // -----------------------------
    // ADICIONAR AO ESTOQUE
    // -----------------------------

    estoque.push(produto);


    // SALVAR

    salvarEstoque();


    // -----------------------------
    // MENSAGEM
    // -----------------------------

    mensagem.textContent =
        "> OBJECT REGISTERED :: " +
        codigo;

    mensagem.className =
        "message success";


    // -----------------------------
    // LIMPAR FORMULÁRIO
    // -----------------------------

    document
        .getElementById("nome")
        .value = "";


    document
        .getElementById("quantidade")
        .value = "";


    document
        .getElementById("valor")
        .value = "";


    console.log(
        "OBJECT REGISTERED:",
        produto
    );

}


// ======================================
// ABRIR CADASTRO
// ======================================

function abrirCadastro() {

    esconderTelas();

    document
        .getElementById("cadastroScreen")
        .classList
        .remove("hidden");

}


// ======================================
// ABRIR ESTOQUE
// ======================================

function abrirEstoque() {

    esconderTelas();

    document
        .getElementById("estoqueScreen")
        .classList
        .remove("hidden");


    mostrarEstoque();

}


// ======================================
// ABRIR REMOÇÃO
// ======================================

function abrirRemocao() {

    esconderTelas();

    document
        .getElementById("remocaoScreen")
        .classList
        .remove("hidden");

}


// ======================================
// ESCONDER TELAS
// ======================================

function esconderTelas() {

    document
        .getElementById("menuScreen")
        .classList
        .add("hidden");


    document
        .getElementById("cadastroScreen")
        .classList
        .add("hidden");


    document
        .getElementById("estoqueScreen")
        .classList
        .add("hidden");


    document
        .getElementById("remocaoScreen")
        .classList
        .add("hidden");

}


// ======================================
// MOSTRAR ESTOQUE
// ======================================

function mostrarEstoque() {

    const lista =
        document
            .getElementById("listaEstoque");


    lista.innerHTML = "";


    // -----------------------------
    // ESTOQUE VAZIO
    // -----------------------------

    if (estoque.length === 0) {

        lista.innerHTML = `

            <div class="empty">

                > DATABASE EMPTY
                <br>
                > NO OBJECTS REGISTERED

            </div>

        `;

        return;

    }


    // -----------------------------
    // CRIAR ITENS
    // -----------------------------

    estoque.forEach(produto => {

        const item =
            document.createElement("div");


        item.className =
            "inventory-item";


        item.innerHTML = `

            <div class="item-code">

                [${produto.codigo}]

            </div>


            <div class="item-name">

                ${produto.nome}

            </div>


            <div class="item-info">

                QTY:
                <span>
                    ${produto.quantidade}
                </span>

                &nbsp;&nbsp;

                VALUE:
                <span>
                    R$ ${produto.valor.toFixed(2)}
                </span>

            </div>

        `;


        lista.appendChild(item);

    });

}


// ======================================
// REMOVER ITEM
// ======================================

function removerItem() {

    const campo =
        document
            .getElementById("codigoRemocao");


    const codigo =
        campo
            .value
            .trim()
            .toUpperCase();


    const mensagem =
        document
            .getElementById("mensagemRemocao");


    // -----------------------------
    // PROCURAR PRODUTO
    // -----------------------------

    const indice =
        estoque.findIndex(
            produto =>
                produto.codigo === codigo
        );


    // -----------------------------
    // NÃO ENCONTROU
    // -----------------------------

    if (indice === -1) {

        mensagem.textContent =
            "> ERROR :: OBJECT NOT FOUND";

        mensagem.className =
            "message error";

        return;

    }


    // -----------------------------
    // REMOVER
    // -----------------------------

    const produtoRemovido =
        estoque.splice(indice, 1)[0];


    // SALVAR NOVO ESTOQUE

    salvarEstoque();


    // -----------------------------
    // MENSAGEM
    // -----------------------------

    mensagem.textContent =
        "> OBJECT REMOVED :: " +
        produtoRemovido.codigo;

    mensagem.className =
        "message success";


    campo.value = "";

}


// ======================================
// VOLTAR AO MENU
// ======================================

function voltarMenu() {

    esconderTelas();

    document
        .getElementById("menuScreen")
        .classList
        .remove("hidden");

}


// ======================================
// CONFIRMAÇÃO
// ======================================

function confirmarRetorno() {

    document
        .getElementById("confirmModal")
        .classList
        .remove("hidden");

}


// ======================================
// FECHAR CONFIRMAÇÃO
// ======================================

function fecharConfirmacao() {

    document
        .getElementById("confirmModal")
        .classList
        .add("hidden");

}


// ======================================
// VOLTAR PARA O LOGIN
// ======================================

function voltarInicio() {

    fecharConfirmacao();

    esconderTelas();


    document
        .getElementById("loginScreen")
        .classList
        .remove("hidden");


    document
        .getElementById("senha")
        .value = "";


    document
        .getElementById("mensagemLogin")
        .textContent = "";

}
