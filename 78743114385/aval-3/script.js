// ELEMENTOS
const feed = document.querySelector(".feed");
const usuario = document.getElementById("usuario");
const imagem = document.getElementById("imagem");
const legenda = document.getElementById("legenda");

// CARREGAR PUBLICAÇÕES SALVAS
let memes = JSON.parse(localStorage.getItem("memes")) || [];

function salvarMemes() {
    localStorage.setItem("memes", JSON.stringify(memes));
}

// MOSTRAR MEMES
function mostrarMemes() {
    feed.querySelectorAll(".post").forEach(post => post.remove());

    memes.forEach(meme => {
        const post = document.createElement("article");
        post.className = "post";

        const perfil = document.createElement("div");
        perfil.className = "perfil";

        const nome = document.createElement("strong");
        nome.textContent = "😂 @" + meme.usuario;
        perfil.appendChild(nome);

        const foto = document.createElement("img");
        foto.src = meme.imagem;
        foto.alt = "Meme publicado";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const curtir = document.createElement("button");
        curtir.textContent = meme.curtido ? "❤️ Curtido" : "🤍 Curtir";

        curtir.onclick = () => {
            meme.curtido = !meme.curtido;
            meme.curtidas += meme.curtido ? 1 : -1;
            salvarMemes();
            mostrarMemes();
        };

        const comentar = document.createElement("button");
        comentar.textContent = "💬 Comentar";

        comentar.onclick = () => {
            adicionarComentario(meme);
        };

        const excluir = document.createElement("button");
        excluir.textContent = "🗑️ Excluir";

        excluir.onclick = () => {
            excluirMeme(meme.id);
        };

        acoes.append(curtir, comentar, excluir);

        const likes = document.createElement("p");
        likes.className = "likes";
        likes.textContent = meme.curtidas + " curtidas";

        const descricao = document.createElement("p");
        descricao.textContent = "@" + meme.usuario + " " + meme.legenda;

        post.append(perfil, foto, acoes, likes, descricao);

        // COMENTÁRIOS
        meme.comentarios.forEach(comentario => {
            const texto = document.createElement("p");
            texto.textContent = "💬 " + comentario;
            post.appendChild(texto);
        });

        feed.appendChild(post);
    });
}

// PUBLICAR MEME
function publicarMeme() {
    const nome = usuario.value.trim();
    const urlImagem = imagem.value.trim();
    const texto = legenda.value.trim();

    if (!nome || !urlImagem || !texto) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const url = new URL(urlImagem);

        if (!["https:", "http:"].includes(url.protocol)) {
            alert("URL de imagem inválida!");
            return;
        }

        const novoMeme = {
            id: Date.now(),
            usuario: nome,
            imagem: url.href,
            legenda: texto,
            curtidas: 0,
            curtido: false,
            comentarios: []
        };

        memes.unshift(novoMeme);

        salvarMemes();
        mostrarMemes();

        usuario.value = "";
        imagem.value = "";
        legenda.value = "";

        alert("Meme publicado com sucesso! 😂");

    } catch {
        alert("Digite uma URL válida!");
    }
}

// CURTIR
// A função de curtida é controlada pelo botão de cada publicação.

// COMENTAR
function adicionarComentario(meme) {
    const texto = prompt("Escreva seu comentário:");

    if (texto && texto.trim()) {
        meme.comentarios.push(texto.trim());

        salvarMemes();
        mostrarMemes();
    }
}

// EXCLUIR
function excluirMeme(id) {
    const confirmar = confirm("Deseja excluir este meme?");

    if (confirmar) {
        memes = memes.filter(meme => meme.id !== id);

        salvarMemes();
        mostrarMemes();
    }
}

// PESQUISAR MEMES
const pesquisa = document.querySelector("header input");

pesquisa.addEventListener("input", () => {
    const termo = pesquisa.value.toLowerCase();

    feed.querySelectorAll(".post").forEach(post => {
        post.style.display = post.textContent
            .toLowerCase()
            .includes(termo) ? "block" : "none";
    });
});

// INICIAR SITE
mostrarMemes();