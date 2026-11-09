// SISTEMA DE CURTIDAS
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("like")) {
        const botao = event.target;
        const post = botao.closest(".post");
        const contador = post.querySelector(".likes");

        let curtidas = Number(post.dataset.curtidas || 0);

        if (botao.classList.contains("liked")) {
            curtidas--;
            botao.classList.remove("liked");
            botao.textContent = "♡";
        } else {
            curtidas++;
            botao.classList.add("liked");
            botao.textContent = "♥";
        }

        post.dataset.curtidas = curtidas;
        contador.textContent = curtidas + " curtidas";
    }

    // SALVAR PUBLICAÇÃO
    if (event.target.classList.contains("save")) {
        event.target.classList.toggle("saved");
        event.target.textContent =
            event.target.classList.contains("saved") ? "▣" : "♧";
    }

    // IR PARA OS COMENTÁRIOS
    if (event.target.classList.contains("comment-focus")) {
        const post = event.target.closest(".post");
        post.querySelector(".comment-form input").focus();
    }

    // COMPARTILHAR PUBLICAÇÃO
    if (event.target.classList.contains("share")) {
        const post = event.target.closest(".post");
        const legenda = post.querySelector(".post-content p");

        if (navigator.clipboard && legenda) {
            navigator.clipboard.writeText(legenda.innerText)
                .then(() => alert("Legenda copiada para compartilhar!"))
                .catch(() => alert("Não foi possível copiar o conteúdo."));
        } else {
            alert("Compartilhamento não disponível neste navegador.");
        }
    }
});

// SISTEMA DE COMENTÁRIOS
document.querySelectorAll(".comment-form").forEach(function(form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const campo = form.querySelector("input");
        const texto = campo.value.trim();

        if (texto === "") return;

        const post = form.closest(".post");
        const comentarios = post.querySelector(".comments");

        const comentario = document.createElement("p");
        comentario.textContent = texto;

        comentarios.appendChild(comentario);
        campo.value = "";
    });
});

// CRIAR PUBLICAÇÃO
const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("username").value.trim();
    const legenda = document.getElementById("caption").value.trim();
    const imagem = document.getElementById("imageUrl").value.trim();

    if (!nome || !legenda) {
        alert("Preencha seu nome e sua legenda!");
        return;
    }

    if (imagem) {
        try {
            const url = new URL(imagem);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("URL inválida");
            }
        } catch {
            alert("Digite um endereço de imagem válido.");
            return;
        }
    }

    const post = document.createElement("article");
    post.className = "post";
    post.dataset.curtidas = "0";

    // Cabeçalho
    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Foto do perfil";

    const usuario = document.createElement("strong");
    usuario.textContent = nome;

    const opcoes = document.createElement("span");
    opcoes.textContent = "•••";

    cabecalho.append(avatar, usuario, opcoes);
    post.appendChild(cabecalho);

    // Imagem
    if (imagem) {
        const foto = document.createElement("img");
        foto.className = "post-image";
        foto.src = imagem;
        foto.alt = "Imagem da publicação";

        foto.onerror = function() {
            foto.remove();
            alert("Não foi possível carregar a imagem.");
        };

        post.appendChild(foto);
    }

    // Botões
    const acoes = document.createElement("div");
    acoes.className = "post-actions";

    acoes.innerHTML = `
        <button class="like">♡</button>
        <button class="comment-focus">♧</button>
        <button class="share">➤</button>
        <button class="save">♧</button>
    `;

    // Conteúdo
    const conteudo = document.createElement("div");
    conteudo.className = "post-content";

    const curtidas = document.createElement("strong");
    curtidas.className = "likes";
    curtidas.textContent = "0 curtidas";

    const texto = document.createElement("p");
    const nomeNegrito = document.createElement("strong");
    nomeNegrito.textContent = nome + " ";
    texto.append(nomeNegrito, document.createTextNode(legenda));

    const comentarios = document.createElement("div");
    comentarios.className = "comments";

    const horario = document.createElement("small");
    horario.textContent = "AGORA";

    const formulario = document.createElement("form");
    formulario.className = "comment-form";

    const campo = document.createElement("input");
    campo.type = "text";
    campo.placeholder = "Adicione um comentário...";
    campo.required = true;

    const publicar = document.createElement("button");
    publicar.type = "submit";
    publicar.textContent = "Publicar";

    formulario.append(campo, publicar);

    formulario.addEventListener("submit", function(e) {
        e.preventDefault();

        const comentarioTexto = campo.value.trim();

        if (!comentarioTexto) return;

        const comentario = document.createElement("p");
        comentario.textContent = comentarioTexto;

        comentarios.appendChild(comentario);
        campo.value = "";
    });

    conteudo.append(
        curtidas,
        texto,
        comentarios,
        horario,
        formulario
    );

    post.append(acoes, conteudo);

    // Colocar publicação no início do feed
    document.getElementById("posts").prepend(post);

    postForm.reset();

    alert("Publicação criada com sucesso!");
});

// SISTEMA DE SEGUIR
document.querySelectorAll(".follow").forEach(function(botao) {
    botao.addEventListener("click", function() {
        if (botao.textContent === "Seguir") {
            botao.textContent = "Seguindo";
            botao.style.color = "#888";
        } else {
            botao.textContent = "Seguir";
            botao.style.color = "#0095f6";
        }
    });
});