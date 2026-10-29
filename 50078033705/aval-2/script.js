
let proximoId = 4;

let posts = [
    {
        id: 1,
        usuario: "Ana 💗",
        filme: "Como Eu Era Antes de Você",
        imagem: "",
        descricao: "Uma história emocionante sobre Louisa e Will, que mostra como o amor pode transformar nossas vidas. Preparem os lenços! 😭💕",
        nota: 10,
        curtidas: 24,
        curtido: false,
        favorito: false,
        comentarios: [
            "Esse filme acaba comigo toda vez! 😭",
            "Um dos romances mais marcantes!"
        ]
    },
    {
        id: 2,
        usuario: "Mariana 🌷",
        filme: "Esposa de Mentirinha",
        imagem: "",
        descricao: "Uma comédia romântica divertida, cheia de confusões e momentos fofos. Perfeito para assistir dando risada! 😂💞",
        nota: 9.5,
        curtidas: 18,
        curtido: false,
        favorito: false,
        comentarios: [
            "Esse casal é muito divertido! 💗"
        ]
    },
    {
        id: 3,
        usuario: "Julia 💜",
        filme: "Como Perder um Homem em 10 Dias",
        imagem: "",
        descricao: "Uma jornalista e um publicitário entram em uma aposta que vira uma confusão romântica inesquecível. Um clássico! 💋🌹",
        nota: 10,
        curtidas: 31,
        curtido: false,
        favorito: false,
        comentarios: [
            "Esse é simplesmente perfeito!",
            "Quero viver um romance assim! 💕"
        ]
    }
];

// Protege os textos digitados antes de colocá-los no HTML.
function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, function(letra) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[letra];
    });
}

// Mostra as publicações no feed.
function renderizarPosts() {
    const lista = document.getElementById("listaPosts");
    const busca = document.getElementById("pesquisa")
        .value.toLowerCase().trim();

    const filtrados = posts.filter(post =>
        post.filme.toLowerCase().includes(busca) ||
        post.usuario.toLowerCase().includes(busca) ||
        post.descricao.toLowerCase().includes(busca)
    );

    if (filtrados.length === 0) {
        lista.innerHTML =
            '<p class="sem-resultados">Nenhum filme encontrado. 💔</p>';
        return;
    }

    lista.innerHTML = filtrados.map(post => `
        <article class="post">
            <div class="post-topo">
                <div class="avatar">🎀</div>
                <div>
                    <strong>${escapar(post.usuario)}</strong>
                    <p class="data">Apaixonada por romances 💕</p>
                </div>
            </div>

            <h3 class="filme-titulo">
                🎬 ${escapar(post.filme)}
            </h3>

            ${post.imagem ? `
                <img
                    class="poster"
                    src="${escapar(post.imagem)}"
                    alt="Imagem do filme ${escapar(post.filme)}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                >
            ` : ""}

            <p class="descricao">${escapar(post.descricao)}</p>

            ${post.nota !== "" && post.nota !== null ? `
                <p class="nota">
                    ⭐ Minha nota: ${escapar(post.nota)}/10
                </p>
            ` : ""}

            <div class="acoes">
                <button class="curtir"
                    onclick="curtirPost(${post.id})">
                    ${post.curtido ? "❤️ Curtido" : "🤍 Curtir"}
                    (${post.curtidas})
                </button>

                <button class="favoritar"
                    onclick="favoritarPost(${post.id})">
                    ${post.favorito ? "💜 Favoritado" : "🤍 Favoritar"}
                </button>

                <button class="comentario-btn"
                    onclick="mostrarComentarios(${post.id})">
                    💬 Comentários (${post.comentarios.length})
                </button>
            </div>

            <div class="comentarios" id="comentarios-${post.id}">
                <div id="comentarios-lista-${post.id}">
                    ${post.comentarios.map(comentario => `
                        <div class="comentario-item">
                            💗 ${escapar(comentario)}
                        </div>
                    `).join("")}
                </div>

                <input
                    type="text"
                    id="novo-comentario-${post.id}"
                    placeholder="Escreva um comentário..."
                >

                <button class="btn-publicar"
                    onclick="comentar(${post.id})">
                    Enviar 💌
                </button>
            </div>
        </article>
    `).join("");
}

