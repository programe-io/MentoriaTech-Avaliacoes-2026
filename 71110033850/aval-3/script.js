// ==========================================
// AURA PARFUMS
// SISTEMA DE CADASTRO DE PRODUTOS
// ==========================================

const STORAGE_KEY = "aura-products";

let produtos = JSON.parse(
    localStorage.getItem(STORAGE_KEY)
) || [];

let produtoExclusao = null;


// ==========================================
// ELEMENTOS
// ==========================================

const form = document.getElementById("produtoForm");

const produtoId = document.getElementById("produtoId");

const nome = document.getElementById("nome");
const marca = document.getElementById("marca");
const categoria = document.getElementById("categoria");
const volume = document.getElementById("volume");

const preco = document.getElementById("preco");
const precoPromocional = document.getElementById("precoPromocional");

const estoque = document.getElementById("estoque");

const sku = document.getElementById("sku");

const descricao = document.getElementById("descricao");
const notas = document.getElementById("notas");

const imagem = document.getElementById("imagem");

const destaque = document.getElementById("destaque");
const oferta = document.getElementById("oferta");

const previewImagem = document.getElementById("previewImagem");
const uploadContent = document.getElementById("uploadContent");

const uploadArea = document.getElementById("uploadArea");

const listaProdutos = document.getElementById("listaProdutos");

const semProdutos = document.getElementById("semProdutos");

const totalProdutos = document.getElementById("totalProdutos");

const buscar = document.getElementById("buscar");

const textoBotao = document.getElementById("textoBotao");

const btnCancelar = document.getElementById("btnCancelar");

const modalExcluir = document.getElementById("modalExcluir");

const cancelarExclusao =
    document.getElementById("cancelarExclusao");

const confirmarExclusao =
    document.getElementById("confirmarExclusao");

const notificacao =
    document.getElementById("notificacao");


// ==========================================
// SALVAR PRODUTOS
// ==========================================

function salvarProdutos() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(produtos)
    );

}


// ==========================================
// GERAR ID
// ==========================================

function gerarId() {

    return Date.now().toString();

}


// ==========================================
// FORMATAR PREÇO
// ==========================================

function formatarPreco(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ==========================================
// NOTIFICAÇÃO
// ==========================================

function mostrarNotificacao(mensagem) {

    notificacao.textContent = mensagem;

    notificacao.classList.add("ativo");

    setTimeout(() => {

        notificacao.classList.remove("ativo");

    }, 3000);

}


// ==========================================
// IMAGEM
// ==========================================

imagem.addEventListener("change", function () {

    const arquivo = this.files[0];

    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = function (e) {

        previewImagem.src = e.target.result;

        previewImagem.style.display = "block";

        uploadContent.style.display = "none";

    };

    leitor.readAsDataURL(arquivo);

});


uploadArea.addEventListener("click", function () {

    imagem.click();

});


// ==========================================
// DRAG AND DROP
// ==========================================

uploadArea.addEventListener(
    "dragover",
    function (e) {

        e.preventDefault();

        uploadArea.style.borderColor = "#c9a227";

    }
);


uploadArea.addEventListener(
    "dragleave",
    function () {

        uploadArea.style.borderColor = "#ddd";

    }
);


uploadArea.addEventListener(
    "drop",
    function (e) {

        e.preventDefault();

        uploadArea.style.borderColor = "#ddd";

        const arquivo = e.dataTransfer.files[0];

        if (!arquivo) return;

        if (!arquivo.type.startsWith("image/")) {

            alert("Selecione um arquivo de imagem.");

            return;

        }

        imagem.files = e.dataTransfer.files;

        const leitor = new FileReader();

        leitor.onload = function (event) {

            previewImagem.src =
                event.target.result;

            previewImagem.style.display =
                "block";

            uploadContent.style.display =
                "none";

        };

        leitor.readAsDataURL(arquivo);

    }
);


// ==========================================
// FORMULÁRIO
// ==========================================

form.addEventListener("submit", function (e) {

    e.preventDefault();


    const idAtual = produtoId.value;


    const produto = {

        id: idAtual || gerarId(),

        nome: nome.value.trim(),

        marca: marca.value.trim(),

        categoria: categoria.value,

        volume: volume.value,

        preco: Number(preco.value),

        precoPromocional:
            precoPromocional.value
                ? Number(precoPromocional.value)
                : null,

        estoque: Number(estoque.value),

        sku: sku.value.trim(),

        descricao: descricao.value.trim(),

        notas: notas.value.trim(),

        imagem:
            previewImagem.src &&
            previewImagem.style.display !== "none"
                ? previewImagem.src
                : "",

        destaque: destaque.checked,

        oferta: oferta.checked,

        dataCadastro:
            idAtual
                ? encontrarProduto(idAtual)?.dataCadastro
                : new Date().toISOString()

    };


    if (idAtual) {

        const index = produtos.findIndex(
            p => p.id === idAtual
        );

        if (index !== -1) {

            produtos[index] = produto;

            mostrarNotificacao(
                "Produto atualizado com sucesso!"
            );

        }

    } else {

        produtos.unshift(produto);

        mostrarNotificacao(
            "Produto cadastrado com sucesso!"
        );

    }


    salvarProdutos();

    renderizarProdutos();

    limparFormulario();

});


// ==========================================
// ENCONTRAR PRODUTO
// ==========================================

function encontrarProduto(id) {

    return produtos.find(
        produto => produto.id === id
    );

}


// ==========================================
// RENDERIZAR PRODUTOS
// ==========================================

function renderizarProdutos() {

    const termo =
        buscar.value
            .toLowerCase()
            .trim();


    const produtosFiltrados =
        produtos.filter(produto => {

            return (

                produto.nome
                    .toLowerCase()
                    .includes(termo)

                ||

                produto.marca
                    .toLowerCase()
                    .includes(termo)

                ||

                produto.categoria
                    .toLowerCase()
                    .includes(termo)

                ||

                produto.sku
                    .toLowerCase()
                    .includes(termo)

            );

        });


    listaProdutos.innerHTML = "";


    totalProdutos.textContent =
        produtos.length;


    if (produtosFiltrados.length === 0) {

        semProdutos.style.display = "block";

        return;

    }


    semProdutos.style.display = "none";


    produtosFiltrados.forEach(produto => {

        const elemento =
            document.createElement("div");

        elemento.className = "produto";


        const imagemProduto =
            produto.imagem
                ? `
                    <img
                        src="${produto.imagem}"
                        alt="${escaparHTML(produto.nome)}"
                    >
                  `
                : "🌸";


        let precoHTML = "";


        if (
            produto.precoPromocional &&
            produto.precoPromocional < produto.preco
        ) {

            precoHTML = `

                <div class="produto-preco">

                    <span class="preco-antigo">
                        ${formatarPreco(produto.preco)}
                    </span>

                    ${formatarPreco(
                        produto.precoPromocional
                    )}

                </div>

            `;

        } else {

            precoHTML = `

                <div class="produto-preco">

                    ${formatarPreco(produto.preco)}

                </div>

            `;

        }


        elemento.innerHTML = `

            <div class="produto-imagem">

                ${imagemProduto}

            </div>


            <div class="produto-info">

                <h3>
                    ${escaparHTML(produto.nome)}
                </h3>

                <div class="produto-marca">

                    ${escaparHTML(produto.marca)}

                    ${produto.volume
                        ? " • " + produto.volume
                        : ""
                    }

                </div>

                ${precoHTML}


                <div class="produto-meta">

                    <span class="tag">

                        ${escaparHTML(
                            produto.categoria
                        )}

                    </span>


                    <span class="tag">

                        Estoque: ${produto.estoque}

                    </span>


                    ${
                        produto.oferta

                            ? `
                                <span class="tag oferta">
                                    Oferta
                                </span>
                              `

                            : ""
                    }


                    ${
                        produto.destaque

                            ? `
                                <span class="tag destaque">
                                    Destaque
                                </span>
                              `

                            : ""
                    }

                </div>

            </div>


            <div class="produto-acoes">

                <button
                    class="btn-editar"
                    title="Editar"
                    onclick="editarProduto('${produto.id}')"
                >
                    ✎
                </button>


                <button
                    class="btn-excluir"
                    title="Excluir"
                    onclick="abrirExclusao('${produto.id}')"
                >
                    ×
                </button>

            </div>

        `;


        listaProdutos.appendChild(elemento);

    });

}


// ==========================================
// ESCAPAR HTML
// ==========================================

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto || "";

    return div.innerHTML;

}


