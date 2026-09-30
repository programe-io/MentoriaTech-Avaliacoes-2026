/* ========================================
   PINK SOCIAL
   JavaScript principal
======================================== */


/* ========================================
   ELEMENTOS
======================================== */

const postModal = document.getElementById("postModal");

const openPostModal = document.getElementById("openPostModal");

const closePostModal = document.getElementById("closePostModal");

const publishPost = document.getElementById("publishPost");

const postText = document.getElementById("postText");

const feed = document.getElementById("feed");

const toast = document.getElementById("toast");

const searchInput = document.getElementById("searchInput");


/* ========================================
   MODAL
======================================== */

function openModal() {

    postModal.classList.add("active");

    setTimeout(() => {
        postText.focus();
    }, 200);
}


function closeModal() {

    postModal.classList.remove("active");

    postText.value = "";
}


openPostModal.addEventListener(
    "click",
    openModal
);


closePostModal.addEventListener(
    "click",
    closeModal
);


postModal.addEventListener(
    "click",
    function(event) {

        if (event.target === postModal) {
            closeModal();
        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            postModal.classList.contains("active")
        ) {

            closeModal();

        }

    }
);


/* ========================================
   TOAST
======================================== */

let toastTimeout;


function showToast(message) {

    const text = toast.querySelector("span");

    text.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);
}


/* ========================================
   CURTIDAS
======================================== */

function setupLikeButtons() {

    const likeButtons =
        document.querySelectorAll(".like-button");


    likeButtons.forEach(button => {

        button.addEventListener(
            "click",
            function() {

                const post =
                    button.closest(".post");

                const count =
                    post.querySelector(".like-count");

                let currentLikes =
                    parseInt(count.textContent);


                if (button.classList.contains("liked")) {

                    currentLikes--;

                    button.classList.remove("liked");

                    button.innerHTML =
                        `
                        <i class="fa-regular fa-heart"></i>
                        Curtir
                        `;

                } else {

                    currentLikes++;

                    button.classList.add("liked");

                    button.innerHTML =
                        `
                        <i class="fa-solid fa-heart"></i>
                        Curtido
                        `;

                }


                count.textContent =
                    currentLikes;

            }
        );

    });

}


setupLikeButtons();


/* ========================================
   SALVAR PUBLICAÇÕES
======================================== */

function setupSaveButtons() {

    const saveButtons =
        document.querySelectorAll(".save-button");


    saveButtons.forEach(button => {

        button.addEventListener(
            "click",
            function() {

                button.classList.toggle("saved");


                if (
                    button.classList.contains("saved")
                ) {

                    button.innerHTML =
                        `
                        <i class="fa-solid fa-bookmark"></i>
                        `;

                    showToast(
                        "Publicação salva!"
                    );

                } else {

                    button.innerHTML =
                        `
                        <i class="fa-regular fa-bookmark"></i>
                        `;

                    showToast(
                        "Publicação removida dos salvos."
                    );

                }

            }
        );

    });

}


setupSaveButtons();


/* ========================================
   COMENTÁRIOS
======================================== */

function setupCommentInputs() {

    const commentInputs =
        document.querySelectorAll(
            ".comment-input"
        );


    commentInputs.forEach(container => {

        const input =
            container.querySelector("input");

        const button =
            container.querySelector("button");


        function publishComment() {

            const text =
                input.value.trim();


            if (!text) {

                showToast(
                    "Digite um comentário."
                );

                return;
            }


            const post =
                container.closest(".post");


            const comments =
                post.querySelector(".comments");


            const comment =
                document.createElement("div");


            comment.className =
                "comment";


            comment.innerHTML =
                `
                <img
                    src="https://i.pravatar.cc/100?img=47"
                    alt="Você"
                >

                <div class="comment-content">

                    <strong>Você</strong>

                    <p>${escapeHTML(text)}</p>

                </div>
                `;


            comments.insertBefore(
                comment,
                container
            );


            input.value = "";


            showToast(
                "Comentário publicado!"
            );

        }


        button.addEventListener(
            "click",
            publishComment
        );


        input.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    publishComment();

                }

            }
        );

    });

}


setupCommentInputs();


/* ========================================
   SEGURANÇA
======================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}


/* ========================================
   CRIAR PUBLICAÇÃO
======================================== */

publishPost.addEventListener(
    "click",
    function() {

        const text =
            postText.value.trim();


        if (!text) {

            showToast(
                "Escreva alguma coisa antes de publicar."
            );

            postText.focus();

            return;
        }


        createNewPost(text);

        closeModal();

        showToast(
            "Sua publicação foi criada!"
        );

    }
);


