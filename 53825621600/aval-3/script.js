const contas = [
    {
        nome: "mariana",
        foto: "https://i.pravatar.cc/150?img=47"
    },
    {
        nome: "pedro",
        foto: "https://i.pravatar.cc/150?img=12"
    },
    {
        nome: "julia",
        foto: "https://i.pravatar.cc/150?img=44"
    },
    {
        nome: "gabriel",
        foto: "https://i.pravatar.cc/150?img=13"
    },
    {
        nome: "ana",
        foto: "https://i.pravatar.cc/150?img=45"
    },
    {
        nome: "lucas",
        foto: "https://i.pravatar.cc/150?img=11"
    }
];

const stories = document.getElementById("stories");

contas.forEach(conta => {
    stories.innerHTML += `
        <div class="story">
            <img src="${conta.foto}" alt="${conta.nome}">
            <p>${conta.nome}</p>
        </div>
    `;
});

const publicacoes = [
    {
        usuario: "mariana",
        fotoPerfil: "https://i.pravatar.cc/150?img=47",
        imagem: "https://picsum.photos/id/1011/600/600",
        legenda: "Aproveitando o dia! ☀️"
    },
    {
        usuario: "pedro",
        fotoPerfil: "https://i.pravatar.cc/150?img=12",
        imagem: "https://picsum.photos/id/1015/600/600",
        legenda: "Que lugar incrível! 🌎"
    },
    {
        usuario: "julia",
        fotoPerfil: "https://i.pravatar.cc/150?img=44",
        imagem: "https://picsum.photos/id/1025/600/600",
        legenda: "Momentos especiais ❤️"
    }
];

const feed = document.getElementById("feed");

publicacoes.forEach(post => {
    feed.innerHTML += `
        <article class="post">

            <div class="post-header">
                <img src="${post.fotoPerfil}" alt="">
                <strong>${post.usuario}</strong>
            </div>

            <img class="post-image"
                 src="${post.imagem}"
                 alt="Foto da publicação">

            <div class="post-actions">
                <button class="like">♡</button>
                <button class="comment">💬</button>
                <button class="share">➤</button>
                <button class="save">♧</button>
            </div>

            <div class="caption">
                <strong>${post.usuario}</strong>
                ${post.legenda}
            </div>

        </article>
    `;
});

// Curtir publicações
document.querySelectorAll(".like").forEach(botao => {
    botao.addEventListener("click", () => {
        botao.classList.toggle("liked");

        botao.textContent =
            botao.classList.contains("liked") ? "♥" : "♡";
    });
});