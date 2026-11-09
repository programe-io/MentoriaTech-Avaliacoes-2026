const formPost = document.getElementById("formPost");
const publicacoes = document.getElementById("publicacoes");
const pesquisa = document.getElementById("pesquisa");

// Curtir publicações
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("curtir")) {
        const botao = event.target;
        const post = botao.closest(".post");
        const contador = post.querySelector(".contador");

        let curtidas = Number(contador.dataset.curtidas || 0);

        if (botao.classList.contains("ativo")) {
            curtidas--;
            botao.classList.remove("ativo");
            botao.textContent = "♡ Curtir";
        } else {
            curtidas++;
            botao.classList.add("ativo");
            botao.textContent = "♥ Curtido";
        }

        contador.dataset.curtidas = curtidas;
        contador.textContent = curtidas + " curtidas";
    }
});

// Criar nova publicação
formPost.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const legenda = document.getElementById("legenda").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !legenda) {
        alert("Preencha seu nome e a legenda!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const texto = document.createElement("p");
    texto.textContent = legenda;

    const botaoCurtir = document.createElement("button");
    botaoCurtir.className = "curtir";
    botaoCurtir.textContent = "♡ Curtir";

    const contador = document.createElement("span");
    contador.className = "contador";
    contador.dataset.curtidas = "0";
    contador.textContent = "0 curtidas";

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    const formularioComentario = document.createElement("form");
    formularioComentario.className = "form-comentario";

    const campoComentario = document.createElement("input");
    campoComentario.type = "text";
    campoComentario.placeholder = "Escreva um comentário...";
    campoComentario.required = true;

    const enviarComentario = document.createElement("button");
    enviarComentario.type = "submit";
    enviarComentario.textContent = "Enviar";

    formularioComentario.append(campoComentario, enviarComentario);

    formularioComentario.addEventListener("submit", function(e) {
        e.preventDefault();

        const comentario = document.createElement("p");
        comentario.textContent = campoComentario.value.trim();

        if (comentario.textContent) {
            comentarios.appendChild(comentario);
            campoComentario.value = "";
        }
    });

    post.append(titulo);

    // Adicionar imagem se o usuário informar um link
    if (imagem) {
        try {
            const url = new URL(imagem);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("Link inválido");
            }

            const foto = document.createElement("img");
            foto.src = url.href;
            foto.alt = "Imagem da publicação";

            foto.onerror = function() {
                foto.remove();
                alert("Não foi possível carregar essa imagem.");
            };

            post.appendChild(foto);
        } catch {
            alert("Digite um link de imagem válido.");
            return;
        }
    }

    post.append(
        texto,
        botaoCurtir,
        contador,
        comentarios,
        formularioComentario
    );

    publicacoes.prepend(post);

    formPost.reset();
    alert("Publicação criada com sucesso!");
});

// Comentários das publicações iniciais
document.querySelectorAll(".form-comentario").forEach(function(formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const campo = formulario.querySelector("input");
        const texto = campo.value.trim();

        if (!texto) return;

        const post = formulario.closest(".post");
        const comentarios = post.querySelector(".comentarios");

        const comentario = document.createElement("p");
        comentario.textContent = texto;

        comentarios.appendChild(comentario);
        campo.value = "";
    });
});

// Pesquisar publicações
pesquisa.addEventListener("input", function() {
    const termo = pesquisa.value.toLowerCase().trim();

    document.querySelectorAll(".post").forEach(function(post) {
        const conteudo = post.textContent.toLowerCase();

        post.style.display = conteudo.includes(termo)
            ? "block"
            : "none";
    });
});