
// ===================================
// INSTAPRO - SISTEMA PRINCIPAL
// ===================================

const $ = id => document.getElementById(id);

const carregar = (chave, padrao) => {
    try {
        return JSON.parse(localStorage.getItem(chave)) ?? padrao;
    } catch {
        return padrao;
    }
};

let usuarios = carregar("instapro_usuarios", []);
let posts = carregar("instapro_posts", []);
let notificacoes = carregar("instapro_notificacoes", []);
let mensagens = carregar("instapro_mensagens", []);
let stories = carregar("instapro_stories", []);
let usuarioAtual = carregar("instapro_sessao", null);
let paginaAtual = "home";

function salvar() {
    localStorage.setItem("instapro_usuarios", JSON.stringify(usuarios));
    localStorage.setItem("instapro_posts", JSON.stringify(posts));
    localStorage.setItem("instapro_notificacoes", JSON.stringify(notificacoes));
    localStorage.setItem("instapro_mensagens", JSON.stringify(mensagens));
    localStorage.setItem("instapro_stories", JSON.stringify(stories));
    localStorage.setItem("instapro_sessao", JSON.stringify(usuarioAtual));
}

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

function foto(usuario) {
    return usuario?.foto || "https://i.pravatar.cc/150?img=12";
}

function usuarioPorNome(nome) {
    return usuarios.find(u => u.username === nome);
}

function meuPerfil() {
    return usuarioPorNome(usuarioAtual);
}

function aviso(texto) {
    alert(texto);
}

// ===================================
// CADASTRO
// ===================================

$("show-register").onclick = () => {
    $("login-screen").classList.add("hidden");
    $("register-screen").classList.remove("hidden");
};

$("show-login").onclick = () => {
    $("register-screen").classList.add("hidden");
    $("login-screen").classList.remove("hidden");
};

$("register-form").onsubmit = event => {
    event.preventDefault();

    const nome = $("register-name").value.trim();
    const username = $("register-user").value.trim().toLowerCase();
    const senha = $("register-password").value;

    if (usuarios.some(u => u.username === username)) {
        return aviso("Este nome de usuário já existe!");
    }

    const novoUsuario = {
        id: Date.now().toString(),
        nome,
        username,
        senha,
        foto: "",
        bio: "Olá! Estou usando o InstaPro.",
        seguidores: [],
        seguindo: []
    };

    usuarios.push(novoUsuario);
    usuarioAtual = username;

    salvar();
    iniciarAplicacao();

    aviso("Conta criada com sucesso!");
};

// ===================================
// LOGIN
// ===================================

$("login-form").onsubmit = event => {
    event.preventDefault();

    const username = $("login-user").value.trim().toLowerCase();
    const senha = $("login-password").value;

    const usuario = usuarioPorNome(username);

    if (!usuario || usuario.senha !== senha) {
        return aviso("Usuário ou senha incorretos!");
    }

    usuarioAtual = username;
    salvar();
    iniciarAplicacao();
};

// ===================================
// SAIR DA CONTA
// ===================================

$("logout").onclick = () => {
    usuarioAtual = null;
    salvar();

    $("app").classList.add("hidden");
    $("login-screen").classList.remove("hidden");
};

// ===================================
// INICIALIZAR SISTEMA
// ===================================

function iniciarAplicacao() {
    if (!usuarioAtual || !meuPerfil()) {
        $("app").classList.add("hidden");
        $("login-screen").classList.remove("hidden");
        $("register-screen").classList.add("hidden");
        return;
    }

    $("login-screen").classList.add("hidden");
    $("register-screen").classList.add("hidden");
    $("app").classList.remove("hidden");

    renderizar();
    navegar("home");
}

function renderizar() {
    renderizarFeed();
    renderizarStories();
    renderizarSugestoes();
    renderizarNotificacoes();
    renderizarPerfil();
    renderizarExplorar();
    renderizarUsuariosMensagens();
}

// ===================================
// NAVEGAÇÃO
// ===================================

function navegar(pagina) {
    paginaAtual = pagina;

    document.querySelectorAll(".page").forEach(elemento => {
        elemento.classList.add("hidden");
    });

    const tela = $("page-" + pagina);

    if (tela) tela.classList.remove("hidden");

    if (pagina === "home") renderizarFeed();
    if (pagina === "profile") renderizarPerfil();
    if (pagina === "explore") renderizarExplorar();
    if (pagina === "messages") renderizarChat();
    if (pagina === "notifications") renderizarNotificacoes();
}

