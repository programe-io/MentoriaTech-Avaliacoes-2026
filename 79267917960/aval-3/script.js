
const modal = document.getElementById("modal");
const createBtn = document.getElementById("createBtn");
const closeBtn = document.querySelector(".close");
const publishBtn = document.getElementById("publishBtn");

// ABRIR E FECHAR MODAL

createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// CURTIR PUBLICAÇÕES

function setupPost(post) {
    const likeBtn = post.querySelector(".like-btn");
    const likes = post.querySelector(".likes");

    let liked = false;
    let count = parseInt(likes.textContent.replace(/\D/g, "")) || 0;

    likeBtn.addEventListener("click", () => {
        liked = !liked;

        if (liked) {
            count++;
            likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
            likeBtn.classList.add("liked");
        } else {
            count--;
            likeBtn.innerHTML = '<i class="far fa-heart"></i>';
            likeBtn.classList.remove("liked");
        }

        likes.textContent = count.toLocaleString("pt-BR") + " curtidas";
    });

    // SALVAR PUBLICAÇÃO

    const saveBtn = post.querySelector(".save-btn");

    saveBtn.addEventListener("click", () => {
        saveBtn.classList.toggle("liked");

        saveBtn.innerHTML = saveBtn.classList.contains("liked")
            ? '<i class="fas fa-bookmark"></i>'
            : '<i class="far fa-bookmark"></i>';
    });

    // COMENTAR

    const commentInput = post.querySelector(".comment-box input");
    const commentBtn = post.querySelector(".comment-btn");
    const commentArea = post.querySelector(".comments");

    commentBtn.addEventListener("click", () => {
        const comment = commentInput.value.trim();

        if (comment !== "") {
            const p = document.createElement("p");
            const strong = document.createElement("strong");

            strong.textContent = "meu_usuario ";
            p.appendChild(strong);
            p.appendChild(document.createTextNode(comment));

            commentArea.insertAdjacentElement("beforebegin", p);
            commentInput.value = "";
        }
    });
}

document.querySelectorAll(".post").forEach(setupPost);

// CRIAR PUBLICAÇÃO

publishBtn.addEventListener("click", () => {
    const imageUrl = document.getElementById("imageUrl").value.trim();
    const caption = document.getElementById("caption").value.trim();

    if (!imageUrl) {
        alert("Insira o endereço de uma imagem!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=11";

    const username = document.createElement("strong");
    username.textContent = "meu_usuario";

    const options = document.createElement("span");
    options.textContent = "•••";

    header.append(avatar, username, options);

    const image = document.createElement("img");
    image.className = "post-image";
    image.src = imageUrl;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    actions.innerHTML = `
        <button class="like-btn"><i class="far fa-heart"></i></button>
        <button><i class="far fa-comment"></i></button>
        <button><i class="far fa-paper-plane"></i></button>
        <button class="save-btn"><i class="far fa-bookmark"></i></button>
    `;

    const info = document.createElement("div");
    info.className = "post-info";

    const likes = document.createElement("strong");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const description = document.createElement("p");
    const author = document.createElement("strong");
    author.textContent = "meu_usuario ";

    description.append(author, document.createTextNode(caption));

    const comments = document.createElement("p");
    comments.className = "comments";
    comments.textContent = "Ver todos os comentários";

    const date = document.createElement("small");
    date.textContent = "AGORA";

    info.append(likes, description, comments, date);

    const commentBox = document.createElement("div");
    commentBox.className = "comment-box";
    commentBox.innerHTML = `
        <input type="text" placeholder="Adicione um comentário...">
        <button class="comment-btn">Publicar</button>
    `;

    post.append(header, image, actions, info, commentBox);

    document.getElementById("feed").prepend(post);

    setupPost(post);

    modal.style.display = "none";

    document.getElementById("imageUrl").value = "";
    document.getElementById("caption").value = "";
});
