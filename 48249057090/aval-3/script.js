
// ELEMENTOS PRINCIPAIS

const postForm = document.getElementById("postForm");
const feed = document.querySelector(".feed");
const toast = document.getElementById("toast");


// SISTEMA DE NOTIFICAÇÕES

function mostrarMensagem(mensagem) {

    toast.textContent = mensagem;

    toast.style.display = "block";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function() {

        toast.style.display = "none";

    }, 2500);

}


// CURTIDAS

document.addEventListener("click", function(event) {

    const button = event.target.closest(".like-btn");

    if (!button) return;

    const post = button.closest(".post");

    const likes = post.querySelector(".likes");

    let quantidade = Number(likes.dataset.count);

    if (button.classList.contains("liked")) {

        button.classList.remove("liked");

        button.textContent = "♡";

        quantidade--;

    } else {

        button.classList.add("liked");

        button.textContent = "♥";

        quantidade++;

    }

    likes.dataset.count = quantidade;

    likes.textContent = quantidade + " curtidas";

});


// INICIALIZAR CONTADORES DAS PUBLICAÇÕES

document.querySelectorAll(".post").forEach(function(post) {

    const likes = post.querySelector(".likes");

    likes.dataset.count = likes.textContent.match(/\d+/)[0];

});


// COMENTÁRIOS

document.addEventListener("submit", function(event) {

    if (!event.target.classList.contains("comment-form")) {
        return;
    }

    event.preventDefault();

    const form = event.target;

    const input = form.querySelector("input");

    const texto = input.value.trim();

    if (texto === "") return;

    const post = form.closest(".post");

    const comments = post.querySelector(".comments");

    const novoComentario = document.createElement("p");

    const usuario = document.createElement("strong");

    usuario.textContent = "meu_pet ";

    novoComentario.appendChild(usuario);

    novoComentario.appendChild(
        document.createTextNode(texto)
    );

    comments.appendChild(novoComentario);

    input.value = "";

    mostrarMensagem("Comentário publicado! 🐾");

});


// FOCO NO CAMPO DE COMENTÁRIOS

document.addEventListener("click", function(event) {

    const button = event.target.closest(".comment-focus");

    if (!button) return;

    const post = button.closest(".post");

    post.querySelector(".comment-form input").focus();

});


// SALVAR PUBLICAÇÕES

document.addEventListener("click", function(event) {

    const button = event.target.closest(".save-btn");

    if (!button) return;

    button.classList.toggle("saved");

    if (button.classList.contains("saved")) {

        button.textContent = "▣";

        mostrarMensagem("Publicação salva! 🔖");

    } else {

        button.textContent = "♧";

        mostrarMensagem("Publicação removida dos salvos.");

    }

});


// SEGUIR USUÁRIOS

document.addEventListener("click", function(event) {

    const button = event.target.closest(".follow-btn");

    if (!button) return;

    if (button.textContent === "Seguir") {

        button.textContent = "Seguindo";

        button.style.color = "#888";

        mostrarMensagem("Você começou a seguir este perfil!");

    } else {

        button.textContent = "Seguir";

        button.style.color = "#27845c";

        mostrarMensagem("Você deixou de seguir este perfil.");

    }

});


// COMPARTILHAR PUBLICAÇÕES

document.addEventListener("click", async function(event) {

    const button = event.target.closest(".share-btn");

    if (!button) return;

    const post = button.closest(".post");

    const imagem = post.querySelector(".post-image").src;

    try {

        await navigator.clipboard.writeText(imagem);

        mostrarMensagem("Link da imagem copiado!");

    } catch (error) {

        mostrarMensagem("Não foi possível copiar o link.");

    }

});


// CRIAR NOVA PUBLICAÇÃO

postForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("petName").value.trim();

    const descricao = document.getElementById("petDescription").value.trim();

    const imagem = document.getElementById("petImage").value.trim();

    if (!nome || !descricao || !imagem) {

        mostrarMensagem("Preencha todos os campos!");

        return;

    }

    try {

        const url = new URL(imagem);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

    } catch (error) {

        mostrarMensagem("Informe um endereço de imagem válido.");

        return;

    }

    // CRIAR PUBLICAÇÃO

    const novoPost = document.createElement("article");

    novoPost.className = "post";

    // CABEÇALHO

    const header = document.createElement("div");

    header.className = "post-header";

    const userInfo = document.createElement("div");

    userInfo.className = "user-info";

    const avatar = document.createElement("div");

    avatar.className = "avatar new-avatar";

    avatar.textContent = nome.charAt(0).toUpperCase();

    const dados = document.createElement("div");

    const usuario = document.createElement("strong");

    usuario.textContent = nome;

    const local = document.createElement("small");

    local.textContent = "Publicado agora";

    dados.appendChild(usuario);

    dados.appendChild(local);

    userInfo.appendChild(avatar);

    userInfo.appendChild(dados);

    const mais = document.createElement("button");

    mais.className = "more-btn";

    mais.textContent = "•••";

    header.appendChild(userInfo);

    header.appendChild(mais);

    // IMAGEM

    const foto = document.createElement("img");

    foto.className = "post-image";

    foto.src = imagem;

    foto.alt = "Foto do pet de " + nome;

    // AÇÕES

    const actions = document.createElement("div");

    actions.className = "post-actions";

    const curtir = document.createElement("button");

    curtir.className = "like-btn";

    curtir.textContent = "♡";

    const comentar = document.createElement("button");

    comentar.className = "comment-focus";

    comentar.textContent = "💬";

    const compartilhar = document.createElement("button");

    compartilhar.className = "share-btn";

    compartilhar.textContent = "➤";

    const salvar = document.createElement("button");

    salvar.className = "save-btn";

    salvar.textContent = "♧";

    actions.appendChild(curtir);

    actions.appendChild(comentar);

    actions.appendChild(compartilhar);

    actions.appendChild(salvar);

    // CURTIDAS

    const likes = document.createElement("p");

    likes.className = "likes";

    likes.dataset.count = "0";

    likes.textContent = "0 curtidas";

    // DESCRIÇÃO

    const caption = document.createElement("p");

    caption.className = "caption";

    const nomeCaption = document.createElement("strong");

    nomeCaption.textContent = nome;

    caption.appendChild(nomeCaption);

    caption.appendChild(
        document.createTextNode(descricao)
    );

    // COMENTÁRIOS

    const comments = document.createElement("div");

    comments.className = "comments";

    const commentForm = document.createElement("form");

    commentForm.className = "comment-form";

    const commentInput = document.createElement("input");

    commentInput.type = "text";

    commentInput.placeholder = "Adicione um comentário...";

    const commentButton = document.createElement("button");

    commentButton.type = "submit";

    commentButton.textContent = "Publicar";

    commentForm.appendChild(commentInput);

    commentForm.appendChild(commentButton);

    // MONTAR PUBLICAÇÃO

    novoPost.appendChild(header);

    novoPost.appendChild(foto);

    novoPost.appendChild(actions);

    novoPost.appendChild(likes);

    novoPost.appendChild(caption);

    novoPost.appendChild(comments);

    novoPost.appendChild(commentForm);

    // ADICIONAR NO INÍCIO DO FEED

    feed.insertBefore(novoPost, feed.querySelector(".feed-title").nextSibling);

    // LIMPAR FORMULÁRIO

    postForm.reset();

    mostrarMensagem("Seu pet foi publicado! 🐶");

});


// STORIES

document.querySelectorAll(".story").forEach(function(story, index) {

    story.addEventListener("click", function() {

        if (index === 0) {

            document.getElementById("novo-post").scrollIntoView({
                behavior: "smooth"
            });

        } else {

            mostrarMensagem("Story de pet selecionado! 🐾");

        }

    });

});


// MENU DE OPÇÕES

document.querySelectorAll(".more-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        mostrarMensagem("Mais opções em breve!");

    });

});


// BOTÃO DE PESQUISA MOBILE

document.getElementById("mobileSearch").addEventListener("click", function() {

    const termo = prompt("Digite o nome do pet ou perfil que deseja procurar:");

    if (termo === null) return;

    const pesquisa = termo.toLowerCase().trim();

    const publicacoes = document.querySelectorAll(".post");

    let encontrados = 0;

    publicacoes.forEach(function(post) {

        const conteudo = post.textContent.toLowerCase();

        const corresponde = conteudo.includes(pesquisa);

        post.style.display = corresponde ? "block" : "none";

        if (corresponde) encontrados++;

    });

    mostrarMensagem(encontrados + " publicação(ões) encontrada(s).");

});