document.querySelectorAll(".sidebar button").forEach(botao => {
    botao.onclick = () => navegar(botao.dataset.page);
});

// ===================================
// CRIAR PUBLICAÇÃO
// ===================================

$("post-form").onsubmit = event => {
    event.preventDefault();

    const texto = $("post-text").value.trim();
    const imagem = $("post-image").value.trim();

    if (!texto) return;

    const post = {
        id: Date.now().toString(),
        autor: usuarioAtual,
        texto,
        imagem,
        curtidas: [],
        comentarios: [],
        data: new Date().toLocaleDateString("pt-BR")
    };

    posts.unshift(post);

    salvar();
    $("post-form").reset();

    navegar("home");
    renderizarFeed();

    aviso("Publicação criada com sucesso!");
};

// ===================================
// MOSTRAR PUBLICAÇÕES
// ===================================

function renderizarFeed() {
    const feed = $("feed");

    const publicacoes = posts.filter(post => {
        const autor = usuarioPorNome(post.autor);

        return autor &&
            (post.autor === usuarioAtual ||
             meuPerfil().seguindo.includes(post.autor));
    });

    if (!publicacoes.length) {
        feed.innerHTML = `
            <div class="panel">
                <h3>Seu feed está vazio!</h3>
                <p>Comece a seguir pessoas para ver publicações.</p>
            </div>`;
        return;
    }

    feed.innerHTML = publicacoes.map(post => {
        const autor = usuarioPorNome(post.autor);
        const curtiu = post.curtidas.includes(usuarioAtual);

        return `
        <article class="post" data-id="${escapar(post.id)}">

            <div class="post-header">
                <img class="avatar" src="${escapar(foto(autor))}">
                <strong>@${escapar(post.autor)}</strong>
                ${post.autor === usuarioAtual
                    ? `<button class="delete-post">Excluir</button>`
                    : ""}
            </div>

            ${post.imagem ? `
                <img class="post-image"
                     src="${escapar(post.imagem)}"
                     alt="Foto da publicação"
                     onerror="this.style.display='none'">
            ` : ""}

            <div class="post-content">

                <div class="post-actions">
                    <button class="like ${curtiu ? "active" : ""}">
                        ${curtiu ? "♥" : "♡"}
                    </button>
                    <button class="focus-comment">💬</button>
                    <button class="share-post">➤</button>
                </div>

                <p><strong>${post.curtidas.length} curtidas</strong></p>

                <p>
                    <strong>@${escapar(post.autor)}</strong>
                    ${escapar(post.texto)}
                </p>

                <div class="comment-list">
                    ${post.comentarios.map(c => `
                        <p>
                            <strong>@${escapar(c.autor)}</strong>
                            ${escapar(c.texto)}
                        </p>
                    `).join("")}
                </div>

                <form class="comment-form">
                    <input placeholder="Escreva um comentário..." required>
                    <button type="submit">Publicar</button>
                </form>

                <small>${escapar(post.data)}</small>
            </div>
        </article>`;
    }).join("");
}

// ===================================
// CURTIDAS, COMENTÁRIOS E EXCLUSÃO
// ===================================

$("feed").addEventListener("click", async event => {
    const postElemento = event.target.closest(".post");
    if (!postElemento) return;

    const id = postElemento.dataset.id;
    const post = posts.find(p => p.id === id);

    if (!post) return;

    if (event.target.closest(".like")) {
        const indice = post.curtidas.indexOf(usuarioAtual);

        if (indice >= 0) {
            post.curtidas.splice(indice, 1);
        } else {
            post.curtidas.push(usuarioAtual);

            if (post.autor !== usuarioAtual) {
                notificacoes.unshift({
                    texto: `@${usuarioAtual} curtiu sua publicação.`,
                    destino: post.autor,
                    data: new Date().toLocaleString("pt-BR")
                });
            }
        }

        salvar();
        renderizarFeed();
        renderizarNotificacoes();
    }

    if (event.target.closest(".focus-comment")) {
        postElemento.querySelector(".comment-form input").focus();
    }

    if (event.target.closest(".delete-post")) {
        if (confirm("Deseja excluir esta publicação?")) {
            posts = posts.filter(p => p.id !== id);
            salvar();
            renderizar();
        }
    }

    if (event.target.closest(".share-post")) {
        const link = location.href;

        try {
            await navigator.clipboard.writeText(link);
            aviso("Link copiado!");
        } catch {
            aviso("Não foi possível copiar o link.");
        }
    }
});

