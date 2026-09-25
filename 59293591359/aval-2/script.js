// ==========================================
// GRAND LINE FEED
// JavaScript
// ==========================================


// ==========================================
// MODO ESCURO
// ==========================================

const themeButton = document.getElementById("themeButton");

const savedTheme = localStorage.getItem("grandLineTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";
}


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");

    themeButton.textContent =
        darkMode ? "☀️" : "🌙";

    localStorage.setItem(
        "grandLineTheme",
        darkMode ? "dark" : "light"
    );

});


// ==========================================
// CURTIDAS
// ==========================================

const likeButtons =
    document.querySelectorAll(".like-button");


likeButtons.forEach(button => {

    button.addEventListener("click", () => {

        let likes =
            Number(button.dataset.likes);

        const number =
            button.querySelector("span");

        if (button.classList.contains("liked")) {

            likes--;

            button.classList.remove("liked");

        } else {

            likes++;

            button.classList.add("liked");
        }

        button.dataset.likes = likes;

        number.textContent =
            likes.toLocaleString("pt-BR");
    });

});


// ==========================================
// BOTÕES DE SEGUIR
// ==========================================

const followButtons =
    document.querySelectorAll(".follow");


followButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (button.classList.contains("following")) {

            button.classList.remove("following");

            button.textContent = "Seguir";

        } else {

            button.classList.add("following");

            button.textContent = "Seguindo ✓";
        }

    });

});


// ==========================================
// COMPARTILHAR
// ==========================================

const shareButtons =
    document.querySelectorAll(".share-button");


shareButtons.forEach(button => {

    button.addEventListener("click", async () => {

        const text =
            "Confira este post no Grand Line Feed! ☠️";

        try {

            await navigator.clipboard.writeText(text);

            showNotification(
                "Post copiado para compartilhar! 📤"
            );

        } catch {

            showNotification(
                "Post pronto para compartilhar! 📤"
            );
        }

    });

});


// ==========================================
// PUBLICAR POST
// ==========================================

const postInput =
    document.getElementById("postInput");

const publishButton =
    document.getElementById("publishButton");

const postsContainer =
    document.getElementById("posts");


publishButton.addEventListener("click", () => {

    const text =
        postInput.value.trim();

    if (text === "") {

        showNotification(
            "Escreva alguma coisa antes de publicar."
        );

        postInput.focus();

        return;
    }

    createPost(text);

    postInput.value = "";

    showNotification(
        "Seu post foi publicado! 🏴‍☠️"
    );

});


function createPost(text) {

    const post =
        document.createElement("article");

    post.className = "post";

    post.dataset.category = "recent";

    post.innerHTML = `

        <div class="post-header">

            <div class="avatar">
                👒
            </div>

            <div class="post-user">

                <strong>
                    Monkey D. Luffy ✓
                </strong>

                <span>
                    @luffy · agora
                </span>

            </div>

            <button class="more">
                ⋮
            </button>

        </div>


        <div class="post-content">

            <p>
                ${escapeHTML(text)}
            </p>

        </div>


        <div class="post-actions">

            <button
                class="like-button"
                data-likes="0"
            >
                ❤️ <span>0</span>
            </button>

            <button>
                💬 <span>0</span>
            </button>

            <button>
                🔁 <span>0</span>
            </button>

            <button class="share-button">
                📤
            </button>

        </div>
    `;

    postsContainer.prepend(post);

    addPostEvents(post);
}


// ==========================================
// EVENTOS PARA NOVOS POSTS
// ==========================================

function addPostEvents(post) {

    const likeButton =
        post.querySelector(".like-button");

    likeButton.addEventListener("click", () => {

        let likes =
            Number(likeButton.dataset.likes);

        const span =
            likeButton.querySelector("span");

        if (likeButton.classList.contains("liked")) {

            likes--;

            likeButton.classList.remove("liked");

        } else {

            likes++;

            likeButton.classList.add("liked");
        }

        likeButton.dataset.likes = likes;

        span.textContent =
            likes.toLocaleString("pt-BR");
    });


    const shareButton =
        post.querySelector(".share-button");

    shareButton.addEventListener("click", () => {

        showNotification(
            "Post preparado para compartilhar! 📤"
        );

    });

}


// ==========================================
// PESQUISA
// ==========================================

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase().trim();

    const posts =
        document.querySelectorAll(".post");

    posts.forEach(post => {

        const text =
            post.innerText.toLowerCase();

        if (text.includes(search)) {

            post.style.display = "";

        } else {

            post.style.display = "none";
        }

    });

});


// ==========================================
// FILTROS DO FEED
// ==========================================

const filters =
    document.querySelectorAll(".filter");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const type =
            filter.dataset.filter;

        const posts =
            document.querySelectorAll(".post");

        posts.forEach(post => {

            if (type === "all") {

                post.style.display = "";

            }

            else if (type === "popular") {

                if (
                    post.dataset.category ===
                    "popular"
                ) {

                    post.style.display = "";

                } else {

                    post.style.display = "none";
                }

            }

            else if (type === "recent") {

                if (
                    post.dataset.category ===
                    "recent"
                ) {

                    post.style.display = "";

                } else {

                    post.style.display = "none";
                }
            }

        });

    });

});


// ==========================================
// MODAL DOS BOTÕES
// ==========================================

const modal =
    document.getElementById("modal");

const closeModal =
    document.getElementById("closeModal");

const modalText =
    document.getElementById("modalText");


document.querySelectorAll(".more")
    .forEach(button => {

        button.addEventListener("click", () => {

            modalText.textContent =
                "Este é um projeto de feed social inspirado no universo de One Piece. ☠️";

            modal.classList.add("show");
        });

    });


closeModal.addEventListener("click", () => {

    modal.classList.remove("show");

});


modal.addEventListener("click", event => {

    if (event.target === modal) {

        modal.classList.remove("show");

    }

});


// ==========================================
// NOTIFICAÇÕES
// ==========================================

function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.textContent = message;

    notification.style.position = "fixed";

    notification.style.bottom = "25px";

    notification.style.left = "50%";

    notification.style.transform =
        "translateX(-50%)";

    notification.style.background =
        "#17191f";

    notification.style.color =
        "white";

    notification.style.padding =
        "13px 20px";

    notification.style.borderRadius =
        "10px";

    notification.style.fontSize =
        "13px";

    notification.style.fontWeight =
        "600";

    notification.style.zIndex =
        "9999";

    notification.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.25)";

    document.body.appendChild(notification);


    setTimeout(() => {

        notification.style.opacity = "0";

        notification.style.transition =
            "opacity .3s";

        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2200);

}


// ==========================================
// SEGURANÇA PARA TEXTO DO USUÁRIO
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
