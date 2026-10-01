// ======================================
// ELEMENTOS
// ======================================

const postText = document.getElementById("postText");
const publishBtn = document.getElementById("publishBtn");

const themeBtn = document.getElementById("themeBtn");

const notificationBtn =
    document.getElementById("notificationBtn");

const notificationPanel =
    document.getElementById("notificationPanel");

const searchInput =
    document.getElementById("searchInput");


// ======================================
// PUBLICAR POST
// ======================================

publishBtn.addEventListener("click", function () {

    const text = postText.value.trim();

    if (text === "") {

        alert("Digite alguma coisa antes de publicar.");

        return;
    }


    const feed = document.querySelector(".feed");

    const filter = document.querySelector(".feed-filter");


    const post = document.createElement("article");

    post.classList.add("post");


    post.innerHTML = `

        <div class="post-header">

            <div class="avatar">
                JS
            </div>

            <div>

                <h3>João Silva</h3>

                <span>
                    Agora mesmo · 🌎
                </span>

            </div>

            <button class="more-btn">
                ⋮
            </button>

        </div>


        <div class="post-content">

            <p>
                ${escapeHTML(text)}
            </p>

        </div>


        <div class="post-info">

            <span>
                ❤️ 0 curtidas
            </span>

            <span>
                0 comentários
            </span>

        </div>


        <div class="post-buttons">

            <button class="like-btn">
                ♡ Curtir
            </button>

            <button>
                💬 Comentar
            </button>

            <button>
                ↗ Compartilhar
            </button>

        </div>

    `;


    feed.insertBefore(
        post,
        filter.nextElementSibling
    );


    postText.value = "";


    addLikeEvent(post);

});


// ======================================
// CURTIR PUBLICAÇÃO
// ======================================

function addLikeEvent(post) {

    const likeBtn =
        post.querySelector(".like-btn");

    if (!likeBtn) return;


    likeBtn.addEventListener("click", function () {

        const isLiked =
            likeBtn.classList.contains("liked");


        if (isLiked) {

            likeBtn.classList.remove("liked");

            likeBtn.innerHTML =
                "♡ Curtir";

        } else {

            likeBtn.classList.add("liked");

            likeBtn.innerHTML =
                "♥ Curtido";

        }

    });

}


// Adiciona o evento aos posts existentes

document
    .querySelectorAll(".post")
    .forEach(addLikeEvent);


// ======================================
// BOTÕES DE SEGUIR
// ======================================

document
    .querySelectorAll(".follow-btn")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

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

                } else {

                    button.classList.add(
                        "following"
                    );

                    button.textContent =
                        "Seguindo";

                }

            }
        );

    });


// ======================================
// MODO ESCURO
// ======================================

themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle("dark");


        const darkMode =
            document.body.classList.contains(
                "dark"
            );


        themeBtn.textContent =
            darkMode ? "☀️" : "🌙";


        localStorage.setItem(
            "darkMode",
            darkMode
        );

    }
);


// Recupera preferência do usuário

const savedTheme =
    localStorage.getItem("darkMode");


if (savedTheme === "true") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


// ======================================
// NOTIFICAÇÕES
// ======================================

notificationBtn.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        notificationPanel.classList.toggle(
            "hidden"
        );

    }
);


// Fecha notificações ao clicar fora

document.addEventListener(
    "click",
    function (event) {

        if (
            !notificationPanel.contains(
                event.target
            ) &&
            event.target !== notificationBtn
        ) {

            notificationPanel.classList.add(
                "hidden"
            );

        }

    }
);


// ======================================
// PESQUISA
// ======================================

searchInput.addEventListener(
    "input",
    function () {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        const posts =
            document.querySelectorAll(".post");


        posts.forEach(function (post) {

            const content =
                post.textContent.toLowerCase();


            if (
                search === "" ||
                content.includes(search)
            ) {

                post.style.display = "";

            } else {

                post.style.display = "none";

            }

        });

    }
);


// ======================================
// FILTROS DO FEED
// ======================================

document
    .querySelectorAll(".filter")
    .forEach(function (filter) {

        filter.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".filter")
                    .forEach(function (item) {

                        item.classList.remove(
                            "active"
                        );

                    });


                filter.classList.add("active");

            }
        );

    });


// ======================================
// PROTEÇÃO CONTRA HTML
// ======================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}