$("feed").addEventListener("submit", event => {
    if (!event.target.classList.contains("comment-form")) return;

    event.preventDefault();

    const postElemento = event.target.closest(".post");
    const post = posts.find(p => p.id === postElemento.dataset.id);
    const texto = event.target.querySelector("input").value.trim();

    if (!texto) return;

    post.comentarios.push({
        autor: usuarioAtual,
        texto
    });

    if (post.autor !== usuarioAtual) {
        notificacoes.unshift({
            texto: `@${usuarioAtual} comentou sua publicação.`,
            destino: post.autor,
            data: new Date().toLocaleString("pt-BR")
        });
    }

    salvar();
    renderizarFeed();
});

// ===================================
// SEGUIR E DEIXAR DE SEGUIR
// ===================================

function seguirUsuario(username) {
    if (username === usuarioAtual) return;

    const eu = meuPerfil();
    const outro = usuarioPorNome(username);

    if (!outro) return;

    const seguindo = eu.seguindo.includes(username);

    if (seguindo) {
        eu.seguindo = eu.seguindo.filter(u => u !== username);
        outro.seguidores = outro.seguidores.filter(u => u !== usuarioAtual);
    } else {
        eu.seguindo.push(username);
        outro.seguidores.push(usuarioAtual);

        notificacoes.unshift({
            texto: `@${usuarioAtual} começou a seguir você.`,
            destino: username,
            data: new Date().toLocaleString("pt-BR")
        });
    }

    salvar();
    renderizar();
}

// ===================================
// SUGESTÕES DE USUÁRIOS
// ===================================

function renderizarSugestoes() {
    $("suggestions").innerHTML = usuarios
        .filter(u => u.username !== usuarioAtual)
        .slice(0, 8)
        .map(u => `
            <div class="suggestion">
                <img class="avatar" src="${escapar(foto(u))}">
                <span>@${escapar(u.username)}</span>
                <button data-follow="${escapar(u.username)}">
                    ${meuPerfil().seguindo.includes(u.username)
                        ? "Seguindo" : "Seguir"}
                </button>
            </div>
        `).join("");
}

$("suggestions").addEventListener("click", event => {
    const botao = event.target.closest("[data-follow]");
    if (botao) seguirUsuario(botao.dataset.follow);
});

// ===================================
// PERFIL DO USUÁRIO
// ===================================

function renderizarPerfil() {
    const usuario = meuPerfil();

    const publicacoes = posts.filter(p => p.autor === usuarioAtual);

    $("profile-content").innerHTML = `
        <div class="profile-header">
            <img src="${escapar(foto(usuario))}">
            <div>
                <h2>@${escapar(usuario.username)}</h2>
                <p>${escapar(usuario.nome)}</p>
                <p>${publicacoes.length} publicações |
                   ${usuario.seguidores.length} seguidores |
                   ${usuario.seguindo.length} seguindo</p>
                <p>${escapar(usuario.bio)}</p>
                <button id="edit-profile">Editar perfil</button>
            </div>
        </div>

        <div class="panel">
            <h3>Minhas publicações</h3>
            ${publicacoes.length ? publicacoes.map(p => `
                <p>${escapar(p.texto)}</p>
                ${p.imagem ? `
                    <img src="${escapar(p.imagem)}"
                         style="width:100%;max-width:300px">
                ` : ""}
                <hr style="margin:15px 0">
            `).join("") : "<p>Você ainda não publicou nada.</p>"}
        </div>
    `;

    $("edit-profile").onclick = () => {
        const nome = prompt("Digite seu nome:", usuario.nome);
        if (nome === null) return;

        const bio = prompt("Digite sua biografia:", usuario.bio);
        if (bio === null) return;

        const imagem = prompt("URL da foto de perfil:", usuario.foto || "");
        if (imagem === null) return;

        usuario.nome = nome;
        usuario.bio = bio;
        usuario.foto = imagem;

        salvar();
        renderizar();
    };
}

// ===================================
// EXPLORAR
// ===================================

