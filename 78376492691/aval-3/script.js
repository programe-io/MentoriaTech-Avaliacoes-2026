
// CARREGAR PUBLICAÇÕES SALVAS
let posts = JSON.parse(localStorage.getItem("miniSocialPosts")) || [];

// SALVAR PUBLICAÇÕES
function salvarPosts() {
    localStorage.setItem("miniSocialPosts", JSON.stringify(posts));
}

// PUBLICAR POSTAGEM
function publicarPost() {
    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !texto) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    if (imagem) {
        try {
            const url = new URL(imagem);

            if (!["https:", "http:"].includes(url.protocol)) {
                throw new Error();
            }
        } catch {
            alert("Digite uma URL de imagem válida!");
            return;
        }
    }

    const novoPost = {
        id: Date.now(),
        nome: nome,
        texto: texto,
        imagem: imagem,
        curtidas: 0,
        comentarios: [],
        data: new Date().toLocaleString("pt-BR")
    };

    posts.unshift(novoPost);

    salvarPosts();
    mostrarPosts();

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";
}

// MOSTRAR PUBLICAÇÕES
function mostrarPosts() {
    const lista = document.getElementById("listaPosts");

    lista.innerHTML = "";

    posts.forEach(post => {
        const artigo = document.createElement("article");
        artigo.className = "post";

        const usuario = document.createElement("div");
        usuario.className = "usuario";

        const avatar = document.createElement("img");
        avatar.src = "https://i.pravatar.cc/150?img=12";
        avatar.alt = "Foto do usuário";

        const dados = document.createElement("div");

        const nome = document.createElement("h3");
        nome.textContent = post.nome;

        const data = document.createElement("small");
        data.textContent = post.data;

        dados.append(nome, data);
        usuario.append(avatar, dados);

        const mensagem = document.createElement("p");
        mensagem.textContent = post.texto;

        artigo.append(usuario, mensagem);

        // IMAGEM DA PUBLICAÇÃO
        if (post.imagem) {
            const foto = document.createElement("img");
            foto.src = post.imagem;
            foto.alt = "Imagem da publicação";
            foto.className = "foto-post";
            artigo.appendChild(foto);
        }

        // BOTÕES
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const curtirBtn = document.createElement("button");
        curtirBtn.textContent = `❤️ Curtir (${post.curtidas})`;

        curtirBtn.onclick = () => curtirPost(post.id);

        const comentarBtn = document.createElement("button");
        comentarBtn.textContent = "💬 Comentar";

        comentarBtn.onclick = () => comentarPost(post.id);

        acoes.append(curtirBtn, comentarBtn);
        artigo.appendChild(acoes);

        // COMENTÁRIOS
        post.comentarios.forEach(comentario => {
            const div = document.createElement("div");
            div.className = "comentario";
            div.textContent = "💬 " + comentario;
            artigo.appendChild(div);
        });

        lista.appendChild(artigo);
    });
}

// CURTIR PUBLICAÇÃO
function curtirPost(id) {
    const post = posts.find(p => p.id === id);

    if (post) {
        post.curtidas++;
        salvarPosts();
        mostrarPosts();
    }
}

// COMENTAR PUBLICAÇÃO
function comentarPost(id) {
    const comentario = prompt("Escreva seu comentário:");

    if (!comentario || !comentario.trim()) {
        return;
    }

    const post = posts.find(p => p.id === id);

    if (post) {
        post.comentarios.push(comentario.trim());

        salvarPosts();
        mostrarPosts();
    }
}

// INICIAR FEED
document.addEventListener("DOMContentLoaded", function() {
    mostrarPosts();
});
