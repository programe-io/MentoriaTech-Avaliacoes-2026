
const produtos = [
    {
        id: 1,
        nome: "Classic Tartaruga",
        categorias: ["quadrado", "sol"],
        tipo: "Óculos de sol",
        descricao: "Armação marrom tartaruga.",
        preco: 189.90,
        imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    },
    {
        id: 2,
        nome: "Round Vintage",
        categorias: ["redondo", "grau"],
        tipo: "Óculos de grau",
        descricao: "Modelo redondo clássico.",
        preco: 149.90,
        imagem: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600"
    },
    {
        id: 3,
        nome: "Golden Aviator",
        categorias: ["aviador", "sol"],
        tipo: "Óculos de sol",
        descricao: "Armação dourada elegante.",
        preco: 219.90,
        imagem: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600"
    },
    {
        id: 4,
        nome: "Retro Square",
        categorias: ["quadrado", "grau"],
        tipo: "Óculos de grau",
        descricao: "Armação quadrada retrô.",
        preco: 169.90,
        imagem: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600"
    },
    {
        id: 5,
        nome: "Cat Eye Classic",
        categorias: ["gatinho", "sol"],
        tipo: "Óculos de sol",
        descricao: "Modelo gatinho vintage.",
        preco: 199.90,
        imagem: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600"
    },
    {
        id: 6,
        nome: "Round Gold",
        categorias: ["redondo", "sol"],
        tipo: "Óculos de sol",
        descricao: "Armação redonda dourada.",
        preco: 179.90,
        imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    },
    {
        id: 7,
        nome: "Havana Retro",
        categorias: ["quadrado", "grau"],
        tipo: "Óculos de grau",
        descricao: "Acabamento marrom clássico.",
        preco: 159.90,
        imagem: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600"
    },
    {
        id: 8,
        nome: "Aviator Brown",
        categorias: ["aviador", "sol"],
        tipo: "Óculos de sol",
        descricao: "Estilo aviador marrom.",
        preco: 229.90,
        imagem: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600"
    },
    {
        id: 9,
        nome: "Paris Cat Eye",
        categorias: ["gatinho", "grau"],
        tipo: "Óculos de grau",
        descricao: "Design delicado e retrô.",
        preco: 189.90,
        imagem: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600"
    },
    {
        id: 10,
        nome: "Vintage Black",
        categorias: ["quadrado", "sol"],
        tipo: "Óculos de sol",
        descricao: "Armação preta atemporal.",
        preco: 199.90,
        imagem: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600"
    },
    {
        id: 11,
        nome: "Lennon Classic",
        categorias: ["redondo", "grau"],
        tipo: "Óculos de grau",
        descricao: "Inspirado nos anos 70.",
        preco: 139.90,
        imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    },
    {
        id: 12,
        nome: "Retro Premium",
        categorias: ["gatinho", "sol"],
        tipo: "Óculos de sol",
        descricao: "Modelo vintage exclusivo.",
        preco: 249.90,
        imagem: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600"
    }
];

// CARRINHO
let carrinho = [];
let filtroAtual = "todos";

// ELEMENTOS
const areaProdutos = document.getElementById("produtos");
const pesquisa = document.getElementById("pesquisa");

// FORMATAR PREÇO
function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// MOSTRAR PRODUTOS
function mostrarProdutos() {

    const texto = pesquisa.value.toLowerCase();

    const resultado = produtos.filter(produto => {

        const combinaFiltro =
            filtroAtual === "todos" ||
            produto.categorias.includes(filtroAtual);

        const combinaPesquisa =
            produto.nome.toLowerCase().includes(texto) ||
            produto.tipo.toLowerCase().includes(texto);

        return combinaFiltro && combinaPesquisa;
    });

    areaProdutos.innerHTML = "";

    document.getElementById("mensagemVazia").hidden =
        resultado.length > 0;

    resultado.forEach(produto => {

        areaProdutos.innerHTML += `
            <div class="produto">

                <div class="imagem-produto">
                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                        loading="lazy"
                    >

                    <span class="etiqueta-produto">
                        VINTAGE
                    </span>
                </div>

                <div class="informacoes">

                    <span class="categoria">
                        ${produto.tipo}
                    </span>

                    <h3>${produto.nome}</h3>

                    <p class="descricao">
                        ${produto.descricao}
                    </p>

                    <p class="preco">
                        ${moeda(produto.preco)}
                    </p>

                    <button
                        class="adicionar"
                        onclick="adicionar(${produto.id})"
                    >
                        ADICIONAR À SACOLA
                    </button>

                </div>
            </div>
        `;
    });
}