function createNewPost(text) {

    const post =
        document.createElement("article");


    post.className =
        "post";


    post.innerHTML =
        `
        <div class="post-header">

            <div class="post-user">

                <img
                    src="https://i.pravatar.cc/100?img=47"
                    alt="Seu perfil"
                >

                <div>

                    <strong>SeuNome</strong>

                    <span>Agora</span>

                </div>

            </div>

            <button class="post-menu">

                <i class="fa-solid fa-ellipsis"></i>

            </button>

        </div>


        <div class="post-content">

            <p>
                ${escapeHTML(text)}
            </p>

        </div>


        <div class="post-stats">

            <span>

                <i class="fa-solid fa-heart"></i>

                <span class="like-count">0</span>
                curtidas

            </span>

            <span>
                0 comentários
            </span>

        </div>


        <div class="post-actions">

            <button class="like-button">

                <i class="fa-regular fa-heart"></i>

                Curtir

            </button>


            <button class="comment-button">

                <i class="fa-regular fa-comment"></i>

                Comentar

            </button>


            <button class="share-button">

                <i class="fa-regular fa-paper-plane"></i>

                Compartilhar

            </button>


            <button class="save-button">

                <i class="fa-regular fa-bookmark"></i>

            </button>

        </div>


        <div class="comments">

            <div class="comment-input">

                <img
                    src="https://i.pravatar.cc/100?img=47"
                    alt="Você"
                >

                <input
                    type="text"
                    placeholder="Adicione um comentário..."
                >

                <button>
                    Publicar
                </button>

            </div>

        </div>
        `;


    feed.prepend(post);


    setupNewPostInteractions(post);

}


/* ========================================
   INTERAÇÕES DAS NOVAS PUBLICAÇÕES
======================================== */

function setupNewPostInteractions(post) {

    const likeButton =
        post.querySelector(".like-button");


    likeButton.addEventListener(
        "click",
        function() {

            const count =
                post.querySelector(".like-count");

            let likes =
                parseInt(count.textContent);


            if (
                likeButton.classList.contains("liked")
            ) {

                likes--;

                likeButton.classList.remove(
                    "liked"
                );

                likeButton.innerHTML =
                    `
                    <i class="fa-regular fa-heart"></i>
                    Curtir
                    `;

            } else {

                likes++;

                likeButton.classList.add(
                    "liked"
                );

                likeButton.innerHTML =
                    `
                    <i class="fa-solid fa-heart"></i>
                    Curtido
                    `;

            }


            count.textContent =
                likes;

        }
    );


    const saveButton =
        post.querySelector(".save-button");


    saveButton.addEventListener(
        "click",
        function() {

            saveButton.classList.toggle(
                "saved"
            );


            if (
                saveButton.classList.contains("saved")
            ) {

                saveButton.innerHTML =
                    `
                    <i class="fa-solid fa-bookmark"></i>
                    `;

                showToast(
                    "Publicação salva!"
                );

            } else {

                saveButton.innerHTML =
                    `
                    <i class="fa-regular fa-bookmark"></i>
                    `;

            }

        }
    );


    const commentContainer =
        post.querySelector(".comment-input");


    const input =
        commentContainer.querySelector("input");


    const button =
        commentContainer.querySelector("button");


    function addComment() {

        const text =
            input.value.trim();


        if (!text) {

            showToast(
                "Digite um comentário."
            );

            return;
        }


        const comment =
            document.createElement("div");


        comment.className =
            "comment";


        comment.innerHTML =
            `
            <img
                src="https://i.pravatar.cc/100?img=47"
                alt="Você"
            >

            <div class="comment-content">

                <strong>Você</strong>

                <p>${escapeHTML(text)}</p>

            </div>
            `;


        post.querySelector(".comments")
            .insertBefore(
                comment,
                commentContainer
            );


        input.value = "";


        showToast(
            "Comentário publicado!"
        );

    }


    button.addEventListener(
        "click",
        addComment
    );


    input.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                addComment();

            }

        }
    );

}


/* ========================================
   COMPARTILHAR
======================================== */

document.addEventListener(
    "click",
    function(event) {

        const shareButton =
            event.target.closest(
                ".share-button"
            );


        if (!shareButton) {
            return;
        }


        const post =
            shareButton.closest(".post");


        const user =
            post.querySelector(
                ".post-user strong"
            ).textContent;


        const shareText =
            `Confira esta publicação de ${user} no PinkSocial!`;


        if (
            navigator.share
        ) {

            navigator.share({
                title: "PinkSocial",
                text: shareText
            });

        } else {

            navigator.clipboard
                .writeText(shareText)
                .then(() => {

                    showToast(
                        "Link copiado para a área de transferência!"
                    );

                });

        }

    }
);


