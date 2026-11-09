const main = document.querySelector("main");
const header = document.querySelector("body > header");
const feed = document.querySelector("#titulo-feed")?.parentElement;





document.querySelectorAll(".post").forEach((post) => {
    const likeButton = post.querySelector(
        '.post-actions button[aria-label="Curtir publicação"]'
    );

    const likesText = [...post.querySelectorAll("p strong")]
        .find((element) => element.textContent.includes("curtidas"));

    if (!likeButton || !likesText) return;

    let likes = parseInt(likesText.textContent, 10) || 0;
    let liked = false;

    likeButton.addEventListener("click", () => {
        liked = !liked;
        likes += liked ? 1 : -1;

        likesText.textContent = `${likes} curtidas`;
        likeButton.textContent = liked ? "♥ Curtido" : "♡ Curtir";
        likeButton.style.color = liked ? "#d94680" : "";

        likeButton.setAttribute("aria-pressed", String(liked));
    });

    likeButton.setAttribute("aria-pressed", "false");
});



document.querySelectorAll(".post").forEach((post) => {
    const form = post.querySelector("form");
    const input = form?.querySelector('input[type="text"]');

    if (!form || !input) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const texto = input.value.trim();

        if (!texto) {
            input.focus();
            return;
        }

        const comentario = document.createElement("p");
        const autor = document.createElement("strong");

        autor.textContent = "Você: ";
        comentario.append(autor, document.createTextNode(texto));

        // Adiciona o comentário antes do formulário.
        post.insertBefore(comentario, form);

        input.value = "";
        input.focus();
    });
});




const searchForm = header?.querySelector("form");
const searchInput = searchForm?.querySelector('input[type="search"]');

if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        pesquisar(searchInput.value);
    });

    searchInput.addEventListener("input", () => {
        pesquisar(searchInput.value);
    });
}

function pesquisar(termo) {
    const busca = termo.trim().toLocaleLowerCase("pt-BR");

    document.querySelectorAll(".post").forEach((post) => {
        const conteudo = post.textContent.toLocaleLowerCase("pt-BR");
        post.hidden = !conteudo.includes(busca);
    });

    document.querySelectorAll(".story").forEach((story) => {
        const nome = story.textContent.toLocaleLowerCase("pt-BR");
        story.hidden = busca !== "" && !nome.includes(busca);
    });
}



document.querySelectorAll(".post").forEach((post) => {
    const buttons = post.querySelectorAll(".post-actions button");
    const shareButton = buttons[2];

    if (!shareButton) return;

    shareButton.addEventListener("click", async () => {
        const autor = post.querySelector(".post-header h3")?.textContent
            || "Usuário";

        const legenda = [...post.querySelectorAll("p")]
            .find((p) => p.querySelector("strong")
                && !p.textContent.includes("curtidas"));

        const texto = `${autor}: ${legenda?.textContent || "Confira esta publicação!"}`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: "MiniFeed",
                    text: texto
                });
            } else if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(texto);
                alert("Texto da publicação copiado!");
            } else {
                prompt("Copie o texto para compartilhar:", texto);
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                alert("Não foi possível compartilhar esta publicação.");
            }
        }
    });
});




