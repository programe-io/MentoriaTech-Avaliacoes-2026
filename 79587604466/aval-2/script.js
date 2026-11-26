
const restaurantes = [
    {
        id: 1,
        nome: "Pizzaria Bella Itália",
        categoria: "Pizza",
        local: "Teresina - PI",
        imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900",
        descricao: "As melhores pizzas artesanais, com massa especial, queijo e ingredientes selecionados.",
        estrelas: 5,
        curtidas: 120
    },
    {
        id: 2,
        nome: "Burger House",
        categoria: "Hambúrguer",
        local: "Teresina - PI",
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900",
        descricao: "Hambúrgueres artesanais, suculentos e preparados com ingredientes frescos.",
        estrelas: 4,
        curtidas: 95
    },
    {
        id: 3,
        nome: "Sushi Premium",
        categoria: "Japonesa",
        local: "Teresina - PI",
        imagem: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900",
        descricao: "Uma experiência japonesa com sushis, sashimis e pratos especiais.",
        estrelas: 5,
        curtidas: 150
    },
    {
        id: 4,
        nome: "Sabor Nordestino",
        categoria: "Brasileira",
        local: "Teresina - PI",
        imagem: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900",
        descricao: "Comida regional com muito sabor, tradição e aquele gostinho de comida caseira.",
        estrelas: 5,
        curtidas: 180
    }
];

const publicacoes = document.getElementById("publicacoes");
const pesquisa = document.getElementById("pesquisa");

let categoriaAtual = "Todos";

function renderizarFeed() {

    publicacoes.innerHTML = "";

    const termo = pesquisa.value.toLowerCase();

    const filtrados = restaurantes.filter(restaurante => {

        const correspondeNome =
            restaurante.nome.toLowerCase().includes(termo);

        const correspondeCategoria =
            categoriaAtual === "Todos" ||
            restaurante.categoria === categoriaAtual;

        return correspondeNome && correspondeCategoria;
    });

    if (filtrados.length === 0) {
        publicacoes.textContent = "Nenhum restaurante encontrado.";
        return;
    }

    filtrados.forEach(restaurante => {

        const card = document.createElement("article");
        card.className = "publicacao";

        const imagem = document.createElement("img");
        imagem.src = restaurante.imagem;
        imagem.alt = restaurante.nome;

        const conteudo = document.createElement("div");
        conteudo.className = "conteudo";

        const titulo = document.createElement("h3");
        titulo.textContent = restaurante.nome;

        const local = document.createElement("p");
        local.className = "localizacao";
        local.textContent =
            `📍 ${restaurante.local} | ${restaurante.categoria}`;

        const descricao = document.createElement("p");
        descricao.className = "descricao";
        descricao.textContent = restaurante.descricao;

        const avaliacao = document.createElement("p");
        avaliacao.className = "avaliacao";
        avaliacao.textContent =
            "⭐".repeat(restaurante.estrelas) +
            ` (${restaurante.estrelas}/5)`;

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const curtir = document.createElement("button");
        curtir.textContent = `❤️ Curtir (${restaurante.curtidas})`;

        curtir.addEventListener("click", () => {
            restaurante.curtidas++;
            renderizarFeed();
        });

        const comentar = document.createElement("button");
        comentar.textContent = "💬 Comentar";

        acoes.append(curtir, comentar);

        const formulario = document.createElement("div");
        formulario.className = "comentario";

        const campo = document.createElement("input");
        campo.placeholder = "Escreva um comentário...";

        const enviar = document.createElement("button");
        enviar.textContent = "Enviar";

        const lista = document.createElement("div");
        lista.className = "lista-comentarios";

        enviar.addEventListener("click", () => {

            const texto = campo.value.trim();

            if (!texto) {
                alert("Digite um comentário!");
                return;
            }

            const comentario = document.createElement("p");
            comentario.textContent = "👤 " + texto;

            lista.appendChild(comentario);
            campo.value = "";
        });

        comentar.addEventListener("click", () => {
            campo.focus();
        });

        formulario.append(campo, enviar);

        conteudo.append(
            titulo,
            local,
            descricao,
            avaliacao,
            acoes,
            formulario,
            lista
        );

        card.append(imagem, conteudo);
        publicacoes.appendChild(card);
    });
}

// Pesquisa
pesquisa.addEventListener("input", renderizarFeed);

// Filtros de categorias
document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", () => {

        document.querySelector(".filtro.ativo")
            .classList.remove("ativo");

        botao.classList.add("ativo");

        categoriaAtual = botao.dataset.categoria;

        renderizarFeed();
    });
});

// Carregar feed
renderizarFeed();
