/* =========================================================
   MICHAEL JACKSON MINI FEED
   JAVASCRIPT SEGURO E INTERATIVO
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       NOTIFICAÇÃO
    ===================================================== */

    function mensagem(texto) {

        const antiga = document.querySelector(".notification");

        if (antiga) {
            antiga.remove();
        }

        const aviso = document.createElement("div");

        aviso.className = "notification";
        aviso.textContent = texto;

        document.body.appendChild(aviso);

        setTimeout(function () {
            if (aviso) {
                aviso.remove();
            }
        }, 2000);
    }


    /* =====================================================
       EFEITO DE CLIQUE
    ===================================================== */

    document.addEventListener("click", function (evento) {

        const efeito = document.createElement("span");

        efeito.className = "click-effect";

        efeito.style.left =
            evento.clientX - 10 + "px";

        efeito.style.top =
            evento.clientY - 10 + "px";

        document.body.appendChild(efeito);

        setTimeout(function () {
            efeito.remove();
        }, 600);

    });


    /* =====================================================
       MODAL PARA AUMENTAR IMAGENS
    ===================================================== */

    const modal = document.querySelector(".modal");

    let imagemModal = null;

    if (modal) {
        imagemModal = modal.querySelector("img");
    }


    function abrirImagem(imagem) {

        if (!modal || !imagemModal) {
            return;
        }

        imagemModal.src = imagem.src;

        imagemModal.alt =
            imagem.alt || "Michael Jackson";

        modal.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    function fecharImagem() {

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        document.body.style.overflow = "";
    }


    /* =====================================================
       TODAS AS IMAGENS DO FEED
    ===================================================== */

    const imagens = document.querySelectorAll(
        ".post-image, .gallery-grid img"
    );

    imagens.forEach(function (imagem) {

        imagem.style.cursor = "pointer";

        imagem.addEventListener("click", function () {

            abrirImagem(imagem);

        });

    });


    /* =====================================================
       FECHAR MODAL
    ===================================================== */

    if (modal) {

        modal.addEventListener("click", function (evento) {

            if (
                evento.target === modal ||
                evento.target.classList.contains("close-modal")
            ) {
                fecharImagem();
            }

        });

    }


    /* =====================================================
       ESC FECHA A IMAGEM
    ===================================================== */

    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {

            fecharImagem();
            fecharStory();

        }

    });


    /* =====================================================
       DUPLO CLIQUE NA FOTO = CORAÇÃO
    ===================================================== */

    imagens.forEach(function (imagem) {

        imagem.addEventListener("dblclick", function () {

            const container =
                imagem.closest(".post-image-container") ||
                imagem.parentElement;

            if (!container) {
                return;
            }

            container.style.position = "relative";

            const coracao =
                document.createElement("div");

            coracao.className = "big-heart";

            coracao.textContent = "♥";

            container.appendChild(coracao);

            setTimeout(function () {
                coracao.classList.add("show");
            }, 10);

            setTimeout(function () {
                coracao.remove();
            }, 900);

        });

    });


    /* =====================================================
       CURTIR POSTS
    ===================================================== */

    const botoesCurtir =
        document.querySelectorAll(".like-button");

    botoesCurtir.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const post =
                botao.closest(".post");

            if (!post) {
                return;
            }

            const contador =
                post.querySelector(".likes");

            let numero = 0;

            if (contador) {

                const resultado =
                    contador.textContent.match(/\d+/);

                if (resultado) {
                    numero = Number(resultado[0]);
                }

            }


            if (botao.classList.contains("liked")) {

                botao.classList.remove("liked");

                numero--;

                botao.textContent = "♡";

            } else {

                botao.classList.add("liked");

                numero++;

                botao.textContent = "♥";

                const imagem =
                    post.querySelector(".post-image");

                if (imagem) {

                    const container =
                        imagem.parentElement;

                    if (container) {

                        container.style.position =
                            "relative";

                        const coracao =
                            document.createElement("div");

                        coracao.className =
                            "big-heart";

                        coracao.textContent = "♥";

                        container.appendChild(coracao);

                        setTimeout(function () {
                            coracao.classList.add("show");
                        }, 10);

                        setTimeout(function () {
                            coracao.remove();
                        }, 900);

                    }

                }

            }


            if (contador) {

                contador.textContent =
                    numero +
                    (numero === 1
                        ? " curtida"
                        : " curtidas");

            }

        });

    });


    /* =====================================================
       COMENTÁRIOS
    ===================================================== */

    const comentarios =
        document.querySelectorAll(".comments");

    comentarios.forEach(function (area) {

        const input =
            area.querySelector("input");

        if (!input) {
            return;
        }

        input.addEventListener("keydown", function (evento) {

            if (evento.key !== "Enter") {
                return;
            }

            evento.preventDefault();

            const texto =
                input.value.trim();

            if (texto === "") {
                return;
            }

            const comentario =
                document.createElement("div");

            comentario.className = "comment";

            comentario.textContent =
                "Você: " + texto;

            area.appendChild(comentario);

            input.value = "";

            mensagem("💬 Comentário adicionado!");

        });

    });


    /* =====================================================
       STORIES
    ===================================================== */

    const storiesHTML =
        document.querySelectorAll(".story");

    const stories = [];


    storiesHTML.forEach(function (story, indice) {

        const imagem =
            story.querySelector("img");

        if (!imagem) {
            return;
        }

        stories.push({
            imagem: imagem.src,
            titulo:
                story.querySelector("p")?.textContent ||
                "Michael Jackson"
        });


        story.addEventListener("click", function () {

            abrirStory(indice);

        });

    });


    let storyAtual = 0;
    let storyModal = null;
    let timerStory = null;


    /* =====================================================
       CRIAR MODAL DOS STORIES
    ===================================================== */

    function criarModalStory() {

        if (storyModal) {
            return;
        }

        storyModal =
            document.createElement("div");

        storyModal.className =
            "story-modal";

        storyModal.innerHTML = `

            <button class="story-fechar">
                ×
            </button>

            <button class="story-anterior">
                ❮
            </button>

            <div class="story-conteudo">

                <div class="story-barra">
                    <div class="story-progresso"></div>
                </div>

                <img class="story-imagem">

                <h2 class="story-titulo"></h2>

            </div>

            <button class="story-proximo">
                ❯
            </button>
        `;

        document.body.appendChild(storyModal);


        /* Fechar */

        const fechar =
            storyModal.querySelector(".story-fechar");

        if (fechar) {

            fechar.addEventListener(
                "click",
                fecharStory
            );

        }


        /* Próximo */

        const proximo =
            storyModal.querySelector(".story-proximo");

        if (proximo) {

            proximo.addEventListener(
                "click",
                proximoStory
            );

        }


        /* Anterior */

        const anterior =
            storyModal.querySelector(".story-anterior");

        if (anterior) {

            anterior.addEventListener(
                "click",
                anteriorStory
            );

        }


        /* Clicar fora */

        storyModal.addEventListener(
            "click",
            function (evento) {

                if (evento.target === storyModal) {
                    fecharStory();
                }

            }
        );

    }


    /* =====================================================
       ABRIR STORY
    ===================================================== */

    function abrirStory(indice) {

        if (stories.length === 0) {
            mensagem("Nenhum Story encontrado.");
            return;
        }

        storyAtual = indice;

        criarModalStory();

        const imagem =
            storyModal.querySelector(".story-imagem");

        const titulo =
            storyModal.querySelector(".story-titulo");

        const progresso =
            storyModal.querySelector(
                ".story-progresso"
            );


        if (imagem) {

            imagem.src =
                stories[storyAtual].imagem;

        }


        if (titulo) {

            titulo.textContent =
                stories[storyAtual].titulo;

        }


        storyModal.classList.add("ativo");

        document.body.style.overflow = "hidden";


        /* Reiniciar barra */

        if (progresso) {

            progresso.style.transition = "none";

            progresso.style.width = "0%";

            setTimeout(function () {

                progresso.style.transition =
                    "width 5s linear";

                progresso.style.width = "100%";

            }, 50);

        }


        clearTimeout(timerStory);

        timerStory =
            setTimeout(function () {

                proximoStory();

            }, 5000);

    }


    /* =====================================================
       PRÓXIMO STORY
    ===================================================== */

    function proximoStory() {

        if (stories.length === 0) {
            return;
        }

        storyAtual++;

        if (storyAtual >= stories.length) {
            storyAtual = 0;
        }

        abrirStory(storyAtual);

    }


    /* =====================================================
       STORY ANTERIOR
    ===================================================== */

    function anteriorStory() {

        if (stories.length === 0) {
            return;
        }

        storyAtual--;

        if (storyAtual < 0) {
            storyAtual = stories.length - 1;
        }

        abrirStory(storyAtual);

    }


    /* =====================================================
       FECHAR STORY
    ===================================================== */

    function fecharStory() {

        if (!storyModal) {
            return;
        }

        storyModal.classList.remove("ativo");

        clearTimeout(timerStory);

        document.body.style.overflow = "";

    }


    /* =====================================================
       TECLADO DOS STORIES
    ===================================================== */

    document.addEventListener("keydown", function (evento) {

        if (
            !storyModal ||
            !storyModal.classList.contains("ativo")
        ) {
            return;
        }

        if (evento.key === "ArrowRight") {
            proximoStory();
        }

        if (evento.key === "ArrowLeft") {
            anteriorStory();
        }

    });


    /* =====================================================
       NAVEGAÇÃO
    ===================================================== */

    const botoesNav =
        document.querySelectorAll("nav button");

    botoesNav.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const texto =
                botao.textContent.toLowerCase();


            if (
                texto.includes("início") ||
                texto.includes("inicio")
            ) {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }


            if (texto.includes("galeria")) {

                const galeria =
                    document.querySelector(".gallery");

                if (galeria) {

                    galeria.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }


            if (texto.includes("criar")) {

                const criar =
                    document.querySelector(".create-post");

                if (criar) {

                    criar.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        });

    });


    /* =====================================================
       MENSAGEM FINAL
    ===================================================== */

    console.log(
        "⭐ MJ Universe carregado com sucesso!"
    );

});