if (feed) {
    const composer = document.createElement("section");
    composer.className = "composer";

    const title = document.createElement("h2");
    title.textContent = "Criar publicação";

    const form = document.createElement("form");

    const caption = document.createElement("textarea");
    caption.placeholder = "O que você está pensando?";
    caption.setAttribute("aria-label", "Legenda da publicação");
    caption.required = true;
    caption.rows = 3;

    const imageURL = document.createElement("input");
    imageURL.type = "url";
    imageURL.placeholder = "URL da imagem (opcional)";
    imageURL.setAttribute("aria-label", "URL da imagem");

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Publicar";

    form.append(caption, imageURL, submit);
    composer.append(title, form);

    feed.parentElement.insertBefore(composer, feed);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const texto = caption.value.trim();
        const url = imageURL.value.trim();

        if (!texto) {
            caption.focus();
            return;
        }

        if (url) {
            try {
                const parsedURL = new URL(url);

                if (!["http:", "https:"].includes(parsedURL.protocol)) {
                    alert("Use uma URL de imagem HTTP ou HTTPS.");
                    return;
                }
            } catch {
                alert("Digite uma URL válida para a imagem.");
                return;
            }
        }

        const post = document.createElement("article");
        post.className = "post";

        const postHeader = document.createElement("header");
        postHeader.className = "post-header";

        const avatar = document.createElement("img");
        avatar.src = "https://i.pravatar.cc/100?img=11";
        avatar.alt = "Sua foto de perfil";

        const name = document.createElement("h3");
        name.textContent = "Você";

        postHeader.append(avatar, name);
        post.append(postHeader);

        if (url) {
            const image = document.createElement("img");
            image.className = "post-image";
            image.src = url;
            image.alt = "Imagem da publicação";
            image.loading = "lazy";

            image.addEventListener("error", () => {
                image.alt = "Não foi possível carregar esta imagem.";
            });

            post.append(image);
        }

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const like = document.createElement("button");
        like.type = "button";
        like.setAttribute("aria-label", "Curtir publicação");
        like.setAttribute("aria-pressed", "false");
        like.textContent = "♡ Curtir";

        const commentButton = document.createElement("button");
        commentButton.type = "button";
        commentButton.textContent = "Comentar";

        const share = document.createElement("button");
        share.type = "button";
        share.textContent = "Compartilhar";

        actions.append(like, commentButton, share);
        post.append(actions);

        const likes = document.createElement("p");
        const likesStrong = document.createElement("strong");
        likesStrong.textContent = "0 curtidas";
        likes.append(likesStrong);
        post.append(likes);

        const legend = document.createElement("p");
        const author = document.createElement("strong");
        author.textContent = "Você ";
        legend.append(author, document.createTextNode(texto));
        post.append(legend);

        const date = document.createElement("p");
        date.className = "date";
        date.textContent = "Agora mesmo";
        post.append(date);

        const commentForm = document.createElement("form");
        const commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.placeholder = "Escreva um comentário...";
        commentInput.setAttribute("aria-label", "Escreva um comentário");

        const commentSubmit = document.createElement("button");
        commentSubmit.type = "submit";
        commentSubmit.textContent = "Publicar";

        commentForm.append(commentInput, commentSubmit);
        post.append(commentForm);

        
        feed.insertBefore(post, feed.children[1] || null);

       
        ativarPost(post);

        caption.value = "";
        imageURL.value = "";

        post.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}



function ativarPost(post) {
    const likeButton = post.querySelector(
        '[aria-label="Curtir publicação"]'
    );

    const likesText = post.querySelector(".post-actions + p strong");

    let likes = 0;
    let liked = false;

    likeButton.addEventListener("click", () => {
        liked = !liked;
        likes += liked ? 1 : -1;

        likesText.textContent = `${likes} curtidas`;
        likeButton.textContent = liked ? "♥ Curtido" : "♡ Curtir";
        likeButton.style.color = liked ? "#d94680" : "";
        likeButton.setAttribute("aria-pressed", String(liked));
    });

    const form = post.querySelector("form");
    const input = form.querySelector('input[type="text"]');

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const texto = input.value.trim();
        if (!texto) return;

        const comentario = document.createElement("p");
        const autor = document.createElement("strong");

        autor.textContent = "Você: ";
        comentario.append(autor, document.createTextNode(texto));

        post.insertBefore(comentario, form);
        input.value = "";
    });

    const commentButton = post.querySelector(
        ".post-actions button:nth-child(2)"
    );

    commentButton.addEventListener("click", () => {
        input.focus();
    });

    const shareButton = post.querySelector(
        ".post-actions button:nth-child(3)"
    );

    shareButton.addEventListener("click", async () => {
        const texto = post.querySelector("p strong")?.parentElement
            ?.nextElementSibling?.textContent || "Publicação do MiniFeed";

        try {
            if (navigator.share) {
                await navigator.share({
                    title: "MiniFeed",
                    text: texto
                });
            } else if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(texto);
                alert("Texto da publicação copiado!");
            } else {
                prompt("Copie para compartilhar:", texto);
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                alert("Não foi possível compartilhar.");
            }
        }
    });
}




document.querySelectorAll('a[href="#inicio"]').forEach((link) => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".post").forEach((post) => {
            post.hidden = false;
        });

        document.querySelectorAll(".story").forEach((story) => {
            story.hidden = false;
        });

        if (searchInput) searchInput.value = "";
    });
});