// FILTROS
document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", () => {

        document.querySelector(".filtro.ativo")
            .classList.remove("ativo");

        botao.classList.add("ativo");

        filtroAtual = botao.dataset.filtro;

        mostrarProdutos();
    });
});

// PESQUISA
pesquisa.addEventListener("input", mostrarProdutos);

// ADICIONAR AO CARRINHO
function adicionar(id) {

    const produto = produtos.find(p => p.id === id);

    const existente = carrinho.find(p => p.id === id);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();

    alert(produto.nome + " adicionado à sacola!");
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {

    const itens = document.getElementById("itensCarrinho");

    const contador = document.getElementById("contador");

    const totalElemento = document.getElementById("total");

    let total = 0;
    let quantidade = 0;

    itens.innerHTML = "";

    if (carrinho.length === 0) {
        itens.innerHTML =
            "<p style='padding:25px 0;color:#888'>Sua sacola está vazia.</p>";
    }

    carrinho.forEach(produto => {

        total += produto.preco * produto.quantidade;

        quantidade += produto.quantidade;

        itens.innerHTML += `

            <div class="item">

                <img src="${produto.imagem}" alt="${produto.nome}">

                <div>

                    <h4>${produto.nome}</h4>

                    <p>${moeda(produto.preco)}</p>

                    <p>Quantidade: ${produto.quantidade}</p>

                    <button onclick="diminuir(${produto.id})">
                        −
                    </button>

                    <button onclick="aumentar(${produto.id})">
                        +
                    </button>

                    <button onclick="remover(${produto.id})">
                        Remover
                    </button>

                </div>

            </div>
        `;
    });

    contador.textContent = quantidade;

    totalElemento.textContent = moeda(total);
}

// AUMENTAR QUANTIDADE
function aumentar(id) {

    const produto = carrinho.find(p => p.id === id);

    produto.quantidade++;

    atualizarCarrinho();
}

// DIMINUIR QUANTIDADE
function diminuir(id) {

    const produto = carrinho.find(p => p.id === id);

    produto.quantidade--;

    if (produto.quantidade <= 0) {
        carrinho = carrinho.filter(p => p.id !== id);
    }

    atualizarCarrinho();
}

// REMOVER PRODUTO
function remover(id) {

    carrinho = carrinho.filter(p => p.id !== id);

    atualizarCarrinho();
}

// ABRIR CARRINHO
document.getElementById("abrirCarrinho")
    .addEventListener("click", () => {

        document.getElementById("carrinho")
            .classList.add("aberto");

        document.getElementById("fundo")
            .classList.add("aberto");
    });

// FECHAR CARRINHO
function fecharCarrinho() {

    document.getElementById("carrinho")
        .classList.remove("aberto");

    document.getElementById("fundo")
        .classList.remove("aberto");
}

document.getElementById("fecharCarrinho")
    .addEventListener("click", fecharCarrinho);

document.getElementById("fundo")
    .addEventListener("click", fecharCarrinho);

// FINALIZAR PEDIDO
document.getElementById("finalizar")
    .addEventListener("click", () => {

        if (carrinho.length === 0) {

            alert("Sua sacola está vazia!");

            return;
        }

        alert(
            "Pedido demonstrativo realizado! " +
            "Para vender de verdade, configure um sistema de pagamento."
        );
    });

// INICIAR LOJA
mostrarProdutos();
atualizarCarrinho();