function renderizarExplorar() {
    $("explore-feed").innerHTML = posts
        .filter(p => p.imagem)
        .map(p => `
            <img src="${escapar(p.imagem)}"
                 alt="Publicação de @${escapar(p.autor)}"
                 title="@${escapar(p.autor)}"
                 onerror="this.style.display='none'">
        `).join("");
}

// ===================================
// PESQUISAR USUÁRIOS
// ===================================

$("search").addEventListener("input", event => {
    const busca = event.target.value.trim().toLowerCase();

    if (!busca) return;

    const resultados = usuarios.filter(u =>
        u.username.includes(busca) ||
        u.nome.toLowerCase().includes(busca)
    );

    $("explore-feed").innerHTML = resultados.map(u => `
        <div class="suggestion">
            <img class="avatar" src="${escapar(foto(u))}">
            <span>@${escapar(u.username)}</span>
            <button data-follow="${escapar(u.username)}">
                ${meuPerfil().seguindo.includes(u.username)
                    ? "Seguindo" : "Seguir"}
            </button>
        </div>
    `).join("");

    navegar("explore");
});

// ===================================
// NOTIFICAÇÕES
// ===================================

function renderizarNotificacoes() {
    const lista = notificacoes.filter(n =>
        n.destino === usuarioAtual
    );

    $("notifications-list").innerHTML = lista.length
        ? lista.map(n => `
            <div class="panel" style="margin-bottom:10px">
                <p>${escapar(n.texto)}</p>
                <small>${escapar(n.data)}</small>
            </div>
        `).join("")
        : "<p>Nenhuma notificação por enquanto.</p>";
}

// ===================================
// STORIES
// ===================================

$("add-story").onclick = () => {
    const imagem = prompt("Cole a URL da imagem do seu story:");

    if (!imagem) return;

    stories.unshift({
        autor: usuarioAtual,
        imagem,
        data: Date.now()
    });

    salvar();
    renderizarStories();
};

function renderizarStories() {
    const recentes = stories.filter(s =>
        Date.now() - s.data < 24 * 60 * 60 * 1000
    );

    $("stories-list").innerHTML = recentes.map(s => `
        <div class="story">
            <img src="${escapar(s.imagem)}"
                 alt="Story de ${escapar(s.autor)}"
                 onclick="alert('Story de @${escapar(s.autor)}')">
            <span>@${escapar(s.autor)}</span>
        </div>
    `).join("");
}

// ===================================
// MENSAGENS
// ===================================

function renderizarUsuariosMensagens() {
    $("message-user").innerHTML =
        '<option value="">Escolha um usuário</option>' +
        usuarios.filter(u => u.username !== usuarioAtual)
        .map(u => `
            <option value="${escapar(u.username)}">
                @${escapar(u.username)}
            </option>
        `).join("");
}

function renderizarChat() {
    const destinatario = $("message-user").value;

    if (!destinatario) {
        $("chat").innerHTML = "<p>Escolha um usuário para conversar.</p>";
        return;
    }

    const conversa = mensagens.filter(m =>
        (m.de === usuarioAtual && m.para === destinatario) ||
        (m.de === destinatario && m.para === usuarioAtual)
    );

    $("chat").innerHTML = conversa.map(m => `
        <div class="message ${m.de === usuarioAtual ? "mine" : ""}">
            <strong>@${escapar(m.de)}</strong>
            <p>${escapar(m.texto)}</p>
        </div>
    `).join("");

    $("chat").scrollTop = $("chat").scrollHeight;
}

$("message-user").onchange = renderizarChat;

$("message-form").onsubmit = event => {
    event.preventDefault();

    const destinatario = $("message-user").value;
    const texto = $("message-text").value.trim();

    if (!destinatario || !texto) {
        return aviso("Escolha um usuário e escreva uma mensagem.");
    }

    mensagens.push({
        de: usuarioAtual,
        para: destinatario,
        texto,
        data: Date.now()
    });

    salvar();

    $("message-text").value = "";
    renderizarChat();
};

// ===================================
// MODO ESCURO
// ===================================

$("theme-button").onclick = () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
        "instapro_tema",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
};

if (localStorage.getItem("instapro_tema") === "dark") {
    document.body.classList.add("dark");
}

// ===================================
// INICIAR
// ===================================

iniciarAplicacao();
