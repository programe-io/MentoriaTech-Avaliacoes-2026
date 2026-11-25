
const campoTexto = document.getElementById("postText");
const feed = document.getElementById("feed");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

function salvar() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function publicar() {
    const texto = campoTexto.value.trim();

    if (!texto) {
        alert("Escreva alguma coisa!");
        return;
    }

    const post = {
        id: Date.now(),
        texto: texto,
        curtidas: 0,
        curtido: false,
        comentarios: [],
        data: new Date().toLocaleString("pt-BR")
    };

    posts.unshift(post);

    salvar();
    campoTexto.value = "";
    renderizar();
}

function curtir(id) {
    const post = posts.find(p => p.id === id);

    if (!post) return;

    post.curtido = !post.curtido;
    post.curtidas += post.curtido ? 1 : -1;

    salvar();
    renderizar();
}

function comentar(id) {
    const input = document.getElementById("comment-" + id);
    const texto = input.value.trim();

    if (!texto) return;

    const post = posts.find(p => p.id === id);

    if (!post) return;

    post.comentarios.push(texto);

    salvar();
    renderizar();
}

function excluir(id) {
    if (!confirm("Deseja excluir esta publicação?")) return;

    posts = posts.filter(p => p.id !== id);

    salvar();
    renderizar();
}

function renderizar() {
    feed.innerHTML = "";

    if (posts.length === 0) {
        feed.innerHTML = `
            <div class="empty">
                <h3>Nenhuma publicação ainda</h3>
                <p>Seja o primeiro a compartilhar algo!</p>
            </div>
        `;
        return;
    }

    posts.forEach(post => {
        const card = document.createElement("article");
        card.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const user = document.createElement("div");
        user.className = "user-info";

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = "U";

        const info = document.createElement("div");

        const nome = document.createElement("strong");
        nome.textContent = "Meu Perfil";

        const data = document.createElement("small");
        data.textContent = post.data;

        info.append(nome, data);
        user.append(avatar, info);

        const excluirBtn = document.createElement("button");
        excluirBtn.className = "delete-btn";
        excluirBtn.textContent = "Excluir";
        excluirBtn.onclick = () => excluir(post.id);

        header.append(user, excluirBtn);

        const conteudo = document.createElement("div");
        conteudo.className = "post-content";
        conteudo.textContent = post.texto;

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const like = document.createElement("button");
        like.className = "action-btn" + (post.curtido ? " liked" : "");
        like.textContent =
            (post.curtido ? "❤️" : "🤍") +
            " Curtir (" + post.curtidas + ")";

        like.onclick = () => curtir(post.id);

        const commentBtn = document.createElement("button");
        commentBtn.className = "action-btn";
        commentBtn.textContent =
            "💬 Comentários (" + post.comentarios.length + ")";

        actions.append(like, commentBtn);

        const comments = document.createElement("div");
        comments.className = "comments";

        post.comentarios.forEach(texto => {
            const comentario = document.createElement("div");
            comentario.className = "comment";
            comentario.textContent = texto;
            comments.appendChild(comentario);
        });

        const area = document.createElement("div");
        area.className = "comment-area";

        const input = document.createElement("input");
        input.id = "comment-" + post.id;
        input.placeholder = "Escreva um comentário...";

        const enviar = document.createElement("button");
        enviar.textContent = "Enviar";
        enviar.onclick = () => comentar(post.id);

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                comentar(post.id);
            }
        });

        commentBtn.onclick = () => input.focus();

        area.append(input, enviar);

        card.append(
            header,
            conteudo,
            actions,
            comments,
            area
        );

        feed.appendChild(card);
    });
}

renderizar();
