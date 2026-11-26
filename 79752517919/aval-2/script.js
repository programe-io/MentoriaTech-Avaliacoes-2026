
let posts = [
    {
        artista: "The Weeknd",
        musica: "Blinding Lights",
        genero: "Pop",
        descricao: "Uma das melhores músicas para ouvir no último volume! 🔥",
        imagem: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
        curtidas: 15,
        curtido: false
    },
    {
        artista: "Queen",
        musica: "Bohemian Rhapsody",
        genero: "Rock",
        descricao: "Um verdadeiro clássico que nunca envelhece! 🎸",
        imagem: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
        curtidas: 28,
        curtido: false
    },
    {
        artista: "Emicida",
        musica: "AmarElo",
        genero: "Rap",
        descricao: "Uma música incrível, cheia de significado. ❤️",
        imagem: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        curtidas: 20,
        curtido: false
    }
];

const listaPosts = document.getElementById("lista-posts");

function mostrarPosts(lista = posts) {
    listaPosts.innerHTML = "";

    if (lista.length === 0) {
        listaPosts.innerHTML = "<p>Nenhuma publicação encontrada.</p>";
        return;
    }

    lista.forEach((post) => {
        const index = posts.indexOf(post);

        const elemento = document.createElement("article");
        elemento.className = "post";

        const titulo = document.createElement("h3");
        titulo.textContent = "🎤 " + post.artista;

        const musica = document.createElement("p");
        musica.textContent = "🎵 Música: " + post.musica;

        const genero = document.createElement("p");
        genero.textContent = "Gênero: " + post.genero;

        const descricao = document.createElement("p");
        descricao.textContent = post.descricao;

        const info = document.createElement("div");
        info.className = "post-info";
        info.textContent = "Comunidade MusicFeed";

        elemento.append(titulo, musica, genero, descricao, info);

        if (post.imagem) {
            const img = document.createElement("img");
            img.src = post.imagem;
            img.alt = "Imagem da publicação musical";
            img.onerror = () => img.remove();
            elemento.appendChild(img);
        }

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const curtir = document.createElement("button");
        curtir.textContent = (post.curtido ? "❤️ " : "🤍 ") +
            "Curtir (" + post.curtidas + ")";

        if (post.curtido) {
            curtir.classList.add("curtido");
        }

        curtir.onclick = () => {
            post.curtido = !post.curtido;
            post.curtidas += post.curtido ? 1 : -1;
            mostrarPosts(lista);
        };

        const comentar = document.createElement("button");
        comentar.textContent = "💬 Comentar";

        comentar.onclick = () => {
            const comentario = prompt("Digite seu comentário:");

            if (comentario && comentario.trim()) {
                alert("Comentário registrado: " + comentario);
            }
        };

        acoes.append(curtir, comentar);
        elemento.appendChild(acoes);

        listaPosts.appendChild(elemento);
    });
}

function criarPost() {
    const artista = document.getElementById("artista").value.trim();
    const musica = document.getElementById("musica").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!artista || !musica || !genero || !descricao) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    posts.unshift({
        artista,
        musica,
        genero,
        descricao,
        imagem,
        curtidas: 0,
        curtido: false
    });

    document.getElementById("artista").value = "";
    document.getElementById("musica").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("imagem").value = "";

    mostrarPosts();
    alert("Publicação criada com sucesso! 🎵");
}

function filtrarGenero(genero) {
    if (genero === "Todos") {
        mostrarPosts();
    } else {
        const filtrados = posts.filter(post =>
            post.genero.toLowerCase() === genero.toLowerCase()
        );

        mostrarPosts(filtrados);
    }
}

document.getElementById("pesquisa").addEventListener("input", function() {
    const termo = this.value.toLowerCase();

    const resultados = posts.filter(post =>
        post.artista.toLowerCase().includes(termo) ||
        post.musica.toLowerCase().includes(termo) ||
        post.genero.toLowerCase().includes(termo)
    );

    mostrarPosts(resultados);
});

mostrarPosts();
