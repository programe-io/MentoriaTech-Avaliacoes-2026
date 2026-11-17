
const feed = document.getElementById("feed");
const modal = document.getElementById("createModal");

// ABRIR E FECHAR MODAL

document.getElementById("openCreate").onclick = () => {
    modal.style.display = "flex";
};

document.querySelector(".close").onclick = () => {
    modal.style.display = "none";
};

modal.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// CURTIDAS

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-btn")) {
        const button = event.target;
        const post = button.closest(".post");
        const likes = post.querySelector(".likes");

        let count = Number(likes.dataset.count || 
            likes.textContent.replace(/\D/g, ""));

        if (button.classList.contains("liked")) {
            button.classList.remove("liked", "fas");
            button.classList.add("far");
            count--;
        } else {
            button.classList.remove("far");
            button.classList.add("fas", "liked");
            count++;
        }

        likes.dataset.count = count;
        likes.textContent = count.toLocaleString("pt-BR") + " curtidas";
    }
});

// COMENTÁRIOS

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("comment-btn")) {
        const post = event.target.closest(".post");
        const input = post.querySelector(".comment-box input");
        const text = input.value.trim();

        if (!text) return;

        let comments = post.querySelector(".comments");

        if (!comments) {
            comments = document.createElement("p");
            comments.className = "comments";
            post.querySelector(".post-info").appendChild(comments);
        }

        const comment = document.createElement("p");
        comment.textContent = "Você: " + text;
        comment.style.marginTop = "8px";

        comments.insertAdjacentElement("afterend", comment);
        input.value = "";
    }
});

// CRIAR PUBLICAÇÃO

document.getElementById("publishBtn").onclick = () => {
    const username = document.getElementById("username").value.trim();
    const image = document.getElementById("imageUrl").value.trim();
    const caption = document.getElementById("caption").value.trim();

    if (!username || !image) {
        alert("Preencha seu nome e o link da imagem!");
        return;
    }

    try {
        const url = new URL(image);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

        const post = document.createElement("article");
        post.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const avatar = document.createElement("img");
        avatar.src = "https://i.pravatar.cc/100?img=12";

        const name = document.createElement("strong");
        name.textContent = username;

        const more = document.createElement("i");
        more.className = "fas fa-ellipsis";

        header.append(avatar, name, more);

        const photo = document.createElement("img");
        photo.className = "post-image";
        photo.src = url.href;
        photo.alt = "Publicação de " + username;

        photo.onerror = () => {
            alert("Não foi possível carregar essa imagem.");
            post.remove();
        };

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const icons = document.createElement("div");

        const heart = document.createElement("i");
        heart.className = "far fa-heart like-btn";

        const commentIcon = document.createElement("i");
        commentIcon.className = "far fa-comment";

        const shareIcon = document.createElement("i");
        shareIcon.className = "far fa-paper-plane";

        icons.append(heart, commentIcon, shareIcon);

        const bookmark = document.createElement("i");
        bookmark.className = "far fa-bookmark";

        actions.append(icons, bookmark);

        const info = document.createElement("div");
        info.className = "post-info";

        const likes = document.createElement("strong");
        likes.className = "likes";
        likes.textContent = "0 curtidas";
        likes.dataset.count = "0";

        const description = document.createElement("p");
        const boldName = document.createElement("strong");
        boldName.textContent = username;

        description.append(boldName, document.createTextNode(" " + caption));

        info.append(likes, description);

        const commentBox = document.createElement("div");
        commentBox.className = "comment-box";

        const input = document.createElement("input");
        input.placeholder = "Adicione um comentário...";

        const commentBtn = document.createElement("button");
        commentBtn.className = "comment-btn";
        commentBtn.textContent = "Publicar";

        commentBox.append(input, commentBtn);

        post.append(header, photo, actions, info, commentBox);
        feed.prepend(post);

        modal.style.display = "none";

        document.getElementById("username").value = "";
        document.getElementById("imageUrl").value = "";
        document.getElementById("caption").value = "";

    } catch (error) {
        alert("Digite um endereço de imagem válido!");
    }
};

// SEGUIR USUÁRIOS

document.querySelectorAll(".follow-btn").forEach(button => {
    button.onclick = () => {
        const following = button.textContent === "Seguir";

        button.textContent = following ? "Seguindo" : "Seguir";
        button.style.color = following ? "#888" : "#0095f6";
    };
});
