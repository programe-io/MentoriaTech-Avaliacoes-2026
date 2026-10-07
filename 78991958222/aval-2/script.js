// Dados iniciais
let posts = [
    {
        id: 1,
        nome: "Maria Silva",
        avatar: "https://i.pravatar.cc/40?img=5",
        texto: "Bom dia, pessoal! Hoje é um ótimo dia para codar 💻✨",
        tempo: "há 5 minutos",
        curtidas: 12,
        curtido: false
    },
    {
        id: 2,
        nome: "João Santos",
        avatar: "https://i.pravatar.cc/40?img=8",
        texto: "Alguém aí já testou o novo framework de CSS? Parece incrível!",
        tempo: "há 20 minutos",
        curtidas: 7,
        curtido: false
    },
    {
        id: 3,
        nome: "Ana Costa",
        avatar: "https://i.pravatar.cc/40?img=9",
        texto: "Terminando meu primeiro projeto em JavaScript! 🎉 #orgulho",
        tempo: "há 1 hora",
        curtidas: 25,
        curtido: false
    }
];

const feed = document.getElementById("feed");
const btnPublicar = document.getElementById("btn-publicar");
const textoPost = document.getElementById("texto-post");

// Renderizar todos os posts
function renderizarFeed() {
    feed.innerHTML = "";
    posts.forEach(post => {
        feed.appendChild(criarPost(post));
    });
}

// Criar elemento de um post
function criarPost(post) {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
        <div class="post-topo">
            <img src="${post.avatar}" alt="avatar" class="avatar">
            <div class="info">
                <strong>${post.nome}</strong>
                <small>${post.tempo}</small>
            </div>
        </div>
        <p class="post-texto">${post.texto}</p>
        <div class="post-acoes">
            <button class="btn-curtir ${post.curtido ? 'curtido' : ''}">
                post.curtido?′❤®′:′🤍′{post.curtido ? '❤️' : '🤍'}post.curtido?′❤R◯′:′🤍′{post.curtidas}
            </button>
            <button class="btn-comentar">💬 Comentar</button>
            <button class="btn-compartilhar">↗️ Compartilhar</button>
        </div>
    `;

    // Ação de curtir
    div.querySelector(".btn-curtir").addEventListener("click", function () {
        post.curtido = !post.curtido;
        post.curtidas += post.curtido ? 1 : -1;
        renderizarFeed();
    });

    // Ação de compartilhar
    div.querySelector(".btn-compartilhar").addEventListener("click", function () {
        alert("Post compartilhado! 🚀");
    });

    // Ação de comentar
    div.querySelector(".btn-comentar").addEventListener("click", function () {
        const comentario = prompt("Digite seu comentário:");
        if (comentario) {
            alert(`post.nomeleuseucomentaˊrio:"{post.nome} leu seu comentário: "post.nomeleuseucomentaˊrio:"{comentario}" 💬`);
        }
    });

    return div;
}

// Publicar novo post
btnPublicar.addEventListener("click", () => {
    const texto = textoPost.value.trim();

    if (texto === "") {
        alert("Escreva algo antes de publicar! ✍️");
        return;
    }

    const novoPost = {
        id: Date.now(),
        nome: "Você",
        avatar: "https://i.pravatar.cc/40?img=12",
        texto: texto,
        tempo: "agora mesmo",
        curtidas: 0,
        curtido: false
    };

    posts.unshift(novoPost); // Adiciona no início
    textoPost.value = "";
    renderizarFeed();
});

// Publicar com Ctrl + Enter
textoPost.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
        btnPublicar.click();
    }
});

// Iniciar o feed
renderizarFeed();