// ==========================================
// EDITAR PRODUTO
// ==========================================

function editarProduto(id) {

    const produto =
        encontrarProduto(id);


    if (!produto) return;


    produtoId.value = produto.id;

    nome.value = produto.nome;

    marca.value = produto.marca;

    categoria.value = produto.categoria;

    volume.value = produto.volume || "";

    preco.value = produto.preco;

    precoPromocional.value =
        produto.precoPromocional || "";

    estoque.value = produto.estoque;

    sku.value = produto.sku || "";

    descricao.value =
        produto.descricao || "";

    notas.value =
        produto.notas || "";

    destaque.checked =
        produto.destaque;

    oferta.checked =
        produto.oferta;


    if (produto.imagem) {

        previewImagem.src =
            produto.imagem;

        previewImagem.style.display =
            "block";

        uploadContent.style.display =
            "none";

    } else {

        previewImagem.style.display =
            "none";

        uploadContent.style.display =
            "flex";

    }


    textoBotao.textContent =
        "Salvar alterações";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// LIMPAR FORMULÁRIO
// ==========================================

function limparFormulario() {

    form.reset();

    produtoId.value = "";

    previewImagem.src = "";

    previewImagem.style.display =
        "none";

    uploadContent.style.display =
        "flex";

    textoBotao.textContent =
        "Cadastrar produto";

}


// ==========================================
// BOTÃO LIMPAR
// ==========================================

btnCancelar.addEventListener(
    "click",
    limparFormulario
);


// ==========================================
// BUSCAR
// ==========================================

buscar.addEventListener(
    "input",
    renderizarProdutos
);


// ==========================================
// EXCLUSÃO
// ==========================================

function abrirExclusao(id) {

    produtoExclusao = id;

    modalExcluir.classList.add("ativo");

}


cancelarExclusao.addEventListener(
    "click",
    function () {

        produtoExclusao = null;

        modalExcluir.classList.remove(
            "ativo"
        );

    }
);


confirmarExclusao.addEventListener(
    "click",
    function () {

        if (!produtoExclusao) return;


        produtos =
            produtos.filter(
                produto =>
                    produto.id !== produtoExclusao
            );


        salvarProdutos();

        renderizarProdutos();


        modalExcluir.classList.remove(
            "ativo"
        );


        produtoExclusao = null;


        mostrarNotificacao(
            "Produto excluído com sucesso!"
        );

    }
);


// ==========================================
// FECHAR MODAL CLICANDO FORA
// ==========================================

modalExcluir.addEventListener(
    "click",
    function (e) {

        if (e.target === modalExcluir) {

            modalExcluir.classList.remove(
                "ativo"
            );

            produtoExclusao = null;

        }

    }
);


// ==========================================
// INICIAR
// ==========================================

renderizarProdutos();