// Mostra somente os filmes favoritados.
function renderizarFavoritos() {
    const lista = document.getElementById("listaFavoritos");
    const favoritos = posts.filter(post => post.favorito);

    if (favoritos.length === 0) {
        lista.innerHTML =
            '<p class="sem-resultados">Seus filmes favoritos aparecerão aqui! 💜</p>';
        return;
    }

    lista.innerHTML = favoritos.map(post => `
        <div class="post">
            <h3 class="filme-titulo">
                💜 ${escapar(post.filme)}
            </h3>
            <p class="descricao">${escapar(post.descricao)}</p>
            <button class="favoritar"
                onclick="favoritarPost(${post.id})">
                Remover dos favoritos
            </button>
        </div>
    `).join("");
}

// Adiciona ou remove uma curtida.
function curtirPost(id) {
    const post = posts.find(p => p.id === id);

    if (!post) return;

    if (post.curtido) {
        post.curtidas--;
        post.curtido = false;
    } else {
        post.curtidas++;
        post.curtido = true;
    }

    renderizarPosts();
}

// Adiciona ou remove um filme dos favoritos.
function favoritarPost(id) {
    const post = posts.find(p => p.id === id);

    if (!post) return;

    post.favorito = !post.favorito;

    renderizarPosts();
    renderizarFavoritos();
}

// Abre ou fecha os comentários.
function mostrarComentarios(id) {
    const area = document.getElementById("comentarios-" + id);
    area.classList.toggle("visivel");
}

// Publica um comentário.
function comentar(id) {
    const campo = document.getElementById("novo-comentario-" + id);
    const texto = campo.value.trim();

    if (!texto) {
        alert("Escreva um comentário primeiro! 💗");
        return;
    }

    const post = posts.find(p => p.id === id);

    if (!post) return;

    post.comentarios.push(texto);

    renderizarPosts();

    document.getElementById("comentarios-" + id)
        .classList.add("visivel");
}

// Cria uma nova publicação.
function publicarPost() {
    const usuario = document.getElementById("nomeUsuario")
        .value.trim();
    const filme = document.getElementById("nomeFilme")
        .value.trim();
    const imagem = document.getElementById("imagemFilme")
        .value.trim();
    const descricao = document.getElementById("textoPost")
        .value.trim();
    const campoNota = document.getElementById("notaFilme").value;
    const nota = campoNota === "" ? "" : Number(campoNota);

    if (!usuario || !filme || !descricao) {
        alert("Preencha seu nome, o nome do filme e a descrição! 💕");
        return;
    }

    if (imagem && !/^https?:\/\/\S+$/i.test(imagem)) {
        alert("Digite um link de imagem válido começando com http:// ou https://");
        return;
    }

    if (campoNota !== "" &&
        (!Number.isFinite(nota) || nota < 0 || nota > 10)) {
        alert("A nota deve estar entre 0 e 10.");
        return;
    }

    posts.unshift({
        id: proximoId++,
        usuario: usuario,
        filme: filme,
        imagem: imagem,
        descricao: descricao,
        nota: nota,
        curtidas: 0,
        curtido: false,
        favorito: false,
        comentarios: []
    });

    document.getElementById("nomeUsuario").value = "";
    document.getElementById("nomeFilme").value = "";
    document.getElementById("imagemFilme").value = "";
    document.getElementById("textoPost").value = "";
    document.getElementById("notaFilme").value = "";

    renderizarPosts();
    renderizarFavoritos();

    document.getElementById("feed").scrollIntoView({
        behavior: "smooth"
    });

    alert("Sua publicação foi adicionada! 💗");
}

// Atualiza os resultados enquanto você digita.
document.getElementById("pesquisa")
    .addEventListener("input", renderizarPosts);

// Carrega as publicações iniciais.
renderizarPosts();
renderizarFavoritos();
