/* =========================================
   ARENA 90
   JAVASCRIPT
========================================= */


/* =========================================
   MENU MOBILE
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("show");

    });

}


/* =========================================
   FECHAR MENU AO CLICAR
========================================= */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (mainNav) {
            mainNav.classList.remove("show");
        }

    });

});


/* =========================================
   MENU ATIVO
========================================= */

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("main section[id]");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 130;

        const sectionHeight =
            section.clientHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === "#" + current) {
            link.classList.add("active");
        }

    });

});


/* =========================================
   CURTIR POSTS
========================================= */

function activateLikeButton(button) {

    button.addEventListener("click", () => {

        const count =
            button.querySelector("b");

        const liked =
            button.classList.contains("liked");


        if (liked) {

            button.classList.remove("liked");

            button.firstChild.textContent = "♡ ";

            if (count) {
                count.textContent =
                    Math.max(
                        0,
                        Number(count.textContent) - 1
                    );
            }

        } else {

            button.classList.add("liked");

            button.firstChild.textContent = "♥ ";

            if (count) {
                count.textContent =
                    Number(count.textContent) + 1;
            }

        }

    });

}


document
    .querySelectorAll(".like-button")
    .forEach(activateLikeButton);


/* =========================================
   COMENTÁRIOS
========================================= */

function activateCommentButton(button) {

    button.addEventListener("click", () => {

        const post =
            button.closest(".post");

        if (!post) return;

        const commentBox =
            post.querySelector(".comment-box");

        if (!commentBox) return;

        commentBox.classList.toggle("show");

        if (commentBox.classList.contains("show")) {

            const input =
                commentBox.querySelector("input");

            if (input) {
                input.focus();
            }

        }

    });

}


document
    .querySelectorAll(".comment-button")
    .forEach(activateCommentButton);


/* =========================================
   ENVIAR COMENTÁRIO
========================================= */

function activateCommentSend(button) {

    button.addEventListener("click", () => {

        const box =
            button.closest(".comment-box");

        if (!box) return;

        const input =
            box.querySelector("input");

        if (!input) return;

        const text =
            input.value.trim();


        if (text === "") {

            alert(
                "Digite um comentário antes de enviar."
            );

            return;
        }


        const post =
            button.closest(".post");

        const comment =
            document.createElement("div");

        comment.className =
            "new-comment";


        comment.innerHTML = `
            <div class="avatar small-avatar">CA</div>

            <div>
                <strong>Caio</strong>
                <p>${escapeHTML(text)}</p>
            </div>
        `;


        post.appendChild(comment);

        input.value = "";

    });

}


document
    .querySelectorAll(".comment-send")
    .forEach(activateCommentSend);


/* =========================================
   SEGURANÇA DO TEXTO
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   PUBLICAR NOVO POST
========================================= */

const publishButton =
    document.getElementById("publishButton");

const postText =
    document.getElementById("postText");

const feed =
    document.getElementById("feed");

const postsCount =
    document.getElementById("postsCount");


if (
    publishButton &&
    postText &&
    feed
) {

    publishButton.addEventListener(
        "click",
        () => {

            const text =
                postText.value.trim();


            if (text === "") {

                alert(
                    "Escreva alguma coisa antes de publicar."
                );

                postText.focus();

                return;
            }


            const post =
                document.createElement("article");

            post.className = "post";


            post.innerHTML = `

                <div class="post-header">

                    <div class="user">

                        <div class="avatar">
                            CA
                        </div>

                        <div>

                            <strong>
                                Caio
                            </strong>

                            <span>
                                Agora
                            </span>

                        </div>

                    </div>

                </div>


                <p class="post-text">
                    ${escapeHTML(text)}
                </p>


                <div class="post-actions">

                    <button class="like-button">
                        ♡ <span>Curtir</span>
                        <b>0</b>
                    </button>

                    <button class="comment-button">
                        💬 Comentar
                    </button>

                </div>


                <div class="comment-box">

                    <input
                        type="text"
                        placeholder="Escreva um comentário..."
                    >

                    <button class="comment-send">
                        Enviar
                    </button>

                </div>

            `;


            feed.prepend(post);


            postText.value = "";


            if (postsCount) {

                postsCount.textContent =
                    Number(postsCount.textContent) + 1;

            }


            const newLike =
                post.querySelector(".like-button");

            const newComment =
                post.querySelector(".comment-button");

            const newSend =
                post.querySelector(".comment-send");


            activateLikeButton(newLike);

            activateCommentButton(newComment);

            activateCommentSend(newSend);


            post.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );

}


/* =========================================
   ANIMAÇÃO AO ENTRAR NA TELA
========================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.08
        }
    );


document
    .querySelectorAll(
        ".news-card, .match-card, .post, .quick-card"
    )
    .forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(20px)";

        element.style.transition =
            "opacity .6s ease, transform .6s ease";

        observer.observe(element);

    });


/* =========================================
   DATA NO CONSOLE
========================================= */

console.log(
    "ARENA 90 carregado com sucesso."
);

console.log(
    "Mini Feed de Futebol - Projeto educacional."
);