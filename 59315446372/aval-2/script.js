
// SOCIALCONNECT - Aplicativo de rede social

let posts = [
    {
        id: 1,
        usuario: "Ana Silva",
        arroba: "@anasilva",
        texto: "Olá, pessoal! Bem-vindos à minha rede social! ❤️",
        curtidas: 25,
        comentarios: 4,
        curtido: false
    },
    {
        id: 2,
        usuario: "Lucas Santos",
        arroba: "@lucas",
        texto: "Hoje é um ótimo dia para compartilhar coisas boas! ☀️",
        curtidas: 18,
        comentarios: 2,
        curtido: false
    }
];

// Mostrar publicações
function mostrarPosts() {
    const feed = document.getElementById("feed");

    feed.innerHTML = "";

    posts.forEach(post => {
        feed.innerHTML += `
            <div class="post">
                <h3>${post.usuario}</h3>
                <small>${post.arroba}</small>

                <p>${post.texto}</p>

                <div class="acoes">
                    <button onclick="curtirPost(${post.id})">
                        ${post.curtido ? "❤️" : "🤍"}
                        ${post.curtidas}
                    </button>

                    <button onclick="comentarPost(${post.id})">
                        💬 ${post.comentarios}
                    </button>
                </div>
            </div>
        `;
    });
}

// Criar publicação
function criarPost() {
    const texto = document.getElementById("novaPostagem").value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const novoPost = {
        id: Date.now(),
        usuario: "Meu Perfil",
        arroba: "@meuperfil",
        texto: texto,
        curtidas: 0,
        comentarios: 0,
        curtido: false
    };

    posts.unshift(novoPost);

    document.getElementById("novaPostagem").value = "";

    mostrarPosts();
}

// Curtir publicação
function curtirPost(id) {
    const post = posts.find(p => p.id === id);

    if (post.curtido) {
        post.curtidas--;
        post.curtido = false;
    } else {
        post.curtidas++;
        post.curtido = true;
    }

    mostrarPosts();
}

// Comentar publicação
function comentarPost(id) {
    const post = posts.find(p => p.id === id);

    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        post.comentarios++;
        alert("Comentário publicado!");
        mostrarPosts();
    }
}

// Abrir páginas
function abrirPagina(pagina) {
    alert("Você abriu: " + pagina);
}

// Iniciar aplicativo
mostrarPosts();
