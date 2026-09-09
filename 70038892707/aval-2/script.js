// =============================================
// SISTEMA DE ESTOQUE DE JOIAS
// =============================================

// Produtos iniciais
const produtosIniciais = [
    {
        id: 1,
        nome: "Anel Solitário Diamante",
        codigo: "AN001",
        categoria: "Anel",
        material: "Ouro 18k",
        quantidade: 5,
        preco: 2890.00
    },

    {
        id: 2,
        nome: "Aliança Clássica",
        codigo: "AL001",
        categoria: "Aliança",
        material: "Ouro 18k",
        quantidade: 8,
        preco: 1890.00
    },

    {
        id: 3,
        nome: "Brinco Pérola Elegance",
        codigo: "BR001",
        categoria: "Brinco",
        material: "Ouro 18k",
        quantidade: 12,
        preco: 1290.00
    },

    {
        id: 4,
        nome: "Colar Coração",
        codigo: "CL001",
        categoria: "Colar",
        material: "Prata 925",
        quantidade: 3,
        preco: 590.00
    },

    {
        id: 5,
        nome: "Pulseira Riviera",
        codigo: "PU001",
        categoria: "Pulseira",
        material: "Ouro 18k",
        quantidade: 2,
        preco: 3490.00
    },

    {
        id: 6,
        nome: "Relógio Premium",
        codigo: "RE001",
        categoria: "Relógio",
        material: "Aço",
        quantidade: 7,
        preco: 1590.00
    }
];


// =============================================
// CARREGAR DADOS
// =============================================

let produtos =
    JSON.parse(
        localStorage.getItem("produtosJoias")
    );


// Se não existir estoque salvo,
// usa os produtos iniciais
if (!produtos) {

    produtos = produtosIniciais;

    salvar();

}


// =============================================
// ELEMENTOS
// =============================================

const form =
    document.getElementById("formJoia");

const idInput =
    document.getElementById("id");

const nomeInput =
    document.getElementById("nome");

const codigoInput =
    document.getElementById("codigo");

const categoriaInput =
    document.getElementById("categoria");

const materialInput =
    document.getElementById("material");

const quantidadeInput =
    document.getElementById("quantidade");

const precoInput =
    document.getElementById("preco");

const tabela =
    document.getElementById("tabelaJoias");

const pesquisa =
    document.getElementById("pesquisa");

const filtroCategoria =
    document.getElementById("filtroCategoria");

const cancelar =
    document.getElementById("cancelar");

const tituloFormulario =
    document.getElementById("tituloFormulario");

const semProdutos =
    document.getElementById("semProdutos");


// =============================================
// SALVAR
// =============================================

function salvar() {

    localStorage.setItem(
        "produtosJoias",
        JSON.stringify(produtos)
    );

}


// =============================================
// MOEDA
// =============================================

