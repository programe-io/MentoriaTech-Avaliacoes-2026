
const produtosIniciais = [
    {
        nome: "iPhone 13",
        preco: 2200,
        categoria: "Celulares",
        local: "Teresina - PI",
        imagem: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
        whatsapp: "",
        descricao: "iPhone em ótimo estado de conservação."
    },
    {
        nome: "Notebook Dell",
        preco: 1800,
        categoria: "Eletrônicos",
        local: "Teresina - PI",
        imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        whatsapp: "",
        descricao: "Notebook ideal para estudos e trabalho."
    },
    {
        nome: "Sofá moderno",
        preco: 950,
        categoria: "Móveis",
        local: "Teresina - PI",
        imagem: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
        whatsapp: "",
        descricao: "Sofá confortável e bem conservado."
    },
    {
        nome: "Tênis esportivo",
        preco: 180,
        categoria: "Moda",
        local: "Teresina - PI",
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        whatsapp: "",
        descricao: "Tênis esportivo em excelente estado."
    }
];

let produtos = carregarProdutos();
let categoriaAtual = "Todos";

function carregarProdutos() {
    try {
        const dados = localStorage.getItem("produtosCompraFacil");
        return dados ? JSON.parse(dados) : produtosIniciais;
    } catch {
        return produtosIniciais;
    }
}

function salvarProdutos() {
    localStorage.setItem(
        "produtosCompraFacil",
        JSON.stringify(produtos)
    );
}

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, letra => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[letra]);
}

function exibirProdutos(lista) {
    const area = document.getElementById("produtos");

    if (lista.length === 0) {
        area.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    area.innerHTML = lista.map((produto, indice) => {
        const imagem = produto.imagem &&
            /^https?:\/\//i.test(produto.imagem)
            ? escapar(produto.imagem)
            : "https://placehold.co/400x250?text=Produto";

        const telefone = String(produto.whatsapp || "")
            .replace(/\D/g, "");

        const contato = telefone.length >= 10 &&
            telefone.length <= 13
            ? `https://wa.me/55${telefone}`
            : "";

        return `
            <div class="card">
                <img src="${imagem}"
                     alt="${escapar(produto.nome)}"
                     onerror="this.src='https://placehold.co/400x250?text=Produto'">

                <div class="info">
                    <h3>${escapar(produto.nome)}</h3>

                    <p class="preco">
                        ${Number(produto.preco).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </p>

                    <p class="local">
                        📍 ${escapar(produto.local)}
                    </p>

                    <p>${escapar(produto.categoria)}</p>

                    <p>${escapar(produto.descricao)}</p>

                    ${
                        contato
                        ? `<a class="contato"
                             href="${contato}"
                             target="_blank"
                             rel="noopener noreferrer">
                             Conversar no WhatsApp
                           </a>`
                        : `<p>Contato não informado</p>`
                    }
                </div>
            </div>
        `;
    }).join("");
}

function filtrar(categoria) {
    categoriaAtual = categoria;

    const resultado = categoria === "Todos"
        ? produtos
        : produtos.filter(p => p.categoria === categoria);

    exibirProdutos(resultado);
}

function buscarProdutos() {
    const termo = document
        .getElementById("pesquisa")
        .value.toLowerCase()
        .trim();

    const resultado = produtos.filter(p => {
        const correspondeCategoria =
            categoriaAtual === "Todos" ||
            p.categoria === categoriaAtual;

        const correspondeBusca =
            p.nome.toLowerCase().includes(termo) ||
            p.categoria.toLowerCase().includes(termo) ||
            p.local.toLowerCase().includes(termo);

        return correspondeCategoria && correspondeBusca;
    });

    exibirProdutos(resultado);
}

document.getElementById("pesquisa")
    .addEventListener("input", buscarProdutos);

function abrirFormulario() {
    document.getElementById("formulario").style.display = "flex";
}

function fecharFormulario() {
    document.getElementById("formulario").style.display = "none";
}

document.getElementById("formProduto")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const novoProduto = {
            nome: document.getElementById("nome").value.trim(),
            preco: Number(document.getElementById("preco").value),
            categoria: document.getElementById("categoria").value,
            local: document.getElementById("local").value.trim(),
            imagem: document.getElementById("imagem").value.trim(),
            whatsapp: document.getElementById("whatsapp").value.trim(),
            descricao: document.getElementById("descricao").value.trim()
        };

        if (
            !novoProduto.nome ||
            !novoProduto.local ||
            !novoProduto.descricao ||
            !novoProduto.categoria ||
            !Number.isFinite(novoProduto.preco) ||
            novoProduto.preco <= 0
        ) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        if (novoProduto.imagem &&
            !/^https?:\/\//i.test(novoProduto.imagem)) {
            alert("Informe um link válido para a imagem.");
            return;
        }

        produtos.unshift(novoProduto);

        try {
            salvarProdutos();
        } catch {
            produtos.shift();
            alert("Não foi possível salvar. Verifique o armazenamento.");
            return;
        }

        document.getElementById("formProduto").reset();

        fecharFormulario();
        categoriaAtual = "Todos";
        exibirProdutos(produtos);

        alert("Anúncio publicado com sucesso!");
    });

exibirProdutos(produtos);
