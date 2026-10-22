const jogos = [
    {
        nome: "Minecraft",
        categoria: "aventura",
        descricao: "Explore, construa e sobreviva em um mundo aberto.",
        imagem: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
    },
    {
        nome: "Jogos Competitivos",
        categoria: "esports",
        descricao: "Entre na disputa e mostre suas habilidades.",
        imagem: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
    },
    {
        nome: "Setup Gamer",
        categoria: "tecnologia",
        descricao: "Conheça equipamentos para sua experiência gamer.",
        imagem: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80"
    }
];

const listaJogos = document.querySelector("#games-grid");
const campoPesquisa = document.querySelector("#pesquisa");
const botoesFiltro = document.querySelectorAll(".filtro");

function mostrarJogos(filtro = "todos", pesquisa = "") {
    const encontrados = jogos.filter(jogo => {
        const combinaCategoria =
            filtro === "todos" || jogo.categoria === filtro;

        const combinaPesquisa =
            jogo.nome.toLowerCase().includes(pesquisa.toLowerCase());

        return combinaCategoria && combinaPesquisa;
    });

    listaJogos.innerHTML = "";

    if (encontrados.length === 0) {
        listaJogos.innerHTML =
            "<p>Nenhum jogo encontrado.</p>";
        return;
    }

    encontrados.forEach(jogo => {
        const card = document.createElement("article");
        card.className = "game-card";

        card.innerHTML = `
            <img src="${jogo.imagem}" alt="${jogo.nome}">
            <div class="card-content">
                <span class="category">${jogo.categoria}</span>
                <h3>${jogo.nome}</h3>
                <p>${jogo.descricao}</p>
                <button class="curtir" type="button">
                    ♡ Curtir <span>0</span>
                </button>
            </div>
        `;

        const botaoCurtir = card.querySelector(".curtir");
        const contador = botaoCurtir.querySelector("span");
        let curtido = false;

        botaoCurtir.addEventListener("click", () => {
            curtido = !curtido;
            contador.textContent = curtido ? "1" : "0";
            botaoCurtir.firstChild.textContent =
                curtido ? "♥ Curtido " : "♡ Curtir ";
        });

        listaJogos.appendChild(card);
    });
}

let categoriaAtual = "todos";

campoPesquisa.addEventListener("input", () => {
    mostrarJogos(categoriaAtual, campoPesquisa.value);
});

botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
        categoriaAtual = botao.dataset.categoria;

        botoesFiltro.forEach(item =>
            item.classList.remove("ativo")
        );

        botao.classList.add("ativo");
        mostrarJogos(categoriaAtual, campoPesquisa.value);
    });
});

mostrarJogos();