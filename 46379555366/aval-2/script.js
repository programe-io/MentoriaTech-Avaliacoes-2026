/* =========================
   MENU MOBILE
========================= */

const menuMobile = document.getElementById("menuMobile");
const nav = document.querySelector(".nav");

menuMobile.addEventListener("click", () => {

    nav.classList.toggle("open");

});


/* =========================
   FILTRO DE CATEGORIAS
========================= */

const categoryButtons =
    document.querySelectorAll(".category");

const posts =
    document.querySelectorAll(".post");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove o estado ativo
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Ativa o botão selecionado
        button.classList.add("active");

        const filter = button.dataset.filter;

        posts.forEach(post => {

            if (
                filter === "todos" ||
                post.dataset.category === filter
            ) {

                post.classList.remove("hidden");

            } else {

                post.classList.add("hidden");

            }

        });

    });

});


/* =========================
   CURTIR PUBLICAÇÃO
========================= */

const likeButtons =
    document.querySelectorAll(".like-button");


likeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const counter = button.querySelector("b");
        const heart = button.querySelector("span");

        let likes = Number(counter.textContent);

        if (button.classList.contains("liked")) {

            likes--;

            button.classList.remove("liked");

            heart.textContent = "♡";

        } else {

            likes++;

            button.classList.add("liked");

            heart.textContent = "♥";

        }

        counter.textContent = likes;

    });

});


/* =========================
   COMENTÁRIOS
========================= */

const commentButtons =
    document.querySelectorAll(".comment-button");


commentButtons.forEach(button => {

    button.addEventListener("click", () => {

        const counter = button.querySelector("b");

        let comments =
            Number(counter.textContent);

        comments++;

        counter.textContent = comments;

        alert(
            "Área de comentários aberta! ⚽"
        );

    });

});


/* =========================
   COMPARTILHAR
========================= */

const shareButtons =
    document.querySelectorAll(".share-button");


shareButtons.forEach(button => {

    button.addEventListener("click", async () => {

        const post =
            button.closest(".post");

        const title =
            post.querySelector("h3").textContent;

        const shareData = {
            title: "Futebol News",
            text: title,
            url: window.location.href
        };

        try {

            if (navigator.share) {

                await navigator.share(shareData);

            } else {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                alert(
                    "Link copiado para a área de transferência!"
                );

            }

        } catch (error) {

            console.log(
                "Compartilhamento cancelado."
            );

        }

    });

});


/* =========================
   MODAL DE PUBLICAÇÃO
========================= */

const publishButton =
    document.getElementById("publishButton");

const modal =
    document.getElementById("postModal");

const closeModal =
    document.getElementById("closeModal");

const confirmPost =
    document.getElementById("confirmPost");

const postText =
    document.getElementById("postText");

const postCategory =
    document.getElementById("postCategory");


publishButton.addEventListener("click", () => {

    modal.classList.add("show");

    postText.focus();

});


closeModal.addEventListener("click", () => {

    modal.classList.remove("show");

});


modal.addEventListener("click", event => {

    if (event.target === modal) {

        modal.classList.remove("show");

    }

});


/* =========================
   CRIAR NOVA PUBLICAÇÃO
========================= */

confirmPost.addEventListener("click", () => {

    const text =
        postText.value.trim();

    const category =
        postCategory.value;

    if (!text) {

        alert(
            "Digite alguma coisa antes de publicar."
        );

        return;

    }


    const categoryNames = {

        brasileirao: "BRASILEIRÃO",

        champions: "CHAMPIONS",

        mercado: "MERCADO DA BOLA",

        selecao: "SELEÇÃO"

    };


    const newPost =
        document.createElement("article");

    newPost.className = "post";

    newPost.dataset.category =
        category;


    newPost.innerHTML = `

        <div class="post-header">

            <div class="user-info">

                <div class="avatar user-avatar">
                    FN
                </div>

                <div>

                    <strong>
                        Você
                    </strong>

                    <span>
                        agora
                    </span>

                </div>

            </div>

            <span class="post-tag ${category}">
                ${categoryNames[category]}
            </span>

        </div>


        <div class="post-text">

            <h3>
                Nova publicação
            </h3>

            <p>
                ${escapeHTML(text)}
            </p>

        </div>


        <div class="post-footer">

            <button class="action like-button">

                <span>♡</span>
                <b>0</b> Curtir

            </button>

            <button class="action comment-button">

                💬 <b>0</b> Comentários

            </button>

            <button class="action share-button">

                ↗ Compartilhar

            </button>

        </div>

    `;


    document
        .querySelector(".feed")
        .appendChild(newPost);


    // Adiciona os eventos aos novos botões
    addPostInteractions(newPost);


    // Limpa formulário
    postText.value = "";

    modal.classList.remove("show");


    // Rola até a nova publicação
    newPost.scrollIntoView({
        behavior: "smooth"
    });

});


/* =========================
   INTERAÇÕES PARA POSTS NOVOS
========================= */

function addPostInteractions(post) {

    const like =
        post.querySelector(".like-button");

    const comment =
        post.querySelector(".comment-button");

    const share =
        post.querySelector(".share-button");


    like.addEventListener("click", () => {

        const counter =
            like.querySelector("b");

        const heart =
            like.querySelector("span");

        let value =
            Number(counter.textContent);


        if (like.classList.contains("liked")) {

            value--;

            like.classList.remove("liked");

            heart.textContent = "♡";

        } else {

            value++;

            like.classList.add("liked");

            heart.textContent = "♥";

        }


        counter.textContent = value;

    });


    comment.addEventListener("click", () => {

        const counter =
            comment.querySelector("b");

        counter.textContent =
            Number(counter.textContent) + 1;

        alert(
            "Área de comentários aberta! ⚽"
        );

    });


    share.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

            alert(
                "Link copiado!"
            );

        } catch {

            alert(
                "Não foi possível copiar o link."
            );

        }

    });

}


/* =========================
   SEGURANÇA DO TEXTO
========================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================
   ESC PARA FECHAR MODAL
========================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        modal.classList.remove("show");

    }

});
