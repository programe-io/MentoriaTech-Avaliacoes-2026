
const feed = document.getElementById("feed");

let publicacoes = JSON.parse(
    localStorage.getItem("lorrane_posts") || "[]"
);

// PUBLICAÇÕES DE EXEMPLO

const exemplos = [
    {
        id: "exemplo1",
        usuario: "Maria",
        legenda: "Aproveitando cada momento! 💗✨",
        imagem: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
        tipo: "imagem",
        curtidas: 120,
        comentarios: []
    },
    {
        id: "exemplo2",
        usuario: "João",
        legenda: "Um dia incrível! 😎🔥",
        imagem: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        tipo: "imagem",
        curtidas: 85,
        comentarios: []
    }
];

// SALVAR PUBLICAÇÕES

function salvar() {
    localStorage.setItem(
        "lorrane_posts",
        JSON.stringify(publicacoes)
    );
}

// MOSTRAR PUBLICAÇÕES

function mostrarPublicacoes() {

    feed.innerHTML = "";

    const todas = [
        ...publicacoes,
        ...exemplos
    ];

    document.getElementById("numeroPosts").textContent =
        publicacoes.length;

    todas.slice().reverse().forEach(post => {

        const card = document.createElement("article");
        card.className = "post";
        card.dataset.id = post.id;
        card.dataset.usuario = post.usuario.toLowerCase();

        const topo = document.createElement("div");
        topo.className = "post-topo";

        topo.innerHTML = `
            <div class="post-avatar">💗</div>
            <strong>${post.usuario === "Lorrane" ? "Lorrane" : post.usuario}</strong>
        `;

        const legenda = document.createElement("p");
        legenda.className = "post-legenda";
        legenda.textContent = post.legenda;

        const acoes = document.createElement("div");
        acoes.className = "post-acoes";

        const curtir = document.createElement("button");
        curtir.className = "curtir";
        curtir.innerHTML = `❤️ Curtir <span>${post.curtidas}</span>`;

        const comentar = document.createElement("button");
        comentar.className = "abrir-comentarios";
        comentar.textContent = "💬 Comentar";

        const compartilhar = document.createElement("button");
        compartilhar.className = "compartilhar";
        compartilhar.textContent = "↗ Compartilhar";

        acoes.append(curtir, comentar, compartilhar);

        const comentarios = document.createElement("div");
        comentarios.className = "comentarios";

        post.comentarios.forEach(texto => {
            const p = document.createElement("p");
            p.textContent = "👤 " + texto;
            comentarios.appendChild(p);
        });

        const formulario = document.createElement("div");
        formulario.className = "form-comentario";
        formulario.style.display = "none";

        const campo = document.createElement("input");
        campo.placeholder = "Escreva um comentário...";

        const enviar = document.createElement("button");
        enviar.textContent = "Enviar";

        formulario.append(campo, enviar);

        enviar.onclick = () => adicionarComentario(post.id, campo);

        campo.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                adicionarComentario(post.id, campo);
            }
        });

        card.append(topo);

        if (post.imagem) {
            let media;

            if (post.tipo === "video") {
                media = document.createElement("video");
                media.controls = true;
                media.loop = true;
                media.playsInline = true;
            } else {
                media = document.createElement("img");
                media.alt = "Publicação de " + post.usuario;
            }

            media.src = post.imagem;
            media.className = "post-media";
            card.appendChild(media);
        }

        card.append(
            acoes,
            legenda,
            comentarios,
            formulario
        );

        feed.appendChild(card);

        curtir.onclick = () => curtirPost(post.id);

        comentar.onclick = () => {
            formulario.style.display =
                formulario.style.display === "none"
                ? "flex"
                : "none";
        };

        compartilhar.onclick = () => compartilharPost(post);
    });
}

// CURTIR PUBLICAÇÃO

function curtirPost(id) {

    const post = publicacoes.find(p => p.id === id);

    if (!post) {
        const exemplo = exemplos.find(p => p.id === id);
        if (!exemplo) return;

        exemplo.curtidas++;
    } else {
        post.curtidas++;
        salvar();
    }

    mostrarPublicacoes();
}

// COMENTAR PUBLICAÇÃO

function adicionarComentario(id, campo) {

    const texto = campo.value.trim();

    if (!texto) {
        alert("Digite um comentário!");
        return;
    }

    const post = publicacoes.find(p => p.id === id);

    if (post) {
        post.comentarios.push("Lorrane: " + texto);
        salvar();
    } else {
        const exemplo = exemplos.find(p => p.id === id);
        exemplo.comentarios.push("Lorrane: " + texto);
    }

    mostrarPublicacoes();
}

// PUBLICAR FOTO OU VÍDEO

function publicar() {

    const legenda = document.getElementById("legenda").value.trim();
    const arquivo = document.getElementById("arquivo").files[0];

    if (!arquivo) {
        alert("Escolha uma foto ou vídeo!");
        return;
    }

    if (!arquivo.type.startsWith("image/") &&
        !arquivo.type.startsWith("video/")) {
        alert("Escolha uma imagem ou vídeo válido!");
        return;
    }

    if (arquivo.size > 20 * 1024 * 1024) {
        alert("O arquivo deve ter no máximo 20 MB!");
        return;
    }

    const endereco = URL.createObjectURL(arquivo);

    const novaPublicacao = {
        id: "post_" + Date.now(),
        usuario: "Lorrane",
        legenda: legenda || "Nova publicação! 💗",
        imagem: endereco,
        tipo: arquivo.type.startsWith("video/") ? "video" : "imagem",
        curtidas: 0,
        comentarios: []
    };

    // A publicação com arquivo fica disponível nesta sessão.
    publicacoes.push(novaPublicacao);

    document.getElementById("legenda").value = "";
    document.getElementById("arquivo").value = "";

    mostrarPublicacoes();

    alert("Sua publicação foi criada! 💗");

    document.getElementById("explorar").scrollIntoView();
}

// COMPARTILHAR

async function compartilharPost(post) {

    try {
        if (navigator.share) {
            await navigator.share({
                title: "Lorrane",
                text: post.legenda
            });
        } else {
            await navigator.clipboard.writeText(post.legenda);
            alert("Legenda copiada!");
        }
    } catch (erro) {
        console.log("Compartilhamento cancelado.");
    }
}

// CRIAR STORY

function criarStory() {

    const texto = prompt("O que deseja publicar no seu story?");

    if (!texto || !texto.trim()) return;

    const story = document.createElement("div");
    story.className = "story";

    story.innerHTML = `
        <div class="story-foto">💗</div>
        <span>Lorrane</span>
    `;

    story.onclick = () => verStory("Lorrane", texto);

    document.getElementById("listaStories").prepend(story);

    alert("Story publicado com sucesso!");
}

// VISUALIZAR STORY

function verStory(nome, texto) {

    document.getElementById("storyNome").textContent = nome;

    document.getElementById("storyTexto").textContent = texto;

    document.getElementById("modalStory").style.display = "flex";
}

// FECHAR STORY

function fecharStory() {
    document.getElementById("modalStory").style.display = "none";
}

// PESQUISAR

document.getElementById("pesquisa").addEventListener("input", function() {

    const pesquisa = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        const usuario = post.dataset.usuario;
        const legenda = post.querySelector(".post-legenda")
            .textContent.toLowerCase();

        post.style.display =
            usuario.includes(pesquisa) ||
            legenda.includes(pesquisa)
            ? "block"
            : "none";
    });
});

// INICIAR SITE

mostrarPublicacoes();
