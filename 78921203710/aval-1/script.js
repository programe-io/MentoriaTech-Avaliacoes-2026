
const telefone = "5586989046527";

const produtos = [
    {
        id: 1,
        nome: "Vestido Floral",
        preco: 129.90,
        imagem: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600"
    },
    {
        id: 2,
        nome: "Vestido Elegante",
        preco: 149.90,
        imagem: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600"
    },
    {
        id: 3,
        nome: "Blusa Feminina",
        preco: 69.90,
        imagem: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600"
    },
    {
        id: 4,
        nome: "Conjunto Feminino",
        preco: 159.90,
        imagem: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600"
    },
    {
        id: 5,
        nome: "Saia Moderna",
        preco: 89.90,
        imagem: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600"
    },
    {
        id: 6,
        nome: "Look Casual",
        preco: 119.90,
        imagem: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600"
    },
    {
        id: 7,
        nome: "Vestido de Festa",
        preco: 189.90,
        imagem: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600"
    },
    {
        id: 8,
        nome: "Look Fashion",
        preco: 139.90,
        imagem: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600"
    }
];

const listaProdutos = document.getElementById("listaProdutos");

function mostrarProdutos(lista) {
    listaProdutos.innerHTML = "";

    if (lista.length === 0) {
        listaProdutos.innerHTML = "<p>Nenhuma roupa encontrada.</p>";
        return;
    }

    lista.forEach(produto => {
        listaProdutos.innerHTML += `
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

                <button onclick="comprar(${produto.id})">
                    Comprar pelo WhatsApp
                </button>
            </div>
        `;
    });
}

function comprar(id) {
    const produto = produtos.find(item => item.id === id);

    const mensagem =
        `Olá! Tenho interesse em comprar:\n` +
        `Produto: ${produto.nome}\n` +
        `Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}`;

    const link =
        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
}

document.getElementById("pesquisa").addEventListener("input", function() {
    const busca = this.value.toLowerCase();

    const resultado = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(busca)
    );

    mostrarProdutos(resultado);
});

mostrarProdutos(produtos);
