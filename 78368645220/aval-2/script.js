
const telefoneWhatsApp = "5500000000000";
// Substitua pelo número real: 55 + DDD + número.

const produtos = [
    {
        nome: "Urban Black",
        categoria: "Casual",
        preco: 249.90,
        oferta: 199.90,
        estoque: 12,
        tamanhos: "38 ao 43",
        imagem: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=80"
    },
    {
        nome: "Running Pro",
        categoria: "Esportivo",
        preco: 299.90,
        oferta: 239.90,
        estoque: 8,
        tamanhos: "37 ao 44",
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    },
    {
        nome: "Street White",
        categoria: "Casual",
        preco: 219.90,
        oferta: 179.90,
        estoque: 10,
        tamanhos: "36 ao 43",
        imagem: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80"
    },
    {
        nome: "Sport Blue",
        categoria: "Esportivo",
        preco: 279.90,
        oferta: 229.90,
        estoque: 6,
        tamanhos: "38 ao 44",
        imagem: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80"
    },
    {
        nome: "Classic Style",
        categoria: "Casual",
        preco: 199.90,
        oferta: 159.90,
        estoque: 15,
        tamanhos: "35 ao 42",
        imagem: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80"
    },
    {
        nome: "Fitness Max",
        categoria: "Esportivo",
        preco: 329.90,
        oferta: 279.90,
        estoque: 5,
        tamanhos: "37 ao 44",
        imagem: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=80"
    },
    {
        nome: "Street Color",
        categoria: "Casual",
        preco: 239.90,
        oferta: 199.90,
        estoque: 9,
        tamanhos: "36 ao 43",
        imagem: "https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=700&q=80"
    },
    {
        nome: "Corrida Flex",
        categoria: "Esportivo",
        preco: 289.90,
        oferta: 249.90,
        estoque: 7,
        tamanhos: "38 ao 45",
        imagem: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=700&q=80"
    },
    {
        nome: "Casual Beige",
        categoria: "Casual",
        preco: 229.90,
        oferta: 189.90,
        estoque: 4,
        tamanhos: "35 ao 42",
        imagem: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=80"
    },
    {
        nome: "Performance",
        categoria: "Esportivo",
        preco: 349.90,
        oferta: 299.90,
        estoque: 3,
        tamanhos: "39 ao 44",
        imagem: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=700&q=80"
    }
];

const lista = document.getElementById("lista-produtos");
const pesquisa = document.getElementById("pesquisa");
const categoria = document.getElementById("categoria");
const semResultados = document.getElementById("sem-resultados");

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos() {
    const termo = pesquisa.value.toLowerCase().trim();
    const categoriaSelecionada = categoria.value;

    const encontrados = produtos.filter(produto => {
        const correspondeNome =
            produto.nome.toLowerCase().includes(termo);

        const correspondeCategoria =
            categoriaSelecionada === "todos" ||
            produto.categoria === categoriaSelecionada;

        return correspondeNome && correspondeCategoria;
    });

    lista.innerHTML = encontrados.map(produto => {
        const mensagem = encodeURIComponent(
            `Olá! Tenho interesse no tênis ${produto.nome}, ` +
            `por ${formatarPreco(produto.oferta)}. ` +
            `Quais tamanhos estão disponíveis?`
        );

        const linkCompra =
            `https://wa.me/${telefoneWhatsApp}?text=${mensagem}`;

        return `
            <article class="produto-card">
                <div class="produto-imagem">
                    <img
                        src="${produto.imagem}"
                        alt="Tênis ${produto.nome}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='https://placehold.co/700x500/f1f1f5/333333?text=Tenis';"
                    >

                    <span class="selo">
                        ${produto.oferta < produto.preco
                            ? "PROMOÇÃO"
                            : "NOVIDADE"}
                    </span>

                    <span class="selo-estoque">
                        Estoque: ${produto.estoque}
                    </span>
                </div>

                <div class="produto-info">
                    <h3>Tênis ${produto.nome}</h3>

                    <p class="produto-detalhes">
                        ${produto.categoria} • Tamanhos ${produto.tamanhos}
                    </p>

                    <p class="preco-antigo">
                        ${formatarPreco(produto.preco)}
                    </p>

                    <p class="preco">
                        ${formatarPreco(produto.oferta)}
                    </p>

                    <a
                        class="botao-comprar ${produto.estoque === 0 ? "indisponivel" : ""}"
                        href="${produto.estoque > 0 ? linkCompra : "#"}"
                        ${produto.estoque > 0
                            ? 'target="_blank" rel="noopener"'
                            : 'aria-disabled="true"'}
                    >
                        ${produto.estoque > 0
                            ? "COMPRAR PELO WHATSAPP"
                            : "ESGOTADO"}
                    </a>
                </div>
            </article>
        `;
    }).join("");

    semResultados.hidden = encontrados.length > 0;
}

pesquisa.addEventListener("input", mostrarProdutos);
categoria.addEventListener("change", mostrarProdutos);

const contatoWhatsApp = document.getElementById("link-whatsapp");

contatoWhatsApp.href =
    `https://wa.me/${telefoneWhatsApp}?text=` +
    encodeURIComponent("Olá! Gostaria de conhecer os tênis da STEPUP.");

mostrarProdutos();