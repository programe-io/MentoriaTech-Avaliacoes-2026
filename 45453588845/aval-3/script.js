
const feed = document.getElementById("feed");

// SISTEMA DE CURTIDAS

function activateLikes() {
    document.querySelectorAll(".post").forEach(post => {
        const likeButton = post.querySelector(".like");

        likeButton.onclick = () => {
            const count = post.querySelector(".likes-count");
            let likes = parseInt(count.textContent.replace(/\D/g, ""));

            if (likeButton.classList.contains("liked")) {
                likeButton.classList.remove("liked");
                likeButton.textContent = "♡";
                likes--;
            } else {
                likeButton.classList.add("liked");
                likeButton.textContent = "♥";
                likes++;
            }

            count.textContent = likes.toLocaleString("pt-BR") + " curtidas";
        };
    });
}

activateLikes();

// SISTEMA DE COMENTÁRIOS

document.addEventListener("submit", event => {
    if (event.target.classList.contains("comment-form")) {
        event.preventDefault();

        const input = event.target.querySelector("input");
        const message = input.value.trim();

        if (message === "") return;

        const postInfo = event.target.previousElementSibling;

        const newComment = document.createElement("p");
        const username = document.createElement("strong");

        username.textContent = "meu_perfil ";
        newComment.appendChild(username);
        newComment.appendChild(document.createTextNode(message));

        postInfo.insertBefore(newComment, postInfo.querySelector("small"));

        input.value = "";
    }
});

// SISTEMA DE SEGUIR

document.querySelectorAll(".follow").forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
            button.style.color = "#888";
        } else {
            button.textContent = "Seguir";
            button.style.color = "#0095f6";
        }
    });
});

// ABRIR MODAL DE PUBLICAÇÃO

const modal = document.getElementById("createModal");

document.getElementById("createLink").onclick = event => {
    event.preventDefault();
    modal.style.display = "flex";
};

document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
};

// CRIAR PUBLICAÇÃO

document.getElementById("postForm").addEventListener("submit", event => {
    event.preventDefault();

    const imageUrl = document.getElementById("imageUrl").value.trim();
    const caption = document.getElementById("caption").value.trim();

    try {
        const url = new URL(imageUrl);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

        const post = document.createElement("article");
        post.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";
        header.innerHTML = `
            <img src="https://i.pravatar.cc/100?img=11">
            <div><strong>meu_perfil</strong><small>Agora mesmo</small></div>
        `;

        const image = document.createElement("img");
        image.className = "post-image";
        image.src = url.href;
        image.alt = "Imagem da publicação";

        const actions = document.createElement("div");
        actions.className = "post-actions";
        actions.innerHTML = `
            <button class="like">♡</button>
            <button class="comment">♧</button>
            <button class="share">➤</button>
            <button class="save">♧</button>
        `;

        const info = document.createElement("div");
        info.className = "post-info";

        const likes = document.createElement("strong");
        likes.className = "likes-count";
        likes.textContent = "0 curtidas";

        const paragraph = document.createElement("p");
        const username = document.createElement("strong");
        username.textContent = "meu_perfil ";
        paragraph.append(username, document.createTextNode(caption));

        const time = document.createElement("small");
        time.textContent = "AGORA MESMO";

        info.append(likes, paragraph, time);

        const form = document.createElement("form");
        form.className = "comment-form";
        form.innerHTML = `
            <input type="text" placeholder="Adicione um comentário...">
            <button type="submit">Publicar</button>
        `;

        post.append(header, image, actions, info, form);

        feed.prepend(post);

        activateLikes();

        document.getElementById("postForm").reset();
        modal.style.display = "none";

    } catch {
        alert("Digite um endereço de imagem válido.");
    }
});

// FECHAR MODAL AO CLICAR FORA

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// PESQUISA SIMPLES

document.getElementById("searchLink").onclick = event => {
    event.preventDefault();

    const search = prompt("Digite o nome de um usuário:");

    if (!search) return;

    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        const username = post.querySelector(".post-header strong");

        post.style.display = username.textContent
            .toLowerCase()
            .includes(search.toLowerCase()) ? "block" : "none";
    });
};

// BOTÃO DE COMENTÁRIO

document.querySelectorAll(".comment").forEach(button => {
    button.onclick = () => {
        const input = button.closest(".post").querySelector(".comment-form input");
        input.focus();
    };
});
