// CURTIR PUBLICAÇÕES
document.querySelectorAll(".like-btn").forEach(button => {
    button.addEventListener("click", function() {
        const post = this.closest(".post");
        const count = post.querySelector(".likes span");

        let likes = Number(count.textContent);

        if (this.classList.contains("liked")) {
            likes--;
            this.classList.remove("liked");
            this.textContent = "♡";
        } else {
            likes++;
            this.classList.add("liked");
            this.textContent = "♥";
        }

        count.textContent = likes;
    });
});

// SEGUIR PERFIL
const followBtn = document.getElementById("followBtn");

followBtn.addEventListener("click", function() {
    if (this.textContent === "Seguir") {
        this.textContent = "Seguindo ✓";
        this.style.background = "#9b59b6";
    } else {
        this.textContent = "Seguir";
        this.style.background = "#e83e8c";
    }
});

// COMENTAR
function commentPost() {
    const comment = prompt("Escreva seu comentário:");

    if (comment && comment.trim() !== "") {
        alert("Comentário publicado: " + comment);
    }
}

// COMPARTILHAR
function sharePost() {
    alert("Compartilhe esta publicação com seus amigos! 💗");
}

// CRIAR NOVA PUBLICAÇÃO
function addPost() {
    const imageUrl = document.getElementById("imageUrl").value.trim();
    const caption = document.getElementById("caption").value.trim();

    if (!imageUrl || !caption) {
        alert("Preencha o link da imagem e a legenda!");
        return;
    }

    try {
        const url = new URL(imageUrl);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("Link inválido");
        }

        const post = document.createElement("article");
        post.className = "post";

        post.innerHTML = `
            <div class="post-header">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100">
                <strong>ariane.nunes ✨</strong>
            </div>

            <img class="post-image" alt="Nova publicação">

            <div class="post-actions">
                <button class="like-btn">♡</button>
                <button>💬</button>
                <button>↗</button>
            </div>

            <p class="likes">❤️ <span>0</span> curtidas</p>
            <p><strong>ariane.nunes</strong> ${caption.replace(/[&<>"']/g, c => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[c])}</p>
            <p class="date">AGORA</p>
        `;

        const newImage = post.querySelector(".post-image");
        newImage.src = url.href;

        newImage.onerror = function() {
            alert("Não foi possível carregar essa imagem.");
            post.remove();
        };

        post.querySelector(".like-btn").addEventListener("click", function() {
            const count = post.querySelector(".likes span");
            let likes = Number(count.textContent);

            if (this.classList.contains("liked")) {
                likes--;
                this.textContent = "♡";
                this.classList.remove("liked");
            } else {
                likes++;
                this.textContent = "♥";
                this.classList.add("liked");
            }

            count.textContent = likes;
        });

        post.querySelectorAll(".post-actions button")[1]
            .addEventListener("click", commentPost);

        post.querySelectorAll(".post-actions button")[2]
            .addEventListener("click", sharePost);

        document.getElementById("feed").prepend(post);

        document.getElementById("imageUrl").value = "";
        document.getElementById("caption").value = "";

        alert("Publicação adicionada com sucesso! 💗");

    } catch (error) {
        alert("Digite um link válido de imagem!");
    }
}