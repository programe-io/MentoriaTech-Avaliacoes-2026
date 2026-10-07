let posts = [];

// Publicar novo post
function publicarPost() {

    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("textoPost").value.trim();

    if (nome === "" || texto === "") {
        alert("Preencha seu nome e escreva uma publicação.");
        return;
    }

    const novoPost = {
        id: Date.now(),
        nome: nome,
        texto: texto,
        curtidas: 0,
        curtiu: false,
        comentarios: [],
        data: new Date().toLocaleString("pt-BR")
    };

    posts.unshift(novoPost);

    document.getElementById("nome").value = "";
    document.getElementById("textoPost").value = "";

    mostrarPosts();
}

// Mostrar posts
function mostrarPosts() {

    const feed = document.getElementById("feed");

    feed.innerHTML = "";

    if (posts.length === 0) {
        feed.innerHTML = "<p>Nenhuma publicação ainda.</p>";
        return;
    }

    posts.forEach(post => {

        const divPost = document.createElement("div");

        divPost.className = "post";

        divPost.innerHTML = `
            <div class="post-topo">
                <div>
                    <div class="usuario">👤 ${post.nome}</div>
                    <div class="data">${post.data}</div>
                </div>
            </div>

            <p class="texto">${post.texto}</p>

            <div class="acoes">

                <button
                    class="btn-curtir ${post.curtiu ? "curtiu" : ""}"
                    onclick="curtirPost(${post.id})">
                    👍 Curtir (${post.curtidas})
                </button>

                <button
                    onclick="focarComentario(${post.id})">
                    💬 Comentar
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirPost(${post.id})">
                    🗑️ Excluir
                </button>

            </div>

            <div class="comentarios">

                <strong>Comentários</strong>

                ${mostrarComentarios(post)}

                <div class="area-comentario">

                    <input
                        type="text"
                        id="comentario-${post.id}"
                        placeholder="Escreva um comentário..."
                    >

                    <button onclick="comentarPost(${post.id})">
                        Enviar
                    </button>

                </div>

            </div>
        `;

        feed.appendChild(divPost);
    });
}

// Curtir
function curtirPost(id) {

    const post = posts.find(post => post.id === id);

    if (!post) return;

    if (post.curtiu) {
        post.curtidas--;
        post.curtiu = false;
    } else {
        post.curtidas++;
        post.curtiu = true;
    }

    mostrarPosts();
}

// Excluir
function excluirPost(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta publicação?"
    );

    if (!confirmar) return;

    posts = posts.filter(post => post.id !== id);

    mostrarPosts();
}

// Adicionar comentário
function comentarPost(id) {

    const input = document.getElementById(`comentario-${id}`);

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário.");
        return;
    }

    const post = posts.find(post => post.id === id);

    if (!post) return;

    post.comentarios.push({
        texto: texto,
        data: new Date().toLocaleString("pt-BR")
    });

    input.value = "";

    mostrarPosts();
}

// Mostrar comentários
function mostrarComentarios(post) {

    if (post.comentarios.length === 0) {
        return "<p>Nenhum comentário ainda.</p>";
    }

    return post.comentarios.map(comentario => `
        <div class="comentario">
            <strong>👤 Usuário</strong>
            ${comentario.texto}
            <small>${comentario.data}</small>
        </div>
    `).join("");
}

// Focar no campo de comentário
function focarComentario(id) {

    const input = document.getElementById(`comentario-${id}`);

    if (input) {
        input.focus();
    }
}

// Iniciar feed
mostrarPosts();