/* ========================================
   COMENTAR
======================================== */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                ".comment-button"
            );


        if (!button) {
            return;
        }


        const post =
            button.closest(".post");


        const input =
            post.querySelector(
                ".comment-input input"
            );


        input.focus();

    }
);


/* ========================================
   SEGUIR USUÁRIOS
======================================== */

document
    .querySelectorAll(".follow-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                if (
                    button.classList.contains(
                        "following"
                    )
                ) {

                    button.classList.remove(
                        "following"
                    );

                    button.textContent =
                        "Seguir";

                    showToast(
                        "Você deixou de seguir esta pessoa."
                    );

                } else {

                    button.classList.add(
                        "following"
                    );

                    button.textContent =
                        "Seguindo";

                    showToast(
                        "Agora você está seguindo esta pessoa!"
                    );

                }

            }
        );

    });


/* ========================================
   MENU LATERAL
======================================== */

const menuItems =
    document.querySelectorAll(
        ".menu-item"
    );


menuItems.forEach(item => {

    item.addEventListener(
        "click",
        function() {

            menuItems.forEach(
                menu => menu.classList.remove(
                    "active"
                )
            );


            item.classList.add(
                "active"
            );


            const text =
                item.querySelector(
                    "span:not(.menu-count)"
                );


            if (text) {

                const menuName =
                    text.textContent.trim();


                if (
                    menuName !== "Início"
                ) {

                    showToast(
                        `${menuName}: seção selecionada.`
                    );

                }

            }

        }
    );

});


/* ========================================
   PESQUISA
======================================== */

searchInput.addEventListener(
    "input",
    function() {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        const posts =
            document.querySelectorAll(
                ".post"
            );


        posts.forEach(post => {

            const content =
                post.textContent
                    .toLowerCase();


            if (
                query &&
                content.includes(query)
            ) {

                post.classList.add(
                    "search-result-highlight"
                );

            } else {

                post.classList.remove(
                    "search-result-highlight"
                );

            }

        });

    }
);


/* ========================================
   STORIES
======================================== */

document
    .querySelectorAll(".story")
    .forEach(story => {

        story.addEventListener(
            "click",
            function() {

                const name =
                    story.querySelector(
                        "span:last-child"
                    ).textContent;


                showToast(
                    `Abrindo story de ${name}...`
                );

            }
        );

    });


/* ========================================
   BOTÃO DE NOTIFICAÇÕES
======================================== */

document
    .getElementById(
        "notificationButton"
    )
    .addEventListener(
        "click",
        function() {

            showToast(
                "Você tem 3 novas notificações."
            );

        }
    );


/* ========================================
   BOTÃO DE PERFIL
======================================== */

document
    .getElementById(
        "profileButton"
    )
    .addEventListener(
        "click",
        function() {

            showToast(
                "Abrindo seu perfil..."
            );

        }
    );


/* ========================================
   BOTÕES DE FOTO, VÍDEO E SENTIMENTO
======================================== */

document
    .getElementById("photoButton")
    .addEventListener(
        "click",
        function() {

            showToast(
                "Seletor de fotos aberto."
            );

        }
    );


document
    .getElementById("videoButton")
    .addEventListener(
        "click",
        function() {

            showToast(
                "Seletor de vídeos aberto."
            );

        }
    );


document
    .getElementById("feelingButton")
    .addEventListener(
        "click",
        function() {

            showToast(
                "Escolha como você está se sentindo."
            );

        }
    );


/* ========================================
   VER TODOS OS STORIES
======================================== */

document
    .getElementById("viewStories")
    .addEventListener(
        "click",
        function() {

            showToast(
                "Todos os stories estão sendo carregados."
            );

        }
    );


/* ========================================
   MENUS DAS PUBLICAÇÕES
======================================== */

document.addEventListener(
    "click",
    function(event) {

        const menu =
            event.target.closest(
                ".post-menu"
            );


        if (!menu) {
            return;
        }


        showToast(
            "Menu da publicação aberto."
        );

    }
);


/* ========================================
   PERFIL
======================================== */

document
    .querySelector(".profile-button")
    .addEventListener(
        "click",
        function() {

            showToast(
                "Abrindo perfil..."
            );

        }
    );
