:::writing{variant="standard" id="95306" title="script.js"}

const openPost = document.getElementById("openPost");
const closePost = document.getElementById("closePost");

const newPostBox = document.getElementById("newPostBox");

const postText = document.getElementById("postText");
const publishButton = document.getElementById("publishButton");

const counter = document.getElementById("counter");
const feed = document.getElementById("feed");

const searchInput = document.getElementById("searchInput");


/* =========================
   ABRIR PUBLICAÇÃO
========================= */

openPost.addEventListener("click", () => {

    newPostBox.classList.add("active");

    postText.focus();

});


/* =========================
   FECHAR PUBLICAÇÃO
========================= */

closePost.addEventListener("click", () => {

    newPostBox.classList.remove("active");

    postText.value = "";

    counter.textContent = "0/500";

});


/* =========================
   CONTADOR
========================= */

postText.addEventListener("input", () => {

    const length = postText.value.length;

    counter.textContent =
        `${length}/500`;

});


/* =========================
   PUBLICAR
========================= */

publishButton.addEventListener("click", () => {

    const text = postText.value.trim();

    if (text === "") {

        alert("Escreva alguma coisa antes de publicar.");

        return;
    }


    const post = document.createElement("article");

    post.className = "post";


    post.innerHTML = `

        <div class="post-header">

            <div class="post-avatar blue">
                JS
            </div>

            <div class="post-author">

                <strong>
                    João Silva
                </strong>

                <span>
                    Desenvolvedor Web · agora
                </span>

                <small>
                    🌎
                </small>

            </div>

            <button class="more">
                •••
            </button>

        </div>


        <div class="post-text"></div>


        <div class="post-stats">

            <span>
                👍
            </span>

            <span>
                0 comentários · 0 compartilhamentos
            </span>

        </div>


        <div class="post-actions">

            <button class="like-button">
                👍 <span>Curtir</span>
            </button>

            <button>
                💬 <span>Comentar</span>
            </button>

            <button class="share-button">
                ↗ <span>Compartilhar</span>
            </button>

            <button>
                ✉ <span>Enviar</span>
            </button>

        </div>

    `;


    // Inserir texto com segurança
    post.querySelector(".post-text").textContent = text;


    // Adicionar no início do feed
    feed.prepend(post);


    // Limpar
    postText.value = "";

    counter.textContent = "0/500";

    newPostBox.classList.remove("active");

});


/* =========================
   CURTIR
========================= */

feed.addEventListener("click", (event) => {

    const button =
        event.target.closest(".like-button");


    if (!button) {
        return;
    }


    button.classList.toggle("liked");


    const span =
        button.querySelector("span");


    if (button.classList.contains("liked")) {

        span.textContent = "Curtido";

    } else {

        span.textContent = "Curtir";

    }

});


/* =========================
   COMPARTILHAR
========================= */

feed.addEventListener("click", async (event) => {

    const button =
        event.target.closest(".share-button");


    if (!button) {
        return;
    }


    const post =
        button.closest(".post");


    const text =
        post.querySelector(".post-text").textContent;


    try {

        await navigator.clipboard.writeText(text);


        const original =
            button.innerHTML;


        button.innerHTML =
            "✓ <span>Copiado!</span>";


        setTimeout(() => {

            button.innerHTML = original;

        }, 1500);


    } catch (error) {

        alert("Não foi possível copiar o conteúdo.");

    }

});


/* =========================
   PESQUISA
========================= */

searchInput.addEventListener("input", () => {

    const search =
        searchInput.value.toLowerCase();


    const posts =
        document.querySelectorAll(".post");


    posts.forEach((post) => {

        const content =
            post.textContent.toLowerCase();


        if (content.includes(search)) {

            post.style.display = "";

        } else {

            post.style.display = "none";

        }

    });

});
:::

A estrutura fica exatamente assim:

LinkDin/
│
├── index.html
├── style.css
└── script.js