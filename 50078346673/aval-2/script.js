
const feed = document.getElementById("feed");
const campoTexto = document.getElementById("texto-publicacao");
const campoImagem = document.getElementById("url-imagem");
const mensagem = document.getElementById("mensagem");
const quantidadePosts = document.getElementById("quantidade-posts");

// CRIAR UMA PUBLICAÇÃO
document.getElementById("botao-publicar")
    .addEventListener("click", function () {
        const texto = campoTexto.value.trim();
        const urlImagem = campoImagem.value.trim();

        if (texto === "") {
            mensagem.textContent =
                "Escreva uma mensagem antes de publicar.";
            campoTexto.focus();
            return;
        }

        const postagem = document.createElement("article");
        postagem.className = "card postagem";

        const topo = document.createElement("div");
        topo.className = "postagem-topo";

        const avatar = document.createElement("div");
        avatar.className = "avatar-post avatar-luna";
        avatar.textContent = "LM";

        const usuario = document.createElement("div");

        const nome = document.createElement("p");
        nome.className = "nome";
        nome.textContent = "Luna Maria ✨";

        const tempo = document.createElement("p");
        tempo.className = "tempo";
        tempo.textContent = "@lunamaria · agora";

        usuario.append(nome, tempo);
        topo.append(avatar, usuario);

        const paragrafo = document.createElement("p");
        paragrafo.className = "texto-post";
        paragrafo.textContent = texto;

        postagem.append(topo, paragrafo);

        if (urlImagem !== "") {
            try {
                const url = new URL(urlImagem);

                if (url.protocol !== "https:" && url.protocol !== "http:") {
                    throw new Error("URL inválida");
                }

                const imagem = document.createElement("img");
                imagem.className = "imagem-post";
                imagem.src = url.href;
                imagem.alt = "Imagem da publicação de Luna Maria";

                imagem.addEventListener("error", function () {
                    imagem.remove();
                    mensagem.textContent =
                        "A publicação foi criada, mas a imagem não carregou.";
                }, { once: true });

                postagem.appendChild(imagem);
            } catch (erro) {
                mensagem.textContent =
                    "A publicação será criada sem imagem. Verifique a URL.";
            }
        }

        const acoes = document.createElement("div");
        acoes.className = "acoes-post";

        acoes.innerHTML = `
            <button class="acao botao-curtir" aria-pressed="false">
                ♡ Curtir <span class="contador">0</span>
            </button>
            <button class="acao botao-comentar">▢ Comentar</button>
            <button class="acao botao-compartilhar">↗ Compartilhar</button>
        `;

        const formulario = document.createElement("form");
        formulario.className = "form-comentario oculto";

        const entrada = document.createElement("input");
        entrada.placeholder = "Escreva um comentário...";
        entrada.maxLength = 200;
        entrada.required = true;
        entrada.setAttribute("aria-label", "Escreva um comentário");

        const enviar = document.createElement("button");
        enviar.type = "submit";
        enviar.textContent = "Enviar";

        formulario.append(entrada, enviar);

        const lista = document.createElement("div");
        lista.className = "lista-comentarios";

        postagem.append(acoes, formulario, lista);
        feed.prepend(postagem);

        campoTexto.value = "";
        campoImagem.value = "";

        quantidadePosts.textContent =
            Number(quantidadePosts.textContent) + 1;

        mensagem.textContent = "Publicação criada com sucesso! 💜";
    });

// CURTIR, COMENTAR E COMPARTILHAR
feed.addEventListener("click", async function (event) {
    const botao = event.target.closest("button");

    if (!botao) return;

    // CURTIR
    if (botao.classList.contains("botao-curtir")) {
        const curtiu = botao.getAttribute("aria-pressed") === "true";
        const contador = botao.querySelector(".contador");

        contador.textContent =
            Number(contador.textContent) + (curtiu ? -1 : 1);

        botao.setAttribute("aria-pressed", String(!curtiu));
        botao.classList.toggle("curtido", !curtiu);

        botao.firstChild.textContent =
            curtiu ? "♡ Curtir " : "♥ Curtido ";

        return;
    }

    // ABRIR CAMPO DE COMENTÁRIO
    if (botao.classList.contains("botao-comentar")) {
        const postagem = botao.closest(".postagem");
        const formulario = postagem.querySelector(".form-comentario");

        formulario.classList.toggle("oculto");

        if (!formulario.classList.contains("oculto")) {
            formulario.querySelector("input").focus();
        }

        return;
    }

    // COMPARTILHAR
    if (botao.classList.contains("botao-compartilhar")) {
        const postagem = botao.closest(".postagem");
        const texto = postagem.querySelector(".texto-post").textContent.trim();

        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Luna Social",
                    text: texto
                });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(texto);
                mensagem.textContent =
                    "Texto copiado! Agora você pode compartilhar.";
            } else {
                mensagem.textContent =
                    "Copie o texto da publicação para compartilhar.";
            }
        } catch (erro) {
            if (erro.name !== "AbortError") {
                mensagem.textContent =
                    "Não foi possível compartilhar agora.";
            }
        }
    }
});

// ENVIAR COMENTÁRIOS
feed.addEventListener("submit", function (event) {
    if (!event.target.matches(".form-comentario")) return;

    event.preventDefault();

    const formulario = event.target;
    const entrada = formulario.querySelector("input");
    const texto = entrada.value.trim();

    if (texto === "") return;

    const comentario = document.createElement("p");
    comentario.className = "comentario";

    const autor = document.createElement("strong");
    autor.textContent = "Luna Maria: ";

    comentario.append(autor, document.createTextNode(texto));

    formulario.parentElement
        .querySelector(".lista-comentarios")
        .appendChild(comentario);

    formulario.reset();
    formulario.classList.add("oculto");
});
