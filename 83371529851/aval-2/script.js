
let publicacoes = JSON.parse(localStorage.getItem("allane_posts")) || [
    {
        id: 1,
        nome: "Allane Santos",
        usuario: "@allanesantos",
        texto: "Bem-vindos à minha rede social! 💜✨ Aqui é o nosso espaço para compartilhar momentos especiais!",
        imagem: "",
        curtidas: 12,
        comentarios: [],
        gostei: false
    }
];

function salvar() {
    localStorage.setItem("allane_posts", JSON.stringify(publicacoes));
}

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, letra => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[letra]);
}

function abrirEditor() {
    document.getElementById("modal").style.display = "flex";
}

function fecharEditor() {
    document.getElementById("modal").style.display = "none";
}

function publicar() {
    const texto = document.getElementById("texto-post").value.trim();
    const imagem = document.getElementById("imagem-post").value.trim();

    if (!texto && !imagem) {
        alert("Escreva algo ou adicione uma imagem!");
        return;
    }

    if (imagem && !/^https?:\/\/\S+$/i.test(imagem)) {
        alert("Digite um endereço de imagem válido começando com http:// ou https://");
        return;
    }

    publicacoes.unshift({
        id: Date.now(),
        nome: "Allane Santos",
        usuario: "@allanesantos",
        texto: texto,
        imagem: imagem,
        curtidas: 0,
        comentarios: [],
        gostei: false
    });

    salvar();
    mostrarPublicacoes();

    document.getElementById("texto-post").value = "";
    document.getElementById("imagem-post").value = "";

    fecharEditor();
}

function mostrarPublicacoes(filtro = "") {
    const feed = document.getElementById("feed");
    const busca = filtro.toLowerCase();

    const filtradas = publicacoes.filter(post =>
        post.nome.toLowerCase().includes(busca) ||
        post.usuario.toLowerCase().includes(busca) ||
        post.texto.toLowerCase().includes(busca)
    );

    feed.innerHTML = filtradas.map(post => `
        <article class="post">
            <div class="post-header">
                <div class="avatar">AS</div>
                <div>
                    <strong>${escapar(post.nome)}</strong>
                    <p>${escapar(post.usuario)} · Publicação</p>
                </div>
            </div>

            <div class="post-text">${escapar(post.texto)}</div>

            ${post.imagem ? `
                <img class="post-image"
                     src="${escapar(post.imagem)}"
                     alt="Imagem da publicação"
                     loading="lazy"
                     onerror="this.style.display='none'">
            ` : ""}

            <div class="post-actions">
                <button onclick="curtir(${post.id})">
                    ${post.gostei ? "❤️" : "🤍"} ${post.curtidas} Curtidas
                </button>

                <button onclick="comentar(${post.id})">
                    💬 ${post.comentarios.length} Comentários
                </button>

                <button onclick="compartilhar(${post.id})">
                    📤 Compartilhar
                </button>
            </div>

            ${post.comentarios.map(c => `
                <p class="comment">
                    <strong>${escapar(c.nome)}:</strong>
                    ${escapar(c.texto)}
                </p>
            `).join("")}
        </article>
    `).join("") || "<p>Nenhuma publicação encontrada.</p>";

    document.getElementById("post-count").textContent =
        publicacoes.length;
}

function curtir(id) {
    const post = publicacoes.find(p => p.id === id);

    if (!post) return;

    post.gostei = !post.gostei;
    post.curtidas += post.gostei ? 1 : -1;

    salvar();
    mostrarPublicacoes();
}

function comentar(id) {
    const post = publicacoes.find(p => p.id === id);

    if (!post) return;

    const texto = prompt("Escreva seu comentário:");

    if (texto && texto.trim()) {
        post.comentarios.push({
            nome: "Allane Santos",
            texto: texto.trim()
        });

        salvar();
        mostrarPublicacoes();
    }
}

function compartilhar(id) {
    const post = publicacoes.find(p => p.id === id);

    if (!post) return;

    const mensagem = `${post.nome} publicou: ${post.texto}`;

    if (navigator.share) {
        navigator.share({ text: mensagem }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(mensagem)
            .then(() => alert("Publicação copiada!"));
    } else {
        alert(mensagem);
    }
}

function criarStory() {
    const story = prompt("O que você deseja compartilhar no seu story?");

    if (story && story.trim()) {
        alert("Story criado: " + story);
    }
}

// Pesquisa de publicações
document.getElementById("pesquisa").addEventListener("input", function() {
    mostrarPublicacoes(this.value);
});

// Inicialização
mostrarPublicacoes();
