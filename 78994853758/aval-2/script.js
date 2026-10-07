const nomeUsuario = document.getElementById("nomeUsuario");
const textoPost = document.getElementById("textoPost");
const btnPublicar = document.getElementById("btnPublicar");
const listaPosts = document.getElementById("listaPosts");

// Carrega os posts salvos
let posts = JSON.parse(localStorage.getItem("miniFeedPosts")) || [];

// Publicar post
btnPublicar.addEventListener("click", publicarPost);

function publicarPost() {

    const nome = nomeUsuario.value.trim();
    const texto = textoPost.value.trim();

    if (nome === "" || texto === "") {
        alert("Preencha seu nome e escreva uma publicação.");
        return;
    }

    const novoPost = {
        id: Date.now(),
        nome: nome,
        texto: texto,
        data: new Date().toLocaleString("pt-BR"),
        curtidas: 0,
        curtiu: false,
        comentarios: []
    };

    posts.unshift(novoPost);

    salvarPosts();
    mostrarPosts();

    textoPost.value = "";
}


// Mostrar posts
function mostrarPosts() {

    listaPosts.innerHTML = "";

    if (posts.length === 0) {
        listaPosts.innerHTML = `
            <div class="sem-posts">
                Nenhuma publicação ainda.
            </div>
        `;
        return;
    }

    posts.forEach(post => {

        const artigo = document.createElement("article");
        artigo.classList.add("post");

        const inicial = post.nome.charAt(0).toUpperCase();

        artigo.innerHTML = `
            <div class="post-header">

                <div class="usuario">

                    <div class="avatar">
                        ${inicial}
                    </div>

                    <div>
                        <div class="nome">
                            ${escaparHTML(post.nome)}
                        </div>

                        <div class="data">
                            ${post.data}
                        </div>
                    </div>

                </div>

                <button
                    class="btn-excluir"
                    onclick="excluirPost(${post.id})"
                >
                    🗑️ Excluir
                </button>

            </div>

            <div class="post-texto">
                ${escaparHTML(post.texto)}
            </div>

            <div class="acoes">

                <button
                    class="btn-curtir ${post.curtiu ? "curtiu" : ""}"
                    onclick="curtirPost(${post.id})"
                >
                    ${post.curtiu ? "💙" : "🤍"}
                    Curtir (${post.curtidas})
                </button>

                <button
                    class="btn-comentar"
                    onclick="focarComentario(${post.id})"
                >
                    💬 Comentar
                </button>

            </div>

            <div class="comentarios">

                ${mostrarComentarios(post)}

                <div class="area-comentario">

                    <input
                        type="text"
                        id="comentario-${post.id}"
                        placeholder="Escreva um comentário..."
                    >

                    <button
                        onclick="comentarPost(${post.id})"
                    >
                        Enviar
                    </button>

                </div>

            </div>
        `;

        listaPosts.appendChild(artigo);
    });
}


// Curtir / Descurtir
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

    salvarPosts();
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

    const nome = nomeUsuario.value.trim() || "Visitante";

    const post = posts.find(post => post.id === id);

    if (!post) return;

    post.comentarios.push({
        nome: nome,
        texto: texto
    });

    salvarPosts();
    mostrarPosts();
}


// Mostrar comentários
function mostrarComentarios(post) {

    if (post.comentarios.length === 0) {
        return "";
    }

    return post.comentarios.map(comentario => {

        return `
            <div class="comentario">

                <strong>
                    ${escaparHTML(comentario.nome)}
                </strong>

                ${escaparHTML(comentario.texto)}

            </div>
        `;

    }).join("");
}


// Excluir post
function excluirPost(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta publicação?"
    );

    if (!confirmar) return;

    posts = posts.filter(post => post.id !== id);

    salvarPosts();
    mostrarPosts();
}


// Focar no campo de comentário
function focarComentario(id) {

    const input = document.getElementById(`comentario-${id}`);

    if (input) {
        input.focus();
    }
}


// Salvar no navegador
function salvarPosts() {

    localStorage.setItem(
        "miniFeedPosts",
        JSON.stringify(posts)
    );
}


// Evita inserir HTML diretamente no conteúdo
function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}


// Inicializa o feed
mostrarPosts();