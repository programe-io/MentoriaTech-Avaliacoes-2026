// ==========================================
// BARBERSTOCK
// SISTEMA DE ESTOQUE
// ==========================================


// Produtos iniciais
let produtos = JSON.parse(localStorage.getItem("produtos")) || [

    {
        codigo: "PROD-001",
        descricao: "Pomada Modeladora Matte",
        quantidade: 15,
        valor: 29.90
    },

    {
        codigo: "PROD-002",
        descricao: "Shampoo Masculino",
        quantidade: 8,
        valor: 24.90
    },

    {
        codigo: "PROD-003",
        descricao: "Cera Modeladora",
        quantidade: 3,
        valor: 34.90
    }

];


// ==========================================
// SALVAR NO NAVEGADOR
// ==========================================

function salvarDados() {

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}


// ==========================================
// ABRIR MODAL DE CADASTRO
// ==========================================

function abrirCadastro() {

    document
        .getElementById("modalCadastro")
        .classList.add("show");

}


// ==========================================
// FECHAR MODAL DE CADASTRO
// ==========================================

function fecharCadastro() {

    document
        .getElementById("modalCadastro")
        .classList.remove("show");

    limparFormulario();

}


// ==========================================
// LIMPAR FORMULÁRIO
// ==========================================

function limparFormulario() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

}


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

function cadastrarProduto() {

    const codigo =
        document.getElementById("codigo").value.trim();

    const descricao =
        document.getElementById("descricao").value.trim();

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const valor =
        Number(document.getElementById("valor").value);


    // Validação
    if (!codigo || !descricao) {

        alert("Preencha o código e o nome do produto.");

        return;
    }


    if (
        isNaN(quantidade) ||
        quantidade < 0
    ) {

        alert("Digite uma quantidade válida.");

        return;
    }


    if (
        isNaN(valor) ||
        valor < 0
    ) {

        alert("Digite um valor válido.");

        return;
    }


    // Verificar código duplicado

    const existe = produtos.some(
        produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
    );


    if (existe) {

        alert("Já existe um produto com esse código.");

        return;
    }


    // Criar produto

    const novoProduto = {

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };


    produtos.push(novoProduto);


    salvarDados();

    listarProdutos();

    fecharCadastro();


    alert("Produto cadastrado com sucesso!");

}


// ==========================================
// LISTAR PRODUTOS
// ==========================================

function listarProdutos() {

    const tabela =
        document.getElementById("listaProdutos");

    const pesquisa =
        document
        .getElementById("pesquisa")
        .value
        .toLowerCase()
        .trim();


    tabela.innerHTML = "";


    const produtosFiltrados =
        produtos.filter(produto =>

            produto.descricao
                .toLowerCase()
                .includes(pesquisa)

            ||

            produto.codigo
                .toLowerCase()
                .includes(pesquisa)

        );


    if (produtosFiltrados.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:40px;">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        atualizarCards();

        return;
    }


    produtosFiltrados.forEach(produto => {

        const index =
            produtos.indexOf(produto);


        let status;
        let classe;


        if (produto.quantidade === 0) {

            status = "Sem estoque";
            classe = "zero";

        }

        else if (produto.quantidade <= 5) {

            status = "Estoque baixo";
            classe = "baixo";

        }

        else {

            status = "Disponível";
            classe = "ok";

        }


        tabela.innerHTML += `

            <tr>

                <td class="codigo">
                    ${produto.codigo}
                </td>

                <td>
                    <strong>
                        ${produto.descricao}
                    </strong>
                </td>

                <td>
                    ${produto.quantidade} un.
                </td>

                <td class="valor">
                    R$ ${produto.valor.toFixed(2).replace(".", ",")}
                </td>

                <td>

                    <span class="status ${classe}">
                        ${status}
                    </span>

                </td>

                <td>

                    <div class="actions">

                        <button
                            class="btn-action edit"
                            title="Editar"
                            onclick="editarProduto(${index})">

                            ✏️

                        </button>


                        <button
                            class="btn-action delete"
                            title="Excluir"
                            onclick="excluirProduto(${index})">

                            🗑️

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });


    atualizarCards();

}


// ==========================================
// ATUALIZAR CARDS
// ==========================================

function atualizarCards() {

    const total =
        produtos.length;


    const valorTotal =
        produtos.reduce(
            (total, produto) =>
                total +
                (produto.quantidade * produto.valor),
            0
        );


    const baixo =
        produtos.filter(
            produto =>
                produto.quantidade > 0 &&
                produto.quantidade <= 5
        ).length;


    document.getElementById(
        "totalProdutos"
    ).textContent = total;


    document.getElementById(
        "valorEstoque"
    ).textContent =
        "R$ " +
        valorTotal
            .toFixed(2)
            .replace(".", ",");


    document.getElementById(
        "estoqueBaixo"
    ).textContent = baixo;

}


// ==========================================
// EDITAR PRODUTO
// ==========================================

function editarProduto(index) {

    const produto =
        produtos[index];


    document.getElementById(
        "indiceEdicao"
    ).value = index;


    document.getElementById(
        "produtoEdicao"
    ).value = produto.descricao;


    document.getElementById(
        "quantidadeEdicao"
    ).value = produto.quantidade;


    document.getElementById(
        "valorEdicao"
    ).value = produto.valor;


    document
        .getElementById("modalEditar")
        .classList.add("show");

}


// ==========================================
// SALVAR EDIÇÃO
// ==========================================

function salvarEdicao() {

    const index =
        Number(
            document.getElementById(
                "indiceEdicao"
            ).value
        );


    const quantidade =
        Number(
            document.getElementById(
                "quantidadeEdicao"
            ).value
        );


    const valor =
        Number(
            document.getElementById(
                "valorEdicao"
            ).value
        );


    if (
        isNaN(quantidade) ||
        quantidade < 0
    ) {

        alert("Quantidade inválida.");

        return;
    }


    if (
        isNaN(valor) ||
        valor < 0
    ) {

        alert("Valor inválido.");

        return;
    }


    produtos[index].quantidade =
        quantidade;


    produtos[index].valor =
        valor;


    salvarDados();

    listarProdutos();

    fecharEdicao();


    alert("Produto atualizado com sucesso!");

}


// ==========================================
// FECHAR EDIÇÃO
// ==========================================

function fecharEdicao() {

    document
        .getElementById("modalEditar")
        .classList.remove("show");

}


// ==========================================
// EXCLUIR PRODUTO
// ==========================================

function excluirProduto(index) {

    const produto =
        produtos[index];


    const confirmar =
        confirm(
            `Deseja realmente excluir "${produto.descricao}"?`
        );


    if (!confirmar) {

        return;

    }


    produtos.splice(index, 1);


    salvarDados();

    listarProdutos();


    alert("Produto excluído.");

}


// ==========================================
// FECHAR MODAL CLICANDO FORA
// ==========================================

window.addEventListener(
    "click",
    function(event) {

        const cadastro =
            document.getElementById(
                "modalCadastro"
            );

        const edicao =
            document.getElementById(
                "modalEditar"
            );


        if (event.target === cadastro) {

            fecharCadastro();

        }


        if (event.target === edicao) {

            fecharEdicao();

        }

    }
);


// ==========================================
// INICIAR SISTEMA
// ==========================================

listarProdutos();