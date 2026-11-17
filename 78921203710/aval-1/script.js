
const telefone = "5586989046527";

const produtos = [

    {
        nome: "Vestido Floral",
        preco: 129.90,
        imagem: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600"
    },

    {
        nome: "Vestido Elegante",
        preco: 149.90,
        imagem: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600"
    },

    {
        nome: "Blusa Feminina",
        preco: 69.90,
        imagem: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600"
    },

    {
        nome: "Conjunto Feminino",
        preco: 159.90,
        imagem: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600"
    },

    {
        nome: "Saia Moderna",
        preco: 89.90,
        imagem: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600"
    },

    {
        nome: "Look Casual",
        preco: 119.90,
        imagem: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600"
    },

    {
        nome: "Vestido de Festa",
        preco: 189.90,
        imagem: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600"
    },

    {
        nome: "Look Fashion",
        preco: 139.90,
        imagem: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600"
    }

];

const vitrine = document.getElementById("vitrine");

function mostrarProdutos(lista) {

    vitrine.innerHTML = "";

    if (lista.length === 0) {
        vitrine.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    lista.forEach((produto, index) => {

        vitrine.innerHTML += `

            <div class="produto">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    loading="lazy"
                >

                <h3>${produto.nome}</h3>

                <p class="preco">
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </p>

                <button onclick="comprar(${index})">
                    Comprar agora
                </button>

            </div>

        `;

    });

}

function comprar(index) {

    const produto = produtos.find(
        (item, i) => i === index
    );

    const mensagem =
        `Olá! Gostaria de comprar:\n` +
        `Produto: ${produto.nome}\n` +
        `Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}`;

    const link =
        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");

}

// PESQUISA DE PRODUTOS

document.getElementById("pesquisa")
.addEventListener("input", function() {

    const pesquisa = this.value.toLowerCase();

    const resultado = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(pesquisa)
    );

    mostrarProdutos(resultado);

});

// CARREGAR PRODUTOS NA TELA

mostrarProdutos(produtos);