function moeda(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// =============================================
// ATUALIZAR DASHBOARD
// =============================================

function atualizarDashboard() {

    let totalPecas = 0;

    let valorEstoque = 0;

    let estoqueBaixo = 0;


    produtos.forEach(produto => {

        totalPecas +=
            Number(produto.quantidade);


        valorEstoque +=
            Number(produto.quantidade) *
            Number(produto.preco);


        if (
            produto.quantidade > 0 &&
            produto.quantidade <= 3
        ) {

            estoqueBaixo++;

        }

    });


    document.getElementById(
        "totalProdutos"
    ).textContent = produtos.length;


    document.getElementById(
        "totalPecas"
    ).textContent = totalPecas;


    document.getElementById(
        "valorEstoque"
    ).textContent =
        moeda(valorEstoque);


    document.getElementById(
        "estoqueBaixo"
    ).textContent =
        estoqueBaixo;

}


// =============================================
// STATUS DO ESTOQUE
// =============================================

function statusEstoque(quantidade) {

    if (quantidade === 0) {

        return `
            <span class="status esgotado">
                Esgotado
            </span>
        `;

    }


    if (quantidade <= 3) {

        return `
            <span class="status baixo">
                Estoque baixo
            </span>
        `;

    }


    return `
        <span class="status ok">
            Disponível
        </span>
    `;

}


// =============================================
// RENDERIZAR
// =============================================

function renderizar() {

    tabela.innerHTML = "";


    const texto =
        pesquisa.value
            .toLowerCase()
            .trim();


    const categoria =
        filtroCategoria.value;


    const filtrados =
        produtos.filter(produto => {

            const correspondeTexto =

                produto.nome
                    .toLowerCase()
                    .includes(texto)

                ||

                produto.codigo
                    .toLowerCase()
                    .includes(texto)

                ||

                produto.material
                    .toLowerCase()
                    .includes(texto);


            const correspondeCategoria =

                categoria === "Todos" ||
                produto.categoria === categoria;


            return (
                correspondeTexto &&
                correspondeCategoria
            );

        });


    if (filtrados.length === 0) {

        semProdutos.classList.remove(
            "oculto"
        );

    } else {

        semProdutos.classList.add(
            "oculto"
        );

    }


    filtrados.forEach(produto => {

        const tr =
            document.createElement("tr");


        const valorTotal =
            produto.quantidade *
            produto.preco;


        tr.innerHTML = `

            <td>
                <span class="codigo">
                    ${produto.codigo}
                </span>
            </td>

            <td>
                <span class="nome">
                    ${produto.nome}
                </span>
            </td>

            <td>
                ${produto.categoria}
            </td>

            <td>
                ${produto.material}
            </td>

            <td>
                ${produto.quantidade}
            </td>

            <td>
                <span class="preco">
                    ${moeda(produto.preco)}
                </span>
            </td>

            <td>
                <span class="valor-total">
                    ${moeda(valorTotal)}
                </span>
            </td>

            <td>
                ${statusEstoque(
                    produto.quantidade
                )}
            </td>

            <td>

                <div class="acoes">

                    <button
                        class="btn-editar"
                        onclick="editar(${produto.id})"
                        title="Editar"
                    >
                        ✏️
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluir(${produto.id})"
                        title="Excluir"
                    >
                        🗑️
                    </button>

                </div>

            </td>

        `;


        tabela.appendChild(tr);

    });


    atualizarDashboard();

}


// =============================================
// CADASTRAR
// =============================================

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const nome =
            nomeInput.value.trim();


        const codigo =
            codigoInput.value.trim();


        const categoria =
            categoriaInput.value;


        const material =
            materialInput.value;


        const quantidade =
            Number(
                quantidadeInput.value
            );


        const preco =
            Number(
                precoInput.value
            );


        const id =
            idInput.value;


        // Verifica código duplicado

        const codigoDuplicado =
            produtos.some(produto => {

                return (

                    produto.codigo
                        .toLowerCase() ===
                    codigo.toLowerCase()

                    &&

                    String(produto.id) !==
                    String(id)

                );

            });


        if (codigoDuplicado) {

            alert(
                "Este código já está cadastrado."
            );

            return;

        }


        // EDITAR

        if (id) {

            const index =
                produtos.findIndex(
                    produto =>
                        produto.id ==
                        id
                );


            if (index !== -1) {

                produtos[index] = {

                    id:
                        Number(id),

                    nome,

                    codigo,

                    categoria,

                    material,

                    quantidade,

                    preco

                };

            }


            alert(
                "Joia atualizada com sucesso!"
            );

        }

        // NOVO

        else {

            produtos.push({

                id: Date.now(),

                nome,

                codigo,

                categoria,

                material,

                quantidade,

                preco

            });


            alert(
                "Joia cadastrada com sucesso!"
            );

        }


        salvar();

        renderizar();

        limparFormulario();

    }
);


// =============================================
// EDITAR
// =============================================

function editar(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    if (!produto) {
        return;
    }


    idInput.value =
        produto.id;


    nomeInput.value =
        produto.nome;


    codigoInput.value =
        produto.codigo;


    categoriaInput.value =
        produto.categoria;


    materialInput.value =
        produto.material;


    quantidadeInput.value =
        produto.quantidade;


    precoInput.value =
        produto.preco;


    tituloFormulario.textContent =
        "Editar joia";


    cancelar.hidden = false;


    document
        .getElementById("cadastro")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =============================================
// EXCLUIR
// =============================================

function excluir(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    if (!produto) {
        return;
    }


    const confirmar =
        confirm(
            `Deseja excluir "${produto.nome}"?`
        );


    if (!confirmar) {
        return;
    }


    produtos =
        produtos.filter(
            item => item.id !== id
        );


    salvar();

    renderizar();

}


// =============================================
// LIMPAR
// =============================================

function limparFormulario() {

    form.reset();

    idInput.value = "";

    tituloFormulario.textContent =
        "Cadastrar nova joia";

    cancelar.hidden = true;

}


// =============================================
// CANCELAR
// =============================================

cancelar.addEventListener(
    "click",
    limparFormulario
);


// =============================================
// PESQUISA
// =============================================

pesquisa.addEventListener(
    "input",
    renderizar
);


// =============================================
// FILTRO
// =============================================

filtroCategoria.addEventListener(
    "change",
    renderizar
);


// =============================================
// INICIAR SISTEMA
// =============================================

renderizar();
